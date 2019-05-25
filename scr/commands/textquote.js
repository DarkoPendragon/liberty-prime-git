const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (args[1]) {
        args[1] == args[1].toLowerCase()
        if (args[1] !== "fallout3" && args[1] !== "brokensteel" && args[1] !== "fallout4") return message.channel.send(client.voiceFiles[Math.floor(Math.random() * client.voiceFiles.length)].text.toUpperCase())
        let filtered = client.voiceFiles.filter(q => q.type == args[1])
        message.channel.send(filtered[Math.floor(Math.random() * filtered.length)].text.toUpperCase())
      } else {
        message.channel.send(client.voiceFiles[Math.floor(Math.random() * client.voiceFiles.length)].text.toUpperCase())
      }
      resolve("command ran with no fatal errors");
    } catch (e) {
      reject(e);
    };
  });
};

exports.conf = {
  enabled: true,
  aliases: ['tq']
};

exports.help = {
  type: 'Quote',
  name: 'textquote',
  description: 'Sends a quote from Liberty Prime in the current channel. Type can equal fallout3, brokensteel, fallout4 or left blank for a random quote.',
  usage: 'textquote [type]'
};
