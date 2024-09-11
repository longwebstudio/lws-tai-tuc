<template>
  <div>
    <div class="text-h6 q-mb-md">Danh sách hợp đồng của {{ tenKhachHang }}</div>

    <q-btn label="Thêm hợp đồng mới" color="primary" @click="themHopDongMoi" />

    <q-list bordered separator class="q-mt-md">
      <q-item
        v-for="hopDong in danhSachHopDong"
        :key="hopDong.id"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ hopDong.tenGoiBaoHiem }}</q-item-label>
          <q-item-label caption lines="2">
            <div>Loại: {{ hopDong.loaiBaoHiem }}</div>
            <div>Ngày bắt đầu: {{ hopDong.ngayBatDau }}</div>
            <div>Ngày kết thúc: {{ hopDong.ngayKetThuc }}</div>
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
              @click.stop="suaHopDong(hopDong)"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click.stop="xoaHopDong(hopDong.id)"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="paid"
              @click.stop="moDialogThuTien(hopDong.id)"
            />
          </div>
        </q-item-section>
      </q-item>

      <div v-if="!danhSachHopDong.length" class="text-center q-pa-md">
        Không có hợp đồng nào.
      </div>
    </q-list>

    <q-dialog v-model="dialogThuTienMo" persistent>
      <thu-tien-form
        :hop-dong-id="hopDongIdDangThuTien"
        @dong-dialog="dongDialogThuTien"
        @luu-thong-tin="xuLyThuTienThanhCong"
      />
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ThuTienForm from "components/customer-contract/ThuTienForm.vue";

export default {
  components: {
    ThuTienForm,
  },
  props: {
    khachHangId: {
      type: Number,
      required: true,
    },
    danhSachHopDong: {
      type: Array,
      required: true,
    },
  },
  emits: ["them-hop-dong", "sua-hop-dong", "xoa-hop-dong"],
  setup(props, { emit }) {
    const store = useStore();

    const tenKhachHang = computed(() => {
      const khachHang = store.getters["khachHang/getKhachHangById"](
        props.khachHangId
      );
      return khachHang ? khachHang.hoTen : "";
    });

    const dialogThuTienMo = ref(false);
    const hopDongIdDangThuTien = ref(null);

    const themHopDongMoi = () => {
      emit("them-hop-dong");
    };

    const suaHopDong = (hopDong) => {
      emit("sua-hop-dong", hopDong);
    };

    const xoaHopDong = (hopDongId) => {
      emit("xoa-hop-dong", hopDongId);
    };

    const moDialogThuTien = (hopDongId) => {
      hopDongIdDangThuTien.value = hopDongId;
      dialogThuTienMo.value = true;
    };

    const dongDialogThuTien = () => {
      dialogThuTienMo.value = false;
    };

    const xuLyThuTienThanhCong = () => {
      // Sau khi thu tiền thành công, có thể cập nhật lại danh sách hợp đồng (nếu cần)
      store.dispatch("hopDong/layDanhSachHopDong");
      dongDialogThuTien();
    };

    return {
      tenKhachHang,
      themHopDongMoi,
      suaHopDong,
      xoaHopDong,
      dialogThuTienMo,
      hopDongIdDangThuTien,
      moDialogThuTien,
      dongDialogThuTien,
      xuLyThuTienThanhCong,
    };
  },
};
</script>
