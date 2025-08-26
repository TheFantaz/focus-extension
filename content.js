// document.documentElement.innerHTML = `
//   <body style="display:flex;align-items:center;justify-content:center;height:100vh;background:#fff;">
//     <div style="text-align:center;">
//       <h1 style="font-size:4em;color:#d32f2f;">STOP</h1>
//       <p style="font-size:1.5em;">Take a moment to be mindful before continuing.</p>
//     </div>
//   </body>
// `;

(function() {
  // Create a fullscreen overlay
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

  blocker.innerHTML = `
    <h1 style="font-size:4em;color:#d32f2f;">STOP</h1>
    <p style="font-size:1.5em;">Take a moment to be mindful before continuing.</p>
  `;

  document.body.appendChild(blocker);

  // Prevent further interaction
  document.body.style.overflow = 'hidden';
})();