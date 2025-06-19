import React, { useState, useMemo } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useEspacios } from '../hooks/useEspacios';
import { FiltrosReserva } from '../types/reserva.types';

interface Props {
  onSelectEspacio: (espacioId: string | null) => void;
  onFiltrosChange?: (filtros: FiltrosReserva) => void;
}

const FiltroReservas: React.FC<Props> = ({ onSelectEspacio, onFiltrosChange }) => {
  // Estado de filtros locales
  const [filtros, setFiltros] = useState<FiltrosReserva>({});

  // Obtener todos los espacios (el backend no soporta filtros)
  const { espacios, loading, error } = useEspacios();

  // Aplicar filtro en el cliente según el tipo de espacio seleccionado
  const espaciosFiltrados = useMemo(() => {
    if (!filtros.tipoEspacio) return espacios;
    return espacios.filter(espacio => espacio.tipo === filtros.tipoEspacio);
  }, [espacios, filtros.tipoEspacio]);

  // Manejo de cambio en filtros
  const handleFiltroChange = (campo: string, valor: any) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };
    setFiltros(nuevosFiltros);
    onFiltrosChange?.(nuevosFiltros);
    onSelectEspacio(null); // Reset espacio seleccionado al cambiar tipo
  };

  // Limpiar filtros y selección
  const limpiarFiltros = () => {
    setFiltros({});
    onSelectEspacio(null);
    onFiltrosChange?.({});
  };

  return (
    <Form className="mb-4 p-3 border rounded">
      {/* Filtro por tipo de espacio */}
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Tipo de Espacio</Form.Label>
            <Form.Select
              value={filtros.tipoEspacio || ''}
              onChange={(e) => handleFiltroChange('tipoEspacio', e.target.value || undefined)}
            >
              <option value="">Todos los tipos</option>
              <option value="Aula">Aula</option>
              <option value="Laboratorio de Computación">Lab. Computación</option>
              <option value="Laboratorio de Física">Lab. Física</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Selección de espacio filtrados */}
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Seleccionar Espacio</Form.Label>
            <Form.Select
              onChange={(e) => onSelectEspacio(e.target.value || null)}
              disabled={loading || !!error}
            >
              <option value="">Seleccione un espacio</option>
              {espaciosFiltrados.map((espacio) => (
                <option key={espacio.id} value={espacio.id}>
                  {espacio.nombre} - {espacio.tipo} (Capacidad: {espacio.capacidad})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Botón para limpiar */}
      <Button variant="outline-secondary" onClick={limpiarFiltros} disabled={loading}>
        Limpiar Filtros
      </Button>

      {/* Manejo de error */}
      {error && <p className="text-danger mt-2">Error cargando espacios</p>}
    </Form>
  );
};

export default FiltroReservas;
