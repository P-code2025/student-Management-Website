import { getEvents, setEvents } from '../utils/helpers.js';
import { showGenericModal } from './genericModal.js';

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
        
        // Thêm sự kiện mới bằng genericModal
        dateClick: function(info) {
            showGenericModal({
                title: 'Thêm sự kiện mới',
                confirmText: 'Lưu',
                cancelText: 'Hủy',
                bodyHtml: `
                    <form id="eventForm">
                        <div class="formGroup"><label for="eventTitleInput">Tên sự kiện:</label><input type="text" id="eventTitleInput" required></div>
                        <div class="formGroup"><label for="eventStartTimeInput">Thời gian bắt đầu:</label><input type="time" id="eventStartTimeInput" value="09:00" required></div>
                        <div class="formGroup"><label for="eventEndTimeInput">Thời gian kết thúc:</label><input type="time" id="eventEndTimeInput" value="11:00" required></div>
                    </form>
                `,
                onConfirm: (modalBody) => {
                    const title = modalBody.querySelector('#eventTitleInput').value.trim();
                    const startTime = modalBody.querySelector('#eventStartTimeInput').value;
                    const endTime = modalBody.querySelector('#eventEndTimeInput').value;

                    if (!title) { alert('Tên sự kiện không được để trống.'); return false; }
                    if (endTime <= startTime) { alert('Thời gian kết thúc phải sau thời gian bắt đầu.'); return false; }

                    const date = info.dateStr.split('T')[0];
                    const newEvent = { id: Date.now().toString(), title, start: `${date}T${startTime}`, end: `${date}T${endTime}` };
                    
                    let events = getEvents();
                    events.push(newEvent);
                    setEvents(events);
                    calendar.addEvent(newEvent);
                    return true;
                }
            });
        },
        
        // Sửa và Xóa sự kiện bằng genericModal
        eventClick: function(info) {
            showGenericModal({
                title: 'Xác nhận xóa',
                bodyHtml: `<p>Bạn có chắc chắn muốn xóa sự kiện "<strong>${info.event.title}</strong>" không?</p>`,
                confirmText: 'Xóa',
                cancelText: 'Hủy',
                onConfirm: () => {
                    let events = getEvents();
                    events = events.filter(event => event.id !== info.event.id);
                    setEvents(events);
                    info.event.remove();
                }
            });
        },
        
        events: getEvents(),
        editable: true,
    });

    calendar.render();
};