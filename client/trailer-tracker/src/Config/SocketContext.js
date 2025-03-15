import react from 'react';
import {io} from 'socket.io-client';
import {useState,createContext, useRef} from 'react'
import { useEffect } from 'react';
import { set } from 'mongoose';




const socketContext = createContext()

export const SocketContextProvider = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [bayUpdated, setBayUpdated] = useState(null)

    const socketRef = useRef(null)
     
    
    useEffect(() => {
      if (!socketRef.current) {
        socketRef.current = io("http://localhost:10000")
      }

      const socket = socketRef.current;

      socket.on("connect", () => {
        setIsConnected(true)
    })
      socket.on("disconnect", () => {
        setIsConnected(false)
      })

      socket.on("bayUpdated", (data) => {
            if (data.status === "200") {
                setBayUpdated(data.bayInfo) 
            }
      })

      return () => {
        socket.off("connect")
        socket.off("disconnect")
        socket.off("bayUpdated")
      }
    
    }, [])

  return (
    <socketContext.Provider value = {{socket, isConnected, bayUpdated}}>
      {children}
    </socketContext.Provider>
  )

  export const getSocketContext = () => {
    scontext = 
  }
}