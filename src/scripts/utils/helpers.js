const API_BASE_URL = 'http://localhost:3000/api'; // Đảm bảo URL này khớp với backend của bạn!

// --- API FUNCTIONS FOR SINH_VIEN (Students) ---
export const getStudents = async (searchTerm = '') => {
    try {
        const response = await fetch(`${API_BASE_URL}/sinhvien`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi tải danh sách sinh viên.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        alert(`Lỗi khi tải danh sách sinh viên: ${error.message}`);
        return [];
    }
};

export const addStudent = async (studentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sinhvien`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi thêm sinh viên.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding student:', error);
        alert(`Lỗi khi thêm sinh viên: ${error.message}`);
        return null;
    }
};

export const updateStudent = async (maSinhVien, updateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sinhvien/${maSinhVien}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật sinh viên.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating student:', error);
        alert(`Lỗi khi cập nhật sinh viên: ${error.message}`);
        return null;
    }
};

export const deleteStudent = async (maSinhVien) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sinhvien/${maSinhVien}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi xóa sinh viên.');
        }
        return true;
    } catch (error) {
        console.error('Error deleting student:', error);
        alert(`Lỗi khi xóa sinh viên: ${error.message}`);
        return false;
    }
};

// --- API FUNCTIONS FOR MON_HOC (Courses) ---
export const getCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/monhoc`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi tải danh sách môn học.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        alert(`Lỗi khi tải danh sách môn học: ${error.message}`);
        return [];
    }
};

export const addCourse = async (courseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/monhoc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi thêm môn học.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding course:', error);
        alert(`Lỗi khi thêm môn học: ${error.message}`);
        return null;
    }
};

// ... Các hàm updateCourse, deleteCourse tương tự như của student, chỉ thay đổi endpoint và dữ liệu ...

// --- API FUNCTIONS FOR TIN_TUC (News) ---
export const getNews = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/tintuc`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi tải danh sách tin tức.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        alert(`Lỗi khi tải danh sách tin tức: ${error.message}`);
        return [];
    }
};

export const addNews = async (newsData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tintuc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi thêm tin tức.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding news:', error);
        alert(`Lỗi khi thêm tin tức: ${error.message}`);
        return null;
    }
};

export const updateNews = async (maTin, updateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tintuc/${maTin}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật tin tức.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating news:', error);
        alert(`Lỗi khi cập nhật tin tức: ${error.message}`);
        return null;
    }
};

export const deleteNews = async (maTin) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tintuc/${maTin}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi xóa tin tức.');
        }
        return true;
    } catch (error) {
        console.error('Error deleting news:', error);
        alert(`Lỗi khi xóa tin tức: ${error.message}`);
        return false;
    }
};


// --- API FUNCTIONS FOR SU_KIEN (Calendar Events) ---
export const getEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/sukien`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi tải danh sách sự kiện.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        alert(`Lỗi khi tải danh sách sự kiện: ${error.message}`);
        return [];
    }
};

export const addEvent = async (eventData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sukien`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi thêm sự kiện.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding event:', error);
        alert(`Lỗi khi thêm sự kiện: ${error.message}`);
        return null;
    }
};

export const updateEvent = async (maSuKien, updateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sukien/${maSuKien}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật sự kiện.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating event:', error);
        alert(`Lỗi khi cập nhật sự kiện: ${error.message}`);
        return null;
    }
};

export const deleteEvent = async (maSuKien) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sukien/${maSuKien}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi xóa sự kiện.');
        }
        return true;
    } catch (error) {
        console.error('Error deleting event:', error);
        alert(`Lỗi khi xóa sự kiện: ${error.message}`);
        return false;
    }
};

// --- API FUNCTIONS FOR GIANG_VIEN (Lecturers) (for Profile Page) ---
// Giả định bạn chỉ có một giảng viên hoặc bạn cần lấy giảng viên theo ID cố định
// Nếu có hệ thống đăng nhập, bạn sẽ lấy ID giảng viên từ phiên đăng nhập.
// Ở đây, tôi sẽ lấy tất cả giảng viên và chọn một người để hiển thị profile
export const getLecturerData = async (maGiangVien = null) => {
    try {
        let url = `${API_BASE_URL}/giangvien`;
        if (maGiangVien) {
            url += `/${maGiangVien}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi tải thông tin giảng viên.');
        }
        const data = await response.json();
        // Nếu không có ID cụ thể, lấy người đầu tiên trong danh sách (cho mục đích demo)
        if (!maGiangVien && Array.isArray(data) && data.length > 0) {
            return data[0];
        }
        return data;
    } catch (error) {
        console.error('Error fetching lecturer data:', error);
        alert(`Lỗi khi tải thông tin giảng viên: ${error.message}`);
        return null;
    }
};

export const setLecturerData = async (maGiangVien, updateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/giangvien/${maGiangVien}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật thông tin giảng viên.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating lecturer data:', error);
        alert(`Lỗi khi cập nhật thông tin giảng viên: ${error.message}`);
        return null;
    }
};