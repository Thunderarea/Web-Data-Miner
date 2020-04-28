# Web-Data-Miner

Chrome extension. HTML, CSS, JS, Chrome Extension APIs

A simple extension to run your javascript in every web site you want.
Use console.log() function to appear the results in a panel.
Copy the results and use them.

Example: You want to create an XML file with HTML color names and their HEX codes and you can't find one in this format. So, you can go to [W3Schools Color Names](https://www.w3schools.com/colors/colors_hex.asp) and run the following code from extension:
```
const colors = document.querySelectorAll(".colorbox");
console.log("<colors>");
  colors.forEach(color => {
    console.log("  <color>");
    console.log("     <name>"+color.querySelector("span.colornamespan").textContent.toLowerCase()+"</name>");
    console.log("     <hex>"+color.querySelector("span.colorhexspan").textContent+"</hex>");
    console.log("  </color>");
  });
console.log("</colors>")
```
The results will appear in the panel so you can copy and paste them in a file.

## How to install it
Download the project. Unzip the folder. Open the Chrome browser. Go to Chrome menu > More Tools > Extensions. Enable the "Developer mode" (top right). Click on "Load unpacked". Select the project's folder with name "source". Use the extension. 
*If you change the extension's code reload the extension before use it.*

## How to use it
Click on extension's popup (a red square in Chrome toolbar). Upload your file or write your code in text area. Click on corresponding button. Your code will run and the results will appear in a panel. Use console.log function to appear the results you want in the panel. 
If the panel does not contain anything check if you have use console.log function else check the browser's console for errors. Use the "Copy results" button to copy the results to clipboard.


## Future additions (contributions and suggestions are welcomed)
* JQuery support
* Better style on popup and panel
* Logo
* Publication on Chrome Web store

## Licence 
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments 
* Thanks to all the users of [Stack Overflow](https://www.stacoverflow.com)
* Thanks to:
  * [Arun P Johny](https://stackoverflow.com/questions/20256760/javascript-console-log-to-html)
  * [adeneo](https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging)
  * [Angelos Chalaris](https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f)
  * [Eric Bidelman](https://www.html5rocks.com/en/tutorials/file/dndfiles/)
  * [Matt West](https://mattwest.design/reading-files-with-filereader/)


