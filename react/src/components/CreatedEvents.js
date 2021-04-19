import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Event from "../components/Event";
import AuthService from "../services/auth.service";

function CreatedEvents()
{
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let isMounted= true;
        UserService.getCreatedEvents()
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

      function removeEvent(id){
        UserService.deleteCreatedEvent(id)
        .then(
            setEvents(events.filter(event=>event.id !== id))
        )
      }
  return(
      <div >
          {events && events.map(event=>(<Event key={event.id} event={event} author={true} onDelete={()=>removeEvent(event.id)}/>))}
      </div>
  );
}

export default CreatedEvents;