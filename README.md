hex to/from Base32
===

compliant with RFC4648

https://tools.ietf.org/html/rfc4648

Usage
---

```js
import { encode, decode } from 'base32-hex'

const encoded = encode('1a34ef794392')
const decoded = decode('A3C7====')
```
