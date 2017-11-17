$(document).ready(function () {
    var minName;
    var minImage;
    var difference = 40;

$("#submit").on("click", function(event) {
	event.preventDefault();
	// set global variable values for multiple uses in this and other functions
	var name = $("#name").val();
	var photo = $("#photo").val();
	var q1 = parseInt($("#q1").val());
    var q2 = parseInt($("#q2").val());
    var q3 = parseInt($("#q3").val());
    var q4 = parseInt($("#q4").val());
    var q5 = parseInt($("#q5").val());
    var q6 = parseInt($("#q6").val());
    var q7 = parseInt($("#q7").val());
    var q8 = parseInt($("#q8").val());
    var q9 = parseInt($("#q9").val());
    var q10 = parseInt($("#q10").val());

    var newfriend = {
		name: name,
		photo: photo,
		scores: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10]
	};

	// declare and set local variables
	var modalTitle = $(".modal-title");
	var modalBody = $(".modal-body");
	var modal = $("#modal");
	var apiFriendsRoute = "/api/friends";

	if (formIsValid()) {
		$.get(apiFriendsRoute, function(data) {
			var match = makeMatch(data);
			if (match.name !== undefined) {
				modalTitle.text("You have a match!");
				modalBody.html('<p class="strong">You\'re most compatible with:</p><p>' + match.name + '</p><img src="' + match.image + '" height="45">');
			} else {
				modalTitle.text("Too few friends");
				modalBody.text("Sorry, We couldn\'t find a match for you.");
			}
		}).then(function() {
			modal.show();
			$('.form')[0].reset();
			$.post(apiFriendsRoute, newPerson);
		});
	} else {
		modalTitle.text("Error");
		modalBody.text("Please ALL of the questions to find your match.");
		modal.show();
	}
});

function formIsValid() {
	return (name !== '' && photo !== '' && !isNaN(q1) && !isNaN(q2) && !isNaN(q3) && !isNaN(q4) && !isNaN(q5) && !isNaN(q6) && !isNaN(q7) && !isNaN(q8) && !isNaN(q9) && !isNaN(q10));
}
function makeMatch(data) {
	data.forEach(function(person) {
		var localDiff = Math.abs(newPerson.total - person.total);
		if (localDiff < difference) {
			difference = localDiff;
			minName = person.name;
			minImage = person.photo;
		}
	});
	return {
		name: minName,
		image: minImage
	};
}
});
