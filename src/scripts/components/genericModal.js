// Khai báo các biến ở đây nhưng chưa gán giá trị
let modal, modalTitle, modalBody, modalFooter, closeButton;
let onConfirmCallback = null;

const closeModal = () => {
    if (modal) {
        modal.style.display = 'none';
        modalBody.innerHTML = ''; // Xóa nội dung body khi đóng
        modalFooter.innerHTML = ''; // Xóa nội dung footer khi đóng
        onConfirmCallback = null;
    }
};

/**
 * Hiển thị modal chung.
 * @param {object} options - Các tùy chọn cho modal.
 * @param {string} options.title - Tiêu đề của modal.
 * @param {string} options.bodyHtml - Nội dung HTML của phần body modal.
 * @param {string} [options.confirmText='Đồng ý'] - Text cho nút xác nhận.
 * @param {string} [options.cancelText='Hủy bỏ'] - Text cho nút hủy.
 * @param {Function} options.onConfirm - Callback khi nút xác nhận được click. Hàm này có thể trả về false để ngăn modal đóng.
 */
export const showGenericModal = ({ title, bodyHtml, confirmText = 'Đồng ý', cancelText = 'Hủy bỏ', onConfirm }) => {
    if (!modal) {
        console.error('Generic modal is not initialized. Cannot show.');
        return; 
    }
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHtml;
    onConfirmCallback = onConfirm;
    modalFooter.innerHTML = `
        <button class="genericModalButton cancelButton">${cancelText}</button>
        <button class="genericModalButton confirmButton">${confirmText}</button>
    `;
    modal.style.display = 'flex';
};

const handleConfirm = async () => { // Thêm async để hỗ trợ onConfirm là async function
    if (onConfirmCallback) {
        const success = await onConfirmCallback(modalBody); // Truyền modalBody để callback có thể truy cập input
        
        if (success === false) { // Nếu callback trả về false, không đóng modal
            return;
        }
    }
    closeModal();
};

export const initializeGenericModal = () => {
    modal = document.getElementById('genericModal');
    if (!modal) {
        return; // Dừng lại nếu modal không tồn tại trong DOM
    }
    modalTitle = document.getElementById('genericModalTitle');
    modalBody = document.getElementById('genericModalBody');
    modalFooter = document.getElementById('genericModalFooter');
    closeButton = document.getElementById('genericModalCloseButton');

    modalFooter.addEventListener('click', (event) => {
        if (event.target.classList.contains('confirmButton')) {
            handleConfirm();
        } else if (event.target.classList.contains('cancelButton')) {
            closeModal();
        }
    });

    closeButton.addEventListener('click', closeModal);

    // Đóng modal khi click ra bên ngoài
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
};