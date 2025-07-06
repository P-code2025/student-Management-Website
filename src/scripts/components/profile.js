import { getLecturerData, setLecturerData } from '../utils/helpers.js';

let profileContainer;
let currentLecturerId = 'GV001'; // ID của giảng viên đang xem/sửa (có thể lấy từ session/login sau này)

/**
 * Hiển thị thông tin cá nhân của giảng viên ra màn hình.
 * @param {boolean} isEditing - Chế độ hiển thị: true = sửa, false = xem.
 */
const renderProfile = async (isEditing = false) => { // Thêm async
    if (!profileContainer) return;

    const lecturerData = await getLecturerData(currentLecturerId); // Lấy dữ liệu từ API

    if (!lecturerData) {
        profileContainer.innerHTML = '<p>Không có dữ liệu giảng viên.</p>';
        return;
    }

    let contentHtml;

    if (isEditing) {
        contentHtml = `
            <img src="${lecturerData.AnhDaiDien || '../../public/images/default-avatar.jpg'}" alt="User Avatar" class="profileAvatar">
            <div class="profileInfo">
                <form id="profileForm">
                    <div class="profileName"><input type="text" id="fullNameInput" value="${lecturerData.HoTen}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Mã GV:</span><input type="text" id="employeeIdInput" value="${lecturerData.MaGiangVien}" readonly></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Ngày sinh:</span><input type="date" id="dobInput" value="${lecturerData.NgaySinh ? new Date(lecturerData.NgaySinh).toISOString().split('T')[0] : ''}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Giới tính:</span>
                        <select id="genderInput">
                            <option value="Nam" ${lecturerData.GioiTinh === 'Nam' ? 'selected' : ''}>Nam</option>
                            <option value="Nữ" ${lecturerData.GioiTinh === 'Nữ' ? 'selected' : ''}>Nữ</option>
                            <option value="Khác" ${lecturerData.GioiTinh === 'Khác' ? 'selected' : ''}>Khác</option>
                        </select>
                    </div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Địa chỉ:</span><input type="text" id="addressInput" value="${lecturerData.DiaChi || ''}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Email:</span><input type="email" id="emailInput" value="${lecturerData.Email}"></div>
                    <div class="profileInfoRow"><span class="profileInfoLabel">Điện thoại:</span><input type="tel" id="phoneInput" value="${lecturerData.SoDienThoai || ''}"></div>
                    <div class="profileActions">
                        <button type="submit" class="action-button save-btn">Lưu</button>
                        <button type="button" class="action-button cancel-btn">Hủy</button>
                    </div>
                </form>
            </div>
        `;
    } else {
        contentHtml = `
            <img src="${lecturerData.AnhDaiDien || '../../public/images/default-avatar.jpg'}" alt="User Avatar" class="profileAvatar">
            <div class="profileInfo">
                <div class="profileName">${lecturerData.HoTen}</div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Mã giảng viên:</span><span class="profileInfoValue">${lecturerData.MaGiangVien}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Ngày sinh:</span><span class="profileInfoValue">${lecturerData.NgaySinh ? new Date(lecturerData.NgaySinh).toLocaleDateString('vi-VN') : 'N/A'}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Giới tính:</span><span class="profileInfoValue">${lecturerData.GioiTinh || 'N/A'}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Địa chỉ:</span><span class="profileInfoValue">${lecturerData.DiaChi || 'N/A'}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Email:</span><span class="profileInfoValue">${lecturerData.Email}</span></div>
                <div class="profileInfoRow"><span class="profileInfoLabel">Điện thoại:</span><span class="profileInfoValue">${lecturerData.SoDienThoai || 'N/A'}</span></div>
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
const handleSave = async (event) => { // Thêm async
    event.preventDefault();
    
    // Lấy ID giảng viên từ input ẩn hoặc biến global
    const maGiangVien = document.getElementById('employeeIdInput').value;

    const updatedData = {
        HoTen: document.getElementById('fullNameInput').value,
        NgaySinh: document.getElementById('dobInput').value || null,
        GioiTinh: document.getElementById('genderInput').value,
        DiaChi: document.getElementById('addressInput').value || null,
        Email: document.getElementById('emailInput').value,
        SoDienThoai: document.getElementById('phoneInput').value || null,
        // AnhDaiDien: lecturerData.AnhDaiDien (Không cho sửa ảnh đại diện ở đây)
    };

    try {
        const response = await setLecturerData(maGiangVien, updatedData); // Gọi API cập nhật
        if (response) {
            alert('Cập nhật thông tin cá nhân thành công!');
            renderProfile(false); // Chuyển về chế độ xem
        }
    } catch (error) {
        console.error('Lỗi khi lưu thông tin cá nhân:', error);
        // Lỗi đã được xử lý bởi helpers.js
    }
};

/**
 * Khởi tạo trang cá nhân và gán các sự kiện.
 */
export const initializeProfilePage = () => {
    profileContainer = document.getElementById('profileContainer');
    if (!profileContainer) return; // Đảm bảo phần tử tồn tại

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