
import React from 'react'
import * as Yup from "yup";
import { useFormik, Form, Formik } from "formik";
import Input from '../../../components/Custom/Input';
import Button from "../../../components/Custom/Button";
import start from "../../../assets/pictures/itinerary/icons/searchInput/StartCity.svg"
import { REGEX_CITY, REGEX_ZIP, REGEX_STREET } from './../../../constants/regex';


const StepOneValidationSchema = Yup.object().shape({
  cityStart: Yup.string()
    .min(2, "Trop petit")
    .max(30, "trop long")
    .matches(REGEX_CITY, "Point de départ invalide")
    .required("Ce champ est obligatoire"),
  streetStart: Yup.string()
    .min(2, "Trop petit")
    .max(30, "trop long")
    .matches(REGEX_STREET, "rue de départ invalide")
    .required("Ce champ est obligatoire"),
  zipStart: Yup.string()
    .min(5, "trop petit")
    .matches(REGEX_ZIP, "code postal invalide")
    .required("Ce champ est obligatoire")
});

const StepOne = (props) => {
  const formik = useFormik({
    initialValues: {
      cityStart: props.data.cityStart,
      streetStart: props.data.streetStart,
      zipStart: props.data.zipStart
    },
    validationSchema: StepOneValidationSchema,
    onSubmit: (values) => {
      props.next(values);
    }
  });

  return (
    <Formik validationSchema={StepOneValidationSchema} initialValues={props.data} >
      {() => (
        <Form onSubmit={formik.handleSubmit} >
          <h6 className="my-10 font-bold text-center">Indiquez votre <span className="bg-primary p-1">point de départ</span></h6>
          <div>
            <div className="flex items-center justify-center flex-col gap-2 mb-6">
              <div className="relative flex">
                <div className="inline-flex w-80 mb-3">
                  <Input
                    type="text"
                    name="cityStart"
                    placeholder="Ville de départ"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cityStart}
                    className="rounded w-full font-medium px-4 py-2 pl-10 bg-input text-black border-none"
                    error={formik.touched.cityStart && formik.errors.cityStart}
                  />
                  <div className="absolute ml-1 mt-1 flex items-center pr-2">
                    <img src={start} className="h-8 w-8 bg-input  p-2 relative z-40" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-2 mb-6">
              <div className="relative flex">
                <div className="inline-flex items-center w-80 mb-3">
                  <Input
                    type="text"
                    name="streetStart"
                    placeholder="Rue de départ"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.streetStart}
                    className="rounded w-full font-medium px-4 py-2 bg-input text-black border-none"
                    error={formik.touched.streetStart && formik.errors.streetStart}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-2 mb-6">
              <div className="relative flex">
                <div className="inline-flex items-center w-80 mb-4">
                  <Input
                    type="text"
                    name="zipStart"
                    min={5}
                    maxLength={5}
                    placeholder="Code postal de départ"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zipStart}
                    className="rounded w-full font-medium px-4 py-2 bg-input text-black border-none"
                    error={formik.touched.zipStart && formik.errors.zipStart}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button type="button" className="bg-secondary mr-10" label="Retour" onClick={() => history.go(-1)} />
            <Button type="submit" className="bg-secondary items-center" label="Continuer" />
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default StepOne;