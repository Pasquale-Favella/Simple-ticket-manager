const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const ticketRoute = require('./routes/ticket.route');

app.use(express.json());
app.use('/api/tickets',ticketRoute);


app.use('/', express.static('public'));

function notFound(req, res, next) {
    res.status(404);
    const error = new Error("Not Found - " + req.originalUrl);
    next(error);
}
  
function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
      stack: err.stack,
    });
}
  
app.use(notFound);
app.use(errorHandler);
  

module.exports = {server};
  