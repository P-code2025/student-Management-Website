import { renderStudents, initializeStudentTableEvents } from './components/studentTable.js';
import { initializeStudentModal } from './components/studentModal.js';

// 1. Trang chủ: Hiển thị ảnh trường
export const renderHomePage = () => {
    return `
        <h1 class="pageTitle">Trang Chủ</h1>
        <div style="text-align: center; padding: 20px;">
            <img src="../../public/images/school.png" alt="Ảnh trường học" style="max-width: 100%; height: auto; border-radius: 8px;">
        </div>
    `;
    // Lưu ý: Bạn cần có ảnh school.jpg trong thư mục public/images
};

// 2. Trang Tin tức: Bảng tin tức (sẽ cần thêm logic add/delete sau)
export const renderNewsPage = () => {
    return `
        <h1 class="pageTitle">Tin Tức</h1>
        <section class="studentListSection">
            <h2 class="sectionTitle">Bảng tin</h2>
            <div class="studentListHeader">
                <button class="addNewStudentButton">Thêm tin mới</button>
            </div>
            <table class="studentTable">
                <thead>
                    <tr>
                        <th>TT</th>
                        <th>Tiêu đề</th>
                        <th>Ngày đăng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Thông báo nghỉ lễ 30/4 - 1/5</td>
                        <td>25/04/2025</td>
                        <td class="actionButtons"><button class="deleteButton">Xóa</button></td>
                    </tr>
                    </tbody>
            </table>
        </section>
    `;
};

// 3. Trang thông tin cá nhân
export const renderProfilePage = () => {
    return `
        <h1 class="pageTitle">Thông Tin Cá Nhân</h1>
        <section class="classInfoSection">
            <h2 class="sectionTitle">Thông tin giảng viên</h2>
            <div class="infoRow">
                <span class="infoLabel">Họ và tên:</span>
                <span class="infoValue">Trần Minh Hiếu</span>
            </div>
            <div class="infoRow">
                <span class="infoLabel">Mã giảng viên:</span>
                <span class="infoValue">GV001</span>
            </div>
            <div class="infoRow">
                <span class="infoLabel">Email:</span>
                <span class="infoValue">hieutm@ptit.edu.vn</span>
            </div>
            <div class="infoRow">
                <span class="infoLabel">Khoa:</span>
                <span class="infoValue">Công nghệ thông tin</span>
            </div>
        </section>
    `;
};

// 4. Trang Lịch
export const renderCalendarPage = () => {
    return `
        <h1 class="pageTitle">Lịch</h1>
        <p style="text-align:center;">Tính năng lịch đang được phát triển. Bạn có thể thêm sự kiện vào danh sách dưới đây.</p>
        `;
};

// 5. Trang Lớp tín chỉ
export const renderCreditClassPage = () => {
    return `
        <h1 class="pageTitle">Lớp Tín Chỉ - Năm 1</h1>
        <section class="classInfoSection">
            <h2 class="sectionTitle">Học Kỳ 1</h2>
            <ul>
                <li>Giải tích 1</li>
                <li>Lập trình C++</li>
                <li>Tiếng Anh A1</li>
                <li>Giáo dục thể chất</li>
            </ul>
        </section>
        <section class="classInfoSection">
            <h2 class="sectionTitle">Học Kỳ 2</h2>
            <ul>
                <li>Giải tích 2</li>
                <li>Cấu trúc dữ liệu và giải thuật</li>
                <li>Tiếng Anh A2</li>
                <li>Tư tưởng Hồ Chí Minh</li>
            </ul>
        </section>
    `;
};

// 6. Trang Lớp hành chính (Code gốc của bạn)
export const renderAdminClassPage = () => {
    const adminClassHTML = `
        <h1 class="pageTitle">Lớp hành chính</h1>
        <section class="classInfoSection">
            <h2 class="sectionTitle">Thông tin lớp</h2>
            <div class="infoRow infoColums"><span class="infoLabel">Học kỳ 1 năm 2024-2025</span><span class="infoValue infoColoum">D24CQCC03-B</span></div>
            <div class="infoRow"><span class="infoLabel">Tên lớp:</span><span class="infoValue">D24CQCC03-B</span></div>
            <div class="infoRow"><span class="infoLabel">Khoá sinh viên:</span><span class="infoValue">D24CQ</span></div>
            <div class="infoRow"><span class="infoLabel">Ngành đào tạo:</span><span class="infoValue">Công nghệ thông tin định hướng ứng dụng</span></div>
            <div class="infoRow"><span class="infoLabel">Vai trò trong lớp:</span><span class="infoValue">Giáo viên</span></div>
        </section>
        <section class="academicAdvisorSection">
            <h2 class="sectionTitle">Cố vấn học tập</h2>
            <div class="advisorCard"><img src="../../public/images/advisor1.jpg" alt="Advisor Avatar" class="advisorAvatar"><span class="advisorName">Nguyễn Thị Thảo Linh</span></div>
            <div class="advisorCard"><img src="../../public/images/advisor2.jpg" alt="Advisor Avatar" class="advisorAvatar"><span class="advisorName">Vũ Thị Hoà</span></div>
        </section>
        <section class="studentListSection">
            <h2 class="sectionTitle">Danh sách sinh viên</h2>
            <div class="studentListHeader">
                <div><span class="totalStudents">Tổng số: <span id="totalStudentsCount">0</span></span><button class="addNewStudentButton" id="addNewStudentButton">Thêm sinh viên</button></div>
                <div class="searchFilterContainer"><input type="text" id="searchInput" placeholder="Tìm kiếm theo mã sinh viên..."><button id="searchButton" class="searchButton"><i class="fas fa-search"></i> Tìm kiếm</button></div>
            </div>
            <table class="studentTable">
                <thead>
                    <tr><th>TT</th><th>Ảnh đại diện</th><th>Mã sinh viên</th><th>Họ tên</th><th>Giới tính</th><th>Vai trò</th><th>Thao tác</th></tr>
                </thead>
                <tbody id="studentTableBody"></tbody>
            </table>
        </section>
    `;
    // Gắn HTML vào main content
    document.querySelector('.mainContent').innerHTML = adminClassHTML;
    
    // Sau khi gắn HTML, cần chạy lại các hàm khởi tạo
    renderStudents();
    initializeStudentTableEvents();
    initializeStudentModal();
};