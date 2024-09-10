// src/store/baohiem/getters.js

export default {
  // Lấy danh sách bảo hiểm đã sắp xếp theo ngày kết thúc (gần nhất -> xa nhất)
  danhSachBaoHiemSapXep: (state) => {
    return [...state.danhSachBaoHiem].sort((a, b) => {
      const ngayKetThucA = new Date(a.ngayKetThuc);
      const ngayKetThucB = new Date(b.ngayKetThuc);
      return ngayKetThucA - ngayKetThucB;
    });
  },

  // Lọc danh sách bảo hiểm sắp hết hạn (ví dụ: trong vòng 7 ngày tới)
  danhSachBaoHiemSapHetHan: (state) => {
    const ngayHienTai = new Date();
    const motTuanSau = new Date();
    motTuanSau.setDate(ngayHienTai.getDate() + 7);

    return state.danhSachBaoHiem.filter((baoHiem) => {
      const ngayKetThuc = new Date(baoHiem.ngayKetThuc);
      return ngayKetThuc >= ngayHienTai && ngayKetThuc <= motTuanSau;
    });
  },

  // Kiểm tra xem có bảo hiểm nào đang được chọn hay không
  coBaoHiemDangChon: (state) => {
    return state.baoHiemDangChon !== null;
  },

  // Thêm các getters khác nếu cần thiết, ví dụ:
  // - Lọc bảo hiểm theo hãng
  // - Tìm kiếm bảo hiểm theo biển số xe
  // ...
};
