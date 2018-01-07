//Import dependencies
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
// var electronEjs = require('electron-ejs')();
var path = require('path');
//Initialize the app
var app = electron.app;
//var server = require('./bin/www');

//Initialize the ejs parser
//var ejs = new electronEjs({ key: 'my value' }, {});
 
//Now you can read EJS files
app.on('ready', function()
{
  //Create the new window
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('http://localhost:3000');
  //More app configuration
  // ....
  // hiddenWindow = new BrowserWindow({show: false});
  // //Load the ejs file
  // //mainWindow.loadUrl('file://' + __dirname + 'views/starter.ejs');
  // hiddenWindow.loadURL(path.join('file://', __dirname, '/index.html'));
});
app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});