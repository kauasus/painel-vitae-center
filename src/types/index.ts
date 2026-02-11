export interface Senha {
  Cod_Senha_Atendimento: number
  Tipo_Senha: string
  Num_Sequencial: number
  Dsc_Localizacao: string
  timestamp?: number
}

export interface FilaSenhas {
  atual: Senha | null
  anteriores: Senha[]
}

export interface ApiConfig {
  baseUrl: string
  endpoints: {
    painelSenhas: string
    chamarSenha: string
    resetarPainel: string
  }
}
