if (typeof ytplayer == "undefined") {
	return;
}

var videoid = ytplayer.config.args.video_id;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
	var ytplayer = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: videoid
	});
	player = ytplayer;
};