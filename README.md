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

In many situations, you will want multiple PKI components for distinct purposes.
For example, you may want to use one set of keys for signing and another for
encryption.

It this case, this suite of components can be used multiple times under
different namespaces.

```javascript
IoC.loader('pki/sign', require('bixby-pki'));
IoC.loader('pki/encrypt', require('bixby-pki'));
```

Settings will be configured under corresponding namespaces.

```toml
[pki.sign]
# signing-related settings go here

[pki.encrypt]
# encryption-related settings go here
```

### Table of Contents

##### Components

  - [Keygen](#keygen)
  - [Key Store](#keystore)
  - [Rotator](#rotator)

#### Keygen

```javascript
exports['@require'] = [ 'pki/keygen' ];
```

The keygen component is used to generate public/private key pairs.  By
default it will generate RSA key pairs with a key size of 2048 bits, using
[`akeypair`](https://github.com/quartzjer/akeypair).  `akeypair` will attempt
to use native bindings when possible, falling back to pure JavaScript, for
optimum performance.

###### RSA

The following settings are supported for RSA keys:

  - `{number} [bits]` - key size in bits
  
```toml
[pki]
algo = "rsa"
bits = 4096
```

###### Key Identifiers

Generated keys will be assigned an identifier, which can be used to find a
specific key pair in situations when multiple pairs are in use.  The naming
format defaults to `day`, and can be changed by `naming` setting.

```toml
[pki]
naming = "hour"
```

Possible values and the resulting identifiers are:

  - `day` - 20140918
  - `hour` - 20140918T19
  - `minute` - 20140918T1909
  - `second` - 20140918T191042
  - `epoch` - 1411067129

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
for `keystore` in the `[pki]` section.  The `KeyStore` instance will be
constructed using the `FSKeyStore` class from the [sks](https://github.com/jaredhanson/node-sks)
module.  The directory in which keys will be stored is set by `path`.

```toml
[pki]
keystore = "fs"
path = "/var/opt/acme-inc/keys/aaa"
```

When using the file system as a key store, care should be taken to ensure that
only authorized processes can read files within the store.  This can be
accomplished by setting the appropriate permissions.

In clustered environments, where multiple processes on separate systems need
access to a shared key store, the file system must be a shared file system
mounted by all systems requiring access.  Alternatively, a backend designed
for shared network access can be used.

#### Rotator

```javascript
exports['@require'] = [ 'pki/rotator' ];
```

The rotator component rotates keys on a periodic basis, defaulting to once per
day.  This frequency can be changed by setting `rotate`.

```toml
[pki]
naming = "second"
rotate = 5000
```

Rotation can be disabled by setting `rotate` to `0`.

```toml
[pki]
rotate = 0
```


## Tests

    $ make test

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 NodePrime, Inc. <[http://www.nodeprime.com/](http://www.nodeprime.com/)>  
Copyright (c) 2014 Jared Hanson <[http://www.jaredhanson.net/](http://www.jaredhanson.net/)>
