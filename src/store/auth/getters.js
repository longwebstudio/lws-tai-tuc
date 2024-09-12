export default {
  isAuthenticated(state) {
    return !!state.token; // Kiểm tra xem token có tồn tại hay không
  },
  getUser(state) {
    return state.user;
  },
};
