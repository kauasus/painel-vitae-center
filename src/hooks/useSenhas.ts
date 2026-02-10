import { useState, useEffect } from 'react';
import { Senha } from '../types';
import { API_CONFIG, USE_MOCK_DATA } from '../constants/api';

// Dados mockados para desenvolvimento
const MOCK_SENHA_ATUAL: Senha = {
  id: '1',
  numero: 'V-042',
  tipo: 'CONSULTA',
  guiche: '03',
  timestamp: Date.now(),
};

const MOCK_HISTORICO: Senha[] = [
  { id: '2', numero: 'P-010', tipo: 'PREFERENCIAL', guiche: '01', timestamp: Date.now() - 60000 },
  { id: '3', numero: 'E-005', tipo: 'EXAME', guiche: '02', timestamp: Date.now() - 120000 },
  { id: '4', numero: 'V-041', tipo: 'CONSULTA', guiche: '04', timestamp: Date.now() - 180000 },
  { id: '5', numero: 'F-008', tipo: 'FISIOTERAPIA', guiche: '05', timestamp: Date.now() - 240000 },
];

export const useSenhas = () => {
  const [senhaAtual, setSenhaAtual] = useState<Senha | null>(null);
  const [historico, setHistorico] = useState<Senha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar senhas da API
  const fetchSenhas = async () => {
    if (USE_MOCK_DATA) {
      // Usar dados mockados
      setSenhaAtual(MOCK_SENHA_ATUAL);
      setHistorico(MOCK_HISTORICO);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.painelSenhas}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar senhas');
      }

      const data = await response.json();
      setSenhaAtual(data.atual);
      setHistorico(data.anteriores || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar senhas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Buscar senhas inicialmente
    fetchSenhas();

    // Atualizar a cada 3 segundos
    const interval = setInterval(fetchSenhas, 3000);

    return () => clearInterval(interval);
  }, []);

  return { senhaAtual, historico, loading, error, refetch: fetchSenhas };
};
