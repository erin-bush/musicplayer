(function () {

angular.module('musicPlayerApp')
       .component('musicPlayer',
{
    templateUrl: 'app/player.component.html',
    controllerAs: 'player',
    controller: function ($document, $rootScope, $interval) {
        var vm = this,
            promiseRewind,
            promiseFastforward;

        vm.paused = false;
        vm.musicList = [
            {
                title: 'Three Little Birds',
                artist: 'Bob Marley',
                src: 'assets/02+Three+Little+Birds.mp3',
                album: 'The Best of Bob Marley & the Wailers',
                albumImg: 'assets/cover.jpg'
            }
        ];

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

        activate();

        function activate() {
            vm.selectedSong = vm.musicList[0];
            vm.audio = $document[0].createElement('audio');

            vm.audio.src = vm.selectedSong.src;
            vm.currentTime = 0;
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

        };

        function play() {
            if (vm.audio.paused) {
                vm.audio.play();
            } else {
                vm.audio.pause();
            }
        };

        function timeUpdate(progressWidth) {
            //debugger;
            var width = getProgressBarWidth();

            vm.currentTime = vm.audio.currentTime;

            //TODO: width not 200
            vm.progressBarWidth = progressWidth || Math.round(width * vm.audio.currentTime / vm.audio.duration);
        }

        function changeSong() {}

        function goToPosition(event) {
            console.log(event);
            var position = event.offsetX;
            var songPercent = position / getProgressBarWidth();
            vm.audio.currentTime = vm.audio.duration * songPercent;
            vm.timeUpdate(position);
        }

        function getProgressBarWidth(){
            return document.getElementById("progress-bar").offsetWidth;
        }

        // scope.mouseDown = function() {
        //   if(promise){
        //      $interval.cancel(promise);
        //   }
        //   promise = $interval(function () {
        //     scope.Time++;
        //   }, 100);
        //
        // };
        //
        // scope.mouseUp = function () {
        //    $interval.cancel(promise);
        //    promise = null;
        // };

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

angular.module('musicPlayerApp')
       .filter('secondsToDate', [function() {
            return function(seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
}]);

})();