/**
 * Purpose of this util is to inject API url before compiling
 * there could be multiple environment definition
 * for instance dev, staging, production etc
 *
 * It would be done with the help of .babelrc file
 */

const commandLineArgs = require('command-line-args');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const optionDefinitions = [
  { name: 'project_root', alias: 'r', type: String },
  { name: 'api_url', alias: 'a', type: String },
];

const options = commandLineArgs(optionDefinitions);
const babelrcPath = path.resolve(options.project_root, '.babelrc');

let babelrcContents = fs.readFileSync(babelrcPath).toString();
babelrcContents = JSON.parse(babelrcContents);

let indexOfReplaceVars = _.findIndex(babelrcContents.plugins, o => {
  if (_.isArray(o) && o.length >= 2) {
    if (_.isEqual(o[0], 'inline-replace-variables')) {
      return true;
    }
  }
  return false;
});

if (indexOfReplaceVars >= 0) {
  // Remove present api url
  babelrcContents.plugins[indexOfReplaceVars][1] = _.omit(
    babelrcContents.plugins[indexOfReplaceVars][1],
    ['__API_BASE_URL__']
  );

  // Push in the new url
  babelrcContents.plugins[indexOfReplaceVars][1] = {
    ...babelrcContents.plugins[indexOfReplaceVars][1],
    __API_BASE_URL__: options.api_url,
  };

  fs.writeFileSync(babelrcPath, JSON.stringify(babelrcContents, null, 4));
}
