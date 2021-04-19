import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Event from "../components/Event";
import authHeader from "../services/auth-header";

function UserEvents()
{
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let isMounted=true;
        UserService.getUserEvents()
        .then((res)=> 
        {
            return res.json()
        })
        .then(
            res=>
            {
                if(res !==undefined && isMounted)setEvents(res.events)            
            }
        )
        return () => { isMounted = false };
        

      }, []);
      function removeRecord(id){
        UserService.deleteUserRecord(id)
        .then(
            setEvents(events.filter(event=>event.id !== id))
        )
      }
  return(
      <div >
          {events && events.map(event=>(<Event key={event.id} event={event} onDelete={()=>removeRecord(event.id)}/>))}
      </div>
  );
}

export default UserEvents;