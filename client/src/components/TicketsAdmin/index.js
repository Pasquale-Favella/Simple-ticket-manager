import { useState , useEffect } from "react";
import { EditTicket } from "../EditTicket";
import { getAllTickets } from "../../service/TicketService";
import { Table,Button , Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteTicket } from "../DeleteTicket";

export const TicketsAdmin = ()=>{

    const [data , setData] =useState([]);
    const [chiavi , setChiavi ]=useState([]);
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [row, setRow] = useState({});
    const [ticketToDelete , setTicketToDelete] = useState({});

    const updateTicketTable = ()=>{

        getAllTickets()
         .then(dati => {
            if(dati?.results[0]){
                setData(dati?.results);    
                setChiavi([...Object.keys(dati?.results[0]).map(item => 'laneId'===item ? item = 'status':item),'Edit','Delete']);
            }else{
                setData([]);
                setChiavi(['id','title','description','status','Edit','Delete'])
            }
          })
         .catch(err=>console.log('ERRORE : ',err))
    }

    useEffect(()=>{
        updateTicketTable();
    },[]);

    const statusMapper = (status)=>{
        switch (status) {
            case "1":
                return (<span><FontAwesomeIcon className="text-danger"icon={"tasks"}/> Nuovo</span>);
            case "2":
                return (<span><FontAwesomeIcon className="text-warning"icon={"wrench"}/> In Carico</span>);
            
            case "3":
                return (<span><FontAwesomeIcon className="text-success"icon={"check-circle"}/> Completed</span>);    
        
            default:
                break;
        }
    }

    const toggle = (ticket = {}) =>{
        setModal(!modal);
        setRow(ticket);
    } 
    const toggleDelete = (ticket = {}) =>{
        setModalDelete(!modalDelete);
        setTicketToDelete(ticket);
    } 

   

    return(
        <>
            {data.length>0 ? null:<h3 className="text-center mt-5">No tickets to display..</h3>}
            <Table responsive hover>
                <thead>
                <tr>
                    {!!chiavi && chiavi.map(chiave=>(<th key={chiave}>{chiave}</th>))}
                </tr>
                </thead>
                <tbody>
                {data.map((riga , idx)=>(
                    <tr key={riga?.id}>
                        <th scope="row">{riga?.id.substring(0,7)+'...'}</th>
                        <td>{riga?.title}</td>
                        <td>{riga?.description.substring(0,10)+'...'}</td>
                        <td>{statusMapper(riga?.laneId)}</td>
                        <td><Button color="primary" onClick={()=>toggle(riga)}><FontAwesomeIcon icon={"edit"}/></Button></td>
                        <td><Button color="danger" onClick={()=>toggleDelete(riga)}><FontAwesomeIcon icon={"trash-alt"}/></Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>
                    {statusMapper(row?.laneId)}
                    <br/>
                    <small>Ticket id : {row?.id}</small>
                </ModalHeader>
                <ModalBody>
                    <EditTicket ticket={row} updateTicketTable={updateTicketTable} setModal={setModal} />
                </ModalBody>
            </Modal>
            <Modal isOpen={modalDelete} toggle={toggleDelete} >
                <ModalHeader toggle={toggleDelete}>
                    {statusMapper(ticketToDelete?.laneId)}
                    <br/>
                    <small>Ticket id : {ticketToDelete?.id}</small>
                </ModalHeader>
                <ModalBody>
                    <DeleteTicket ticket = {ticketToDelete} updateTicketTable={updateTicketTable} setModal={setModalDelete} />
                </ModalBody>
            </Modal>
        </>
    )
}