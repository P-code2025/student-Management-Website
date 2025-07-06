// File: src/main.js (Phiên bản đã sửa để dùng API)

// Bỏ các import helpers cũ nếu không dùng
// import { getStudents, setStudents, getCourses, setCourses, getLecturerData, setLecturerData } from './scripts/utils/helpers.js';

// Import các hàm API mới từ helpers
import { getStudents, getCourses, getLecturerData, getNews, getEvents } from './scripts/utils/helpers.js';

import { initializeStudentModal } from './scripts/components/studentModal.js';
import { renderStudents, initializeStudentTableEvents } from './scripts/components/studentTable.js';
import { initializeNewsPage } from './scripts/components/news.js';
import { initializeCalendar } from './scripts/components/calendar.js';
import { initializeCreditClassesPage } from './scripts/components/courses.js';
import { initializeProfilePage } from './scripts/components/profile.js';
import { initializeGenericModal } from './scripts/components/genericModal.js';

const mainContent = document.querySelector('.mainContent');

// --- CÁC HÀM TẠO HTML (Giữ nguyên) ---

const getHomePageHTML = () => {
    return `
        <h1 class="pageTitle">Trang chủ</h1>
        <div style="text-align: center;">
            <img src="../../public/images/school.png" alt="Ảnh trường học" style="max-width: 100%; border-radius: 8px;">
        </div>
    `;
};

const getNewsPageHTML = () => {
    return `
        <div class="newsHeader">
            <h1 class="pageTitle">Tin tức</h1>
            <button class="addNewNewsButton" id="addNewNewsButton">Thêm tin mới</button>
        </div>
        <div class="newsListContainer" id="newsListContainer"></div>
    `;
};

const getProfilePageHTML = () => {
    return `
        <h1 class="pageTitle">Thông tin cá nhân</h1>
        <section class="profileCard" id="profileContainer">
        </section>
    `;
};

const getCalendarPageHTML = () => {
    return `
        <h1 class="pageTitle">Lịch</h1>
        <div id="calendar-container">
            <div id="calendar"></div>
        </div>
    `;
};

const getCreditClassesPageHTML = () => {
    return `
        <section class="credit-class-section">
            <h1 class="pageTitle">Lớp tín chỉ</h1>
            <div class="table-container">
                <div class="table-info">
                    <select id="semesterFilter" class="semester-filter">
                        <option value="HK1">Học kỳ 1</option>
                        <option value="HK2" selected>Học kỳ 2</option>
                        <option value="Hè">Học kỳ Hè</option>
                    </select>
                    <span class="total-count-display">Tổng số: <span id="totalCoursesCount">0</span></span>
                </div>
                <table class="course-table">
                    <thead>
                        <tr>
                            <th>TT</th>
                            <th>Mã môn</th>
                            <th>Tên môn</th>
                            <th>STC</th>
                            <th>Năm học</th>
                            <th>Học kỳ</th>
                            <th>Khoa</th>
                        </tr>
                    </thead>
                    <tbody id="courseTableBody"></tbody>
                </table>
            </div>
        </section>
    `;
};

const getAdminClassHTML = () => {
    return `
        <h1 class="pageTitle">Lớp hành chính</h1>
        <section class="classInfoSection">
            <h2 class="sectionTitle">Thông tin lớp</h2>
            <div class="infoRow infoColums">
                <span class="infoLabel">Học kỳ 1 năm 2024-2025</span>
                <span class="infoValue infoColoum">D24CQCC03-B</span>
            </div>
            <div class="infoRow">
                <span class="infoLabel">Tên lớp:</span>
                <span class="infoValue">D24CQCC03-B</span>
            </div>
            <div class="infoRow">
                <span class="infoLabel">Khoá sinh viên:</span>
                <span class="infoValue">D24CQ</span>
            </div>
            <div class="infoRow">
                <span class="infoLabel">Ngành đào tạo:</span>
                <span class="infoValue">Công nghệ thông tin định hướng ứng dụng</span>
            </div>
            <div class="infoRow">
                <span class="infoLabel">Vai trò trong lớp:</span>
                <span class="infoValue">Giáo viên</span>
            </div>
        </section>
        <section class="academicAdvisorSection">
            <h2 class="sectionTitle">Cố vấn học tập</h2>
            <div class="advisorCard">
                <img src="../../public/images/advisor1.jpg" alt="Advisor Avatar" class="advisorAvatar">
                <span class="advisorName">Nguyễn Thị Thảo Linh</span>
            </div>
            <div class="advisorCard">
                <img src="../../public/images/advisor2.jpg" alt="Advisor Avatar" class="advisorAvatar">
                <span class="advisorName">Vũ Thị Hoà</span>
            </div>
        </section>
        <section class="studentListSection">
            <h2 class="sectionTitle">Danh sách sinh viên</h2>
            <div class="studentListHeader">
                <div>
                    <span class="totalStudents">Tổng số: <span id="totalStudentsCount">0</span></span>
                    <button class="addNewStudentButton" id="addNewStudentButton">Thêm sinh viên</button>
                </div>
                <div class="searchFilterContainer">
                    <input type="text" id="searchInput" placeholder="Tìm kiếm theo mã sinh viên...">
                    <button id="searchButton" class="searchButton"><i class="fas fa-search"></i> Tìm kiếm</button>
                </div>
            </div>
            <table class="studentTable">
                <thead>
                    <tr>
                        <th>TT</th>
                        <th>Ảnh đại diện</th>
                        <th>Mã sinh viên</th>
                        <th>Họ tên</th>
                        <th>Giới tính</th>
                        <th>Vai trò</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="studentTableBody"></tbody>
            </table>
        </section>
    `;
};


// --- ROUTER & APP LOGIC ---
const navigateTo = (page) => {
    mainContent.innerHTML = '';
    switch (page) {
        case 'Trang chủ':
            mainContent.innerHTML = getHomePageHTML();
            break;
        case 'Tin tức':
            mainContent.innerHTML = getNewsPageHTML();
            initializeNewsPage(); // Sẽ fetch dữ liệu từ API
            break;
        case 'Thông tin cá nhân':
            mainContent.innerHTML = getProfilePageHTML();
            initializeProfilePage(); // Sẽ fetch dữ liệu từ API
            break;
        case 'Lịch':
            mainContent.innerHTML = getCalendarPageHTML();
            initializeCalendar(); // Sẽ fetch dữ liệu từ API
            break;
        case 'Lớp tín chỉ':
            mainContent.innerHTML = getCreditClassesPageHTML();
            initializeCreditClassesPage(); // Sẽ fetch dữ liệu từ API
            break;
        case 'Lớp hành chính':
            mainContent.innerHTML = getAdminClassHTML();
            renderStudents(); // Sẽ fetch dữ liệu từ API
            initializeStudentTableEvents();
            break;
        default:
            mainContent.innerHTML = getHomePageHTML();
    }
};

const handleNavigation = () => {
    const navItems = document.querySelectorAll('.navItem');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            // Handle active class
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            navigateTo(this.dataset.page);
        });
    });
};

const initializeResponsive = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (menuToggle && sidebar && overlay) {
        const closeSidebar = () => {
            sidebar.classList.remove('visible');
            overlay.classList.remove('visible');
        };
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('visible');
            overlay.classList.add('visible');
        });
        overlay.addEventListener('click', closeSidebar);
        sidebar.addEventListener('click', (event) => {
            if (event.target.closest('.navItem')) {
                closeSidebar();
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', async () => { // Thêm async ở đây
    // Bỏ qua seeding dữ liệu localStorage cũ
    // Dữ liệu sẽ được load từ API khi các trang được điều hướng đến lần đầu.

    // Initialize core components
    initializeStudentModal();
    handleNavigation();
    initializeResponsive();
    initializeGenericModal();

    // Load the default page
    navigateTo('Trang chủ');
});