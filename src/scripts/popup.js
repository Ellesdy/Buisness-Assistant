document.getElementById('send-btn').addEventListener('click', sendMessage);
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
    
    // TODO: Send the message to GPT-4 and get the response

    // Clear the input box
    inputBox.value = '';
}
