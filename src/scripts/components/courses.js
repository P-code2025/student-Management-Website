import { getCourses } from '../utils/helpers.js';

/**
 * Render danh sách các lớp tín chỉ vào bảng.
 */
export const renderCourses = async () => { // Thêm async
    const courseTableBody = document.getElementById('courseTableBody');
    const totalCoursesCount = document.getElementById('totalCoursesCount');

    if (!courseTableBody || !totalCoursesCount) return;

    let courses = await getCourses(); // Lấy dữ liệu từ API
    
    const semesterFilter = document.getElementById('semesterFilter');
    // Lọc theo năm học và học kỳ. Giả sử select filter có value là học kỳ (HK1, HK2, Hè)
    const selectedHocKy = semesterFilter ? semesterFilter.value : 'HK2'; 
    const currentNamHoc = '2023-2024'; // Hoặc lấy từ một input/cấu hình khác

    const filteredCourses = courses.filter(course => 
        course.HocKy === selectedHocKy && course.NamHoc === currentNamHoc
    );

    courseTableBody.innerHTML = ''; 

    if (filteredCourses.length === 0) {
        const row = courseTableBody.insertRow();
        row.innerHTML = `<td colspan="7" class="no-data-cell">Không có dữ liệu cho học kỳ này</td>`;
    } else {
        filteredCourses.forEach((course, index) => {
            const row = courseTableBody.insertRow();
            
            // Dữ liệu giả định cho các cột không có trong bảng MON_HOC trực tiếp
            // Bạn cần fetch từ backend hoặc quyết định cách hiển thị
            const classCode = `MH${course.MaMon}-${currentNamHoc}-${selectedHocKy}`; // Có thể lấy từ bảng PHAN_CONG_GIANG_DAY
            const courseCode = course.MaMon; // Mã môn học
            const lecturer = 'Đang cập nhật'; // Có thể lấy từ bảng PHAN_CONG_GIANG_DAY và GIANG_VIEN
            const schedule = 'Chưa có lịch'; // Có thể lấy từ bảng PHAN_CONG_GIANG_DAY

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${classCode}</td>
                <td>${courseCode}</td>
                <td>${course.TenMon}</td>
                <td>${course.SoTinChi}</td>
                <td>${lecturer}</td>
                <td class="schedule-cell">${schedule}</td>
            `;
        });
    }

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
};