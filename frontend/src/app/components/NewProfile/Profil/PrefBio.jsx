import React from 'react';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import apiBackEndUser from '../../../api/backend/api.BackendUser';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import wallet from "../../../assets/pictures/profile/wallet.svg";
import pen from "../../../assets/pictures/profile/pen.svg";
import { useFormik } from "formik";
import Button from "../../Custom/Button";
import * as Yup from "yup";
import { changeBio } from '../../../api/backend/account';

const PrefBio = ({ user, isUser }) => {
  const preferences = user.preferences || {};
  const { music, smoking, discuss } = preferences;

  return (
    <div className='flex ml-1 xs:mt-10 sm:mt-0'>
      <div className='flex flex-col items-center'>
        <div className='flex  justify-between bg-primary rounded-[10px] w-30 px-2 gap-1 '>
          {music ? (
            <div className='px-1 py-1'>
              <MusicNoteIcon className="icon" />
            </div>
          ) : (
            <div className='px-1 py-1'>
              <MusicOffIcon className="icon" />
            </div>
          )}
          {smoking ? (
            <div className='px-1 py-1'>
              <SmokingRoomsIcon className="icon" />
            </div>
          ) : (
            <div className='px-1 py-1'>
              <SmokeFreeIcon className="icon" />
            </div>
          )}
          {discuss ? (
            <div className='px-1 py-1'>
              <RecordVoiceOverIcon className="icon" />
            </div>
          ) : (
            <div className='px-1 py-1'>
              <VoiceOverOffIcon className="icon" />
            </div>
          )}
        </div>
        {isUser &&
                <div className='flex flex-col justify-center mt-5 items-center font-bold'>
                <div>
                  <img src={wallet} className="h-6 mt-3" alt="Wallet" />
                </div>
                <div className='mt-2'>
                  <p className=''>{user.points}</p>
                </div>
                <div>
                <p className=''>crédits</p>
                </div>
              </div>
        }

      </div>
      <div>
        <div className='flex flex-col items-start ml-5'>
          <div className="flex justify-start ml-5">
        {isUser ? (
                      <h4 className="font-bold ">
                      Votre <span className="bg-primary p-1">bio</span>
                    </h4>
        ) : (
          <h4 className="font-bold ">
          <span className="bg-primary p-1">bio</span>
        </h4>
        )}
          </div>
          <div className="p-4 ml-1 max-w-2xl">
            <h5>{user.bio}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrefBio;
