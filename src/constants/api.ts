import { ApiConfig } from '../types';

// Configuração da API - Altere quando tiver o backend pronto
export const API_CONFIG: ApiConfig = {
  baseUrl: 'https://seu-sistema.com.br/api', // ALTERAR FUTURAMENTE
  endpoints: {
    painelSenhas: '/painel-senhas',
    chamarSenha: '/chamar-senha',
    resetarPainel: '/resetar-painel',
  },
};

// Flag para usar dados mockados ou API real
export const USE_MOCK_DATA = true; // Altere para false quando a API estiver pronta
