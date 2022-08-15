require("dotenv").config()

const { Discord, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
    console.log("GG")
})

let tt = 0

client.on("messageCreate", async msg => {
    
    if (msg.member.roles.cache.has('1008473280673493094')) {
        const msgTime = msg.createdAt.getTime()
        const canPost = msgTime - 60000 >= tt
        if (!canPost) {
            msg.delete()
        }
        tt = msgTime
    }
    try {
        //if (!msg.guild) return;
    
        if (msg.content.startsWith('/play')) {
            // Only try to join the sender's voice channel if they are in one themselves
            if (msg.member.voice.channel) {
                console.log("play")
                const connection = await msg.member.voice.channel.join();
                const args = msg.content.split(' ').slice(1)
                const ytdl = require('ytdl-core')
                connection.play(ytdl(args.join(" ")))
            } else {
                console.log("no")
                msg.reply('You need to join a voice channel first!');
            }
        }
    } catch(e){
    console.log(e)
    }
    
})


client.login(process.env.BOT_TOKEN)
