export default {
  LOGIN(state, { user, token }) {
    state.user = user;
    state.token = token;
    // Lưu token vào localStorage hoặc sessionStorage nếu cần
    localStorage.setItem("token", token);
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    // Xóa token khỏi localStorage hoặc sessionStorage
    localStorage.removeItem("token");
  },
  SET_USER(state, user) {
    state.user = user;
  },
};
