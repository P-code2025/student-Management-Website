import { 
    renderHomePage, 
    renderNewsPage, 
    renderProfilePage, 
    renderCalendarPage, 
    renderCreditClassPage, 
    renderAdminClassPage 
} from './pages.js';


export function handleActiveNavItem() {
    const navItems = document.querySelectorAll('.navItem');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}


const mainContent = document.querySelector('.mainContent');

// Hàm hiển thị trang dựa trên pageId
const showPage = (pageId) => {
    // Xóa nội dung hiện tại, trừ khi là trang 'admin-class' vì nó tự xử lý
    if (pageId !== 'admin-class') {
        mainContent.innerHTML = '';
    }

    switch (pageId) {
        case 'home':
            mainContent.innerHTML = renderHomePage();
            break;
        case 'news':
            mainContent.innerHTML = renderNewsPage();
            // TODO: Thêm hàm khởi tạo sự kiện cho trang tin tức ở đây
            break;
        case 'profile':
            mainContent.innerHTML = renderProfilePage();
            break;
        case 'calendar':
            mainContent.innerHTML = renderCalendarPage();
            // TODO: Thêm hàm khởi tạo sự kiện cho trang lịch ở đây
            break;
        case 'credit-class':
            mainContent.innerHTML = renderCreditClassPage();
            break;
        case 'admin-class':
            renderAdminClassPage(); // Hàm này tự render và khởi tạo lại mọi thứ
            break;
        default:
            mainContent.innerHTML = renderHomePage(); // Mặc định về trang chủ
    }
};

export function handleActiveNavItem() {
    const navItems = document.querySelectorAll('.navItem');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn hành vi mặc định của thẻ a

            // Bỏ active ở tất cả các item
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Thêm active cho item được click
            this.classList.add('active');

            // Lấy pageId từ thuộc tính data-page
            const pageId = this.dataset.page;
            
            // Hiển thị trang tương ứng
            showPage(pageId);
        });
    });

    // Hiển thị trang mặc định khi tải lần đầu
    // Tìm mục có class 'active' ban đầu trong HTML và hiển thị trang đó
    const initialActiveItem = document.querySelector('.navItem.active');
    if (initialActiveItem) {
        showPage(initialActiveItem.dataset.page);
    } else {
        showPage('home'); // Hoặc mặc định là trang chủ
    }
}