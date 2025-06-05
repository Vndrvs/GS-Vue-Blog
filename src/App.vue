<template>
  <main id="app">
    <SiteHeader :is-sidebar-open="showSidebar" @toggle-sidebar="toggleSidebar" />
    <SidebarOverlay :isOpen="showSidebar" @close="closeSidebar" />
    <div class="main-content">
      <router-view />
    </div>
  </main>
</template>

<script>
import SidebarOverlay from './components/SidebarOverlay.vue'
import SiteHeader from './components/SiteHeader.vue'

export default {
  components: { SidebarOverlay, SiteHeader },
  data() {
    return {
      showSidebar: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
    closeSidebar() {
      this.showSidebar = false
    },
  },
}
</script>

<style lang="scss">
@use '@/styles/element/mixins.scss' as *;

#app {
  .main-content {
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-items: center;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
}

@media (max-width: 900px) {
  #app {
    .main-content {
      overflow: auto;
    }
  }
}
</style>
