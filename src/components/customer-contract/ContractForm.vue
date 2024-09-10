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

    <q-form @submit="submitForm" class="q-gutter-md">
      <q-select
        v-model="form.loaiBaoHiem"
        :options="loaiBaoHiemOptions"
        label="Loại bảo hiểm"
        emit-value
        map-options
        :disable="mode === 'gia-han'"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Vui lòng chọn loại bảo hiểm',
        ]"
      />

      <q-input
        v-model="form.tenGoiBaoHiem"
        label="Tên gói bảo hiểm"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Vui lòng nhập tên gói']"
      />
      <q-input
        v-model="form.ngayBatDau"
        label="Ngày bắt đầu"
        type="date"
        :disable="mode === 'gia-han'"
      />
      <q-input
        v-model="form.ngayKetThuc"
        label="Ngày kết thúc"
        type="date"
        :rules="[
          (val) => (val && val.length > 0) || 'Vui lòng nhập ngày kết thúc',
          (val) =>
            val > form.ngayBatDau || 'Ngày kết thúc phải sau ngày bắt đầu',
        ]"
      />
      <q-input v-model="form.mucPhi" label="Mức phí" type="number" />

      <q-select
        v-if="mode === 'gia-han'"
        v-model="form.phuongThucDong"
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
      khachHangId: props.khachHangId,
      loaiBaoHiem: null,
      tenGoiBaoHiem: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      mucPhi: null,
      phuongThucDong: null,
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
          khachHangDangChon.hopDongId
        );

        form.value.khachHangId = props.khachHangId;
        form.value.ngayBatDau = ngayTiepTheo(hopDongCu.ngayKetThuc);
        form.value.loaiBaoHiem = hopDongCu.loaiBaoHiem;
        form.value.tenGoiBaoHiem = hopDongCu.tenGoiBaoHiem;
        form.value.mucPhi = hopDongCu.mucPhi;
      }
    });

    // Theo dõi sự thay đổi của phuongThucDong, ngày bắt đầu, và ngày kết thúc cũ (nếu có)
    watch(
      [
        () => form.value.phuongThucDong,
        () => form.value.ngayBatDau,
        () => props.hopDong?.ngayKetThuc,
      ],
      () => {
        if (
          props.mode === "gia-han" &&
          form.value.phuongThucDong &&
          form.value.ngayBatDau
        ) {
          form.value.ngayKetThuc = tinhNgayKetThuc(
            form.value.ngayBatDau,
            props.hopDong?.ngayKetThuc,
            form.value.phuongThucDong
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
