<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ route.name }}
        </q-toolbar-title>

        <q-btn
          v-if="isAuthenticated"
          flat
          round
          dense
          icon="logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header>Điều hướng</q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          exact
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated v-if="$q.screen.lt.md">
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const store = useStore();

    const navs = [
      {
        label: "Khách hàng & Hợp đồng",
        icon: "people",
        to: "/khach-hang-hop-dong",
      },
      {
        label: "Tái tục",
        icon: "refresh",
        to: "/tai-tuc",
      },
      {
        label: "Hợp đồng hết hạn",
        icon: "event_busy", // Hoặc một icon khác phù hợp
        to: "/hop-dong-het-han",
      },
      // Thêm các mục điều hướng khác nếu cần
    ];

    const isAuthenticated = computed(
      () => store.getters["auth/isAuthenticated"]
    );

    const route = computed(() => router.currentRoute.value); // Lấy thông tin route hiện tại

    onMounted(() => {
      // ...

      // Gọi action để lấy thông tin người dùng nếu đã có token
      if (store.state.auth.token) {
        store.dispatch("auth/fetchUser");
      }
    });

    // Theo dõi sự thay đổi của isAuthenticated để chuyển hướng nếu cần
    watch(isAuthenticated, (newVal) => {
      if (!newVal) {
        router.push("/dang-nhap");
      }
    });

    const logout = () => {
      store.dispatch("auth/logout", { router });
    };

    return {
      leftDrawerOpen,
      navs,
      isAuthenticated,
      logout,
      route,
    };
  },
};
</script>
