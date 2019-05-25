const Discord = require("discord.js");
const request = require("request");
module.exports = (client, message) => {
  if (message.author.bot || message.channel.type !== "text" || !message.guild.me.hasPermission(["SEND_MESSAGES","VIEW_CHANNEL"])) return;

  if (message.content.trim() == "<@581642119559774228>" || message.content.trim() == "<@!581642119559774228>") {
    let helpCmd = client.commands.get("help")
    helpCmd.run(client, message, [])
  } else {
    let prefix = null
    if (message.content.startsWith("lp!")) prefix = "lp!"
    else if (message.content.startsWith("<@581642119559774228>")) prefix = "<@581642119559774228> "
    else if (message.content.startsWith("<@!581642119559774228>")) prefix = "<@!581642119559774228> "

    if (prefix) {
      const command = message.content.substring(prefix.length).split(/[ \n]/)[0].trim()
      const args = message.content.slice(prefix.length + command.length).trim().split(/ +/g)
      // let cmd = client.commands.has(command) ? client.commands.get(command) : (client.aliases.has(command) ? client.commands.get(client.aliases.get(command)) : false)
      let cmd;
      if (message.client.commands.has(command)) {
        cmd = message.client.commands.get(command);
      } else if (message.client.aliases.has(command)) {
        cmd = message.client.commands.get(message.client.aliases.get(command));
      }
      
      if (!cmd) return;
      message.permissions = message.channel.permissionsFor(message.guild.me)
      if (cmd.conf.requiredPerms && !message.guild.me.hasPermission(cmd.conf.requiredPerms)) return message.channel.send(`I LACK ADEQUATE PERMISSIONS!\NI NEED: \`${cmd.conf.requiredPerms.join(", ").replace(/_/g, " ")}\``)
      message.commandStore = cmd.help.name;
      cmd.run(client, message, args).catch((res) => { client.errorLogger(res, message); })
    }
  }
}
