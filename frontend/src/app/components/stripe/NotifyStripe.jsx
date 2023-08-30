import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  /**
   * Succes message with toastify
   */
  export const cardOk = (toastId) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success(
        "Vous pouvez maintenant finaliser l'achat",
        {
          theme: "green",
          icon: "🚙",
          style: { color: "black", backgroundColor: "#92E3A9" },
        }
      );
    }
  };

    /**
   * Error message with toastify
   */
  export const cardError = (toastId, text) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(
        text,
        { theme: "colored", icon: "🚗" }
      );
    }
  }


