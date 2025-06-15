import { getCourses, setCourses } from '../utils/helpers.js';

/**
 * Render danh sách các lớp tín chỉ vào bảng.
 */
export const renderCourses = () => {
    // Lấy các element mới từ HTML
    const courseTableBody = document.getElementById('courseTableBody');
    const totalCoursesCount = document.getElementById('totalCoursesCount');

    // Dừng lại nếu không tìm thấy element cần thiết
    if (!courseTableBody || !totalCoursesCount) return;

    const courses = getCourses();
    
    // Giả sử ta đang lọc theo học kỳ 2 để giống ảnh mẫu
    const semesterFilter = document.getElementById('semesterFilter');
    const selectedSemester = semesterFilter ? parseInt(semesterFilter.value, 10) : 2;
    
    const filteredCourses = courses.filter(course => course.semester === selectedSemester);

    // Xóa nội dung cũ trong bảng
    courseTableBody.innerHTML = ''; 

    // Kiểm tra nếu không có dữ liệu
    if (filteredCourses.length === 0) {
        const row = courseTableBody.insertRow();
        row.innerHTML = `<td colspan="7" class="no-data-cell">Không có dữ liệu cho học kỳ này</td>`;
    } else {
        // Lặp qua danh sách môn học đã lọc và tạo từng dòng cho bảng
        filteredCourses.forEach((course, index) => {
            const row = courseTableBody.insertRow();
            
            // Dữ liệu giả định cho các cột còn thiếu để giao diện đầy đủ
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

    // Cập nhật tổng số môn học
    totalCoursesCount.textContent = filteredCourses.length;
};

/**
 * Khởi tạo các sự kiện cho trang Lớp tín chỉ.
 */
export const initializeCreditClassesPage = () => {
    // Render bảng ngay khi tải trang
    renderCourses();

    // Gán sự kiện cho bộ lọc học kỳ
    const semesterFilter = document.getElementById('semesterFilter');
    if (semesterFilter) {
        semesterFilter.addEventListener('change', renderCourses); // Gọi lại hàm render khi thay đổi
    }

    // Gán sự kiện cho nút tải lại
    const reloadButton = document.getElementById('reloadButton');
    if (reloadButton) {
        reloadButton.addEventListener('click', renderCourses);
    }
};
