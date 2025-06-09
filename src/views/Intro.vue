<template>
  <div class="main-wrapper">
    <div class="headline">
      <el-page-header @back="goBackUsingBack">
        <template #content>
          <el-breadcrumb class="custom-breadcrumb" separator="">
            <el-breadcrumb-item class="custom-breadcrumb-item2" id="route">
              <a @click.prevent="goToHome">Man1fest</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
      </el-page-header>
    </div>

    <div class="typewriter-box">
      <h1 ref="typewriterRef" class="typewriter-text"></h1>
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
    const typewriterRef = ref(null)

    const phrases = [
      'For that one place on the internet that feels like falling in love.',
      'The kind that makes you want to scroll lower. Or click, just to stay a little longer.',
      'Not because it was coded to do so, but because the ones who gave birth to it cared a bit too much.',
      'A design that only serves itself is hollow.',
      'But when something purposeful is built with emotion, it shows.',
      'It may not look like what you expected. But it feels like exactly what you needed.',
    ]

    function typeWriter(text, i, callback) {
      if (i < text.length) {
        if (typewriterRef.value) {
          typewriterRef.value.innerHTML =
            text.substring(0, i + 1) + '<span class="caret" aria-hidden="true"></span>'
        }
        setTimeout(() => typeWriter(text, i + 1, callback), 70)
      } else if (typeof callback === 'function') {
        setTimeout(callback, 2000)
      }
    }

    function startTextAnimation(i) {
      if (typeof phrases[i] === 'undefined') {
        setTimeout(() => startTextAnimation(0), 3000)
        return
      }

      if (i < phrases.length) {
        typeWriter(phrases[i], 0, () => {
          startTextAnimation(i + 1)
        })
      }
    }

    onMounted(() => {
      startTextAnimation(0)
    })

    return {
      goBackUsingBack,
      typewriterRef,
    }
  },
}
</script>

<style scoped lang="scss">
@use '@/styles/element/mixins.scss' as *;

.main-wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .headline {
    & .el-page-header {
      margin-left: 20px;
    }
  }

  & .typewriter-box {
    min-height: 70svh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    & .typewriter-text {
      font-size: 2.5rem;
      font-family: var(--heading-font);
      font-weight: 400;
      color: var(--text-clr);
      text-transform: none;
    }

    & .caret::after {
      content: '|';
      display: inline-block;
      margin-left: 3px;
      animation: blink-caret 1s steps(1) infinite;
      color: var(--text-clr);
    }
    & h1 {
      animation: softFadeIn 0.6s ease forwards;
    }
  }
}

@keyframes softFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink-caret {
  50% {
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .main-wrapper {
    & .headline {
      & .el-page-header {
        margin-left: 25px;
      }
    }

    & .typewriter-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
