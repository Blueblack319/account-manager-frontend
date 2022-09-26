import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  IAuthState,
  IAuthContext,
  AuthAction,
  AuthActionType,
  LoginResponse,
  User,
} from '../types/auth.interface';

// initial state for the useReducer hook
const initialState: IAuthState = {
  user: null,
  initialLoading: false,
  isLoggedIn: false,
  isLoggingIn: false,
  loginError: '',
};

// initial value for the auth context
const initialContext: IAuthContext = {
  state: {
    user: null,
    initialLoading: false,
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: '',
  },
  actions: {
    login: () => undefined,
    logout: () => undefined,
  },
};

// reducer function for returning the appropriate state after
// a pre-defined action is dispatched
const reducer = (state: IAuthState, action: AuthAction): IAuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.INIT_FETCH_USER_DATA:
      return {
        ...state,
        initialLoading: true,
      };

    case AuthActionType.FETCH_USER_DATA_SUCCESSFUL:
      return {
        ...state,
        initialLoading: false,
        user: payload?.user,
      };

    case AuthActionType.FETCH_USER_DATA_FAILED:
      return {
        ...state,
        initialLoading: false,
        user: null,
      };

    case AuthActionType.INIT_LOGIN:
      return {
        ...state,
        isLoggingIn: true,
      };

    case AuthActionType.LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: payload?.user,
        isLoggedIn: true,
        isLoggingIn: false,
        loginError: '',
      };

    case AuthActionType.LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        isLoggingIn: false,
        loginError: payload?.error as string,
      };

    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

const loginFn = async (
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  try {
    const data = JSON.stringify({ email, password });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (response && response.status === 200) {
      const responseData = await response.json();
      if (responseData) {
        return {
          user: {
            id: responseData.id,
            email: responseData.email,
            name: responseData.name,
          },
          token: responseData.token,
          tokenExpiration: new Date(new Date().getTime() + 60 * 1000 * 60),
        };
      } else {
        throw new Error('Login failed');
      }
    }
    return null;
  } catch (error: Error | any) {
    throw new Error(error.message || 'Login failed');
  }
};

const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token') || '';
    const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.status === 200) {
      const responseData = await response.json();
      if (responseData) {
        return {
          id: responseData.id,
          email: responseData.email,
          name: responseData.name,
        };
      } else {
        throw new Error('Failed to fetch user data');
      }
    }
    return null;
  } catch (error: Error | any) {
    throw new Error(error.message || 'Failed to fetch user data');
  }
};

const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch the data of a user on initial page load
  // to restore their session if there's a token and user id
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        // if (userId && token) {
        if (userId && token) {
          dispatch({ type: AuthActionType.LOGIN_SUCCESSFUL });
          const user = await getUserData(userId);
          if (user) {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_SUCCESSFUL,
              payload: { user },
            });
          } else {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_FAILED,
            });
          }
        }
      } catch (error: Error | any) {
        dispatch({
          type: AuthActionType.FETCH_USER_DATA_FAILED,
        });
      }
    };

    fetchUserData();
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const login = useCallback(async (email: string, password: string) => {
    try {
      dispatch({ type: AuthActionType.INIT_LOGIN });
      const loginResponse = await loginFn(email, password);
      if (loginResponse) {
        const { user, token, tokenExpiration } = loginResponse;
        // store the token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('tokenExp', tokenExpiration.toISOString());
        // complete a successful login process
        dispatch({ type: AuthActionType.LOGIN_SUCCESSFUL, payload: { user } });
      } else {
        dispatch({
          type: AuthActionType.LOGIN_FAILED,
          payload: { error: 'Login failed' },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.LOGIN_FAILED,
        payload: { error: error.message || 'Login failed' },
      });
    }
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const logout = useCallback(() => {
    dispatch({ type: AuthActionType.LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExp');
  }, []);

  // stored the auth context value in useMemo hook to recalculate
  // the value only when necessary
  const value = useMemo(
    () => ({ state, actions: { login, logout } }),
    [login, logout, state]
  );

  return (
    <AuthContext.Provider value={value}>
      {state.initialLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// hook for accessing the auth state
export const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return state;
};

// hook for accessing the auth actions
export const useAuthActions = () => {
  const { actions } = useContext(AuthContext);
  return actions;
};

export default AuthProvider;
