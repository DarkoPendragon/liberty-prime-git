exports.run = async (client, message, args) => {
  return new Promise(async (resolve, reject) => {
    if (message.author.id !== "275147928249827338") return;
    try {
      const code = args.join(' ');
      const evaled = eval(code);
      const clean = await client.clean(client, evaled);
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``).catch((res) => {
        message.author.send(`\`\`\`js\n${clean}\n\`\`\``).catch(console.error)
      })
      resolve("command ran with no fatal errors");
    } catch (e) {
      client.errorLogger(e, message)
      reject(e);
    };
  });
};

exports.conf = {
  enabled: true,
  aliases: [],
  requiredPerms: []
};

exports.help = {
  type: 'DEV',
  name: 'eval',
  description: 'Eval\'s code. Please don\'t use this penguin.',
  usage: 'eval <codE>'
};
