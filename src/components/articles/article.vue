<template>
  <div class="container">
    <div class="row">
      <div class="col col-12">
        <img :src="`../static/images/articles/${this.$route.params.id}/header.png`" class="w-100 my-2"/>
      </div>
    </div>
    <div v-html="result"></div>
  </div>
</template>

<script>
import md from 'marked'
import hljs from 'highlight.js'

export default {
  name: 'Article',
  components: {
  },
  data () {
    return {
      data: '# test me',
      result: undefined
    }
  },
  created () {
    md.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
      langPrefix: 'hljs lang-'
    })
  },
  async mounted () {
    try {
      this.data = await this.$http.get(`../static/articles/${this.$route.params.id}.md`)

      md(this.data.body, (err, content) => {
        if (err) {
          return console.log(err)
        }

        this.result = content
      })
    } catch (err) {
      this.data = md('# Error... or this article does not exists', (err, content) => {
        if (err) {
          console.error(`Should not happen, but here's the error: ${err}`)
        }

        this.result = content
      })
    }
  },
  methods: {
    getStyle () {
      return `background-image: url(../static/images/articles/${this.$route.params.id}/header.png); height:200px; background-repeat: no-repeat`
    }
  }
}
</script>
