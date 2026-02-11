import { useState, useEffect, useCallback } from 'react';
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
  const [novaSenhaChamada, setNovaSenhaChamada] = useState(false);

  // Função para buscar senhas da API
  const fetchSenhas = useCallback(async () => {
    if (USE_MOCK_DATA) {
      // Simular chamada de nova senha aleatoriamente (para teste)
      // 30% de chance de nova senha a cada 7 segundos
      const temNovaSenha = Math.random() > 0.7;
      
      if (temNovaSenha) {
        const novoNumero = `V-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`;
        const novaSenha = {
          ...MOCK_SENHA_ATUAL,
          numero: novoNumero,
          timestamp: Date.now(),
        };
        setSenhaAtual(novaSenha);
        setNovaSenhaChamada(true);
      }
      
      setHistorico(MOCK_HISTORICO);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.chamarSenha}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar senhas');
      }

      const data = await response.json();
      
      // Detectar se há uma nova senha (comparar timestamp ou ID)
      if (data.atual && data.atual.timestamp !== senhaAtual?.timestamp) {
        setSenhaAtual(data.atual);
        setNovaSenhaChamada(true);
      }
      
      setHistorico(data.anteriores || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar senhas:', err);
    } finally {
      setLoading(false);
    }
  }, [senhaAtual?.timestamp]);

  const resetNovaSenha = useCallback(() => {
    setNovaSenhaChamada(false);
  }, []);

  useEffect(() => {
    // Buscar senhas inicialmente
    fetchSenhas();

    // Atualizar a cada 7 segundos
    const interval = setInterval(fetchSenhas, 7000);

    return () => clearInterval(interval);
  }, [fetchSenhas]);

  return { 
    senhaAtual, 
    historico, 
    loading, 
    error, 
    novaSenhaChamada,
    resetNovaSenha,
    refetch: fetchSenhas 
  };
};