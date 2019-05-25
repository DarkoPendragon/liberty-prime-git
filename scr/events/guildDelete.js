const Discord = require("discord.js");
module.exports = async (client, guild) => {

  client.leaveHook.send({
    username: `Liberty Servers`,
    embeds: [{
      "color": 1645055,
      "thumbnail": {
        "url": guild.iconURL
      },
      "title": "Liberty Prime: Removed",
      "fields": [
        {
          name: 'Server',
          value: `${guild.name} (${guild.id})`,
          inline: true
        },
        {
          name: 'Server Owner',
          value: `${guild.owner.user.tag} (${guild.ownerID})`,
          inline: true
        }
      ]
    }]
  });
}
