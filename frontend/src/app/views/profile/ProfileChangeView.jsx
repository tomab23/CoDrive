import React, { useState, useEffect } from "react";
import { storage } from "../../api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Button from "../../components/Custom/Button";
import { useFormik } from "formik";
import Input from "../../components/Custom/Input";
import parler from "../../assets/pictures/profile/Parler.svg";
import musique from "../../assets/pictures/profile/Musique.svg";
import cig from "../../assets/pictures/profile/cig.svg";
import {
  URL_NEW_PROFILE,
  URL_PAYMENT_PREFERENCE,
  URL_PROFILE,
} from "../../constants/urls/urlFrontEnd";
import { useLocation, useNavigate } from "react-router-dom";
import { addImageProfile, getImageProfile, image, profileChange } from "../../api/backend/account";
import * as Yup from "yup";
import {
  REGEX_EMAIL,
  REGEX_FIRSTNAME,
  REGEX_LASTNAME,
} from "../../constants/regex";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux-store/authenticationSlice";
import avatar from "../../assets/pictures/avatar.jpg"

const ProfileChangeView = ({ user }) => {
  const [isDiscuss, setIsDiscuss] = useState(false);
  const [isMusic, setIsMusic] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const location = useLocation();
  const userinfo = location.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('User:', user, userinfo);
  }, [user]);

  const logout = () => {
    dispatch(signOut());
  };

  const ValidSchema = Yup.object().shape({
    lastname: Yup.string()
      .matches(REGEX_LASTNAME, "Caractère nom et prénom incorrect")
      .min(2, "Trop petit")
      .max(30, "trop long")
      .required("Ce champ est obligatoire"),
    firstname: Yup.string()
      .matches(REGEX_FIRSTNAME, "Caractère nom et prénom incorrect")
      .min(2, "Trop petit")
      .max(30, "trop long")
      .required("Ce champ est obligatoire"),
    mail: Yup.string()
      .matches(REGEX_EMAIL, "Le format du mail n est pas correct")
      .email("Le format du mail n'est pas correct")
      .required("L'email est obligatoire"),
    bio: Yup.string().max(300, "Votre texte est trop long !"),
    image: Yup.mixed().test('fileType', 'Veuillez sélectionner une image valide', (value) => {
      if (!value) return true;
      return value && value.type.startsWith('image/');
    }),
  });

  const formik = useFormik({

    initialValues: {
      lastname: userinfo?.lastname,
      firstname: userinfo?.firstname,
      bio: userinfo?.bio,
      isDriver: userinfo?.driver,
      mail: userinfo?.mail,
      //   music: userinfo.preferences.music,
      //  discuss: userinfo.preferences.discuss,
      //  smoking: userinfo.preferences.music,
    },
    onSubmit: (values) => {
      handleSubmit(values);

    },
    enableReinitialize: true,
    validationSchema: ValidSchema,
  });

  // {GESTION DES IMAGES}
  const [profile, setProfile] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //RECUPERE IMAGE PROFILE
  useEffect(() => {
    getImageProfile()
      .then((res) => {
        setProfile(res.data.image);
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
  }, []);

  //SELECTION D'IMAGES
  useEffect(() => {
    if (imageUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageUpload);
    } else {
      setImagePreview(null);
    }
  }, [imageUpload]);

  //ENVOIS IMAGE BACK & SERVEUR
  const uploadImage = async () => {

    console.log("uploadImage function called");
    if (imageUpload == null) return;

    if (!imageUpload.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    try {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const imageUrl = await getDownloadURL(imageRef);
      await addImageProfile({ image: imageUrl }, null);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload the image.");
    }
  };

  //SOUMITION FORMULAIRE
  const handleSubmit = async (values) => {
    try {
      console.log("handleSubmit function called");
      await uploadImage();

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update the profile.");
    }
    const UserUpdate = {
      firstname: values.firstname,
      lastname: values.lastname,
      bio: values.bio,
      mail: values.mail,
      isDriver: values.isDriver,
      //  music: values.music,
      //  smoking: values.smoking,
    };

    const response = await profileChange(UserUpdate);

    console.log("Profile updated successfully:", response);

    navigate(URL_NEW_PROFILE);

  };

  // preferenceChange(values).then((res) => {
  //   setIsDiscuss((isDiscuss) => ({ ...isDiscuss, isDiscuss: values.discuss }));
  //   setIsSmoking((isSmocking) => ({ ...isSmocking, isSmoking: values.smoking }));
  //   setIsMusic((isMusic) => ({ ...isMusic, isMusic: values.music }));
  // });

  return (
    <div className="profileChangeView">
      {/*navabar component*/}
      <Navbar />

      {/*titre*/}
      <h3 className="mt-16 mb-14 font-bold ml-20">Modifier mes informations</h3>

      {/*photo de profil*/}
      {/*photo de profil*/}
      <div className="grid h-[600px] place-items-center">
        <h3 className="font-bold">
          <span className="bg-primary">Photo</span> de profil
        </h3>
        <div className="w-44 h-39 my-10">
          <img
            src={imagePreview || (profile ? profile : avatar)}
            alt="User Profile"
            className="rounded-[10px]"
          />
        </div>
        <div>
          <label
            htmlFor="upload-input"
            className="flex flex-row bg-primary px-3 py-2 mb-6 text-black cursor-pointer rounded"
          >
            Modifier la photo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-6 h-6 font-bold ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
            className="hidden"
          />
          {formik.errors.image && (
            <p className="text-red-500">{formik.errors.image}</p>
          )}
        </div>

        <div className="text-lg font-semiBold italic">
          <p>Taille recommandée</p>
          <p className="text-center"> 197 x 197 px</p>
        </div>
      </div>


      {/*formulaire informations personnelles*/}
      <div className="grid h-[300px] place-items-center">
        <h3 className="font-bold flex">
          <p className="bg-primary">Informations</p>&nbsp;personnelles
        </h3>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="-mt-[20px] grid grid-col-3 gap-12 w-full justify-items-center"
      >
        <div className="col-span-3 -mt-[20px]">
          <label htmlFor="firstname" className="text-2xl font-bold">
            Prénom
          </label>
          <div className="mt-3">
            <Input
              id="firstname"
              name="firstname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstname}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
              }
              error={formik.touched.firstname && formik.errors.firstname}
            />
          </div>
        </div>
        <div className="col-span-3 -mt-[20px]">
          <label htmlFor="lastname" className="text-2xl font-bold">
            Nom
          </label>
          <div className="mt-3">
            <Input
              id="lastname"
              name="lastname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
              }
              error={formik.touched.lastname && formik.errors.lastname}
            />
          </div>
        </div>
        <div className="col-span-3 -mt-[20px]">
          <label htmlFor="mail" className="text-2xl font-bold">
            Adresse mail
          </label>
          <div className="my-3">
            <Input
              id="mail"
              name="mail"
              type="mail"
              onChange={formik.handleChange}
              value={formik.values.mail}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
              }
              error={formik.touched.mail && formik.errors.mail}
            />
          </div>
        </div>
        <div className="col-span-3 -mt-[20px]">
          <label htmlFor="mail" className="text-2xl font-bold">
            Bio
          </label>
          <div className="my-3 ">
            <textarea
              id="bio"
              name="bio"
              type="bio"
              onChange={formik.handleChange}
              value={formik.values.bio}
              className={
                "px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] h-[300px] w-[450px] rounded-[5px]"
              }
              error={formik.touched.bio && formik.errors.bio}
            />
          </div>
        </div>


        {/*information concernant les trajets*/}
        <div className="col-span-3 mt-16 -ml-[50px] mb-32">
          <h3 className="font-bold">
            Concernant <span className="bg-primary">les trajets</span>
          </h3>
        </div>

        {/*info sur les discussions*/}
        <div className="ml-20">
          <img src={parler} className="w-full h-60"></img>
          <div className="mt-12 cursor-pointer text-center font-bold">
            <h5
              className={
                formik.values.discuss ? "text-black " : "text-dark opacity-70"
              }
              onClick={() => setIsDiscuss(!formik.values.discuss)}
            >
              Je discute
            </h5>
            <h5
              className={
                formik.values.discuss ? "text-dark opacity-70" : "text-black"
              }
              onClick={() => setIsDiscuss(!formik.values.discuss)}
            >
              J'aime les trajets silencieux
            </h5>
          </div>
        </div>

        {/*information sur la musique*/}
        <div>
          <img src={musique} className="w-full h-60"></img>
          <div className="mt-12 cursor-pointer text-center font-bold">
            <h5
              className={
                formik.values.music ? "text-black " : "text-dark opacity-70"
              }
              onClick={() => setIsMusic(!formik.values.music)}
            >
              J'écoute de la musique
            </h5>
            <h5
              className={
                formik.values.music ? "text-dark opacity-70" : "text-black"
              }
              onClick={() => setIsMusic(!formik.values.music)}
            >
              Je n'en écoute pas
            </h5>
          </div>
        </div>

        {/*information sur la cigarette*/}
        <div className="mr-20">
          <img src={cig} className="w-full h-60"></img>
          <div className="mt-12 cursor-pointer text-center font-bold">
            <h5
              className={
                formik.values.smoking ? "text-black " : "text-dark opacity-70"
              }
              onClick={() => setIsSmoking(!formik.values.smoking)}
            >
              Je fume
            </h5>
            <h5
              className={
                formik.values.smoking ? "text-dark opacity-70" : "text-black"
              }
              onClick={() => setIsSmoking(!formik.values.smoking)}
            >
              Je ne fume pas
            </h5>
          </div>
        </div>

        <div className="col-span-3">
          <div className="relative flex mt-16">
            <label htmlFor="isDriver" className="text-[22px] font-bold">
              Je possède mon permis B
            </label>
            <div className="inline-flex ml-2 ">
              <Input
                id="isDriver"
                name="isDriver"
                type="checkbox"
                onChange={(e) => formik.setFieldValue('isDriver', e.target.checked)}
                checked={formik.values.isDriver}
                className={"border-2 border-black mt-1.5 ml-4 rounded-[5px]"}
              />

            </div>
          </div>
        </div>

        <div className="col-span-3 mb-28">
          <Button
            type="submit"
            label="Enregistrer les modifications"
            className={"bg-secondary font-bold text-[22px]"}
          ></Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ProfileChangeView;
