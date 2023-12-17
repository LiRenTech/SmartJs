// set的基本用法

// 增删改查
const s = new Set();
s.add(1).add(2).add(3);


// 遍历
// set arr 相互转化
let arr = [1, 3, 4, 5, 12, 12, 13];
let set = new Set(arr);
console.log(set)


// 交并补没有实现，只能自己实现
/**
 *
 * @param other {Set}
 */
Set.prototype.f = function (other) {
    const res = new Set();
    this.forEach((value) => {
        if (other.has(value)) {
            res.add(value);
        }
    });
    return res;
}
let s1 = new Set([1, 2, 3, 4]);
let s2 = new Set([3, 4, 5, 6]);
console.log(s1.f(s2));

// 不同于C++和python的地方


// 自定义对象怎么 强行使用 set？

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x},${this.y}`
    }

    static fromString(str) {
        let [x, y] = str.split(",");
        return new Point(x, y);
    }
}

let p1 = new Point(1, 1);
let set1 = new Set();
set1.add(p1.toString());
set1.add(new Point(1, 1).toString());

set1.forEach(value => {
    console.log(Point.fromString(value));
})
