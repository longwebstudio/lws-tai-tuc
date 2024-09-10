<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Danh sách Bảo hiểm Xe máy</div>

    <q-list bordered separator>
      <q-item v-for="baoHiem in danhSachBaoHiemSapXep" :key="baoHiem.id">
        <q-item-section>
          <q-item-label>
            <div class="text-weight-bold">{{ baoHiem.bienSoXe }}</div>
            <div class="text-caption text-grey">
              {{ baoHiem.hangBaoHiem }} - {{ baoHiem.loaiBaoHiem }}
            </div>
            <div class="text-caption text-grey">
              Từ {{ baoHiem.ngayBatDau }} đến {{ baoHiem.ngayKetThuc }}
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="q-gutter-sm">
            <q-btn
              icon="edit"
              color="primary"
              size="sm"
              round
              dense
              @click="moDialogChinhSua(baoHiem)"
            />
            <q-btn
              icon="delete"
              color="negative"
              size="sm"
              round
              dense
              @click="hienThiXacNhanXoa(baoHiem.id)"
            />
          </div>
        </q-item-section>
      </q-item>

      <q-item v-if="!danhSachBaoHiemSapXep.length">
        <q-item-section>
          <q-item-label class="text-center text-grey">
            Không có bảo hiểm nào.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="moDialogThemMoi" />
    </q-page-sticky>

    <q-dialog v-model="hienThiDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{
              cheDoDialog === "them"
                ? "Thêm Bảo hiểm Mới"
                : "Chỉnh sửa Bảo hiểm"
            }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="submitForm" ref="form">
            <q-input
              v-model="baoHiemDangXuLy.bienSoXe"
              label="Biển số xe"
              outlined
              :rules="[(val) => !!val || 'Vui lòng nhập biển số xe']"
            />

            <q-input
              v-model="baoHiemDangXuLy.hangBaoHiem"
              label="Hãng bảo hiểm"
              outlined
              :rules="[(val) => !!val || 'Vui lòng nhập hãng bảo hiểm']"
            />

            <q-select
              v-model="baoHiemDangXuLy.loaiBaoHiem"
              label="Loại bảo hiểm"
              :options="loaiBaoHiemOptions"
              outlined
              :rules="[(val) => !!val || 'Vui lòng chọn loại bảo hiểm']"
            />

            <q-input
              v-model="baoHiemDangXuLy.ngayBatDau"
              label="Ngày bắt đầu"
              outlined
              type="date"
              :rules="[(val) => !!val || 'Vui lòng chọn ngày bắt đầu']"
            />

            <q-input
              v-model="baoHiemDangXuLy.ngayKetThuc"
              label="Ngày kết thúc"
              outlined
              type="date"
              :rules="[
                (val) => !!val || 'Vui lòng chọn ngày kết thúc',
                (val) =>
                  new Date(val) > new Date(baoHiemDangXuLy.ngayBatDau) ||
                  'Ngày kết thúc phải sau ngày bắt đầu',
              ]"
            />

            <q-input
              v-model.number="baoHiemDangXuLy.soTienBaoHiem"
              label="Số tiền bảo hiểm"
              outlined
              type="number"
              :rules="[
                (val) => !!val || 'Vui lòng nhập số tiền bảo hiểm',
                (val) => val > 0 || 'Số tiền bảo hiểm phải lớn hơn 0',
              ]"
            />

            <div class="text-right q-mt-md">
              <q-btn
                :label="cheDoDialog === 'them' ? 'Thêm' : 'Lưu'"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Hủy"
                color="grey"
                flat
                class="q-ml-sm"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      baoHiemXoaId: null,
      hienThiDialog: false,
      cheDoDialog: null, // 'them' hoặc 'chinh-sua'
      baoHiemDangXuLy: {},
      loaiBaoHiemOptions: [
        "TNDS bắt buộc",
        "Bảo hiểm thân vỏ",
        // ... thêm các loại bảo hiểm khác nếu cần
      ],
    };
  },

  computed: {
    ...mapState("baohiem", ["isLoading"]),
    ...mapGetters("baohiem", ["danhSachBaoHiemSapXep"]),
  },

  methods: {
    ...mapActions("baohiem", [
      "layDanhSachBaoHiem",
      "xoaBaoHiem",
      "themBaoHiem",
      "capNhatBaoHiem",
    ]),

    moDialogThemMoi() {
      this.cheDoDialog = "them";
      this.baoHiemDangXuLy = {}; // Reset form
      this.hienThiDialog = true;
    },

    moDialogChinhSua(baoHiem) {
      this.cheDoDialog = "chinh-sua";
      this.baoHiemDangXuLy = {
        ...baoHiem,
        ngayBatDau: baoHiem.ngayBatDau.slice(0, 10),
        ngayKetThuc: baoHiem.ngayKetThuc.slice(0, 10),
      };
      this.hienThiDialog = true;
    },

    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          if (this.cheDoDialog === "them") {
            this.themBaoHiem(this.baoHiemDangXuLy);
          } else {
            this.capNhatBaoHiem(this.baoHiemDangXuLy);
          }
          this.hienThiDialog = false;
        }
      });
    },

    hienThiXacNhanXoa(id) {
      this.$q
        .dialog({
          title: "Xác nhận xóa",
          message: "Bạn có chắc chắn muốn xóa bảo hiểm này?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.xoaBaoHiem(id);
        });
    },
  },
  mounted() {
    this.layDanhSachBaoHiem();
  },
};
</script>
