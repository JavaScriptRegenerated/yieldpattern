import { match } from "./index";

class NaiveResponse {
  body: any;
  status: number;
  headers: Record<string, string>;
  
  constructor(body, init) {
    this.body = body;
    this.status = init.status;
    this.headers = init.headers;
  }
}

describe("Pattern matching", () => {
  const notFound = Symbol('Not found');
  function* ABC(input) {
    switch (yield input) {
      case yield [1, 2, 3]:
        return 'first';
      case yield [1, 2, 4]:
        return 'second';
      case yield [1, [8, 9], 3]:
        return 'nested';
      case yield 42:
        return 'forty-two';
      case yield BigInt('1234'):
        return 'bigint 1234';
      case yield null:
        return 'NULL!';
      case yield undefined:
        return 'UNDEFINED!';
      case yield 'some-text':
        return 'SOME-TEXT';
      case yield Symbol.for('some symbol'):
        return 'Some symbol';
      case yield NaN:
        return 'Not a number';
      case yield /regex/:
        return 'Regex';
      case yield { a: 'A', b: 'B', c: 'C' }:
        return 'Object with a & b & c'
      case yield { a: 'A', b: 'B' }:
        return 'Object with a & b'
      case yield { a: 'A' }:
        return 'Object with a'
      case yield { array: [1, 2, 3] }:
        return 'Object with array of numbers'
      case yield { status: 200 }:
        return 'Response 200';
      case yield { status: 404, headers: { 'content-type': 'application/json' } }:
        return 'Response 404 json';
      case yield { pathname: '/about' }:
        return 'About page';
      case yield new URL('https://example.org/exact'):
        return 'Exact URL';
      case yield new Error('Not allowed'):
        return 'Error: not allowed';
      default: {
        return notFound;
      }
    }
  }
  
  it("returns default when no match", () => {
    expect(match(ABC(1))).toBe(notFound);
  });
  
  it("matches null", () => {
    expect(match(ABC(null))).toEqual('NULL!');
  });
  
  it("matches undefined", () => {
    expect(match(ABC(undefined))).toEqual('UNDEFINED!');
  });
  
  it("matches exact values in array", () => {
    expect(match(ABC([1, 2, 3]))).toEqual('first');
  });
  
  it("matches exact values in array", () => {
    expect(match(ABC([1, 2, 4]))).toEqual('second');
  });
  
  it("matches nested exact values in array", () => {
    expect(match(ABC([1, [8, 9], 3]))).toEqual('nested');
  });
  
  it("matches number", () => {
    expect(match(ABC(42))).toEqual('forty-two');
  });
  
  it("matches bigint", () => {
    expect(match(ABC(BigInt('1234')))).toEqual('bigint 1234');
  });
  
  it("matches exact string", () => {
    expect(match(ABC('some-text'))).toEqual('SOME-TEXT');
  });
  
  it("matches string with regex", () => {
    expect(match(ABC("string for regex to match"))).toEqual('Regex');
  });
  
  it("matches symbol", () => {
    expect(match(ABC(Symbol.for('some symbol')))).toEqual('Some symbol');
  });
  
  it("matches object with single key", () => {
    expect(match(ABC({ a: 'A' }))).toEqual('Object with a');
  });
  
  it("matches object with 2 keys", () => {
    expect(match(ABC({ a: 'A', b: 'B' }))).toEqual('Object with a & b');
  });
  
  it("matches object with 3 keys", () => {
    expect(match(ABC({ a: 'A', b: 'B', c: 'C' }))).toEqual('Object with a & b & c');
  });
  
  it("matches subset of object with multiple keys", () => {
    expect(match(ABC({ a: 'A', b: 'B', z: 'Z' }))).toEqual('Object with a & b');
  });
  
  it("matches class with properties", () => {
    expect(match(ABC(new NaiveResponse('', { status: 200 })))).toEqual('Response 200');
  });
  
  it("matches class with nested properties", () => {
    expect(match(ABC(new NaiveResponse('', { status: 404, headers: { 'content-type': 'application/json', 'content-length': 0 } })))).toEqual('Response 404 json');
  });
  
  it("matches URL pathname", () => {
    expect(match(ABC(new URL('https://example.org/about')))).toEqual('About page');
  });
  
  it("matches exact URL", () => {
    expect(match(ABC(new URL('https://example.org/exact')))).toEqual('Exact URL');
  });
  
  it("matches exact Error", () => {
    expect(match(ABC(new Error('Not allowed')))).toEqual('Error: not allowed');
  });
  
  it("matches NaN", () => {
    expect(match(ABC(NaN))).toBe('Not a number');
  });
})