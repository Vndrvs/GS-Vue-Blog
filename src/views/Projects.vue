<template>
  <div class="main-wrapper">
    <div class="headline">
      <el-page-header @back="goBackUsingBack">
        <template #content>
          <el-breadcrumb class="custom-breadcrumb" separator="">
            <el-breadcrumb-item class="custom-breadcrumb-item" id="route">
              <a>Homepage</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
      </el-page-header>
    </div>

    <div class="projects-area">
      <div v-if="loading">Loading...</div>
      <div v-if="error">Error: {{ error.message }}</div>
      <div v-if="!loading && (!projects || projects.length === 0)">No projects available.</div>
      <div v-if="!loading && projects && projects.length">
        <el-row :gutter="10" class="box-container">
          <div v-for="project in projects" :key="project.documentId" class="projects-container">
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
                  <div
                    v-if="project.technologies && project.technologies.length"
                    class="tech-icons"
                  >
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
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import { GET_PROJECTS } from '@/graphql/getProjects.js'
import { ref, watchEffect } from 'vue'
import { useNavigation } from '../utils/navigation.js'

export default {
  name: 'ProjectsView',

  setup() {
    const { goBackUsingBack } = useNavigation()

    const { result, loading, error } = useQuery(GET_PROJECTS, { fetchPolicy: 'no-cache' })

    const projects = ref([])

    watchEffect(() => {
      if (result.value && result.value.projects) {
        projects.value = result.value.projects
      } else {
        projects.value = []
      }
    })

    return {
      projects,
      loading,
      error,
      goBackUsingBack,
    }
  },
}
</script>

<style scoped lang="scss">
@use '@/styles/element/mixins.scss' as *;

.main-wrapper {
  width: 80%;

  .headline {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-page-header {
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
    }
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

  .projects-area {
    margin: 40px auto 0 auto;

    & .box-container {
      justify-content: center;
      column-gap: 8svw;
      row-gap: 5vh;

      .project-link {
        text-decoration: none;
        margin: auto;
      }
    }

    & .project-container {
      @include container-style(grid, 30px, 1.4rem, 330px, 140px);
      align-items: center;
      border-radius: 1.9rem;
      border: 1px solid var(--text-clr);
      grid-template-columns: 2fr 1fr;
      background-image: linear-gradient(
        150deg,
        var(--text-clr / 80%) 0%,
        var(--secondary-text-clr / 10%) 80%
      );

      &:hover {
        transition: 0.4s ease;
        transform: translateY(-5px);
        box-shadow: var(--accent-shadow-clr) 1px 8px 20px;
      }

      & .images-container {
        max-width: 100px;
        margin-left: 20px;

        & .cover-image {
          width: 90px;
          border-radius: 0.8rem;
        }

        & .tech-icons {
          @include container-style(flex, 4px 0 -10px 0, 2px, 87px, auto);
          max-height: 30%;
          border-radius: 0.4rem;
          border: 1px solid var(--text-clr);
          gap: 2px;

          & .icons-span {
            max-height: 24px;
          }

          & .tech-icon {
            max-height: 23px;
            margin-left: 3px;
          }
        }
      }

      & .project-bubble {
        display: flex;
        text-align: left;

        & .bubble-content {
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        & h2,
        h3 {
          color: var(--text-clr);
        }

        & h2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          box-orient: vertical;
          overflow: hidden;
          font-family: Montserrat;
          font-weight: 700;
          font-size: 22px;
        }

        & .heading-container {
          padding-top: 3px;
          border-top: 1.4px solid var(--text-clr);
          min-width: 160px;
        }

        & h3 {
          font-size: 15px;
          font-weight: 500;
          font-family: Urbanist;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .main-wrapper {
    .projects-area {
      .box-container {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .project-container {
        @include container-style(flex, 0, 12px 12px 18px 12px, 90%, 300px);
        flex-direction: column !important;
        justify-items: center;

        border-radius: 25px !important;

        & .project-bubble {
          width: 170px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;

          & .bubble-content {
            max-width: 180px;
          }

          & h2 {
            font-size: 1.2rem !important;
          }

          & h3 {
            font-size: 0.9rem !important;
            -webkit-line-clamp: 2 !important;
            line-clamp: 2 !important;
          }
        }

        & .images-container {
          align-items: center;
          display: flex !important;
          flex-direction: column-reverse !important;
          margin: 0 0 0 0 !important;
          gap: 20px !important;

          & .cover-image {
            width: 160px !important;
          }
        }
      }
    }
  }
}
</style>
