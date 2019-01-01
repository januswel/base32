# hex to/from Base32 v0.1.1

compliant with RFC4648

https://tools.ietf.org/html/rfc4648

## Usage

### CLI

```console
base32 encode 1234567890abcdef
base32 decode CI2FM6EQVPG66===
```

### JavaScript

```javascript
const base32 = require('@januswel/base32')

const encoded = base32.encode('1234567890abcdef')
const decoded = base32.decode('CI2FM6EQVPG66===')
```
