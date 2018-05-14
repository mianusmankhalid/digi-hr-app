export function getBase64PrependUriText(url) {
  // https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(url)[1];

  switch (ext) {
    case "png":
      return "data:image/png;base64,";

    case "jpg":
      return "data:image/jpeg;base64,";

    default:
      return "data:image;base64,";
  }
}
