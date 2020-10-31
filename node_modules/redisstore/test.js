
var redis = require('redis');
var uuid = require('uuid').v4();
var createRedisStore = require('./index');

var redisClient = redis.createClient();
var store = createRedisStore(redisClient, uuid);

require('s3store/test/interface')(store);
