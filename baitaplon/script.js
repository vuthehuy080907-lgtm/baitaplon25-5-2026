// Mảng danh sách quản lý dữ liệu kỹ năng ban đầu (Mock Data)
let skillsData = [
  {
    mssv: "254D4800287",
    techName: "Java Core",
    year: "2020",
    level: "8",
    credits: 4,
    note: "Sinh viên khóa trước",
  },
  {
    mssv: "254D4800272",
    techName: "Python",
    year: "2021",
    level: "5",
    credits: 3,
    note: "Phục vụ AI sơ cấp",
  },
];

// 1. Hàm hiển thị dữ liệu lên bảng (renderTable)
function renderTable(list) {
  const tableBody = document.getElementById("skillTableBody");
  tableBody.innerHTML = ""; // Reset rỗng bảng trước khi nạp dữ liệu mới nhằm tối ưu bộ nhớ

  list.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td><span class="fw-bold">${item.mssv}</span></td>
            <td><span class="badge bg-info text-dark">${item.techName}</span></td>
            <td>${item.year}</td>
            <td><strong class="text-primary">${item.level}/10</strong></td>
            <td>${item.credits}</td>
            <td class="text-muted text-truncate" style="max-width: 150px;">${item.note || "-"}</td>
        `;
    tableBody.appendChild(tr);
  });
}

// 2. Hàm addCourse sửa đổi và tối ưu chuẩn theo Trang Debug của đề bài
function addCourse(newCourse, list) {
  const mssvInt = parseInt(newCourse.mssv);

  if (isNaN(mssvInt)) {
    alert("MSSV không hợp lệ!");
    return;
  }

  // Thực hiện đúng Ràng buộc định danh:
  // Số lẻ (% 2 !== 0) -> chèn vào ĐẦU bảng (unshift)
  // Số chẵn (% 2 === 0) -> chèn vào CUỐI bảng (push)
  if (mssvInt % 2 !== 0) {
    list.unshift(newCourse);
  } else {
    list.push(newCourse);
  }

  // Cập nhật lại giao diện bảng hiển thị
  renderTable(list);

  // Kiểm tra các Tính năng bổ sung sau khi chèn thành công
  checkAdditionalFeatures(list);
}

// 3. Hàm kiểm tra điều kiện để kích hoạt thông báo Toast (Tính năng bổ sung)
function checkAdditionalFeatures(list) {
  // Tính năng bổ sung 1: Tổng tín chỉ > 15 -> hiển thị Toast "Đủ tài học tập"
  let totalCredits = list.reduce(
    (sum, item) => sum + parseInt(item.credits || 0),
    0,
  );

  // Tính năng bổ sung 2: Số kỹ năng đạt mức > 7 điểm vượt quá 15
  let highSkillsCount = list.filter((item) => parseInt(item.level) > 7).length;

  if (highSkillsCount > 15) {
    showToast("Hồ sơ năng lực rất ấn tượng", "bg-success");
  } else if (totalCredits > 15) {
    showToast("Đủ tài học tập", "bg-warning text-dark");
  }
}

// 4. Hàm trigger hiển thị Toast Notification Bootstrap
function showToast(message, bgClass) {
  const toastMessage = document.getElementById("toastMessage");
  const toastElement = document.getElementById("appToast");

  // Gán thông điệp và màu sắc động tương ứng
  toastMessage.innerText = message;
  toastElement.className = `toast align-items-center text-white ${bgClass} border-0`;

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

// 5. Lắng nghe sự kiện Submit Form từ người dùng
document.getElementById("skillForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn trình duyệt reload lại trang

  // Thu thập gói đối tượng dữ liệu đầu vào từ Form
  const newCourse = {
    mssv: document.getElementById("mssv").value.trim(),
    techName: document.getElementById("techName").value.trim(),
    year: document.getElementById("year").value,
    level: document.getElementById("level").value,
    credits: document.getElementById("credits").value,
    note: document.getElementById("note").value.trim(),
  };

  // Thực thi hàm logic đầu/cuối mảng
  addCourse(newCourse, skillsData);

  // Reset lại ô nhập liệu cho trống
  this.reset();
});

// Khởi chạy nạp sẵn dữ liệu mẫu lên bảng ngay khi vừa load xong trang web
document.addEventListener("DOMContentLoaded", () => {
  renderTable(skillsData);
});
