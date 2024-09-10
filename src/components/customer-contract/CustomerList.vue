<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-6">
        <q-input v-model="searchText" label="Tìm kiếm" dense outlined />
      </div>
      <div class="col-6">
        <q-select
          v-model="filterLoaiBaoHiem"
          :options="loaiBaoHiemOptions"
          label="Lọc theo loại bảo hiểm"
          dense
          outlined
          emit-value
          map-options
        />
      </div>
    </div>

    <q-list bordered separator>
      <q-item
        v-for="khachHang in danhSachKhachHangLoc"
        :key="khachHang.id"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar icon="person" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label @click="chonKhachHang(khachHang)">{{
            khachHang.hoTen
          }}</q-item-label>
          <q-item-label caption lines="2">
            <div>{{ khachHang.soDienThoai }}</div>
            <div>{{ khachHang.email }}</div>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="edit"
              @click.stop="suaKhachHang(khachHang)"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click.stop="xoaKhachHang(khachHang.id)"
            />
          </div>
        </q-item-section>
      </q-item>

      <div v-if="!danhSachKhachHangLoc.length" class="text-center q-pa-md">
        Không có khách hàng nào.
      </div>
    </q-list>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    danhSachKhachHang: {
      type: Array,
      required: true,
    },
  },
  emits: [
    "chon-khach-hang",
    "them-khach-hang",
    "sua-khach-hang",
    "xoa-khach-hang",
  ],
  setup(props, { emit }) {
    const searchText = ref("");
    const filterLoaiBaoHiem = ref("Tất cả");
    const loaiBaoHiemOptions = [
      "Tất cả",
      "Bảo hiểm xã hội",
      "Bảo hiểm y tế",
      "Bảo hiểm thất nghiệp", // ... Các loại bảo hiểm khác
    ];

    const danhSachKhachHangLoc = computed(() => {
      let ketQua = props.danhSachKhachHang;

      if (searchText.value) {
        const searchTerm = searchText.value.toLowerCase();
        ketQua = ketQua.filter(
          (khachHang) =>
            khachHang.hoTen.toLowerCase().includes(searchTerm) ||
            khachHang.soDienThoai.includes(searchTerm) ||
            khachHang.email.toLowerCase().includes(searchTerm)
        );
      }

      if (filterLoaiBaoHiem.value !== "Tất cả") {
        // Giả sử mỗi khách hàng có một mảng `loaiBaoHiem` chứa các loại bảo hiểm họ đã tham gia
        ketQua = ketQua.filter((khachHang) =>
          khachHang.loaiBaoHiem.includes(filterLoaiBaoHiem.value)
        );
      }

      return ketQua;
    });

    const chonKhachHang = (khachHang) => {
      emit("chon-khach-hang", khachHang);
    };

    const themKhachHangMoi = () => {
      emit("them-khach-hang");
    };

    const suaKhachHang = (khachHang) => {
      emit("sua-khach-hang", khachHang);
    };

    const xoaKhachHang = (khachHangId) => {
      emit("xoa-khach-hang", khachHangId);
    };

    return {
      searchText,
      filterLoaiBaoHiem,
      loaiBaoHiemOptions,
      danhSachKhachHangLoc,
      chonKhachHang,
      themKhachHangMoi,
      suaKhachHang,
      xoaKhachHang,
    };
  },
};
</script>
