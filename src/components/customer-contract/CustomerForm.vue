<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Thông tin khách hàng</div>
    </q-card-section>

    <q-form @submit="submitForm" class="q-gutter-md">
      <q-input v-model="form.ma_so_bhxh" label="Mã số BHXH" />
      <q-input
        v-model="form.ho_ten"
        label="Họ và tên"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Vui lòng nhập họ tên']"
      />
      <q-input v-model="form.ngaySinh" label="Ngày sinh" type="date" />
      <q-input v-model="form.soDienThoai" label="Số điện thoại" />
      <q-input v-model="form.email" label="Email" type="email" />
      <q-input v-model="form.diaChi" label="Địa chỉ" type="textarea" />

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
      ngaySinh: "",
      soDienThoai: "",
      email: "",
      diaChi: "",
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

    return {
      form,
      submitForm,
      dongDialog,
    };
  },
};
</script>
