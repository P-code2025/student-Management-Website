import { renderStudents } from './studentTable.js';
import { addStudent, updateStudent } from '../utils/helpers.js';

const studentModal = document.getElementById('studentModal');
const closeButton = studentModal.querySelector('.closeButton');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const studentIdInput = document.getElementById('studentId'); // Đây là input ẩn cho MaSinhVien khi edit
const studentCodeInput = document.getElementById('studentCode'); // MaSinhVien hiển thị
const fullNameInput = document.getElementById('fullName');
const genderInput = document.getElementById('gender');
const roleInput = document.getElementById('role'); // Chức vụ
const avatarUrlInput = document.getElementById('avatarUrl'); // AnhDaiDien
const ngaySinhInput = document.getElementById('ngaySinh'); // Thêm input Ngày sinh
const emailInput = document.getElementById('email'); // Thêm input Email
const soDienThoaiInput = document.getElementById('soDienThoai'); // Thêm input Số điện thoại
const maLopInput = document.getElementById('maLop'); // Thêm input Mã lớp


export const openModal = (type, student = null) => {
    // Đảm bảo có các input cần thiết trong index.html
    // Thêm các trường NgaySinh, Email, SoDienThoai, MaLop vào index.html trong form sinh viên nếu chưa có
    // <div class="formGroup">
    //     <label for="ngaySinh">Ngày sinh:</label>
    //     <input type="date" id="ngaySinh" name="ngaySinh">
    // </div>
    // <div class="formGroup">
    //     <label for="email">Email:</label>
    //     <input type="email" id="email" name="email" required>
    // </div>
    // <div class="formGroup">
    //     <label for="soDienThoai">Số điện thoại:</label>
    //     <input type="tel" id="soDienThoai" name="soDienThoai">
    // </div>
    // <div class="formGroup">
    //     <label for="maLop">Mã lớp:</label>
    //     <input type="text" id="maLop" name="maLop" required>
    // </div>


    if (type === 'add') {
        modalTitle.textContent = 'Thêm sinh viên mới';
        studentForm.reset();
        studentIdInput.value = ''; // ID ẩn
        studentCodeInput.value = ''; // Mã sinh viên
        ngaySinhInput.value = '';
        emailInput.value = '';
        soDienThoaiInput.value = '';
        maLopInput.value = '';
    } else if (type === 'edit' && student) {
        modalTitle.textContent = 'Sửa thông tin sinh viên';
        studentIdInput.value = student.MaSinhVien; // ID ẩn (là MaSinhVien)
        studentCodeInput.value = student.MaSinhVien; // Mã sinh viên hiển thị (không cho sửa ID)
        studentCodeInput.readOnly = true; // Không cho sửa mã sinh viên khi edit

        fullNameInput.value = student.HoTen;
        // Chuyển đổi định dạng ngày nếu cần (YYYY-MM-DD)
        ngaySinhInput.value = student.NgaySinh ? new Date(student.NgaySinh).toISOString().split('T')[0] : '';
        genderInput.value = student.GioiTinh;
        emailInput.value = student.Email;
        soDienThoaiInput.value = student.SoDienThoai;
        maLopInput.value = student.MaLop;
        avatarUrlInput.value = student.AnhDaiDien;
        roleInput.value = student.ChucVu;
    }
    studentModal.style.display = 'flex';
};

const closeModal = () => {
    studentModal.style.display = 'none';
    studentCodeInput.readOnly = false; // Mở lại trường mã sinh viên khi đóng modal
};

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isEditMode = !!studentIdInput.value; // Kiểm tra có phải chế độ sửa không
    const maSinhVien = studentCodeInput.value; // Dùng MaSinhVien từ input hiển thị

    const studentData = {
        MaSinhVien: maSinhVien,
        HoTen: fullNameInput.value,
        NgaySinh: ngaySinhInput.value || null, // Có thể null
        GioiTinh: genderInput.value,
        Email: emailInput.value,
        SoDienThoai: soDienThoaiInput.value || null,
        MaLop: maLopInput.value,
        AnhDaiDien: avatarUrlInput.value || null, // Nếu rỗng thì là null
        ChucVu: roleInput.value
    };

    try {
        let response;
        if (isEditMode) {
            response = await updateStudent(maSinhVien, studentData);
        } else {
            response = await addStudent(studentData);
        }

        if (response) { // Các hàm helpers đã xử lý lỗi và hiển thị alert
            alert(isEditMode ? 'Cập nhật sinh viên thành công!' : 'Thêm sinh viên thành công!');
            studentForm.reset();
            studentIdInput.value = '';
            studentCodeInput.readOnly = false; // Đảm bảo trường mã sinh viên mở lại
            renderStudents();
            closeModal();
        }
    } catch (error) {
        console.error('Lỗi khi submit form sinh viên:', error);
        // Lỗi đã được xử lý bởi helpers.js, không cần alert lại ở đây
    }
};


export const initializeStudentModal = () => {
    // Gán các DOM elements cho các input mới
    Object.assign(window, {
        studentCodeInput: document.getElementById('studentCode'),
        fullNameInput: document.getElementById('fullName'),
        genderInput: document.getElementById('gender'),
        roleInput: document.getElementById('role'),
        avatarUrlInput: document.getElementById('avatarUrl'),
        ngaySinhInput: document.getElementById('ngaySinh'),
        emailInput: document.getElementById('email'),
        soDienThoaiInput: document.getElementById('soDienThoai'),
        maLopInput: document.getElementById('maLop')
    });


    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === studentModal) {
            closeModal();
        }
    });

    studentForm.addEventListener('submit', handleFormSubmit);
};

// Đảm bảo các input mới có ID đúng trong index.html
// Dưới formGroup cho ChucVu, thêm các phần này:
// <div class="formGroup">
//     <label for="ngaySinh">Ngày sinh:</label>
//     <input type="date" id="ngaySinh" name="ngaySinh">
// </div>
// <div class="formGroup">
//     <label for="email">Email:</label>
//     <input type="email" id="email" name="email" required>
// </div>
// <div class="formGroup">
//     <label for="soDienThoai">Số điện thoại:</label>
//     <input type="tel" id="soDienThoai" name="soDienThoai">
// </div>
// <div class="formGroup">
//     <label for="maLop">Mã lớp:</label>
//     <input type="text" id="maLop" name="maLop" required>
// </div>