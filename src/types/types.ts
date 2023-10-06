export interface Usuario {
  _id: string;
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  role: number;
  avatar: string;
  avatar_public_id: string;
  created_at: string;
  edited_at: string;
}
  
export interface Tema {
  _id: string;
  titulo: string;
  slug: string;
  assunto: string;
  apontamentos: string[];
  created_at: string;
  edited_at: string;
}
  
export interface Assunto {
  _id: string;
  nome: string;
  slug: string;
  icone: string;
  icone_public_id: string;
  apontamentos: string[];
  temas: string[];
  created_at: string;
  edited_at: string;
}
  
export interface Apontamento {
  _id: string;
  id: string;
  titulo: string;
  slug: string;
  conteudo: string;
  miniatura: string;
  miniatura_public_id: string;
  visibilidade: boolean;
  assuntos: string[];
  temas: string[];
  created_at: string;
  edited_at: string;
}

export interface Usuario2 {
  usuario: {
    _id: string;
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    role: number;
    avatar: string;
    avatar_public_id: string;
    created_at: string;
    edited_at: string;
  };
  _links: any[];
  msg: string;
}
  
export interface Tema2 {
  tema: {
    _id: string;
    titulo: string;
    slug: string;
    assunto: string;
    apontamentos: string[];
    created_at: string;
    edited_at: string;
  };
  _links: any[];
  msg: string;
}
  
export interface Assunto2 {
  assunto: {
    _id: string;
    nome: string;
    slug: string;
    icone: string;
    icone_public_id: string;
    apontamentos: string[];
    temas: string[];
    created_at: string;
    edited_at: string;
  };
  _links: any[];
  msg: string;
}
  
export interface Apontamento2 {
  apontamento: {
    _id: string;
    id: string;
    titulo: string;
    slug: string;
    conteudo: string;
    miniatura: string;
    miniatura_public_id: string;
    visibilidade: boolean;
    assuntos: string[];
    temas: string[];
    created_at: string;
    edited_at: string;
  };
  _links: any[];
  msg: string;
}