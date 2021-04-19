
const userRep = require('../repositories/userRep')
const recordRep = require('../repositories/recordRep')
const eventRep=require('../repositories/eventRep');
const placeRep=require('../repositories/placeRep');
const { compare } = require('bcryptjs');


exports.showResult = (req, res) => {
    userRep.get(req.userId)
    .then(user => {

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email
        
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.getUserEvents= (req,res) =>
{
   const eventIds=[];
   recordRep.getByUserId(req.userId)
   .then(rows=>
    {
      rows.forEach(x=>{eventIds.push(x.event_id)});
      return eventRep.getByIdArr(eventIds);
    })
    .then(events=>
      {
        res.status(200).send({events: events});
      }
    )
   .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.getCreatedEvents= (req,res) =>
{
   eventRep.getByAuthorId(req.userId)
   .then(rows=>
    {
      res.status(200).send({events: rows});
    })
   .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.deleteCreatedEvent =(req,res)=>
{
  const id = parseInt(req.params.id);
  const user_id = req.userId;
  eventRep.get(id)
  .then(event=>
    {
      if(event.author_id==user_id)
      {
        eventRep.remove(id);
      }
    }
  )
  .then(res.status(200).send())
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.deleteUserRecord = (req,res)=>
{
  const id = parseInt(req.params.id);
  const user_id = req.userId;
  recordRep.getByUserAndEventId(user_id, id)
  .then(record=>
    {
      recordRep.remove(record.id)
    }
  )
  .then(
    res.status(200).send()
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.createEvent=(req,res)=>
{
  const event = req.body;
  const user_id= req.userId;
  const place={
    name: "",
    map: event.place_id
  }
  placeRep.post(place)
  .then(res=>
    {
      const id=res.id;
      event.place_id=id;
      event.author_id=user_id;
      eventRep.post(event)
    }
  )
  .then(
    res.status(200).send()
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.editEvent=(req,res)=>
{
  const event = req.body;
  const user_id= req.userId;
  const event_id=parseInt(req.params.id);
  event.author_id=user_id;
  const place={
    name: "",
    map: event.place_id
  }
  placeRep.post(place)
  .then(res=>
    {
      event.place_id=res.id;
      eventRep.put(event_id,event)
    })
  .then(
    res.status(200).send()
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}

exports.getAllEvents=(req,res)=>
{
  const user_id=req.userId;
  const eventIds=[];
   recordRep.getByUserId(user_id)
   .then(rows=>
    {
      rows.forEach(x=>{eventIds.push(x.event_id)});
      return eventRep.getByNotIdArr(eventIds);
    })
    .then(events=>
      {
        const filtered= events.filter(event=>event.author_id !== user_id)
        res.status(200).send({events: filtered});
      }
    )
   .catch(err => {
    res.status(500).send({ message: err.message });
    });

}

exports.createRecord=(req,res)=>
{
  recordRep.post(req.body)
  .then(
    res.status(200).send()
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
    });
}
