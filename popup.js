// Update the relevant fields with the new data.
const setDOMInfo = info => {
    document.getElementById('total').textContent = info.total;
    document.getElementById('img').textContent = info.img;
  };
  
  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'DOMInfo'},
          // ...also specifying a callback to be called 
          //    from the receiving end (content script).
          setDOMInfo);
    });
  });

 

  // When the user clicks the button on popup, web components are highlighted
  let button = document.getElementById('btn');

  async function getCurrentTabId() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }


  button.addEventListener('click', async (tab) => {
    let currentTab = getCurrentTabId();
    // Insert the .js file to highlight the img elements on the webpage
    await chrome.scripting.executeScript({
      files: ["element-highlighter.js"],
      target: { tabId: currentTab.id},
      });
    });