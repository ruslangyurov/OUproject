import react from 'react';
import {io} from 'socket.io-client';
import {useState,createContext, useRef, useContext} from 'react'
import { useEffect } from 'react';
import { useAuth } from './AuthContext';





const socketContext = createContext()

export const SocketContextProvider = ({children}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [bayData, setBayData] = useState(null)
    const [updatedAt, setUpdatedAt] = useState(null)
    const [yard, setYard] = useState([])
    const [updater, setUpdater] = useState("")
    const socketRef = useRef(null)
    const {isAuth} = useAuth(); 
    
    useEffect(() => {
      if (!socketRef.current) {
        socketRef.current = io("http://localhost:10000", {autoConnect: false, transports:["websocket"]});
      }

      const socket = socketRef.current;

     

      const connectSocket = () => {
        if (isAuth) {
          socket.connect({transports:["websocket"]})
          setIsConnected(true)
          
          socket.emit("requestBays")
          socket.on("allBays", (data) => {
            if (data) {
              setYard(data)
            }
          })

          socket.on("bayUpdated", (data) => {
            if (data.status === "200") {
                setBayData(data.bayInfo) 
                setUpdatedAt(data.updateTime)
                setUpdater(data.username)
            }
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
      socket.disconnect();
    };

  }, [isAuth]);
    
  

  return (
    <socketContext.Provider value = {{socket:socketRef.current, isConnected, bayData, setBayData, updatedAt, setUpdatedAt, yard}}>
      {children}
    </socketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(socketContext)
}

// socket.on("connect", () => {
//   setIsConnected(true)
// })
// socket.on("disconnect", () => {
//   setIsConnected(false)
// })