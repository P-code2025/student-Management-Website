import { getStudents, deleteStudent } from '../utils/helpers.js';
import { openModal } from './studentModal.js';
import { showGenericModal } from './genericModal.js';

export const renderStudents = async (searchTerm = '') => {
    const studentTableBody = document.getElementById('studentTableBody');
    const totalStudentsCount = document.getElementById('totalStudentsCount');
    if (!studentTableBody || !totalStudentsCount) {
        console.error("Student table elements not found in the DOM!");
        return;
    }

    let students = await getStudents(); // Lấy tất cả sinh viên từ API

    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (lowerCaseSearchTerm) {
        students = students.filter(student =>
            student.MaSinhVien.toLowerCase().includes(lowerCaseSearchTerm) ||
            student.HoTen.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }
    studentTableBody.innerHTML = '';
    if (students.length === 0) {
        const noDataRow = studentTableBody.insertRow();
        noDataRow.innerHTML = `<td colspan="7" style="text-align: center; padding: 20px;">Không có dữ liệu sinh viên nào phù hợp.</td>`;
    } else {
        students.forEach((student, index) => {
            const row = studentTableBody.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${student.AnhDaiDien || '../../public/images/default-avatar.jpg'}" alt="Avatar" class="studentAvatarTable"></td>
                <td>${student.MaSinhVien}</td>
                <td>${student.HoTen}</td>
                <td>${student.GioiTinh}</td>
                <td>${student.ChucVu}</td>
                <td class="actionButtons">
                    <button class="editButton" data-id="${student.MaSinhVien}">Sửa</button>
                    <button class="deleteButton" data-id="${student.MaSinhVien}">Xóa</button>
                </td>
            `;
        });
    }
    totalStudentsCount.textContent = students.length;
};

const handleDeleteStudent = (maSinhVien) => {
    showGenericModal({
        title: 'Xác nhận xóa',
        bodyHtml: `<p>Bạn có chắc chắn muốn xóa sinh viên có mã <strong>${maSinhVien}</strong> không? Hành động này không thể hoàn tác.</p>`,
        confirmText: 'Xóa',
        cancelText: 'Hủy',
        onConfirm: async () => {
            const success = await deleteStudent(maSinhVien);
            if (success) {
                alert('Xóa sinh viên thành công!');
                const searchInput = document.getElementById('searchInput');
                renderStudents(searchInput ? searchInput.value : '');
            } else {
                alert('Có lỗi xảy ra khi xóa sinh viên.');
            }
            return success;
        }
    });
};

export const initializeStudentTableEvents = () => {
    const addNewStudentButton = document.getElementById('addNewStudentButton');
    const studentTableBody = document.getElementById('studentTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    if (!addNewStudentButton || !studentTableBody || !searchInput || !searchButton) {
        return;
    }
    addNewStudentButton.addEventListener('click', () => {
        openModal('add');
    });
    studentTableBody.addEventListener('click', async (event) => { // Thêm async
        const target = event.target;
        const maSinhVien = target.dataset.id; // Lấy mã sinh viên
        if (target.classList.contains('editButton')) {
            const students = await getStudents(); // Lấy lại danh sách để tìm đối tượng
            const studentToEdit = students.find(student => student.MaSinhVien === maSinhVien);
            if (studentToEdit) {
                openModal('edit', studentToEdit);
            }
        } else if (target.classList.contains('deleteButton')) {
            handleDeleteStudent(maSinhVien);
        }
    });
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        renderStudents(searchTerm);
    });
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        renderStudents(searchTerm);
    });
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value;
            renderStudents(searchTerm);
            event.preventDefault();
        }
    });
};