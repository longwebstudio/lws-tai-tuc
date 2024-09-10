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
        path: "them-bao-hiem",
        name: "them-bao-hiem",
        component: () => import("pages/ThemBaoHiem.vue"),
      },
      {
        path: "chinh-sua-bao-hiem",
        name: "chinh-sua-bao-hiem",
        component: () => import("pages/ChinhSuaBaoHiem.vue"),
      },
      // ... other routes if you have any
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
