const EventEmitter = require('events').EventEmitter;

function Connection(base) {
    this.base = base;

}

Connection.prototype.__proto__ = EventEmitter.prototype;

module.exports = Connection;