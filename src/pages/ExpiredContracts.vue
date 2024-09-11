<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-toolbar>
          <q-btn flat round dense icon="menu" />
          <q-toolbar-title>Hợp đồng hết hạn</q-toolbar-title>
        </q-toolbar>
      </div>

      <div class="col-12">
        <contract-list :danh-sach-hop-dong="danhSachHopDongDaHetHan" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import ContractList from "components/customer-contract/ContractList.vue";

export default {
  name: "ExpiredContracts",
  components: { ContractList },
  setup() {
    const store = useStore();

    const danhSachHopDongDaHetHan = computed(
      () => store.state.hopDong.danhSachHopDongDaHetHan
    );

    onMounted(() => {
      store.dispatch("hopDong/layDanhSachHopDongDaHetHan");
    });

    return {
      danhSachHopDongDaHetHan,
    };
  },
};
</script>
