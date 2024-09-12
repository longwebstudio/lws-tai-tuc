export default {
  danhSachKhachHangCanTaiTucLoc(state, getters, rootState, rootGetters) {
    let danhSachLoc = state.danhSachKhachHangCanTaiTuc;

    // Lọc theo loại bảo hiểm
    if (state.loaiBaoHiem !== "Tất cả") {
      danhSachLoc = danhSachLoc.filter(
        (khachHang) =>
          rootGetters["hopDong/getHopDongById"](khachHang.hopDongId)
            .loaiBaoHiem === state.loaiBaoHiem
      );
    }

    // Lọc theo trạng thái tái tục
    if (state.trangThaiTaiTuc !== "Tất cả") {
      danhSachLoc = danhSachLoc.filter(
        (khachHang) => khachHang.trangThaiTaiTuc === state.trangThaiTaiTuc
      );
    }

    return danhSachLoc;
  },

  tongSoKhachHangCanTaiTuc(state, getters) {
    // Sử dụng getter đã lọc để tính tổng số
    return getters.danhSachKhachHangCanTaiTucLoc.length;
  },

  soLuongHopDongDaTaiTuc(state, getters) {
    return getters.danhSachKhachHangCanTaiTucLoc.filter(
      (kh) => kh.trangThaiTaiTuc === "Đã tái tục"
    ).length;
  },

  tyLeTaiTuc(state, getters) {
    const tongSo = getters.tongSoKhachHangCanTaiTuc;
    if (tongSo === 0) return 0;
    return ((getters.soLuongHopDongDaTaiTuc / tongSo) * 100).toFixed(2);
  },
};
