const redis     = require('redis');
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';
const client    = redis.createClient({ url: REDIS_URL });

client.on('error', err => console.log('Redis Client Error', err));

module.exports = client;
