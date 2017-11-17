document.ready(function () {


var = name, picture, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, newfriend;

$("#submit").on("click", function(event) {
	event.preventDefault();
	// set global variable values for multiple uses in this and other functions
	name = $("#name").val();
	picture = $("#picture").val();
	q1 = parseInt($("#q1").val());
	q2 = parseInt($("#q2").val());
	q3 = parseInt($("#q3").val());
	q4 = parseInt($("#q4").val());
	q5 = parseInt($("#q5").val());
	q6 = parseInt($("#q6").val());
	q7 = parseInt($("#q7").val());
	q8 = parseInt($("#q8").val());
	q9 = parseInt($("#q9").val());
	q10 = parseInt($("#q10").val());

	newfriend = {
		name: name,
		picture: picture,
		responses: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10],
		total: q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10
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
	return (nameVal !== '' && imageVal !== '' && !isNaN(q1Val) && !isNaN(q2Val) && !isNaN(q3Val) && !isNaN(q4Val) && !isNaN(q5Val) && !isNaN(q6Val) && !isNaN(q7Val) && !isNaN(q8Val) && !isNaN(q9Val) && !isNaN(q10Val));
}
function makeMatch(data) {
	var difference = 50;
	var minName;
	var minImage;
	data.forEach(function(person) {
		var localDiff = Math.abs(newPerson.total - person.total);
		if (localDiff < difference) {
			difference = localDiff;
			minName = person.name;
			minImage = person.image;
		}
	});
	return {
		name: minName,
		image: minImage
	};
}
});

// $(document).ready(function() {
//
// 	//on submit click
// 	$("#submit").on("click", function (event) {
// 		event.preventDefault();
// 		//If choices and user info is valid and validate returns true, run
// 		if (checkValid() === true) {
// 			main();
// 		} else {
// 			alert("Please fill out the entire form before submitting")
// 		}
// 	});
//
// 	//function to check if all choices are valid
// 	function checkValid() {
// 		var validate = true;
// 		//check name and photo validate
// 		$(".validate").each(function () {
// 			if($(this).val() === "") {
// 				validate = false;
// 			}
// 		});
// 		//check choices are valid
// 		$(".choices").each(function () {
// 			if($(this).val() === "") {
// 				validate = false;
// 			}
// 		});
// 		return validate;
// 	};
//
// 	//Main function to hold and execute
// 	function main() {
// 		//Fill user info from field
// 		var newUser = {
// 			"name": $("#name").val().trim(),
// 			"photo": $("#photoImg").val().trim(),
// 			"scores": [
// 				$("#q1").val().trim(),
// 				$("#q2").val().trim(),
// 				$("#q3").val().trim(),
// 				$("#q4").val().trim(),
// 				$("#q5").val().trim(),
// 				$("#q6").val().trim(),
// 				$("#q7").val().trim(),
// 				$("#q8").val().trim(),
// 				$("#q9").val().trim(),
// 				$("#q10").val().trim()
// 			]
// 		};
// 		post(newUser);
// 	}
// 	//end main
//
// 	function post(variable) {
// 		$.post("/api/friends", variable, function (data) {
// 		});
// 		clear();
// 	}
//
// 	function clear() {
// 		$("#name").val("");
// 		$("#photoImg").val("");
// 		$("#q1").val("");
// 		$("#q2").val("");
// 		$("#q3").val("");
// 		$("#q4").val("");
// 		$("#q5").val("");
// 		$("#q6").val("");
// 		$("#q7").val("");
// 		$("#q8").val("");
// 		$("#q9").val("");
// 		$("#q10").val("");
// 	}
// });