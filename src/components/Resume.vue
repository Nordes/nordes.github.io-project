<template>
  <div class="container">
    <!-- Left bar options? Tech / Job -->
    <div class="row pt-2">
      <div class="col col-lg-12 text-center" style="margin-top:20px;">
        <hex-row :items="stuff.slice(0,3)" revert />
      </div>
    </div>
    <div class="row">
      <!-- Push left -->
      <div class="col col-lg-12 text-center" > <!--style="margin-top:-60px;" + left 160-->
        <hex-row :items="stuff.slice(3,5)" :alternate="false" />
      </div>
    </div>
    <div class="row">
      <div class="col col-lg-12 text-center">
        <hex-row :items="stuff.slice(5,8)" revert/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resume',
  components: {
    'hex-row': () => import('@/components/ui.tools/HexRow')
  },
  data () {
    return {
      stuff: [
        {title: 'Konica Minolta', description: 'R&D in Itami/Japan', link: 'https://www.linkedin.com/in/nordes/'},
        {title: 'CX Company', description: 'Team Lead in Maastricht/Netherlands', link: 'https://www.linkedin.com/in/nordes/'},
        {title: 'onePoint', description: 'Senior Dev/DBA/Architect in Bordeaux/France', link: 'https://www.linkedin.com/in/nordes/'},
        {title: 'IsaiX', description: 'Dev in Montreal/Canada', link: 'https://www.linkedin.com/in/nordes/'},
        {title: 'Desjardins', description: 'Dev in Montreal/Canada', link: 'https://www.linkedin.com/in/nordes/'},
        {title: 'C@M Internet', description: 'Tech Support Supervisor in Montreal/Canada', link: 'https://www.linkedin.com/in/nordes/'},
        {title: 'Coredium Inc.', description: 'Dev in Montreal/Canada', link: 'https://www.linkedin.com/in/nordes/'},
        {title: 'C@M Internet', description: 'Tech Support in Montreal/Canada', link: 'https://www.linkedin.com/in/nordes/'}]
    }
  }
}
</script>
