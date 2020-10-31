[![npm version](https://badge.fury.io/js/node-cache-store.svg)](https://badge.fury.io/js/node-cache-store)
[![Build Status](https://travis-ci.org/pasupulaphani/node-redis-store.svg?branch=master)](https://travis-ci.org/pasupulaphani/node-redis-store)
[![Coverage Status](https://coveralls.io/repos/github/pasupulaphani/node-redis-store/badge.svg?branch=master)](https://coveralls.io/github/pasupulaphani/node-redis-store?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/587984ab5450ea0042210137/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/587984ab5450ea0042210137)
[![Gratipay donate button](https://img.shields.io/badge/gratipay-donate-yellow.svg?style=flat-square)](https://gratipay.com/simple-redis-store/)

# node-redis-store [![See on Github](https://github.com/themes/tactile/images/octocat-icon.png)](https://github.com/pasupulaphani/node-redis-store)

Simplistic node redis store ready can scale with generic-pool support

## Prerequisites

```node >= 4``` This module requires nodejs v4 or above as it has dependencies on es6 components such as Map, Set, Promise etc.

### Getting started

```
    npm install node-redis-store
```

#### Usage
```
    const RedisStore = require("node-redis-store");
    const store = new RedisStore();

    // set
    store.set("key", {a: "b"});
```

#### API

- RedisStore([options])

#### `options` object properties


<table class="params">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th class="last">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="name"><code>name</code></td>
      <td class="type">
        <span class="param-type">string</span>
      </td>
      <td class="description last">
        <p>Name your store</p>
      </td>
    </tr>
    <tr>
      <td class="name"><code>redisOptions</code></td>
      <td class="type">
        <span class="param-type">object</span>
      </td>
      <td class="description last">
        <p>opts from <a href="https://github.com/NodeRedis/node_redis#options-object-properties">node_redis#options-object-properties</a></p>
      </td>
    </tr>
    <tr>
      <td class="name"><code>poolOptions</code></td>
      <td class="type">
        <span class="param-type">object</span>
      </td>
      <td class="description last">
        <p>opts from <a href="https://github.com/coopernurse/node-pool#createpool">node-pool#createpool</a></p>
      </td>
    </tr>
    <tr>
      <td class="name"><code>logger</code></td>
      <td class="type">
        <span class="param-type">object</span>
      </td>
      <td class="description last">
        <p>Inject your custom logger</p>
      </td>
    </tr>
  </tbody>
</table>


### Run tests

    bash test.sh

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/pasupulaphani/node-redis-store/blob/master/CONTRIBUTING.md)

## Backers

### Maintainers

These amazing people are maintaining this project:

*   [Phani](https://github.com/pasupulaphani) — [view contributions](https://github.com/pasupulaphani/node-redis-store/commits?author=pasupulaphani)

### Sponsors

No sponsors yet! Will you be the first?

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](http://patreon.com/phaninder "Donate to this project using Patreon")
[![Gratipay donate button](https://img.shields.io/badge/gratipay-donate-yellow.svg)](https://gratipay.com/~pasupulaphani/ "Donate weekly to this project using Gratipay")
[![Flattr donate button](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/pasupulaphani "Donate to this project using Flattr")
<!-- [![PayPal donate button](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://phaninder.com/paypal "Donate to this project using Paypal") -->
<!-- [![Bitcoin donate button](https://img.shields.io/badge/bitcoin-donate-yellow.svg)](https://phaninder.com/bitcoin "Donate once-off to this project using Bitcoin") -->
<!-- [![Wishlist browse button](https://img.shields.io/badge/wishlist-donate-yellow.svg)](https://phaninder.com/wishlist "Buy an item on our wishlist for us") -->
<a href='https://pledgie.com/campaigns/33095'><img alt='Click here to lend your support to: simple-node-redis-cache and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/33095.png?skin_name=chrome' border='0' ></a>

### Contributors

These amazing people have contributed code to this project:

*   [Oliver Brooks](https://github.com/oliverbrooks)

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/pasupulaphani/node-redis-store/blob/master/CONTRIBUTING.md)

<br />
<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-57413413-4', 'auto');ga('send', 'pageview');</script>
---
