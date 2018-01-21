import Vue from "vue";
import uuidv4 from "uuid/v4"; //create random id

const state = {
	all: {},          // will hold all the conversations in the application
	allIds: [],       // will be an array of conversation.id
	allMsgIds: []     // will be an array containing all the conversation.message
};
const mutations = {};
const actions = {
	seed({ rootState }) {
		let convoRef = rootState.db.collection("conversations");
		convoRef.add({
			created: Date.now(),
			users: ["ray", "jessica"],
			messages: [
				{ 
					id: uuidv4(), 
					text: "Hi!", sender: "ray", 
					created: Date.now() 
				}, {
					id: uuidv4(),
					text: "Hi to you too!",
					sender: "jessica",
					created: Date.now()
				}
			]
		});
		convoRef.add({
			created: Date.now(),
			users: ["ray", "jessica"],
			messages: []
		});
	}
};

export default { namespaced: true, state, mutations, actions };
