<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-center">
        <div class="col-md-6">
          <q-card class="q-pa-md">
            <q-card-section>
              <div class="text-h5 text-center q-mb-md">Đăng nhập</div>

              <q-form @submit="submitLogin" class="q-gutter-md">
                <q-input
                  v-model="email"
                  label="Email"
                  type="email"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Vui lòng nhập email',
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Notify } from "quasar";

export default {
  name: "DangNhap",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useStore();

    const submitLogin = async () => {
      try {
        // Gọi API đăng nhập từ backend
        const response = await axios.post("/api/login", {
          email: email.value,
          password: password.value,
        });

        // Lưu thông tin đăng nhập vào Vuex store (ví dụ: token, thông tin người dùng)
        store.dispatch("auth/login", response.data);

        // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
        router.push("/");

        Notify.create({
          message: "Đăng nhập thành công!",
          color: "positive",
          position: "top",
        });
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        Notify.create({
          message:
            "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.",
          color: "negative",
          position: "top",
        });
      }
    };

    return {
      email,
      password,
      submitLogin,
    };
  },
};
</script>
