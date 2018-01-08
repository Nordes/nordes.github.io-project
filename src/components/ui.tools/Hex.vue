<template>
  <div :class="getHexClass() + ' hexSpacer'">
    <div class="text-center">
      <h4>{{ title }}</h4>
      <strong v-if="content">Description: </strong>
      <small v-if="content">{{ content }}</small><br>
      <a v-if="link" :href="link" class="badge badge-dark">More details...</a>
    </div>
  </div>
</template>

<style scoped>
.hexSpacer {
  margin-left: 20px;
  margin-right:20;
  display: inline-block;
}
</style>

<script>
  export default {
    name: 'hex',
    props: {
      link: {
        type: String,
        default: null,
        required: false,
        validator: (value) => {
          if (value === null) {
            return true
          }

          // Too lazy to write it myself. Found regex at: https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
          return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
        }
      },
      title: {
        type: String,
        default: '',
        required: false
      },
      content: {
        type: String,
        default: '',
        required: false
      },
      alt: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data: () => {
      return {}
    },
    methods: {
      getHexClass () {
        if (this.alt) {
          return 'hexAlt'
        }

        return 'hexagon'
      },
      goTo () {
        if (this.link) {
          window.location.href = this.link
        }
      }
    }
  }
</script>
