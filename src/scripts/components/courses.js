import { getCourses, setCourses } from '../utils/helpers.js';
import { showGenericModal } from './genericModal.js'; // THÊM DÒNG NÀY

let courseModal, closeModalButton, courseForm, courseModalTitle, courseIdInput, courseNameInput, courseCreditsInput, courseSemesterInput;

const openModal = (mode, course = null) => {
    courseModalTitle.textContent = mode === 'add' ? 'Thêm môn học mới' : 'Sửa thông tin môn học';
    courseForm.reset();
    
    if (mode === 'edit' && course) {
        courseIdInput.value = course.id;
        courseNameInput.value = course.name;
        courseCreditsInput.value = course.credits;
        courseSemesterInput.value = course.semester;
    } else {
        courseIdInput.value = '';
    }
    courseModal.style.display = 'flex';
};

const closeModal = () => {
    courseModal.style.display = 'none';
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    const courses = getCourses();
    const course = {
        id: courseIdInput.value ? parseInt(courseIdInput.value) : Date.now(),
        name: courseNameInput.value,
        credits: parseInt(courseCreditsInput.value),
        semester: parseInt(courseSemesterInput.value)
    };

    if (courseIdInput.value) { // Editing
        const index = courses.findIndex(c => c.id === course.id);
        courses[index] = course;
    } else { // Adding
        courses.push(course);
    }

    setCourses(courses);
    renderCourses();
    closeModal();
};

// THAY THẾ HÀM NÀY
const handleDeleteCourse = (id) => {
    const courseToDelete = getCourses().find(c => c.id === id);
    if (!courseToDelete) return;

    showGenericModal({
        title: 'Xác nhận xóa',
        bodyHtml: `<p>Bạn có chắc chắn muốn xóa môn học <strong>${courseToDelete.name}</strong> không?</p>`,
        confirmText: 'Xóa',
        cancelText: 'Hủy',
        onConfirm: () => {
            let courses = getCourses();
            courses = courses.filter(c => c.id !== id);
            setCourses(courses);
            renderCourses();
        }
    });
};

export const renderCourses = () => {
    const coursesContainer = document.getElementById('coursesContainer');
    if (!coursesContainer) return;

    const courses = getCourses();
    const semester1Courses = courses.filter(c => c.semester === 1);
    const semester2Courses = courses.filter(c => c.semester === 2);

    const renderSemester = (semesterCourses, title) => `
        <div class="semesterSection">
            <h2 class="semesterTitle">${title}</h2>
            <ul class="courseList">
                ${semesterCourses.map(course => `
                    <li class="courseItem">
                        <span class="courseName">${course.name}</span>
                        <div>
                            <span class="courseCredits">${course.credits} TC</span>
                            <button class="editButton" data-id="${course.id}">Sửa</button>
                            <button class="deleteButton" data-id="${course.id}">Xóa</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    coursesContainer.innerHTML = `
        ${renderSemester(semester1Courses, 'Học kỳ 1')}
        ${renderSemester(semester2Courses, 'Học kỳ 2')}
    `;
};

export const initializeCreditClassesPage = () => {
    // Initialize DOM elements
    courseModal = document.getElementById('courseModal');
    closeModalButton = courseModal.querySelector('.closeButton');
    courseForm = document.getElementById('courseForm');
    courseModalTitle = document.getElementById('courseModalTitle');
    courseIdInput = document.getElementById('courseId');
    courseNameInput = document.getElementById('courseName');
    courseCreditsInput = document.getElementById('courseCredits');
    courseSemesterInput = document.getElementById('courseSemester');

    renderCourses();

    document.getElementById('addCourseButton').addEventListener('click', () => openModal('add'));
    closeModalButton.addEventListener('click', closeModal);
    courseForm.addEventListener('submit', handleFormSubmit);

    document.getElementById('coursesContainer').addEventListener('click', (event) => {
        const target = event.target;
        const id = parseInt(target.dataset.id);
        if (target.classList.contains('editButton')) {
            const course = getCourses().find(c => c.id === id);
            openModal('edit', course);
        } else if (target.classList.contains('deleteButton')) {
            handleDeleteCourse(id);
        }
    });
};