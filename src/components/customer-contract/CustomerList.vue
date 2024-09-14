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
            khachHang.ho_ten
          }}</q-item-label>
          <q-item-label caption lines="2">
            <div>{{ khachHang.so_dien_thoai2 || khachHang.so_dien_thoai }}</div>
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
import { useStore } from "vuex";

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
    const store = useStore();
    const searchText = ref("");
    const filterLoaiBaoHiem = ref("Tất cả");

    const loaiBaoHiemOptions = computed(
      () => store.state.taiTuc.loaiBaoHiemOptions
    );

    const danhSachKhachHangLoc = computed(() => {
      let ketQua = props.danhSachKhachHang;

      if (searchText.value) {
        const searchTerm = searchText.value.toLowerCase();
        ketQua = ketQua.filter(
          (khachHang) =>
            khachHang.ho - ten.toLowerCase().includes(searchTerm) ||
            khachHang.so_dien_thoai.includes(searchTerm) ||
            khachHang.so_dien_thoai2.includes(searchTerm) ||
            khachHang.email.toLowerCase().includes(searchTerm)
        );
      }

      if (filterLoaiBaoHiem.value !== "Tất cả") {
        ketQua = ketQua.filter((khachHang) => {
          // Lọc các hợp đồng của khách hàng theo loại bảo hiểm
          const hopDongsLoc = khachHang.hop_dongs.filter(
            (hopDong) => hopDong.loaiBaoHiem === filterLoaiBaoHiem.value
          );
          // Nếu có ít nhất một hợp đồng phù hợp, giữ lại khách hàng
          return hopDongsLoc.length > 0;
        });
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
