<!-- src/components/PageHeader.vue -->
<template>
    <div class="headline">
      <el-page-header @back="goBackUsingBack">
        <template #content>
          <el-breadcrumb class="custom-breadcrumb" separator="|">
            <el-breadcrumb-item class="custom-breadcrumb">
              <router-link to="/home">homepage</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="custom-breadcrumb-item">
              {{ title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
      </el-page-header>
    </div>
  </template>
  
  <script>
  import { useNavigation } from "@/utils/navigation.js";
  
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    setup() {
      const { goBackUsingBack } = useNavigation();
      return { goBackUsingBack };
    },
  };
  </script>
  
  <style scoped>
  .headline {
    margin-bottom: 20px;
  }

  @media (max-width: 650px) {
    
  }
  </style>