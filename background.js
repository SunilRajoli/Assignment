// background.js

// Event listener to handle when a contact's details are received from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'storeContactDetails') {
      storeContactDetails(message.contact);
    } else if (message.action === 'saveContactNotes') {
      saveContactNotes(message.phoneNumber, message.notes);
    }
  });
  
  // Function to store contact details in the database
  function storeContactDetails(contact) {
    // Retrieve existing contacts from storage
    let contacts = getContacts();
    // Check if the contact already exists
    let existingContactIndex = contacts.findIndex(c => c.phoneNumber === contact.phoneNumber);
    if (existingContactIndex !== -1) {
      // Update existing contact
      contacts[existingContactIndex] = contact;
    } else {
      // Add new contact
      contacts.push(contact);
    }
    // Save updated contacts to storage
    saveContacts(contacts);
  }
  
  // Function to save contact notes in the database
  function saveContactNotes(phoneNumber, notes) {
    // Save notes for the contact in storage
    localStorage.setItem(`notes_${phoneNumber}`, notes);
  }
  
  // Function to retrieve contacts from localStorage
  function getContacts() {
    const contactsJSON = localStorage.getItem('contacts');
    return contactsJSON ? JSON.parse(contactsJSON) : [];
  }
  
  // Function to save contacts to localStorage
  function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  