const {server} = require('./rest');
const {io} = require('./socket');
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('listening on *: '+PORT);
});