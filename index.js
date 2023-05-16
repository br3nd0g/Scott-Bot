require('dotenv').config();
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');

const targetServer = '1009526889670512711';
const targetMember = '417014490748682251';
const targetChannel = '1098937406159335485';
let targetObj;
let scottOnline = false
const messages = ["Scott is here and ready to party!", "Scott is now online! Hooray!", "Scott is online, yippeeeeeeeeeeeeee"]

const client = new Client({ intents: 33539 });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        activities: [{ name: `With Toys`, type: ActivityType.Playing }],
        status: 'online'
    });

});

client.login(process.env.clToken);

setInterval(function() {
    // check if scott user id status is offline, if not, send message going "@everyone scott online"
    let scottStatus = statusCheck()
    statusComparison(scottStatus)

}, 15 * 1000); 

function alertEveryone(){
    let randomIndex = Math.floor(Math.random() * messages.length);

    const channel = client.channels.cache.get(targetChannel);
    channel.send(`@everyone ${messages[randomIndex]}`);
}

function statusCheck(){
    //gets guild object of the guild, gets userpresence object of user, gets status
    const guild = client.guilds.resolve(targetServer);
    const userPresence = guild.presences.resolve(targetMember)
    return userPresence.status
}

function statusComparison(status){
    if(scottOnline === false && (status === "dnd" || status === "online")){
        scottOnline = true
        alertEveryone()
    } else if (scottOnline === true && status === "offline"){
        scottOnline = false
    }
}