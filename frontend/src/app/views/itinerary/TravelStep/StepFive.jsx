import React from 'react'
import * as Yup from "yup";
import { useFormik, Form, Formik } from "formik";
import Input from '../../../components/Custom/Input';
import Button from "../../../components/Custom/Button";


const StepFiveValidationShema = Yup.object().shape({
    bigBaggageNbr: Yup.number()
      .max(3, "maximum deux gros bagage")
      .required("champ obligatoire"),
    smallBaggageNbr: Yup.number()
      .max(6, "maximum 10 petit bagage")
      .required("champ obligatoire")
  })
  
  const StepFive = (props) => {
    const formik = useFormik({
      initialValues: {
        bigBaggageNbr: props.data.bigBaggageNbr,
        smallBaggageNbr: props.data.smallBaggageNbr
      },
      validationSchema: StepFiveValidationShema,
      onSubmit: (values) => {
        props.next(values);
      }
    });
  
    return (
      <Formik validationSchema={StepFiveValidationShema} initialValues={props.data} >
        {() => (
          <Form onSubmit={formik.handleSubmit}>
            <h6 className="my-10 font-bold text-center">Choisissez votre <span className="bg-primary p-1">nombre de bagages</span> par personne</h6>
            <div>
              <div className="flex items-center justify-center flex-col gap-2 mb-6">
                <div className="relative flex items-center">
                  <div className="inline-flex items-center w-80 mb-3">
                    <Input
                      type="text"
                      name="smallBaggageNbr"
                      placeholder="Petit bagage"
                      onChange={formik.handleChange}
                      className="rounded w-36 font-medium  px-4 py-2 bg-input text-black border-none"
                      error={formik.touched.smallBaggageNbr && formik.errors.smallBaggageNbr}
                    />
                    <Input
                      type="text"
                      name="bigBaggageNbr"
                      placeholder="Gros bagage"
                      onChange={formik.handleChange}
                      className="rounded w-36 font-medium  px-4 py-2 bg-input text-black border-none"
                      error={formik.touched.bigBaggageNbr && formik.errors.bigBaggageNbr}
                    />
                  </div>
                </div>
  
              </div>
              <div className="flex flex-row justify-center">
              <Button type="button" className="bg-secondary mr-10" label="Retour" onClick={props.prev} />
              <Button type="submit" className="bg-secondary items-center" label="Continuer" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
export default StepFive;