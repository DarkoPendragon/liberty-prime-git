const Discord = require("discord.js")
const klaw = require("klaw")
const path = require("path")

class LibertyPrime extends Discord.Client {
  constructor(options) {
    super(options)
    this.tokens = require("./scr/_data/tokens.json")
    this.voiceFiles = require("./scr/_data/fileMapping.json").files
    this.errorHook = new Discord.WebhookClient(this.tokens.webhooks.errors.id, this.tokens.webhooks.errors.token)
    this.generalHook = new Discord.WebhookClient(this.tokens.webhooks.general.id, this.tokens.webhooks.general.token)
    this.joinHook = new Discord.WebhookClient(this.tokens.webhooks.joins.id, this.tokens.webhooks.joins.token)
    this.leaveHook = new Discord.WebhookClient(this.tokens.webhooks.leaves.id, this.tokens.webhooks.leaves.token)
    this.commands = new Map()
    this.aliases = new Map()
    this.reccentAdd = new Set()
    this.libertyBroadcasts = new Set()
  }

  errorLogger(e, msg) {
    if (msg && msg.channel) msg.channel.send("AN ERROR HAS OCCOURED! REPORT TO THE SERVER FOR ASSISTANCE.\nhttps://discord.gg/bXvgdjV").catch({})
    if (e.stack) e = e.stack
    console.log(e)

    let embed = {
      "color": 1645055,
      "description": `\`\`\`xl\n${typeof e == "object" ? e.toString() : e}\n\`\`\``
    }
    if (message && message.guild) {
      embed.fields = [{
          name: 'Server',
          value: `${message.guild.name} (${message.guild.id})`,
          inline: true
        },
        {
          name: 'User',
          value: `${message.author.tag} (${message.author.id})`,
          inline: true
        },
        {
          name: 'Command',
          value: message.commandStore,
          inline: false
        }
      ]
    }
    this.errorHook.send({
      username: `Liberty Error: Normal`,
      embeds: [embed]
    });
  }

  async clean(client, text) {
    if (text && text.constructor.name == 'Promise')
      text = await text;
    if (typeof evaled !== 'string')
      text = require('util').inspect(text, {
        depth: 1
      });

    text = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replace(client.token, 'NO--TOKEN--4U');

    return text;
  };
}
const client = new LibertyPrime()

const init = async () => {
  klaw("./scr/commands").on("data", (item) => {
    const cmdFile = path.parse(item.path)
    if (!cmdFile.ext || cmdFile.ext !== ".js") return
    try {
      let props = require(`./scr/commands/${cmdFile.name}${cmdFile.ext}`)
      if (props.conf.enabled) {
        client.commands.set(props.help.name, props)
        props.conf.aliases.forEach(alias => {
          if (!client.commands.has(alias)) client.aliases.set(alias, props.help.name)
        })
      }
    } catch (e) {
      console.log(new Error(`FAIL: ${cmdFile.name}: ${e.stack}`))
    }
  })

  klaw("./scr/events").on("data", (item) => {
    const evtFile = path.parse(item.path)
    try {
      if (!evtFile.ext || evtFile.ext !== ".js") return
      const event = require(`./scr/events/${evtFile.name}${evtFile.ext}`)
      client.on(evtFile.name, event.bind(null, client))
    } catch (e) {
      console.log(new Error(`FAIL: ${evtFile.name}: ${e.stack}`))
    }
  });

  client.login(client.tokens.botToken)
}

init()

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.removeFrom = function(forDeletion) {
  if (typeof forDeletion == "object") return this.filter(a => !forDeletion.includes(a))
  else if (typeof forDeletion == "string") return this.filter(a => a != forDeletion);
};

process.on("UnhandledPromiseRejectionWarning", e => { client.errorLogger(e) })
.on("uncaughtException", e => { client.errorLogger(e) })
.on("unhandledRejection", e => { client.errorLogger(e) })
