/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
const assert = require("assert");

describe("03-functions", function() {
  it("1. define function using FunctionDeclaration", function() {
    function f(a,b,c = ""){
      return a+b+c;
    };

    assert(typeof f === "function");
    assert(f("a", "b") === "ab");
    assert(f("a", "b", "c") === "abc");
  });
  it("2. define function using FunctionExpression", function() {
    let f = function(a,b,c = "") {
      return a+b+c;
    }
    assert(typeof f === "function");
    assert(f("a", "b") === "ab");
    assert(f("a", "b", "c") === "abc");
  });
  it("3. define function using ArrowFunctionExpression", function() {
    let f = (a,b,c="") => {return a+b+c};
    assert(typeof f === "function");
    assert(f("a", "b") === "ab");
    assert(f("a", "b", "c") === "abc");
  });
  it("4. define method using function expression", function() {
    var o = {
      c: "c",
      m: function(a,b) {
        return a+b+this.c;
      }
    };
    assert(typeof o.m === "function");
    assert(o.m("a", "b") === "abc")
  });
  it("5. call method of one oject with another object", function() {
    let cat = {
      sound: "meau"
    }
    let dog = {
      sound: "haf"
    }
    let soundMachine = {
      play: function() {
        return this.sound;
      }
    }
    assert(
      soundMachine.play.apply(dog) === "haf"
    );
    assert(
      soundMachine.play.call(cat) === "meau"
    );
  });
  it("6. call method of one oject with another object and params", function() {
    let dog = {
      sound: "haf"
    }
    let soundMachine = {
      play: function(repeat) {
        // TODO: fix implementation
        return this.sound.repeat(repeat);
      }
    }
    assert.strictEqual(
      // TODO: fix the method call
      soundMachine.play.call(dog, 3), "hafhafhaf"
    );
  });
  it("7. scope of var", function() {
    for (var i = 0; i < 10; i++) {

    };
    assert(typeof i === "number");
  });
  it("8. scope of var", function() {
    for (let i = 0; i < 10; i++) {

    };
    assert(typeof i === "undefined");
  });
  it("9. scopes 1", function() {
    let x = 10;

    function f(y) {
      let r = x + y;
      return r;
    }
    assert(f(20) === 30);
  });
  it("10. scopes 2", function() {
    let x = 10;

    function f(x) {
      let r = x * 2;
      return r;
    }
    // TODO: ktory z asertov bude platit
    //assert(f(100) === 20);
    assert(f(100) === 200);

    assert(Object.is(f(),NaN));
    //assert(Object.is(f(),20));
  });
  it("11. Implementujte funkciu spravajucu sa podla poctu parametrov", function() {
    function calc() {
      //TODO:
      //ak je pocet parny vrati "ok"
      //ak je pocet neparny vrati "err"
      if (arguments.length%2 === 0) return "ok";
      else return "err";
    };
    assert(calc(1, 2) === "ok");
    assert(calc(1, 2, 3) === "err");
    assert(calc(1, 2, 3, 4, 5, 6, 7, 8, 9) === "err");
  });
  it("12. Implementujte funkciu z troma alebo siestimi parametrami", function() {
    const calc = (...numbers) => {
      // ak pride nespravny pocet
      // tak error
      // inak Max z parametrov
      if ((numbers.length === 3) || (numbers.length === 6) ) return Math.max(...numbers);
      else throw new TypeError();
    };
    assert(calc(1, 2, 3) === 3);
    assert(calc(1, 2, 3, 5, 2, 3) === 5);
    assert(calc(1, 2, 3, 0, 0, 7) === 7);
    assert(calc(null, 0, 1) === 1);

    assert.throws(() => {
      calc(1, 2, 3, 4)
    }, TypeError)
    assert.throws(() => {
      calc(1)
    }, TypeError)
    assert.throws(() => {
      calc()
    }, TypeError)
  });
  it("13. Implementujte funkciu z troma alebo siestimi parametrami", function() {
    // ak by mala mat takuto syntax
    // teda formalne 3 paramere a 3 optional
    const calc = (a, b, c, ...others) => {
      // ak pride nespravny pocet
      // tak error
      // inak Max z parametrov
      if (a === undefined || b === undefined || c === undefined) throw new TypeError();
      if ((others.length === 3) || (others.length === 0)) return Math.max(...others, a, b, c );
      else throw new TypeError();
    };
    // asserty su zhodne z predoslym
    assert(calc(1, 2, 3) === 3);
    assert(calc(1, 2, 3, 5, 2, 3) === 5);
    assert(calc(1, 2, 3, 0, 0, 7) === 7);
    assert(calc(null, 0, 1) === 1);

    assert.throws(() => {
      calc(1, 2, 3, 4)
    }, TypeError)
    assert.throws(() => {
      calc(1)
    }, TypeError)
    assert.throws(() => {
      calc()
    }, TypeError)
  });
  it("14. vyberte sprave moznosti volania funkcie aby vratia 1", function() {
    let o = { value: 1 };

    function printValue() {
      return this.value;
    }
    // vyberte 3 spravne moznosti volania funkcie
    // otazka zo skusky minuly rok

    //assert(printValue(o)===1);
    assert(printValue.call(o)===1);
    assert(printValue.apply(o)===1);
    //assert(printValue.call(null, [o])===1);
    //assert(printValue.bind(o)===1);
    assert(printValue.bind(o)()===1);
  });
  it("15. prefix a sufix", function() {

    function Formatter(prefix, sufix) {
      // TODO: implement
      this.prefix = prefix
      this.sufix = sufix

      this.format = function format(base) {
        return this.prefix + base + this.sufix;
      }
    }
    let f1 = new Formatter("'", "'");
    assert(f1.format("text") === "'text'");

    let f2 = new Formatter("xxx", "yyy");
    assert(f2.format("TEXT") === "xxxTEXTyyy");

    f2.sufix = "zzz";
    assert(f2.format("TEXT") === "xxxTEXTzzz");
  });
  it("16. prefix a sufix (using closure)", function() {

    function formater(prefix, sufix ) {
      let p = prefix
      let s = sufix
      return function(base) {
        return p + base + s;
      }
    }
    let format1 = formater("'", "'");
    assert(format1("text") === "'text'");

    let format2 = formater("xxx", "yyy");
    assert(format2("text") === "xxxtextyyy");

  });
  it("17. prefix a sufix (using closure)", function() {

    function formater(prefix, sufix) {
      const f = function(base){
        return f.prefix + base + f.sufix
      }
      f.prefix = prefix;
      f.sufix = sufix;
      return f;
    }
    let format1 = formater("'", "'");
    assert(format1("text") === "'text'");

    let format2 = formater("xxx", "yyy");
    assert(format2("text") === "xxxtextyyy");

    format2.sufix = "zzz";
    assert(format2("TEXT") === "xxxTEXTzzz");
  });
});
