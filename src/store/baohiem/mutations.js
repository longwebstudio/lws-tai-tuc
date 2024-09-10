// src/store/baohiem/mutations.js

import { Notify } from "quasar"; // Import Quasar Notify

export default {
  SET_DANH_SACH_BAO_HIEM(state, danhSach) {
    state.danhSachBaoHiem = danhSach;
  },

  ADD_BAO_HIEM(state, baoHiemMoi) {
    state.danhSachBaoHiem.push(baoHiemMoi);
    Notify.create({
      message: "Thêm bảo hiểm thành công!",
      color: "positive",
      position: "top",
    });
  },

  UPDATE_BAO_HIEM(state, baoHiemCapNhat) {
    const index = state.danhSachBaoHiem.findIndex(
      (bh) => bh.id === baoHiemCapNhat.id
    );
    if (index !== -1) {
      state.danhSachBaoHiem.splice(index, 1, baoHiemCapNhat);
      Notify.create({
        message: "Cập nhật bảo hiểm thành công!",
        color: "positive",
        position: "top",
      });
    }
  },

  DELETE_BAO_HIEM(state, id) {
    state.danhSachBaoHiem = state.danhSachBaoHiem.filter((bh) => bh.id !== id);
    Notify.create({
      message: "Xóa bảo hiểm thành công!",
      color: "positive",
      position: "top",
    });
  },

  SET_BAO_HIEM_DANG_CHON(state, baoHiem) {
    state.baoHiemDangChon = baoHiem;
  },

  SET_IS_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },

  SET_ERROR(state, error) {
    state.error = error;
    if (error) {
      // Hiển thị thông báo lỗi nếu có
      Notify.create({
        message: error,
        color: "negative",
        position: "top",
      });
    }
  },
};
