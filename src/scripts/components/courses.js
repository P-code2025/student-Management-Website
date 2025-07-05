import { getCourses, setCourses } from '../utils/helpers.js';


export const renderCourses = () => {
    
    const courseTableBody = document.getElementById('courseTableBody');
    const totalCoursesCount = document.getElementById('totalCoursesCount');

    
    if (!courseTableBody || !totalCoursesCount) return;

    const courses = getCourses();
    
    
    const semesterFilter = document.getElementById('semesterFilter');
    const selectedSemester = semesterFilter ? parseInt(semesterFilter.value, 10) : 2;
    
    const filteredCourses = courses.filter(course => course.semester === selectedSemester);

    
    courseTableBody.innerHTML = ''; 

    
    if (filteredCourses.length === 0) {
        const row = courseTableBody.insertRow();
        row.innerHTML = `<td colspan="7" class="no-data-cell">Không có dữ liệu cho học kỳ này</td>`;
    } else {
        
        filteredCourses.forEach((course, index) => {
            const row = courseTableBody.insertRow();
            const classCode = `RIPT${1300 + course.id}-20242-0${index + 1}`;
            const courseCode = `BAS${1200 + course.id}`;
            const lecturer = 'Trần Minh Hiếu';
            const schedule = `- Thứ 6, tiết 1-2, 15 tuần, phòng HT2-HQV\n- Thứ 6, tiết 3-3, 6 tuần, phòng HT2-HQV`;

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${classCode}</td>
                <td>${courseCode}</td>
                <td>${course.name}</td>
                <td>${course.credits}</td>
                <td>${lecturer}</td>
                <td class="schedule-cell">${schedule}</td>
            `;
        });
    }

    
    totalCoursesCount.textContent = filteredCourses.length;
};


export const initializeCreditClassesPage = () => {
    renderCourses();
    
    const semesterFilter = document.getElementById('semesterFilter');
    if (semesterFilter) {
        semesterFilter.addEventListener('change', renderCourses);
    }
};
