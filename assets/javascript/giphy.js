var topics=["tigers","sugar gliders", "otters", "chinchillas", "leopards", "giraffs", "pandas"];

function createButtons(){
	$('.buttons').empty();
	for (var i= 0; i < topics.length; i++){
	$('.buttons').append("<button data-name='" + topics[i] + "'>" + topics[i] + "</button>");
	}
};

createButtons();

function createNewButton(){
	var newButtonText= $('#searchInput').val().toLowerCase();
	console.log(newButtonText);
	topics.push(newButtonText);
	createButtons()
	};

$(".buttons").on("click", "button", function(event) {
	event.preventDefault();
	$('.coolGifs').empty();

	var buttonText = $(this).attr("data-name");
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function(response) {
		console.log(response);

		for (var i = 0; i < response.data.length; i++) {

			// first, each time we loop through, we're creating a new img tag
			var newDiv= $("<div />").addClass("divContainer");
			var newImg = $("<img class='giphy' />");
        	var rating= response.data[i].rating;
        	var p= $('<p>').text("Ratings: " + rating);

			// then, with each chained '.attr', we add the different data
			// attributes as well as the img src attribute
			newImg.attr("data-state", "still")
				.attr("data-still", response.data[i].images.fixed_height_small_still.url)
				.attr("data-anim", response.data[i].images.fixed_height_small.url)
				.attr("src", response.data[i].images.fixed_height_small_still.url)
			// then, the last thing we do is we append the newImg to the coolGifs container
			newDiv.append(newImg).append(p);

			$(".coolGifs").append(newDiv);
		}
	});

});

$(".coolGifs").on("click", ".giphy", function(event) {
	event.preventDefault();

	var gifState = $(this).attr("data-state");
	var animUrl = $(this).attr("data-anim");
	var stillUrl = $(this).attr("data-still");

	if (gifState == "still") {
		 // this sets the src attribute to the animated url
		// set 'data-state' to be equal to 'anim'
		$(this).attr("src", animUrl).attr('data-state', 'animate');
	} else {
		// set src to be equal to value to data-still
		// set 'data-state' to be equal to still
		$(this).attr("src", stillUrl).attr('data-state', 'still');
	}
});

// Add a click event for the submit button 
$("#submitButton").on("click", function(e){
	e.preventDefault();
	console.log("hey");
	createNewButton();
});


// this is calling it initially --- you'll be calling it again 
// each time a new button is created
createButtons();