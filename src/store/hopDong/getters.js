export default {
  tongSoHopDong(state) {
    return state.danhSachHopDong.length;
  },
  getHopDongById: (state) => (id) => {
    return state.danhSachHopDong.find((hopDong) => hopDong.id === id);
  },
  timHopDongTheoTenKhachHang:
    (state, getters, rootState, rootGetters) => (tenKhachHang) => {
      const tenLowerCase = tenKhachHang.toLowerCase();
      return state.danhSachHopDong.filter((hopDong) => {
        const khachHang = rootGetters["khachHang/getKhachHangById"](
          hopDong.khachHangId
        );
        return (
          khachHang && khachHang.hoTen.toLowerCase().includes(tenLowerCase)
        );
      });
    },
  danhSachHopDongSapHetHan: (state) => {
    const ngayHienTai = new Date();
    return state.danhSachHopDong.filter((hopDong) => {
      const ngayHetHan = new Date(hopDong.ngayKetThuc);
      // Kiểm tra nếu hợp đồng sắp hết hạn (ví dụ: trong vòng 30 ngày tới)
      return (
        ngayHetHan > ngayHienTai &&
        ngayHetHan - ngayHienTai <= 30 * 24 * 60 * 60 * 1000
      );
    });
  },
  danhSachHopDongTheoKhachHangId: (state) => (khachHangId) => {
    return state.danhSachHopDong.filter(
      (hopDong) => hopDong.khachHangId === khachHangId
    );
  },
};
