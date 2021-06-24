import { useState } from "react";
import { Spinner } from 'reactstrap';
import { editTicket } from "../../service/TicketService";

export const EditTicket = ({ticket : {id,description,title,laneId},updateTicketTable,setModal})=>{

    const [descrizione,setDescrizione] = useState(description);
    const [loading,setLoading] = useState(false);

    const handleSubmit = async(e)=>{

        e.preventDefault();

        const ticketObj = {
            id,
            title:e.target.title.value,
            description : e.target.description.value,
            laneId,
        }

        try{

            setLoading(true);
            await editTicket(ticketObj);
            setLoading(false);
            setModal(false);
            updateTicketTable();

        }catch(err){

            setLoading(false);
            console.log('ERR',err)
        }

        
    }

    return (
        <>
            <h4>{title}</h4>

            <form onSubmit={handleSubmit}>
                <input type="hidden" id="title" name="title" value={title}></input>
                <input type="hidden" id="laneId" name="laneId" value={laneId}></input>
                <div className="form-group">
                    <label for="description">Descrizione :</label>
                    <textarea style={{resize:"none"}} 
                    className="form-control" 
                    id="description" 
                    name="description"
                    rows="5" 
                    value={descrizione}
                    onChange={(e)=>setDescrizione(e.target.value)}
                    ></textarea>
                </div>
                <div className="d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary">Aggiorna {loading ? <Spinner color="light" size="sm"/>: null}</button>
                    {' '}
                    <button type="button" className="btn btn-danger" onClick={()=>setModal(false)}>Cancel</button>
                </div>
            </form>
        </>
    )
}