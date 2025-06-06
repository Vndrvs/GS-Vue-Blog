<template>
  <header class="app-header">
    <div
      class="toggle-box"
      :class="{
        hidden: !showToggleBox,
        'sidebar-open': isRotated,
      }"
    >
      <div class="toggle-container">
        <button id="toggle-button" :class="{ rotate: isRotated }" @click="onToggleSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="26"
            viewBox="2 2 20 20"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 17l-5-5 5-5M18 17l-5-5 5-5" />
          </svg>
        </button>
      </div>

      <div class="toggle-container">
        <button
          id="toggle-button"
          class="theme-btn"
          @click="toggleTheme"
          :title="theme === 'dark' ? 'Light Mode' : 'Dark Mode'"
        >
          <img :src="theme === 'dark' ? sunIcon : moonIcon" />
        </button>
      </div>
    </div>
    <div class="logo">
      <img src="@/assets/gs-logo.png" alt="Logo" />
    </div>
  </header>
</template>

<script setup>
import sunIcon from '@/assets/sun.svg'
import moonIcon from '@/assets/moon.svg'
import { ref, onMounted, onUnmounted } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')
const showToggleBox = ref(true)
const lastScrollPosition = ref(0)

import { computed } from 'vue'

const props = defineProps({
  isSidebarOpen: Boolean,
})

const isRotated = computed(() => props.isSidebarOpen)

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(theme.value)
  localStorage.setItem('theme', theme.value)
}

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) return

  showToggleBox.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  document.documentElement.classList.add(theme.value)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const emit = defineEmits(['toggle-sidebar'])

const onToggleSidebar = () => {
  isRotated.value = !isRotated.value
  emit('toggle-sidebar')
}
</script>

<style scoped lang="scss">
.app-header {
  height: 80px;
  display: flex;
  top: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;

  .toggle-box {
    position: fixed;
    top: 30px;
    left: 30px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    transform: translateX(0);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    &.sidebar-open {
      transform: translateX(190px);
    }

    &.hidden {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-50px);
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    & .toggle-container {
      display: flex;
      justify-content: flex-end;

      & #toggle-button {
        flex-shrink: 0;
        width: 4em;
        height: 4em;
        border-radius: 50%;
        border: 3px solid var(--text-clr);
        cursor: pointer;
        pointer-events: auto;
        transition: right 0.3s ease;

        & svg {
          transform: rotate(180deg);
          width: 1.8em;
          height: auto;
          stroke: black;
          stroke-width: 2.5;
          transition: transform 0.3s ease;
        }

        &.rotate svg {
          transform: rotate(360deg);
        }
      }

      & .theme-btn {
        width: 0.7em;
        height: 0.7em;
        padding: 0.5em;
        border-radius: 50%;
        cursor: pointer;
        background-color: var(--accent-clr);
        display: flex;
        align-items: center;
        justify-content: center;

        & img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        &:hover {
          background-color: var(--accent-clr-shade);
        }
      }
    }
  }

  .logo img {
    position: relative;
    top: 20px;
    height: 4em;
    margin: 0 auto !important;
  }
}

@media (max-width: 900px) {
  .toggle-box {
    top: 20px !important;

    &.sidebar-open {
      transform: translateX(calc(100dvw - 7em)) !important;
    }

    &.hidden {
      pointer-events: none;
    }

    & #toggle-button {
      border: 2px solid var(--text-clr) !important;

      & svg {
        height: 24px !important;
        stroke-width: 0.2em !important;
      }
    }
  }

  .logo img {
    position: relative;
    top: 10px;
    height: 3.5em;
    margin: 0 auto !important;
  }
}
</style>
