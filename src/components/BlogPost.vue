<template>
  <div class="headline" v-if="post">
    <el-page-header @back="goBackUsingBack">
      <template #content>
        <el-breadcrumb class="custom-breadcrumb" separator="|">
          <el-breadcrumb-item class="custom-breadcrumb" id="route">
            <a @click.prevent="goToHome">Homepage</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item class="custom-breadcrumb-item">
            {{ post.Title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </el-page-header>
  </div>
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error: {{ error.message }}</div>
  <div v-if="post" class="content-container">
    <div class="content-section">
      <img
        v-if="post.Cover"
        class="cover-image"
        :src="post.Cover.url"
        :alt="post.Cover.alternativeText"
      />
      <h1 id="title">{{ post.Title }}</h1>
      <h2 id="heading">{{ post.H1 }}</h2>
      <h4 id="published-date">Published: {{ formatDate(post.publishedAt) }}</h4>
      <p class="content-text" v-html="parseContent(post.Content)"></p>
      <img
        v-if="post.pic1"
        class="content-image"
        :src="post.pic1.url"
        :alt="post.pic1.alternativeText"
      />
      <p class="content-text" v-html="parseContent(post.Content2)"></p>

      <img
        v-if="post.pic2"
        class="content-image"
        :src="post.pic2.url"
        :alt="post.pic2.alternativeText"
      />
      <p class="content-text" v-html="parseContent(post.Content3)"></p>

      <img
        v-if="post.pic3"
        class="content-image"
        :src="post.pic3.url"
        :alt="post.pic3.alternativeText"
      />
      <p class="content-text" v-html="parseContent(post.Content4)"></p>

      <img
        v-if="post.pic4"
        class="content-image"
        :src="post.pic4.url"
        :alt="post.pic4.alternativeText"
      />
      <p class="content-text" v-html="parseContent(post.Content5)"></p>

      <img
        v-if="post.pic5"
        class="content-image"
        :src="post.pic5.url"
        :alt="post.pic5.alternativeText"
      />
      <p class="content-text" v-html="parseContent(post.Content6)"></p>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_ONE_POST } from '@/graphql/getOnePost.js';
import { useRoute, useRouter } from 'vue-router';
import { useNavigation } from "../utils/navigation.js";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const documentId = ref(route.params.id);

    const { goBackUsingBack, goToHome } = useNavigation();
    const post = ref(null);

    const { result, loading, error, refetch } = useQuery(GET_ONE_POST, {
      documentId: props.id, // Use the prop directly
      fetchPolicy: "network-only",
    });

    watchEffect(() => {
      if (result.value && result.value.blogPost) {
        post.value = result.value.blogPost;
      }
    });

    watch(() => props.id, (newId) => {
      documentId.value = newId; // Update documentId
      // Re-fetch the query
      refetch({ documentId: newId });
    });

    const escapeHtml = (str) => {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const parseContent = (content) => {
      if (!content) return "";

      if (Array.isArray(content)) {
        let fullText = content
          .map((block) => block.children.map((child) => child.text).join(""))
          .join("\n");

        fullText = fullText.replace(
          /'''\s*([\s\S]*?)\s*'''/gs,
          (match, codeContent) => {
            const escapedCode = escapeHtml(codeContent);
            return `<pre><code class="custom-code">${escapedCode}</code></pre>`;
          }
        );

        return fullText;
      }

      if (typeof content === "string") {
        let formattedContent = content.replace(
          /'''\s*([\s\S]*?)\s*'''/gs,
          (match, codeContent) => {
            const escapedCode = escapeHtml(codeContent);
            return `<pre><code class="custom-code">${escapedCode}</code></pre>`;
          }
        );

        return formattedContent;
      }

      return content;
    };

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    return {
      post,
      loading,
      error,
      parseContent,
      formatDate,
      goBackUsingBack,
      goToHome,
    };
  },
};
</script>

<style lang="scss">

@use "@/styles/element/mixins.scss" as *;

pre {
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 6px;
  margin: 1.5rem 0;
}

.custom-code {
  display: block;
  line-height: 1.4;
  background-color: #272727;
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 80%;
  white-space: pre-wrap;
}

.content-container {
  max-width: 80%;
  display: flex;
  margin: 0 auto 0 auto;
  
  & h1, h2, h4, p {
    margin: 0 auto 0 auto;
    color: var(--text-clr);
    max-width: 80%;
    text-align: left;
    line-height: 100%;
  }
  
  h1 {
    @include font-style(var(--heading-font), 800, 3em, 44px, none, var(--text-clr));
    margin-bottom: 2.4% !important;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }
  
  h2 {
    font-weight: 600;
    margin-bottom: 3% !important;
  }
  
  h4 {
    @include font-style(var(--heading-font), 500, 1rem, 20px, none, var(--text-clr));
    margin-bottom: 5% !important;
  }
  
  p {
    @include font-style(var(--body-font), 400, 1rem, 130% !important, none, var(--text-clr));
  }
  
  & .content-text {
    margin: 8% auto 8% auto !important;
  }
  
  & .content-section {
    > * {
      margin-bottom: 0.4rem;
      margin-top: 0.4rem;
    }
    > *:last-child {
      margin-bottom: 2%;
    }
  }
  
  & .cover-image {
    margin: 3%;
    width: 45%;
  }
  
  & .content-image {
    max-width: 100%;
  }
}

@media (max-width: 900px) {
  .content-container {
    max-width: 90%;
    @include responsive-text(auto, break-word, auto, visible, none);
    
    h1 {
      @include font-style(var(--heading-font), 800, 3em, 44px, none, var(--text-clr));
      margin-bottom: 2.4% !important;
    }
    
    h2 {
      font-weight: 600;
      margin-bottom: 3% !important;
    }
    
    h4 {
      @include font-style(var(--heading-font), 500, 1rem, 20px, none, var(--text-clr));
      margin-bottom: 5% !important;
    }
    
    p {
      @include font-style(var(--body-font), 400, 1rem, 130% !important, none, var(--text-clr));
    }
    
    & .cover-image {
      margin: 3%;
      width: 70%;
      margin-left: 0;
    }
  }
}

</style>