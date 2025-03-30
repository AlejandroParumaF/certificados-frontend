import React, { useState } from "react";
import "./Form.css";
import FormQuery from "./FormQuery";
import axios from "axios";
import FormSend from "./FormSend";

function Form() {
  const [nit, setNit] = useState("");
  const [anio, setAnio] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarFormularioEnvio, setMostrarFormularioEnvio] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const API_BASE_URL = "/certificados/api"; //URL de backend
  ///const API_BASE_URL = 'http://libranzas2.pruebas.intracoomeva.com.co/'; //URL Backend

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje("");
    setCargando(true);
    setMostrarFormularioEnvio(false);
    try {
      const response = await axios.post(`${API_BASE_URL}/consultar`, {
        nit,
        anio,
      });

      if (response.data && typeof response.data.count === "number") {
        if (response.data.count > 0) {
          setMensaje(
            `Se encontraron ${response.data.count} archivos con NIT: ${nit} del año ${anio}.`
          );

          setMostrarFormularioEnvio(true);
        } else {
          setMensaje(
            "No se encontraron archivos con el NIT y año proporcionados."
          );
        }
      } else {
        setMensaje("Error al obtener la cantidad de archivos.");
      }
    } catch (error) {
      setMensaje("Error al realizar la consulta.");
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const enviarCorreo = async () => {
    setMensaje("");
    setCargando(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/enviar`, {
        anio,
        nit,
        nombre,
        email,
      });
      setMensaje(response.data);
    } catch (error) {
      setMensaje("Error al enviar el correo.");
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const handleNitChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setNit(numericValue);
  };

  const handleNombreChange = (e) => {
    let letrasValue = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Permite letras y espacios

    // Validaciones
    if (letrasValue.trim().length < 10) {
      setMensaje("El nombre debe tener al menos 10 caracteres.");
    } else if (letrasValue.length > 50) {
      setMensaje("El nombre no puede tener más de 50 caracteres.");
      letrasValue = letrasValue.substring(0, 50); // Truncar el nombre si es demasiado largo
    } else {
      setMensaje(""); // Limpiar el error si es válido
    }

    setNombre(letrasValue);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 2024; i--) {
    years.push(i);
  }

  const isButtonDisabled = !nit || !anio;

  // Determinar si el botón "Enviar Correo" debe estar deshabilitado
  const isEnviarCorreoDisabled =
    !isChecked || !nombre || !email || cargando || nombre.trim().length < 10;

  return (
    <div class="bg">
      <div className="scroll-container">
        <div class="contenedor">
          <div class="formulario">
            <div class="encabezado">
              <h2>Consulta de certificados</h2>
            </div>
            {!mostrarFormularioEnvio && (
              <FormQuery
                nit={nit}
                handleNitChange={handleNitChange}
                handleSubmit={handleSubmit}
                anio={anio}
                setAnio={setAnio}
                years={years}
                isButtonDisabled={isButtonDisabled}
                cargando={cargando}
              />
            )}

            {mostrarFormularioEnvio && (
              <FormSend
                nombre={nombre}
                email={email}
                setNombre={setNombre}
                setEmail={setEmail}
                enviarCorreo={enviarCorreo}
                cargando={cargando}
                setMostrarFormularioEnvio={setMostrarFormularioEnvio}
                setMensaje={setMensaje}
                handleNombreChange={handleNombreChange}
                isEnviarCorreoDisabled={isEnviarCorreoDisabled}
                isChecked={isChecked}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}
            <div class="respuesta">{mensaje && <p>{mensaje}</p>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
