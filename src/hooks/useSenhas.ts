import { useState, useEffect, useCallback } from 'react';
import { Senha } from '../types';
import { API_CONFIG } from '../constants/api';

export const useSenhas = () => {
  const [senhaAtual, setSenhaAtual] = useState<Senha | null>(null);
  const [historico, setHistorico] = useState<Senha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novaSenhaChamada, setNovaSenhaChamada] = useState(false);

  // Função para buscar senhas da API
  const fetchSenhas = useCallback(async () => {    
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.chamarSenha}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar senhas');
      }

      const data: Senha = await response.json();
      
      // Detectar se há uma nova senha (comparar timestamp ou ID)
      if (data.Num_Sequencial && data.timestamp) {
        setSenhaAtual(data);
        setNovaSenhaChamada(true);
      }            
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
