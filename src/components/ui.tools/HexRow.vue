<template>
  <div>
    <template v-for="(item, index) in items">
      <template v-if="(index % 2 === 0 && alternate) || (!alternate)">
        <hex :key='index' :alt="!revert" :title="item.title" :content="item.description" :link="item.link" />
      </template>
      <template v-else-if="(index % 2 === 1 && alternate)">
        <hex :key='index' :alt="revert" :title="item.title" :content="item.description" :link="item.link" />
      </template>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'hex-row',
    components: {
      'hex': () => import('@/components/ui.tools/Hex')
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      alternate: {
        type: Boolean,
        require: false,
        default: true
      },
      revert: {
        type: Boolean,
        require: false,
        default: false
      }
    }
  }
</script>
