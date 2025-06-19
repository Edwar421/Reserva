import { useState, useEffect, useCallback } from 'react';

interface DisponibilidadData {
  espacioId: number;
  fecha: string;
  disponibilidad: Array<{
    hora: string;
    horaFin: string;
    disponible: boolean;
    reserva?: { id: number; usuarioNombre: string };
  }>;
}

export const useDisponibilidad = (espacioId: number | null, fecha: string) => {
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mover fetchDisponibilidad fuera del useEffect y usar useCallback para evitar recrearlo cada render
  const fetchDisponibilidad = useCallback(async () => {
    if (!espacioId || !fecha) {
      setDisponibilidad(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3000/reservas");
      if (!response.ok) throw new Error('Error al cargar disponibilidad');
      
      const data = await response.json();
      setDisponibilidad(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [espacioId, fecha]);

  useEffect(() => {
    fetchDisponibilidad();
  }, [fetchDisponibilidad]);

  return { disponibilidad, loading, error, refetch: fetchDisponibilidad };
};
