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
    const [updater, setUpdater] = useState("")
    const [trestleStatus, setTrestleStatus] = useState(null)
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
                setUpdater(data.username)
            }
      })
          socket.on("trestleUpdated", (bay) => {
            if (bay) {
              setTrestleStatus(bay)
              setInbound(prev => prev.map(b => b.bayNumber === bay.bayNumber ? {...b, trestleOn: bay.trestleOn} : b))}})
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
      socket.disconnect();
    };

  }, [isAuth]);
    
  

  return (
    <socketContext.Provider value = {{socket:socketRef.current, isConnected, bayData, updatedAt, updater, inbound,outbound, trestleStatus}}>
      {children}
    </socketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(socketContext)
}

