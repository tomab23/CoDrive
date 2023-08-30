import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../Custom/Input";
import Button from "../../Custom/Button";
import { MailIcon } from "@heroicons/react/solid";
import { editUser } from "../../../api/backend/account";

const PopUp = ({ closePopup, user }) => {
  const editHandle = (id, values) => {
    const UserUpdate = {
      points: values.points,
      mail: values.mail,
      role: values.role,
      dateOfBirth : values.dateOfBirth,
    };

    editUser(UserUpdate, id)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ValidSchema = Yup.object().shape({
    role: Yup.string().min(2, "Trop petit").max(50, "Trop long !"),
    mail: Yup.string()
      .email("Adresse email invalide")
      .required("Adresse email obligatoire"),
    points: Yup.number().min(2, "Trop petit").max(99999999,"il sera trop riche"),
    dateOfBirth: Yup.date().max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "il n'a pas 18 ans ATTENTION"
    )
  });

  const formik = useFormik({
    initialValues: {
      mail: user.mail || "",
      points: user.points || "",
      role: user.role || "",
      dateOfBirth: user.dateOfBirth || "",
     
    },
    onSubmit: (values) => {
     
     editHandle(user.id, values);
    },
    validationSchema: ValidSchema,
  });
  console.log(user);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-primary bg-opacity-95 p-2 rounded-[30px] flex flex-col w-full max-w-md">
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="#92E3A9"
            className="w-5 h-5 rounded mt-5 mr-4 bg-gray-900 p-1 cursor-pointer"
            onClick={closePopup}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          {/* Titre  */}
          <p className="font-bold text-black mb-6 text-center">
            Modification de l'utilisateur {user.nom} {user.prenom}
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center justify-center">
                <div className="w-80 flex flex-col">
                  {/* Input de l'adresse mail */}
                  <label htmlFor="mail" className="text-black mb-1 self-start ml-3">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      name="mail"
                      id="mail"
                      placeholder="Adresse email"
                      value={formik.values.mail}
                      onChange={formik.handleChange}
                      className="rounded-full w-full font-medium px-4 py-2 text-black border-none"
                      error={formik.touched.mail && formik.errors.mail}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-80 flex flex-col">
                  {/* Input des points */}
                  <label htmlFor="points" className="text-black mb-1 self-start ml-3">
                    Points
                  </label>
                  <Input
                    type="number"
                    name="points"
                    id="points"
                    placeholder="Points"
                    value={formik.values.points}
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium px-4 py-2 text-black border-none"
                    error={formik.touched.points && formik.errors.points}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-80 flex flex-col">
                  {/* Input du role */}
                  <label htmlFor="role" className="text-black mb-1 self-start ml-3">
                    Role
                  </label>
                  <Input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium px-4 py-2 text-black border-none"
                    error={formik.touched.role && formik.errors.role}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-80 flex flex-col">
                  {/* Input date anniversaire */}
                  <label htmlFor="birthday" className="text-black mb-1 self-start ml-3">
                    Date anniversaire
                  </label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="birthday"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    className="rounded-full w-full font-medium px-4 py-2 text-black border-none"
                    error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  />
                </div>
              </div>
              <div>
              <Button type="submit" label="Valider" className="bg-secondary mb-4 mt-2" />
              </div>             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
