// $(document).ready(function(){
// $(‘.carousel.carousel-slider’).carousel({fullWidth: true});


// });

var topics=["tigers","sugar gliders", "otters", "chinchillas", "dragons"];


function createButtons(){
	$('.buttons').empty();
	for (var i= 0; i < topics.length; i++){
	$('.buttons').append("<button data-name='" + topics[i] + "'>" + topics[i] + "</button>");
	}
};

// function createNewButton(){
// 	var newButtonText= $('#button-to-add').val();
// 	topics.push("new bu");
// 	createNewButton();
// }

createButtons();


$(".buttons").on("click", "button", function() {
	var buttonText = $(this).attr("data-name");
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function(response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			// HEY GUYS! See below for the stuff of interest!
			// The code below does the same thing that the messy code 
			// block we had before does... but it's a lot cleaner
			// and easier to make sense of. Message me if you have
			// any questions on the what/why/how of it!

			// first, each time we loop through, we're creating a new img tag
			var newImg = $("<img class='giphy' />");
			// then, with each chained '.attr', we add the different data
			// attributes as well as the img src attribute
			newImg.attr("data-state", "still")
				.attr("data-still", response.data[i].images.fixed_height_small_still.url)
				.attr("data-anim", response.data[i].images.fixed_height_small.url)
				.attr("src", response.data[i].images.fixed_height_small_still.url)
			// then, the last thing we do is we append the newImg to the coolGifs container
			$(".coolGifs").append(newImg);
		}
	});

});

$(".coolGifs").on("click", ".giphy", function() {
	// clear the coolGifs container first!!!
	var gifState = $(this).attr("data-state");
	var animUrl = $(this).attr("data-anim");
	var stillUrl = $(this).attr("data-still");

	if (gifState == "still") {
		$(this).attr("src", animUrl); // this sets the src attribute to the animated url
		// set 'data-state' to be equal to 'anim'
	} else {
		// set src to be equal to value to data-still
		// set 'data-state' to be equal to still
	}

});

// Add a click event for the submit button in the 'add animal' section
// This click event should call the 'createNewButton' function

// this is calling it initially --- you'll be calling it again 
// each time a new button is created
createButtons();