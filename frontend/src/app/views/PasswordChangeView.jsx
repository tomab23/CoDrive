import React, { useState, useEffect } from "react";
import Navbar from "../components/layouts/Navbar";
import { useFormik } from "formik";
import Input from "../components/Custom/Input";
import Button from "../components/Custom/Button";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import apiBackEndUser from "../api/backend/api.BackendUser";

const PasswordChangeView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    apiBackEndUser.get("/getUser").then((res) => {
      setUser(res.data);      console.log(res.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmited(values);
    },
  });

  return (
    <div className="passwordChangeView">
      <Navbar></Navbar>
      {/*titre*/}
      <h3 className="mt-16 mb-14 font-bold xl:ml-20 xs:ml-2">Mot de passe</h3>
      {/*Modifier mot de passe*/}
      <div className="mt-32">
        <h3 className="font-bold flex justify-center">
          <span className="bg-primary">Modifier</span>&nbsp; le mot de passe
        </h3>
        <span className="mt-12 font-bold text-[26px] flex justify-center xs:ml-2 xl:ml-0">
          8 caractères min., une majuscule, une minuscule et un caractère
          spécial
        </span>

        {/*Formulaire pour le mot de passe*/}
        <form
          onSubmit={formik.handleSubmit}
          className="grid h-[500px] place-items-center mt-20"
        >
          <div>
            <label htmlFor="currentPassword" className="text-2xl font-bold">
              Mot de passe actuel
            </label>
            <div className="my-3 relative flex items-center">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                className={
                  "  xs:w-[400px] sm:w-[500px] px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
                }
              />
              <div className="absolute inset-y-0 right-0 flex items-center mr-2">
                <button
                  type="button"
                  className="h-full p-2 text-dark"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* Icon mo
                      t de passe */}
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5  text-black" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="text-2xl font-bold">
              Nouveau mot de passe
            </label>
            <div className="my-3 relative flex items-center">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                className={
                  "  xs:w-[400px] sm:w-[500px]  px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
                }
              />
              <div className="absolute inset-y-0 right-0 flex items-center mr-2">
                <button
                  type="button"
                  className="h-full p-2 text-dark"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* Icon mo
                      t de passe */}
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5  text-black" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-2xl font-bold">
              Confirmez le nouveau mot de passe
            </label>
            <div className="my-3 relative flex items-center">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                s
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                className={
                  "  xs:w-[400px] sm:w-[500px]  px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
                }
              />
              <div className="absolute inset-y-0 right-0 flex items-center mr-2">
                <button
                  type="button"
                  className="h-full p-2 text-dark"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* Icon mo
                      t de passe */}
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5  text-black" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            label="Enregistrer les modifications"
            className={"mt-12 bg-secondary font-bold text-[22px]"}
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeView;
