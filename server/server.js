import express from "express";
import 'dotenv/config';
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./configs/db.js";
import { connectRedis } from "./configs/redis.js";
import { errorHandler } from "./utils/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

// Import routes
import authRouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import tagRouter from "./routes/tagRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import settingsRouter from "./routes/settingsRoutes.js";

const app = express();

// Connect to Database
await connectDB();

// Connect to Redis (optional - will continue without it if fails)
await connectRedis();

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

// Compression Middleware
app.use(compression());

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
app.use('/api', apiLimiter);

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blog API is running",
        version: "2.0.0",
        endpoints: {
            auth: "/api/auth",
            blogs: "/api/blogs",
            comments: "/api/comments",
            categories: "/api/categories",
            tags: "/api/tags",
            settings: "/api/settings"
        }
    });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/tags', tagRouter);
app.use('/api/admin', adminRouter);
app.use('/api/settings', settingsRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API URL: http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log(' HTTP server closed');
        process.exit(0);
    });
});

export default app;



