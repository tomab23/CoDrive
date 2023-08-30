import React, { useState } from "react";
// CSS For the calc of the tooltip
import "./tooltipPassword.css"

const TooltipPassword = ({  children, password }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="mb-[18px]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && password && 
      <>
      {window.innerWidth > 500 ? (
                      <div className="tooltip absolute bg-primary text-black p-2 h-[80px] w-[500px] shadow-md shadow-hover ">
                      Le mot de passe dois contenir <span className="font-extrabold">8 caractères minimum, une majuscule, une minuscule et un caractère spécial</span>
                      </div>
      ) : (
        <div className="tooltipPhone absolute bg-primary text-black p-2 h-[85px] w-[400px] shadow-md shadow-hover">
        Le mot de passe dois contenir <span className="font-extrabold">8 caractères minimum, une majuscule, une minuscule et un caractère spécial</span>
        </div>
      )}
      </>
        
        }
      {isVisible && !password && 
              <div id="tooltipCredits" className="tooltipCredits absolute bg-primary text-black p-2 h-[65px] w-[350px] shadow-md shadow-hover">
              <p>Vous pouvez acheter <b>minimum 10 crédits</b>.</p>
              <p>Le choix de crédits se fais <b>par palier de 10</b>.</p>
              </div>
        
        }
    </div>
  );
};

export default TooltipPassword;
