import { test, expect } from 'vitest';
import axios from 'axios';

test('Validar token da Vercel', async () => {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    throw new Error('VERCEL_TOKEN não definido');
  }

  try {
    const response = await axios.get('https://api.vercel.com/v2/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('user');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Falha na autenticação Vercel: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
});
