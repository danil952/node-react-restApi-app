import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Event from "../components/Event";
import AuthService from "../services/auth.service"

function UserEvents()
{
    const currentUser = AuthService.getCurrentUser();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let isMounted=true;
        UserService.getAllEvents()
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
      function createRecord(id){
        const record=
        {
            event_id: id,
            user_id: currentUser.id

        }
        UserService.createRecord(record)
        .then(
            setEvents(events.filter(event=>event.id !== id))
        )
      }
  return(
      <div className="container" >
          <h2>All events</h2>
          {events && events.map(event=>(<Event key={event.id} event={event} onCreate={()=>createRecord(event.id)}/>))}
      </div>
  );
}

export default UserEvents;