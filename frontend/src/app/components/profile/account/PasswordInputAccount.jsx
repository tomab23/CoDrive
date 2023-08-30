import React, { useState } from 'react'
import Input from '../../Custom/Input';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const PasswordInputAccount = ({ formik }) => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
    <div className=''>
      <label htmlFor="password" className="text-2xl font-bold">
        Mot de passe
      </label>
      <div className="my-3 relative flex items-center  xs:w-[300px] sm:w-auto">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          value={formik.values.password}
          className={
            "px-5 py-2   xs:w-[300px] sm:w-auto font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
          }
        />
        <div className="absolute inset-y-0 right-0 flex items-center mr-2">
          <button
            type="button"
            className="h-full p-2 text-dark"
            onClick={() => setShowPassword(!showPassword)}
          >
            {/* Icon mot de passe */}
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5  text-black" />
            ) : (
              <EyeIcon className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </div>
    </div>
    <div>
      <label htmlFor="confirmPassword" className="text-2xl font-bold">
        Confirmez votre mot de passe
      </label>
      <div className="my-3 relative flex items-center xs:w-[300px] sm:w-auto">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          s
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className={
            "  xs:w-[300px] sm:w-auto px-5 py-2 font-semiBold text-dark text-[25px] bg-[#F5F8F5] border-[1px] border-[#47634F35] w-[450px] rounded-[5px]"
          }
        />
        <div className="absolute inset-y-0 right-0 flex items-center mr-2 ">
          <button
            type="button"
            className="h-full p-2 text-dark"
            onClick={() => setShowPassword(!showPassword)}
          >
            {/* Icon mot de passe */}
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5  text-black" />
            ) : (
              <EyeIcon className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PasswordInputAccount
