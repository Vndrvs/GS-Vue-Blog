<template>
  <div class="main-wrapper">
    <div class="headline" v-if="project">
      <el-page-header @back="goBackUsingBack">
        <template #content>
          <el-breadcrumb class="custom-breadcrumb" separator="|">
            <el-breadcrumb-item class="custom-breadcrumb" id="route">
              <a @click.prevent="goToHome">Homepage</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="custom-breadcrumb-item">
              {{ project.projectTitle }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
      </el-page-header>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>

    <div v-if="project" class="project-content-container">
      <div class="head-section">
        <img
          v-if="project.projectCover"
          class="cover-image"
          :src="project.projectCover.url"
          :alt="project.projectCover.alternativeText"
        />
        <h1 id="title">{{ project.projectTitle }}</h1>
        <h2 id="heading">{{ project.projectHeading }}</h2>
        <p id="project-desc">{{ project.projectDescription }}</p>
      </div>
    </div>

    <div class="blogposts-area">
      <div v-if="!loading && posts && posts.length">
        <h2 id="blogposts-title">Related Blog Posts</h2>
        <el-row :gutter="20" justify="center" class="card-container">
          <div v-for="blog_post in posts" :key="blog_post.documentId" class="blogposts-container">
            <router-link :to="`/blog/${blog_post.documentId}`" class="blogpost-link">
              <div class="blogpost-container">
                <div class="blogpost-bubble">
                  <div class="blogpost-bubble-content">
                    <p>{{ parsePublishedDate(blog_post.publishedAt) }}</p>
                    <div class="blogpost-title-container">
                      <h2>{{ blog_post.Title }}</h2>
                    </div>
                    <div class="blogpost-heading-container">
                      <h3>{{ blog_post.H1 }}</h3>
                    </div>
                  </div>
                </div>
                <div class="blogpost-images-container">
                  <div v-if="blog_post.Cover" class="blogpost-bubble-cover">
                    <img
                      class="blogpost-cover-image"
                      :src="blog_post.Cover.url"
                      :alt="blog_post.Cover.alternativeText"
                    />
                  </div>
                  <div
                    v-if="blog_post.technologies && blog_post.technologies.length"
                    class="blogpost-tech-icons"
                  >
                    <span
                      v-for="tech in blog_post.technologies"
                      :key="tech.technologyName"
                      class="blogpost-icons-span"
                    >
                      <img
                        v-if="tech.technologyIcon"
                        class="blogpost-tech-icon"
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
import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ONE_PROJECT } from '@/graphql/getOneProject'
import { useRoute } from 'vue-router'
import { useNavigation } from '../utils/navigation.js'

export default {
  name: 'RelatedBlogPosts',
  setup() {
    const route = useRoute()
    const documentId = route.params.id

    const { goBackUsingBack, goToHome } = useNavigation()

    const { result, loading, error } = useQuery(GET_ONE_PROJECT, {
      documentId: documentId,
    })

    const project = ref(null)
    const posts = ref([])

    const parseContent = (content) => {
      if (!content || content.length === 0) return ''
      return content.map((block) => block.children.map((child) => child.text).join('')).join(' ')
    }

    const parsePublishedDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    watchEffect(() => {
      if (result.value) {
        if (result.value.project) {
          project.value = result.value.project
        }
        if (result.value?.project?.blog_posts) {
          posts.value = result.value.project.blog_posts
        } else {
          posts.value = []
        }
      }
    })

    return {
      project,
      posts,
      parsePublishedDate,
      parseContent,
      loading,
      error,
      goBackUsingBack,
      goToHome,
    }
  },
}
</script>

<style lang="scss">
@use '@/styles/element/mixins.scss' as *;

.blogpost-link:hover {
  transform: translateY(-5px);
  transition: 0.4s ease;
}

.project-content-container {
  display: flex;

  & h1,
  h2,
  p {
    margin: 0 auto 0 auto;
    color: var(--text-clr);
    max-width: 80%;
    text-align: left;
    line-height: 100%;
  }

  & p {
    @include font-style(var(--body-font), 400, 1rem, 130% !important, none, var(--text-clr));
  }

  & h1 {
    @include font-style(var(--heading-font), 800, 3em, 44px, none, var(--text-clr));
    margin-bottom: 2.4% !important;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  & h2 {
    @include font-style(var(--heading-font), 0, 2rem, 110%, none, var(--text-clr));
    margin-bottom: 3%;
  }

  & .cover-image {
    margin: 3%;
    width: 45%;
    max-width: 400px;
  }
}

.blogpost-link {
  text-decoration: none;
  margin: auto;
}

/* ------------------------------ */
/* Blogpost cards */

.blogposts-area {
  width: 90%;
  margin: 5% auto 7% auto;

  #blogposts-title {
    margin: 5%;
    @include font-style(var(--heading-font), 700, 2.2rem, 100%, none, var(--text-clr));
  }

  & .card-container {
    column-gap: 50px;
    row-gap: 5vh;
  }

  & .blogpost-container {
    @include container-style(grid, auto, 1.4rem, 330px, 130px);
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

    &:hover {
      transition: 0.4s ease;
      transform: translateY(-5px);
      box-shadow: var(--accent-shadow-clr) 1px 8px 20px;
    }

    & .el-column {
      display: flex;
      justify-content: center;
    }

    & .blogpost-images-container {
      max-width: 100px;
      margin: 0 0 10px 14px;

      & .blogpost-cover-image {
        width: 90px;
        border-radius: 0.8rem;
      }

      & .blogpost-tech-icons {
        @include container-style(flex, 4px 0 -10px 0, 2px, 87px, auto);
        max-height: 30%;
        border-radius: 0.4rem;
        border: 0.5px solid var(--text-clr);
        gap: 2px;

        & .blogpost-icons-span {
          max-height: 24px;
        }

        & .blogpost-tech-icon {
          max-height: 23px;
          margin-left: 3px;
        }
      }
    }

    & .blogpost-bubble {
      display: flex;
      text-align: left;

      & .blogpost-bubble-content {
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      & p {
        font-size: 13px;
        color: var(--text-clr);
      }

      & h2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        box-orient: vertical;
        overflow: hidden;
        @include font-style(var(--heading-font), 700, 1.4em, 100%, none, var(--text-clr));
      }

      & .blogpost-heading-container {
        padding-top: 3px;
        border-top: 1.4px solid var(--text-clr);
        min-width: 160px;
      }

      & h3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        box-orient: vertical;
        overflow: hidden;
        @include font-style(var(--body-font), 400, 15px, 130%, none, var(--text-clr));
      }
    }
  }
}

@media (max-width: 900px) {
  .project-content-container {
    max-width: 90%;
    margin: auto;
    align-self: center;

    & h1,
    h2,
    p {
      color: var(--text-clr);
      max-width: 80%;
      text-align: left;
      line-height: 100%;
    }

    & p {
      line-height: 150%;
    }

    & h1 {
      margin-top: 3%;
      @include font-style(var(--heading-font), 800, 3rem, 100%, none, var(--text-clr));
    }

    & h2 {
      @include font-style(var(--heading-font), 00, 2rem, 110%, none, var(--text-clr));
    }

    & .head-section {
      flex-direction: column;
      align-items: center;

      > * {
        margin-bottom: 0.8rem;
      }
    }

    & .cover-image {
      margin: 3%;
      width: 70%;
      margin-left: 0;
    }
  }

  .content-container {
    @include responsive-text(auto, break-word, auto, visible, none);

    & h1,
    h2,
    p {
      color: var(--text-clr);
      max-width: 80%;
    }

    & p {
      line-height: 140%;
    }

    & h1 {
      margin-top: 5%;
      @include font-style(var(--heading-font), 800, 3rem, 100%, none, var(--text-clr));
    }

    & h2 {
      @include font-style(var(--heading-font), 600, 2rem, 110%, none, var(--text-clr));
    }

    & .head-section {
      color: var(--secondary-txt-clr);
    }
  }

  .blogposts-area {
    #blogposts-title {
      margin: 5%;
      @include font-style(var(--heading-font), 700, 2.2rem, 100%, none, var(--text-clr));
    }

    & .card-container {
      row-gap: 5vh;
      column-gap: 6vw;
    }

    & .blogpost-container {
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

      & .blogpost-icons-span {
        max-height: 24px;
      }

      & .blogpost-tech-icons {
        @include container-style(flex, 4px 0 -10px 0, 2px, 87px, auto);
        max-height: 30%;
        gap: 10px;

        & .blogpost-tech-icon {
          width: auto;
          max-height: 25px;
          height: auto;
        }
      }

      & .blogpost-bubble {
        & .blogpost-bubble-content {
          @include container-style(flex, 0, 0, 230px, auto);
        }
        & .blogpost-heading-container {
          width: 220px;
        }
      }
    }
  }
}

@media (max-width: 680px) {
  .main-wrapper {
    .blogposts-area {
      padding: 0 16px;
      .box-container {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .blogpost-container {
        @include container-style(
          flex !important,
          auto,
          12px 12px 18px 12px !important,
          100% !important,
          300px !important
        );
        flex-direction: column !important;
        max-width: 200px !important;
        border: 1px solid var(--text-clr) !important;
        border-radius: 20px !important;

        & .blogpost-bubble {
          padding: 10px;
          width: 150px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;

          & .blogpost-heading-container {
            margin: 0 auto;
            width: 140px;
          }

          & h2 {
            font-size: 1.2rem !important;
          }

          & h3 {
            max-width: 170px;
            font-size: 0.9rem !important;
            -webkit-line-clamp: 2 !important;
            line-clamp: 2 !important;
          }
        }

        & .blogpost-images-container {
          align-items: center;
          display: flex !important;
          flex-direction: column-reverse !important;
          margin: 0 0 0 0 !important;
          gap: 20px !important;

          & .blogpost-cover-image {
            width: 140px !important;
          }
        }
      }
    }
  }
}
</style>
