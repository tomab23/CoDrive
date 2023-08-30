import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, Formik } from "formik";
import Input from '../../../components/Custom/Input';
import Button from "../../../components/Custom/Button";


const StepFourValidationShema = Yup.object().shape({
  placeAvailable: Yup.number()
    .min(1, "une place minimum")
    .max(6, "4 place maximum")
    .required("Champ obligatoire")
})

const StepFour = (props) => {

  const formik = useFormik({
    initialValues: {
      placeAvailable: props.data.placeAvailable
    },
    validationSchema: StepFourValidationShema,
    onSubmit: (values) => {
      values.placeAvailable = places;
      props.next(values);
    }
  });

  const [places, setPlaces] = useState(props.data.placeAvailable);

  const addMin = (amount) => {
    setPlaces((prevPlaces) => Math.min(prevPlaces + amount, 6));
    formik.setFieldValue('placeAvailable', Math.min(places + amount, 6));
  };

  const supMin = (amount) => {
    setPlaces((prevPlaces) => Math.max(prevPlaces - amount, 0));
    formik.setFieldValue('placeAvailable', Math.max(places - amount, 0));
  };
  return (
    <Formik validationSchema={StepFourValidationShema} initialValues={props.data} >
      {() => (
        <Form onSubmit={formik.handleSubmit}>
          <h6 className="my-10 font-bold text-center">Choisissez <span className="bg-primary p-1">votre nombre de place</span> disponible</h6>
          <div>
            <div className="flex items-center justify-center flex-col gap-2 mb-6">
              <div className="relative flex items-center">
                <div className="inline-flex items-center">
                  <button className="rounded-lg w-7 h-7 py-2 bg-primary" type="button" onClick={() => supMin(1)}><span className="text-4xl pl-1.5 -mt-5 flex">-</span></button>                <div>
                    <Input
                      type="text"
                      name="placeAvailable"
                      placeholder="Places"
                      min="0"
                      max="4"
                      value={places}
                      onChange={formik.handleChange}
                      readOnly
                      disabled
                      className=" w-24 h-6 py-2 font-black text-black border-none text-center outline-none bg-input"
                    />
                  </div>
                  <button className="rounded-lg w-7 h-7 py-2 bg-primary" type="button" onClick={() => addMin(1)}><span className="text-3xl pl-1 -mt-4 flex">+</span></button>
                </div>
                    </div>
                {formik.touched.placeAvailable && formik.errors.placeAvailable && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.placeAvailable}
                      </div>
                    )}
                    <div className="flex flex-row">
              <Button type="button" className="bg-secondary mr-10" label="Retour" onClick={props.prev} />
              <Button type="submit" className="bg-secondary items-center mt-10" label="Continuer" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default StepFour;  