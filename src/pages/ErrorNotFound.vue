<template>
  <div class="error-not-found">
    <div class="container">
      <div class="row justify-center">
        <div class="col-md-6">
          <div class="q-pa-md">
            <q-card>
              <q-card-section class="text-center">
                <div class="text-h3 q-mb-md">404</div>
                <div class="text-h5 q-mb-lg">Không tìm thấy trang</div>
                <q-btn color="primary" label="Quay về trang chủ" to="/" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorNotFound",
};
</script>

<style lang="scss">
.error-not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .container {
    max-width: 720px;
  }
}
</style>
