import react from 'react';
import {io} from 'socket.io-client';
import {useState,createContext, useRef, useContext} from 'react'
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { buttonBaseClasses } from '@mui/material';






const socketContext = createContext()

export const SocketContextProvider = ({children}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [inbound, setInbound] = useState([])
    const [outbound, setOutbound] = useState([])
    const [parking, setParking] = useState([])
    const [bayDeleted, setBayDeleted] = useState(null)
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
            if (data.status === 200) {
               
              if (data.bayInfo.bayNumber <= 30) {
                setInbound(prev => prev.map(bay => (
                bay.bayNumber === data.bayInfo.bayNumber ? {...bay, ...data.bayInfo}:bay
                )))
              } else if (30 < data.bayInfo.bayNumber < 70) {
                setOutbound(prev => prev.map(bay => (
                  bay.bayNumber === data.bayInfo.bayNumber ? {...bay, ...data.bayInfo}:bay
                )))
              } else {
                setParking(prev => prev.map(bay => (
                  bay.bayNumber === data.bayInfo.bayNumber ? {...bay, ...data.bayInfo}:bay
                )))
              }
            }
          })
          
           socket.on("bayDeleted", (data) => {
              if (data.status === 200) {
               
                if (data.bayInfo.bayNumber <= 30) {
                  setInbound(prev => prev.map(bay => (
                  bay.bayNumber === data.bayInfo.bayNumber ? {...bay, ...data.bayInfo}:bay
                  )))
                } else if (30 < data.bayInfo.bayNumber < 70) {
                  setOutbound(prev => prev.map(bay => (
                    bay.bayNumber === data.bayInfo.bayNumber ? {...bay, ...data.bayInfo}:bay
                  )))
                } else {
                  setParking(prev => prev.map(bay => (
                    bay.bayNumber === data.bayInfo.bayNumber ? {...bay, ...data.bayInfo}:bay
                  )))
                }
            }
          }
          )
           

          socket.on("trestleUpdated", (bay) => {
            if (!bay) return;

            

            if (bay.bayNumber <= 30) {
              setInbound(prev =>
                prev.map(b => b.bayNumber === bay.bayNumber ? { ...b, trestleOn: bay.trestleOn, trestleUpdatedAt: bay.trestleUpdatedAt, trestleUpdatedBy: bay.trestleUpdatedBy } : b));
            } else if (bay.bayNumber > 30 && bay.bayNumber < 70) {
              setOutbound(prev =>
                prev.map(b => b.bayNumber === bay.bayNumber ? { ...b, trestleOn: bay.trestleOn } : b));
            } else {
              setParking(prev =>
                prev.map(b => b.bayNumber === bay.bayNumber ? { ...b, trestleOn: bay.trestleOn } : b)
              );
            }
          });


          // socket.on("brokenBayUpdate", (data) => [
          //     setBrokenBayUpdate(data)
          // ])



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
      socket.off("brokenBayUpdate")
      socket.disconnect();
    };

  }, [isAuth]);
    
  

  return (
    <socketContext.Provider value = {{socket:socketRef.current, isConnected, inbound, setInbound, outbound, bayDeleted}}>
      {children}
    </socketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(socketContext)
}

