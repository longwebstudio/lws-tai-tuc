<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">
        {{
          mode === "gia-han"
            ? "Gia hạn hợp đồng"
            : hopDong
            ? "Chỉnh sửa hợp đồng"
            : "Thêm hợp đồng mới"
        }}
      </div>
    </q-card-section>
    Khachs hangf id {{ khachHangId }}
    <q-form @submit="submitForm" class="q-gutter-md">
      <q-select
        v-model="form.loai_bao_hiem_id"
        :options="loaiBaoHiemOptions"
        label="Loại bảo hiểm"
        emit-value
        map-options
        :disable="mode === 'gia-han'"
        lazy-rules
        :rules="[(val) => (val && val > 1) || 'Vui lòng chọn loại bảo hiểm']"
      />

      <q-input
        v-model="form.ten_goi_bao_hiem"
        label="Tên gói bảo hiểm"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Vui lòng nhập tên gói']"
      />
      <q-input
        v-model="form.ngay_bat_dau"
        label="Ngày bắt đầu"
        type="date"
        :disable="mode === 'gia-han'"
      />
      <q-input
        v-model="form.ngay_ket_thuc"
        label="Ngày kết thúc"
        type="date"
        :rules="[
          (val) => (val && val.length > 0) || 'Vui lòng nhập ngày kết thúc',
          (val) =>
            val > form.ngay_bat_dau || 'Ngày kết thúc phải sau ngày bắt đầu',
        ]"
      />
      <q-input v-model="form.phi_bao_hiem" label="Mức phí" type="number" />

      <q-select
        v-if="mode === 'gia-han'"
        v-model="form.phuong_thuc_dong"
        :options="phuongThucDongOptions"
        label="Phương thức đóng"
        emit-value
        map-options
        lazy-rules
        :rules="[(val) => val !== null || 'Vui lòng chọn phương thức đóng']"
      />

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Đóng" v-close-popup @click="dongDialog" />
        <q-btn flat label="Lưu" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";

export default {
  name: "ContractForm",
  props: {
    hopDong: {
      type: Object,
      default: null,
    },
    khachHangId: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      default: "",
    },
  },
  emits: ["dong-dialog", "luu-thong-tin"],
  setup(props, { emit }) {
    const store = useStore();
    const form = ref({
      id: null,
      khach_hang_id: props.khachHangId,
      loai_bao_hiem_id: null,
      ten_goi_bao_hiem: "",
      ngay_bat_dau: new Date().toISOString().slice(0, 10),
      ngay_ket_thuc: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .slice(0, 10), // Tính ngày kết thúc 1 năm sau,
      phi_bao_hiem: null,
      phuong_thuc_dong: 12,
    });

    const loaiBaoHiemOptions = computed(
      () => store.state.taiTuc.loaiBaoHiemOptions
    );

    const phuongThucDongOptions = [
      { label: "1 tháng", value: 1 },
      { label: "3 tháng", value: 3 },
      { label: "6 tháng", value: 6 },
      { label: "12 tháng", value: 12 },
      { label: "24 tháng", value: 24 },
      { label: "36 tháng", value: 36 },
      { label: "48 tháng", value: 48 },
      { label: "60 tháng", value: 60 },
    ];

    onMounted(() => {
      if (props.hopDong) {
        // Trường hợp chỉnh sửa hợp đồng
        form.value = { ...props.hopDong };
      } else if (props.mode === "gia-han") {
        // Trường hợp gia hạn hợp đồng
        const khachHangDangChon = store.state.taiTuc.khachHangDangChon;
        const hopDongCu = store.getters["hopDong/getHopDongById"](
          khachHangDangChon.hop_dong_id
        );

        form.value.khach_hang_id = props.khachHangId;
        form.value.ngay_bat_dau = ngayTiepTheo(hopDongCu.ngay_ket_thuc);
        form.value.loai_bao_hiem_id = hopDongCu.loai_bao_hiem_id;
        form.value.ten_goi_bao_hiem = hopDongCu.ten_goi_bao_hiem;
        form.value.phi_bao_hiem = hopDongCu.phi_bao_hiem;
      }
    });

    // Theo dõi sự thay đổi của phuongThucDong, ngày bắt đầu, và ngày kết thúc cũ (nếu có)
    watch(
      [
        () => form.value.phuong_thuc_dong,
        () => form.value.ngay_bat_dau,
        () => props.hopDong?.ngay_ket_thuc,
      ],
      () => {
        if (
          props.mode === "gia-han" &&
          form.value.phuong_thuc_dong &&
          form.value.ngay_bat_dau
        ) {
          form.value.ngay_ket_thuc = tinhNgayKetThuc(
            form.value.ngay_bat_dau,
            props.hopDong?.ngay_ket_thuc,
            form.value.phuong_thuc_dong
          );
        }
      }
    );

    const ngayTiepTheo = (ngay) => {
      const date = new Date(ngay);
      date.setDate(date.getDate() + 1);
      return date.toISOString().slice(0, 10);
    };

    const tinhNgayKetThuc = (ngayBatDau, ngayKetThucCu, soThang) => {
      const ngayBatDauMoi = new Date(ngayBatDau);
      const ngayKetThucCuMoi = new Date(ngayKetThucCu);
      const ngayHienTai = new Date();

      let ngayTinh = ngayKetThucCuMoi;

      // Nếu gia hạn sau khi hợp đồng hết hạn, tính từ ngày hôm nay
      if (ngayKetThucCuMoi <= ngayHienTai) {
        ngayTinh = ngayHienTai;
      }

      ngayTinh.setMonth(ngayTinh.getMonth() + soThang);
      ngayTinh.setDate(ngayTinh.getDate() - 1);

      return ngayTinh.toISOString().slice(0, 10);
    };

    const submitForm = () => {
      emit("luu-thong-tin", form.value);
    };

    const dongDialog = () => {
      emit("dong-dialog");
    };

    return {
      form,
      loaiBaoHiemOptions,
      phuongThucDongOptions,
      submitForm,
      dongDialog,

      ngayTiepTheo,
      tinhNgayKetThuc,
    };
  },
};
</script>
