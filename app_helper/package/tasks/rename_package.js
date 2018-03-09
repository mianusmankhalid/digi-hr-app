// For Android
// android/app/BUCK
// android/app/src/main/AndroidManifest.xml
// fastlane/Appfile
// var fs = require('fs');

// function readWriteSync() {
//   var data = fs.readFileSync('android/app/BUCK', 'utf-8');

//   var newValue = data.replace(/^\./gim, 'myString');

//   fs.writeFileSync('filelistSync.txt', newValue, 'utf-8');

//   console.log('readFileSync complete');
// }

// let mapping = [
//   {
//     file: 'android/app/BUCK',
//     check_for: 'package = "[^"]*",',
//     replace_with: 'package = ""',
//     value: () => {},
//   },
// ];
