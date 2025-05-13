'use client';

import { useEffect, useState } from 'react';

interface Invoice {
  amount: number;
  name: string;
  status: string;
  date: string;
}

export default function QueryPage() {
  const [data, setData] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/query');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Facturas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Cliente</th>
              <th className="px-4 py-2 border">Monto</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{invoice.name}</td>
                <td className="px-4 py-2 border">${invoice.amount}</td>
                <td className="px-4 py-2 border">{invoice.status}</td>
                <td className="px-4 py-2 border">{new Date(invoice.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 