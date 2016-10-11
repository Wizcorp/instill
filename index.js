const deepCopy = require('deep-copy')

module.exports = function (exports, deps = {}, classes = {}) {
  exports.modules = deps
  exports.classes = classes

  exports.use = function (name, moduleObject) {
    if (!this.modules[name]) {
      throw new Error('module ' + name + ' is not an injectable dependency')
    }

    this.modules[name] = moduleObject
  }

  exports.with = function (injectedModules, callback) {
    const self = this
    const cloned = deepCopy(exports)

    Object.keys(injectedModules).forEach(function (key) {
      cloned.use(key, injectedModules[key])
    })

    callback(cloned)
  }

  exports.instanciate = function (className, ...args) {
    if (!this.classes[className]) {
      throw new Error('class ' + name + ' was not registered!')
    }

    const Constructor = Object.create(this.classes[className].prototype)
    const instance = new Constructor(...args)
    instance.modules = this.modules
    return instance
  }

  return exports
}
