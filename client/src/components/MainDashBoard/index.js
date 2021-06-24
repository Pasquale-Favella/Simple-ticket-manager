import { useState , useEffect} from 'react';
import './MainDashBoard.css';
import Board from 'react-trello';
import io from "socket.io-client";




let socket;
  
export const MainDashBoard = ()=>{

    const [socketData , setSocketData] = useState({lanes:[{
        id: '1',
        title: 'Nuovi',
        cards: []
      },{
        id: '2',
        title: 'In Carico',
        
        cards: []
      },{
        id: '3',
        title: 'Completed',
        cards: []
      }]});
    const [dataID , setDataId] = useState('');

    useEffect(()=>{
        socket = io();

        socket.emit('JOIN')

        return () => {
            socket.off();
        };

    },[])

    useEffect(()=>{
        socket.on('CURRENT_BOARD_STATUS',(initialData)=>{
            console.log(initialData)
            setDataId(initialData?._id);
            delete initialData["_id"]
            
            setSocketData(initialData);
        })

        return () => {
            socket.off();
        };

    },[])


const handleChange = (lanes)=>{

    console.log('LANES',{...lanes,_id:dataID})
    
    setSocketData(lanes);
    //socket.emit('BOARD_UPDATE',{...lanes,_id:dataID})
    
    
}

const onCardMoveAcrossLanes = ()=>{
    console.log('DRAG')
    socket.emit('BOARD_UPDATE',{...socketData,_id:dataID})
}


    
    return(
        <Board style={{backgroundColor: 'white'}}
         data={socketData} 
         onDataChange={handleChange}
         onCardMoveAcrossLanes={onCardMoveAcrossLanes}
         editable/>
    )
}

