import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect } from "react-router-dom";

import UserService from "../services/user.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function EditForm(props)
{
  const form = useRef();
  const checkBtn = useRef();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categoryArr, setCategoryArr] = useState([]);

  useEffect(() => {
    let isMounted=true;
    if(props.location.event)
    {
      setId(props.location.event.id)
      setName(props.location.event.name);
      setDescription(props.location.event.description)
      setPlace(props.location.event.map)
      setDate(props.location.event.event_date)
    }
    UserService.getCategories()
    .then((res)=> 
    {
            return res.json()
    })
    .then(res=>
    {
        if(res !==undefined && isMounted)setCategoryArr(res)           
    })
    return () => { isMounted = false };
    
  },[]);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeDescription = (e) => {
    const description= e.target.value;
    setDescription(description);
  };

  const onChangePlace = (e) => {
    const place= e.target.value;
    setPlace(place);
  };

  const onChangeDate = (e) => {
    const date= e.target.value;
    setDate(date);
  };

  const onChangeCategory = (e) => {
    const category= e.target.value;
    setCategory(category);
  };

  

  const handleCreate = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setLoading(false);
        const event={
            name: name,
            description: description,
            category_id: category,
            place_id: place,
            event_date: date
        }
        UserService.editEvent(event,id)
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
        
}
  if(!props.location.event)return <Redirect to="/profile"/>
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleCreate} ref={form}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={onChangeName}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Input
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={onChangeDescription}
              validations={[required]}
            />
          </div>
          <div className="form-group">
          <label htmlFor="category">Category</label>
            <select className="custom-select" onChange={onChangeCategory}>
                <option></option>
                {categoryArr.map(item=>(<option key={item.id} value={item.id}>{item.name}</option>))}
            </select>
          </div>
        <div className="form-group">
            <label htmlFor="place">Place</label>
            <Input
              type="text"
              className="form-control"
              name="place"
              value={place}
              onChange={onChangePlace}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <Input
              type="text"
              className="form-control"
              name="date"
              value={date}
              onChange={onChangeDate}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Edit</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default EditForm;