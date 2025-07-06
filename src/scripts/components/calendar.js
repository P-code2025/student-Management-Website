import { getEvents, addEvent, deleteEvent, updateEvent } from '../utils/helpers.js'; // Cập nhật đường dẫn
import { showGenericModal } from './genericModal.js'; // Cập nhật đường dẫn

export const initializeCalendar = () => {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: true, // Cho phép kéo thả, resize sự kiện trên lịch

        // Hàm để load sự kiện từ API
        events: async (fetchInfo, successCallback, failureCallback) => {
            try {
                const events = await getEvents(); // Gọi API để lấy sự kiện
                const formattedEvents = events.map(event => ({
                    id: event.MaSuKien,
                    title: event.TieuDe,
                    start: event.ThoiGianBatDau,
                    end: event.ThoiGianKetThuc,
                    extendedProps: {
                        MoTa: event.MoTa,
                        DiaDiem: event.DiaDiem,
                        LoaiSuKien: event.LoaiSuKien
                    }
                }));
                successCallback(formattedEvents);
            } catch (error) {
                console.error("Error loading calendar events:", error);
                failureCallback(error);
            }
        },
        
        // Thêm sự kiện mới bằng genericModal
        dateClick: function(info) {
            showGenericModal({
                title: 'Thêm sự kiện mới',
                confirmText: 'Lưu',
                cancelText: 'Hủy',
                bodyHtml: `
                    <form id="eventForm">
                        <div class="formGroup"><label for="eventTitleInput">Tên sự kiện:</label><input type="text" id="eventTitleInput" required></div>
                        <div class="formGroup"><label for="eventStartTimeInput">Thời gian bắt đầu:</label><input type="datetime-local" id="eventStartTimeInput" value="${info.dateStr.slice(0,16)}" required></div>
                        <div class="formGroup"><label for="eventEndTimeInput">Thời gian kết thúc:</label><input type="datetime-local" id="eventEndTimeInput" value="${info.dateStr.slice(0,16)}" required></div>
                        <div class="formGroup"><label for="eventMoTaInput">Mô tả:</label><textarea id="eventMoTaInput"></textarea></div>
                        <div class="formGroup"><label for="eventDiaDiemInput">Địa điểm:</label><input type="text" id="eventDiaDiemInput"></div>
                        <div class="formGroup"><label for="eventLoaiSuKienInput">Loại sự kiện:</label><input type="text" id="eventLoaiSuKienInput"></div>
                    </form>
                `,
                onConfirm: async (modalBody) => {
                    const title = modalBody.querySelector('#eventTitleInput').value.trim();
                    const startTime = modalBody.querySelector('#eventStartTimeInput').value;
                    const endTime = modalBody.querySelector('#eventEndTimeInput').value;
                    const moTa = modalBody.querySelector('#eventMoTaInput').value;
                    const diaDiem = modalBody.querySelector('#eventDiaDiemInput').value;
                    const loaiSuKien = modalBody.querySelector('#eventLoaiSuKienInput').value;

                    if (!title || !startTime || !endTime) { alert('Tên sự kiện và thời gian là bắt buộc.'); return false; }
                    if (new Date(startTime) >= new Date(endTime)) { alert('Thời gian kết thúc phải sau thời gian bắt đầu.'); return false; }

                    const newEventData = { 
                        TieuDe: title, 
                        ThoiGianBatDau: new Date(startTime).toISOString().slice(0, 19).replace('T', ' '), // Định dạng cho DB
                        ThoiGianKetThuc: new Date(endTime).toISOString().slice(0, 19).replace('T', ' '),
                        MoTa: moTa,
                        DiaDiem: diaDiem,
                        LoaiSuKien: loaiSuKien
                    };
                    
                    try {
                        const response = await addEvent(newEventData);
                        if (response) {
                            calendar.refetchEvents();
                            return true;
                        }
                    } catch (error) {
                        console.error("Error creating event:", error);
                    }
                    return false;
                }
            });
        },
        
        // Xóa sự kiện bằng genericModal
        eventClick: function(info) {
            showGenericModal({
                title: 'Xác nhận xóa',
                bodyHtml: `<p>Bạn có chắc chắn muốn xóa sự kiện "<strong>${info.event.title}</strong>" không?</p>`,
                confirmText: 'Xóa',
                cancelText: 'Hủy',
                onConfirm: async () => {
                    try {
                        const success = await deleteEvent(info.event.id);
                        if (success) {
                            info.event.remove();
                            alert('Xóa sự kiện thành công!');
                            return true;
                        }
                    } catch (error) {
                        console.error("Error deleting event:", error);
                    }
                    return false;
                }
            });
        },

        // Xử lý khi kéo thả hoặc thay đổi kích thước sự kiện
        eventDrop: async function(info) {
            try {
                const updatedEventData = {
                    ThoiGianBatDau: new Date(info.event.start).toISOString().slice(0, 19).replace('T', ' '),
                    ThoiGianKetThuc: new Date(info.event.end).toISOString().slice(0, 19).replace('T', ' ')
                };
                await updateEvent(info.event.id, updatedEventData);
                alert('Cập nhật sự kiện thành công!');
            } catch (error) {
                console.error("Error updating event via drag/drop:", error);
                alert(`Lỗi khi cập nhật sự kiện: ${error.message}`);
                info.revert(); // Hoàn tác thay đổi trên lịch nếu có lỗi
            }
        },

        eventResize: async function(info) {
            try {
                const updatedEventData = {
                    ThoiGianBatDau: new Date(info.event.start).toISOString().slice(0, 19).replace('T', ' '),
                    ThoiGianKetThuc: new Date(info.event.end).toISOString().slice(0, 19).replace('T', ' ')
                };
                await updateEvent(info.event.id, updatedEventData);
                alert('Cập nhật sự kiện thành công!');
            } catch (error) {
                console.error("Error updating event via resize:", error);
                alert(`Lỗi khi cập nhật sự kiện: ${error.message}`);
                info.revert(); // Hoàn tác thay đổi trên lịch nếu có lỗi
            }
        }
    });

    calendar.render();
};