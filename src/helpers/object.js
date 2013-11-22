void (function () {
  Object.new = function (prototype, properties) {
    var obj = Object.create(prototype)

    for (var n in properties) {
      obj[n] = properties[n]
    }

    return obj
  }
})()