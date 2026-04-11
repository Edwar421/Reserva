import React, { createContext, useContext, useState, useEffect } from "react";

const GeneralContext = createContext();

const AUTH_KEYS = ["email", "username", "tipoUsuario"];

const clearAuthStorage = () => {
  AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
};

export const GeneralProvider = ({ children }) => {
  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false);
  const [estampable, setEstampable] = useState(false);
  const [estampados, setEstampados] = useState([]);
  const [estampadoElegido, setEstampadoElegido] = useState(-1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); 
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const tipoUsuario = localStorage.getItem("tipoUsuario");

    if (email && username && tipoUsuario) {
      setUserEmail(email);
    } else {
      clearAuthStorage();
      setUserEmail(null);
    }
    setAuthChecked(true); 
  }, []);

  const login = (email, username, tipoUsuario) => {
    localStorage.setItem("email", email);
    if (username) {
      localStorage.setItem("username", username);
    }
    if (tipoUsuario) {
      localStorage.setItem("tipoUsuario", tipoUsuario);
    }
    setUserEmail(email);
  };

  const logout = () => {
    clearAuthStorage();
    setUserEmail(null);
  };

  const handleShow = (data) => {
    if (localStorage.getItem("username") != null) {
      localStorage.setItem("selectedShirt", JSON.stringify(data));
      setSelectedImage(data.diseño);
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClose1 = () => {
    setShow2(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        show,
        setShow,
        handleShow,
        handleClose,
        show2,
        setShow2,
        handleClose1,
        estampable,
        setEstampable,
        estampados,
        setEstampados,
        estampadoElegido,
        setEstampadoElegido,
        selectedImage,
        userEmail,
        login,
        logout,
        authChecked
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => {
  return useContext(GeneralContext);
};
