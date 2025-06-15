// src/main.js
import { getStudents, setStudents, getCourses, setCourses, getLecturerData, setLecturerData } from './scripts/utils/helpers.js';
import { initializeStudentModal } from './scripts/components/studentModal.js';
import { renderStudents, initializeStudentTableEvents } from './scripts/components/studentTable.js';
import { initializeNewsPage } from './scripts/components/news.js';
import { initializeCalendar } from './scripts/components/calendar.js';
import { initializeCreditClassesPage } from './scripts/components/courses.js';
import { initializeProfilePage } from './scripts/components/profile.js';
import { initializeGenericModal } from './scripts/components/genericModal.js';
import { initializeTheme } from './scripts/components/theme-switcher.js';

const mainContent = document.querySelector('.mainContent');

// --- HTML TEMPLATE FUNCTIONS (Giữ nguyên) ---

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
        <div class="newsHeader">
            <h1 class="pageTitle">Lớp tín chỉ</h1>
            <button class="addNewNewsButton" id="addCourseButton">Thêm môn học</button>
        </div>
        <div class="coursesContainer" id="coursesContainer"></div>
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
    const navItems = document.querySelectorAll('.navItem');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });

    mainContent.innerHTML = '';
    switch (page) {
        case 'Trang chủ':
            mainContent.innerHTML = getHomePageHTML();
            break;
        case 'Tin tức':
            mainContent.innerHTML = getNewsPageHTML();
            initializeNewsPage();
            break;
        case 'Thông tin cá nhân':
            mainContent.innerHTML = getProfilePageHTML();
            initializeProfilePage();
            break;
        case 'Lịch':
            mainContent.innerHTML = getCalendarPageHTML();
            initializeCalendar();
            break;
        case 'Lớp tín chỉ':
            mainContent.innerHTML = getCreditClassesPageHTML();
            initializeCreditClassesPage();
            break;
        case 'Lớp hành chính':
            mainContent.innerHTML = getAdminClassHTML();
            renderStudents();
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
        // Sửa lại selector để bao gồm cả thẻ <a> và <i>
        sidebar.querySelectorAll('.navItem a').forEach(navLink => {
            navLink.addEventListener('click', closeSidebar);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Seed data
    if (!getStudents() || getStudents().length === 0) {
        const initialStudents = [
            { id: 1, avatar: '../../public/images/avatar1.jpg', studentCode: 'B24DCCC11', fullName: 'Mông Đức Hiếu', gender: 'Nam', role: 'Thành viên' },
            { id: 2, avatar: '../../public/images/avatar2.jpg', studentCode: 'B24DCCC01', fullName: 'Nguyễn Đức Dũng', gender: 'Nam', role: 'Thành viên' },
            { id: 3, avatar: '../../public/images/avatar3.jpg', studentCode: 'B24DCCC37', fullName: 'Nguyễn Cao Quảng', gender: 'Nam', role: 'Thành viên' },
            { id: 4, avatar: '../../public/images/avatar4.jpg', studentCode: 'B24DCCC13', fullName: 'Văn Phương Nam', gender: 'Nam', role: 'Thành viên' },
            { id: 5, avatar: '../../public/images/avatar5.jpg', studentCode: 'B24DCCC03', fullName: 'Đỗ Công An', gender: 'Nam', role: 'Thành viên' }
        ];
        setStudents(initialStudents);
    }
    if (!getCourses() || getCourses().length === 0) {
        const initialCourses = [
            { id: 1, name: 'Giải tích 1', credits: 3, semester: 1 }, { id: 2, name: 'Lập trình C++', credits: 3, semester: 1 }, { id: 3, name: 'Tiếng Anh A1', credits: 4, semester: 1 }, { id: 4, name: 'Triết học Mác-Lênin', credits: 3, semester: 1 }, { id: 5, name: 'Pháp luật đại cương', credits: 2, semester: 1 }, { id: 6, name: 'Giải tích 2', credits: 3, semester: 2 }, { id: 7, name: 'Cấu trúc dữ liệu và giải thuật', credits: 3, semester: 2 }, { id: 8, name: 'Tiếng Anh A2', credits: 4, semester: 2 }, { id: 9, name: 'Kinh tế chính trị', credits: 2, semester: 2 }, { id: 10, name: 'Vật lý đại cương', credits: 3, semester: 2 }
        ];
        setCourses(initialCourses);
    }
    if (!getLecturerData()) {
        const initialLecturerData = {
            // THAY ĐỔI TÊN Ở ĐÂY (TÙY CHỌN)
            fullName: 'Nguyễn Minh Chiến',
            employeeId: 'GV001',
            dateOfBirth: '10-10-1985',
            gender: 'Nam',
            department: 'Công nghệ thông tin',
            email: 'chiennm@slink.edu.vn',
            phone: '0987-654-321',
            // THAY ĐỔI ĐƯỜNG DẪN ẢNH Ở ĐÂY
            avatar: '../../public/images/nguyen-minh-chien.jpg'
        };
        setLecturerData(initialLecturerData);
    }

    // Initialize core components
    initializeStudentModal();
    handleNavigation();
    initializeResponsive();
    initializeGenericModal();
    initializeTheme();

    // Load the default page
    navigateTo('Trang chủ');
});