const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js')
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
  } else if (interaction.commandName === 'guess') {
    await handleGuess(interaction)
  } else if (interaction.commandName === 'hint') {
    if (track != null) {
      const musixmatch = new MusixMatch()
      const lyrics = await musixmatch.getRandomLyrics(track)
  const chosenLyrics = `${random((await lyrics.message.body.lyrics.lyrics_body).split('\n'))}\n${random((await lyrics.message.body.lyrics.lyrics_body).split('\n'))}`
  const embed = new EmbedBuilder()
  .setTitle('Guess the song!!')
  .addFields({ name: 'Lyrics', value:chosenLyrics},{name:'Instructions',value:'To guess the song, use the `/guess` command.'})
  interaction.reply({embeds: [embed]})
    } else {
      interaction.reply(":x: you need to be in a game first!")
    }
  }
});

client.login(credentials.token);

var track;

async function startNormal(interaction) {
  const musixmatch = new MusixMatch()
  track = await musixmatch.getRandomSong()
  const lyrics = await musixmatch.getRandomLyrics(track)
  const chosenLyrics = `${random((await lyrics.message.body.lyrics.lyrics_body).split('\n'))}\n${random((await lyrics.message.body.lyrics.lyrics_body).split('\n'))}`
  const embed = new EmbedBuilder()
  .setTitle('Guess the song!!')
  .addFields({ name: 'Lyrics', value:chosenLyrics},{name:'Instructions',value:'To guess the song, use the `/guess` command.'})
  interaction.reply({embeds: [embed]})
}

async function handleGuess(interaction) {
  if (track != null) {
    let attemptSongName = interaction.options.getString("name")
    if (track.track.track_name.toLowerCase().includes(attemptSongName.toLowerCase())) {
      interaction.reply("got it!")
      track = null
    } else {
      interaction.reply(":x: oops! incorrect. try again, or you can use `/hint` to get a hint.")
    }
  } else {
    interaction.reply(":x: you need to be in a game first!")
  }
}

class MusixMatch {
  constructor() {
    this.key = credentials.musixmatch
    this.endpoint = 'https://api.musixmatch.com/ws/1.1'
  }
  async getRandomSong() {
    const chart = await fetch(`${this.endpoint}/chart.tracks.get?chart_name=top&page=1&page_size=5&country=us&f_has_lyrics=1&apikey=${this.key}`)
    const chartJSON = await JSON.parse(await chart.text())
    return await random(await chartJSON.message.body.track_list)
  }
  async getRandomLyrics(track) {
    const lyrics = await fetch(`${this.endpoint}/track.lyrics.get?track_id=${track.track.track_id}&apikey=${this.key}`)
    return await JSON.parse(await lyrics.text())
  }
  
}
function random(array) {
  return array[Math.floor(Math.random()*array.length)]
} 