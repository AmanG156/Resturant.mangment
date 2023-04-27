import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
const Count = (props) => {
    
    const [time, setTime] = useState(null);
    const [diff1, setDiff1] = useState(0)
    const [diff, setDiff] = useState(0)
    const [bool, setBool] = useState(false)
    useEffect(()=>{
        
        let currentDate = new Date() *1;
        let updatedDate = new Date(props.time) *1
        let diff = currentDate - updatedDate;
        setDiff(diff)
        
    }, [])
    const calll = (min, sec, props)=>{
        if(min===0 && sec===0){
            active()
        }
    }

    const active =()=>{
        props.active()
    }



  return ( 

    <div>
  
        <Countdown
    date={Date.now() + (400000-diff)}
    intervalDelay={1000}
    precision={3}
    renderer={props => diff<1200000 ?
    <div>
        
        {props.minutes}
        : 
        {props.seconds} 
        {calll(props.minutes, props.seconds, props)}
        
        </div>
    :""}
  />
        </div>
  )
}

export default Count