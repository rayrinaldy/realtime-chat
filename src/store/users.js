const state = {
	all: {},
	currentUser: "ray"
};
const mutations = {
	SET_USER(state, { user }) {
		state.all = { ...state.all, [user.id]: user.data() };
	}
};
const actions = {
	seed({ rootState }) {
		let userRef = rootState.db.collection("users");
		userRef.doc("ray").set({
			firstName: "Ray",
			lastName: "Rinaldy"
		});
		userRef.doc("jessica").set({
			firstName: "Jessica",
			lastName: "Komala"
		});
	},
	async get({ commit, rootState }) {
		let userRef = rootState.db.collection("users");
		let users = await userRef.get();
		users.forEach(user => commit("SET_USER", { user }));
	}
};
export default {
	namespaced: true,
	state,
	mutations,
	actions
};
