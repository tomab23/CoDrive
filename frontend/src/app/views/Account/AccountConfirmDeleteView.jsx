import React from "react";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer"
import bye from "../../assets/pictures/aurevoir.svg"

const AccountConfirmDeleteView = () => {
    return (
        <div className="AccountConfirmDeleteView">
            {/*navbar*/}
            <Navbar></Navbar>

            {/*Contenu de la page*/}
            <div className="grid grid-flow-col grid-row-4 mx-20 mt-16 -mb-32">
                <div>
                    <h3 className="font-bold mt-40">Votre compte a bien été <span className="bg-primary">supprimé !</span></h3>
                    <h5 className="mt-14">Et nous sommes désolés de vous voir partir ! </h5>
                    <h5>Vous pourrez toujours créer un nouveau compte au besoin.</h5>
                    <h5 className="mt-10">En attendant, <span className="font-bold">nous vous renvoyons automatiquement à l’accueil.</span></h5>
                </div>
                <div>
                   <img src={bye} className="w-[450px] h-[550px] ml-32"></img>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AccountConfirmDeleteView