function writeFile(writeData) {
	$.ajax({
		type: "POST",
		data: writeData,
		url: "./server/writeFile.php",
		success: function(data) {
			console.log("Command Run: "+data);
		}

	});
}

function volumeChange() {
	var volumestr = $('#volume').val();
	if (isNaN(volumestr)) {
		return;
	}
	var volNumber = parseInt(volumestr);
	writeFile({volume: volNumber});
}


function toggleState() {
	var pauseplay = $('#pauseplay');
	var state = pauseplay.attr('value');
	var bool;
	if (state=="pause") {
		pauseplay.attr('value','play');
		pauseplay.find("#pause-img").hide();
		pauseplay.find("#play-img").show();
		
		bool = false;
	} else if (state=="play") {
		pauseplay.attr('value','pause');
		pauseplay.find("#play-img").hide();
		pauseplay.find("#pause-img").show();
		
		bool = true;
	} else {
		alert('invalid state');
	}
	writeFile({play: bool});
}