// content.js

// Function to send contact details to background script for storage
function sendContactDetails(contact) {
    chrome.runtime.sendMessage({ action: 'storeContactDetails', contact: contact });
  }
  
  // Function to send notes for a contact to background script for storage
  function sendContactNotes(contactPhoneNumber, notes) {
    chrome.runtime.sendMessage({ action: 'saveContactNotes', phoneNumber: contactPhoneNumber, notes: notes });
  }
  
  // Function to extract contact details from a chat element
  function extractContactDetails(chatElement) {
    return {
      name: chatElement.querySelector('.chat-title').innerText.trim(),
      phoneNumber: chatElement.querySelector('.chat-meta').innerText.trim()
    };
  }
  
  // Add event listener to capture chat clicks
  document.addEventListener('click', function(event) {
    // Check if the clicked element is a chat element
    if (event.target.classList.contains('chat')) {
      // Extract contact details from the clicked chat element
      let contact = extractContactDetails(event.target);
      // Send contact details to background script for storage
      sendContactDetails(contact);
    }
  });
  
  // Listen for messages from popup or other parts of the extension
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'saveNotes') {
      const contactPhoneNumber = message.phoneNumber;
      const notes = message.notes;
      // Send contact notes to background script for storage
      sendContactNotes(contactPhoneNumber, notes);
    }
  });
  