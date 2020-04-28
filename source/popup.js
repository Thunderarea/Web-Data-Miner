const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("mouseup", getData);
});


function getData(event) {
  if (event.target.name === "runFilesCode") {
    var files = document.getElementById("files").files;
    if (files.length > 0) {
      var reader = new FileReader();
      reader.onload = function(e) {
        sendData(reader.result);
      }
      reader.readAsText(files[0]);
    }
  } else {
    sendData(document.querySelector("textarea").value);
  }

}

function sendData(code) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {
        code: code
      });
    }
  });
}
