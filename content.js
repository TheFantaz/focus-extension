(function() {
  function showBlocker() {
    const blocker = document.createElement('div');
    blocker.style.position = 'fixed';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100vw';
    blocker.style.height = '100vh';
    blocker.style.background = '#fff';
    blocker.style.zIndex = '999999';
    blocker.style.display = 'flex';
    blocker.style.flexDirection = 'column';
    blocker.style.alignItems = 'center';
    blocker.style.justifyContent = 'center';

    // Add loading bar HTML
    blocker.innerHTML = `
      <div id="loading-bar-container" style="position:absolute;top:0;left:0;width:100%;height:8px;background:#eee;">
        <div id="loading-bar" style="height:100%;width:0%;background:#1976d2;transition:width 0.2s;"></div>
      </div>
      <h1 style="font-size:4em;color:#d32f2f;margin-top:40px;">STOP</h1>
      <p style="font-size:1.5em;">Take a moment to be mindful before continuing.</p>
      <div id="continue-btn-container"></div>
    `;

    document.body.appendChild(blocker);
    document.body.style.overflow = 'hidden';

    // Animate loading bar over 10 seconds
    const loadingBar = blocker.querySelector('#loading-bar');
    let start = null;
    const duration = 5000; // 10 seconds

    function animateBar(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      loadingBar.style.width = (progress * 100) + '%';
      if (progress < 1) {
        requestAnimationFrame(animateBar);
      }
    }
    requestAnimationFrame(animateBar);

    // Show the button after 10 seconds
    setTimeout(() => {
      const btnContainer = blocker.querySelector('#continue-btn-container');

      // Continue button
      const continueBtn = document.createElement('button');
      continueBtn.textContent = 'Continue to YouTube';
      continueBtn.style.fontSize = '1.2em';
      continueBtn.style.padding = '10px 20px';
      continueBtn.style.marginTop = '20px';
      continueBtn.onclick = () => {
        blocker.remove();
        document.body.style.overflow = '';
      };
      btnContainer.appendChild(continueBtn);

      // Close tab button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close Tab';
      closeBtn.style.fontSize = '1.2em';
      closeBtn.style.padding = '10px 20px';
      closeBtn.style.marginTop = '20px';
      closeBtn.style.marginLeft = '10px';
      closeBtn.onclick = () => {
        chrome.runtime.sendMessage({ action: 'closeTab' });
      };
      btnContainer.appendChild(closeBtn);
    }, duration);
  }

  if (document.body) {
    showBlocker();
  } else {
    window.addEventListener('DOMContentLoaded', showBlocker);
  }
})();