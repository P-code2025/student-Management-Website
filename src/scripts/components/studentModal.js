import { renderStudents } from './studentTable.js';
import { getStudents, setStudents } from '../utils/helpers.js';

const studentModal = document.getElementById('studentModal');
const closeButton = studentModal.querySelector('.closeButton');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const studentIdInput = document.getElementById('studentId');
const studentCodeInput = document.getElementById('studentCode');
const fullNameInput = document.getElementById('fullName');
const genderInput = document.getElementById('gender');
const roleInput = document.getElementById('role');
const avatarUrlInput = document.getElementById('avatarUrl');

export const openModal = (type, student = null) => {
    if (type === 'add') {
        modalTitle.textContent = 'Thêm sinh viên mới';
        studentForm.reset(); 
        studentIdInput.value = '';
    } else if (type === 'edit' && student) {
        modalTitle.textContent = 'Sửa thông tin sinh viên';
        studentIdInput.value = student.id;
        studentCodeInput.value = student.studentCode;
        fullNameInput.value = student.fullName;
        genderInput.value = student.gender;
        roleInput.value = student.role;
        avatarUrlInput.value = student.avatar;
    }
    studentModal.style.display = 'flex'; 
};

const closeModal = () => {
    studentModal.style.display = 'none';
};

const handleFormSubmit = (event) => {
    event.preventDefault(); 

    let students = getStudents(); 

    const id = studentIdInput.value;
    const studentCode = studentCodeInput.value;
    const fullName = fullNameInput.value;
    const gender = genderInput.value;
    const role = roleInput.value;
   
    const avatar = avatarUrlInput.value.startsWith('public/images/')
        ? `../../${avatarUrlInput.value}` 
        : (avatarUrlInput.value || '../../public/images/default-avatar.jpg'); 

    if (id) {
        
        students = students.map(student =>
            student.id === parseInt(id)
                ? { ...student, studentCode, fullName, gender, role, avatar }
                : student
        );
    } else {
        
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        const newStudent = { id: newId, studentCode, fullName, gender, role, avatar };
        students.push(newStudent);
    }

    setStudents(students);
    renderStudents();
    closeModal(); 
};

export const initializeStudentModal = () => {
    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === studentModal) {
            closeModal();
        }
    });

    studentForm.addEventListener('submit', handleFormSubmit);
};