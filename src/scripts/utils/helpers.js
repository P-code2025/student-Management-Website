 
const STUDENTS_STORAGE_KEY = 'studentsData';

export const getStudents = () => {
    const studentsJson = localStorage.getItem(STUDENTS_STORAGE_KEY);
    return studentsJson ? JSON.parse(studentsJson) : [];
};

export const setStudents = (students) => {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
};
