const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const credentials = require('./token.json')
const fetch = require('node-fetch')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'start') {
    await startNormal(interaction)
  }
});

client.login(credentials.token);

async function startNormal(interaction) {
  const musixmatch = new MusixMatch()
  await interaction.reply(JSON.stringify(await musixmatch.getRandomSong()))
}

class MusixMatch {
  constructor() {
    this.key = credentials.musixmatch
    this.endpoint = 'https://api.musixmatch.com/ws/1.1'
  }
  async getRandomSong() {
    const chart = await fetch(`${this.endpoint}/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=${this.key}`)
    const chartJSON = await JSON.parse(await chart.text())
    return await random(await chartJSON.message.body.track_list)
  }
  async getRandomLyrics() {
    
  }
  
}
function random(array) {
  return array[Math.floor(Math.random()*array.length)]
} 