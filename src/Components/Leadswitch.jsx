import React, { useContext } from 'react';
import styled from "@emotion/styled";
import { Switch } from "@mui/material";
import { db } from './firebaseConfig'; 
import { ref, update } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    color: '#c4c4c4 !important',
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#71d125 !important",
      "& + .MuiSwitch-track": {
        backgroundColor: theme?.palette?.mode === "dark" ? "#000000" : "#000000",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme?.palette?.mode === "light" ? theme?.palette?.grey[100] : theme?.palette?.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme?.palette?.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme?.palette?.mode === "light" ? "#E9E9EA" : "#000000",
    opacity: 1,
    transition: theme?.transitions?.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function Leadswitch({ leadmode, toggleLeadmodStatus }) {
  const { t } = useTranslation();
const { language } = useContext(LanguageContext);   
  const updateLeadmodValue = (newLeadmodValue) => {
    console.log(newLeadmodValue)
    update(ref(db, 'user'), { leadmode: newLeadmodValue })
    .then(() => {
      console.log('Leadmod value updated successfully in Firebase:', newLeadmodValue);
      if (newLeadmodValue) {
        toast.success(t('Lead mode is enable'));
      } else {
        toast.info(t('Lead mode is disable'));
      }
    })
    .catch((error) => {
      console.error('Error updating leadmod value in Firebase:', error);
    });
};
  
  return (
    <>
    <div>
    
      <IOSSwitch
        onChange={(event) => {
          const newLeadmodValue = event.target.checked;
          toggleLeadmodStatus(); 
          updateLeadmodValue(newLeadmodValue); 
        }}
        checked={leadmode}
      />
    </div>

    </>
  );
}
