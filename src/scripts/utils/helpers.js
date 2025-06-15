 
const STUDENTS_STORAGE_KEY = 'studentsData';

export const getStudents = () => {
    const studentsJson = localStorage.getItem(STUDENTS_STORAGE_KEY);
    return studentsJson ? JSON.parse(studentsJson) : [];
};

export const setStudents = (students) => {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
};

const COURSES_STORAGE_KEY = 'coursesData';

export const getCourses = () => {
    const coursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
    return coursesJson ? JSON.parse(coursesJson) : [];
};

export const setCourses = (courses) => {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
};

const NEWS_STORAGE_KEY = 'newsData';

export const getNews = () => {
    const newsJson = localStorage.getItem(NEWS_STORAGE_KEY);
    return newsJson ? JSON.parse(newsJson) : [];
};

export const setNews = (news) => {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
};

const LECTURER_DATA_KEY = 'lecturerData';

export const getLecturerData = () => {
    const dataJson = localStorage.getItem(LECTURER_DATA_KEY);
    return dataJson ? JSON.parse(dataJson) : null;
};

export const setLecturerData = (data) => {
    localStorage.setItem(LECTURER_DATA_KEY, JSON.stringify(data));
};

const CALENDAR_EVENTS_KEY = 'calendarEvents';

export const getEvents = () => {
    const eventsJson = localStorage.getItem(CALENDAR_EVENTS_KEY);
    return eventsJson ? JSON.parse(eventsJson) : [];
};

export const setEvents = (events) => {
    localStorage.setItem(CALENDAR_EVENTS_KEY, JSON.stringify(events));
};
