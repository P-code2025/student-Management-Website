const NEWS_STORAGE_KEY = 'newsData';
const getNews = () => { const newsJson = localStorage.getItem(NEWS_STORAGE_KEY); return newsJson ? JSON.parse(newsJson) : []; };
const setNews = (news) => { localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news)); };
const renderNews = () => {
    const newsListContainer = document.getElementById('newsListContainer');
    if (!newsListContainer) return;
    const news = getNews();
    newsListContainer.innerHTML = '';
    if (news.length === 0) { newsListContainer.innerHTML = '<p>Chưa có tin tức nào.</p>'; return; }
    news.sort((a, b) => b.id - a.id);
    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'newsCard';
        newsCard.innerHTML = `
            <button class="deleteNewsButton" data-id="${item.id}">&times;</button>
            <div class="newsCardTitle">${item.title}</div>
            <div class="newsCardContent">${item.content}</div>
            <div class="newsCardDate">Đăng ngày: ${new Date(item.date).toLocaleDateString('vi-VN')}</div>
        `;
        newsListContainer.appendChild(newsCard);
    });
};
const handleAddNewNews = () => {
    const title = prompt("Nhập tiêu đề tin tức:");
    if (!title || title.trim() === '') return;
    const content = prompt("Nhập nội dung tin tức:");
    if (!content || content.trim() === '') return;
    const news = getNews();
    const newNewsItem = { id: Date.now(), title: title.trim(), content: content.trim(), date: new Date().toISOString() };
    news.push(newNewsItem);
    setNews(news);
    renderNews();
};
const handleDeleteNews = (newsId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin tức này không?')) return;
    let news = getNews();
    news = news.filter(item => item.id !== newsId);
    setNews(news);
    renderNews();
};
export const initializeNewsPage = () => {
    renderNews();
    const addNewButton = document.getElementById('addNewNewsButton');
    if(addNewButton) { addNewButton.addEventListener('click', handleAddNewNews); }
    const newsListContainer = document.getElementById('newsListContainer');
    if(newsListContainer) {
        newsListContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('deleteNewsButton')) {
                const newsId = parseInt(event.target.dataset.id, 10);
                handleDeleteNews(newsId);
            }
        });
    }
};