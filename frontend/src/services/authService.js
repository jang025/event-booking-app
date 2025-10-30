const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const signup = async (user) => {
  const url = `${baseUrl}/api/auth/signup`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (user) => {
  const url = `${baseUrl}/api/auth/login`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
