export default {
  SET_DANH_SACH_KHACH_HANG(state, danhSachKhachHangMoi) {
    state.danhSachKhachHang = danhSachKhachHangMoi;
  },
  SET_KHACH_HANG_DANG_CHON(state, khachHang) {
    state.khachHangDangChon = khachHang;
  },
  THEM_KHACH_HANG(state, khachHangMoi) {
    state.danhSachKhachHang.push(khachHangMoi);
  },
  SUA_KHACH_HANG(state, khachHangCapNhat) {
    const index = state.danhSachKhachHang.findIndex(
      (kh) => kh.id === khachHangCapNhat.id
    );
    if (index !== -1) {
      state.danhSachKhachHang.splice(index, 1, khachHangCapNhat);
    }
  },
  XOA_KHACH_HANG(state, khachHangId) {
    state.danhSachKhachHang = state.danhSachKhachHang.filter(
      (kh) => kh.id !== khachHangId
    );
  },
};
