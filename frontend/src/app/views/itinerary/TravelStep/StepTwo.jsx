import React from 'react'
import * as Yup from "yup";
import { useFormik, Form, Formik } from "formik";
import Input from '../../../components/Custom/Input';
import Button from "../../../components/Custom/Button";
import end from "../../../assets/pictures/itinerary/icons/searchInput/EndCity.svg"
import { REGEX_CITY, REGEX_STREET, REGEX_ZIP } from '../../../constants/regex';

const StepTwoValidationShema = Yup.object().shape({
    cityEnd: Yup.string()
      .min(2, "Trop petit")
      .max(30, "trop long")
      .required(REGEX_CITY,"Ce champ est obligatoire"),
    streetEnd: Yup.string()
      .min(2, "Trop petit")
      .max(50, "trop long")
      .matches(REGEX_STREET,"rue de d'arrivé invalide")      
      .required("Ce champ est obligatoire"),
    zipEnd: Yup.string()
      .min(5, "Trop petit")
      .matches(REGEX_ZIP, "code postal invalide")
      .required("Ce champ est obligatoire")
  });
  
  const StepTwo = (props) => {
    const formik = useFormik({
      initialValues: {
        cityEnd: props.data.cityEnd,
        streetEnd: props.data.streetEnd,
        zipEnd: props.data.zipEnd
      },
      validationSchema: StepTwoValidationShema,
      onSubmit: (values) => {
        props.next(values);
      }
    });
  
    return (
      <Formik validationSchema={StepTwoValidationShema} initialValues={props.data} >
        {() => (
          <Form onSubmit={formik.handleSubmit}>
            <h6 className="my-10 font-bold text-center">Indiquez votre <span className="bg-primary p-1">point d'arrivée</span></h6>
            <div>
              <div className="flex items-center justify-center flex-col gap-2 mb-6">
                <div className="relative flex items-center">
                  <div className="inline-flex items-center w-80 mb-3">
                    <Input
                      type="text"
                      name="cityEnd"
                      placeholder="Ville d'arrivée"
                      onChange={formik.handleChange}
                      className="rounded w-full font-medium  px-4 py-2 pl-10 bg-input text-black border-none"
                      error={formik.touched.cityEnd && formik.errors.cityEnd}
                    />
                    {/* ICON */}
                    <div className="absolute ml-1 mt-1 flex items-center pr-2">
                      <img
                        src={end}
                        alt=""
                        className="h-8 w-8 p-2  bg-input relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-2 mb-6">
                <div className="relative flex items-center">
                  <div className="inline-flex items-center w-80 mb-3">
                    <Input
                      type="text"
                      name="streetEnd"
                      placeholder="Rue d'arrivée"
                      onChange={formik.handleChange}
                      className="rounded w-full font-medium  px-4 py-2 bg-input text-black border-none"
                      error={formik.touched.streetEnd && formik.errors.streetEnd}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-2 mb-6">
                <div className="relative flex items-center">
                  <div className="inline-flex items-center w-80 mb-3">
                    <Input
                      type="text"
                      name="zipEnd"
                      min={5}
                      maxLength={5}
                      placeholder="Code postal d'arrivée"
                      onChange={formik.handleChange}
                      className="rounded w-full font-medium  px-4 py-2 bg-input text-black border-none"
                      error={formik.touched.zipEnd && formik.errors.zipEnd}
                    />
                  </div>
                </div>
              </div>   
              <div className='flex justify-around'>
              <Button type="button" className="bg-secondary" label="Retour" onClick={props.prev} />
              <Button type="submit" className="bg-secondary" label="Continuer" />
              </div>
           
              
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  export default StepTwo;