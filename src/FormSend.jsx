import React from "react";

function FormSend({
    nombre,
    email,
    setEmail,
    enviarCorreo,
    cargando,
    setMostrarFormularioEnvio,
    setMensaje,
    handleNombreChange,
    isEnviarCorreoDisabled,
    isChecked,
    handleCheckboxChange
}) 
{

    const handleRegresar = () => {
        setMostrarFormularioEnvio(false);
        setMensaje("");
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        enviarCorreo(); // Enviar solo si es válido  
    };

    

    return ( 
        <form onSubmit={handleSubmit}>
            <div>
                <div class="seccion-explicativa">
                                <p>Por favor, para enviar los certificados llene los campos con el nombre de quien consulta y el correo a donde se deben enviar.</p>
                </div>
                <div class="seccion-campos">
                <div class="campo-send">
                    <label for="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={handleNombreChange}
                    ></input>
                </div>
                <div class="campo-send">
                    <label for="email">Correo:</label>
                    <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                     ></input>
                </div>
                <div class="campo-check">
                    <input
                            type="checkbox"
                            id="check"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                    ></input>
                    <label for="check">
                        <p>
                        Autorizo a Grupo Coomeva el contacto a través de los <a href="https://vinculaciones.fiducoomeva.com/Vinculacion/interfaces/Flotantes/CanalesContacto.aspx" target="_blank">canales autorizados</a>
                        </p>
                    </label>
                </div>
                <div class="campo-button">  
                    <button type="button" onClick={handleRegresar}>Regresar</button>
                    <button type="submit" disabled={isEnviarCorreoDisabled}>
                        {cargando ? "Cargando..." : "Enviar Correo"}
                    </button>
                </div>
                </div>
            </div>
        </form>
    );
}

export default FormSend;