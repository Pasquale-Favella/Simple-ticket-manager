const db = require('../db');

const tickets = db.tickets;

const getTicketState =  () =>{

    return new Promise((resolve, reject)=> {
        tickets.findOne({}).exec((error, result)=>{
            if (error !== null) reject(error);
            else resolve(result);
        });
    });
}

const updateTicketState = (data) =>{

    return new Promise((resolve, reject)=> {
        tickets.update({_id:data._id},{...data},{},(err,num)=>{
            if (err !== null) reject(err);
            else resolve(num);
        })
    });
}

const updateTicketDescription = async ({laneId,description,ticketId,title}) =>{

    let data = await getTicketState();


    data.lanes = data.lanes.map(lane => {
        if(lane.id===laneId){
            lane.cards.map(card=>{
                if(card.id===ticketId)card.description=description
                return card
            })
        }
        return lane
    });


    const message = await updateTicketState(data);

    return message
}

const deleteTicketById = async ({laneId,ticketId})=>{

    let data = await getTicketState();

    data.lanes = data.lanes.map(lane => {
        if(lane.id===laneId){
            lane.cards=lane.cards.filter(card => card.id!=ticketId)
        }
        return lane
    });

    const message = await updateTicketState(data);

    return message
}



module.exports = {getTicketState,updateTicketState,updateTicketDescription,deleteTicketById};