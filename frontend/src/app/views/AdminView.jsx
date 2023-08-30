import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import {
  URL_ADMIN_COMMENT,
  URL_ADMIN_TRAVEL,
  URL_ADMIN_USER,
  URL_ERROR_404,
  URL_ADMIN_ARCHIVE,
} from "../constants/urls/urlFrontEnd";
import { useSelector } from "react-redux";
import { selectHasRole } from "../redux-store/authenticationSlice";

const AdminView = () => {

  const hasRole = useSelector((state) => selectHasRole(state));
  const navigate = useNavigate();

  const [user, setUser] = useState(true);
  const [travel, setTravel] = useState(false);
  const [comment, setComment] = useState(false);
  const [archive, setArchive] = useState(false);

 useEffect(() => {
  if (hasRole !== "ADMIN") {
    navigate(URL_ERROR_404);
  }
 }, [])

  return (
    <div>
      <Navbar />
      <h4 className="ml-20 mt-16 font-bold">
        Page <span className=" bg-primary p-1">Admin</span>
      </h4>
        <div className="flex justify-center mb-10 mt-5 
        ">
  <div className="flex flex-col  border border-black rounded-lg py-2 px-3 font-bold 
  xl:w-auto
  sm:w-[660px]
  sm:flex-row sm:items-center">
    <button
      onClick={() => {
        setComment(false);
        setTravel(false);
        setArchive(false);
        setUser(true);
        navigate(URL_ADMIN_USER);
      }}
      className={
        user ? "bg-primary px-3 py-1 rounded" : "px-3 py-1 rounded"
      }
    >
      Gestion des utilisateurs
    </button>

    <button
      onClick={() => {
        setComment(false);
        setTravel(true);
        setArchive(false);
        setUser(false);
        navigate(URL_ADMIN_TRAVEL);
      }}
      className={
        travel ? "bg-primary px-3 py-1 rounded" : "px-3 py-1 rounded"
      }
    >
      Gestion des trajets
    </button>

    <button
      onClick={() => {
        setComment(true);
        setTravel(false);
        setArchive(false);
        setUser(false);
        navigate(URL_ADMIN_COMMENT);
      }}
      className={
        comment ? "bg-primary px-3 py-1 rounded" : "px-3 py-1 rounded"
      }
    >
      Gestion des commentaires
    </button>

    <button
      onClick={() => {
        setComment(false);
        setTravel(false);
        setArchive(true);
        setUser(false);
        navigate(URL_ADMIN_ARCHIVE);
      }}
      className={
        archive ? "bg-primary px-3 py-1 rounded" : "px-3 py-1 rounded"
      }
    >
      Gestion des archives
    </button>
  </div>
</div>

      <Outlet />
    </div>
  );
};

export default AdminView;
