// generic composition
/*
const pipe = (...fns) =>
  x => fns.reduce((v, f) => f(v), x);
*/

function pipe(...fns) {
  // TODO: rewrite above reduce to for cycle
  // urcite to bude vracat funkciu
  // len ju nejako musite poskladat
  // ako ? musite vediet precitat ten reduce hore
  let r=function(){};
  return r;
}
module.exports = pipe;



// ------------- TESTS -------------------------------
process.env.SELF_TEST && (() => {
  console.error(`[self test]:${__filename}:...`)

  const assert = require("assert");

  const a = (v) => `a(${v})`
  const b = (v) => `b(${v})`
  const c = (v) => `c(${v})`

  assert.equal(pipe(a, b, c)("x"), "c(b(a(x)))");

  assert.equal(pipe(a)("x"), "a(x)");

  console.error(`[self test]:${__filename}:OK`)
})();


// 1 - filter
// 2 - map
// 3 - filter (odfiltruj ktory maju menej ako 3)
// 4 - map
// 5 -  total point, reduce
// 6 - reduce (ale nad celym)
// 7 -  reduce cez set
// 8 - reduce cez map (alebo cez objekt)
// 9 - len dopises k 8 filter podla poctu studentov
