import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../setAuthToken.js";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	});

	//AUTHENTICATE USER
	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		}
		try {
			const response = await axios.get(`${apiUrl}/auth`);
			if (response.data.success) {
				dispatch({
					type: "SET_AUTH",
					payload: {
						isAuthenticated: true,
						user: response.data.user,
					},
				});
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			setAuthToken(null);
			dispatch({
				type: "SET_AUTH",
				payload: { isAuthenticated: false, user: null },
			});
		}
	};

	useEffect(() => loadUser(), []);

	//LOGIN USER
	const loginUser = async (userForm) => {
		try {
			console.log(userForm);
			const response = await axios.post(`${apiUrl}/auth/login`, userForm);
			console.log("Response", response);
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				);
				loadUser();
				return response.data;
			}
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return { success: false, message: error.message };
		}
	};

	//LOGOUT USER
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		dispatch({
			type: "SET_AUTH",
			payload: {
				isAuthenticated: false,
				user: null,
			},
		});
	};

	//REGISTER USER
	const registerUser = async (userForm) => {
		try {
			const response = await axios.post(
				`${apiUrl}/auth/register`,
				userForm
			);
			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				);
			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return { success: false, message: error.message };
		}
	};

	//CONTEXT DATA
	const AuthContextData = { loginUser, authState, registerUser, logoutUser };

	//RETURN PROVIDER
	return (
		<AuthContext.Provider value={AuthContextData}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
