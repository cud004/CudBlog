import { cacheGet, cacheSet } from '../configs/redis.js';

// Cache middleware
export const cacheMiddleware = (duration = 3600) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        const key = `cache:${req.originalUrl}`;

        try {
            const cachedData = await cacheGet(key);
            
            if (cachedData) {
                console.log(`📦 Cache HIT: ${key}`);
                return res.status(200).json(cachedData);
            }

            console.log(`📭 Cache MISS: ${key}`);
            
            // Store original json method
            const originalJson = res.json.bind(res);
            
            // Override json method to cache the response
            res.json = function(data) {
                // Only cache successful responses
                if (res.statusCode === 200 && data.success) {
                    cacheSet(key, data, duration).catch(err => 
                        console.error('Cache set error:', err)
                    );
                }
                return originalJson(data);
            };
            
            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            next();
        }
    };
};

// Cache invalidation helper
export const invalidateCache = (patterns) => {
    return async (req, res, next) => {
        res.on('finish', async () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const { cacheDel, cacheDelPattern } = await import('../configs/redis.js');
                
                for (const pattern of patterns) {
                    if (pattern.includes('*')) {
                        await cacheDelPattern(pattern);
                    } else {
                        await cacheDel(pattern);
                    }
                }
            }
        });
        next();
    };
};

