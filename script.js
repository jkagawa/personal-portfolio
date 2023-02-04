const message_sent = localStorage.getItem("message_sent");
const is_contact_form = location.pathname.split('/').pop() == "contact.html";

if(is_contact_form) {
    const form = document.getElementById("form");
    form.addEventListener("submit", () => sendMessage());
}

if(message_sent === 'true') {
    const toast = document.getElementById("toast");
    // const toastText = document.getElementById("toast-text");
    // toastText.textContent = `Thank you, ${username}, your message was sent`;
    toast.style.display = "flex";
    hideToast(toast);
    
} else {
    signInItem.style.display = "block";
    signOutItem.style.display = "none";
}

function sendMessage() {
    localStorage.setItem("message_sent", true);
    window.location.href = "index.html";
}

function hideToast(toast) {
    setTimeout(() => {
        localStorage.setItem("message_sent", false);
        toast.style.opacity = 0;
    }, 5000);
}

function closeToast() {
    const toast = document.getElementById("toast");
    toast.style.display = "none";
}