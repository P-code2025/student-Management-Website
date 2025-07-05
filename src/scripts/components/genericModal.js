
let modal, modalTitle, modalBody, modalFooter, closeButton;
let onConfirmCallback = null;

const closeModal = () => {
    if (modal) {
        modal.style.display = 'none';
        modalBody.innerHTML = '';
        modalFooter.innerHTML = '';
        onConfirmCallback = null;
    }
};

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

const handleConfirm = () => {
    if (onConfirmCallback) {
        const success = onConfirmCallback(modalBody);
        
        if (success === false) {
            return;
        }
    }
    closeModal();
};

export const initializeGenericModal = () => {
    modal = document.getElementById('genericModal');
    if (!modal) {
        return;
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

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
};