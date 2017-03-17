# Groove - An online music player

##Running Locally
To run locally, from the root folder on the command line:
1. run `npm install`
2. run `grunt`

The app will be available at http://localhost:9001

##Published Version
The app is also available at http://erinbush.ca/musicplayer

##Source Code Location
Source code can be viewed at https://github.com/erin-bush/musicplayer

---

##Information About The App
The application was written using the AngularJS 1.6 framework.  It can be deployed locally using Grunt (see above for deployment instructions).

##Features
* The application is responsive
* The user can play and pause the song
* The user can view the song's title, artist, album, and album artwork while the song is playing
* The user can fast forward and rewind the song
* The user can see the current play time of the song
* The use can select a song from the playlist and that song will start playing
* Once a song is done playing, the application will automatically advance to the next song in the playlist

##Assumptions
* The music files are stored in the front end in the assets folder instead of being served from a backend.
* When a user clicks on a song from the playlist, the song automatically starts playing.
* To fast forward or rewind the song, the user must hold down the respective buttons.  The track will then skip forward as long as the user is holding the button down
* When a song from the playlist is done playing, the next song in the playlist automatically starts playing
* The playlist loops to the beginning once the last song is finished playing
* Clicking the progress bar will advance or reverse the song to that location
* Refreshing the page restarts the playlist

TODO: credit for tape icon
