const CALENDAR_EVENTS_KEY = 'calendarEvents';

const getEvents = () => {
    const eventsJson = localStorage.getItem(CALENDAR_EVENTS_KEY);
    return eventsJson ? JSON.parse(eventsJson) : [];
};

const setEvents = (events) => {
    localStorage.setItem(CALENDAR_EVENTS_KEY, JSON.stringify(events));
};

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
        
        dateClick: function(info) {
            // 1. Prompt for event title
            const title = prompt('Nhập tên sự kiện:');
            if (!title) return;

            // 2. Prompt for start time
            const startTimeStr = prompt('Nhập thời gian bắt đầu (ví dụ: 09:30):', '09:00');
            if (!startTimeStr || !/^\d{2}:\d{2}$/.test(startTimeStr)) {
                alert('Định dạng thời gian bắt đầu không hợp lệ.');
                return;
            }

            // 3. ADDED: Prompt for end time
            const endTimeStr = prompt('Nhập thời gian kết thúc (ví dụ: 11:00):', '11:00');
            if (!endTimeStr || !/^\d{2}:\d{2}$/.test(endTimeStr)) {
                alert('Định dạng thời gian kết thúc không hợp lệ.');
                return;
            }
            
            // ADDED: Validate that end time is after start time
            if (endTimeStr <= startTimeStr) {
                alert('Thời gian kết thúc phải sau thời gian bắt đầu.');
                return;
            }

            // 4. Combine date and times into full ISO strings
            const date = info.dateStr.split('T')[0];
            const startDateTime = `${date}T${startTimeStr}:00`;
            const endDateTime = `${date}T${endTimeStr}:00`; // ADDED

            const newEvent = {
                id: Date.now().toString(),
                title: title,
                start: startDateTime,
                end: endDateTime // MODIFIED: Add the end time
            };
            
            let events = getEvents();
            events.push(newEvent);
            setEvents(events);
            calendar.addEvent(newEvent);
        },
        
        events: getEvents(),
        editable: true,
        eventClick: function(info) {
            if (confirm(`Bạn có muốn xóa sự kiện '${info.event.title}' không?`)) {
                let events = getEvents();
                events = events.filter(event => event.id !== info.event.id);
                setEvents(events);
                info.event.remove();
            }
        }
    });

    calendar.render();
};