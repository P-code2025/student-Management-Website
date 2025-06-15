import { getNews as getNewsFromStorage, setNews as setNewsInStorage } from '../utils/helpers.js';
import { showGenericModal } from './genericModal.js';
// Giả sử bạn đã có file genericModal.js và muốn dùng nó
// import { showGenericModal } from './genericModal.js'; 

// --- DOM Elements (sẽ được khởi tạo sau) ---
let newsModal, closeModalButton, newsForm, newsModalTitle, newsIdInput, newsTitleInput, newsContentInput;

/**
 * Mở modal ở chế độ 'add' hoặc 'edit'.
 * @param {'add' | 'edit'} mode - Chế độ mở modal.
 * @param {object | null} newsItem - Dữ liệu của tin tức cần sửa (chỉ dùng ở chế độ 'edit').
 */
const openModal = (mode, newsItem = null) => {
    newsModalTitle.textContent = mode === 'add' ? 'Thêm tin tức mới' : 'Sửa tin tức';
    newsForm.reset();
    
    if (mode === 'edit' && newsItem) {
        newsIdInput.value = newsItem.id;
        newsTitleInput.value = newsItem.title;
        newsContentInput.value = newsItem.content;
    } else {
        newsIdInput.value = '';
    }
    newsModal.style.display = 'flex';
};

const closeModal = () => {
    newsModal.style.display = 'none';
};

/**
 * Xử lý việc lưu form, bao gồm cả Thêm mới và Cập nhật.
 */
const handleFormSubmit = (event) => {
    event.preventDefault();
    const newsData = getNewsFromStorage();
    const newsItem = {
        // Nếu có ID thì giữ nguyên, không thì tạo ID mới
        id: newsIdInput.value ? parseInt(newsIdInput.value) : Date.now(),
        title: newsTitleInput.value.trim(),
        content: newsContentInput.value.trim(),
        // Giữ lại ngày đăng cũ khi sửa, hoặc tạo ngày mới khi thêm
        date: newsIdInput.value ? newsData.find(n => n.id === parseInt(newsIdInput.value)).date : new Date().toISOString()
    };

    if (!newsItem.title || !newsItem.content) {
        alert('Tiêu đề và nội dung không được để trống.');
        return;
    }

    if (newsIdInput.value) { // Đang ở chế độ Sửa
        const index = newsData.findIndex(n => n.id === newsItem.id);
        if (index > -1) {
            newsData[index] = newsItem;
        }
    } else { // Đang ở chế độ Thêm mới
        newsData.push(newsItem);
    }

    setNewsInStorage(newsData);
    renderNews();
    closeModal();
};

/**
 * Xử lý việc xóa một mẩu tin.
 */
const handleDeleteNews = (id) => {
    // Lấy mẩu tin cụ thể để hiển thị tiêu đề trong thông báo
    const newsToDelete = getNewsFromStorage().find(item => item.id === id);
    if (!newsToDelete) return; // Dừng lại nếu không tìm thấy tin

    // Sử dụng modal tùy chỉnh thay vì confirm()
    showGenericModal({
        title: 'Xác nhận xóa',
        bodyHtml: `<p>Bạn có chắc chắn muốn xóa tin tức "<strong>${newsToDelete.title}</strong>" không?</p>`,
        confirmText: 'Xóa',
        cancelText: 'Hủy',
        onConfirm: () => {
            let newsData = getNewsFromStorage();
            newsData = newsData.filter(n => n.id !== id);
            setNewsInStorage(newsData);
            renderNews();
        }
    });
};
/**
 * Hiển thị danh sách tin tức ra màn hình.
 */
const renderNews = () => {
    const newsListContainer = document.getElementById('newsListContainer');
    if (!newsListContainer) return;

    const newsData = getNewsFromStorage();
    newsListContainer.innerHTML = ''; 

    if (newsData.length === 0) {
        newsListContainer.innerHTML = '<p>Chưa có tin tức nào.</p>';
        return;
    }

    newsData.sort((a, b) => b.id - a.id); // Sắp xếp tin mới nhất lên đầu

    newsData.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'newsCard';
        // THÊM NÚT SỬA VÀ CÁC CLASS ĐỂ PHÂN BIỆT
        newsCard.innerHTML = `
            <div class="newsCardActions">
                <button class="action-button edit-btn" data-id="${item.id}">Sửa</button>
                <button class="action-button delete-btn" data-id="${item.id}">Xóa</button>
            </div>
            <div class="newsCardTitle">${item.title}</div>
            <div class="newsCardContent">${item.content}</div>
            <div class="newsCardDate">Đăng ngày: ${new Date(item.date).toLocaleDateString('vi-VN')}</div>
        `;
        newsListContainer.appendChild(newsCard);
    });
};

/**
 * Khởi tạo trang tin tức, lấy các element và gán sự kiện.
 */
export const initializeNewsPage = () => {
    // Khởi tạo các biến DOM cho component này
    newsModal = document.getElementById('newsModal');
    if (!newsModal) return; // Dừng lại nếu không tìm thấy modal

    closeModalButton = newsModal.querySelector('.closeButton');
    newsForm = document.getElementById('newsForm');
    newsModalTitle = document.getElementById('newsModalTitle');
    newsIdInput = document.getElementById('newsId');
    newsTitleInput = document.getElementById('newsTitle');
    newsContentInput = document.getElementById('newsContent');

    renderNews();

    document.getElementById('addNewNewsButton').addEventListener('click', () => openModal('add'));
    closeModalButton.addEventListener('click', closeModal);
    newsForm.addEventListener('submit', handleFormSubmit);

    // Dùng event delegation để xử lý click cho các nút Sửa và Xóa
    document.getElementById('newsListContainer').addEventListener('click', (event) => {
        const target = event.target;
        const id = parseInt(target.dataset.id);

        if (target.classList.contains('edit-btn')) {
            const newsItem = getNewsFromStorage().find(n => n.id === id);
            if(newsItem) openModal('edit', newsItem);
        } else if (target.classList.contains('delete-btn')) {
            handleDeleteNews(id);
        }
    });
};