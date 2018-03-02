# Objectives
This is a multi-part tutorial playground in order to build, for dev or for some of your needs, an integration of:

- [__[Part I]__ `OpenLdap` (Or active directory) with Contoso Users](/Articles/howto-openldap-with-contoso-users)
- __[Part II*]__ `IdentityServer 4 ` with OpenLdap (Built in Dotnet Core 2.x)
  - Option of using `Redis` to persist user cache (tokens)
- __[Part III]__ `Docker` to run the previous two options all together (If not already explained in previous 2)
- __[Part IV]__ A small back-end with protected Api's
  - One in Dotnet Core 2 using the WebApi format
  - One in NodeJS
- __[Part V]__ A small front-end to call the Api's
  - One in Dotnet Core 2 using the WebApp MVC format
  - One in NodeJS

## Requirements for this part
* To have completed the previous part _OR_ to already have access to an ActiveDirectory or LDAP Server.

## Let's begin [Part II]
Instead of connecting to a database you might want a different way of connecting IdentityServer4 to a LDAP directory. In order to do so, you might encounter a few issue. By example, on .NET Core we don't have access to the DirectoryService (at least not yet, but it is suppose to be available soon). Instead you will have to rely on a different library than usual. Novell actually built a LDAP library available in .NET Standard. This way it is accessible to either Core or normal application.

In this article, we will do the following:
1. Use a `QuickStart` from IdentityServer4.
2. Integrate a Nuget package in your startup order to use the LDAP.
3. Change the QuickStart code in order to use our LDAP directory.
4. Let's get a look (images)

### 1. IdentityServer4 - QuickStart
Let's use the [QuickStart 3 with implicit flow](http://docs.identityserver.io/en/release/quickstarts/3_interactive_login.html) available on [GitHub](https://github.com/IdentityServer/IdentityServer4.Samples/tree/release/Quickstarts/3_ImplicitFlowAuthentication). This article does not apply only on the QuickStart 3. It can actually be applied to any other quickstart and I just chose the one with just enough to get **you** started.

Task for you to do:
* [Download](https://github.com/IdentityServer/IdentityServer4.Samples/tree/release/Quickstarts/3_ImplicitFlowAuthentication)/clone the repository in order to get the QuickStart 3.
* Compile & run in order to see if it runs, which it should.
* Open your Visual Studio and let's get started.

### 2. Integrate LDAP in the startup
#### 2.1 Add the Nuget package
First, you will need to download the Nuget package `IdentityServer.LdapExtension`. You can get more details on the extension on the [GitHub page](https://github.com/Nordes/IdentityServer4.LdapExtension#IS.AppSettings).

> Install-Package IdentityServer.LdapExtension

As a result, this will give you the new extension method `AddLdapUsers<...>(...)`.

#### 2.2 Add the configuration within the AppSettings
Let's add the configuration in your `AppSettings.json` file.

```json
"ldapOpenLdap": {
  // Openldap
  "url": "localhost",
  "port": 389,
  "ssl": false,
  "bindDn": "cn=ldap-ro,dc=contoso,dc=com",
  "bindCredentials": "P@ss1W0Rd!",
  "searchBase": "ou=users,DC=contoso,dc=com",
  "searchFilter": "(&(objectClass=posixAccount)(objectClass=person)(uid={0}))"
}
```

#### 2.3 Update your startup file
You will have to go in the `Startup.cs` and then go under the method `ConfigureServices(...)`. While adding the Identity Server, we will use the extension method `AddLdapUsers`. 

**Here's how it looks like**

```csharp
public void ConfigureServices(IServiceCollection services)
{
  services.AddMvc();

  // configure identity server with in-memory stores, keys, clients and scopes
  services.AddIdentityServer()
    .AddDeveloperSigningCredential()
    // .AddSigningCredential(...) // Strongly recommended, if you want something more secure than developer signing (Read The Manual since it's highly recommended)
    .AddInMemoryIdentityResources(InMemoryInitConfig.GetIdentityResources())
    .AddInMemoryApiResources(InMemoryInitConfig.GetApiResources())
    .AddInMemoryClients(InMemoryInitConfig.GetClients())
    .AddLdapUsers<OpenLdapAppUser>(Configuration.GetSection("ldapOpenLdap"), UserStore.InMemory);
}
```

Oh, wait! What is `OpenLdapAppUser` and `UserStore.InMemory`!? To get more details, you can go on the Github page of the project. It will explain what it is. Let's keep it as it is for now. However, if you want to customize it is quite easy.

Startup integration is complete.

### 3. Update the QuickStart in order to use our LDAP
Here's the important point! Many people in the forums will tell you, update the AccountController and voila! However nobody really explain what you need to change. It's nothing complex, but let's do it together so you can run your code without hitting any issue.

#### 3.1 AccountController.cs
You will have to change the `public` constructor in order to replace the TestUsers for our LdapUserStore.

```csharp
  public AccountController(
    IIdentityServerInteractionService interaction,
    IClientStore clientStore,
    IHttpContextAccessor httpContextAccessor,
    IAuthenticationSchemeProvider schemeProvider,
    IEventService events,
    ILdapUserStore userStore) // New thing!
  {
    _interaction = interaction;
    _events = events;
    _userStore = userStore;
    _account = new AccountService(interaction, httpContextAccessor, schemeProvider, clientStore);
  }
```

Next, it is the **Login** method while validating the model (Look for `_userStore`):

```csharp
// some code before getting here in the method
if (ModelState.IsValid)
{
  // validate username/password against Ldap
  var user = _userStore.ValidateCredentials(model.Username, model.Password); 
  if (user != default(IAppUser))
  {
    await _events.RaiseAsync(new UserLoginSuccessEvent(user.Username, user.SubjectId, user.Username));

    // only set explicit expiration here if user chooses "remember me". 
    // otherwise we rely upon expiration configured in cookie middleware.
    AuthenticationProperties props = null;
    if (AccountOptions.AllowRememberLogin && model.RememberLogin)
    {
      props = new AuthenticationProperties
      {
        IsPersistent = true,
        ExpiresUtc = DateTimeOffset.UtcNow.Add(AccountOptions.RememberMeLoginDuration)
      };
    };

    // issue authentication cookie with subject ID and username
    await HttpContext.SignInAsync(user.SubjectId, user.Username, props);

    // make sure the returnUrl is still valid, and if so redirect back to authorize endpoint or a local page
    if (_interaction.IsValidReturnUrl(model.ReturnUrl) || Url.IsLocalUrl(model.ReturnUrl))
    {
      return Redirect(model.ReturnUrl);
    }

    return Redirect("~/");
  }
  // some code until the end of the method
```

After you will have to update the **ExternalLoginCallback** method:

```csharp
// Some code

// this is where custom logic would most likely be needed to match your users from the
// external provider's authentication result, and provision the user as you see fit.
var user = _userStore.FindByExternalProvider(provider, userId);
if (user == default(IAppUser))
{
    // this sample simply auto-provisions new external user
    // another common approach is to start a registrations workflow first
    user = _userStore.AutoProvisionUser(provider, userId, claims);
}

var additionalClaims = new List<Claim>();
// Some code ...
```

Normally also **Logout** should trigger a change within the Ldap provider. However, I was not able to succesfully implement the Event by the time of this writting in the Nuget package. 

# 4. Some image
_To come_

