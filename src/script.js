// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Terminal typing effect
function typeTerminalText() {
    const terminal = document.querySelector('.terminal-body');
    if(!terminal) return;
    
    const commands = [
        '$ docker build -t portfolio .',
        'Sending build context to Docker daemon...',
        'Step 1/7 : FROM nginx:alpine',
        'Step 2/7 : COPY src/ /usr/share/nginx/html',
        'Step 3/7 : EXPOSE 80',
        'Step 4/7 : CMD ["nginx", "-g", "daemon off;"]',
        'Successfully built portfolio-image',
        'Successfully tagged portfolio:latest',
        '$ docker run -p 8080:80 portfolio',
        '✅ Portfolio running on http://localhost:8080'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let currentText = '';
    
    function type() {
        if(commandIndex < commands.length) {
            if(charIndex < commands[commandIndex].length) {
                currentText += commands[commandIndex].charAt(charIndex);
                terminal.querySelector('.cursor').previousElementSibling.textContent = currentText;
                charIndex++;
                setTimeout(type, 50);
            } else {
                currentText = '';
                charIndex = 0;
                commandIndex++;
                setTimeout(type, 1000);
            }
        }
    }
    
    setTimeout(type, 2000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    typeTerminalText();
    
    // Add active class to navbar on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});