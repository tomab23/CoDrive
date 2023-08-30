import React from "react";
import facebook from "../../assets/pictures/footer/facebook.svg";
import instagram from "../../assets/pictures/footer/instagram.svg";
import discord from "../../assets/pictures/footer/discord.svg";
import { useNavigate } from "react-router-dom";
import { URL_CONTACT_US, URL_FAQ } from "../../constants/urls/urlFrontEnd";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="Footer xl:flex sm:flex flex-row flex-wrap items-center justify-between gap-y-6 gap-x-12 py-6 mt-48 text-center">
            <ul className="flex flex-wrap items-center gap-y-2 font-bold text-dark
            xl:gap-x-8 xl:ml-20 xl:text-lg
            sm:gap-x-4 sm:ml-6 sm:text-lg
            xs:gap-x-3 xs:ml-4 xs:text-sm">
                <li
                    onClick={() => alert("page mentions légales")}
                    className="hover:text-hover cursor-pointer"
                >
                    Mentions légales
                </li>
                <li
                    onClick={() => alert("page CVG")}
                    className="hover:text-hover cursor-pointer"
                >CVG</li>
                <li
                    onClick={() => navigate(URL_FAQ)}
                    className="hover:text-hover cursor-pointer"
                >FAQ</li>
                {/* CONTACT US */}
                <li
                    onClick={() => navigate(URL_CONTACT_US)}
                    className="hover:text-hover cursor-pointer"
                >
                    Contact
                </li>
                <li className="xl:ml-8 sm:ml-8 xs:ml-2">
                    <img src={instagram} alt="instagram" className="w-6 h-6" />
                </li>
                <li>
                    <img src={facebook} alt="facebook" className="w-6 h-6" />
                </li>
                <li>
                    <img src={discord} alt="discord" className="w-6 h-6" />
                </li>
            </ul>
            <div className="text-black font-bold
            xl:mr-20 xl:text-xl xl:pr-5
            sm:mr-6 sm:text-lg sm:pr-5
            xs:text-sm xs:pr-5 xs:mt-2 xs:m-auto">
                &copy; CoDrive 2023
            </div>
        </div>
    );
};

export default Footer;
