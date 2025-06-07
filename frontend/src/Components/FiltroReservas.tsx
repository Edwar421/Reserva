import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useEspacios } from '../hooks/useEspacios';
import { FiltrosReserva } from '../types/reserva.types';

interface Props {
  onSelectEspacio: (espacioId: string | null) => void;
  onFiltrosChange?: (filtros: FiltrosReserva) => void;
}

const FiltroReservas: React.FC<Props> = ({ onSelectEspacio, onFiltrosChange }) => {
  const [filtros, setFiltros] = useState<FiltrosReserva>({});
  const { espacios, loading } = useEspacios(filtros);

  const handleFiltroChange = (campo: string, valor: any) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };
    setFiltros(nuevosFiltros);
    onFiltrosChange?.(nuevosFiltros);
  };

  const limpiarFiltros = () => {
    setFiltros({});
    onSelectEspacio(null);
    onFiltrosChange?.({});
  };

  return (
    <Form className="mb-4 p-3 border rounded">
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

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Seleccionar Espacio</Form.Label>
            <Form.Select
              onChange={(e) => onSelectEspacio(e.target.value || null)}
              disabled={loading}
            >
              <option value="">Seleccione un espacio</option>
              {espacios.map((espacio) => (
                <option key={espacio.id} value={espacio.id}>
                  {espacio.nombre} - {espacio.tipo} (Capacidad: {espacio.capacidad})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="outline-secondary" onClick={limpiarFiltros}>
        Limpiar Filtros
      </Button>
    </Form>
  );
};

export default FiltroReservas;