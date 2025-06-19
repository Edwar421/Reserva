import { useState, useEffect } from 'react';
import { EspacioDisponible, FiltrosReserva } from '../types/reserva.types';

export const useEspacios = (filtros?: FiltrosReserva) => {
  const [espacios, setEspacios] = useState<EspacioDisponible[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (filtros?.tipoEspacio) params.append('tipo', filtros.tipoEspacio);
        if (filtros?.capacidadMinima) params.append('capacidadMinima', filtros.capacidadMinima.toString());
        
        const response = await fetch("http://localhost:3000/espacios");
        if (!response.ok) throw new Error('Error al cargar espacios');
        
        const data = await response.json();
        setEspacios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchEspacios();
  }, [filtros]);

  return { espacios, loading, error };
};