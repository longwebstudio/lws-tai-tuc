import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true, // Cho phép truy cập các thành phần của module này bằng cách sử dụng tên module (ví dụ: this.$store.state.khachHang.danhSachKhachHang)
  state,
  mutations,
  actions,
  getters,
};
