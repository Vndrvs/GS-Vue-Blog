<template>
  <div class="headline">
    <el-page-header @click="goBackUsingBack">  
      <template #content>
        <el-breadcrumb class="custom-breadcrumb" separator="/">
          <h4>Introduction</h4>
        </el-breadcrumb>
      </template>
    </el-page-header>
  </div>
  <div class="container" ref="container">
    <section class="panel">
      <div class="text-content">
        <h2 id="hi">Hi, I'm Vndrvs.</h2>
        <h1 id="welcome">Welcome to GS!</h1>
        <h2 id="thanks">It's great to see you here.</h2>
      </div>
    </section>
    <section class="panel">
      <div class="text-content">
        <h2 id="desc">This directory is dedicated to my projects and experiments I create along the way.</h2>
        <h2 id="desc-2">If I run into something that I found little or no information about, you’ll find a post about it here.</h2>
      </div>
    </section>
    <section class="panel">
      <div class="text-content">
        <h2 id="desc-3">My main ongoing project is a poker bot utilizing a learning algorithm</h2>
        <h2 id="desc-4">on which I’ll be presenting in a series of articles and guides.</h2>
        <h2 id="desc-7">I also work with websites and apps.</h2>
      </div>
    </section>
    <section class="panel">
      <div class="text-content">
        <h2 id="desc-5">Enjoy the content, and happy coding!</h2>
        <h2 id="desc-6"><strong>Note:</strong> All code shared on this blog is released under the Unlicense, which allows you to freely use, modify, and distribute it as you see fit. However, I cannot take responsibility for any issues or consequences that may arise from its use.</h2>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavigation } from '../utils/navigation.js';

export default {
  name: 'IntroView',
  setup() {
    const { goBackUsingBack } = useNavigation();
    const container = ref(null);
    
    // Scroll Setup Function
    const setupScroll = () => {
      let isScrolling = false;
      
      container.value.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        if (isScrolling) return;
        
        const scrollThreshold = 50;
        const scrollDirection = event.deltaY > 0 ? 1 : -1;
        
        if (Math.abs(event.deltaY) > scrollThreshold) {
          isScrolling = true;
          const currentScroll = container.value.scrollTop;
          const viewportHeight = window.innerHeight;
          const targetScroll = currentScroll + scrollDirection * viewportHeight;
          
          container.value.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
          
          setTimeout(() => {
            isScrolling = false;
          }, 800);
        }
      },
      { passive: false }
      );
    };
    onMounted(() => {
      setupScroll();
    });
    
    return {
      goBackUsingBack,
      container,
    };
  },
};
</script>

<style lang="scss">

.container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  
  .panel {
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: white;
    position: relative;
    
    & .text-content {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-content: center;
      align-items: center;
      
      & #desc {
        margin-top: -20%;
        text-align: left;
        max-width: 20%;
        font-size: 3vw;
        font-weight: 300;
      }
      
      & #desc-2 {
        position: absolute;
        text-align: right;
        max-width: 50%;
        bottom: 33%;
        left: 40%;
      }
      
      & #desc-3 {
        text-align: right;
        max-width: 30%;
        line-height: 105%;
        font-size: 4vw;
        font-weight: 600;
        margin: 0 0 10% 0;
      }
      
      & #desc-4 {
        position: absolute;
        text-align: right;
        max-width: 40%;
        bottom: 50%;
        left: 40%;
        font-size: 3.9vw;
        font-weight: 400;
      }
      
      & #desc-5 {
        text-align: left;
        max-width: 40%;
        margin: 0 10% 20% 0;
        margin-right: 10%;
        line-height: 120%;
        font-size: 4.5vw;
      }
      
      & #desc-6 {
        margin-right: 20px;
        position: absolute;
        text-align: left;
        max-width: 40%;
        bottom: 30%;
        left: 60%;
        font-size: 2vw;
      }
      
      & #desc-7 {
        position: absolute;
        text-align: left;
        max-width: 40%;
        bottom: 30%;
        left: 50%;
        font-size: 2.5vw;
        font-weight: 600;
      }
      
      & #hi {
        margin-bottom: 450px;
        font-size: 3.5vw;
        white-space: nowrap;
        font-weight: 300;
      }
      
      & #welcome {
        font-size: 7vw;
        position: absolute;
        margin: 3% 0 250px 20px;
      }
      
      & #thanks {
        position: absolute;
        font-size: 3.6vw;
        margin: 13% 5% 0 70%;
        font-weight: 500;
      }
    }
    
    & h1, h2 {
      color: var(--text-clr);
      line-height: 100%;
    }
  }
}

@media (max-width: 900px) { 
  
  #desc-3 {
    max-width: 30% !important;
    line-height: 125% !important;
    font-size: 5vw !important;
    font-weight: 600;
    margin: 0 0 10% 0;
  }
  
  .text-content {
    
    & #desc-2 {
      bottom: 40% !important;
      font-size: 100% !important;
      margin-right: 30px !important;
      max-width: 80% !important;
      left: 55% !important;
    }
    
    & #desc-3 {
      font-size: 4.9vw !important;
      margin: 0 0 270px 0 !important;
    }
    
    & #desc-4 {
      bottom: 70% !important;
      font-size: 4.2vw !important;
    }
    
    & #desc-7 {
      bottom: 60% !important;
    }
    
    & #desc-5 {
      position: absolute;
      max-width: 50% !important;
      margin-right: 10%;
      font-size: 34px !important;
      bottom: 50% !important;
      line-height: 130% !important;
    }

    & #desc-6 {
      max-width: 60% !important;
      line-height: 150% !important;
      font-size: 2.4vw !important;
    }
  }
}

@media (max-width: 700px) { 

  .text-content {
    
    & #desc {
      position: absolute;
      font-size: 22px !important;
      bottom: 55% !important
    }
    
    & #desc-2 {
      position: absolute;
      bottom: 40% !important;
      font-size: 80% !important;
      margin-right: 30px;
      max-width: 80% !important;
      left: 55% !important;
      line-height: 100%;
    }
    
    & #desc-7 {
      bottom: 50% !important;
      font-size: 16px !important;
    }

    & #desc-4 {
      bottom: 60% !important;
      font-size: 4.2vw !important;
    }
  }
}



</style>
