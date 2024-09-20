<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-6">
        <q-input
          v-model="searchText"
          debounce="500"
          label="Tìm kiếm"
          dense
          outlined
          @keyup.enter="traCuuBaoHiem"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="searchText = ''"
            />
          </template>
        </q-input>
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

    <q-alert v-if="loiTraCuu" type="negative" class="q-mt-sm">
      <!-- Hiển thị lỗi -->
      {{ loiTraCuu }}
    </q-alert>
  </div>
</template>

<script>
import { xacDinhLoaiChuoi } from "src/utils/chuoi-utils";
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
    const loiTraCuu = ref(null);
    const filterLoaiBaoHiem = ref(1);

    const loaiBaoHiemOptions = computed(
      () => store.state.taiTuc.loaiBaoHiemOptions
    );

    const danhSachKhachHangLoc = computed(() => {
      let ketQua = props.danhSachKhachHang;

      if (searchText.value) {
        const searchTerm = searchText.value.toLowerCase();
        ketQua = ketQua.filter(
          (khachHang) =>
            khachHang.ho_ten.toLowerCase().includes(searchTerm) ||
            khachHang.so_dien_thoai?.includes(searchTerm) ||
            khachHang.so_dien_thoai2?.includes(searchTerm) ||
            khachHang.email?.toLowerCase().includes(searchTerm)
        );
      }

      if (filterLoaiBaoHiem.value !== 1) {
        ketQua = ketQua.filter((khachHang) => {
          // Lọc các hợp đồng của khách hàng theo loại bảo hiểm
          const hopDongsLoc = khachHang.hop_dong_bao_hiem.filter(
            (hopDong) => hopDong.loai_bao_hiem_id == filterLoaiBaoHiem.value
          );
          // Nếu có ít nhất một hợp đồng phù hợp, giữ lại khách hàng
          return hopDongsLoc.length > 0;
        });
      }

      return ketQua;
    });

    const traCuuBaoHiem = async () => {
      const loaiChuoi = xacDinhLoaiChuoi(searchText.value);

      try {
        let response;
        if (loaiChuoi === "Dãy 10 chữ số cuối") {
          //tra cứu traCuuBaoHiemXaHoi
        } else {
          loiTraCuu.value = "Nhập mã số BHXH và nhấn ENTER để thêm khách hàng";
          return;
        }

        ketQuaTraCuu.value = response; // Cập nhật kết quả tra cứu
        loiTraCuu.value = null; // Xóa lỗi
      } catch (error) {
        // Xử lý lỗi khi gọi API
        loiTraCuu.value = error.message; // Cập nhật lỗi
        ketQuaTraCuu.value = null; // Xóa kết quả
      }
    };

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
      traCuuBaoHiem,
      loiTraCuu,
    };
  },
};
</script>
