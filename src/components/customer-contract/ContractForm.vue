<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Thông tin hợp đồng</div>
    </q-card-section>

    <q-form @submit="submitForm" class="q-gutter-md">
      <q-select
        v-model="form.loaiBaoHiem"
        :options="loaiBaoHiemOptions"
        label="Loại bảo hiểm"
        emit-value
        map-options
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
      <q-input v-model="form.ngayBatDau" label="Ngày bắt đầu" type="date" />
      <q-input v-model="form.ngayKetThuc" label="Ngày kết thúc" type="date" />
      <q-input v-model="form.mucPhi" label="Mức phí" type="number" />

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Đóng" v-close-popup />
        <q-btn flat label="Lưu" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: {
    hopDong: {
      type: Object,
      default: null,
    },
    khachHangId: {
      type: Number, // Hoặc String, tùy thuộc vào kiểu dữ liệu của ID khách hàng
      required: true,
    },
  },
  emits: ["dong-dialog", "luu-thong-tin"],
  setup(props, { emit }) {
    const form = ref({
      id: null,
      khachHangId: props.khachHangId,
      loaiBaoHiem: null,
      tenGoiBaoHiem: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      mucPhi: null,
    });

    const loaiBaoHiemOptions = [
      "Bảo hiểm xã hội",
      "Bảo hiểm y tế",
      "Bảo hiểm thất nghiệp", // ... Các loại bảo hiểm khác
    ];

    onMounted(() => {
      if (props.hopDong) {
        // Nếu có hợp đồng được truyền vào, điền thông tin vào form
        form.value = { ...props.hopDong };
      }
    });

    const submitForm = () => {
      emit("luu-thong-tin", form.value);
    };

    const dongDialog = () => {
      emit("dong-dialog");
    };

    return {
      form,
      loaiBaoHiemOptions,
      submitForm,
      dongDialog,
    };
  },
};
</script>
