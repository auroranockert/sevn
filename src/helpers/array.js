void (function () {
  Array.range = function (start, end, step) {
    var step = step || 1
    var length = Math.floor(1 + (end - start) / step)
    var result = Array(length)

    for (var i = 0; i < length; i++) {
      result[i] = start + i * step
    }

    return result
  }
})()