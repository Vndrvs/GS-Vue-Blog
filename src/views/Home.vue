<template>
  <div class="main-wrapper">
    <div class="post-area">
      <div v-if="loading">Loading...</div>
      <div v-if="error">Error: {{ error.message }}</div>
      <div v-if="!loading && (!posts || posts.length === 0)">No posts available.</div>
      <div v-if="!loading && posts && posts.length">
        <div v-for="(post, index) in posts" :key="post.documentId" class="post-container">
          <div class="post-bubble">
            <div v-if="post.Cover" class="bubble-cover">
              <img
                v-if="post.Cover"
                class="cover-image"
                :src="post.Cover.url"
                :alt="post.Cover.alternativeText"
              />
            </div>
            <div class="bubble-content">
              <p>{{ parsePublishedDate(post.publishedAt) }}</p>
              <h2>{{ post.Title }}</h2>
              <h3>{{ post.H1 }}</h3>
              <div class="post-content-container">
                <p class="content-show">{{ parseContent(post.Content) }}</p>
              </div>
              <p><strong>Author:</strong> {{ post.Author }}</p>
              <router-link
                :to="{
                  path: '/blog/' + post.documentId,
                }"
              >
                <button class="read-btn read-btn-mobile">Read more</button>
              </router-link>
            </div>
          </div>
          <div
            v-if="index < posts.length - 1"
            class="post-separator"
            :class="{ 'rotate-arrows': index % 2 !== 0 }"
          >
            <div v-for="n in arrowsCount" :key="n" class="arrow-svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="10" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import { GET_POSTS } from '@/graphql/getPosts.js'
import { ref, watchEffect, onMounted } from 'vue'

export default {
  name: 'PostsView',
  setup() {
    const { result, loading, error } = useQuery(GET_POSTS, { fetchPolicy: 'no-cache' })
    const posts = ref([])

    const arrowsCount = ref(0)

    const calcArrowsCount = (width) => {
      if (width <= 900) {
        return Math.max(3, Math.floor((800 - width) / 20) + 10)
      } else {
        return Math.max(0, Math.floor((width - 400) / 2))
      }
    }

    const updateArrowsCount = () => {
      arrowsCount.value = calcArrowsCount(window.innerWidth)
    }

    onMounted(() => {
      const width = window.innerWidth
      arrowsCount.value = calcArrowsCount(width)
      window.addEventListener('resize', updateArrowsCount)
    })

    watchEffect(() => {
      if (result.value && result.value.blogPosts) {
        posts.value = [...result.value.blogPosts].reverse()
      } else {
        posts.value = []
      }
    })

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

    return {
      posts,
      loading,
      error,
      parseContent,
      parsePublishedDate,
      arrowsCount,
    }
  },
}
</script>

<style lang="scss">
@use '@/styles/element/mixins.scss' as *;

a {
  text-decoration: none !important;
}

* {
  margin: 0;
}

.main-wrapper {
  max-width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;

  .post-area {
    & .post-container {
      & .post-bubble {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 3% 3% 3% 3%;
        text-align: left !important;
        align-content: left !important;
        justify-content: flex-start !important;

        & .bubble-content {
          display: flex;
          flex-direction: column;
          gap: 10px;

          & .content-show {
            height: 20px;
          }

          .read-btn {
            position: relative;
            background-color: transparent;
            width: 120px;
            height: 35px;
            border-radius: 20px;
            border: 2px solid transparent;
            background-image: linear-gradient(
              90deg,
              var(--button-1),
              var(--button-2),
              var(--button-3),
              var(--button-4),
              var(--button-5),
              var(--button-6)
            );
            background-clip: padding-box, border-box;
            background-size: 400%;
            background-position: 0% 0%;
            font-family: var(--heading-font);
            font-weight: 500;
            font-size: 0.9rem;
            line-height: 1.4;
            color: var(--secondary-text-clr);
            cursor: pointer;
            overflow: hidden;
            z-index: 1;
            margin-top: 1%;
          }

          .read-btn::before {
            content: '';
            position: absolute;
            left: -2px;
            top: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: 15px;
            background-image: linear-gradient(
              90deg,
              var(--button-1),
              var(--button-2),
              var(--button-3),
              var(--button-4),
              var(--button-5),
              var(--button-6)
            );
            background-size: 500%;
            background-position: 0% 0%;
            filter: blur(8px);
            opacity: 0;
            z-index: -1;
            transition: opacity 2s;
          }

          .read-btn:hover {
            animation: gradientRotate 2s infinite linear;
          }

          .read-btn:hover::before {
            opacity: 1;
            animation: gradientRotate 2s infinite linear;
          }

          .read-btn:active {
            color: #c3c4d5;
          }

          .read-btn:focus::before {
            opacity: 1;
          }

          @keyframes gradientRotate {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 100% 100%;
            }
          }
        }

        & .bubble-cover {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }

        & .cover-image {
          max-width: 200px;
        }
      }

      & h2,
      h3,
      p {
        color: var(--text-clr);
      }

      & h2 {
        @include font-style(var(--heading-font), 800, 2em, 100%, none, var(--text-clr));
        margin-bottom: 1%;
      }

      h3 {
        @include font-style(var(--heading-font), 700, 1.2em, 100%, none, var(--text-clr));
        margin-bottom: 1%;
      }

      & p {
        @include font-style(var(--body-font), 400, 1em, 100%, none, var(--text-clr));
        width: 50vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      & .post-separator {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1px;
        margin: 3% auto;
        width: fit-content;
      }

      & .arrow-svg-container {
        max-width: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & .rotate-arrows .arrow-svg-container svg {
        transform: rotate(180deg);
      }

      & svg {
        color: var(--text-clr);
      }
    }
  }
}

@media (max-width: 900px) {
  .main-wrapper {
    .post-area {
      margin: 0 auto;
      width: 100%;

      & .post-container {
        margin-top: 4%;

        & .post-bubble {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 3% 3% 3% 3%;
          text-align: left !important;

          & .bubble-content {
            & .read-btn {
              background-color: var(--accent-clr);
              margin: 10px auto 0 auto;
              display: flex;
              width: 130px;
              height: 40px;
              justify-content: center;
              align-items: center;
              border-radius: 30px;

              & a {
                text-decoration: none !important;
              }
            }
            & .cover-image {
              width: 250px;
            }
            & h2 {
              font-size: 1.3em;
            }
            & h3 {
              font-size: 1.4em;
            }
          }
        }
      }
    }
  }
}
</style>
