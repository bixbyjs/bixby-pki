# bixby-pki

This suite of components provides [public key infrastructure](http://en.wikipedia.org/wiki/Public_key_infrastructure)
functionality to applications using Bixby.js, including storage and rotation
of public/private key pairs.  These key pairs provide cyptographically secure
mechanisms for transport security and authentication using digitally-signed
assertions.

## Install

    $ npm install bixby-sd
    
## Usage

To utilize PKI components, register them with the IoC container.  The standard
namespace for these components is `pki`.

```javascript
IoC.loader('pki', require('bixby-pki'));
```

## Tests

    $ make test

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 NodePrime, Inc. <[http://www.nodeprime.com/](http://www.nodeprime.com/)>  
Copyright (c) 2014 Jared Hanson <[http://www.jaredhanson.net/](http://www.jaredhanson.net/)>
