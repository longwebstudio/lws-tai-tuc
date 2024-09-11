import { Notify } from "quasar";
import { api } from "src/boot/axios";

export default {
  async layDanhSachHopDong({ commit }) {
    try {
      // Gọi API để lấy danh sách hợp đồng
      const response = await api.get("/api/hop-dong");
      commit("SET_DANH_SACH_HOP_DONG", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hợp đồng:", error);
      Notify.create({
        message: "Không thể lấy danh sách hợp đồng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async layDanhSachHopDongDaHetHan({ commit }) {
    try {
      const response = await api.get("/api/hop-dong/het-han");
      commit("SET_DANH_SACH_HOP_DONG_DA_HET_HAN", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hợp đồng đã hết hạn:", error);
      Notify.create({
        message:
          "Không thể lấy danh sách hợp đồng đã hết hạn. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  chonHopDong({ commit }, hopDong) {
    commit("SET_HOP_DONG_DANG_CHON", hopDong);
  },

  async themHopDong({ commit, dispatch }, hopDongMoi) {
    try {
      // Gọi API để thêm hợp đồng mới
      const response = await api.post("/api/hop-dong", hopDongMoi);
      commit("THEM_HOP_DONG", response.data);
      Notify.create({
        message: "Thêm hợp đồng thành công!",
        color: "positive",
        position: "top",
      });
      // Sau khi thêm thành công, có thể gọi lại action `layDanhSachHopDong` để cập nhật danh sách
      dispatch("layDanhSachHopDong");
    } catch (error) {
      console.error("Lỗi khi thêm hợp đồng:", error);
      Notify.create({
        message: "Không thể thêm hợp đồng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async suaHopDong({ commit, dispatch }, hopDongCapNhat) {
    try {
      // Gọi API để sửa thông tin hợp đồng
      await api.put(`/api/hop-dong/${hopDongCapNhat.id}`, hopDongCapNhat);
      commit("SUA_HOP_DONG", hopDongCapNhat);
      Notify.create({
        message: "Cập nhật thông tin hợp đồng thành công!",
        color: "positive",
        position: "top",
      });
      // Sau khi sửa thành công, có thể gọi lại action `layDanhSachHopDong` để cập nhật danh sách
      dispatch("layDanhSachHopDong");
    } catch (error) {
      console.error("Lỗi khi sửa thông tin hợp đồng:", error);
      Notify.create({
        message: "Không thể cập nhật thông tin hợp đồng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async xoaHopDong({ commit, dispatch }, hopDongId) {
    try {
      // Gọi API để xóa hợp đồng
      await api.delete(`/api/hop-dong/${hopDongId}`);
      commit("XOA_HOP_DONG", hopDongId);
      Notify.create({
        message: "Xóa hợp đồng thành công!",
        color: "positive",
        position: "top",
      });
      // Sau khi xóa thành công, có thể gọi lại action `layDanhSachHopDong` để cập nhật danh sách
      dispatch("layDanhSachHopDong");
    } catch (error) {
      console.error("Lỗi khi xóa hợp đồng:", error);
      Notify.create({
        message: "Không thể xóa hợp đồng. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },
};
