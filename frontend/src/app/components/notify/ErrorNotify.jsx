import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorNotify = (toastId) => {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(
            "Une erreur est survenue, veuillez nous excuser",
            { theme: "colored", icon: "🚗" }
          );
        }

}

export default ErrorNotify
