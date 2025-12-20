
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const userNameElement = document.querySelector('.user-name');

    if (username && userNameElement) {
        userNameElement.textContent = username;
    } else if (userNameElement) {
        userNameElement.textContent = 'Guest';
    }

    //hover animation
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
        });
    });
});

function cancelLogout() {
    // Add animation before redirecting
    document.querySelector('.logout-card').style.transform = 'translateY(20px)';
    document.querySelector('.logout-card').style.opacity = '0';
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'bookings.html';  // You already have this page
    }, 300);
}

function confirmLogout() {
    // Add loading state to button
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
    logoutBtn.disabled = true;

    setTimeout(() => {
        // Clear login data
        localStorage.removeItem('username');
        localStorage.removeItem('token');

        window.location.href = 'dashboard.html';
    }, 1500);
}


