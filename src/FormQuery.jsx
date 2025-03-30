import React from "react";

function FormQuery({
    nit,
    handleNitChange,
    handleSubmit,
    anio,
    setAnio,
    years,
    isButtonDisabled,
    cargando
  }) {
  
    return ( 
        <div>
            <div class="seccion-explicativa">
                <p>Por favor, ingresar el número del NIT sin digito de verificación y el Año, para buscar los certificados correspondientes al negocio.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div class="seccion-campos">
                <div class="campo">
                    <label for="nit">NIT Negocio:</label>
                    <input type="text" id="nit" value={nit} onChange={handleNitChange}></input>
                </div>
                <div class="campo">
                    <label for="anho">Año Expedición:</label>
                    <select id="anio" value={anio} onChange={(e) => setAnio(e.target.value)}>
                        <option value="">Seleccione año</option>
                        {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                        ))}
                    </select>
                </div>
                <div class="campo-button">  
                    <button type="submit" disabled={isButtonDisabled || cargando}>
                        {cargando ? "Cargando..." : "Consultar"}
                    </button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default FormQuery;
