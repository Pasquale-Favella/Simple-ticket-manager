const { Server } = require("socket.io");
const { server } = require('../rest')
const io = new Server(server);

const ticketService = require('../service/ticket.service');


  
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('JOIN', async () => {
      console.log('emitting board state...');
      let data = await  ticketService.getTicketState()
      io.emit('CURRENT_BOARD_STATUS',data);
    });
  
    socket.on('BOARD_UPDATE', async (data) => {
      console.log('emitting board state updated...');
      await ticketService.updateTicketState(data);
      let doc = await  ticketService.getTicketState()
      io.emit('CURRENT_BOARD_STATUS',doc);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
  });

  module.export = {io};