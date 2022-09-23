interface CreateAccountResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

const signup = async (
  name: string,
  email: string,
  password: string
): Promise<CreateAccountResponse | null> => {
  try {
    const data = JSON.stringify({ name, email, password });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (response && response.status === 201) {
      const responseData = await response.json();
      if (responseData) {
        return {
          user: {
            id: responseData.user.id,
            email: responseData.user.email,
            name: responseData.user.name,
          },
          token: responseData.token,
        };
      } else {
        throw new Error('Signup data not found');
      }
    }
    return null;
  } catch (e: Error | any) {
    throw new Error(e.message || 'Create an account failed');
  }
};

export default signup;
