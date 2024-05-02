import React, { useState, useEffect, useContext } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Login.css";
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { LanguageContext } from './LanguageContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const countryData = [
  { id: 1, name: "Esanpol", flag: "country/Spain.png" },
  { id: 2, name: "Japanese", flag: "country/Japan.png" },
  { id: 3, name: "German", flag: "country/Germany.png" },
  { id: 4, name: "Urdu", flag: "country/Pakistan.png" },
  { id: 5, name: "France", flag: "country/France.png" },
  { id: 6, name: "Italian", flag: "country/Italy.png" },
  { id: 7, name: "Thai", flag: "country/Thailand.png" },
  { id: 8, name: "Arabic", flag: "country/Bahrain.png" },
  { id: 9, name: "English", flag: "images/United Kingdom.png" },
];

export default function ModalPopup({ open, handleClose, handleLanguageSelect }) {
  const [languageSelected, setLanguageSelected] = useState(null);
  const { t, i18n } = useTranslation();


  const { language } = useContext(LanguageContext);  

 useEffect(() => {
    if (open) {
      const selectedLanguage = localStorage.getItem("selectedLanguage");
      if (selectedLanguage) {
        setLanguageSelected(JSON.parse(selectedLanguage).id);
      }
    }
  }, [open]);

  const handleCountryPopupClose = () => {
    handleClose();
  };
  const handleLanguageSelectAndUpdateLocalStorage = (country) => {
    handleLanguageSelect(country); // Call the function to handle language selection

    // Update local storage with selected language
    localStorage.setItem("selectedLanguage", JSON.stringify(country));
    localStorage.setItem("lng", country.name.toLowerCase());
toast.success(t("Language change successfully"))

  };

  
  const renderCountrySelectionPopup = () => {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "340px",
          height: "max-content",
          bgcolor: "white",
          borderRadius: "37px",
          background: "#FFF",
          outline: "none",
          boxShadow: 24,
          maxHeight: "90vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <div className="countrypopup">
          <div className="singlecountry">
            <div className="countrytxt2">
              <p>{t("Choose Language")}</p>
            </div>
            {countryData.map((country) => (
              <div className="country55" key={country.id}>
                <div className="country44">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <img src={country.flag} alt={country.name} />
                    {"\u00A0"}{"\u00A0"}{"\u00A0"}
                    <h1>{country.name}</h1>
                  </span>
                  <button
                    onClick={() => handleLanguageSelectAndUpdateLocalStorage(country)}
                    className={languageSelected === country.id ? "selected" : ""}
                  >
                    {languageSelected === country.id ? t("Selected") : t("Select")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <br />
        </div>
        <IconButton
          aria-label="close"
          onClick={handleCountryPopupClose}
          sx={{
            position: "absolute",
            top: "19px",
            left: "22px",
            width: "24px",
            height: "24px",
            background: "#ECECEC",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleCountryPopupClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {renderCountrySelectionPopup()}
    </Modal>
  );
}
