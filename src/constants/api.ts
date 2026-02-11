import { ApiConfig } from '../types';

// Configuração da API - Altere quando tiver o backend pronto
export const API_CONFIG: ApiConfig = {
  baseUrl: 'http://192.168.1.119:5050/api/painel-senha', 
  endpoints: {
    painelSenhas: '/painel-senhas',
    chamarSenha: '/lista-senha-chamada?codSetor=8',
    resetarPainel: '/resetar-painel',
  }
};

// Flag para usar dados mockados ou API real
export const USE_MOCK_DATA = true; // Altere para false quando a API estiver pronta
