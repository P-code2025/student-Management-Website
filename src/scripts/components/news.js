import { getNews, addNews, updateNews, deleteNews } from '../utils/helpers.js';
import { showGenericModal } from './genericModal.js';

// --- DOM Elements (sẽ được khởi tạo sau) ---
let newsModal, closeModalButton, newsForm, newsModalTitle, newsIdInput, newsTitleInput, newsContentInput, newsMaGiangVienInput, newsNgayDangInput;

/**
 * Mở modal ở chế độ 'add' hoặc 'edit'.
 * @param {'add' | 'edit'} mode - Chế độ mở modal.
 * @param {object | null} newsItem - Dữ liệu của tin tức cần sửa (chỉ dùng ở chế độ 'edit').
 */
const openModal = (mode, newsItem = null) => {
    newsModalTitle.textContent = mode === 'add' ? 'Thêm tin tức mới' : 'Sửa tin tức';
    newsForm.reset();
    newsIdInput.value = ''; // ID ẩn
    newsNgayDangInput.value = ''; // Ngay dang reset
    newsMaGiangVienInput.value = ''; // Ma Giang Vien reset

    if (mode === 'edit' && newsItem) {
        newsIdInput.value = newsItem.MaTin;
        newsTitleInput.value = newsItem.TieuDe;
        newsContentInput.value = newsItem.NoiDung;
        // Chuyển đổi định dạng ngày nếu cần (YYYY-MM-DDTHH:MM)
        if (newsItem.NgayDang) {
            newsNgayDangInput.value = new Date(newsItem.NgayDang).toISOString().slice(0, 16);
        }
        newsMaGiangVienInput.value = newsItem.MaGiangVien || '';
    }
    newsModal.style.display = 'flex';
};

const closeModal = () => {
    newsModal.style.display = 'none';
};

/**
 * Xử lý việc lưu form, bao gồm cả Thêm mới và Cập nhật.
 */
const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const maTin = newsIdInput.value;
    const newsData = {
        TieuDe: newsTitleInput.value.trim(),
        NoiDung: newsContentInput.value.trim(),
        NgayDang: newsNgayDangInput.value ? new Date(newsNgayDangInput.value).toISOString().slice(0, 19).replace('T', ' ') : null,
        MaGiangVien: newsMaGiangVienInput.value || null
    };

    if (!newsData.TieuDe || !newsData.NoiDung) {
        alert('Tiêu đề và nội dung không được để trống.');
        return;
    }

    try {
        let response;
        if (maTin) { // Đang ở chế độ Sửa
            response = await updateNews(maTin, newsData);
        } else { // Đang ở chế độ Thêm mới
            response = await addNews(newsData);
        }

        if (response) {
            alert(maTin ? 'Cập nhật tin tức thành công!' : 'Thêm tin tức thành công!');
            newsForm.reset();
            closeModal();
            renderNews(); // Render lại danh sách tin tức
        }
    } catch (error) {
        console.error('Lỗi khi submit form tin tức:', error);
        // Lỗi đã được xử lý bởi helpers.js
    }
};

/**
 * Xử lý việc xóa một mẩu tin.
 */
const handleDeleteNews = (maTin) => {
    // Lấy mẩu tin cụ thể để hiển thị tiêu đề trong thông báo (cần fetch lại hoặc truyền từ renderNews)
    // Tạm thời, dùng ID để xác nhận
    showGenericModal({
        title: 'Xác nhận xóa',
        bodyHtml: `<p>Bạn có chắc chắn muốn xóa tin tức có mã <strong>${maTin}</strong> không?</p>`,
        confirmText: 'Xóa',
        cancelText: 'Hủy',
        onConfirm: async () => {
            const success = await deleteNews(maTin);
            if (success) {
                alert('Xóa tin tức thành công!');
                renderNews();
            } else {
                alert('Có lỗi xảy ra khi xóa tin tức.');
            }
            return success;
        }
    });
};
/**
 * Hiển thị danh sách tin tức ra màn hình.
 */
const renderNews = async () => { // Thêm async
    const newsListContainer = document.getElementById('newsListContainer');
    if (!newsListContainer) return;

    const newsData = await getNews(); // Lấy dữ liệu từ API
    newsListContainer.innerHTML = ''; 

    if (newsData.length === 0) {
        newsListContainer.innerHTML = '<p>Chưa có tin tức nào.</p>';
        return;
    }

    // Dữ liệu từ DB đã được sắp xếp, không cần sort lại ở đây
    newsData.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'newsCard';
        newsCard.innerHTML = `
            <div class="newsCardActions">
                <button class="action-button edit-btn" data-id="${item.MaTin}">Sửa</button>
                <button class="action-button delete-btn" data-id="${item.MaTin}">Xóa</button>
            </div>
            <div class="newsCardTitle">${item.TieuDe}</div>
            <div class="newsCardContent">${item.NoiDung}</div>
            <div class="newsCardDate">Đăng ngày: ${new Date(item.NgayDang).toLocaleDateString('vi-VN')}</div>
        `;
        newsListContainer.appendChild(newsCard);
    });
};

/**
 * Khởi tạo trang tin tức, lấy các element và gán sự kiện.
 */
export const initializeNewsPage = () => {
    newsModal = document.getElementById('newsModal');
    if (!newsModal) return;

    closeModalButton = newsModal.querySelector('.closeButton');
    newsForm = document.getElementById('newsForm');
    newsModalTitle = document.getElementById('newsModalTitle');
    newsIdInput = document.getElementById('newsId');
    newsTitleInput = document.getElementById('newsTitle');
    newsContentInput = document.getElementById('newsContent');
    newsNgayDangInput = document.getElementById('newsNgayDang'); // Thêm input ngày đăng
    newsMaGiangVienInput = document.getElementById('newsMaGiangVien'); // Thêm input mã giảng viên

    renderNews();

    // Đảm bảo có các input này trong `index.html` trong `<div id="newsModal">`
    // <div class="formGroup">
    //     <label for="newsNgayDang">Ngày đăng:</label>
    //     <input type="datetime-local" id="newsNgayDang" name="newsNgayDang">
    // </div>
    // <div class="formGroup">
    //     <label for="newsMaGiangVien">Mã giảng viên:</label>
    //     <input type="text" id="newsMaGiangVien" name="newsMaGiangVien">
    // </div>


    document.getElementById('addNewNewsButton').addEventListener('click', () => openModal('add'));
    closeModalButton.addEventListener('click', closeModal);
    newsForm.addEventListener('submit', handleFormSubmit);

    document.getElementById('newsListContainer').addEventListener('click', async (event) => { // Thêm async
        const target = event.target;
        const maTin = parseInt(target.dataset.id);

        if (target.classList.contains('edit-btn')) {
            const newsItem = await TinTucAPI.getNewsById(maTin); // Cần tạo hàm getNewsById trong helpers
            if(newsItem) openModal('edit', newsItem);
        } else if (target.classList.contains('delete-btn')) {
            handleDeleteNews(maTin);
        }
    });
};

// Cần thêm hàm getNewsById vào helpers.js nếu muốn fetch 1 tin cụ thể khi edit
// Trong helpers.js:
// export const getNewsById = async (maTin) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/tintuc/${maTin}`);
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Lỗi khi tải chi tiết tin tức.');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching news by ID:', error);
//         alert(`Lỗi khi tải chi tiết tin tức: ${error.message}`);
//         return null;
//     }
// };