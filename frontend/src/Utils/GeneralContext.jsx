import React, { createContext, useContext, useState, useEffect } from "react";

const GeneralContext = createContext();

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
    if (email) {
      setUserEmail(email);
    }
    setAuthChecked(true); 
  }, []);

  const login = (email) => {
    localStorage.setItem("email", email);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("email");
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
