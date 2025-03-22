<template>
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
      <el-row :gutter="20" class="card-container">
        <template v-for="(blog_post, index) in posts" :key="blog_post.documentId" class="blogposts-container">
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
                  <div v-if="project.technologies && project.technologies.length" class="blogpost-tech-icons">
                    <span v-for="tech in project.technologies" :key="tech.technologyName" class="blogpost-icons-span">
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
              <div class="blogpost-images-container">
                <div v-if="blog_post.Cover" class="blogpost-bubble-cover">
                  <img class="blogpost-cover-image" :src="blog_post.Cover.url" :alt="blog_post.Cover.alternativeText" />
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
import { ref, watchEffect, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_ONE_PROJECT } from "../graphql/getOneProject";
import { useRoute } from "vue-router";
import { useNavigation } from "../utils/navigation.js";

export default {
  name: 'RelatedBlogPosts',
  setup() {
    const route = useRoute();
    const documentId = route.params.id;
    
    const { goBackUsingBack, goToHome } = useNavigation();
    
    const { result, loading, error } = useQuery(GET_ONE_PROJECT, {
      documentId: documentId,
    });
    
    const project = ref(null);
    const posts = ref([]);
    
    const parseContent = (content) => {
      if (!content || content.length === 0) return '';
      return content
      .map(block => block.children.map(child => child.text).join(''))
      .join(' ');
    };
    
    const parsePublishedDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    watchEffect(() => {
      if (result.value) {
        if (result.value.project) {
          project.value = result.value.project;
        }
        if (result.value?.project?.blog_posts) {
          posts.value = result.value.project.blog_posts;
        } else {
          posts.value = [];
        }
      }
    });
    
    return {
      project,
      posts,
      parsePublishedDate,
      parseContent,
      loading,
      error,
      goBackUsingBack,
      goToHome,
    };
  },
};
</script>

<style lang="scss">
@use "@/styles/element/mixins.scss" as *;

.blogpost-link:hover {
  transform: translateY(-5px);
  transition: 0.4s ease;
}

.project-content-container {
  width: 80%;
  display: flex;
  margin: 0 auto 0 auto;
  
  & h1, h2, p {
    margin: 0 auto 0 auto;
    color: var(--text-clr);
    max-width: 80%;
    text-align: left;
    line-height: 100%;
  }
  
  & p {
    @include font-style(var(--body-font), 400, 1rem, 130% !important, none, var(--text-clr));
  }
  
  & h1 {@include font-style(var(--heading-font), 800, 3em, 44px, none, var(--text-clr));
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
  }
}

.blogpost-link {
  text-decoration: none; 
  margin: auto;
}

.blogposts-area {
  width: 90%;
  margin: 5% auto 7% auto;
  
  #blogposts-title {
    margin: 5%;
    @include font-style(var(--heading-font), 700, 2.2rem, 100%, none, var(--text-clr));
  }
  
  & .card-container {
    row-gap: 5vh;
    column-gap: 6vw;
  }
  
  & .blogpost-container {
    @include container-style(grid, auto, 1.1rem, 330px, 180px);
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid var(--text-clr);
    grid-template-columns: 2fr 1fr;
    
    & .blogpost-icons-span {
      max-height: 24px;
    }
    
    & .blogpost-tech-icons {
      @include container-style(flex, 0, 2px, 80px, auto);
      max-height: 30%;
      gap: 10spx;
      
      & .blogpost-tech-icon {
        width: auto;
        max-height: 25px;
        height: auto;
      }
    }
    
    & .blogpost-images-container {
      margin: 28px 0 0 280px;
      position: absolute;
      
      & .blogpost-cover-image {
        border-radius: 20px;
        width: 120px;
      }
    }
    
    & .blogpost-bubble {
      text-align: left;
      
      & .blogpost-bubble-content {
        @include container-style(flex, 0, 0, 270px, auto);
        flex-direction: column;
        gap: 10px;
      }
      
      & p {
        color: var(--text-clr);      
      }
      
      & h2 {
        @include font-style(var(--heading-font), 700, 1.4em, 100%, none, var(--text-clr));
      }
      
      & .blogpost-heading-container {
        padding: 8px 0 0 0;
        width: 250px;
        border-top: 1.4px solid lightgrey;        
      }
      
      & h3 {
        @include font-style(var(--body-font), 400, 1rem, 100%, none, var(--text-clr));
      }
    }
  }
  
  & .blogpost-container:hover {
    transition: 0.4s ease;
    box-shadow: var(--accent-shadow-clr) 1px 8px 20px;
    
    & .blogpost-images-container {
      margin: 28px 0 0 280px;
      position: absolute;
      transition: 0.4s ease;
      
      & .blogpost-cover-image {
        border-radius: 20px;
        transition: 0.4s ease;
        width: 120px;
        box-shadow: var(--accent-shadow-clr) 1px 8px 20px;
        
      }
    }
  }
}

@media (max-width: 900px) {

  .project-content-container {
    max-width: 90%;
    margin: auto;
    align-self: center;
    
    & h1, h2, p {
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
    
    & h1, h2, p {
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
}

</style>