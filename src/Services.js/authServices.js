export const login = async (email, password) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      return await response.json();
  } catch (error) {
      return { error: error.message };
  }
};
