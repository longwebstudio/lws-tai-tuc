<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-md-6 col-lg-3"
        v-for="thongKe in thongKeTongQuan"
        :key="thongKe.tieuDe"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ thongKe.tieuDe }}</div>
            <div class="text-h4 text-weight-bold q-mt-sm">
              {{ thongKe.giaTri }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Biểu đồ tỷ lệ tái tục</div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <div id="chart-container" style="height: 300px"></div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Thông báo</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-list bordered separator>
              <q-item
                v-for="thongBao in danhSachThongBao"
                :key="thongBao.id"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon :name="thongBao.icon" color="primary" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ thongBao.noiDung }}</q-item-label>
                  <q-item-label caption>{{ thongBao.thoiGian }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ApexCharts from "apexcharts";

export default {
  name: "IndexPage", // Thêm name cho component
  setup() {
    const store = useStore();

    const thongKeTongQuan = computed(() => [
      {
        tieuDe: "Tổng số khách hàng",
        giaTri: store.getters["khachHang/tongSoKhachHang"],
      },
      {
        tieuDe: "Tổng số hợp đồng",
        giaTri: store.getters["hopDong/tongSoHopDong"],
      },
      {
        tieuDe: "Hợp đồng sắp hết hạn",
        giaTri: store.getters["hopDong/danhSachHopDongSapHetHan"].length,
      },
      {
        tieuDe: "Tỷ lệ tái tục",
        giaTri: store.getters["taiTuc/tyLeTaiTuc"] + "%",
      },
    ]);

    const danhSachThongBao = ref([
      // Dữ liệu mẫu cho thông báo, bạn cần lấy dữ liệu thật từ backend hoặc một nguồn khác
      {
        id: 1,
        icon: "info",
        noiDung: "Hợp đồng của khách hàng A sắp hết hạn.",
        thoiGian: "12/09/2023",
      },
      {
        id: 2,
        icon: "warning",
        noiDung: "Có 3 khách hàng mới cần được liên hệ.",
        thoiGian: "10/09/2023",
      },
      // ...
    ]);

    onMounted(async () => {
      // Gọi các action để lấy dữ liệu từ store khi component được tạo

      // Vẽ biểu đồ sau khi đã có dữ liệu
      veBieuDoTyLeTaiTuc();
    });

    const veBieuDoTyLeTaiTuc = () => {
      const chartOptions = {
        // ... (cấu hình biểu đồ ApexCharts)
        series: [store.getters["taiTuc/tyLeTaiTuc"]],
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["Tỷ lệ tái tục"],
      };

      const chart = new ApexCharts(
        document.querySelector("#chart-container"),
        chartOptions
      );
      chart.render();
    };

    return {
      thongKeTongQuan,
      danhSachThongBao,
      veBieuDoTyLeTaiTuc,
    };
  },
};
</script>
