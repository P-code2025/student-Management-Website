import { renderStudents, initializeStudentTableEvents } from './scripts/components/studentTable.js';
import { initializeStudentModal } from './scripts/components/studentModal.js';
import { getStudents, setStudents } from './scripts/utils/helpers.js';
import { handleActiveNavItem } from './scripts/app.js'; 

document.addEventListener('DOMContentLoaded', () => {

    if (!getStudents() || getStudents().length === 0) {
        const initialStudents = [
            {
                id: 1,
                avatar: '../../public/images/avatar1.jpg',
                studentCode: 'B24DCCC11',
                fullName: 'Mông Đức Hiếu',
                gender: 'Nam',
                role: 'Thành viên'
            },
            {
                id: 2,
                avatar: '../../public/images/avatar2.jpg',
                studentCode: 'B24DCCC01',
                fullName: 'Nguyễn Đức Dũng',
                gender: 'Nam',
                role: 'Thành viên'
            },
            {
                id: 3,
                avatar: '../../public/images/avatar3.jpg',
                studentCode: 'B24DCCC37',
                fullName: 'Nguyễn Cao Quảng',
                gender: 'Nam',
                role: 'Thành viên'
            },
            {
                id: 4,
                avatar: '../../public/images/avatar4.jpg',
                studentCode: 'B24DCCC13',
                fullName: 'Văn Phương Nam',
                gender: 'Nam',
                role: 'Thành viên'
            },
            {
                id: 5,
                avatar: '../../public/images/avatar5.jpg',
                studentCode: 'B24DCCC03',
                fullName: 'Đỗ Công An',
                gender: 'Nam',
                role: 'Thành viên'
            },
            {
                id: 6,
                avatar: '../../public/images/avatar5.jpg',
                studentCode: 'B24DCCC03',
                fullName: 'Đỗ Công An',
                gender: 'Nam',
                role: 'Thành viên'
            }
        ];
        setStudents(initialStudents);  
    }

    renderStudents();  
    initializeStudentTableEvents();  
    initializeStudentModal();  
    handleActiveNavItem();
});