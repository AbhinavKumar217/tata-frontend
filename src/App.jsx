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

function App() {
  return (
    <>
      <div className="app-container bg-light">
        <Nav />
        <div className="container pt-4 pb-4">
          <Routes>
            <Route path="/" element={<Users />} />

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
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
