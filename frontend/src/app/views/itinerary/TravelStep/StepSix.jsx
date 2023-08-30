import React from 'react'
import * as Yup from "yup";
import { useFormik, Form, Formik } from "formik";
import parler from "../../../assets/pictures/profile/Parler.svg";
import musique from "../../../assets/pictures/profile/Musique.svg";
import cig from "../../../assets/pictures/profile/cig.svg";
import Button from "../../../components/Custom/Button";

const StepSixValidationShema = Yup.object().shape({
    music: Yup.boolean().required("Veuillez faire un choix"),
    smoking: Yup.boolean().required("Veuillez faire un choix"),
    discuss: Yup.boolean().required("Veuillez faire un choix"),
  });
  
  const StepSix = (props) => {
    const formik = useFormik({
      initialValues: {
        music: props.data.music,
        smoking: props.data.smoking,
        discuss: props.data.discuss,
      },
      validationSchema: StepSixValidationShema,
      onSubmit: (values) => {
        props.next(values);
      },
    });
  
    const handlemusic = (value) => {
      formik.setFieldValue("music", value);
    };
  
    const handlesmoking = (value) => {
      formik.setFieldValue("smoking", value);
    };
  
    const handlediscuss = (value) => {
      formik.setFieldValue("discuss", value);
    };
  
    return (
      <Formik
        validationSchema={StepSixValidationShema}
        initialValues={props.data}
      >
        {() => (
          <Form onSubmit={formik.handleSubmit}>
            <>
              <div className="items-center justify-center w-full">
                <h6 className="my-10 font-bold text-center">Apportez <span className="bg-primary p-1">des précisions sur votre trajet</span></h6>
                <div className="flex items-center justify-center gap-6 mb-6 mt-20">
                  <div className="inline-flex flex-col items-center w-80 mb-3">
                    <img src={parler} className="w-full h-60"></img>
                    <span
                      onClick={() => handlediscuss(true)}
                      className={
                        formik.values.discuss === true
                          ? "text-black cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    >Je discute
                    </span>
                    <span
                      onClick={() => handlediscuss(false)}
                      className={
                        formik.values.discuss === false
                          ? "text-black cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    >
                      J'aime les trajets silencieux
                    </span>
                  </div>
                  <div className="inline-flex flex-col items-center w-80 mb-3">
                    <img src={musique} className="w-full h-60"></img>
                    <span
                      onClick={() => handlemusic(true)}
                      className={
                        formik.values.music === true
                          ? "text-black cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    >
                      J'écoute de la musique
                    </span>
                    <span
                      onClick={() => handlemusic(false)}
                      className={
                        formik.values.music === false
                          ? "text-black cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    >
                      Je n'en écoute pas
                    </span>
                  </div>
                  <div className="inline-flex flex-col items-center w-80 mb-3">
                    <img src={cig} className="w-full h-60"></img>
                    <span
                      onClick={() => handlesmoking(true)}
                      className={
                        formik.values.smoking === true
                          ? "text-black cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    >
                      Je fume
                    </span>
                    <span
                      onClick={() => handlesmoking(false)}
                      className={
                        formik.values.smoking === false
                          ? "text-black cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    >
                      Je ne fume pas
                    </span>
                  </div>
                </div>
              </div>
              <div className="items-center justify-center inline-flex w-full">
              <Button type="button" className="bg-secondary mr-10" label="Retour" onClick={props.prev} />
              <Button type="submit" className="bg-secondary items-center" label="Continuer" />
              </div>
            </>
          </Form>
        )}
      </Formik>
    );
  };
export default StepSix;  