const { REST, Routes } = require('discord.js');
const credentials = require('./token.json')

const commands = [
  {
    name: 'start',
    description: 'Start a normal game of Certes.',
  },
  {
    name: 'guess',
    description:'Guess the song name',
    options: [
      {
        name: 'name',
        description: 'the name of the song you think it is',
        type: 3,
        required: true
      }
    ]
  },
  {
    name: 'hint',
    description: 'get a hint'
  },
  {
    name: 'giveup',
    description: 'give up'
  }
];

const rest = new REST({ version: '10' }).setToken(credentials.token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(credentials['app-id']), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();