var Discordie = require('discordie');

const Events = Discordie.Events;
var client = new Discordie();
var userMatt;
var server;
var channel;
var encoder;
var encoderStream;
var fs = require('fs');

var soundbyteFileName;

client.connect({
	token: "MzIyNTMzOTYwMjQyNDI5OTUy.DBuajg.h8hEEKEQSXDaijm9WtLDppaYSEw"
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
	console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	//console.log(server.voiceChannels);
	if (e.message.content == 'PING') {
		e.message.channel.sendMessage('PONG');
	}
	if (e.message.content == 'matt is a nub') {
		e.message.channel.sendMessage('i concur', true);
	}
	if (e.message.content == 'g?') {
	// 	e.message.channel.sendMessage(userMatt.mention);
	// 	channel.sendMessage(channel.mention);
		server = e.message.guild;
		var role = server.roles.find(r => r.name == "commoners");
		e.message.channel.sendMessage(role.mention);
	}
	if (e.message.content == 'i like league of legends') {
		channel.sendMessage('(╯°□°）╯︵ ┻━┻');
	}
	if (e.message.content == '/alldead') {
		soundbyteFileName = 'all_dead.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/baiting') {
		soundbyteFileName = 'baiting.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/byebye') {
		soundbyteFileName = 'byebye.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/chill') {
		soundbyteFileName = 'chill.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/disastah') {
		soundbyteFileName = 'disastah.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/doingit') {
		soundbyteFileName = 'doingit.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/dora') {
		soundbyteFileName = 'dora.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/holy') {
		soundbyteFileName = 'holy.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/hook') {
		soundbyteFileName = 'hook.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/lolplayer') {
		soundbyteFileName = 'lolplayer.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/rising') {
		soundbyteFileName = 'rising.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/splat') {
		soundbyteFileName = 'splat.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/stfu') {
		soundbyteFileName = 'stfu.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/tryhard') {
		soundbyteFileName = 'tryhard.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if (e.message.content == '/violin') {
		soundbyteFileName = 'violin.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if(e.message.content == '/waow') {
		soundbyteFileName = 'waow.opus';
		server = e.message.guild;
		server.voiceChannels[0].join();
	}
	if(e.message.content == '/botleave') {
		e.message.guild.voiceChannels[0].leave();
	}
	if(e.message.content == '/botstop') {
		encoderStream = encoder.stop();
		e.message.guild.voiceChannels[0].leave();
	}
	if(e.message.content == '/ray-botlist') {
		channel = e.message.channel;
		channel.sendMessage(
			'/alldead \n/baiting \n/byebye \n/chill \n/disastah \n/doingit \n/dora \n/holy \n/hook \n/lolplayer \n/rising \n/splat \n/stfu \n/tryhard \n/violin \n/waow'
			)
	}
});

client.Dispatcher.on(Events.VOICE_CONNECTED, e => {
    var info = client.VoiceConnections[0];
	if (!info) return console.log("Voice not connected");

	var source = fs.createReadStream(soundbyteFileName);
	encoder = info.voiceConnection.createExternalEncoder({
	  type: "OggOpusPlayer",
	  source: source
	});
	if (!encoder) return console.log("Voice connection is disposed");

	encoder.once("end", () => server.voiceChannels[0].leave());
	//encoder.once("end", () => info.disconnect());
	encoder.once("error", err => console.log("Ogg Error", err));

	encoderStream = encoder.play();
	encoderStream.once("unpipe", () => source.destroy()); // close descriptor

	encoderStream.resetTimestamp();
	encoderStream.removeAllListeners("timestamp");
	encoderStream.on("timestamp", time => console.log("Time " + time));

});

