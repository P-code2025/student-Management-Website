import { getStudents, setStudents } from '../utils/helpers.js';
import { openModal } from './studentModal.js';
import { showGenericModal } from './genericModal.js'; // IMPORT THE NEW MODAL

// Phiên bản này không cần import modal tùy chỉnh

export const renderStudents = (searchTerm = '') => {
    const studentTableBody = document.getElementById('studentTableBody');
    const totalStudentsCount = document.getElementById('totalStudentsCount');
    if (!studentTableBody || !totalStudentsCount) {
        console.error("Student table elements not found in the DOM!");
        return;
    }
    let students = getStudents();
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (lowerCaseSearchTerm) {
        students = students.filter(student =>
            student.studentCode.toLowerCase().includes(lowerCaseSearchTerm) ||
            student.fullName.toLowerCase().includes(lowerCaseSearchTerm)
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
                <td><img src="${student.avatar}" alt="Avatar" class="studentAvatarTable"></td>
                <td>${student.studentCode}</td>
                <td>${student.fullName}</td>
                <td>${student.gender}</td>
                <td>${student.role}</td>
                <td class="actionButtons">
                    <button class="editButton" data-id="${student.id}">Sửa</button>
                    <button class="deleteButton" data-id="${student.id}">Xóa</button>
                </td>
            `;
        });
    }
    totalStudentsCount.textContent = students.length;
};

// MODIFIED: This function now uses the generic modal
const handleDeleteStudent = (id) => {
    const studentToDelete = getStudents().find(s => s.id === id);
    if (!studentToDelete) return;

    showGenericModal({
        title: 'Xác nhận xóa',
        bodyHtml: `<p>Bạn có chắc chắn muốn xóa sinh viên <strong>${studentToDelete.fullName}</strong> không? Hành động này không thể hoàn tác.</p>`,
        confirmText: 'Xóa',
        cancelText: 'Hủy',
        onConfirm: () => {
            let students = getStudents();
            students = students.filter(student => student.id !== id);
            setStudents(students);
            const searchInput = document.getElementById('searchInput');
            renderStudents(searchInput ? searchInput.value : '');
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
    studentTableBody.addEventListener('click', (event) => {
        const target = event.target;
        const studentId = parseInt(target.dataset.id, 10);
        if (target.classList.contains('editButton')) {
            const students = getStudents();
            const studentToEdit = students.find(student => student.id === studentId);
            if (studentToEdit) {
                openModal('edit', studentToEdit);
            }
        } else if (target.classList.contains('deleteButton')) {
            handleDeleteStudent(studentId);
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