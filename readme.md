<div align="center">
  <h1>👑 🧶 Yield Pattern</h1>
  <a href="https://bundlephobia.com/result?p=yieldpattern">
    <img src="https://badgen.net/bundlephobia/minzip/yieldpattern@0.1.0" alt="minified and gzipped size">
    <img src="https://badgen.net/bundlephobia/min/yieldpattern@0.1.0" alt="minified size">
    <img src="https://badgen.net/bundlephobia/dependency-count/yieldpattern@0.1.0" alt="zero dependencies">
  </a>
</div>

Pattern Matching using Generator Functions

## Install

```console
npm add yieldpattern
```

## Examples

### Matching strings

```javascript
import { match } from "yieldpattern";

function* IsGreeting(input) {
  switch (yield input) {
    case yield 'hello': return true;
    case yield '👋': return true;
    case yield /^hi\b/: return true;
    default: return false;
  }
}

match(IsGreeting('hello')); // true
match(IsGreeting('👋')); // true
match(IsGreeting('hi')); // true
match(IsGreeting('hi there')); // true
match(IsGreeting('goodbye')); // false
```

### Matching arrays

```javascript
import { match, _ } from "yieldpattern";

function* FormatPoint(point) {
  switch (yield point) {
    case yield [0, 0]: return "origin";
    case yield [0, _]: return `y = ${point[1]}`;
    case yield [_, 0]: return `x = ${point[0]}`;
    default: return `x = ${point[0]}, y = ${point[1]}`;
  }
}

match(FormatPoint([0, 0])); // 'origin'
match(FormatPoint([0, 7])); // 'y = 7'
match(FormatPoint([12, 0])); // 'x = 12'
match(FormatPoint([5, 9])); // 'x = 5, y = 9'
```

### Matching objects

```javascript
import { match } from "yieldpattern";

function* MatchResponse(response) {
  switch (yield response) {
    case yield { ok: true }:
      return 'Success!';
    case yield { status: 404 }:
      return 'Not found';
    case yield { status: 500 }:
      return 'Server error';
    default:
      return 'Unknown';
  }
}

const response = await fetch("https://example.org/");
match(MatchResponse(response)); // "Success!"
```

### Matching URLs

```javascript
import { match } from "yieldpattern";

function* MatchRoute(url) {
  switch (yield url) {
    case yield { pathname: "/" }:
      return 'Home';
    case yield { pathname: "/features" }:
      return 'Features';
    case yield { pathname: /^legal/ }:
      return 'Legal';
    default:
      return 'Not found';
  }
}

match(MatchResponse(new URL("https://example.org/"))); // "Home"
match(MatchResponse(new URL("https://example.org/features"))); // "Features"
match(MatchResponse(new URL("https://example.org/legal/terms"))); // "Legal"
match(MatchResponse(new URL("https://example.org/legal/privacy"))); // "Legal"
match(MatchResponse(new URL("https://example.org/foobar"))); // "Not found"
```

### HTTP Response

