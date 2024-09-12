export default {
  user: null,
  token: localStorage.getItem("token") || null, // Lấy token từ localStorage hoặc đặt null nếu không có
};
