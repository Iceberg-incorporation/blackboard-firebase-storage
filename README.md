# blackboard-firebase-storage

Send upload file firebase-storage from Node.js – easy as Peeled bananas! 🍌✉️

[![npm version](https://badge.fury.io/js/blackboard-firebase-storage.svg)](https://badge.fury.io/js/blackboard-firebase-storage)

[![NPM](https://nodei.co/npm/blackboard-firebase-storage.png)](https://nodei.co/npm/blackboard-firebase-storage/)

## Installation

```sh
$ npm install blackboard-firebase-storage
```

or

```sh
$ yarn add blackboard-firebase-storage
```

## Importing

```javascript
// Using Node.js `require()`
const brg = require('blackboard-firebase-storage');
```

## Overview

### Connecting to Firebase

First, we need to define a connection firebase service. `brg.connect`

```js
brg.connect({
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    storageBucket: '<your-storage-bucket-url>'
  })
```

### Upload File

```js
brg.uploadFile("path","name",file).then(snap => {
      console.log(snap)
  });
```

### Upload String File

```js
brg.uploadString("path","name","url_file || base64").then(snap => {
      console.log(snap)
  });
```

### Get File

```js
brg.getFile("path","name").then(snap => {
      console.log(snap)
  });
```

### Get Url

```js
brg.getUrl("path","name").then(snap => {
      console.log(snap)
  });
```

### Remove

```js
brg.remove("path","name").then(snap => {
      console.log(snap)
  });
```