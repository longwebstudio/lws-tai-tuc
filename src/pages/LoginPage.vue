<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-center">
        <div class="col-md-6">
          <q-card class="q-pa-md">
            <q-card-section>
              <div class="text-h5 text-center q-mb-md">Đăng nhập</div>

              <q-form @submit.prevent="submitLogin" class="q-gutter-md">
                <q-input
                  v-model="username"
                  label="Tên đăng nhập"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Vui lòng nhập tên đăng nhập',
                  ]"
                />

                <q-input
                  v-model="password"
                  label="Mật khẩu"
                  type="password"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Vui lòng nhập mật khẩu',
                  ]"
                />

                <div class="text-center q-mt-lg">
                  <q-btn label="Đăng nhập" type="submit" color="primary" />
                  <div class="q-mt-sm">
                    Chưa có tài khoản?
                    <router-link to="/dang-ky">Đăng ký</router-link>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "LoginPage",
  setup() {
    const username = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter(); // Lấy instance của router

    // Kiểm tra trạng thái đăng nhập khi thành phần được mounted
    if (store.getters["auth/isAuthenticated"]) {
      router.push("/");
    }

    const submitLogin = async () => {
      await store.dispatch("auth/login", {
        userData: {
          login: username.value,
          password: password.value,
        },
        router,
      });
      window.location.reload(true);
    };

    return {
      username,
      password,
      submitLogin,
    };
  },
};
</script>
