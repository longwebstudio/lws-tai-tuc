// src/store/baohiem/state.js

export default function () {
  return {
    danhSachBaoHiem: [], // Mảng chứa danh sách các bảo hiểm
    baoHiemDangChon: null, // Đối tượng bảo hiểm đang được chọn (để chỉnh sửa hoặc xem chi tiết)
    isLoading: false, // Trạng thái loading khi tải dữ liệu hoặc thực hiện các hành động khác
    error: null, // Lưu trữ thông báo lỗi nếu có
  };
}
