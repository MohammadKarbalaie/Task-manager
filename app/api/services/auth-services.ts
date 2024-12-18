import { client, httpClient } from '../client';
import { urls } from '../urls';

interface AuthResponse {
  token: string;
  record: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  };
}

interface SignupData {
  email: string;
  password: string;
  username: string;
}

export async function login(email: string, password: string): Promise<AuthResponse | null> {
  try {
    const authData = await client.collection('users').authWithPassword(email, password) as unknown as AuthResponse;
    if (!authData.record || !authData.token) {
      throw new Error("Invalid response structure from server");
    }
    localStorage.setItem('authToken', authData.token);
    return authData;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}
export async function signup(data: SignupData): Promise<AuthResponse | null> {
  try {
    await httpClient().post(urls.signup, {
      email: data.email,
      password: data.password,
      passwordConfirm: data.password,
      username: data.username,
    });
 
    return await login(data.email, data.password);
  } catch (error) {
    console.error("Signup error:", error);
    return null;
  }
}

export async function refreshAuthToken(): Promise<string | null> {
  try {
    const authData = await client.collection('users').authRefresh() as unknown as AuthResponse;
    if (authData.token) {
      localStorage.setItem('authToken', authData.token);
      return authData.token;
    }
    throw new Error("Failed to refresh token");
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}

export function logout() {
  client.authStore.clear();
  localStorage.removeItem('authToken');
}
