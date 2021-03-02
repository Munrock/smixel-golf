//load environmental variables
require('dotenv').config();

//discord
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

//db
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ADDRESS, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('MONGO IS CONNECTED'))
	.catch(err => console.error('MONGO CONNECTION FAILED', err));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Mongo is authorised');

});

const client = new CommandoClient({
	commandPrefix: 'g.',
	owner: process.env.OWNER_ID,
	invite: process.env.INVITE_URL,
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['play', 'Gameplay Commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands({ unknownCommand: false, })
	.registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
	console.log('client ready');
	if(process.env.NODE_ENV=='development')	client.user.setActivity('Development Mode',{type:'PLAYING'});
});

client.on('error', console.error);

//login to discord
client.login(process.env.BOT_TOKEN);