require("dotenv").config()

const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { Discord, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

client.on('ready', () => {
    console.log("GG")
})

client.on("messageCreate", async msg => {
    
    if (msg.content.startsWith('/random')) {
        const args = msg.content.split(' ').slice(1)
        msg.reply(args[Math.floor(Math.random() * args.length)])
    }
})


client.login(process.env.BOT_TOKEN)
