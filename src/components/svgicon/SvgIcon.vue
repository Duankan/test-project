<template>
  <svg
    :class="svgClass"
    :style="extendstyle"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    extendstyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        color: this.color
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  /* width: 1em;
  height: 1em;
  vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}

/* .svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
} */
</style>
