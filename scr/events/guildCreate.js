const Discord = require("discord.js");
module.exports = async (client, guild) => {
  const getDefaultChannel = (guild) => {
    // get "original" default channel
    if (guild.channels.has(guild.id))
    return guild.channels.get(guild.id)

    // Check for a "general" channel, which is often default chat
    const generalChannel = guild.channels.find(channel => channel.name === "general");
    if (generalChannel)
    return generalChannel;
    // Now we get into the heavy stuff: first channel in order where the bot can speak
    // hold on to your hats!
    return guild.channels
    .filter(c => c.type === "text" &&
    c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
    .sort((a, b) => a.position - b.position ||
    Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
    .first();
  }
  var invite = await guild.channels.find(c => c.type !== "category" && c.position === 0).createInvite({
    maxAge: 0
  }).catch(() => {
    invite = "Couldn't make an invite.";
  })

  client.joinHook.send({
    username: `Liberty Servers`,
    embeds: [{
      "color": 1645055,
      "thumbnail": {
        "url": guild.iconURL
      },
      "title": "Liberty Prime: New Server",
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
        },
        {
          name: 'Members',
          value: `${guild.members.filter(m => m.user.bot == false).size}`,
          inline: true
        },
        {
          name: 'Bots',
          value: `${guild.members.filter(m => m.user.bot == true).size}`,
          inline: true
        },
        {
          name: 'Invite',
          value: `${typeof invite == "string" ? invite : invite.url}`,
          inline: true
        }
      ]
    }]
  });

  const channel = getDefaultChannel(guild);
  let joiEmbed = new Discord.RichEmbed()
  .setColor('#0099ff')
  .setTitle('Support Server')
  .setURL('https://discord.gg/bXvgdjV')
  .setAuthor('Liberty Prime')
  .setDescription('SERVER ADDED TO PROTECTION DATABASE. TO SEE MY FUNCTIONS TYPE IN \`lp!help\`. YOU CAN EITHER USE \`lp!\` OR MY @MENTION AS A PREFIX.\n\nTO GET HELP OR SUPPORT ON ME, PLEASE VISIT https://discord.gg/bXvgdjV')
  .setImage('https://i.imgur.com/OtjRk2W.jpg')
  .setTimestamp()
  .setFooter('BETTER DEAD THAN RED');

  if (guild.me.hasPermission(["EMBED_LINKS"])) {
    channel.send(joiEmbed).catch((res) => {
      // ignore error
    });
  } else {
    channel.send(`_**SERVER ADDED TO PROTECTION DATABASE**_. TO SEE MY FUNCTIONS TYPE IN \`lp!help\`. YOU CAN EITHER USE \`lp!\` OR MY @MENTION AS A PREFIX.\n\nTO GET HELP OR SUPPORT ON ME, PLEASE VISIT https://discord.gg/bXvgdjV`).catch((res) => {
      // ignore error
    });
  }
}
