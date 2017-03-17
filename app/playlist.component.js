(function () {

angular.module('musicPlayerApp')
       .component('playlist',
{
    templateUrl: 'app/playlist.component.html',
    controllerAs: 'playlist',
    controller: function ($scope) {
        var vm = this;
        vm.songIndex = 0;

        vm.musicList = [
            {
                title: 'Three Little Birds',
                artist: 'Bob Marley',
                src: 'assets/audio/Three+Little+Birds.mp3',
                album: 'The Best of Bob Marley & the Wailers',
                albumImg: 'assets/audio/bestof.jpg',
                trackNumber: '01'
            },
            {
                title: 'Chase The Devil',
                artist: 'Max Romeo',
                src: 'assets/audio/Chase+The+Devil.mp3',
                album: 'War Ina Babylon',
                albumImg: 'assets/audio/warina.jpg',
                trackNumber: '02'
            },
            {
                title: 'Could You Be Loved',
                artist: 'Bob Marley',
                src: 'assets/audio/Could+You+Be+Loved.mp3',
                album: 'Uprising',
                albumImg: 'assets/audio/uprising.png',
                trackNumber: '03'
            },
            {
                title: 'Buffalo Soldier',
                artist: 'Bob Marley & The Wailers',
                src: 'assets/audio/Buffalo+Soldier.mp3',
                album: 'Confrontation',
                albumImg: 'assets/audio/confrontation.jpg',
                trackNumber: '04'
            },
            {
                title: 'Take Me Home, Country Roads',
                artist: 'Toots and the Maytals',
                src: 'assets/audio/Country+Roads.mp3',
                album: 'Best of the Maytals',
                albumImg: 'assets/audio/toots.jpg',
                trackNumber: '05'
            },
            {
                title: 'Get Up Stand Up',
                artist: 'Bob Marley & The Wailers',
                src: 'assets/audio/Get+Up+Stand+Up.mp3',
                album: 'Gold',
                albumImg: 'assets/audio/gold.jpg',
                trackNumber: '06'
            },
            {
                title: 'Jammin',
                artist: 'Bob Marley & The Wailers',
                src: 'assets/audio/Jammin.mp3',
                album: 'Exodus',
                albumImg: 'assets/audio/exodus.jpg',
                trackNumber: '07'
            },
            {
                title: 'Red Red Wine',
                artist: 'UB40',
                src: 'assets/audio/Red+Red+Wine.mp3',
                album: 'The Very Best Of UB40',
                albumImg: 'assets/audio/ub40.jpg',
                trackNumber: '08'
            }
        ];

        vm.selectSong = selectSong;
        vm.playNext = playNext;

        vm.$onInit = function() {
            vm.selectedSong = vm.musicList[vm.songIndex];
            vm.numSongs = vm.musicList.length;
        };

        function selectSong(song, index) {
            vm.selectedSong = song;
            vm.songIndex = index < vm.numSongs ? index : 0;
        }

        function playNext() {
            if (vm.songIndex < vm.numSongs) {
                vm.songIndex += 1;
            } else {
                vm.songIndex = 0;
            }
            vm.selectedSong = vm.musicList[vm.songIndex];
            $scope.$apply();
        }
    }
});

})();
