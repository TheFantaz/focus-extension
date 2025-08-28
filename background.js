// run persistent scripts in the background

const mindfulnessReminder = () => {
    // Set a reminder interval (in milliseconds)
    const reminderInterval = 15 * 60 * 1000; // 15 minutes

    // Function to send a reminder notification
    const sendReminder = () => {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Mindfulness Reminder',
            message: 'Take a moment to breathe and refocus!',
            priority: 2
        });
    };

    // Set up the reminder to trigger at the specified interval
    setInterval(sendReminder, reminderInterval);
};

// Listen for the extension to be installed or updated
chrome.runtime.onInstalled.addListener(() => {
    mindfulnessReminder();
});

// Listen for browser action clicks
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL('popup/popup.html') });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'closeTab' && sender.tab && sender.tab.id) {
    chrome.tabs.remove(sender.tab.id);
  }
});