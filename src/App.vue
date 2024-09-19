<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("khachHang/layDanhSachKhachHang");
      await store.dispatch("hopDong/layDanhSachHopDong");
      store.dispatch("taiTuc/layDanhSachLoaiBaoHiem");
    });

    return {};
  },
};
</script>
