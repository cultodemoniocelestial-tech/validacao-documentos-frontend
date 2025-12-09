import { test, expect } from 'vitest';
import axios from 'axios';

test('Validar token do Railway', async () => {
  const token = process.env.RAILWAY_TOKEN;
  if (!token) {
    throw new Error('RAILWAY_TOKEN não definido');
  }

  // O Railway não tem um endpoint público simples de "me" documentado facilmente acessível sem GraphQL complexo,
  // mas podemos tentar listar projetos ou apenas verificar se o token tem formato válido se a API for complexa.
  // Vamos tentar uma query GraphQL simples para o endpoint público do Railway.
  
  const query = `
    query {
      me {
        id
        email
      }
    }
  `;

  try {
    const response = await axios.post('https://backboard.railway.app/graphql/v2', {
      query
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    expect(response.status).toBe(200);
    // Se o token for inválido, o Railway geralmente retorna 200 com errors no body
    if (response.data.errors) {
       throw new Error(`Erro na API Railway: ${JSON.stringify(response.data.errors)}`);
    }
    expect(response.data.data.me).toHaveProperty('email');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Falha na autenticação Railway: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
});
