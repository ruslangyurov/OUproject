import react from 'react';
import {io} from 'socket.io-client';
import {useState,createContext, useRef, useContext} from 'react'
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { buttonBaseClasses } from '@mui/material';






const socketContext = createContext()

export const SocketContextProvider = ({children}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [bayData, setBayData] = useState(null)
    const [updatedAt, setUpdatedAt] = useState(null)
    const [inbound, setInbound] = useState([])
    const [outbound, setOutbound] = useState([])
    const [bayDeleted, setBayDeleted] = useState(null)
    const [bayUpdater, setBayUpdater] = useState(null)
    const [trestleUpdater, setTrestleUpdater] = useState(null)
    const [trestleUpdated, setTrestleUpdated] = useState(null)
    const socketRef = useRef(null)
    const {isAuth} = useAuth(); 

  
    
    useEffect(() => {
      if (!socketRef.current) {
        socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {autoConnect: false, transports:["websocket"]});
      }

      const socket = socketRef.current;

     

      const connectSocket = () => {
        if (isAuth) {
          socket.connect({transports:["websocket"]})
          setIsConnected(true)
          
          socket.emit("requestBays")
          socket.on("allBays", (data) => {
            if (data) {
              setInbound(data.inbound)
              setOutbound(data.outbound)
            }
          })

          socket.on("bayUpdated", (data) => {
            if (data.status === "200") {
                setBayData(data.bayInfo) 
                setUpdatedAt(data.updateTime)
                setBayUpdater(data.user)
            }
      })
          
          socket.on("bayDeleted", (data) => {
            setBayDeleted({status:true, bayNumber:data})
            setInbound(prev => prev.map(b => b.bayNumber === data ? {...b, trestleOn:false}:b))
          })

          socket.on("trestleUpdated", (bay) => {
            
            if (bay) {
              console.log(bay)
              setInbound(prev => prev.map(b => b.bayNumber === bay.bayNumber ? {...b, trestleOn: bay.trestleOn} : b))}
              setTrestleUpdated({time:bay.trestleUpdated, bayNumber:bay.bayNumber})
              setTrestleUpdater(bay.user)
            })
        } else {
          if (socket) {
            socket.disconnect()
          }
        }
      }

      connectSocket();

     return () => {
      socket.off('allBays');
      socket.off('bayUpdated');
      socket.off("bayDeleted")
      socket.off("trestleUpdated")
      socket.disconnect();
    };

  }, [isAuth]);
    
  

  return (
    <socketContext.Provider value = {{socket:socketRef.current, isConnected, bayData, updatedAt, inbound,outbound, bayDeleted, trestleUpdated, bayUpdater, trestleUpdater}}>
      {children}
    </socketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(socketContext)
}

