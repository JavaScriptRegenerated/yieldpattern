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

### HTTP Response

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
match(MatchResponse(response));

// Returns 'Success!'
```
