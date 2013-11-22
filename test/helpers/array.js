test("Array.range(start, end)", function () {
  var a = Array.range(0, 4), b = [0, 1, 2, 3, 4]

  for (var n in b) {
    ok(a[n] === b[n])
  }
})

test("Array.range(start, end, step)", function  () {
  var a = Array.range(0, 5, 2), b = [0, 2, 4]
  var c = Array.range(1, 5, 2), d = [1, 3, 5]

  for (var n in b) {
    ok(a[n] === b[n])
  }

  for (var n in d) {
    ok(c[n] === d[n])
  }
})