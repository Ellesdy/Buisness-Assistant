// Create the chatbox iframe
const chatIframe = document.createElement('iframe');
chatIframe.id = 'chatbox-iframe';
chatIframe.frameBorder = '0'; // Remove the default border
chatIframe.style.position = 'fixed'; // Set position to fixed
chatIframe.style.bottom = '10px'; // Set initial position from bottom
chatIframe.style.right = '10px'; // Set initial position from right
document.body.appendChild(chatIframe); // Append the iframe to the document body

// Fetch the content of chatFrame.html and set it as the iframe's srcdoc
fetch(chrome.runtime.getURL('src/chatFrame.html'))
.then((response) => {
  if (!response.ok) throw new Error('Network response was not ok');
  return response.text();
})
.then((data) => {
  // Replace placeholders with actual paths
  data = data.replace('PLACEHOLDER_POPUP_CSS', chrome.runtime.getURL('src/styles/popup.css'));
  data = data.replace('PLACEHOLDER_POPUP_JS', chrome.runtime.getURL('src/scripts/popup.js'));
  data = data.replace('PLACEHOLDER_AI_INTEGRATION_JS', chrome.runtime.getURL('src/scripts/aiIntegration.js'));
  chatIframe.srcdoc = data;
})
.catch((error) => {
  console.error("Error fetching chatFrame.html:", error);
});

// Make the chatbox draggable using the header
let isDragging = false;
chatIframe.onload = function() {
  const header = chatIframe.contentWindow.document.getElementById('chatbox-header');
  header.addEventListener('mousedown', function(e) {
    isDragging = true;
    document.addEventListener('mousemove', onMouseMove);
  });
  header.addEventListener('mouseup', function() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
  });
};

function onMouseMove(e) {
  if (isDragging) {
    const x = e.clientX;
    const y = e.clientY;
    chatIframe.style.right = (window.innerWidth - x - chatIframe.offsetWidth) + 'px';
    chatIframe.style.bottom = (window.innerHeight - y - chatIframe.offsetHeight) + 'px';
  }
}
