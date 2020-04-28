chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  //the code which will inject with the user code in the sites
  let requiredCode = function() {

    //create the panel where the results will appear
    let panel = document.createElement("DIV");
    panel.id = "panel_wdmthunderarea";
    panel.style.setProperty("right", "10px");
    document.body.appendChild(panel);
    let header = document.createElement("DIV");
    header.id = "header_wdmthunderarea";
    panel.appendChild(header);
    let moveBar = document.createElement("DIV");
    moveBar.id = "moveBar_wdmthunderarea";
    header.appendChild(moveBar);
    let closePanelButton = document.createElement("DIV");
    closePanelButton.id = "closePanelButton_wdmthunderarea";
    header.appendChild(closePanelButton);
    let copyButton = document.createElement("DIV");
    copyButton.id = "copyButton_wdmthunderarea";
    panel.appendChild(copyButton);
    let textarea = document.createElement("TEXTAREA");
    textarea.id = "textarea_wdmthunderarea";
    textarea.placeholder = "No results. Check if you have use console.log function to print the results or check the browser's console for errors in your code."
    panel.appendChild(textarea);

    //close panel button. close panel when user clicks it
    closePanelButton.addEventListener("mouseup", function() {
      panel.parentNode.removeChild(panel);
    });

    //copy button. copy the results to clipboard when click
    copyButton.addEventListener("mouseup", function() {
      const el = document.getElementById("textarea_wdmthunderarea"); //the element which has the text to copy
      const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ?
        document.getSelection().getRangeAt(0) // Store selection if found
        :
        false; // Mark as false to know no selection existed before
      el.select(); // Select the <textarea> content
      document.execCommand('copy'); // Copy
      if (selected) { // If a selection existed before copying
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection().addRange(selected); // Restore the original selection
      }
    });

    //functions to move the panel
    var mousePosition; //the mouse position
    var offset = [0, 0]; //the distance of mouse pointer from the edge of the panel[0,0]
    var isDown = false; //if the mouse is pressed

    moveBar.addEventListener('mousedown', function(event) { //when the mouse is pressed
      event.preventDefault();
      isDown = true; //the mouse is pressed
      offset = [
        panel.offsetLeft - event.clientX,
        panel.offsetTop - event.clientY
      ];
    }, true);

    document.addEventListener('mouseup', function() {
      isDown = false; //the mouse is not pressed
    }, true);

    document.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (isDown) { //if the mouse is pressed
        mousePosition = { // the mouse's x,y position
          x: event.clientX,
          y: event.clientY
        };
        panel.style.removeProperty("right");
        //changes the panel's position
        panel.style.left = (mousePosition.x + offset[0]) + 'px';
        panel.style.top = (mousePosition.y + offset[1]) + 'px';
      }
    }, true);

    //overwrites console.log
    (function() {
      if (!console) {
        console = {};
      }
      //var oldConsole = console.log();
      var logger = document.getElementById('textarea_wdmthunderarea'); //sets where the results will appear
      console.log = function(message) {
        if (typeof message == 'object') {
          //styles the results which their type is "object"
          logger.value += (JSON && JSON.stringify ? JSON.stringify(message) : String(message));
        } else {
          logger.value += message;
        }
        logger.value += '\r\n';
      }
    })();
  };

  let codeForInjection = String(requiredCode); //converts to string the "requiredCode" variable
  codeForInjection = codeForInjection.substring(0, codeForInjection.length - 1); //removes the last "}" from code to add further code
  codeForInjection += request.code; // adds the user code
  codeForInjection += "}"; //adds again the "}" to code's end

  let injectScript = document.createElement("script"); //creates a script element
  injectScript.id = "thunderareaScript"; //sets script's id
  injectScript.textContent = "(" + codeForInjection + ")()"; //puts code to script element

  let script = document.getElementById("thunderareaScript"); //my script element
  if (script != null) { // if script exists
    script.parentNode.removeChild(script); // remove it
    let panel = document.getElementById("panel_wdmthunderarea"); //panel element
    if (panel != null) panel.parentNode.removeChild(panel); //if panel exists remove it
  }
  document.documentElement.appendChild(injectScript); //adds script element
});
