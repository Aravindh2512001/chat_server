const isProduction = process.env.NODE_ENV === 'production';

const corsOptions = isProduction
  ? {
      origin: 'https://myapp.com',  // Production domain
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }
  : {
      origin: '*',  // Allow localhost during development
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    };

