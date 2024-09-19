<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-center">
        <div class="col-md-6">
          <q-card class="q-pa-md">
            <q-card-section>
              <div class="text-h5 text-center q-mb-md">Đăng ký</div>

              <q-form @submit.prevent="submitRegister" class="q-gutter-md">
                <q-input
                  v-model="username"
                  label="Số điện thoại"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Vui lòng nhập Số điện thoại',
                    (val) =>
                      val.length >= 10 ||
                      'Số điện thoại phải có ít nhất 10 ký tự',
                  ]"
                />

                <q-input
                  v-model="tenDaiLy"
                  label="Tên đại lý"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Vui lòng nhập tên đại lý',
                  ]"
                />

                <q-input
                  v-model="email"
                  label="Email"
                  type="email"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Vui lòng nhập email',
                    (val) => isValidEmail(val) || 'Email không hợp lệ',
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
                    (val) =>
                      val.length >= 8 || 'Mật khẩu phải có ít nhất 8 ký tự',
                    (val) =>
                      isValidPassword(val) ||
                      'Mật khẩu phải bao gồm chữ cái in hoa, chữ thường, số và ký tự đặc biệt',
                  ]"
                />

                <q-input
                  v-model="passwordConfirmation"
                  label="Xác nhận mật khẩu"
                  type="password"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Vui lòng xác nhận mật khẩu',
                    (val) => val === password || 'Mật khẩu không khớp',
                  ]"
                />

                <div class="text-center q-mt-lg">
                  <q-btn label="Đăng ký" type="submit" color="primary" />
                  <div class="q-mt-sm">
                    Đã có tài khoản?
                    <router-link to="/dang-nhap">Đăng nhập</router-link>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Notify } from "quasar";
import { api } from "boot/axios";

export default {
  name: "RegisterPage",
  setup() {
    const username = ref("");
    const tenDaiLy = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const router = useRouter();
    const store = useStore();

    const isValidEmail = (val) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(val);
    };

    const isValidPassword = (val) => {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
      return passwordPattern.test(val);
    };

    // Kiểm tra trạng thái đăng nhập khi thành phần được mounted
    if (store.getters["auth/isAuthenticated"]) {
      router.push("/");
    }

    const submitRegister = async () => {
      try {
        const response = await api.post("/api/register", {
          username: username.value, // Gửi username lên server
          ten_dai_ly: tenDaiLy.value,
          email: email.value,
          password: password.value,
          password_confirmation: passwordConfirmation.value,
        });

        // Lưu thông tin đăng nhập vào Vuex store
        store.dispatch("auth/login", response.data);

        // Chuyển hướng đến trang chủ sau khi đăng ký thành công
        router.push("/");

        Notify.create({
          message: "Đăng ký thành công!",
          color: "positive",
          position: "top",
        });
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        Notify.create({
          message: "Lỗi đăng ký!",
          color: "negative",
          position: "top",
        });
        // Xử lý lỗi và hiển thị thông báo (có thể bạn muốn làm điều này ở một nơi khác)
      }
    };

    return {
      username,
      tenDaiLy,
      email,
      password,
      passwordConfirmation,
      isValidEmail,
      isValidPassword,
      submitRegister,
    };
  },
};
</script>
