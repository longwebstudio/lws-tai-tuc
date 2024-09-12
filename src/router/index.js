import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useStore } from "vuex";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard để kiểm tra trạng thái đăng nhập
router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.getters["auth/isAuthenticated"]; // Giả sử bạn có một getter isAuthenticated trong module auth

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/dang-nhap"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  } else {
    next(); // Tiếp tục điều hướng nếu đã đăng nhập hoặc route không yêu cầu xác thực
  }
});

export default router;
