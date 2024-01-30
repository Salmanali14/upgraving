import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Login.css";
import { Link } from "react-router-dom";

const countryData = [
  { id: 1, name: "Español", flag: "country/Spain.png" },
  { id: 2, name: "Japanese", flag: "country/Japan.png" },
  { id: 3, name: "German", flag: "country/Germany.png" },
  { id: 4, name: "Urdu", flag: "country/Pakistan.png" },
  { id: 5, name: "French", flag: "country/France.png" },
  { id: 6, name: "Italian", flag: "country/Italy.png" },
  { id: 7, name: "Thai", flag: "country/Thailand.png" },
  { id: 8, name: "Arabic", flag: "country/Bahrain.png" },
];

export default function ModalPopup({ open, handleClose }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (countryId) => {
    setSelectedCountry(countryId);
  };

  const handleCountryPopupClose = () => {
    setSelectedCountry(null);
    handleClose();
  };

  const renderCountrySelectionPopup = () => {
    return (
      <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '340px',
        height: "max-content",
        bgcolor: "white",
        borderRadius: "37px",
        background: "#FFF",
        outline: "none",
        boxShadow: 24,
        maxHeight: "90vh",
        overflowY: "auto",
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
        <div className="countrypopup">
          <div className="singlecountry">
            <div className="countrytxt2">
              <p>Choose Language</p>
            </div>
            {countryData.map((country) => (
              <div className="country55" key={country.id}>
                <div className="country44">
                  <img src={country.flag} alt={country.name} />
                  <h1>{country.name}</h1>
                  <button onClick={() => handleCountrySelect(country.id)}>
                    Select
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
            position: 'absolute',
            top: '19px',
            left: '22px',
            width: '24px',
         height: '24px',
        background: '#ECECEC',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  };

  const renderSelectedCountryPopup = () => {
    if (selectedCountry !== null) {
      const selectedCountryInfo = countryData.find(
        (country) => country.id === selectedCountry
      );

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '267px',
            minHeight: '15vh',
            bgcolor: "white",
            borderRadius: "30px",
            background: "#FFF",
            outline: "none",
            boxShadow: 24,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div className="select-popup">
            <img src="images/Accepted.png" />
            <h1>Language Changed Successfully!</h1>
            <div className="select-btn">
              <button onClick={handleCountryPopupClose}>OK</button>
            </div>
          </div>
        </Box>
      );
    }
    return null;
  };

  return (
    <Modal
      open={open}
      onClose={handleCountryPopupClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {selectedCountry !== null
        ? renderSelectedCountryPopup()
        : renderCountrySelectionPopup()}
    </Modal>
  );
}
