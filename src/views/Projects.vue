<template>
  <div class="headline">
    <el-page-header @back="goBackUsingBack">
      <template #content>
        <el-breadcrumb class="custom-breadcrumb" separator="/" />
        <h2 class="spec-title">Projects</h2>
      </template>
    </el-page-header>
  </div>

  <div class="projects-area">
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="!loading && (!projects || projects.length === 0)">No projects available.</div>
    <div v-if="!loading && projects && projects.length">
      <el-row :gutter="10" class="box-container">
        <template v-for="(project, index) in projects" :key="project.documentId" class="projects-container">
          <router-link :to="`/projects/${project.documentId}`" class="project-link">
            <div class="project-container">
              <div class="project-bubble">
                <div class="bubble-content">
                  <div class="title-container">
                    <h2>{{ project.projectTitle }}</h2>
                  </div>
                  <div class="heading-container">
                    <h3>{{ project.projectHeading }}</h3>
                  </div>
                </div>
              </div>
              <div class="images-container">
                <div v-if="project.projectCover" class="bubble-cover">
                  <img
                    class="cover-image"
                    :src="project.projectCover.url"
                    :alt="project.projectCover.alternativeText"
                  />
                </div>
                <div v-if="project.technologies && project.technologies.length" class="tech-icons">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech.technologyName"
                    class="icons-span"
                  >
                    <img
                      v-if="tech.technologyIcon"
                      class="tech-icon"
                      :src="tech.technologyIcon.url"
                      :alt="tech.technologyIcon.alternativeText"
                    />
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { GET_PROJECTS } from '../graphql/getprojects';
import { ref, watchEffect } from 'vue';
import { useNavigation } from '../utils/navigation.js'; 

export default {
  name: 'ProjectsView',

  setup() {
    const { goBackUsingBack } = useNavigation();
    
    const { result, loading, error } = useQuery(GET_PROJECTS, { fetchPolicy: 'no-cache' });
    
    const projects = ref([]);

    watchEffect(() => {
      if (result.value && result.value.projects) {
        projects.value = result.value.projects;
      } else {
        projects.value = [];
      }
    });

    return {
      projects,
      loading,
      error,
      goBackUsingBack
    };
  }
};
</script>

<style lang="scss">
@use "@/styles/element/mixins.scss" as *;

.spec-title {
  @include font-style(var(--body-font), 400, 16px, 1.4, none, var(--text-clr) !important);
}

.project-link {
  text-decoration: none; 
  margin: auto;
}

.projects-area {
  width: 90%;
  margin: 3% auto 5% auto;
  
  & .box-container {
    row-gap: 5vh;
    column-gap: 2vw;
  }
  
  & .project-container {
    @include container-style(grid, auto, 1.4rem, 330px, 120px);
    align-items: center;
    overflow: hidden;
    border-radius: 1.9rem;
    border: 1px solid var(--text-clr);
    grid-template-columns: 2fr 1fr;
    background-image: linear-gradient(
      150deg,
      var(--text-clr / 80%) 0%,
      var(--secondary-text-clr / 10%) 80%
    );
    
    & .images-container {
      max-width: 100px;
      margin-left: 20px;
      
      & .bubble-cover {
        align-items: left;
        align-items: flex-start;
      }
      
      & .cover-image {
        width: 90px;
        border-radius: 0.8rem;
      }
      
      & .icons-span {
        max-height: 24px;
      }
      
      & .tech-icons {
        padding: 2px;
        width: 87px;
        max-height: 30%;
        border-radius: 0.4rem;
        border: 0.5px solid var(--text-clr);
        display: flex;
        gap: 4px;
        margin-top: 4px;
        margin-bottom: -10px;
        
        & .tech-icon {
          max-height: 23px;
          margin-left: 3px;
        }
      }
    } 
    
    & .project-bubble {
      display: flex;
      grid-template-columns: 1fr 1fr;
      text-align: left;
      height: 16vh;
      
      & .bubble-content {
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      & .read-btn {
        background-color: var(--accent-clr);
      }
      
      & h2, h3 {
        color: var(--text-clr);
      }
      
      & h2 {
        font-family: Montserrat;
        position: relative;
        font-weight: 700;
        font-size: 22px;
      }
      
      & .heading-container {
        padding: 3px 0 0 0;
        border-top: 1.4px solid var(--text-clr);
        min-width: 160px;
      }
      
      & h3 {
        font-size: 15px;
        font-weight: 500;
        font-family: Urbanist;
      }
    }
  }
  & .project-container:hover {
    transition: 0.4s ease;
    transform: translateY(-5px);
    box-shadow: var(--accent-shadow-clr) 1px 8px 20px ;
  }
}


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
}

</style>