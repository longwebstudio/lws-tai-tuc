// src/store/baohiem/actions.js

import { api } from "src/boot/axios";

export default {
  // Lấy danh sách bảo hiểm từ API
  layDanhSachBaoHiem({ commit }) {
    console.log("sdkfjkdsjkfj lấy");
    commit("SET_IS_LOADING", true); // Bắt đầu loading

    api
      .get("/api/bao-hiem-xe")
      .then((response) => {
        commit("SET_DANH_SACH_BAO_HIEM", response.data);
        commit("SET_ERROR", null); // Xóa thông báo lỗi nếu có
      })
      .catch((error) => {
        commit("SET_ERROR", error.message);
      })
      .finally(() => {
        commit("SET_IS_LOADING", false); // Kết thúc loading
      });
  },

  // Thêm bảo hiểm mới
  themBaoHiem({ commit }, baoHiemMoi) {
    api
      .post("/api/bao-hiem-xe", baoHiemMoi)
      .then((response) => {
        commit("ADD_BAO_HIEM", response.data);
        // Có thể thêm xử lý điều hướng hoặc thông báo thành công ở đây
      })
      .catch((error) => {
        commit("SET_ERROR", error.message);
      });
  },

  // Cập nhật thông tin bảo hiểm
  capNhatBaoHiem({ commit }, baoHiem) {
    api
      .put(`/api/bao-hiem-xe/${baoHiem.id}`, baoHiem)
      .then(() => {
        commit("UPDATE_BAO_HIEM", baoHiem);
        // Có thể thêm xử lý điều hướng hoặc thông báo thành công ở đây
      })
      .catch((error) => {
        commit("SET_ERROR", error.message);
      });
  },

  // Xóa bảo hiểm
  xoaBaoHiem({ commit }, id) {
    api
      .delete(`/api/bao-hiem-xe/${id}`)
      .then(() => {
        commit("DELETE_BAO_HIEM", id);
        // Có thể thêm xử lý điều hướng hoặc thông báo thành công ở đây
      })
      .catch((error) => {
        commit("SET_ERROR", error.message);
      });
  },

  // Chọn bảo hiểm để xem chi tiết hoặc chỉnh sửa
  chonBaoHiem({ commit }, baoHiem) {
    commit("SET_BAO_HIEM_DANG_CHON", baoHiem);
  },
};
