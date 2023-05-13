# Certes - A lyrics-guessing minigame for Discord
## What is Certes?
Certes is a community Discord bot which provides a simple minigame. Certes finds a random popular song, and then sends an excerpt of the lyrics from that song. The aim of the game is to guess what song the bot is showing you to lyrics to. The bot will give you a few hints (first/last letter of title, first/last name of artist, etc). On an upcoming "Easy Mode," the bot will, every 5 seconds, reveal another letter in the title of the song.
## Why Certes?
Certes engages your community in a fun minigame. Certes encourages multiple players to play along with each other, and is just generally fun.
## How do I add Certes to my community?
Here's a [link](https://discord.com/api/oauth2/authorize?client_id=1076710186036760728&permissions=277025507392&scope=bot), or you can find the bot in a server and press the "Add to community" button (or whatever is it at this point)
<br>
# For Developers
## Frameworks used
Below is a list of all frameworks & libraries used in the creation of Certes:
- Node.js
- Discord.js
- Node Fetch
## We host this bot for you, but if you want to host the bot yourself or even modify the function of the bot, here are instructions to do so:
### Building from source
There really isn't anything special needed to build Certes **except** for credentials. Certes looks for a `token.json` file in the root of the project. This contains all API keys needed for it to run. This is included in the bot which we host ourselves, but it is not included in the source of the bot for (hopefully) obvious reasons. Here is the format of that file:
- `token`: Discord bot token
- `app-id`: The Discord Application ID
- `musixmatch`: Our lyrics provider. You can get an API key at [https://developer.musixmatch.com/](https://developer.musixmatch.com/). You can get a paid key if you want to, but Certes works just fine with a free key (just note that using a free key for any reason other than testing breaks MusixMatch TOS, and may get your MusixMatch account banned).
### And that's it!
