export interface Senha {
  id: string;
  numero: string;
  tipo: string;
  guiche: string;
  timestamp?: number;
}

export interface FilaSenhas {
  atual: Senha | null;
  anteriores: Senha[];
}

export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    painelSenhas: string;
    chamarSenha: string;
    resetarPainel: string;
  };
}
