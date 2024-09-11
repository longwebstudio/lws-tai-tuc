<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-toolbar>
          <q-btn flat round dense icon="menu" />
          <q-toolbar-title>Quản lý Khách hàng & Hợp đồng</q-toolbar-title>

          <q-space />

          <q-btn
            label="Thêm khách hàng mới"
            color="primary"
            @click="themKhachHangMoi"
          />
        </q-toolbar>
      </div>

      <div class="col-12">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="khachHang" label="Khách hàng" />
          <q-tab name="hopDong" label="Hợp đồng" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="khachHang">
            <customer-list
              :danh-sach-khach-hang="danhSachKhachHang"
              @chon-khach-hang="chonKhachHang"
              @them-khach-hang="themKhachHangMoi"
              @sua-khach-hang="suaKhachHang"
              @xoa-khach-hang="xoaKhachHang"
            />
          </q-tab-panel>

          <q-tab-panel name="hopDong">
            <contract-list
              v-if="khachHangDangChon"
              :khach-hang-id="khachHangDangChon.id"
              :danh-sach-hop-dong="danhSachHopDongTheoKhachHang"
              @them-hop-dong="themHopDongMoi"
              @sua-hop-dong="suaHopDong"
              @xoa-hop-dong="xoaHopDong"
            />
            <div v-else class="text-center q-pa-md">
              Chọn một khách hàng để xem danh sách hợp đồng.
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <q-dialog v-model="dialogKhachHangMo" persistent>
      <customer-form
        :khach-hang="khachHangDangChon"
        @dong-dialog="dongDialogKhachHang"
        @luu-thong-tin="luuThongTinKhachHang"
      />
    </q-dialog>

    <q-dialog v-model="dialogHopDongMo" persistent>
      <contract-form
        :hop-dong="hopDongDangChon"
        :khach-hang-id="khachHangDangChon ? khachHangDangChon.id : null"
        @dong-dialog="dongDialogHopDong"
        @luu-thong-tin="luuThongTinHopDong"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CustomerList from "components/customer-contract/CustomerList.vue";
import ContractList from "components/customer-contract/ContractList.vue";
import CustomerForm from "components/customer-contract/CustomerForm.vue";
import ContractForm from "components/customer-contract/ContractForm.vue";

export default {
  name: "CustomerContract",
  components: {
    CustomerList,
    ContractList,
    CustomerForm,
    ContractForm,
  },
  setup() {
    const store = useStore();
    const tab = ref("khachHang");
    const dialogKhachHangMo = ref(false);
    const dialogHopDongMo = ref(false);

    const danhSachKhachHang = computed(
      () => store.state.khachHang.danhSachKhachHang
    );
    const khachHangDangChon = computed(
      () => store.state.khachHang.khachHangDangChon
    );
    const danhSachHopDongTheoKhachHang = computed(() => {
      if (khachHangDangChon.value) {
        return store.state.khachHang.khachHangDangChon.hop_dongs;
        // return store.getters["hopDong/danhSachHopDongTheoKhachHangId"](
        //   khachHangDangChon.value.id
        // );
      } else {
        return [];
      }
    });
    const hopDongDangChon = computed(() => store.state.hopDong.hopDongDangChon);

    onMounted(() => {
      store.dispatch("khachHang/layDanhSachKhachHang");
      store.dispatch("hopDong/layDanhSachHopDong");
    });

    const chonKhachHang = (khachHang) => {
      store.dispatch("khachHang/chonKhachHang", khachHang);
      tab.value = "hopDong";
    };

    const themKhachHangMoi = () => {
      store.dispatch("khachHang/chonKhachHang", null); // Reset khách hàng đang chọn
      dialogKhachHangMo.value = true;
    };

    const suaKhachHang = (khachHang) => {
      store.dispatch("khachHang/chonKhachHang", khachHang);
      dialogKhachHangMo.value = true;
    };

    const xoaKhachHang = (khachHangId) => {
      store.dispatch("khachHang/xoaKhachHang", khachHangId);
    };

    const dongDialogKhachHang = () => {
      dialogKhachHangMo.value = false;
    };

    const luuThongTinKhachHang = (khachHang) => {
      if (khachHang.id) {
        store.dispatch("khachHang/suaKhachHang", khachHang);
      } else {
        store.dispatch("khachHang/themKhachHang", khachHang);
      }
      dongDialogKhachHang();
    };

    const themHopDongMoi = () => {
      store.dispatch("hopDong/chonHopDong", null); // Reset hợp đồng đang chọn
      dialogHopDongMo.value = true;
    };

    const suaHopDong = (hopDong) => {
      store.dispatch("hopDong/chonHopDong", hopDong);
      dialogHopDongMo.value = true;
    };

    const xoaHopDong = (hopDongId) => {
      store.dispatch("hopDong/xoaHopDong", hopDongId);
    };

    const dongDialogHopDong = () => {
      dialogHopDongMo.value = false;
    };

    const luuThongTinHopDong = (hopDong) => {
      if (hopDong.id) {
        store.dispatch("hopDong/suaHopDong", hopDong);
      } else {
        store.dispatch("hopDong/themHopDong", hopDong);
      }
      dongDialogHopDong();
    };

    return {
      tab,
      dialogKhachHangMo,
      dialogHopDongMo,
      danhSachKhachHang,
      khachHangDangChon,
      danhSachHopDongTheoKhachHang,
      hopDongDangChon,
      chonKhachHang,
      themKhachHangMoi,
      suaKhachHang,
      xoaKhachHang,
      dongDialogKhachHang,
      luuThongTinKhachHang,
      themHopDongMoi,
      suaHopDong,
      xoaHopDong,
      dongDialogHopDong,
      luuThongTinHopDong,
    };
  },
};
</script>
