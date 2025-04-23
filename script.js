
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
  
