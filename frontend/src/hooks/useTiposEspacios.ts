import { useState, useEffect } from 'react';

export interface TipoEspacio {
  tipo: string;
  cantidad: number;
}

export const useTiposEspacios = () => {
  const [tipos, setTipos] = useState<TipoEspacio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTiposEspacios = async () => {
      try {
        setLoading(true);
        setError(null);

        // Primero obtenemos todos los espacios
        const response = await fetch('/api/espacios');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const espacios = await response.json();
        
        // Agrupamos por tipo y contamos
        const tiposCount = espacios.reduce((acc: Record<string, number>, espacio: any) => {
          const tipo = espacio.tipo;
          acc[tipo] = (acc[tipo] || 0) + 1;
          return acc;
        }, {});

        // Convertimos a array y ordenamos
        const tiposArray = Object.entries(tiposCount)
          .map(([tipo, cantidad]) => ({ tipo, cantidad: cantidad as number }))
          .sort((a, b) => a.tipo.localeCompare(b.tipo));

        setTipos(tiposArray);
        
      } catch (err) {
        console.error('Error fetching tipos de espacios:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setTipos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposEspacios();
  }, []);

  return { tipos, loading, error };
};