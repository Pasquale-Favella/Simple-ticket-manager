const express = require('express');
const router = express.Router();
const ticketService = require('../../service/ticket.service');

router.get('/', async (req,res)=>{

    let data = await ticketService.getTicketState();

    let results = Object.values({...data.lanes}).reduce(( acc, val ) => [...acc,...val.cards],[]);
    return res.json({results,_id:data._id})

});

router.put('/edit/:ticketId', async (req,res)=>{

    const {ticketId} = req.params;
    const {description , title , laneId} = req.body;

    try {

        await ticketService.updateTicketDescription({description , title , laneId ,ticketId})
   
        return res.json({message:"ticket update success"});

    } catch (error) {
        return res.status(404).json({message : 'errore durante update'})
    }


});

router.delete('/delete/:ticketId',async (req,res)=>{

    const {ticketId} = req.params; 
    const {laneId} = req.body;

    console.log('BODY :',req.body)
    console.log('ticketId',ticketId);
    console.log('laneId',laneId);
    try {
        await ticketService.deleteTicketById({laneId,ticketId})
        return res.json({message:"ticket delete success"});
    } catch (error) {
        return res.status(404).json({message : 'errore durante delete'})
    }

    
});

module.exports = router;