import { Notify } from "quasar";
import { api } from "src/boot/axios";

export default {
  async layDanhSachKhachHang({ commit }) {
    try {
      // Gọi API để lấy danh sách khách hàng
      const response = await api.get("/api/khach-hang");
      commit("SET_DANH_SACH_KHACH_HANG", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
      Notify.create({
        message: "Không thể lấy danh sách khách hàng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  chonKhachHang({ commit }, khachHang) {
    commit("SET_KHACH_HANG_DANG_CHON", khachHang);
  },

  async themKhachHang({ commit, dispatch }, khachHangMoi) {
    try {
      // Gọi API để thêm khách hàng mới
      const response = await api.post("/api/khach-hang", khachHangMoi);
      commit("THEM_KHACH_HANG", response.data);
      Notify.create({
        message: "Thêm khách hàng thành công!",
        color: "positive",
        position: "top",
      });
      // Sau khi thêm thành công, có thể gọi lại action `layDanhSachKhachHang` để cập nhật danh sách
      dispatch("layDanhSachKhachHang");
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error);
      Notify.create({
        message: "Không thể thêm khách hàng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async suaKhachHang({ commit, dispatch }, khachHangCapNhat) {
    try {
      // Gọi API để sửa thông tin khách hàng
      await api.put(`/api/khach-hang/${khachHangCapNhat.id}`, khachHangCapNhat);
      commit("SUA_KHACH_HANG", khachHangCapNhat);
      Notify.create({
        message: "Cập nhật thông tin khách hàng thành công!",
        color: "positive",
        position: "top",
      });
      // Sau khi sửa thành công, có thể gọi lại action `layDanhSachKhachHang` để cập nhật danh sách
      dispatch("layDanhSachKhachHang");
    } catch (error) {
      console.error("Lỗi khi sửa thông tin khách hàng:", error);
      Notify.create({
        message:
          "Không thể cập nhật thông tin khách hàng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async xoaKhachHang({ commit, dispatch }, khachHangId) {
    try {
      // Gọi API để xóa khách hàng
      await api.delete(`/api/khach-hang/${khachHangId}`);
      commit("XOA_KHACH_HANG", khachHangId);
      Notify.create({
        message: "Xóa khách hàng thành công!",
        color: "positive",
        position: "top",
      });
      // Sau khi xóa thành công, có thể gọi lại action `layDanhSachKhachHang` để cập nhật danh sách
      dispatch("layDanhSachKhachHang");
    } catch (error) {
      console.error("Lỗi khi xóa khách hàng:", error);
      Notify.create({
        message: "Không thể xóa khách hàng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },
};
