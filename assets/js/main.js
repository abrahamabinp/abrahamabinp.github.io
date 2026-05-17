// Main JavaScript file for the Tolkien-inspired Jekyll blog

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add reading time to posts
  const postContent = document.querySelector('.post-content');
  if (postContent) {
    const text = postContent.textContent;
    const wpm = 225; // Average reading speed
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    
    const readingTime = document.createElement('span');
    readingTime.className = 'reading-time';
    readingTime.textContent = ` • ${time} min read`;
    
    const postMeta = document.querySelector('.post-meta');
    if (postMeta) {
      postMeta.appendChild(readingTime);
    }
  }

  // Mobile menu toggle
  const navTrigger = document.querySelector('.nav-trigger');
  const siteNav = document.querySelector('.site-nav');
  
  if (navTrigger && siteNav) {
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!siteNav.contains(e.target) && navTrigger.checked) {
        navTrigger.checked = false;
      }
    });
  }

  // Add copy button to code blocks
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    
    block.style.position = 'relative';
    block.appendChild(button);
    
    block.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
    });
    
    block.addEventListener('mouseleave', () => {
      button.style.opacity = '0';
    });
    
    button.addEventListener('click', () => {
      const code = block.querySelector('code');
      const text = code ? code.textContent : block.textContent;
      
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
  });

  // Enhance external links
  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Add progress bar for posts
  if (document.querySelector('.post')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  // Simple fade-in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe post previews and other elements
  const elements = document.querySelectorAll('.post-preview, .profile-card, .archive-year');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
  });

  // Simple scroll to top button
  const scrollButton = document.createElement('button');
  scrollButton.textContent = '↑';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: #2d4a37;
    color: #f4e4bc;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  `;
  
  document.body.appendChild(scrollButton);

  // Show/hide scroll button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = '0.8';
    } else {
      scrollButton.style.opacity = '0';
    }
  });

  // Scroll to top when clicked
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Add hover effect
  scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.opacity = '1';
    scrollButton.style.background = '#8b6914';
  });

  scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.opacity = window.pageYOffset > 300 ? '0.8' : '0';
    scrollButton.style.background = '#2d4a37';
  });
});

// CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);