import { renderStudents, initializeStudentTableEvents } from './scripts/components/studentTable.js';
import { initializeStudentModal } from './scripts/components/studentModal.js';
import { getStudents, setStudents } from './scripts/utils/helpers.js';
import { initializeNewsPage } from './scripts/components/news.js';
import { initializeCalendar } from './scripts/components/calendar.js'; // ADD THIS LINE

const mainContent = document.querySelector('.mainContent');

// --- DATA FOR PAGES ---
const lecturerData = {
    fullName: 'Trần Minh Hiếu',
    employeeId: 'GV001',
    dateOfBirth: '10-10-1985',
    gender: 'Nam',
    department: 'Công nghệ thông tin',
    email: 'hieutm@slink.edu.vn',
    phone: '0987-654-321',
    avatar: '../../public/images/avatar.jpg'
};

// NEW: Data for Credit Classes page
const coursesData = [
    { id: 1, name: 'Giải tích 1', credits: 3, semester: 1 },
    { id: 2, name: 'Lập trình C++', credits: 3, semester: 1 },
    { id: 3, name: 'Tiếng Anh A1', credits: 4, semester: 1 },
    { id: 4, name: 'Triết học Mác-Lênin', credits: 3, semester: 1 },
    { id: 5, name: 'Pháp luật đại cương', credits: 2, semester: 1 },
    { id: 6, name: 'Giải tích 2', credits: 3, semester: 2 },
    { id: 7, name: 'Cấu trúc dữ liệu và giải thuật', credits: 3, semester: 2 },
    { id: 8, name: 'Tiếng Anh A2', credits: 4, semester: 2 },
    { id: 9, name: 'Kinh tế chính trị', credits: 2, semester: 2 },
    { id: 10, name: 'Vật lý đại cương', credits: 3, semester: 2 }
];

// --- HTML TEMPLATES FOR EACH PAGE ---

const getHomePageHTML = () => `
    <h1 class="pageTitle">Trang chủ</h1>
    <div style="text-align: center;"><img src="../../public/images/school.png" alt="Ảnh trường học" style="max-width: 100%; border-radius: 8px;"></div>
`;

const getNewsPageHTML = () => `
    <div class="newsHeader">
        <h1 class="pageTitle">Tin tức</h1>
        <button class="addNewNewsButton" id="addNewNewsButton">Thêm tin mới</button>
    </div>
    <div class="newsListContainer" id="newsListContainer"></div>
`;

const getProfilePageHTML = () => `
    <h1 class="pageTitle">Thông tin cá nhân</h1>
    <section class="profileCard">
        <img src="${lecturerData.avatar}" alt="User Avatar" class="profileAvatar">
        <div class="profileInfo">
            <div class="profileName">${lecturerData.fullName}</div>
            <div class="profileInfoRow"><span class="profileInfoLabel">Mã giảng viên:</span><span class="profileInfoValue">${lecturerData.employeeId}</span></div>
            <div class="profileInfoRow"><span class="profileInfoLabel">Ngày sinh:</span><span class="profileInfoValue">${lecturerData.dateOfBirth}</span></div>
            <div class="profileInfoRow"><span class="profileInfoLabel">Giới tính:</span><span class="profileInfoValue">${lecturerData.gender}</span></div>
            <div class="profileInfoRow"><span class="profileInfoLabel">Khoa:</span><span class="profileInfoValue">${lecturerData.department}</span></div>
            <div class="profileInfoRow"><span class="profileInfoLabel">Email:</span><span class="profileInfoValue">${lecturerData.email}</span></div>
            <div class="profileInfoRow"><span class="profileInfoLabel">Điện thoại:</span><span class="profileInfoValue">${lecturerData.phone}</span></div>
        </div>
    </section>
`;

// MODIFIED: This function now just creates a container for the calendar
const getCalendarPageHTML = () => `
    <h1 class="pageTitle">Lịch</h1>
    <div id="calendar-container">
        <div id="calendar"></div>
    </div>
`;

// MODIFIED: This function now renders the courses
const getCreditClassesPageHTML = () => {
    const semester1Courses = coursesData.filter(course => course.semester === 1);
    const semester2Courses = coursesData.filter(course => course.semester === 2);

    const renderSemester = (courses, title) => `
        <div class="semesterSection">
            <h2 class="semesterTitle">${title}</h2>
            <ul class="courseList">
                ${courses.map(course => `
                    <li class="courseItem">
                        <span class="courseName">${course.name}</span>
                        <span class="courseCredits">${course.credits} TC</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    return `
        <h1 class="pageTitle">Lớp tín chỉ</h1>
        <div class="coursesContainer">
            ${renderSemester(semester1Courses, 'Học kỳ 1')}
            ${renderSemester(semester2Courses, 'Học kỳ 2')}
        </div>
    `;
};

const getAdminClassHTML = () => `
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
// --- ROUTER & RENDER LOGIC ---
const navigateTo = (page) => {
    mainContent.innerHTML = '';
    switch (page) {
        case 'Trang chủ': mainContent.innerHTML = getHomePageHTML(); break;
        case 'Tin tức':
            mainContent.innerHTML = getNewsPageHTML();
            initializeNewsPage();
            break;
        case 'Thông tin cá nhân': mainContent.innerHTML = getProfilePageHTML(); break;
        case 'Lịch':
            mainContent.innerHTML = getCalendarPageHTML();
            initializeCalendar(); // Initialize the calendar
            break;
        case 'Lớp tín chỉ': mainContent.innerHTML = getCreditClassesPageHTML(); break;
        case 'Lớp hành chính':
            mainContent.innerHTML = getAdminClassHTML();
            renderStudents();
            initializeStudentTableEvents();
            break;
        default: mainContent.innerHTML = getHomePageHTML();
    }
};

const handleNavigation = () => {
    const navItems = document.querySelectorAll('.navItem');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            navigateTo(this.dataset.page);
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
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
    initializeStudentModal();
    handleNavigation();
    navigateTo('Trang chủ');
});