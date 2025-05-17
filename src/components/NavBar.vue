<template>
  <el-menu
  :default-active="activeIndex"
  id="sidebar"
  :style="sidebarStyles"
  >
  <div class="toggle-container" :class="{ 'full-width': !isCollapse }" id="first-icon">
    <el-menu-item index="0" @click="toggleSidebar" class="toggle-button-item">
      <button id="toggle-button" :class="{ rotate: isRotated }">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="2 2 20 20" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 17l-5-5 5-5M18 17l-5-5 5-5"/>
        </svg>
      </button>
    </el-menu-item>
  </div>
  <div class="toggle-container" :class="{ 'full-width': !isCollapse }">
    <el-menu-item index="1" class="sidebar-item">
      <button id="toggle-button" class="theme-btn" @click="toggleTheme" :title="theme === 'dark' ? 'Light Mode' : 'Dark Mode'">
        <img :src="theme === 'dark' ? sunIcon : moonIcon" />
      </button>
    </el-menu-item>
  </div>
  
  <el-collapse-transition>
    <div v-show="!isCollapse">
      <el-menu-item v-if="!isHome" index="home" class="sidebar-item">
        <span :class="{ 'fade-out': isCollapse }" @click="navbarClicked"><router-link to="/">BLOG</router-link></span>
      </el-menu-item>
      
      <el-menu-item index="2" class="sidebar-item">
        <span :class="{ 'fade-out': isCollapse }" @click="navbarClicked"><router-link to="/projects">PROJECTS</router-link></span>
      </el-menu-item>
      <el-menu-item index="3" class="sidebar-item">
        <span :class="{ 'fade-out': isCollapse }" @click="navbarClicked"><router-link to="/intro">ABOUT GS</router-link></span>
      </el-menu-item>
      <el-menu-item class="sidebar-item line-separator" :class="{ 'fade-out': isCollapse }">
        <span></span>
      </el-menu-item>
      <el-menu-item index="4" class="sidebar-item">
        <span :class="{ 'fade-out': isCollapse }" id="randomizer" @click="goToRandomPost(), navbarClicked()">RANDOM POST</span>
      </el-menu-item>
    </div>
  </el-collapse-transition>
</el-menu>
</template>

<script setup>
import { ref, computed, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { GET_POSTS } from "@/graphql/getPosts";
import sunIcon from "@/assets/sun.svg";
import moonIcon from "@/assets/moon.svg";

const route = useRoute();
const router = useRouter();

const { result, loading, error } = useQuery(GET_POSTS);
const posts = computed(() => result.value?.blogPosts || []);

const goToRandomPost = () => {
  if (loading.value || error.value || !posts.value.length) return;
  
  const randomIndex = Math.floor(Math.random() * posts.value.length);
  const randomPost = posts.value[randomIndex];
  
  if (randomPost && randomPost.documentId) {
    router.push(`/blog/${randomPost.documentId}`);
  }
};

const emit = defineEmits(["toggle-sidebar"]);

const activeIndex = ref("1");
const isCollapse = ref(true);
const isRotated = ref(true);
const theme = ref(localStorage.getItem("theme") || "light");
const isMobile = window.innerWidth <= 900;

const isHome = computed(() => route.path === "/" || route.path === "/home");

const sidebarStyles = computed(() => ({
  width: isCollapse.value ? (isMobile ? "50px" : "80px") : (isMobile ? "100vw" : "280px"),
  borderRight: isCollapse.value ? "none" : (isMobile ? "none" : "3px solid var(--text-clr)"),
  transition: "width 0.3s ease, border-right 0.3s ease",
}));

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value;
  isRotated.value = !isRotated.value;
  emit("toggle-sidebar", isCollapse.value);
};

const navbarClicked = () => {
  if (!isCollapse.value) {
    setTimeout(() => {
      isCollapse.value = true;
      isRotated.value = true;
      emit("toggle-sidebar", true);
    }, 300);
  }
};

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  document.documentElement.className = theme.value;
  localStorage.setItem("theme", theme.value);
};

onMounted(() => {
  document.documentElement.className = theme.value;
});
</script>

<style lang="scss">

@use "@/styles/element/mixins.scss" as *;

#sidebar {
  @include font-style(var(--heading-font), 600, 16px, 1.4, none, var(--text-clr));
  display: inline-block;
  border: none;
  margin: 0 0 10px 10px;
  height: 100svh;
  background-color: var(--background-clr);
  position: sticky;
  top: 0;
  align-self: start;
  transition: width 600ms ease, border-right 0.3s ease;
  overflow: auto;
  border-right: 0 solid transparent;
  margin-top: 17px;
  
  #randomizer {
    @include font-style(var(--heading-font), 600, 3em, 44px, none, var(--text-clr));
    white-space: normal;
  }
  
  .el-menu-item {
    background-color: var(--background-clr);
  }
  
  & a {
    @include font-style(var(--heading-font), 600, 3em, 44px, none, var(--text-clr));
  }
  
  & .sidebar-item.line-separator {
    width: 10px;
    margin: 14px 0px 24px 23px;
    border-top: 3px solid var(--text-clr);
    height: 0px;
  }
  
  #toggle-button {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid var(--text-clr);
    cursor: pointer;
    pointer-events: auto;
    transition: right 0.3s ease;
  }
  
  & .toggle-button-item {
    transition: right 0.3s ease;
  }
  
  & .toggle-container {
    margin-top: 20px;
    margin-right: 0;
    display: flex;
    justify-content: flex-end;
  }
  
  #toggle-button.rotate svg {
    transform: rotate(180deg);
  }
  
  & .fade-out {
    border-bottom: none;
    opacity: 0;
    transition: opacity 0.3s ease, border-bottom 0.3s ease;
  }
  
  & .sidebar-item {
    transition: opacity 0.3s ease;
  }

  & .theme-btn {
    width: 50px;
    height: 50px;
    padding: 0.5em;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background-color: var(--accent-clr);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in-out;
  }
  
  & .theme-btn img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  & .theme-btn:hover {
    opacity: 0.8;
  }
}

@media (max-width: 900px) { 

  #first-icon {
    margin-top: 20px !important;
  }
  
  #sidebar {
    display: inline-block;
    margin: auto;
    transition: width 1000ms ease, border-right 1s ease;
    margin-top: 9px;

    .el-menu-item {
      margin-bottom: 20px;
    }
    
    & .sidebar-item.line-separator {
      width: 10px;
      border-top: 3px solid var(--text-clr);
      height: 0px;
      margin: 20px auto 20px auto;
    }
    
    & .toggle-container {
      margin: 0 -20px -20px 0;
      display: flex;
      justify-content: flex-end;
      
      &.full-width {
        margin: 0 -10px -20px 0;
      }
    }

    #toggle-button {
      padding: 0;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--text-clr);
      cursor: pointer;
      pointer-events: auto;
    }

    & .theme-btn {
      width: 35px;
      height: 35px;
      padding: 0.2em;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      background-color: var(--accent-clr);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease-in-out;
    }
    
    & .fade-out {
      border-bottom: none;
      opacity: 0;
      transition: opacity 0.3s ease, border-bottom 0.3s ease;
    }
    
    & .sidebar-item {
      transition: opacity 0.3s ease;
      justify-content: center;
    }
    
    & .theme-btn img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    & .theme-btn:hover {
      opacity: 0.8;
    }
  }
}

</style>