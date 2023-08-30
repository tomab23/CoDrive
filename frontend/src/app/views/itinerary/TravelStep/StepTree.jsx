import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, Formik } from "formik";
import Input from '../../../components/Custom/Input';
import Button from "../../../components/Custom/Button";
import CalendarTest from "../../test/CalendarTest"

const StepTreeValidationShema = Yup.object().shape({
  dateStarting: Yup.date()
    .required("Date de départ obligatoire"),
  hour: Yup.string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "Heure invalide (hh:mm)")
    .required("Ce champ est obligatoire"),
})

const StepTree = (props) => {

  const formik = useFormik({
    initialValues: {
      hour: props.data.hour,
      dateStarting: props.data.dateStarting,
    },
    validationSchema: StepTreeValidationShema,
    onSubmit: async (values) => {
      values.hour = `${values.hour}:00`;
      props.next(values);
    }
  });
  
  const handleDateSelected = (date) => {
    formik.setFieldValue("dateStarting", date);
  };

  return (
    <Formik validationSchema={StepTreeValidationShema} initialValues={props.data} >
      {() => (
        <Form onSubmit={formik.handleSubmit}>
          <h6 className="my-4 font-bold text-center">Sélectionnez <span className="bg-primary p-1">la date</span> de votre départ</h6>
          <div>
            <div className="flex items-center justify-center flex-col gap-2">
              <div className="relative flex items-center">
                <CalendarTest onDateSelected={handleDateSelected} touched={formik.touched.dateStarting} errors={formik.errors.dateStarting} />
              </div>
              {formik.touched.dateStarting && formik.errors.dateStarting && (
                <div className="text-red-500">{formik.errors.dateStarting}</div>
              )}
            </div>
            <h6 className="my-10 font-bold text-center"><span className="bg-primary p-1">votre horaire</span> de départ</h6>
            <div className="flex items-center justify-center flex-col gap-2 mb-6">
              <div className="relative justify-center flex items-center">
                <div className="flex items-center mb-5">
                  <Input
                    type="time"
                    name="hour"
                    placeholder=""
                    onChange={formik.handleChange}
                    className="rounded w-30 font-medium px-4 py-2 bg-input text-black border-black"
                  />
                </div>
              </div>
              {formik.touched.hour && formik.errors.hour && (
                <div className="text-red-500 text-xs">
                  {formik.errors.hour}
                </div>
              )}
            </div>
              <div className="flex justify-around">
            <Button type="button" className="bg-secondary" label="Retour" onClick={props.prev} />
            <Button type="submit" className="bg-secondary items-center" label="Continuer" />
            </div>
            
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default StepTree;