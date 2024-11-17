import { httpClient } from "../client";
import { urls } from "../urls";

export async function deleteTask(id: string) {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token is not available.");
  }

  const response = await httpClient().delete(urls.delete(id), {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;  
}
