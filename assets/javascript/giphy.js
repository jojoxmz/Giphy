// $(document).ready(function(){
// $(‘.carousel.carousel-slider’).carousel({fullWidth: true});


// });

var topics=["tigers","sugar gliders", "otters", "chinchillas", "dragons"];
var topic2="camels";

var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + topic2 + "&api_key=dc6zaTOxFJmzC";
console.log(queryURL);

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


$('.buttons').on('click', 'button', function(){
	var buttonText = $(this).attr('data-name');
	console.log(buttonText);

});


$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
	});




