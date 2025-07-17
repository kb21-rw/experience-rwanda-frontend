export const postData = async (url: string, data: unknown) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
export const fetchWithToken = async (
  url: string,
  method: string,
  body?: unknown,
  token?: string
) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });

    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      return {
        error: result && typeof result === 'object' && 'error' in result ? result.error : `Error: ${response.status} ${response.statusText}`,
        status: response.status,
        ...result,
      };
    }

    return result;
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error && typeof error === "object" && error !== null && "message" in error && typeof (error as { message?: unknown }).message === "string") {
      errorMessage = (error as { message: string }).message;
    }
    return {
      error: errorMessage,
      status: 500,
    };
  }
};
