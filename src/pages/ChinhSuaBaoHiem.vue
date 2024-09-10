<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Chỉnh sửa Bảo hiểm</div>

    <q-form @submit="submitForm" class="q-gutter-md" ref="form">
      <q-input
        v-model="baoHiem.bienSoXe"
        label="Biển số xe"
        outlined
        :rules="[(val) => !!val || 'Vui lòng nhập biển số xe']"
      />

      <q-input
        v-model="baoHiem.hangBaoHiem"
        label="Hãng bảo hiểm"
        outlined
        :rules="[(val) => !!val || 'Vui lòng nhập hãng bảo hiểm']"
      />

      <q-select
        v-model="baoHiem.loaiBaoHiem"
        label="Loại bảo hiểm"
        :options="loaiBaoHiemOptions"
        outlined
        :rules="[(val) => !!val || 'Vui lòng chọn loại bảo hiểm']"
      />

      <q-input
        v-model="baoHiem.ngayBatDau"
        label="Ngày bắt đầu"
        outlined
        type="date"
        :rules="[(val) => !!val || 'Vui lòng chọn ngày bắt đầu']"
      />

      <q-input
        v-model="baoHiem.ngayKetThuc"
        label="Ngày kết thúc"
        outlined
        type="date"
        :rules="[
          (val) => !!val || 'Vui lòng chọn ngày kết thúc',
          (val) =>
            new Date(val) > new Date(baoHiem.ngayBatDau) ||
            'Ngày kết thúc phải sau ngày bắt đầu',
        ]"
      />

      <q-input
        v-model.number="baoHiem.soTienBaoHiem"
        label="Số tiền bảo hiểm"
        outlined
        type="number"
        :rules="[
          (val) => !!val || 'Vui lòng nhập số tiền bảo hiểm',
          (val) => val > 0 || 'Số tiền bảo hiểm phải lớn hơn 0',
        ]"
      />

      <div class="text-right">
        <q-btn label="Lưu" type="submit" color="primary" />
        <q-btn
          label="Hủy"
          color="grey"
          flat
          class="q-ml-sm"
          :to="{ name: 'danh-sach-bao-hiem' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loaiBaoHiemOptions: [
        "TNDS bắt buộc",
        "Bảo hiểm thân vỏ",
        // ... thêm các loại bảo hiểm khác nếu cần
      ],
    };
  },

  computed: {
    ...mapState("baohiem", ["baoHiemDangChon"]),
    baoHiem: {
      get() {
        return this.baoHiemDangChon ? { ...this.baoHiemDangChon } : {};
      },
      set(value) {
        // Không cần thiết phải cập nhật state trực tiếp ở đây
      },
    },
  },

  methods: {
    ...mapActions("baohiem", ["capNhatBaoHiem"]),

    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.capNhatBaoHiem(this.baoHiem);
          this.$router.push({ name: "danh-sach-bao-hiem" });
        }
      });
    },
  },

  mounted() {
    if (!this.baoHiemDangChon) {
      this.$router.push({ name: "danh-sach-bao-hiem" });
    }
  },
};
</script>
