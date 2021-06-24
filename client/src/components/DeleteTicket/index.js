import { useState } from "react";
import { Spinner } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteTicket } from "../../service/TicketService";

export const DeleteTicket = ({ticket : {id,laneId},updateTicketTable,setModal})=>{


    const [loading,setLoading] = useState(false);

    const handleDeleteTicket = async ()=>{

        try {
            setLoading(true);
            await deleteTicket({id,laneId});
            setLoading(false);
            setModal(false);
            updateTicketTable();
        } catch (error) {
            setLoading(false);
            console.log('ERROR DELETING',error)
        }
    }

    return (
        <div>
            <p>Sei sicuro di voler eliminare?</p>
            
            <div className="d-flex justify-content-around">
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={handleDeleteTicket}
                    >
                        Elimina {loading ? <Spinner color="light" size="sm"/>: <FontAwesomeIcon icon={"trash-alt"}/>}
                    </button>
                    {' '}
                    <button type="button" className="btn btn-primary" onClick={()=>setModal(false)}>Indietro <FontAwesomeIcon icon={"arrow-right"}/></button>
                </div>
        </div>
    )
}