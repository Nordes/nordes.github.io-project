___First draft___
# Objectives
This is a multi-part tutorial or learning guide in order to build, for dev or for some of your needs, an integration of:

- __[Part I*]__ `OpenLdap` (Or active directory) with Contoso Users
- __[Part II]__ `IdentityServer 4` (Built in Dotnet Core 2.x)
  - Option of using `Redis` to persist user cache (tokens)
- __[Part III]__ `Docker` to run the previous two options all together (If not already explained in previous 2)
- __[Part IV]__ A small back-end with protected Api's
  - One in Dotnet Core 2 using the WebApi format
  - One in NodeJS
- __[Part V]__ A small front-end to call the Api's
  - One in Dotnet Core 2 using the WebApp MVC format
  - One in NodeJS

## Requirements for this part
- [Docker](https://www.docker.com/get-docker) (Windows, Linux or Mac)

## Let's begin [Part I]
In this part, if you are using Active Directory, it will be easy to already find a VM having the Contoso users already within Active Directory. However, if you are using OpenLdap, you won't find anything. For development purpose it's nice to have an already populated Ldap database. For some reason, I will stay with the default schema from OpenLdap. The schema differ from Active Directory.

In this part we will cover:
- How to create an empty [OpenLdap Server](https://www.openldap.org/doc/)
- How to start the Server
- How to convert a `csv` file to `ldif` format 
- How to import within [OpenLdap Server](https://www.openldap.org/doc/)
- How to see the data (tool)

### How to create an empty OpenLdap Server
You have the choice here of reading all the documentation to install step-by-step or speed up by using a Docker image. For a production environment I would strongly suggest to read all the documentation regarding OpenLdap. It will helps to avoid security holes and also to build properly your Ldap tree.

*Let's pull the best image I've found so far for OpenLdap ([osixia/openldap](https://hub.docker.com/r/osixia/openldap/))*
```sh
$ docker pull osixia/openldap:latest
```

The download should be pretty quick since the image size is not so big. At the time of writing this, the image size on the disk was about `222 MB`. The Github site from that image help you to configure it and also indicate how to have persistance and so much more. Let's do a quick `Contoso` configuration:

#### Create an OpenLdap environment file
This file will basically set the `Base DC` and `Admin`/`Config`/`Read-Only` user + password.

* __File:__ `./ldap.env`

```sh
LDAP_ORGANISATION=Contoso Ltd.
LDAP_DOMAIN=contoso.com
LDAP_ADMIN_PASSWORD=P@ss1W0Rd!
LDAP_CONFIG_PASSWORD=P@ss1W0Rd!

LDAP_READONLY_USER=true
LDAP_READONLY_USER_USERNAME=ldap-ro
LDAP_READONLY_USER_PASSWORD=P@ss1W0Rd!
```

* Create a folder to put shared files within Docker and OpenLdap 
  * `./ldap/`

#### Create a docker compose file
The `docker-compose` file will be useful to start/restart or reconfigure the image. I prefer the docker-compose version to the all-in-one command line (`docker run ...`). It is still up to you! ;)

__File__ `./docker-compose.yml`

```yml
 ldap:
    container_name: contosoOpenLdap
    image: osixia/openldap:latest
    ports: 
      - "389:389"
      - "636:636"
    env_file:
      - ./ldap.env
    volumes:
      - ./ldap:/data/ldif
```

### How to start the Server
Within the directory where you have the `docker-compose.yml` file, you should be able to use `docker-compose` executable (if in windows) or if you are on linux you might have to also install that package.

```sh
$ docker-compose start
``` 

* This will be starting the server. If you preffer to see all the log within the screen, you can instead use `docker-compose up` command.

### How to convert a `csv` file to `ldif` format
First of, what is a `ldif` file? Easy reading on [Wikipedia](https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format). Basically, it is a Ldap Data Interchange Format. It gives the possibility to add, remove, modify (by properties if we want) or even delete using a specific text format. The format in itself is not complex, the issue you will encounter is that the attributes might not be defined (OpenLdap vs Active Directory). By example the `sAMAccount..` exists in Active Directory and in OpenLdap it might be the `uid` attribute.

I have created a simple project named [csv2ldif](https://github.com/Nordes/Csv2Ldif) (far from perfect) that can quickly convert a simple `csv` format into a `ldif` format with a default password of `P@ss1W0Rd!` (Yes again, let's keep it simple). If you want to change the default password, please do, it's not so much work. You can also contribute to the repository. It will generate basically 2 files. The first one will be about creating the user groups. The second one is about creating the user and then assigning them to the group. In that project you can also find the CSV file regarding the Contoso Users (with also the pre-generated demo in the example folder).

Regarding the LDIF generation, you can find good information on the [LdapWiki](http://ldapwiki.com/wiki/LDIF%20Generator).

__Small peek (Raw csv)__

```csv
dn,objectClass,uid,homeDirectory,group,givenName,sn,displayName,cn,mail,manager,telephoneNumber,title
cn=Dan Jump,inetOrgPerson;person;organizationalPerson;posixAccount;top,danj,/home/danj,Executive,Dan,Jump,Dan Jump,Dan Jump,danj@contoso.com,,(425) 555-0179,CEO
cn=Adam Barr,inetOrgPerson;person;organizationalPerson;posixAccount;top,adamb,/home/adamb,Operations,Adam,Barr,Adam Barr,Adam Barr,adamb@contoso.com,cn=Dan Jump,(206) 555-5472,General Manager of Professional Services
```

* Note that the _Base OU_ for the `groups` and `users` is not generated. Usually you already have this in your tree. In our case we have something _empty_.

__Create the `groups` and `users` OU using a LDIF file__

```ldif
dn: ou=users, dc=contoso,dc=com
ou: users
description: All people in organisation
objectclass: organizationalunit

dn: ou=groups, dc=contoso,dc=com
ou: groups
description: All Groups in organisation
objectclass: organizationalunit
```

__Small peek (Generated groups LDIF)__

```ldif
dn: cn=Executive,ou=groups,dc=contoso,dc=com
objectClass: groupOfUniqueNames
cn: Executive
uniqueMember: cn=Executive,ou=groups,dc=contoso,dc=com
description: Executive

dn: cn=Operations,ou=groups,dc=contoso,dc=com
objectClass: groupOfUniqueNames
cn: Operations
uniqueMember: cn=Operations,ou=groups,dc=contoso,dc=com
description: Operations
```

__Small peek (Generated users LDIF)__

```ldif
dn: cn=Dan Jump,ou=users,dc=contoso,dc=com
objectClass: inetOrgPerson
objectClass: person
objectClass: organizationalPerson
objectClass: posixAccount
objectClass: top
uid: danj
uidNumber: 70000
gidNumber: 70001
homeDirectory: /home/danj
givenName: Dan
sn: Jump
displayName: Dan Jump
cn: Dan Jump
mail: danj@contoso.com
telephoneNumber: (425) 555-0179
title: CEO
userPassword: {SHA}RKkNn7+KoG94IN3x/B2jnm/4DS0=

dn: cn=Executive,ou=groups,dc=contoso,dc=com
changetype: modify
add: uniqueMember
uniqueMember: cn=Dan Jump,ou=users,dc=contoso,dc=com

dn: cn=Adam Barr,ou=users,dc=contoso,dc=com
objectClass: inetOrgPerson
objectClass: person
objectClass: organizationalPerson
objectClass: posixAccount
objectClass: top
uid: adamb
uidNumber: 70002
gidNumber: 70003
homeDirectory: /home/adamb
givenName: Adam
sn: Barr
displayName: Adam Barr
cn: Adam Barr
mail: adamb@contoso.com
manager: cn=Dan Jump,ou=users,dc=contoso,dc=com
telephoneNumber: (206) 555-5472
title: General Manager of Professional Services
userPassword: {SHA}RKkNn7+KoG94IN3x/B2jnm/4DS0=

dn: cn=Operations,ou=groups,dc=contoso,dc=com
changetype: modify
add: uniqueMember
uniqueMember: cn=Adam Barr,ou=users,dc=contoso,dc=com
```

If you want the entire data don't forget to just go on https://github.com/Nordes/Csv2Ldif/tree/master/example. There's the 00, 01, 02 sample file where it have the entire contoso setup.

### How to import within OpenLdap Server
Right now, we have an _empty_ OpenLdap Server. What we want is a server with some users and groups in order for us to play with them within an application or during our devs.

Download the following files (if not already) and save them within the `./ldap/` folder you've created earlier:
1. [00-startup.ldif](https://github.com/Nordes/Csv2Ldif/blob/master/example/00-startup.ldif)
  * Create the `users` and `groups` _OU_ (Organisation Unit) (ou=...,dc=contoso,dc=com)
2. [01-output-groups.ldif](https://github.com/Nordes/Csv2Ldif/blob/master/example/01-output-groups.ldif)
  * Create all the `groups` _CN_ within the `groups` _OU_ (cn=...,ou=groups,dc=contoso,dc=com)
3. [02-output-users.ldif](https://github.com/Nordes/Csv2Ldif/blob/master/example/02-output-users.ldif)
  * Create all the `users` _CN_ within the `users` _OU_ (cn=...,ou=users,dc=contoso,dc=com)
  * Attach all the `users` to their pre-defined `group`. In our case it's a 1-1 match.

#### Import
It's now time to launch the command line tool (if possible where you have your ldif file).

Our action parameter will be using the following:
- `-f`: Import the file launching the `ldapmodify` command within the container  
- `-d`: Use the administrator role to import
- `-w`: The administrator password (if not set, but with the -w option, it will request the password). In case the password is not set, it will fail.
- `-c`: Continue on failure (we never know, but at least it will give the logs)
- ...: The other one are trivial.

The output result when launching the command are describing what's happening. By example

```sh
...
adding new entry "cn=Josh Edwards,ou=users,dc=contoso,dc=com"
modifying entry "cn=Sales,ou=groups,dc=contoso,dc=com"
...
```

_(If you are too lazy to type the commands, you can copy the batch file located at the same emplacement as the 3 previous downloads)_

##### Organisation Units
```sh
$ docker exec contosoOpenLdap ldapmodify /
  -a -x -h localhost -p 389 /
  -D "cn=admin,dc=contoso,dc=com" /
  -f /data/ldif/00-startup.ldif /
  -w P@ss1W0Rd! /
  -c 
```

#### Groups
```sh
$ docker exec contosoOpenLdap ldapmodify /
  -a -x -h localhost -p 389 / 
  -D "cn=admin,dc=contoso,dc=com" /
  -f /data/ldif/01-output-groups.ldif /
  -w P@ss1W0Rd! /
  -c 
```

#### Users and membership
```sh
$ docker exec contosoOpenLdap ldapmodify /
  -a -x -h localhost -p 389 / 
  -D "cn=admin,dc=contoso,dc=com" /
  -f /data/ldif/02-output-users.ldif /
  -w P@ss1W0Rd! /
  -c 
```

### How to see the data (tool)
You have some choice here, but since I am not a big fan of doing the query all by hand and do the request through the OpenLdap Docker instance, I prefer to use [LdapAdmin](http://www.ldapadmin.org/download/ldapadmin.html). It gives a UI which is easy to play with.

When creating a connection you will need to set the following:

| What | Value | Desc. |
| ---- | ---- | ---- |
| Connection Name | `OpenLdap Contoso Test` | Name of the connection (can be what you want) |
| Host | `localhost` | Since we're running thing locally, `localhost` is good |
| port | `389` | Default port (unsecured). The secured is supposed to be also available. |
| base | `dc=contoso,dc=com` | Base DC when opening the connection |
| Auth type | `Simple Authentication` | Option under the base |
| Username | `cn=admin,dc=contoso,dc=com` | User to connect with (let's use Admin, but you can also use the ldap-ro or other user) |
| Password | `P@ss1W0Rd!` | Admin password in this case |
<br>
#### Look After Import
![Look after imported](../static/images/articles/howto-openldap-with-contoso-users/Imported.png "Look after imported")

