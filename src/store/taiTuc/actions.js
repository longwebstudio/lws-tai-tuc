import { Notify } from "quasar";
import { api } from "src/boot/axios";

export default {
  async layDanhSachKhachHangCanTaiTuc({ commit }) {
    try {
      // Gọi API để lấy danh sách khách hàng cần tái tục
      const response = await api.get("/api/tai-tuc");
      commit("SET_DANH_SACH_KHACH_HANG_CAN_TAI_TUC", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng cần tái tục:", error);
      Notify.create({
        message:
          "Không thể lấy danh sách khách hàng cần tái tục. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async layDanhSachLoaiBaoHiem({ commit }) {
    try {
      const response = await api.get("/api/bao-hiem");
      // Chuyển đổi dữ liệu từ backend thành định dạng phù hợp cho QSelect
      const loaiBaoHiemOptions = response.data.map(({ id, ten_loai }) => ({
        label: ten_loai,
        value: id,
      }));
      commit("SET_DANH_SACH_LOAI_BAO_HIEM", loaiBaoHiemOptions);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách loại bảo hiểm:", error);
      Notify.create({
        message: "Không thể lấy danh sách loại bảo hiểm. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  capNhatTrangThaiTaiTuc({ commit }, trangThaiMoi) {
    commit("SET_TRANG_THAI_TAI_TUC", trangThaiMoi);
  },

  capNhatLoaiBaoHiem({ commit }, loaiBaoHiemMoi) {
    commit("SET_LOAI_BAO_HIEM", loaiBaoHiemMoi);
  },

  async capNhatThongTinTaiTuc(
    { commit, dispatch },
    { khachHangId, trangThaiMoi, ghiChu }
  ) {
    try {
      // Gọi API để cập nhật thông tin tái tục của khách hàng
      await api.put(`/api/tai-tuc/${khachHangId}`, {
        trangThai: trangThaiMoi,
        ghiChu,
      });
      // Sau khi cập nhật thành công, có thể gọi lại action `layDanhSachKhachHangCanTaiTuc` để cập nhật danh sách
      dispatch("layDanhSachKhachHangCanTaiTuc");
      Notify.create({
        message: "Cập nhật thông tin tái tục thành công!",
        color: "positive",
        position: "top",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin tái tục:", error);
      Notify.create({
        message: "Không thể cập nhật thông tin tái tục. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async guiThongBaoTaiTuc({ dispatch }, { khachHangId, noiDung, phuongThuc }) {
    try {
      // Gọi API để gửi thông báo tái tục
      await api.post("/api/tai-tuc/gui-thong-bao", {
        khachHangId,
        noiDung,
        phuongThuc,
      });
      // Sau khi gửi thành công, có thể cập nhật trạng thái tái tục của khách hàng (ví dụ: thành "Đã liên hệ")
      dispatch("capNhatThongTinTaiTuc", {
        khachHangId,
        trangThaiMoi: "Đã liên hệ",
      });
      Notify.create({
        message: "Gửi thông báo tái tục thành công!",
        color: "positive",
        position: "top",
      });
    } catch (error) {
      console.error("Lỗi khi gửi thông báo tái tục:", error);
      Notify.create({
        message: "Không thể gửi thông báo tái tục. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },
};
