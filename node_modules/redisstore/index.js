
module.exports = createRedisStore;

function createRedisStore(redisClient, hashName) {
  return {
    writeObject: writeObject,
    readObject: readObject,
    deleteObject: deleteObject,
    readKeys: readKeys
  };

  function writeObject(key, data, cb) {
    var json = JSON.stringify(data);
    redisClient.hset(hashName, key, json, cb);
  }

  function readObject(key, cb) {
    redisClient.hget(hashName, key, function (err, res) {
      if (err) return cb(err);
      if (res === null) {
        var error = new Error('not found');
        error.statusCode = 404;
        return cb(error);
      }
      var data = JSON.parse(res);
      cb(err, data);
    });
  }

  function deleteObject(key, cb) {
    redisClient.hdel(hashName, key, cb);
  }

  function readKeys(cb) {
    redisClient.hkeys(hashName, cb);
  }
}
