document.getElementById('refresh').addEventListener('click', () => {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Mindfulness Reminder',
        message: 'Take a moment to breathe and refocus!',
        priority: 2
    });
});