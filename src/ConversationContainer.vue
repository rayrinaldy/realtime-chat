<template>
	<div>
		Conversation ID: {{ id }}
		<hr>
		<Message 
			v-for="message in conversation.messages" 
			:message="message" 
			:key="message.created" 
		/>
	</div>
</template>
<script>
	import Message from './Message.vue'
	import { mapState } from 'vuex'
	export default {
		name: 'ConversationContainer',
		props: {
			conversation: {
				type: Object,
				required: true
			},
			id: {
				type: String,
				required: true
			}
		},
		created () {
			this.$store.state.db.collection('conversations').doc(this.id).onSnapshot(convo => {
				let source = convo.metadata.hasPendingWrites ? 'Local' : 'Server'
				console.log(`Source: ${source}`)
				if (convo && convo.data()) {
					convo.data().messages.forEach(message => this.$store.commit('conversations/ADD_MESSAGE', { 
						conversationId: this.id, message 
					}))
				}
  			})
		},
		components: {
			Message
		}
	}
</script>
<style scoped>
</style>