document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('input-box').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputBox = document.getElementById('input-box');
    const chatBox = document.getElementById('chat-box');
    
    // Display user's message
    chatBox.innerHTML += `<div>User: ${inputBox.value}</div>`;
    
    sendToAI(inputBox.value);  // Sending the message to the AI backend for processing

    // Clear the input box
    inputBox.value = '';
}
