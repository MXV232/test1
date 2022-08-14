require("dotenv").config()

const { Discord, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
    console.log("GG")
})

let tt = 0

client.on("messageCreate", (msg) => {
    if (msg.author.discriminator == '8870') {
        console.log("se")
    }
    const msgTime = msg.createdAt.getTime()
    if (msg.member.roles.cache.has('1008473280673493094')) {
        const canPost = msgTime - 60000 >= tt
        if (!canPost) {
            msg.delete()
        }
    }
    tt = msgTime
    console.log(msg.author.id)
    //console.log(msg.author)
    console.log("sas")
})


client.login(process.env.BOT_TOKEN)