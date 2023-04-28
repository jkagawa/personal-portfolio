// Get form submit status from local storage
const message_sent = localStorage.getItem("message_sent");

// Add event listener to form submit
const form = document.getElementById("form");
form.addEventListener("submit", () => sendMessage());

// If form was submitted, show toast message
if(message_sent === 'true') {
    const toast = document.getElementById("toast");
    toast.style.display = "flex";
    hideToast(toast);
    
} 

// Set form submit status to true
function sendMessage() {
    localStorage.setItem("message_sent", true);
}

// Function to hide toast message after 7 seconds
function hideToast(toast) {
    setTimeout(() => {
        localStorage.setItem("message_sent", false);
        toast.style.opacity = 0;
    }, 7000);
}

// Function to close out toast message
function closeToast() {
    const toast = document.getElementById("toast");
    toast.style.display = "none";
    localStorage.setItem("message_sent", false);
}