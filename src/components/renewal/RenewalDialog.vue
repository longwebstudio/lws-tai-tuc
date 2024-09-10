<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Thông tin tái tục</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">Khách hàng: {{ khachHang.hoTen }}</div>
      <div class="text-subtitle1">
        Số điện thoại: {{ khachHang.soDienThoai }}
      </div>
      <div class="text-subtitle1">
        Hợp đồng: {{ getTenHopDong(khachHang.hopDongId) }} -
        {{ formatDate(khachHang.ngayHetHan) }}
      </div>
    </q-card-section>

    <q-form @submit="capNhatTrangThai" class="q-gutter-md">
      <q-select
        v-model="trangThaiTaiTuc"
        :options="trangThaiTaiTucOptions"
        label="Trạng thái tái tục"
        emit-value
        map-options
      />

      <q-input v-model="ghiChu" label="Ghi chú" type="textarea" />

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Đóng" v-close-popup @click="dongDialog" />
        <q-btn flat label="Lưu" type="submit" />
        <q-btn
          flat
          label="Gửi thông báo"
          color="primary"
          @click="moDialogGuiThongBao"
        />
        <q-btn
          flat
          label="Gia hạn"
          color="primary"
          @click="moDialogGiaHanHopDong"
        />
      </q-card-actions>
    </q-form>

    <q-dialog v-model="dialogGuiThongBaoMo" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Gửi thông báo tái tục</div>
        </q-card-section>

        <q-form @submit="guiThongBao" class="q-gutter-md">
          <q-select
            v-model="phuongThucGui"
            :options="phuongThucGuiOptions"
            label="Phương thức gửi"
            emit-value
            map-options
          />

          <q-input v-model="noiDungThongBao" label="Nội dung" type="textarea" />

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Hủy" v-close-popup />
            <q-btn flat label="Gửi" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogGiaHanHopDongMo" persistent>
      <contract-form
        :hop-dong="hopDongDangGiaHan"
        :khach-hang-id="khachHang.id"
        mode="gia-han"
        @dong-dialog="dongDialogGiaHanHopDong"
        @luu-thong-tin="xuLyGiaHanHopDongThanhCong"
      />
    </q-dialog>
  </q-card>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";
import ContractForm from "components/customer-contract/ContractForm.vue";

export default {
  components: { ContractForm },
  props: {
    khachHang: {
      type: Object,
      required: true,
    },
  },
  emits: ["dong-dialog", "cap-nhat-thong-tin-tai-tuc", "gui-thong-bao-tai-tuc"],
  setup(props, { emit }) {
    const store = useStore();
    const trangThaiTaiTuc = ref(props.khachHang.trangThaiTaiTuc);
    const ghiChu = ref("");
    const dialogGuiThongBaoMo = ref(false);
    const phuongThucGui = ref(null);
    const noiDungThongBao = ref("");
    const dialogGiaHanHopDongMo = ref(false);
    const hopDongDangGiaHan = ref(null);

    const trangThaiTaiTucOptions = [
      "Chưa liên hệ",
      "Đã liên hệ",
      "Đã thu tiền",
      "Đã nộp BĐH",
      "Gửi yêu cầu phát sinh",
      "Phát sinh thành công BHXH",
      "Từ chối",
    ];
    const phuongThucGuiOptions = ["email", "sms"];

    const getTenHopDong = computed(() => (hopDongId) => {
      const hopDong = store.getters["hopDong/getHopDongById"](hopDongId);
      return hopDong ? hopDong.tenGoiBaoHiem : "";
    });

    const formatDate = (dateString) => {
      return date.formatDate(dateString, "DD/MM/YYYY");
    };

    onMounted(() => {
      ghiChu.value = props.khachHang.ghiChu || "";
    });

    const capNhatTrangThai = () => {
      emit("cap-nhat-thong-tin-tai-tuc", {
        khachHangId: props.khachHang.id,
        trangThaiMoi: trangThaiTaiTuc.value,
        ghiChu: ghiChu.value,
      });
    };

    const moDialogGuiThongBao = () => {
      dialogGuiThongBaoMo.value = true;
    };

    const dongDialog = () => {
      emit("dong-dialog");
    };

    const guiThongBao = () => {
      emit("gui-thong-bao-tai-tuc", {
        khachHangId: props.khachHang.id,
        noiDung: noiDungThongBao.value,
        phuongThuc: phuongThucGui.value,
      });
      dialogGuiThongBaoMo.value = false;
    };

    const moDialogGiaHanHopDong = () => {
      hopDongDangGiaHan.value = store.getters["hopDong/getHopDongById"](
        props.khachHang.hopDongId
      );
      dialogGiaHanHopDongMo.value = true;
    };

    const dongDialogGiaHanHopDong = () => {
      dialogGiaHanHopDongMo.value = false;
    };

    const xuLyGiaHanHopDongThanhCong = () => {
      // Cập nhật trạng thái tái tục thành "Đã tái tục" (hoặc trạng thái phù hợp)
      emit("cap-nhat-thong-tin-tai-tuc", {
        khachHangId: props.khachHang.id,
        trangThaiMoi: "Đã tái tục",
        ghiChu: "", // Hoặc cập nhật ghi chú nếu cần
      });
      dongDialogGiaHanHopDong();
    };

    return {
      trangThaiTaiTuc,
      trangThaiTaiTucOptions,
      ghiChu,
      dialogGuiThongBaoMo,
      phuongThucGui,
      phuongThucGuiOptions,
      noiDungThongBao,
      getTenHopDong,
      formatDate,
      capNhatTrangThai,
      moDialogGuiThongBao,
      dongDialog,
      guiThongBao,
      dialogGiaHanHopDongMo,
      hopDongDangGiaHan,
      moDialogGiaHanHopDong,
      dongDialogGiaHanHopDong,
      xuLyGiaHanHopDongThanhCong,
    };
  },
};
</script>
