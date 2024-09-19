<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  // setup() {
  //   const store = useStore();

  //   onMounted(() => {
  //     store.dispatch("taiTuc/layDanhSachLoaiBaoHiem");
  //   });

  //   return {};
  // },
};
</script>
