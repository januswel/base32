# hex to/from Base32 v1.0.1 ![test badge](https://github.com/januswel/base32/workflows/test/badge.svg)

compliant with [RFC4648](https://tools.ietf.org/html/rfc4648)

## Usage

### CLI

```console
npx @januswel/base32 encode 1234567890abcdef
npx @januswel/base32 decode CI2FM6EQVPG66===
```

### JavaScript

```javascript
const { encoded, decoded } = require('@januswel/base32')

const encoded = encode('1234567890abcdef')
const decoded = decode('CI2FM6EQVPG66===')
```

### TypeScript

```javascript
import { encode, decode } from '@januswel/base32'

const encoded = encode('1234567890abcdef')
const decoded = decode('CI2FM6EQVPG66===')
```
