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

// Sticky header
window.onscroll = function() {stickyHeader()};

var firstHeader = document.getElementById("portfolio-header");
// var secondHeader = document.getElementById("background-header");


function stickyHeader() {
    var scrollValue = window.pageYOffset + 70;
    // var stickyFirstHeader = window.innerHeight - 96;
    var stickyFirstHeader = 500;
    // var stickySecondHeader = window.innerHeight + 392;

    if (scrollValue > stickyFirstHeader) {
        firstHeader.classList.add("sticky");
        // secondHeader.classList.remove("sticky");
    }
    // else if (scrollValue > stickySecondHeader) {
    //     firstHeader.classList.remove("sticky");
    //     secondHeader.classList.add("sticky");
    // } 
    else {
        firstHeader.classList.remove("sticky");
        // secondHeader.classList.remove("sticky");
    }
}

// Scroll to top
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Scroll to bottom
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

// Scroll to portfolio section
function scrollToPortfolio() {
    window.scrollTo(0, window.innerHeight - 166);
}

// Up Icon
const upIcon = document.getElementById('UpIcon');

addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
        upIcon.style.display = 'block';
    }
    else {
        upIcon.style.display = 'none';
    }
});