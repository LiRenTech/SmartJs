// @ts-nocheck
function f() {
  let a = 5

  function g() {
    console.log(a)
    a++
  }

  return g
}

let g1 = f()
let g2 = f()

g1()
g1()
g1()

g2()
g2()
