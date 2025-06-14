import { getStudents, setStudents } from '../utils/helpers.js';
import { openModal } from './studentModal.js';

// MOVED: We will no longer get elements here. We will get them inside the functions.

export const renderStudents = (searchTerm = '') => {
    // MOVED: Get elements at the time the function is called, ensuring they exist.
    const studentTableBody = document.getElementById('studentTableBody');
    const totalStudentsCount = document.getElementById('totalStudentsCount');
    const searchInput = document.getElementById('searchInput');

    // If any of these elements don't exist, stop the function to prevent errors.
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

const handleDeleteStudent = (id) => {
    // MOVED: Get searchInput here as well to get its current value.
    const searchInput = document.getElementById('searchInput');
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
        let students = getStudents();
        students = students.filter(student => student.id !== id);
        setStudents(students);
        renderStudents(searchInput ? searchInput.value : '');
    }
};

export const initializeStudentTableEvents = () => {
    // MOVED: Get all elements here right before adding event listeners.
    const addNewStudentButton = document.getElementById('addNewStudentButton');
    const studentTableBody = document.getElementById('studentTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // If any of these elements don't exist, stop the function.
    if (!addNewStudentButton || !studentTableBody || !searchInput || !searchButton) {
        return;
    }

    addNewStudentButton.addEventListener('click', () => {
        openModal('add');
    });

    studentTableBody.addEventListener('click', (event) => {
        const target = event.target;
        // The dataset.id will be a string, so we parse it to an integer for strict comparison.
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