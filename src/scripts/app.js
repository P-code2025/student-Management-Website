
export function handleActiveNavItem() {
    const navItems = document.querySelectorAll('.navItem');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}