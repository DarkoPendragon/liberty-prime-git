module.exports = async client => {
  client.user.setPresence({game: {name: `lp!help`, type:0}});
  setInterval(() => { client.user.setPresence({game: {name: `lp!help | ${client.guilds.size} Servers`, type:0}}); }, 15000)

  console.log("Liberty Prime Online: All System Nominal");
  setTimeout(() => {
    client.generalHook.send({
      username: "Liberty Prime: General",
      embeds: [{
        "title": `Liberty Prime Online`,
        "description": `\`\`\`\nNode.js: ${process.version}\n${client.commands.size} Commands\n\`\`\``
      }]
    })
  })
};
