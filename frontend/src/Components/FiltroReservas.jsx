import { useEffect, useState } from "react";

function FiltroReservas({ onSelectEspacio }) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [espaciosFiltrados, setEspaciosFiltrados] = useState([]);
  const [tiposEspacios, setTiposEspacios] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los espacios
    fetch('/api/espacios') // Suponiendo que tienes una ruta para obtener los espacios
      .then(res => res.json())
      .then(data => {
        setTiposEspacios(data.tipos);
        setEspaciosFiltrados(data.espacios);
      })
      .catch(err => console.error("Error cargando espacios", err));
  }, []);

  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    setTipoSeleccionado(tipo);
    setEspaciosFiltrados(prev => prev.filter(e => e.tipo === tipo));
  };

  return (
    <div className="p-3">
      <label>Tipo de aula:</label>
      <select className="form-control" onChange={handleTipoChange}>
        <option value="">Seleccione un tipo</option>
        {tiposEspacios.map((tipo, idx) => (
          <option key={idx} value={tipo}>{tipo}</option>
        ))}
      </select>

      <br />

      <label>Espacio:</label>
      <select className="form-control" onChange={e => onSelectEspacio(e.target.value)}>
        <option value="">Seleccione un espacio</option>
        {espaciosFiltrados.map(e => (
          <option key={e.id} value={e.id}>{e.nombre}</option>
        ))}
      </select>
    </div>
  );
}

export default FiltroReservas;
