import { getNews as getNewsFromStorage, setNews as setNewsInStorage } from '../utils/helpers.js';
import { showGenericModal } from './genericModal.js';

let newsModal, closeModalButton, newsForm, newsModalTitle, newsIdInput, newsTitleInput, newsContentInput;

/**
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


const handleFormSubmit = (event) => {
    event.preventDefault();
    const newsData = getNewsFromStorage();
    const newsItem = {
       
        id: newsIdInput.value ? parseInt(newsIdInput.value) : Date.now(),
        title: newsTitleInput.value.trim(),
        content: newsContentInput.value.trim(),
        date: newsIdInput.value ? newsData.find(n => n.id === parseInt(newsIdInput.value)).date : new Date().toISOString()
    };

    if (!newsItem.title || !newsItem.content) {
        alert('Tiêu đề và nội dung không được để trống.');
        return;
    }

    if (newsIdInput.value) {
        const index = newsData.findIndex(n => n.id === newsItem.id);
        if (index > -1) {
            newsData[index] = newsItem;
        }
    } else { 
        newsData.push(newsItem);
    }

    setNewsInStorage(newsData);
    renderNews();
    closeModal();
};


const handleDeleteNews = (id) => {
    
    const newsToDelete = getNewsFromStorage().find(item => item.id === id);
    if (!newsToDelete) return; 

    
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

const renderNews = () => {
    const newsListContainer = document.getElementById('newsListContainer');
    if (!newsListContainer) return;

    const newsData = getNewsFromStorage();
    newsListContainer.innerHTML = ''; 

    if (newsData.length === 0) {
        newsListContainer.innerHTML = '<p>Chưa có tin tức nào.</p>';
        return;
    }

    newsData.sort((a, b) => b.id - a.id); 

    newsData.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'newsCard';
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


export const initializeNewsPage = () => {
   
    newsModal = document.getElementById('newsModal');
    if (!newsModal) return; 

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