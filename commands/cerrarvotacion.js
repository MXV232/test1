const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cerrarvotacion')
		.setDescription('Cerrar votacion y contar votos')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const msgManager = interaction.channel.messages
        const sendArray = []
		msgManager.fetch({cache: false})
		.then(messages => {
            messages.forEach((msg) => {
                const emb = msg.embeds[0].description
                const votosP = msg.reactions.cache.get('✅').count -1
			    const votosN = msg.reactions.cache.get('❎').count -1
                
                if (votosP > 0 && (votosP + votosN)/10 >= votosN) {
                    sendArray[emb] = "1"
                } else {
                    sendArray[emb] = "2"
                }
                
            })
            interaction.channel.bulkDelete(messages.size)
            .then(messages => {
                console.log(`Bulk deleted ${messages.size} messages`)
                interaction.reply({content: "Votacion cerrada", ephemeral:true})
            })
            .catch(console.error);
            axios({
                method: 'post',
                url: process.env.API_SEND_PENDIENTES,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: sendArray
            })
            .then(async (res) => {
                console.log(res.data)
            })
            .catch(console.error)
		}
		)
		.catch(console.error)
		
			
	}
	
}