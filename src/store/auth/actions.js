import { api } from "boot/axios";
import { Notify } from "quasar";

export default {
  async login({ commit }, { userData, router }) {
    try {
      const response = await api.post("/api/login", userData);
      commit("LOGIN", response.data); // Giả sử backend trả về { user, token }
      Notify.create({
        message: "Đăng nhập thành công!",
        color: "positive",
        position: "top",
      });
      // Chuyển hướng đến trang chủ sau khi đăng nhập
      // router.push("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      Notify.create({
        message:
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.",
        color: "negative",
        position: "top",
      });
    }
  },

  async logout({ commit }, { router }) {
    try {
      // Gọi API logout trước
      // await api.post("/api/logout");

      // Sau khi logout thành công trên server, mới commit mutation LOGOUT
      commit("LOGOUT");
      router.push("/dang-nhap");

      Notify.create({
        message: "Đăng xuất thành công!",
        color: "positive",
        position: "top",
      });
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      Notify.create({
        message: "Đăng xuất thất bại. Vui lòng thử lại sau.",
        color: "negative",
        position: "top",
      });
    }
  },

  async fetchUser({ commit }) {
    // Thêm action mới để lấy thông tin người dùng
    try {
      const response = await api.get("/api/user");
      commit("SET_USER", response.data); // Giả sử bạn có mutation SET_USER để cập nhật thông tin người dùng trong state
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      // Xử lý lỗi, ví dụ: chuyển hướng đến trang đăng nhập nếu token không hợp lệ
    }
  },
};
