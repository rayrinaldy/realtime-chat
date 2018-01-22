<template>
	<div id="app">
		<img src="./assets/logo.png">
		<h1>{{ msg }}</h1>
		<init />
		<ConversationContainer 
			v-for="id in convoIds"
			:conversation="conversations[id]"
			:id="id"
			:key="id"
		/>
	</div>
</template>

<script>
import init from './init.vue'
import ConversationContainer from './ConversationContainer.vue'
import { mapState } from 'vuex'
export default {
	name: 'app',
	
	created () {
		console.log(this.$store.state.db, "firestore")
	},
	components: {
		init,
		ConversationContainer
	},
	computed: {
		...mapState({
			conversations: state => state.conversations.all,
			convoIds: state => state.conversations.allIds
		})
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
