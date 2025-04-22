document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
  
    const userName = localStorage.getItem('userName');
  
    // Showing greeting if signed in
    if (userName) {
      const greetingDiv = document.createElement('div');
      greetingDiv.id = 'userGreeting';
      greetingDiv.textContent = `Welcome, ${userName}`;
      greetingDiv.style.textAlign = 'center';
      greetingDiv.style.margin = '10px';
      greetingDiv.style.fontWeight = '600';
      document.body.insertBefore(greetingDiv, document.body.children[1]); // below header
  
      // Sign out logic
      signInBtn.textContent = 'Sign Out';
      signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userName');
        location.reload();
      });
      signUpBtn.style.display = 'none';
    } else {
      // Redirecting to sign-in if user tries to access from direct load (extra protection)
      const isHomePage = window.location.pathname.includes('index.html');
      if (isHomePage) {
        // Already blocked via script tag in index.html
      }
  
      // Redirecting clicks to proper pages
      signInBtn.setAttribute('href', 'signin.html');
      signUpBtn.setAttribute('href', 'signup.html');
    }
  
    // Preventing unauthorized test button clicks
    initializeGameLaunchers();
  
    // Logo fallback
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
      logo.onerror = () => handleLogoError(logo);
    });
  });
  
  function initializeGameLaunchers() {
    const testButtons = document.querySelectorAll('.test-btn');
  
    testButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const userName = localStorage.getItem('userName');
        if (!userName) {
          e.preventDefault();
          alert('Please sign in to access this test.');
          window.location.href = 'signin.html';
          return;
        }
  
        // Click animation
        button.classList.add('btn-clicked');
        setTimeout(() => {
          button.classList.remove('btn-clicked');
        }, 200);
      });
    });
  }
  
  function handleLogoError(img) {
    img.onerror = null;
    img.src =
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="%236352e3"/><path d="M15 15 L35 35 M15 35 L35 15" stroke="white" stroke-width="5"/></svg>';
  }
  