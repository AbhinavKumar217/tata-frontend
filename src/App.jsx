import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Users from "./adminViews/Users";
import AddGround from "./adminViews/AddGround";
import AddItem from "./adminViews/AddItem";
import AddLocation from "./adminViews/AddLocation";
import AddStaff from "./adminViews/AddStaff";
import AddUser from "./adminViews/AddUser";
import RequestMgm from "./adminViews/RequestMgm";
import UpdateGround from "./adminViews/UpdateGround";
import UpdateItem from "./adminViews/UpdateItem";
import UpdateLocation from "./adminViews/UpdateLocation";
import UpdateStaff from "./adminViews/UpdateStaff";
import UpdateUser from "./adminViews/UpdateUser";
import AddRequest from "./userViews/AddRequest";
import Grounds from "./userViews/Grounds";
import ItemMgm from "./userViews/ItemMgm";
import Locations from "./userViews/Locations";
import StaffMgm from "./userViews/StaffMgm";
import LoginPage from "./login/Login";
import Footer from "./components/Footer";
import AdminRoute from "./login/AdminRoute";
import ProtectedRoute from "./login/ProtectedRoute";
import Cookies from "js-cookie";
import GlobalKeys from "./constants/Keys";
import { useEffect, useState } from "react";
import LandingPage from "./userViews/LandingPage";
import SelectedGroundReq from "./userViews/SelectedGroundReq";

function App() {
  return (
    <>
      <div
        className="app-container pb-5 pl-1 pr-1"
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <div
          className="background-image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              'url("https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1380&t=st=1688619913~exp=1688620513~hmac=8bf038cfce973b8a8f16a589304c732318ce1e319988b009553e37845b7a3898")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotate(180deg)",
          }}
        />
        <Nav />
        <Routes>
          <Route path="/users" element={<Users />} />

          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/locations" element={<Locations />} />

          {/* <Route
              path="/locations"
              element={
                <ProtectedRoute>
                  <Locations />
                </ProtectedRoute>
              }
            /> */}

          <Route path="/grounds" element={<Grounds />} />

          <Route path="/addreq" element={<AddRequest />} />

          <Route path="/approvereq" element={<RequestMgm />} />

          <Route path="/item" element={<ItemMgm />} />

          <Route path="/staff" element={<StaffMgm />} />

          <Route path="/addlocation" element={<AddLocation />} />

          <Route path="/addground" element={<AddGround />} />

          <Route path="/updateground/:id" element={<UpdateGround />} />

          <Route path="/updatestaff/:id" element={<UpdateStaff />} />

          <Route path="/addstaff" element={<AddStaff />} />

          <Route path="/updatelocation/:id" element={<UpdateLocation />} />

          <Route path="/additem" element={<AddItem />} />

          <Route path="/updateitem/:id" element={<UpdateItem />} />

          <Route path="/updateuser/:id" element={<UpdateUser />} />

          {/* <AdminRoute path="/adduser" element={<AddUser />} /> */}

          <Route path="/adduser" element={<AddUser />} />

          <Route path="/" element={<LandingPage />} />

          <Route path="/groundreq/:id" element={<SelectedGroundReq />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
