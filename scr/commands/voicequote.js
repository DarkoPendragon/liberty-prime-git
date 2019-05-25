const Discord = require("discord.js");
const path = require('path');
exports.run = async (client, message, args) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!message.member.voiceChannel || !message.member.voiceChannel.joinable) return message.reply("I CANNOT FIND YOUR VOICE CHANNEL.")
      if (client.libertyBroadcasts.has(message.guild.id)) return message.reply("I AM CURRENTLY BROADCASTING, PLEASE WAIT.")
      let file = path.join(__dirname, '..', `voiceFiles/${client.voiceFiles[Math.floor(Math.random() * client.voiceFiles.length)].fileName}`)

      new Promise((resolve, reject) => {
        const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
        if (voiceConnection === null) {
          if (message.member.voiceChannel && message.member.voiceChannel.joinable) {
            message.member.voiceChannel.join()
            .then(connection => {
              resolve(connection);
            })
            .catch((error) => {
              console.log(error);
            });
          } else if (!message.member.voiceChannel.joinable || message.member.voiceChannel.full) {
            message.reply("I CANNOT FIND YOUR VOICE CHANNEL.")
            reject();
          }
        } else {
          resolve(voiceConnection);
        }
      }).then(connection => {
        client.libertyBroadcasts.add(message.guild.id)
        connection.playFile(file).on("end", () => {
          const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
          if (voiceConnection !== null) voiceConnection.disconnect();
          setTimeout(() => { client.libertyBroadcasts.delete(message.guild.id) }, 1000)
        }).on("error", e => {
          const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
          if (voiceConnection !== null) voiceConnection.disconnect();
          setTimeout(() => { client.libertyBroadcasts.delete(message.guild.id) }, 1000)
          client.errorLogger(e, message)
        })
      })
      resolve("command ran with no fatal errors");
    } catch (e) {
      reject(e);
    };
  });
};

exports.conf = {
  enabled: true,
  aliases: ["vq"]
};

exports.help = {
  type: 'Quote',
  name: 'voicequote',
  description: 'Joins your current voice channel and says a quote from Liberty Prime.',
  usage: 'voicequote'
};
