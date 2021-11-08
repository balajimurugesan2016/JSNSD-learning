# NotFoundError

> When you've lost something

[![Dependency Status](https://david-dm.org/fatfisz/not-found-error.svg)](https://david-dm.org/fatfisz/not-found-error)
[![devDependency Status](https://david-dm.org/fatfisz/not-found-error/dev-status.svg)](https://david-dm.org/fatfisz/not-found-error#info=devDependencies)

An exception for use in certain situations (e.g. to signal HTTP 404 error).
Created because of a need for a cross-package standard exception.

## Getting started

Install the package with this command:
```shell
npm install not-found-error --save
```

## Usage

```js
// Import ES6-style
import NotFoundError from 'not-found-error';

// Or CommonJS-style
const NotFoundError = require('not-found-error');

// Then just use like this:
throw new NotFoundError();
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.

## License

Copyright (c) 2016 Rafał Ruciński. Licensed under the WTFPL license.
