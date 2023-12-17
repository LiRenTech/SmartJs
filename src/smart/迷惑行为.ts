// let bigArr = [];
// let number = 100;
//
// for (let i = 0; i < number; i++) {
//     bigArr.push([]);
// }
//
// for (let i = 0; i < number - 1; i++) {
//     bigArr[i].push(bigArr[i + 1])
// }
//
// bigArr[number - 1].push(bigArr[0]);
//
// delete bigArr;
// console.log(bigArr);

// let o = {};
// o.o = o;
// console.log(o.o.o.o.o.o.o);

function f() {
  console.log("123132");
  return f;
}

// let string = "f";
// for (let i = 0; i < 100000; i++) {
//     string += "()";
// }
// eval(string);

let range = function* (n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
};

let print = console.log;

for (let i of range(5)) {
  print(i);
}
