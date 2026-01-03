import Redis from 'ioredis';

let redisClient = null;

export const connectRedis = async () => {
    try {
        redisClient = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
            maxRetriesPerRequest: 3
        });

        redisClient.on('connect', () => {
            console.log('Redis connected successfully');
        });

        redisClient.on('error', (err) => {
            console.error(' Redis connection error:', err.message);
        });

        // Test connection
        await redisClient.ping();
        
        return redisClient;
    } catch (error) {
        console.error(' Failed to connect to Redis:', error.message);
        console.log('  Application will continue without caching');
        redisClient = null;
        return null;
    }
};

export const getRedisClient = () => redisClient;

// Cache helper functions
export const cacheGet = async (key) => {
    if (!redisClient) return null;
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Redis GET error:', error.message);
        return null;
    }
};

export const cacheSet = async (key, value, expirationInSeconds = 3600) => {
    if (!redisClient) return false;
    try {
        await redisClient.setex(key, expirationInSeconds, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Redis SET error:', error.message);
        return false;
    }
};

export const cacheDel = async (key) => {
    if (!redisClient) return false;
    try {
        await redisClient.del(key);
        return true;
    } catch (error) {
        console.error('Redis DEL error:', error.message);
        return false;
    }
};

export const cacheDelPattern = async (pattern) => {
    if (!redisClient) return false;
    try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(...keys);
        }
        return true;
    } catch (error) {
        console.error('Redis DEL PATTERN error:', error.message);
        return false;
    }
};

export default redisClient;

