<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <contract-list :danhSachHopDong="danhSachHopDongDaHetHan" />
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
      () => store.getters["hopDong/danhSachHopDongDaHetHan"]
    );

    return {
      danhSachHopDongDaHetHan,
    };
  },
};
</script>
