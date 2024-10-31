let stage = 0;
let destination, startDate, endDate, activities;
const activityOptions = ['sightseeing', 'hiking', 'relaxing', 'cultural experiences'];

function sendMessage() {
    const input = document.getElementById('userInput');
    const userMessage = input.value;

    if (userMessage.trim() === '') return;

    addMessage(userMessage, 'user');
    input.value = '';

    setTimeout(() => {
        processResponse(userMessage);
    }, 500);
}

function addMessage(text, sender) {
    const chat = document.getElementById('chat');
    const message = document.createElement('div');
    message.className = sender;
    message.innerText = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function processResponse(userMessage) {
    let botMessage = '';

    // Convert user message to lower case for easier comparison
    const userInput = userMessage.toLowerCase();

    switch (stage) {
        case 0:
            botMessage = 'Hello! Let’s plan your vacation. Where would you like to go?';
            stage++;
            break;
        case 1:
            destination = userMessage;
            botMessage = `Great choice! When do you want to start your vacation? (Please enter a date, e.g., 2024-10-15)`;
            stage++;
            break;
        case 2:
            startDate = userMessage;
            botMessage = 'And when do you want to return? (Please enter a date, e.g., 2024-10-25)';
            stage++;
            break;
        case 3:
            endDate = userMessage;
            botMessage = `Awesome! What activities are you interested in? You can choose from: ${activityOptions.join(', ')}.`;
            stage++;
            break;
        case 4:
            activities = userMessage.split(',').map(activity => activity.trim());
            botMessage = `Summary of your vacation plan:\nDestination: ${destination}\nStart Date: ${startDate}\nEnd Date: ${endDate}\nActivities: ${activities.join(', ')}\n\nIs this correct? (yes/no)`;
            stage++;
            break;
        case 5:
            if (userInput === 'yes') {
                botMessage = 'Your vacation plan has been confirmed. Enjoy your trip!';
            } else {
                botMessage = 'Booking has been canceled. Let me know if you want to plan again.';
            }
            stage = 0; // Reset for a new plan
            break;
        default:
            // Add a case for thank you or similar expressions
            if (userInput.includes('thank you') || userInput.includes('thanks')) {
                botMessage = 'You’re welcome! If you need further assistance, just let me know. Enjoy your vacation!';
                stage = 0; // Reset for a new plan
            } else {
                botMessage = 'Sorry, I did not understand that.';
            }
            break;
    }

    addMessage(botMessage, 'bot');
}
