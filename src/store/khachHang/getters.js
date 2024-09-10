export default {
  tongSoKhachHang(state) {
    return state.danhSachKhachHang.length;
  },
  getKhachHangById: (state) => (id) => {
    return state.danhSachKhachHang.find((khachHang) => khachHang.id === id);
  },
  timKhachHangTheoTen: (state) => (ten) => {
    const tenLowerCase = ten.toLowerCase();
    return state.danhSachKhachHang.filter((khachHang) =>
      khachHang.hoTen.toLowerCase().includes(tenLowerCase)
    );
  },
};
