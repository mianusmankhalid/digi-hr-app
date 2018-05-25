// require the module
var RNFS = require("react-native-fs");
import _ from "lodash";
const uuid = require("uuid/v1");

const DownloadedResourcesDir = "downloaded_resources";
const ResourceMappingFile = "resource_mappings.json";

let instance = null;
let resourceDict;

class ResourceManager {
  constructor() {
    if (!instance) {
      instance = this;
      this._privateConstruct();
    }

    return instance;
  }

  static getInstance() {
    return instance;
  }

  _privateConstruct() {
    resourceDict = {};
    this._ensureResourcesDirExists().then(() => {
      return this._loadLocalResources();
    });
  }

  _ensureResourcesDirExists() {
    return RNFS.exists(
      RNFS.DocumentDirectoryPath + "/" + DownloadedResourcesDir
    )
      .then(exists => {
        if (!exists) {
          return RNFS.mkdir(
            RNFS.DocumentDirectoryPath + "/" + DownloadedResourcesDir
          );
        }
      })
      .then(() => {
        return RNFS.exists(
          RNFS.DocumentDirectoryPath + "/" + ResourceMappingFile
        ).then(exists => {
          if (!exists) {
            return RNFS.write(
              RNFS.DocumentDirectoryPath + "/" + ResourceMappingFile,
              JSON.stringify({})
            );
          }
        });
      });
  }

  _loadLocalResources() {
    return RNFS.readFile(
      RNFS.DocumentDirectoryPath + "/" + ResourceMappingFile
    ).then(contents => {
      if (_.trim(contents).length === 0) {
        contents = JSON.stringify({});
      }
      resourceDict = JSON.parse(contents);
    });
  }

  _addResourceEntry(filePath, resourceId, additionalInfo) {
    resourceDict[resourceId] = {
      path: filePath,
      info: additionalInfo
    };
  }

  _persistResourceDict() {
    return RNFS.unlink(
      RNFS.DocumentDirectoryPath + "/" + ResourceMappingFile
    ).then(() => {
      return RNFS.write(
        RNFS.DocumentDirectoryPath + "/" + ResourceMappingFile,
        JSON.stringify(resourceDict)
      );
    });
  }

  _getResourcesPath() {
    return RNFS.DocumentDirectoryPath + "/" + DownloadedResourcesDir;
  }

  _getUniqueResourcePath() {
    let filename = uuid();
    return this._getResourcesPath() + "/" + filename;
  }

  downloadResource(resourceUrl, resourceIdentifier, additionalInfo = {}) {
    let strangePromise = null;

    if (_.has(resourceDict, resourceIdentifier)) {
      strangePromise = this.purgeResource(resourceIdentifier);
    } else {
      strangePromise = Promise.resolve(true);
    }

    return strangePromise.then(() => {
      let newFileName = this._getUniqueResourcePath();

      let downloadResult = RNFS.downloadFile({
        fromUrl: resourceUrl,
        toFile: newFileName
      });
      return downloadResult.promise.then(result => {
        if (result.statusCode !== 200) {
          // We have an error downloading the file
          // Remove if it is written and throw an error
          throw new Error("Download failed!");
        } else {
          this._addResourceEntry(
            newFileName,
            resourceIdentifier,
            additionalInfo
          );
          return this._persistResourceDict();
        }
      });
    });
  }

  getResourceTupple(resourceIdentifier) {
    if (_.has(resourceDict, resourceIdentifier)) {
      return resourceDict[resourceIdentifier];
    } else {
      // Raise an error
      throw new Error("Resource not found");
    }
  }

  getResourceFile(resourceIdentifier, isBinary = false) {
    if (_.has(resourceDict, resourceIdentifier)) {
      return RNFS.readFile(
        resourceDict[resourceIdentifier].path,
        isBinary ? "base64" : "utf8"
      );
      //return this.resourceDict[resourceIdentifier];
    } else {
      // Raise an error
      throw new Error("Resource not found");
    }
  }

  purgeResource(resourceIdentifier) {
    if (_.has(resourceDict, resourceIdentifier)) {
      return RNFS.unlink(resourceDict[resourceIdentifier].path);
      //return this.resourceDict[resourceIdentifier];
    } else {
      // Raise an error
      throw new Error("Resource not found");
    }
  }
}

const resourceManagerInst = new ResourceManager();
const frozenObj = Object.freeze(resourceManagerInst);
export default ResourceManager;
