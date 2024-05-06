// popup.js

document.addEventListener('DOMContentLoaded', function() {
    const unreadButton = document.getElementById('unread-btn');
    const createFilterButton = document.getElementById('create-filter-btn');
    const saveNotesButton = document.getElementById('save-notes-btn');
  
    // Add event listener for Unread button click
    unreadButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'filterUnread' });
      });
    });
  
    // Add event listener for Create Filter button click
    createFilterButton.addEventListener('click', function() {
      const filterName = prompt("Enter filter name:");
      if (filterName) {
        // Send a message to the content script to create the filter with the specified name
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'createFilter', filterName: filterName });
        });
      }
    });
  
    // Add event listener for Save Notes button click
    saveNotesButton.addEventListener('click', function() {
      const notes = prompt("Enter notes:");
      if (notes) {
        // Send a message to the content script to save the notes for the selected contact
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'saveNotes', notes: notes });
        });
      }
    });
  });
  