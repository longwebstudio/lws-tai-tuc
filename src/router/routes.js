const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "TrangChu",
        component: () => import("pages/Index.vue"),
        meta: { requiresAuth: true }, // Yêu cầu xác thực để truy cập trang chủ
      },
      {
        path: "khach-hang-hop-dong",
        component: () => import("pages/CustomerContract.vue"),
        meta: { requiresAuth: true }, // Yêu cầu xác thực
      },
      {
        path: "tai-tuc",
        component: () => import("pages/Renewal.vue"),
        meta: { requiresAuth: true }, // Yêu cầu xác thực
      },
      {
        path: "hop-dong-het-han",
        component: () => import("pages/ExpiredContracts.vue"),
        meta: { requiresAuth: true }, // Yêu cầu xác thực
      },
    ],
  },

  { path: "/dang-nhap", component: () => import("pages/LoginPage.vue") },
  { path: "/dang-ky", component: () => import("pages/RegisterPage.vue") },

  // Luôn đặt route này ở cuối cùng
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
