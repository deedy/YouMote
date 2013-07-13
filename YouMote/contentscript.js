// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var player = document.getElementById('movie_player');
var play;

function queryServer(){
	$.ajax({
		type: "GET", 
		url: "http://www.achalv.com/dev/YouMote/server/settings", 
		dataType: "json",
		success: function(msg){
			var state = player.getPlayerState();
			
			//DEPRECATED
			//if(msg.play === "true") player.playVideo();
			//else player.pauseVideo();
			
			if((msg.play === "true") && ((state == 0) || (state == 2))) player.playVideo();
			else if ((msg.play === "false") &&(state == 1)) player.pauseVideo();
			
			player.setVolume(parseInt(msg.volume));
			
			/*
			if(obj.scrubChange)
				obj.scrub
			*/
			
			setTimeout(function(){queryServer()}, 50);
		}		
	});
}

function writeServerPlay(p){
	$.ajax({
		type: "POST",
		data: {
			play : p
		},
		url: "http://achalv.com/dev/YouMote/server/writeFile.php",
		success: function(data) {
			console.log("Just wrote" + data);
		}
	});
} 


//Manual control functions. 'a' to pause/play, 's' to scrub forward. 
$(document).ready(function(){
	$(window).keypress(function(event){
		if(event.which == 97){
			$.ajax({
				type: "GET", 
				url: "http://achalv.com/dev/YouMote/server/settings", 
				dataType: "json",
				success: function(msg){
					console.log("Just received" + msg);
					if(msg.play === "true") writeServerPlay(false);
					else writeServerPlay(true);		
				}
			});
		}
		else if(event.which == 115){
			var time = player.getCurrentTime();
			setTimeout(function(){player.seekTo(time + 10)}, 200);
		}
	});
	
});


queryServer();