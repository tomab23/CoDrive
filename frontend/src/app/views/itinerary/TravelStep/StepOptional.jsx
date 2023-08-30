import { addCar, colorCar, addImage } from "../../../api/backend/account";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Input from "../../../components/Custom/Input";
import Button from "../../../components/Custom/Button";
import voiture3 from "../../../assets/pictures/Create_travel/voiture3.svg";
import { useFormik, Form, Formik } from "formik";
import { storage } from "../../../api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import CarPopUp from "./CarPopUp";
import ImageUpload from "../../../components/ImageManagement"


const ValidSchema = Yup.object().shape({
    brand: Yup.string()
        .min(2, "Trop petit")
        .max(30, "trop long")
        .required("Ce champ est obligatoire"),
    door: Yup.boolean(),
    airConditioner: Yup.boolean(),
    colorCar: Yup.string()
        .required("Veuillez faire un choix")
        .test("colorCar", "Une erreur est survenue", (value) => {
            return value !== "Une erreur est survenue";
        }),
    chest: Yup.boolean(),
});

const StepOptional = (props) => {

    const { data } = props;

    const [isShow, setIsShow] = useState(false);
    const [imageUpload, setImageUpload] = useState([]);
    const [isImageCountInvalid, setIsImageCountInvalid] = useState(false);
    const [car, setCar] = useState(data.car);
    const [colors, setColors] = useState([]);

    const formikCar = useFormik({
        initialValues: {
            brand: "",
            door: false,
            airConditioner: false,
            colorCar: "",
            chest: false,
        },
        validationSchema: ValidSchema,
        onSubmit: (values) => {
            handleSubmited(values);
        },
    });

    const formik = useFormik({
        initialValues: {
            car: props.data.car,
        },
    });

    useEffect(() => {
        colorCar()
            .then((res) => {
                setColors(res.data);
            })
            .catch(() => setErrorLog(true));
    }, []);

    const handleDoor = (value) => {
        formikCar.setFieldValue("door", value).catch((e) => console.log(e));
    };
    const handleAirConditioner = (value) => {
        formikCar
            .setFieldValue("airConditioner", value)
            .catch((e) => console.log(e));
    };
    const handleChest = (value) => {
        formikCar.setFieldValue("chest", value).catch((e) => console.log(e));
    };
    const handleColorChoice = (event) => {
        const selectedColorId = Number(event.target.value);
        formikCar.setFieldValue("colorCar", selectedColorId);
    };

    const handleSubmited = async (values) => {

        if (imageUpload.length < 2 || imageUpload.length > 6) {
            setIsImageCountInvalid(true);
            return;
        }
        if (!formikCar.isValid) {
            return;
        }

        formikCar.setValues(values);
        setIsShow(true);
    };
    const handleConfirmationSubmit = async () => {
        try {
            const values = formikCar.values;
            values.colorCar = { id: values.colorCar };

            const res = await addCar(values);
            const carId = res.data.id;

            for (let i = 0; i < imageUpload.length; i++) {

                const imageRef = ref(storage, `images/${imageUpload[i].name + v4()}`);
                await uploadBytes(imageRef, imageUpload[i]);
                const image = await getDownloadURL(imageRef);
                await addImage({ image: image }, carId);
            }

            setCar({ id: Number(carId) });
            props.next({ ...data, car: { id: Number(carId) } });
            props.onNext(data);
            setIsShow(false);
        } catch (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                console.log(error.code);
                alert("Erreur Car register");
            }
        }
    };



    return (
        <div>
            <div className="flex w-full justify-center">
                <h4 className="mt-10 font-bold">
                    Indiquez votre{" "}
                    <span className="bg-primary p-1">modèle de véhicule</span>
                </h4>
            </div>
            {/* Photos du véhicule */}
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-20 ml-40 mr-40 mt-10">
                <div className="flex-end flex-col pb-0">
                    <img src={voiture3} className=" mt-10" />
                    <ImageUpload imageUpload={imageUpload} setImageUpload={setImageUpload}
                        isImageCountInvalid={isImageCountInvalid} setIsImageCountInvalid={setIsImageCountInvalid} />
                </div>
                <div className="flex mt-[20%]">
                    {/* Caractéristiques du véhicule */}
                    <Formik
                        className="flex items-center justify-center flex-col font-bold"
                        initialValues={props.data}
                    >
                        <Form onSubmit={formikCar.handleSubmit}>

                            {/* Nom du véhicule */}
                            <div className="my-5 flex w-80">
                                <Input
                                    type="text"
                                    name="brand"
                                    placeholder="Marque du véhicule"
                                    onChange={formikCar.handleChange}
                                    className="rounded w-full font-medium px-4 py-2 pl-4 bg-input text-black border-none"
                                    error={formikCar.touched.brand && formikCar.errors.brand}
                                />
                            </div>
                            {/* Nombre de porte du véhicule */}
                            <h6 className="my-5 flex justify-between w-40">
                                <span
                                    onClick={() => handleDoor(false)}
                                    className={
                                        formikCar.values.door === false
                                            ? "text-black cursor-pointer"
                                            : "text-dark cursor-pointer"
                                    }
                                >
                                    3 porte
                                </span>
                                <span
                                    onClick={() => handleDoor(true)}
                                    className={
                                        formikCar.values.door === true
                                            ? "text-black cursor-pointer"
                                            : "text-dark cursor-pointer"
                                    }
                                >
                                    5 porte
                                </span>
                            </h6>
                            {/* Climatisation */}
                            <div className="my-5 flex justify-between w-80">
                                <span
                                    onClick={() => handleAirConditioner(false)}
                                    className={
                                        formikCar.values.airConditioner === false
                                            ? "text-black cursor-pointer"
                                            : "text-dark cursor-pointer"
                                    }
                                >
                                    Véhicule non climatisé
                                </span>
                                <span
                                    onClick={() => handleAirConditioner(true)}
                                    className={
                                        formikCar.values.airConditioner === true
                                            ? "text-black cursor-pointer"
                                            : "text-dark cursor-pointer"
                                    }
                                >
                                    Véhicule climatisé
                                </span>
                            </div>
                            {/* Couleur du véhicule */}
                            <div>
                                {colors.length === 0 ? (
                                    <>
                                        <h6>
                                            <select
                                                name="car"
                                                onChange={handleColorChoice}
                                                value={formikCar.values.colorCar ? formikCar.values.colorCar.id : ''}
                                                className="rounded w-80 font-medium px-4 py-2 bg-input text-red-500 border-none"
                                            >
                                                <option value="" disabled hidden>
                                                    Une erreur est survenue
                                                </option>
                                            </select>
                                        </h6>
                                    </>
                                ) : (
                                    <span className="font-bold">
                                        <h6>
                                            <select
                                                name="car"
                                                onChange={handleColorChoice}
                                                value={formikCar.values.colorCar ? formikCar.values.colorCar.id : ''}
                                                className="rounded w-80 font-medium px-4 py-2 bg-input text-black border-none"
                                            >
                                                <option value="" disabled hidden>
                                                    Sélectionner une couleur
                                                </option>
                                                {colors.map((colorCar) => (
                                                    <option key={colorCar.id} value={colorCar.id}>
                                                        {colorCar.color}
                                                    </option>
                                                ))}
                                            </select>
                                        </h6>
                                    </span>
                                )}
                            </div>

                            {formikCar.touched.colorCar && formikCar.errors.colorCar && (
                                <div className="text-red-500 text-xs">
                                    {formikCar.errors.colorCar}
                                </div>
                            )}

                            {/* Climatisation */}
                            <div className="my-5 flex justify-between w-80">
                                <span
                                    onClick={() => handleChest(true)}
                                    className={
                                        formikCar.values.chest === true
                                            ? "text-black cursor-pointer"
                                            : "text-dark cursor-pointer"
                                    }
                                >
                                    Le véhicule comporte un coffre
                                </span>
                                <span
                                    onClick={() => handleChest(false)}
                                    className={
                                        formikCar.values.chest === false
                                            ? "text-black cursor-pointer"
                                            : "text-dark cursor-pointer"
                                    }
                                >
                                    n'en comporte pas
                                </span>
                            </div>
                            <div type="button" className="flex flex-row justify-around">
                                <Button className="bg-secondary" label="Retour" onClick={props.prev} />

                                <Button
                                    type="button"
                                    className="bg-secondary items-center"
                                    label="Continuer"
                                    onClick={() => {
                                        if (formikCar.isValid && !formikCar.isSubmitting && imageUpload.length >= 2 && imageUpload.length <= 6) {
                                            setIsShow(true);
                                        } else {
                                            formikCar.handleSubmit();
                                        }
                                    }}
                                />
                                {isShow && formikCar.isValid && (
                                    <CarPopUp
                                        values={formikCar.values}
                                        colors={colors}
                                        imageUpload={imageUpload}
                                        setIsShow={setIsShow}
                                        handleConfirmationSubmit={handleConfirmationSubmit}
                                    />
                                )}
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};
export default StepOptional;
