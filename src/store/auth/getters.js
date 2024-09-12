export default {
  isAuthenticated(state) {
    return !!state.token; // Kiểm tra xem token có tồn tại hay không
  },
  getUser(state) {
    return state.user;
  },
  isAdmin(state) {
    // Thêm getter để kiểm tra vai trò
    return state.user && state.user.vaiTro === "dai_ly_chinh";
  },
};
