/*
 * playlist.component.js
 * Author: Erin Bush
 * Created: March 16, 2017
 *
 * This file contains the playlist component which controls song selection from a list of songs
 * defined in data/playlist.json
 */

(function () {

angular.module('musicPlayerApp')
       .component('playlist',
{
    templateUrl: 'app/playlist.component.html',
    controllerAs: 'playlist',
    controller: function ($scope, $http) {
        var vm = this,
            musicUrl = 'data/playlist.json';

        vm.songIndex = 0;
        vm.musicList = [];

        vm.selectSong = selectSong;
        vm.playNext = playNext;

        vm.$onInit = function() {
            $http.get(musicUrl)
                .then(function (data) {
                    vm.musicList = data.data;
                    vm.selectedSong = vm.musicList[vm.songIndex];
                    vm.numSongs = vm.musicList.length;
                });
        };

        function selectSong(song, index) {
            vm.selectedSong = song;
            vm.songIndex = index < vm.numSongs ? index : 0;
        }

        function playNext() {
            debugger;
            if (vm.songIndex < vm.numSongs - 1) {
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
