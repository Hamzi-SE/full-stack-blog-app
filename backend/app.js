const express = require('express');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/error');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


// Route Imports
const postRoutes = require('./routes/postRoutes');

app.use('/api/v1/post', postRoutes);

// Middleware for Error Handling
app.use(errorMiddleware);

module.exports = app;