const firebase = require("firebase/app");
const XMLHttpRequest = require("xhr2");
const imageToBase64 = require('image-to-base64');

global.XMLHttpRequest = XMLHttpRequest

require('firebase/storage');

const BlackboardFirebaseStorage = function () {
    this.firebaseConfig = [];
    this.firebase;
    this.base64Url = []

}

BlackboardFirebaseStorage.prototype.connect = function (config, callback) {
    this.firebaseConfig.push(config)
    
    // console.log(firebase.storage().ref());
    if (typeof callback !== 'function') {
        let promise = new Promise((resolve, reject) => {
            if (config) {

                resolve(config)
            } else {
                resolve(null)
                reject("error connect")
            }
        })
        return promise
    } else {
        if (config) {
            callback(null, config)
            return firebase.initializeApp(config);
        } else {
            callback("error connect", null)
        }
    }

}

BlackboardFirebaseStorage.prototype.uploadFile = function (bucket, name, data, callback) {

    const storageRef = firebase.storage().ref()
    return storageRef.child(`${bucket}/${name}`).put(data).then(function (snapshot) {
        // console.log('File uploaded successfully at');
        if (typeof callback !== 'function') {

            return snapshot
        } else {
            if (snapshot) {
                callback(null, snapshot)
            } else {
                callback("upload file error", null)
            }
        }
    });

}

BlackboardFirebaseStorage.prototype.uploadString = function (bucket, name, data, callback) {
    const message = data;
    const storageRef = firebase.storage().ref()
    if (typeof data === "string") {
        if (message.startsWith('http')) {


            return imageToBase64(message).then(function (base64Img) {
                let base64Data = new Buffer.from(base64Img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                let metadata = {
                    contentType: `image/${message.slice(message.length - 3, message.length)}`
                };


                return storageRef.child(`${bucket}/${name}.${message.slice(message.length - 3, message.length)}`).put(base64Data, metadata).then(function (snapshot) {
                    if (typeof callback !== 'function') {
                        return snapshot
                    } else {
                        if (snapshot) {
                            console.log(snapshot);
                            callback(null, snapshot)
                        } else {
                            console.log(null);
                            callback("upload string error", null)
                        }
                    }
                })
            })

        } else {
            let base64Data = new Buffer.from(data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            let type = data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
            let metadata = {
                contentType: type
            };

            return storageRef.child(`${bucket}/${name}.${type.slice(type.length - 3, type.length)}`).put(base64Data, metadata).then(function (snapshot) {
                if (typeof callback !== 'function') {


                    return snapshot
                } else {
                    if (snapshot) {
                        callback(null, snapshot)
                    } else {
                        callback("upload string error", null)
                    }
                }
            })
        }

    }

}

BlackboardFirebaseStorage.prototype.getUrl = function (bucket, name, callback) {
    const storageRef = firebase.storage().ref()
    return storageRef.child(`${bucket}/${name}`).getDownloadURL().then(function (snapshot) {
        if (typeof callback !== 'function') {

            return snapshot;
        } else {
            if (snapshot) {
                callback(null, snapshot)
            } else {
                callback("get url error", null)
            }
        }
    })

}

BlackboardFirebaseStorage.prototype.getFile = function (bucket, name, callback) {
    const storageRef = firebase.storage().ref()
    return storageRef.child(`${bucket}/${name}`).getMetadata().then(function (snapshot) {
        if (typeof callback !== 'function') {

            return snapshot;
        } else {
            if (snapshot) {
                callback(null, snapshot)
            } else {
                callback("get file error", null)
            }
        }
    })

}

BlackboardFirebaseStorage.prototype.remove = function (bucket, name, callback) {
    const storageRef = firebase.storage().ref()
    return storageRef.child(`${bucket}/${name}`).delete().then(function (snapshot) {
        if (typeof callback !== 'function') {

            return snapshot;
        } else {
            if (snapshot) {
                callback(null, snapshot)
            } else {
                callback("remove error", null)
            }
        }
    })

}

BlackboardFirebaseStorage.prototype.BlackboardFirebaseStorage = BlackboardFirebaseStorage;

const bfg = module.exports = exports = new BlackboardFirebaseStorage();