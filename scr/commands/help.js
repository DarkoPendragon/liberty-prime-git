const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  return new Promise(async (resolve, reject) => {
    client = message.client;
    if (!args[0]) {
      const hex = "RANDOM";
      var cats = new Map();
      client.commands.forEach(c => {
        let n = c.help.type.toProperCase();
        if (!cats.has(n)) {
          cats.set(n, {
            name: n,
            array: []
          });
        };
        cats.get(n).array.push(c.help.name);
      });

      var embed = new Discord.RichEmbed();
      embed.setTitle(`Commands Info`)
      embed.setDescription(`Use \`lp!help commandname\` to view help on a command (use in a server). Vist https://discord.gg/bXvgdjV for help.`)
      embed.setAuthor('Liberty Commands')
      cats.forEach(cat => {
        embed.addField(cat.name, cat.array.join(", "));
      });
      embed.setColor(hex)
      embed.setTimestamp()
      embed.setThumbnail(client.user.displayAvatarURL);
      embed.setFooter(`Made by ${client.users.get("275147928249827338").tag}`, client.users.get("275147928249827338").displayAvatarURL);
      message.author.send({
        embed
      }).then(() => {
        message.channel.send("COMMAND INFO SENT TO DM'S")
        resolve("command ran with no fatal errors");
      }).catch(() => {
        const embed = new Discord.RichEmbed();
        embed.setTitle(`Commands Info`)
        embed.setDescription(`Use \`lp!help commandname\` to view help on a command (use in a server) or message me the name of a command you need help for. Vist https://discord.gg/bXvgdjV for help.`)
        embed.setAuthor('Liberty Commands')
        cats.forEach(cat => {
          embed.addField(cat.name, cat.array.join(", "));
        });
        embed.setColor(hex)
        embed.setTimestamp()
        embed.setThumbnail(client.user.displayAvatarURL)
        embed.setFooter(`Made by ${client.users.get("275147928249827338").tag}`, client.users.get("275147928249827338").displayAvatarURL);
        message.channel.send({
          embed
        })
        resolve("command ran with no fatal errors");
      });
    } else {
      let command = args.slice(0).join(' ');
      if (client.commands.has(command)) {
        command = client.commands.get(command);

        const embed = new Discord.RichEmbed();
        embed.setAuthor(`${command.help.name}`)
        embed.setDescription(`${command.help.description}`)
        embed.setColor(0x610161)
        embed.setTimestamp()
        embed.addField('Usage:', `lp!${command.help.usage}`)
        if (command.conf.aliases.length > 0) embed.addField('Aliases:', `${command.conf.aliases.join(", ")}`, true)
        embed.setThumbnail(client.user.avatarURL)
        embed.setFooter(`Made by ${client.users.get("275147928249827338").tag}`, client.users.get("275147928249827338").displayAvatarURL);
        message.channel.send({
          embed
        })
        resolve("command ran with no fatal errors");
      } else {
        message.reply(`please give me a command!`);
        resolve("command ran with no fatal errors");
      }
    };
  });
};

exports.conf = {
  enabled: true,
  serverOnly: false,
  allowedServers: [],
  aliases: ['h', 'halp', 'commands', 'cmds'],
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  type: 'Utility',
  name: 'help',
  description: 'Displays all the available commands or displays help for a command.',
  usage: 'help [command]'
};
