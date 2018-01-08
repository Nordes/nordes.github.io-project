<template>
  <div class="container">
    <div class="row">
      <h3>Preface</h3>
    </div>
    <div class="row">
      <p>Here's 9 tech I work with.</p>
    </div>
    <div class="row">
      <h3>Tech</h3>
    </div>
    <div class="row pt-2">
      <div class="col col-lg-12 text-center" style="margin-top:20px;">
        <hex-row :items="projects.slice(0,3)" />
      </div>
    </div>
    <div class="row">
      <!-- Push left -->
      <div class="col col-lg-12 text-center" > <!--style="margin-top:-60px;" + left 160-->
        <hex-row :items="projects.slice(3,5)" :alternate="false" revert />
      </div>
    </div>
    <div class="row">
      <div class="col col-lg-12 text-center">
        <hex-row :items="projects.slice(5,8)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  components: {
    'hex': () => import('@/components/ui.tools/Hex'),
    'hex-row': () => import('@/components/ui.tools/HexRow')
  },
  data () {
    return {
      projects: [
        {
          title: 'C#/.Net',
          description: `I've started using .Net FrameWork 2 and I used it for building all type of applications running on Windows, Windows Server or even Azure`,
          link: null
        },
        {
          title: 'Dotnet Core',
          description: 'For building strong and reliable apps that can run on all type of OS (Windows, Linux, Mac).',
          link: null
        },
        {
          title: 'NodeJs',
          description: 'For building small client for process automation. I also used it as a server using express or more likely as a client using VueJs + WebPack and etc.',
          link: null
        },
        {
          title: 'SQL/NoSQL/Key value store',
          description: 'SQL Server, MongoDB, RavenDB, Redis and some more',
          link: null
        },
        {
          title: 'Azure',
          description: `I've used many features. (Azure Queues, Storage, VM, WebApps, SQL Server Azure, etc.)`,
          link: null
        },
        {
          title: 'Git',
          description: 'Daily use for working efficiently (At work, at home or while using Github). I also used to do configuration for Stash now named BitBucket, GitLab, GitBlitz',
          link: null
        },
        {
          title: 'Jira/GirLab',
          description: `To track issues, nothing is more easy and to manage people schedule it's also quite useful.`,
          link: null
        },
        {
          title: 'Bamboo/Jenkins/GitLab',
          description: 'Continuous integration system. I love to have that ready from the beginning of the project in order to care less about all the deployment steps.',
          link: null
        },
        {
          title: 'Docker',
          description: 'Using container simplify life in order to have an environment running on all type of platform while developping. Especially when using Redis ;).',
          link: null
        }
      ]
    }
  }
}
</script>
