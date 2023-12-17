// @ts-nocheck
const print = console.log
let range = function* (a, b, c = 1) {
  if (b === undefined) {
    for (let i = 0; i < a; i += c) {
      yield i
    }
  } else {
    for (let i = a; i < b; i += c) {
      yield i
    }
  }
}
let enumerate = function* (iterator) {
  let i = 0
  for (let item of iterator) {
    yield [i, item]
    i++
  }
}
for (let [i, v] of enumerate(range(100, 106))) {
  print(i, v)
}
print('=====')

for (let i of range(5, 10)) {
  print(i)
}
print('=====')
for (let i of range(5, 10, 3)) {
  print(i)
}
