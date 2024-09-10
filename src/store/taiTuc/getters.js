export default {
  danhSachKhachHangCanTaiTucLoc(state, getters, rootState, rootGetters) {
    // Lấy danh sách khách hàng cần tái tục từ state của module taiTuc
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
};
