const state = {
	all: {},
	currentUser: "ray" // simulate having someone logged in
};
const mutations = {};
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
	}
};
export default {
	namespaced: true,
	state,
	mutations,
	actions
};
