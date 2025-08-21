import * as React from 'react';
import {useEffect} from 'react'



export const useTimer = (msg, setMsg) => {
  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg, setMsg]);
};


