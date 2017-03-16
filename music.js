/*
 * music.js
 * Author: Erin Bush
 * Created: March 14, 2017
 *
 * A music player for mp3 files
 *
 */


var player = (function() {
  var vm = this;

  function init() {
    vm.music = document.getElementById('music');
    vm.playButton = document.getElementById('play');
    vm.progressWrapper = document.getElementById('progress-bar');

    vm.music.addEventListener("timeupdate", timeUpdate, false);
  }

  function play() {
    console.log('play');

  	if (vm.music.paused) {
  		vm.music.play();
  		vm.playButton.className = "";
  		vm.playButton.className = "pause-button";
  	} else {
  		vm.music.pause();
  		vm.playButton.className = "";
  		vm.playButton.className = "play-button";
  	}

  };

  function timeUpdate() {
    var progressBar = document.getElementById('progress-update');
    var width = vm.progressWrapper.offsetWidth;
    var currentTime = document.getElementById('time-value');

    currentTime.innerHTML = music.currentTime;

    progressBar.style.width = Math.round(width * music.currentTime / music.duration);
  }

  return {
    play: play,
    init: init
  }

})();


window.onload = function () {
  player.init();
}
