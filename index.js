require('dotenv').config();
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client.users);

    client.user.setPresence({
        activities: [{ name: `With Toys`, type: ActivityType.Playing }],
        status: 'online'
    });
});

client.login(process.env.clToken);


setInterval(function() {
    // check if scott user id status is offline, if not, send message going "@everyone scott online"
}, 30 * 1000); 