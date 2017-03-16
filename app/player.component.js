(function () {

angular.module('musicPlayerApp')
       .component('musicPlayer',
{
    templateUrl: 'app/player.component.html',
    controllerAs: 'player',
    controller: function ($document, $rootScope) {
        var vm = this;

        vm.paused = false;
        vm.musicList = [
            {
                name: 'Three Little Birds',
                src: 'assets/02+Three+Little+Birds.mp3',
                album: 'The Best of Bob Marley & the Wallers',
                albumImg: 'assets/cover.jpg'
            }
        ];

        vm.play = play;
        vm.changeSong = changeSong;
        vm.timeUpdate = timeUpdate;

        activate();

        function activate() {
            vm.selectedSong = vm.musicList[0];
            vm.audio = $document[0].createElement('audio');

            vm.audio.src = vm.selectedSong.src;
            vm.currentTime = 0;
            console.log(vm.audio.duration);

            vm.audio.addEventListener('timeupdate', function () {
                $rootScope.$apply(vm.timeUpdate);
            }, false);

            vm.audio.addEventListener('loadedmetadata', function () {
                $rootScope.$apply(vm.timeUpdate);
            }, false);

        };

        function play() {
            if (vm.audio.paused) {
                vm.audio.play();
            } else {
                vm.audio.pause();
            }
        };

        function timeUpdate() {
            vm.currentTime = vm.audio.currentTime;

            //TODO: width not 200
            vm.progressBarWidth =  Math.round(200 * vm.audio.currentTime / vm.audio.duration);
        }

        function changeSong() {}
    }
});

angular.module('musicPlayerApp')
       .filter('secondsToDate', [function() {
            return function(seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
}]);

})();
