// 用法1：多行字符串
console.log(`aa
bb
cc`);
// 用法2：字符串中包含表达式
console.log(`id: ${114514 + 1919810}`);
// 用法3：tag-function
function tag(strings, ...expressions) {
  console.log(strings, expressions);
}
tag`a${1}b`;
// tag套tag
function _() {
  _.count++;
  return _;
}
_.count = 0;
Object.defineProperty(_, '_', {
  get() {
    console.log(`共有${_.count * 2}个引号`);
  },
});
_````````````````````````````````````````````````````````````````````````````````
  ._;
