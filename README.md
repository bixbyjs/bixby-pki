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

### Components

  - [Generator](#generator)
  - [Key Store](#keystore)

#### Generator

```javascript
exports['@require'] = [ 'pki/generator' ];
```

The generator component is used to generate public/private key pairs.  By
default it will generate RSA key pairs with a key size of 2048 bits, using
[`akeypair`](https://github.com/quartzjer/akeypair).  `akeypair` will attempt
to use native bindings when possible, falling back to pure JavaScript, for
optimum performance.


#### Key Store

```javascript
exports['@require'] = [ 'pki/keystore' ];
```

The key store component provides a trusted place to store private keys, and
optionally the corresponding public keys.

Support for storage backends is pluggable, allowing engineering teams to
choose the backend that best meets their requirements.  The type of backend to
use is determined via configuration settings.

###### File System

The file system can be used as a key store by specifying `fs` as the value
for `keystore` in the `[pki]` settings block.  The `KeyStore` instance will be
constructed using the `FSKeyStore` class from the [sks](https://github.com/jaredhanson/node-sks)
module.  The directory in which keys will be stored is set by `path`.

```
[pki]
keystore = "fs"
path = "/var/opt/acme-inc/keys/aaa"
```

When using the file system as a key store, care should be taken to ensure that
only authorized processes can read files within the store.  This can be
accomplished by setting the appropriate permissions.

In clustered environments, where multiple processes on separate systems need
access to a shared key store, the file system must be a shared file system
mounted an by all systems requiring access.  Alternatively, a backend designed
for shared network access can be used.

## Tests

    $ make test

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 NodePrime, Inc. <[http://www.nodeprime.com/](http://www.nodeprime.com/)>  
Copyright (c) 2014 Jared Hanson <[http://www.jaredhanson.net/](http://www.jaredhanson.net/)>
