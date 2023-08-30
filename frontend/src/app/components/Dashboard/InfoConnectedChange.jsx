import React, { useEffect, useState } from "react";
import Profile from "./Profile/Profile";
import Button from "../Custom/Button";
import smoking from "../../assets/pictures/profile/smoking.svg";
import banSmoking from "../../assets/pictures/profile/ban-smoking.svg";
import comments from "../../assets/pictures/profile/comments.svg";
import noComment from "../../assets/pictures/profile/no-comment.svg";
import music from "../../assets/pictures/profile/music.svg";
import noMusic from "../../assets/pictures/profile/no-music.svg";
import pen from "../../assets/pictures/profile/pen.svg";
import wallet from "../../assets/pictures/profile/wallet.svg";
import {
  URL_PROFILE_CHANGE,
  URL_PASSWORD_CHANGE,
  URL_ACCOUNT_DELETE,
  URL_ACCOUNT_DISABLE,
  URL_TRANSACTION,
} from "../../constants/urls/urlFrontEnd";
import { useNavigate } from "react-router-dom";
import apiBackEndUser from "../../api/backend/api.BackendUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changeBio } from "../../api/backend/account";
import { image } from './../../api/backend/account';


const InfoConnectedChange = () => {
  const [showChangeBio, setShowChangeBio] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isDiscuss, setIsDiscuss] = useState();
  const [isSmoking, setIsSmoking] = useState();
  const [isMusic, setIsMusic] = useState();
  
  console.log(isDiscuss,isSmoking,isMusic);
  useEffect(() => {
    apiBackEndUser.get("/profile").then((res) => {
      setUser(res.data);
    });
  }, []); 

  useEffect(() => {
    apiBackEndUser.get("/preference").then((res) => {
      setIsSmoking(res.data.preference?.smoking);
      setIsDiscuss(res.data.preference?.discuss);
      setIsMusic(res.data.preference?.music);     
    });
  }, []); 

  const ValidSchema = Yup.object().shape({
    bio: Yup.string().max(300, "Votre texte est trop long !"),
  });

  const formik = useFormik({
    initialValues: {
      bio: user?.bio,
    },
    onSubmit: (values) => {     
      handleSubmit(values);
    },
    validationSchema: ValidSchema,
    enableReinitialize: true,
  });

  const handleSubmit = (values) => {    
    setShowChangeBio(!showChangeBio);
    changeBio(values)
      .then((res) => { 
        setUser((user) => ({ ...user, bio: values.bio }));
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          console.log(error.code);
          alert("Erreur dans la modification du profile");
        }
      });
  };

  return (
    <div>
      {/*Titre mon tableau de bord*/}
      <h4 className="mt-16 mb-14 font-bold ml-20">
        Mon <span className="bg-primary">tableau de bord</span>
      </h4>
      {/*secion 1 mon tableau de bord*/}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-2 ml-20 w-[900px]">
          {/*section description du tableau de bord*/}
          <div className="col-span-3">
            <Profile colSpan={"col-span-5"} className={"ml-5"}></Profile>
            <div className="grid grid-cols-5 gap-1">
              {/*option profile 1 colonne 1 ligne*/}
              <div className="bg-primary rounded-[10px] w-36 mt-6 absolute">
                <div className="flex justify-between items-center px-4 py-2">
                  <label className="swap">
                    {/* this hidden checkbox controls the state */}
                    <input
                      type="checkbox"
                      checked={isSmoking}
                      className="invisible"
                    />
                    {/* smoking on icon */}
                    <img src={smoking} className="swap-on h-6"></img>
                    {/* smoking off icon */}
                    <img src={banSmoking} className="swap-off h-6"></img>
                  </label>
                  <label className="swap">
                    {/* this hidden checkbox controls the state */}
                    <input
                      type="checkbox"
                      checked={isDiscuss}
                      className="invisible"
                    />
                    {/* comment on icon */}
                    <img src={comments} className="swap-on h-6"></img>
                    {/* no comment off icon */}
                    <img src={noComment} className="swap-off h-6"></img>
                  </label>
                  <label className="swap">
                    {/* this hidden checkbox controls the state */}
                    <input
                      type="checkbox"
                      checked={isMusic}
                      className="invisible"
                    />
                    {/* music on icon */}
                    <img src={music} className="swap-on h-6"></img>
                    {/* no music off icon */}
                    <img src={noMusic} className="swap-off h-6"></img>
                  </label>
                </div>
              </div>

              {/*titre bio*/}
              <div className="flex justify-start col-span-4 mt-7 absolute left-[280px]">
                <h4 className="font-bold">
                  Votre <span className="bg-primary">bio</span>
                </h4>
                {showChangeBio ? (
                  ""
                ) : (
                  <img
                    src={pen}
                    className="h-4 mt-5 ml-5 cursor-pointer"
                    onClick={() => setShowChangeBio(!showChangeBio)}
                  ></img>
                )}
                {showChangeBio && (
                  <Button
                    type="submit"
                    label={"Valider les modifications"}
                    className={"bg-secondary text-xl ml-12 -mt-1"}
                  />
                )}
              </div>

              {/*crédits*/}
              <div className="row-span-5 flex h-52 w-36 items-center justify-center mt-[100px]">
                <div className="grid grid-rows-3 grid-flow-col gap-2">
                  <div className="flex justify-center">
                    <img src={wallet} className="h-6"></img>
                  </div>
                  <div className="flex justify-center">
                    <h6 className="font-bold">{user?.points}</h6>
                  </div>
                  <div className="flex justify-center -mt-3">
                    <p className="text-base font-bold">crédits</p>
                  </div>
               
                </div>
              </div>

              {/*Détails bio*/}
              <div className="absolute left-[265px] row-span-5 col-span-4 p-4 mr-20 mt-[100px]">
                {showChangeBio ? (
                  <div>
                    <textarea
                      id="bio"
                      name="bio"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.bio}
                      className={
                        "text-xl h-[200px] w-[700px] row-span-5 col-span-4 p-4 mr-20  bg-[#F5F8F5] rounded-[10px] border-[1px] border-[#47634F] border-opacity-30"
                      }
                      error={formik.touched.bio && formik.errors.bio}
                    />

                    <h6 className="text-black opacity-50 row-span-5 col-span-4 col-start-2 absolute top-[225px] left-[20px]">
                      300 caractères maximum
                    </h6>
                  </div>
                ) : (
                  <h5>{user?.bio}</h5>
                )}
              </div>
              {/*Section lien pour modifier le profil*/}
              <div className="text-right text-dark font-bold absolute right-20 top-[350px]">
                <h5
                  className="cursor-pointer"
                  onClick={() => navigate(URL_PROFILE_CHANGE)}
                >
                  Modifier mes informations
                </h5>
                <h5
                  className="my-7 cursor-pointer"
                  onClick={() => navigate(URL_PASSWORD_CHANGE)}
                >
                  Modifier mon mot de passe
                </h5>
                <h5
                  className="mb-7 cursor-pointer"
                  onClick={() => navigate(URL_ACCOUNT_DISABLE)}
                >
                  Désactiver mon compte
                </h5>
                <h5
                  className="cursor-pointer"
                  onClick={() => navigate(URL_ACCOUNT_DELETE)}
                >
                  Supprimer mon compte
                </h5>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoConnectedChange;
