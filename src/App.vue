<template>
  <main id="app">
    <NavBar class="sidebar" @toggle-sidebar="toggleSidebar" />
    <div :class="['main-content', { 'with-sidebar': isSidebarCollapsed }]">
      <div class="header">
        <div class="logo-div">
          <img src="@/assets/gs-logo.png" alt="blog logo" class="main-logo">
        </div>
      </div>
      <router-view />
    </div>
  </main>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import { ref } from "vue";

const isSidebarCollapsed = ref(true);

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}

function toggleMobileSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}
</script>

<style lang="scss">

@use "@/styles/element/mixins.scss" as *;


#app {
  height: 100vh;
  @include container-style(grid, 0, 0, 100vw, 100dvh);
  grid-template-columns: auto 1fr;
  overflow: hidden;
  background-image: linear-gradient(10deg, var(--secondary-text-clr) 1%, var(--text-clr) 300%), linear-gradient(-4deg, var(--line-clr) 10%, var(--text-clr) 100%);
}

.sidebar {
  transition: width 0.3s ease;
}

.main-content {
  padding: 20px;
  overflow: hidden;
  text-align: center;
  transition: margin-right 0.3s ease, padding 0.5s ease;
  
  & .header {
    display: flex;
    justify-content: center;
    height: 9%;
    margin: 12px 0 24px 0;
    
    & .logo-div {
      height: 110%;
      display: flex;
      justify-content: center;
      align-content: center;
      
      & .main-logo {
        margin-top: 7%;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.main-content.with-sidebar {
  margin-right: 90px;
}

@media (max-width: 900px) { 
  #app {
    @include container-style(grid, 0, 0, 100vw, 100vh);
    grid-template-columns: auto 1fr;
    overflow: hidden;
    background-color: var(--background-color);
  }
  
  .sidebar {
    transition: width 0.3s ease;
  }
  
  .main-content {
    padding: 20px;
    overflow: auto;
    transition: margin-right 0.3s ease, padding 0.5s ease;
    
    & .header {
      display: flex;
      justify-content: center;
      height: 9%;
      margin: 12px 0 24px 0;
      
      & .logo-div {
        height: 110%;
        display: flex;
        justify-content: center;
        align-content: center;
        
        & .main-logo {
          margin-top: 7%;
          height: 50px;
          width: 50px;
        }
      }
    }
  }
  
  .main-content.with-sidebar {
    margin-right: 50px;
  }
}

</style>