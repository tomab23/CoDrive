import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, Formik, Field } from "formik";
import Button from "../../../components/Custom/Button";
import DurationAndKm from "../../../components/admin/travel/DurationAndKm";



const StepSevenValidationShema = Yup.object().shape({
    car: Yup.number().typeError("Veuillez crée un véhicule")
        .notOneOf([0], 'Veuillez sélectionner une voiture'),
    km: Yup.number(),
    arrivedTime: Yup.string(),
})

const StepSeven = (props) => {
    const { cars, onClick, cameFromStepOptional } = props;

    const formik = useFormik({
        initialValues: {
            car: props.data.car,
            km: props.data.km,
            arrivedTime: props.data.arrivedTime,
        },
        validationSchema: StepSevenValidationShema,
        onSubmit: (values) => {
            values.car = { id: Number(values.car) };
            props.next(values);
        },
    });
    const handleCarsChoice = (event) => {
        const selectedCarId = Number(event.target.value);
        formik.setFieldValue("car", selectedCarId);
    };

    const handleDurationAndKmData = async (km, arrivedTime) => {
        formik.setFieldValue('km', km);
        formik.setFieldValue('arrivedTime', arrivedTime);
    };
console.log(cameFromStepOptional);
    return (

        <Formik
            validationSchema={StepSevenValidationShema}
            initialValues={props.data}
            cars={cars}
        >
            <Form onSubmit={formik.handleSubmit}>
                <div>
                    <DurationAndKm
                        onDataReceived={handleDurationAndKmData}
                        departureCity={props.data.cityStart}
                        arrivalCity={props.data.cityEnd}
                    />
                    <div className="flex items-center justify-center flex-col gap-2 mb-6">
                        <h6 className="my-10 font-bold text-center">Indiquez votre <span className="bg-primary p-1">modèle de véhicule</span></h6>
                        <div className="relative flex items-center">
                            <div className="inline-flex items-center w-80 mb-3">
                                <Field
                                    as="select"
                                    name="car"
                                    onChange={handleCarsChoice}
                                    value={formik.values.car || ""}
                                    className="rounded w-full font-medium px-4 py-2 bg-input text-black border-none"
                                >
                  {!cameFromStepOptional && (
                  <option value="">Choisissez une voiture</option>
                )}
                {cameFromStepOptional && !formik.values.car && cars.length > 0 && (
                  <>
                    <option value="">{cars[cars.length - 1].brand}</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.brand}
                      </option>
                    ))}
                  </>
                )}
                {(!cameFromStepOptional || formik.values.car) &&
                  cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.brand}
                    </option>
                  ))}

                                </Field>
                            </div>
                        </div>
                        {!formik.values.car && formik.submitCount > 0 && (
                            <div className="text-red-500">{formik.errors.car}</div>
                        )}
                        <div className="flex justify-around">
                            <Button type="button" className="bg-secondary me-10" label="Retour" onClick={props.prev} />
                            <Button type="submit" className="bg-secondary items-center" label="Continuer" />
                        </div>

                        <Button
                            type="button"
                            className="border border-green-400 rounded-lg bg-input mt-4 w-80"
                            label="Créer un véhicule"
                            onClick={onClick}
                        />

                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default StepSeven