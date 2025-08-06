// Global variables
let currentPage = 'home';
let map = null;

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });

    document.getElementById(pageId + '-page').classList.remove('hidden');
    currentPage = pageId;

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-blue-600');
        btn.classList.add('text-gray-700');
    });

    if (pageId === 'donors' && !map) {
        initializeMap();
    }

    document.getElementById('mobile-menu').classList.add('hidden');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Initialize map for donor search
function initializeMap() {
    setTimeout(() => {
        const mapElement = document.getElementById('donor-map');
        if (mapElement && !map) {
            map = L.map('donor-map').setView([28.6139, 77.2090], 12); // Delhi

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            const donors = [
                { lat: 28.6139, lng: 77.2090, name: "Rajesh Kumar", bloodType: "B+" },
                { lat: 28.6289, lng: 77.2065, name: "Priya Sharma", bloodType: "B+" },
                { lat: 28.6089, lng: 77.2190, name: "Amit Patel", bloodType: "B+" }
            ];

            donors.forEach(donor => {
                L.marker([donor.lat, donor.lng])
                    .addTo(map)
                    .bindPopup(
                        `<b>${donor.name}</b><br>Blood Type: ${donor.bloodType}<br><button class="bg-green-600 text-white px-2 py-1 rounded text-sm mt-1">Contact</button>`
                    );
            });
        }
    }, 100);
}

// Search donors
function searchDonors() {
    alert('Searching for donors... This would connect to the donor database and show real-time results.');
}

// Chatbot functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    addChatMessage(message, 'user');
    input.value = '';

    setTimeout(() => {
        const responses = [
            "I understand you need assistance. Let me help you with that. Based on your symptoms, I recommend consulting with your hematologist.",
            "For blood transfusion scheduling, I can help you find the nearest blood bank. Would you like me to locate one for you?",
            "Your medication reminder has been set. I'll notify you 30 minutes before your next dose.",
            "I've found 3 hospitals within 5km of your location that specialize in Thalassemia care. Would you like their contact details?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'ai');
    }, 1000);
}

function quickMessage(message) {
    document.getElementById('chat-input').value = message;
    sendMessage();
}

function addChatMessage(message, sender) {
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender === 'user'
        ? 'chat-bubble-user text-white ml-auto'
        : 'chat-bubble-ai text-gray-800'} p-4 rounded-lg mb-4 max-w-xs`;
    messageDiv.textContent = message;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Emergency alert
function sendEmergencyAlert(event) {
    event.preventDefault();
    alert('🚨 Emergency alert sent successfully!\n\nYour alert has been sent to:\n• Nearby registered donors\n• Emergency blood banks\n• Partner hospitals\n\nYou will receive confirmation calls shortly.');
}

function callEmergency() {
    alert('📞 Calling Emergency Services (108)...\n\nThis would initiate a call to emergency services in a real implementation.');
}

// FAQ toggle
function toggleFAQ(id) {
    const faq = document.getElementById(`faq-${id}`);
    const button = faq.previousElementSibling.querySelector('span');

    if (faq.classList.contains('hidden')) {
        faq.classList.remove('hidden');
        button.textContent = '−';
    } else {
        faq.classList.add('hidden');
        button.textContent = '+';
    }
}

// Auth form toggle
function showAuthForm(type) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.className = 'flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-white text-blue-600 shadow-sm';
        registerTab.className = 'flex-1 py-2 px-4 rounded-md font-medium transition-colors text-gray-600 hover:text-gray-800';
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginTab.className = 'flex-1 py-2 px-4 rounded-md font-medium transition-colors text-gray-600 hover:text-gray-800';
        registerTab.className = 'flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-white text-blue-600 shadow-sm';
    }
}

// Handle Enter key for chat input
document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
