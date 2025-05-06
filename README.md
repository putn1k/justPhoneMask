# JustPhoneMask v1.0.0

Simple and easy phone number input mask plugin

## Overview

* __No dependencies__.<br>
Written in pure JavaScript — no additional libraries required.

* __Simplicity and functionality__.<br>
Easily integrate and use the plugin to enforce phone number masking.

## Installation

1. Download the library `just-phone-mask.min.js` from the dist folder.<br>
Alternatively, install via NPM:

```
npm i just-phone-mask
```

2. Include it in your project:

```html
  <script src="just-phone-mask.min.js"></script>
```

Or (for module bundlers):

```javascript
import JustPhoneMask from 'just-phone-mask';
```

3. Initialize the library:
```javascript
new JustPhoneMask();
```

## Methods & Properties

The library supports the following configuration options:

```javascript
new JustPhoneMask( {
  countryCode: '+7',
  bodyMask: ' ___ ___ __ __',
  setPlaceholder: false,
  selectors: null,
} )
```

### Properties

1. `countryCode`

Sets the country code (default: `+7`). Example:

```javascript
new JustPhoneMask( {
  countryCode: '+375'
} )
```

2. `bodyMask`

Defines the input mask body. The `_` character acts as a placeholder. The full mask combines the country code and body mask (spaces, brackets, hyphens, etc. are allowed) (default: ` ___ ___ __ __`). Example:

```javascript
new JustPhoneMask( {
  bodyMask: ' (___) __ ___ __-__',
} )
```

3. `setPlaceholder`

Toggles whether to display the mask as the input’s placeholder (default: false). Example:

```javascript
new JustPhoneMask( {
  setPlaceholder: true,
} )
```

4. `selectors` 

Specifies CSS selectors for target elements (uses `querySelectorAll`) (default: `[type="tel"]`). Example:

```javascript
new JustPhoneMask( {
  selectors: '.class',
} )
```