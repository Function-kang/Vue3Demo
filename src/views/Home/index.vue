<template>
  <div class="wrap">
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="/exam">
            <template #title>
              <el-icon><Location /></el-icon>
              <span>考试</span>
            </template>
            <el-menu-item index="/exam/odd" @click="navItem"
              >单题模式</el-menu-item
            >
            <el-menu-item index="/exam/even" @click="navItem"
              >整卷模式</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { navColumns } from "./column";
export default {
  name: "viewHome",
  data() {
    return {
      navColumns,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navItem({ index }) {
      this.$router.push({
        path: index,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.border {
  border: 3px solid blue;
}

.wrap {
  height: 100%;
  .container {
    height: inherit;
    .aside {
      background-color: #545c64;
    }
  }
}
</style>