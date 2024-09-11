<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Ghi nhận thu tiền</div>
    </q-card-section>

    <q-form @submit="submitForm" class="q-gutter-md">
      <q-input
        v-model="form.soTien"
        label="Số tiền"
        type="number"
        :rules="[
          (val) => (val !== null && val > 0) || 'Số tiền phải lớn hơn 0',
        ]"
      />

      <q-input
        v-model="form.ngayThu"
        label="Ngày thu"
        type="date"
        :rules="[(val) => val !== null || 'Vui lòng chọn ngày thu']"
      />

      <q-select
        v-model="form.hinhThucThanhToan"
        :options="hinhThucThanhToanOptions"
        label="Hình thức thanh toán"
        emit-value
        map-options
        :rules="[(val) => val !== null || 'Vui lòng chọn hình thức thanh toán']"
      />

      <q-input v-model="form.ghiChu" label="Ghi chú" type="textarea" />

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Đóng" v-close-popup @click="$emit('dong-dialog')" />
        <q-btn flat label="Lưu" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    hopDongId: {
      type: Number, // Hoặc String, tùy thuộc vào kiểu dữ liệu của ID hợp đồng
      required: true,
    },
  },
  emits: ["dong-dialog", "luu-thong-tin"],
  setup(props, { emit }) {
    const form = ref({
      hopDongId: props.hopDongId,
      soTien: null,
      ngayThu: null,
      hinhThucThanhToan: null,
      ghiChu: "",
    });

    const hinhThucThanhToanOptions = [
      "Tiền mặt",
      "Chuyển khoản",
      "Thẻ tín dụng", // ... Các hình thức thanh toán khác
    ];

    const submitForm = () => {
      emit("luu-thong-tin", form.value);
    };

    return {
      form,
      hinhThucThanhToanOptions,
      submitForm,
    };
  },
};
</script>
