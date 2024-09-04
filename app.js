const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const noteRouter = require('./routes/noteRouter');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10kb' }));

// Routes for note
app.use('/api/v1/notes', noteRouter);

// Error handling

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
