import { Link } from "react-router-dom";

export default function Event(props)
{
    return(
        <div className="container">
            <header className="jumbotron">
            <h3>
            Event name: <strong>{props.event.name}</strong>
            </h3>
            <p>Description: {props.event.description?props.event.description:""}</p>
            <p>Location: {props.event.map?props.event.map:""}</p>
            <p>Category: {props.event.category_name?props.event.category_name:""}</p>
            <p>Date: {props.event.event_date?props.event.event_date:""}</p>
            {!props.author &&(
            <p>Author: {props.event.user_name?props.event.user_name:""}</p>)}
            {!props.onCreate && <button className="btn" onClick={props.onDelete}>Delete</button>}
            {props.author && (<Link className="btn" to={{pathname: "/edit", event: props.event}}>Edit</Link>)}
            {props.onCreate && <button className="btn" onClick={props.onCreate}>Visit Event</button>}
            </header>
        </div>
    )
}
