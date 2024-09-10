export default {
  SET_DANH_SACH_HOP_DONG(state, danhSachHopDongMoi) {
    state.danhSachHopDong = danhSachHopDongMoi;
  },
  SET_HOP_DONG_DANG_CHON(state, hopDong) {
    state.hopDongDangChon = hopDong;
  },
  THEM_HOP_DONG(state, hopDongMoi) {
    state.danhSachHopDong.push(hopDongMoi);
  },
  SUA_HOP_DONG(state, hopDongCapNhat) {
    const index = state.danhSachHopDong.findIndex(
      (hd) => hd.id === hopDongCapNhat.id
    );
    if (index !== -1) {
      state.danhSachHopDong.splice(index, 1, hopDongCapNhat);
    }
  },
  XOA_HOP_DONG(state, hopDongId) {
    state.danhSachHopDong = state.danhSachHopDong.filter(
      (hd) => hd.id !== hopDongId
    );
  },
};
