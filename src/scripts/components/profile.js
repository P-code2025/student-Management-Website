import { getLecturerData, setLecturerData } from '../utils/helpers.js';

let profileContainer;

/**
 * Hiển thị thông tin cá nhân của giảng viên ra màn hình.
 * @param {boolean} isEditing - Chế độ hiển thị: true = sửa, false = xem.
 */
const renderProfile = (isEditing = false) => {
    if (!profileContainer) return;

    const lecturerData = getLecturerData();

    if (!lecturerData) {
        profileContainer.innerHTML = '<p>Không có dữ liệu giảng viên.</p>';
        return;
    }

    let contentHtml;

    if (isEditing) {
        // Chế độ Sửa: Hiển thị form với các ô input
        contentHtml = `
            <img src="${lecturerData.avatar}" alt="User Avatar" class="profileAvatar">
            <div class="profileInfo">
                <form id="profileForm">
                    <div class="profileName"><input type="text" id="fullNameInput" value="${lecturerData.fullName}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Mã GV:</span><input type="text" id="employeeIdInput" value="${lecturerData.employeeId}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Ngày sinh:</span><input type="text" id="dobInput" value="${lecturerData.dateOfBirth}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Giới tính:</span><input type="text" id="genderInput" value="${lecturerData.gender}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Khoa:</span><input type="text" id="departmentInput" value="${lecturerData.department}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Email:</span><input type="text" id="emailInput" value="${lecturerData.email}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Điện thoại:</span><input type="text" id="phoneInput" value="${lecturerData.phone}"></div>
                    <div class="profileActions">
                        <button type="submit" class="action-button save-btn">Lưu</button>
                        <button type="button" class="action-button cancel-btn">Hủy</button>
                    </div>
                </form>
            </div>
        `;
    } else {
        // Chế độ Xem: Hiển thị thông tin tĩnh
        contentHtml = `
            <img src="${lecturerData.avatar}" alt="User Avatar" class="profileAvatar">
            <div class="profileInfo">
                <div class="profileName">${lecturerData.fullName}</div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Mã giảng viên:</span><span class="profileInfoValue">${lecturerData.employeeId}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Ngày sinh:</span><span class="profileInfoValue">${lecturerData.dateOfBirth}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Giới tính:</span><span class="profileInfoValue">${lecturerData.gender}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Khoa:</span><span class="profileInfoValue">${lecturerData.department}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Email:</span><span class="profileInfoValue">${lecturerData.email}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Điện thoại:</span><span class="profileInfoValue">${lecturerData.phone}</span></div>
                <div class="profileActions">
                    <button class="action-button edit-btn">Sửa thông tin</button>
                </div>
            </div>
        `;
    }

    profileContainer.innerHTML = contentHtml;
};

/**
 * Xử lý sự kiện lưu thông tin sau khi sửa.
 */
const handleSave = (event) => {
    event.preventDefault();
    const currentData = getLecturerData();
    const updatedData = {
        fullName: document.getElementById('fullNameInput').value,
        employeeId: document.getElementById('employeeIdInput').value,
        dateOfBirth: document.getElementById('dobInput').value,
        gender: document.getElementById('genderInput').value,
        department: document.getElementById('departmentInput').value,
        email: document.getElementById('emailInput').value,
        phone: document.getElementById('phoneInput').value,
        avatar: currentData.avatar // Giữ lại avatar cũ, không cho sửa ở đây
    };
    setLecturerData(updatedData);
    renderProfile(false); // Chuyển về chế độ xem
};

/**
 * Khởi tạo trang cá nhân và gán các sự kiện.
 */
export const initializeProfilePage = () => {
    profileContainer = document.getElementById('profileContainer');
    
    // Dùng event delegation để xử lý các click
    profileContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            renderProfile(true); // Chuyển sang chế độ sửa
        }
        if (event.target.classList.contains('cancel-btn')) {
            renderProfile(false); // Hủy và quay lại chế độ xem
        }
    });

    profileContainer.addEventListener('submit', (event) => {
        if (event.target.id === 'profileForm') {
            handleSave(event); // Lưu thông tin
        }
    });

    renderProfile(false); // Hiển thị ban đầu ở chế độ xem
};
