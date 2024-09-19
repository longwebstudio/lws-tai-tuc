<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-toolbar>
          <q-space />

          <q-select
            v-model="loaiBaoHiem"
            :options="loaiBaoHiemOptions"
            label="Lọc theo loại bảo hiểm"
            dense
            outlined
            emit-value
            map-options
          />

          <q-select
            v-model="trangThaiTaiTuc"
            :options="trangThaiTaiTucOptions"
            label="Trạng thái tái tục"
            dense
            outlined
            emit-value
            map-options
          />
        </q-toolbar>
      </div>

      <div class="col-12 col-md-8">
        <ContractList :danhSachHopDong="danhSachHopDongSapHetHan" />
        <!-- <q-list bordered separator>
          <q-item
            v-for="khachHang in danhSachKhachHangCanTaiTucLoc"
            :key="khachHang.id"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar icon="person" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label @click="moDialogChiTiet(khachHang)">{{
                khachHang.hoTen
              }}</q-item-label>
              <q-item-label caption lines="2">
                <div>{{ khachHang.soDienThoai }}</div>
                <div>
                  {{ khachHang.loaiBaoHiem }} -
                  {{ formatDate(khachHang.ngayHetHan) }} -
                  {{ khachHang.trangThaiTaiTuc }}
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>

          <div
            v-if="!danhSachHopDongSapHetHan.length"
            class="text-center q-pa-md"
          >
            Không có khách hàng nào.
          </div>
        </q-list> -->
      </div>

      <!-- <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Báo cáo tái tục</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Tổng số khách hàng cần tái tục: {{ tongSoKhachHangCanTaiTuc }}
            </div>
            <div class="text-subtitle1">
              Số lượng hợp đồng đã tái tục: {{ soLuongHopDongDaTaiTuc }}
            </div>
            <div class="text-subtitle1">Tỷ lệ tái tục: {{ tyLeTaiTuc }}%</div>
          </q-card-section>
        </q-card>
      </div> -->
    </div>

    <!-- <q-dialog v-model="dialogChiTietMo" persistent>
      <renewal-dialog
        :khach-hang="khachHangDangChon"
        @dong-dialog="dongDialogChiTiet"
        @cap-nhat-thong-tin-tai-tuc="capNhatThongTinTaiTuc"
        @gui-thong-bao-tai-tuc="guiThongBaoTaiTuc"
      />
    </q-dialog> -->
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";
import ContractList from "src/components/customer-contract/ContractList.vue";

export default {
  name: "TaiTuc",
  components: { ContractList },
  setup() {
    const store = useStore();
    const dialogChiTietMo = ref(false);

    const loaiBaoHiem = computed({
      get: () => store.state.taiTuc.loaiBaoHiem,
      set: (value) => store.dispatch("taiTuc/capNhatLoaiBaoHiem", value),
    });

    const trangThaiTaiTuc = computed({
      get: () => store.state.taiTuc.trangThaiTaiTuc,
      set: (value) => store.dispatch("taiTuc/capNhatTrangThaiTaiTuc", value),
    });

    const danhSachHopDongSapHetHan = computed(
      () => store.getters["hopDong/danhSachHopDongSapHetHan"]
    );
    const khachHangDangChon = ref(null);

    const tongSoKhachHangCanTaiTuc = computed(
      () => danhSachKhachHangCanTaiTucLoc.value.length
    );
    const soLuongHopDongDaTaiTuc = computed(() => {
      return danhSachKhachHangCanTaiTucLoc.value.filter(
        (kh) => kh.trangThaiTaiTuc === "Đã tái tục"
      ).length;
    });
    const tyLeTaiTuc = computed(() => {
      if (tongSoKhachHangCanTaiTuc.value === 0) return 0;
      return (
        (soLuongHopDongDaTaiTuc.value / tongSoKhachHangCanTaiTuc.value) *
        100
      ).toFixed(2);
    });

    const loaiBaoHiemOptions = computed(
      () => store.state.taiTuc.loaiBaoHiemOptions
    );
    const trangThaiTaiTucOptions = [
      "Tất cả",
      "Chưa liên hệ",
      "Đã liên hệ",
      "Đã thu tiền",
      "Đã nộp BĐH",
      "Gửi yêu cầu phát sinh",
      "Phát sinh thành công BHXH",
      "Từ chối",
    ];

    const formatDate = (dateString) => {
      return date.formatDate(dateString, "DD/MM/YYYY");
    };

    const moDialogChiTiet = (khachHang) => {
      khachHangDangChon.value = khachHang;
      dialogChiTietMo.value = true;
    };

    const dongDialogChiTiet = () => {
      dialogChiTietMo.value = false;
    };

    const capNhatThongTinTaiTuc = ({ khachHangId, trangThaiMoi, ghiChu }) => {
      store.dispatch("taiTuc/capNhatThongTinTaiTuc", {
        khachHangId,
        trangThaiMoi,
        ghiChu,
      });
      dongDialogChiTiet();
    };

    const guiThongBaoTaiTuc = ({ khachHangId, noiDung, phuongThuc }) => {
      store.dispatch("taiTuc/guiThongBaoTaiTuc", {
        khachHangId,
        noiDung,
        phuongThuc,
      });
    };

    return {
      loaiBaoHiem,
      loaiBaoHiemOptions,
      trangThaiTaiTuc,
      trangThaiTaiTucOptions,
      danhSachHopDongSapHetHan,
      khachHangDangChon,
      tongSoKhachHangCanTaiTuc,
      soLuongHopDongDaTaiTuc,
      tyLeTaiTuc,
      dialogChiTietMo,
      formatDate,
      moDialogChiTiet,
      dongDialogChiTiet,
      capNhatThongTinTaiTuc,
      guiThongBaoTaiTuc,
    };
  },
};
</script>
