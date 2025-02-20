import react from 'react';
import {io} from 'socket.io-client';
import {useState,useContext} from 'react'
import { useEffect } from 'react';
import { set } from 'mongoose';



const socketContextProvider = createContext()

const socketContext = () => {
    const [InitialiseSocket, setInitialiseSocket] = useState(false);
    const [bayUpdated, setBayUpdated] = useState(null)

    const socket = io()
    
    useEffect(() => {
      socket.on("connect", () => {
        setInitialiseSocket(true)
    })
      socket.on("disconnect", () => {
        setInitialiseSocket(false)
      })

      socket.on("baySuccesfullyUpdated", (response) => {
            if (response.status === "200") {
                setBayUpdated
            }
      })
    
    })
}