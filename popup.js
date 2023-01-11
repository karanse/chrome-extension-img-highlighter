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
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }


  let btnContainer = document.getElementById("btn-container");
  btnContainer.addEventListener('click', (e) => {
    if ( e.target.classList == "OFF") {
      e.target.classList.remove("OFF");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ["img-highlighter.js"]
        });
      });
      e.target.classList.add("ON");
      console.log(e.target.classList)
    } else if (e.target.classList == "ON") {
      e.target.classList.remove("ON");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ["highlight-remove.js"]
        });
      });
      e.target.classList.add("OFF");
      console.log(e.target.classList);
    }
  })






    /*

    
  let button1 = document.getElementById("btn1");
  let button2 = document.getElementById("btn2");
  
  button1.addEventListener('click', async (tab) => {
    let currentTab = await getCurrentTab();
    console.log(currentTab.id);
     // Insert the .js file to highlight the img elements on the webpage
    await chrome.scripting.executeScript({
      target: {tabId: currentTab.id},
      files: ["img-highlighter.js"]
    });
    });

  button2.addEventListener('click', async (tab) => {
    let currentTab = await getCurrentTab();
    console.log(currentTab.id);
  await chrome.scripting.executeScript({
      target: {tabId: currentTab.id},
      files: ["highlight-remove.js"]
  });
    });
    */