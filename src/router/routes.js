const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "danh-sach-bao-hiem",
        component: () => import("pages/DanhSachBaoHiem.vue"),
      },
      {
        path: "khach-hang-hop-dong",
        component: () => import("pages/CustomerContract.vue"),
      },
      { path: "tai-tuc", component: () => import("pages/Renewal.vue") },
      {
        path: "/hop-dong-het-han",
        component: () => import("pages/ExpiredContracts.vue"),
      },
      // ... các trang khác nếu cần
    ],
  },
  { path: "/dang-nhap", component: () => import("pages/Login.vue") },
  // Always leave this as last one,
  // but you can also remove it
  // Luôn đặt route này ở cuối cùng
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
