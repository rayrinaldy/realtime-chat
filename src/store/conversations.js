import Vue from "vue";
import uuidv4 from "uuid/v4"; //create random id

const state = {
	all: {}, // will hold all the conversations in the application
	allIds: [], // will be an array of conversation.id
	allMsgIds: [] // will be an array containing all the conversation.message
};

const mutations = {
	SET_CONVERSATION(state, { conversation }) {
		const data = conversation.data();
		state.all = {
			...state.all,
			[conversation.id]: {
				users: data.users,
				created: data.created,
				messages: []
			}
		};
		state.allIds.push(conversation.id);
	},

	ADD_MESSAGE(state, { conversationId, message }) {
		if (!state.allMsgIds.includes(message.id)) {
			state.all[conversationId].messages.push(message);
			state.allMsgIds.push(message.id);
		}
	}
};

const actions = {
	seed({ rootState }) {
		let convoRef = rootState.db.collection("conversations");
		convoRef.add({
			created: Date.now(),
			users: ["ray", "jessica"],
			messages: [
				{
					id: uuidv4(),
					text: "Hi!",
					sender: "ray",
					created: Date.now()
				},
				{
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
	},

	async get({ commit, rootState }) {
		let convoRef = rootState.db.collection("conversations");
		let convos = await convoRef.get();
		convos.forEach(conversation =>
			commit("SET_CONVERSATION", { conversation })
		);
	}
};

export default { namespaced: true, state, mutations, actions };
