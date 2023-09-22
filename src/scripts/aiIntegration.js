// Function to send the user's message to the backend for AI processing
function sendToAI(message) {
  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", "http://localhost:3000/ask-ai", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayAIResponse(response.message);
    } else {
      console.error("Request failed:", xhr.responseText);
      displayAIResponse("Sorry, I couldn't process that request.");
    }
  };

  // Handle any errors
  xhr.onerror = function () {
    console.error("Request failed:", xhr.responseText);
    displayAIResponse("Sorry, I couldn't process that request.");
  };

  // Send the request with the user's message
  xhr.send(JSON.stringify({ message: message }));
}

// Function to display the AI's response in the chat box
function displayAIResponse(response) {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div>AI: ${response}</div>`;
}

// Event listener for the send button
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("send-button").addEventListener("click", function () {
    const userMessage = document.getElementById("input-box").value;
    sendToAI(userMessage);
  });
});
