'use strict'
const traverse = require("traverse");

module.exports = function(o) {
  traverse.forEach(o, logger(function() {
    this.post(({ node }) => Object.freeze(node));
  }));    //Mame urobit traverse, co zmaze vsetky properties stromceka ktore nie su primitivne
  // a napiseme test k tomu, malo by zmiznut: a,b, c ostane ako pzradny objekt a fko by ostalo ako prazdny
  //Recursive remove primitive
  return o;
}

const logger = function(fn) {
  return function(...args)
  {
    console.log(...args);
    return fn.apply(this, args);
  }
}

//-------------------------- tests ----------------------------------------
process.env.SELF_TEST && ((deepFreeze) => {
  console.error(`[self test]:${__filename}:...`)


  var assert = require("assert");

  let o = { a: 1, b: 2, c: { d: 3, e: 4 }, f: [1, 2, 3] }

  let o1 = deepFreeze(o);

  assert(o1 === o);

  assert.throws(() => o.c.d = 999,
    /Cannot assign to read only property/
  );
  assert.throws(() => o.f.pop(),
    /Cannot delete property/
  );

  console.error(`[self test]:${__filename}:OK`)
})(module.exports);
