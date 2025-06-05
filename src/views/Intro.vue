<template>
  <div class="main-wrapper">
    <div class="headline">
      <el-page-header @back="goBackUsingBack">
        <template #content>
          <el-breadcrumb class="custom-breadcrumb" separator="/" />
          <h2 class="spec-title">Projects</h2>
        </template>
      </el-page-header>
    </div>
    <div class="title-box">
      <h1 class="title"></h1>
      <h3 class="heading">For that one place on the internet that feels like falling in love.</h3>
      <div class="main-text">
        <p class="paragraph">
          The kind that makes you want to scroll lower. Or click, just to stay a little longer.
        </p>
        <p class="paragraph">
          The experience that brings comfort and joy, even when the world is a very frightnening
          place.
        </p>
        <p class="paragraph">
          Not because it was coded to do so, but because the ones who gave birth to it couldn't help
          but care too much.
        </p>
        <p class="paragraph">
          Self-serving design is no good design. But when something purposeful is built with
          emotion, it shows.
        </p>
        <p class="paragraph">
          Maybe not in the way you expect, but it leaves warmth exactly where it’s most needed.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useNavigation } from '../utils/navigation.js'

export default {
  name: 'IntroView',
  setup() {
    const { goBackUsingBack } = useNavigation()
    const container = ref(null)

    return {
      goBackUsingBack,
      container,
    }
  },
}
</script>

<style scoped lang="scss">
@use '@/styles/element/mixins.scss' as *;

.main-wrapper {
  width: 80%;
  display: flex;
  flex-direction: column;

  .headline {
    & h4 {
      color: var(--text-clr);
      font-weight: 400;
    }

    & .el-divider.el-divider--vertical {
      border-left: 1.5px solid var(--text-clr) !important;
      background-color: transparent !important;
      margin: 0 8px !important;
      column-gap: 0px;
    }
    & .el-page-header {
      color: var(--text-clr);
      margin: 16px 0 10px 0;
      column-gap: 0px;
      row-gap: 0px;
      gap: 0px;
    }
    .spec-title {
      @include font-style(var(--body-font), 400, 16px, 1.4, none, var(--text-clr) !important);
    }
  }
  & h3 {
    margin: 10px 0;
    color: var(--text-clr);
  }
  & p {
    color: var(--text-clr);
  }
}

@media (max-width: 900px) {
}

@media (max-width: 700px) {
}
@media (max-width: 550px) {
}
</style>
