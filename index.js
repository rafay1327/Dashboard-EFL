//Import dependencies
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
// var electronEjs = require('electron-ejs')();
var path = require('path');
//Initialize the app
var app = electron.app;

// var rexec = require('remote-exec');
// var connection_options = {
//     port: 22,
//     username: 'dashboardefl',
//     privateKey: '',
//     passphrase: 'engro_foods'
// };

// var hosts = [
  
//     '127.0.0.1'
// ];

// var cmds = [
//     'npm start'
// ];
// console.log(cmds);
// rexec(hosts, cmds, connection_options, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Great Success!!');
//     }
// });
//var server = require('./bin/www');

//Initialize the ejs parser
//var ejs = new electronEjs({ key: 'my value' }, {});
 
//Now you can read EJS files

app.on('ready', function()
{
  //Create the new window
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('http://localhost:3000');
  //mainWindow.openDevTools;
  //More app configuration
  // ....
 //hiddenWindow = new BrowserWindow({show: true});
  // //Load the ejs file
  // //mainWindow.loadUrl('file://' + __dirname + 'views/starter.ejs');
  // hiddenWindow.loadURL(path.join('file://', __dirname, '/index.html'));
});
app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});