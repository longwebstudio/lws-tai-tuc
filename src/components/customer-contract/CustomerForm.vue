<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Thông tin khách hàng</div>
    </q-card-section>

    <q-form @submit="submitForm" class="q-gutter-md">
      <q-input
        v-model="form.ma_so_bhxh"
        label="Mã số BHXH"
        @blur="layThongTinBaoHiem"
      />
      <q-input
        v-model="form.ho_ten"
        label="Họ và tên"
        lazy-rules
        :rules="[
          (val) => {
            if (form.ma_so_bhxh && form.ma_so_bhxh.length > 0) {
              return true; // No validation if ma_so_bhxh is filled
            } else {
              return (val && val.length > 0) || 'Vui lòng nhập họ tên';
            }
          },
        ]"
      />

      <q-input v-model="form.ngay_sinh" label="Ngày sinh" type="date" />
      <q-input
        disable
        v-model="form.so_dien_thoai"
        label="Số điện thoại (đăng ký)"
      />
      <q-input v-model="form.so_dien_thoai2" label="Số điện thoại (liên hệ)" />
      <q-input v-model="form.email" label="Email" type="email" />
      <q-input v-model="form.dia_chi" label="Địa chỉ" type="textarea" />

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Đóng" v-close-popup />
        <q-btn flat label="Lưu" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { kiemTraLoaiChuoi } from '@/utils/chuoi-utils';
import { api } from "src/boot/axios";


export default {
  props: {
    khachHang: {
      type: Object,
      default: null,
    },
  },
  emits: ["dong-dialog", "luu-thong-tin"],
  setup(props, { emit }) {
    const store = useStore();
    const form = ref({
      id: null,
      ho_ten: "",
      ngay_sinh: "",
      so_dien_thoai: "",
      so_dien_thoai2: "",
      email: "",
      dia_chi: "",
      ma_so_bhxh: "", // Thêm trường maSoBhxh
    });

    onMounted(() => {
      if (props.khachHang) {
        // Nếu có khách hàng được truyền vào, điền thông tin vào form
        form.value = { ...props.khachHang };
      }
    });

    const submitForm = () => {
      emit("luu-thong-tin", form.value);
    };

    const dongDialog = () => {
      emit("dong-dialog");
    };

    const layThongTinBaoHiem = async () => {
      const maSoBHXH = form.value.ma_so_bhxh;
      if (kiemTraLoaiChuoi(maSoBHXH) === "Dãy 10 chữ số cuối") {
        try {
          const response = await api.get(`/api/bhyts/${maSoBHXH}`);
          const duLieuBaoHiem = response.data;
          // Update form with data from duLieuBaoHiem
          form.value.ho_ten = duLieuBaoHiem.hoTen || form.value.ho_ten;
          form.value.ngay_sinh =
            duLieuBaoHiem.ngaySinhDt || form.value.ngay_sinh;
          form.value.so_dien_thoai =
            duLieuBaoHiem.soDienThoai || form.value.so_dien_thoai;
          form.value.so_dien_thoai2 =
            duLieuBaoHiem.soDienThoai2 || form.value.so_dien_thoai2;
          form.value.dia_chi = duLieuBaoHiem.diaChiLh || form.value.dia_chi;
          // ... Update other fields similarly
        } catch (error) {
          console.error("Lỗi khi lấy thông tin bảo hiểm:", error);
          // Handle error
        }
      } else {
        console.error(
          'Mã số BHXH không hợp lệ: Không phải là "Dãy 10 chữ số cuối"'
        );
      }
    };

    return {
      form,
      submitForm,
      dongDialog,
      layThongTinBaoHiem,
    };
  },
};
</script>
