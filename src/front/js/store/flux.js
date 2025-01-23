const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (!resp.ok) throw new Error("Error en el registro");

					const data = await resp.json();
					console.log("Usuario registrado:", data);
				} catch (error) {
					console.error("Error en el registro:", error);
					throw error;
				}
			},
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (!resp.ok) throw new Error("Login fallido");

					const data = await resp.json();
					localStorage.setItem("token", data.token);
					setStore({ token: data.token });
				} catch (error) {
					console.error("Error en el login:", error);
					throw error;
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			},
			private: async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return false;

					const resp = await fetch(process.env.BACKEND_URL + "/private", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token,
						},
					});
					if (!resp.ok) return false;

					const data = await resp.json();
					return true;
				} catch (error) {
					console.error("Error validando token:", error);
					return false;
				}
			}
		}
	};
};

export default getState;
