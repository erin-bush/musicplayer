/*
 * player.component.js
 * Author: Erin Bush
 * Created: March 16, 2016
 *
 * This file contains the player component. The song that was selected from the playlist
 * is passed into the component and is loaded as an audio element.  This component
 * controls the play, pause, fastforward, and rewind controls - as well as the ability
 * to click on the progress bar and go to that location in the song.
 *
 * When the song has ended, callback function passed in from the playlist component is called
 *
 */

(function () {

angular.module('musicPlayerApp')
       .component('musicPlayer',
{
    templateUrl: 'app/player.component.html',
    controllerAs: 'player',
    bindings: {
        song: '<',
        songEndedCallback: '<'
    },
    controller: function ($document, $rootScope, $interval, $scope, $timeout) {
        var vm = this,
            promiseRewind,
            promiseFastforward;

        vm.paused = false;

        vm.play = play;
        vm.changeSong = changeSong;
        vm.timeUpdate = timeUpdate;
        vm.goToPosition = goToPosition;
        vm.rewind = rewind;
        vm.fastforward = fastforward;
        vm.rewindMouseDown = rewindMouseDown;
        vm.rewindMouseUp = rewindMouseUp;
        vm.fastforwardMouseDown = fastforwardMouseDown;
        vm.fastforwardMouseUp = fastforwardMouseUp;

        vm.$onInit = function() {
            vm.audio = $document[0].createElement('audio');
            initAudio();

            var width = undefined;

            vm.audio.addEventListener('timeupdate', function () {
                $rootScope.$apply(function () {
                    vm.timeUpdate(width);
                });
            }, false);

            vm.audio.addEventListener('loadedmetadata', function () {
                $rootScope.$apply(function () {
                    vm.timeUpdate(width);
                });
            }, false);

            vm.audio.addEventListener('ended', function () {
                vm.songEndedCallback();
            }, false);

            vm.$onChanges = function (changes) {
                initAudio();
                if (changes.song.previousValue !== undefined){
                    vm.play();
                }
            };
        }

        function initAudio() {
            if (vm.song){
                vm.selectedSong = vm.song;
                vm.audio.src = vm.selectedSong.src;
                vm.currentTime = 0;
            }
        }

        function play() {
            if (vm.audio.paused) {
                vm.audio.play();
            } else {
                vm.audio.pause();
            }
        };

        function timeUpdate(progressWidth) {
            var width = getProgressBarWidth();

            vm.currentTime = vm.audio.currentTime;
            vm.progressBarWidth = progressWidth || Math.round(width * vm.audio.currentTime / vm.audio.duration);
        }

        function changeSong() {}

        function goToPosition(event) {
            var position = event.offsetX;
            var songPercent = position / getProgressBarWidth();
            vm.audio.currentTime = vm.audio.duration * songPercent;
            vm.timeUpdate(position);
        }

        function getProgressBarWidth(){
            return document.getElementById("progress-bar").offsetWidth;
        }

        function rewindMouseDown() {
            if(promiseRewind){
               $interval.cancel(promiseRewind);
            }
            promiseRewind = $interval(function () {
               vm.audio.currentTime -= 5;
               vm.timeUpdate();
            }, 100);
         }

         function rewindMouseUp() {
             $interval.cancel(promiseRewind);
         }

         function fastforwardMouseDown() {
             if(promiseFastforward){
                $interval.cancel(promiseFastforward);
             }
             promiseFastforward = $interval(function () {
                vm.audio.currentTime += 5;
                vm.timeUpdate();
             }, 100);
         }

         function fastforwardMouseUp() {
             $interval.cancel(promiseFastforward);
         }
    }
});

/*
 * secondsToDate Filter
 *
 * This filter is used to convert seconds to a date object to be formatted as HH:mm:ss
 * Based off of the answer given on this StackOverflow thread: http://stackoverflow.com/a/28401099
 *
 */

angular.module('musicPlayerApp')
       .filter('secondsToDate', [function() {
            return function(seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
}]);

})();
