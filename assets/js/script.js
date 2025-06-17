// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active', 'bg-blue-500'));
        filterBtns.forEach(btn => btn.classList.add('bg-gray-700'));
        
        // Add active class to clicked button
        btn.classList.add('active', 'bg-blue-500');
        btn.classList.remove('bg-gray-700');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.remove('opacity-100', 'visible');
        backToTopBtn.classList.add('opacity-0', 'invisible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});
















// Background bubbles creation and interaction
document.addEventListener('DOMContentLoaded', function() {
  // Create bubbles
  const bubbleCount = 15;
  const colors = ['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.15)', 'rgba(59, 130, 246, 0.1)'];
  
  for (let i = 0; i < bubbleCount; i++) {
    createBubble(colors);
  }
  
  // Mouse move interaction
  document.addEventListener('mousemove', handleMouseMove);
});

function createBubble(colors) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble floating';
  
  // Random properties
  const size = Math.random() * 100 + 50; // 50-150px
  const posX = Math.random() * window.innerWidth;
  const posY = Math.random() * window.innerHeight;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const delay = Math.random() * 5;
  
  // Apply styles
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${posX}px`;
  bubble.style.top = `${posY}px`;
  bubble.style.backgroundColor = color;
  bubble.style.animationDelay = `${delay}s`;
  
  document.body.appendChild(bubble);
  
  // Store original position
  bubble.originalX = posX;
  bubble.originalY = posY;
}

function handleMouseMove(e) {
  const bubbles = document.querySelectorAll('.bubble');
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  bubbles.forEach(bubble => {
    // Get bubble position and size
    const rect = bubble.getBoundingClientRect();
    const bubbleX = rect.left + rect.width / 2;
    const bubbleY = rect.top + rect.height / 2;
    const bubbleSize = rect.width;
    
    // Calculate distance from mouse to bubble center
    const distance = Math.sqrt(
      Math.pow(mouseX - bubbleX, 2) + 
      Math.pow(mouseY - bubbleY, 2)
    );
    
    // If mouse is close enough to the bubble
    if (distance < 200) {
      // Calculate push direction
      const angle = Math.atan2(bubbleY - mouseY, bubbleX - mouseX);
      const pushDistance = (1 - distance / 200) * 50; // Max 50px push
      
      // New position
      const newX = parseFloat(bubble.originalX) + Math.cos(angle) * pushDistance;
      const newY = parseFloat(bubble.originalY) + Math.sin(angle) * pushDistance;
      
      // Apply new position with smooth transition
      bubble.style.transform = `translate(${newX - parseFloat(bubble.originalX)}px, ${newY - parseFloat(bubble.originalY)}px)`;
    } else {
      // Return to original position
      bubble.style.transform = 'translate(0, 0)';
    }
  });
}

















// Enhanced magnetic effect for specific elements
document.querySelectorAll('[data-magnetic]').forEach(el => {
  el.originalTransform = '';
  
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const distanceX = x - centerX;
    const distanceY = y - centerY;
    
    // Calculate distance percentage
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
    const percentage = distance / maxDistance;
    
    // Only move if mouse is close enough
    if (percentage < 0.7) {
      const moveX = distanceX * 0.2;
      const moveY = distanceY * 0.2;
      
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      el.style.transform = el.originalTransform;
    }
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = el.originalTransform;
  });
});















// Enhanced typing animation with smoother transitions
const typingText = document.getElementById('typing-text');
const typingCursor = document.querySelector('.typing-cursor');

const titles = [
    "Co. Founder of EH Code",
    "Full Stack Developer",
    "Web Designer",
    "Web Developer",
    "Mobile App Developer",
    "Backend Programmer",
    "Game Developer",
    "Software Engineer",
    "Database Specialist",
    "DevOps Engineer",
    "Data Scientist (Data Analysis, Visualization)",
];

let currentTitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let pauseBetweenTitles = 2000;
let isWaiting = false;

function typeTitle() {
    if (isWaiting) return;
    
    const currentTitle = titles[currentTitleIndex];
    
    if (isDeleting) {
        // Deleting phase
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30; // Faster when deleting
        
        if (charIndex === 0) {
            isDeleting = false;
            isWaiting = true;
            setTimeout(() => {
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                isWaiting = false;
                typeTitle();
            }, 500); // Pause before typing next title
            return;
        }
    } else {
        // Typing phase
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100 + Math.random() * 50; // Slightly random speed for natural feel
        
        if (charIndex === currentTitle.length) {
            isDeleting = true;
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                typeTitle();
            }, pauseBetweenTitles); // Pause at end of typing
            return;
        }
    }
    
    setTimeout(typeTitle, typingSpeed);
}

// Start the typing effect
setTimeout(typeTitle, 1000);

// Cursor animation control
typingText.addEventListener('mouseenter', () => {
    typingCursor.style.animation = 'none';
    typingCursor.style.opacity = '1';
});

typingText.addEventListener('mouseleave', () => {
    typingCursor.style.animation = 'blink 1s infinite';
});