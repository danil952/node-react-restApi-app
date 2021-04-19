import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";



const getUserEvents = () => {
  return fetch('http://localhost:8080/api/user/events', {
    method: "GET",
    // body: JSON.stringify(''),
    headers: authHeader()
  })
}

const getCategories = () => {
  return fetch('http://localhost:8080/categories', {
    method: "GET"
  })
}


const getCreatedEvents = () => {
  return fetch('http://localhost:8080/api/user/author/events', {
    method: "GET",
    // body: JSON.stringify(''),
    headers: authHeader()
  })
}

const deleteCreatedEvent = (id) =>{
  return fetch('http://localhost:8080/api/user/events/'+id, {
    method: "DELETE",
    headers: authHeader()
  })
}

const deleteUserRecord = (id) =>{
  return fetch('http://localhost:8080/api/user/records/'+id, {
    method: "DELETE",
    headers: authHeader()
  })
}

const createEvent=(event)=>
{
  return fetch('http://localhost:8080/api/user/events/', {
    method: "POST",
    body: JSON.stringify(event),
    headers: authHeader()
  })
}

const editEvent=(event,id)=>
{
  return fetch('http://localhost:8080/api/user/events/'+id, {
    method: "PUT",
    body: JSON.stringify(event),
    headers: authHeader()
  })
}

const getAllEvents=()=>
{
  return fetch('http://localhost:8080/api/events', {
    method: "GET",
    headers: authHeader()
  })
}

const createUserRecord = (id) =>{
  return fetch('http://localhost:8080/api/user/records/'+id, {
    method: "POST",
    headers: authHeader()
  })
}

const createRecord=(record)=>
{
  return fetch('http://localhost:8080/api/records', {
    method: "POST",
    body: JSON.stringify(record),
    headers: authHeader()
  })
}






export default {
  getUserEvents,
  getCreatedEvents,
  deleteCreatedEvent,
  deleteUserRecord,
  getCategories,
  createEvent,
  editEvent,
  getAllEvents,
  createUserRecord,
  createRecord
};