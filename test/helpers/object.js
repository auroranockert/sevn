test("Object.new(prototype, properties)", function() {
  var a = Object.new(Object.prototype, { a: 1, b: 2 }), b = { a: 1, b: 2 }
  var c = Object.new(a, { c: 3 }), d = { a: 1, b: 2, c: 3 }

  for (var n in b) {
    ok(a[n] === b[n])
  }

  for (var n in d) {
    ok(c[n] === d[n])
  }

  ok(c.__proto__ === a)
})