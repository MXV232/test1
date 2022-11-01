const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crearvotacion')
		.setDescription('Crear votacion para aprobar producto')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		if (interaction.channel.id == "1034929768958791810") {
			axios({
				method: 'post',
				url: process.env.API_GET_PENDIENTES,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: {
					id: '789'  
				}
			})
			.then(async (res) => {
				
				res.data.forEach(async (p) => {
					let embed = new EmbedBuilder()
					.setTitle(p['nombre'])
					.setDescription(p['id'])
					.addFields(
						{ name: 'Marca', value: p['marca'] ? p['marca']:"N/A" },
						{ name: 'Aclaraciones', value: p['aclaraciones'] ? p['aclaraciones']:"N/A" },
						{ name: 'Ingredientes', value: p['ingredientes'] ? p['ingredientes']:"N/A"}

					)
					.setImage("https://aptovegan.com/upload/" + p['imagen'])
					interaction.channel.send({embeds: [embed]})
					.then((message) => {
						message.react('✅').then(() => message.react('❎'))
					})
					
				})
				await interaction.reply({content: "Votacion Iniciada", ephemeral: true})
				
				

			})
			.catch(console.error)
		} else {
			await interaction.reply({content: "Canal incorrecto", ephemeral: true})
		}
		
			
	}
	
}
