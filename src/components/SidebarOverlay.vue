<template>
  <div class="sidebar-overlay" v-show="isOpen" @click.self="closeSidebar"></div>
  <div class="sidebar-content" :class="{ open: isOpen }">
    <el-menu :default-active="activeIndex" :class="{ 'on-home': isHome }" id="sidebar">
      <el-menu-item v-if="!isHome" index="home" class="sidebar-item">
        <span @click="handleNavigation('/')">BLOG</span>
      </el-menu-item>
      <el-menu-item index="2" class="sidebar-item">
        <span @click="handleNavigation('/projects')">PROJECTS</span>
      </el-menu-item>
      <el-menu-item index="3" class="sidebar-item">
        <span @click="handleNavigation('/intro')">MAN1FEST</span>
      </el-menu-item>
      <el-menu-item disabled class="sidebar-item line-separator">
        <span class="spacer"></span>
      </el-menu-item>
      <el-menu-item index="4" class="sidebar-item">
        <span
          @click="
            () => {
              handleNavigation('/intro')
              goToRandomPost()
            }
          "
          >RANDOM<br />
          POST</span
        >
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_POSTS } from '@/graphql/getPosts'

const route = useRoute()
const router = useRouter()
const { result } = useQuery(GET_POSTS)

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
const activeIndex = ref('1')

const isHome = computed(() => route.name === 'Home')

const closeSidebar = () => emit('close')

const handleNavigation = (to) => {
  router.push(to)
  emit('close')
}

const goToRandomPost = () => {
  const posts = result.value?.blogPosts || []
  if (posts.length) {
    const randomPost = posts[Math.floor(Math.random() * posts.length)]
    if (randomPost?.documentId) {
      router.push(`/blog/${randomPost.documentId}`)
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/element/mixins.scss' as *;

.sidebar-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.sidebar-content {
  position: fixed;
  left: 0;
  top: 0px;
  width: 270px;
  height: 100svh;
  background: var(--base-clr);
  padding: 10px;
  z-index: 901;
  opacity: 1 !important;
  transform: translateX(-100%);
  opacity: 0;
  transition:
    transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.35s ease-out;

  &::after {
    content: '';
    position: absolute;
    top: -100px;
    right: 0;
    width: 2px;
    height: 0%;
    background-color: var(--text-clr);
    transition: height 0.3s ease 0.4s;
    z-index: 1;
  }

  &.open {
    transform: translateX(0);
    opacity: 1;

    &::after {
      height: 120dvh;
    }
  }

  &:not(.open)::after {
    height: 0;
    transition: height 0.1s ease;
  }

  & .el-menu {
    height: 100%;
  }

  #sidebar {
    background: none;
    border: none;
    overflow: hidden;
    margin-top: 130px;

    #randomizer {
      white-space: normal;
    }

    .el-menu-item {
      background-color: var(--background-clr);
      margin: 10px 0;
    }

    & span {
      @include font-style(var(--heading-font), 500, 3em, 44px, none, var(--text-clr));
    }

    & .sidebar-item.line-separator {
      margin: 20px 0px 30px 23px;
      width: 40px;
      height: 3px;
      background-color: var(--text-clr) !important;
      opacity: 1 !important;
      cursor: default !important;
    }

    & .sidebar-item {
      transition: opacity 0.3s ease;
    }

    &.on-home {
      margin-top: 140px;
    }
  }
}

@media (max-width: 900px) {
  .sidebar-content::after {
    display: none !important;
    content: none !important;
  }
  .sidebar-content {
    width: 100vw !important;
    height: 100vh !important;

    #sidebar {
      display: flex;
      flex-direction: column;
      justify-items: center;
      text-align: center;
      margin-top: 130px;

      & span {
        @include font-style(var(--heading-font), 600, 3em, 44px, none, var(--text-clr));
      }

      & .el-menu-item {
        margin-bottom: 20px;
        padding: 0px;
      }

      & .sidebar-item.line-separator {
        height: 5px;
        margin: 20px auto 45px auto;
      }

      & .sidebar-item {
        justify-content: center;
      }
    }
  }
}
</style>
