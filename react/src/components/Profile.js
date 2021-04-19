import React from "react";
import AuthService from "../services/auth.service";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserEvents from "../components/UserEvents";
import CreatedEvents from "../components/CreatedEvents";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
        <Tab eventKey="home" title="My Events">
          <UserEvents/>
        </Tab>
        <Tab eventKey="profile" title="Created Events">
          <CreatedEvents/>
        </Tab>
    </Tabs>
    </div>
  );
};

export default Profile;