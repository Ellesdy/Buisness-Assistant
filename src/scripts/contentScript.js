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

var pageMouseX, pageMouseY;
var frameTop, frameLeft;

window.addEventListener('message', evt => {
    const data = evt.data;

    switch (data.msg) {
        case 'CHATBOX_DRAG_START':
            handleDragStart(data.mouseX, data.mouseY);
            break;
        case 'CHATBOX_DRAG_MOUSEMOVE':
            handleFrameMousemove(data.offsetX, data.offsetY);
            break;
        case 'CHATBOX_DRAG_END':
            handleDragEnd();
            break;
    }
});

function handleDragStart(mouseX, mouseY) {
    frameTop = chatIframe.offsetTop;
    frameLeft = chatIframe.offsetLeft;
    pageMouseX = frameLeft + mouseX;
    pageMouseY = frameTop + mouseY;

    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('mousemove', handlePageMousemove);
}

function handleDragEnd() {
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('mousemove', handlePageMousemove);
}

function handleFrameMousemove(offsetX, offsetY) {
    frameTop += offsetY;
    frameLeft += offsetX;
    chatIframe.style.top = frameTop + 'px';
    chatIframe.style.left = frameLeft + 'px';

    pageMouseX += offsetX;
    pageMouseY += offsetY;
}

function handlePageMousemove(evt) {
    frameTop += evt.clientX - pageMouseX;
    frameLeft += evt.clientY - pageMouseY;
    chatIframe.style.top = frameTop + 'px';
    chatIframe.style.left = frameLeft + 'px';

    pageMouseX = evt.clientX;
    pageMouseY = evt.clientY;
}
