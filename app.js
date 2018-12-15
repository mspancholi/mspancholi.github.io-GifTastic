$(document).ready(function () {

    var topics = ["cheetah", "lion", "tiger", "jaguar", "leopard", "panther"];

    var APIKey = "tk2uTugzCLiVTZHZAEqjZ14QpYvfx4f5";
    var queryURL;// = "https://api.giphy.com/v1/gifs/random?api_key=tk2uTugzCLiVTZHZAEqjZ14QpYvfx4f5=animals";
    //"https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

    function createButtons() {
        // Deleting the animals button prior to adding new animals so don't have repeat buttons.
        $("#buttons-view").empty();

        // Looping through the array of animals.
        for (var i = 0; i < topics.length; i++) {

            // Below dynamicaly generates buttons for each animal in the array
            var a = $("<button>");
            // Adding a class of animals to the button
            a.addClass("animals");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Below is the initial button text
            a.text(topics[i]);
            // Now below adding the button to the HTML
            $("#buttons-view").append(a);
        }

    }

    function imageClicked(){
        console.log("image clicked");
        // The attr jQuery method below - can get or set the value of any attribute on our HTML element.
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

    }

    function alertAnimalName() {

        var animalName = $(this).attr("data-name");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=animal+" + animalName + "&api_key=" + APIKey + "&limit=" + 10;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response;
                console.log(response);
                $("#images").empty();

                for (var i = 0; i < response.pagination.count; i++) {
                    var animalImage = $("<img>");
                    animalImage.addClass("gif");
                    animalImage.attr("src", response.data[i].images.fixed_width_still.url);
                    animalImage.attr("data-state", "still");
                    animalImage.attr("data-animate", response.data[i].images.fixed_width.url);
                    animalImage.attr("data-still", response.data[i].images.fixed_width_still.url);
                    var rating = response.data[i].rating; 
                    var p = $("<p>").text("Rating: " + rating);
                    // another way to do the above
                    //var p = $("<p>");
                    //p.text("Rating:" + rating);
                    $("#images").append(p);
                    $("#images").append(animalImage);

                }
            })
    }
    


    $(document).on("click", ".animals", alertAnimalName);
    $(document).on("click", ".gif", imageClicked);

    $("#add-animal").on("click", function(event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var inputAnimal = $("#animal-input").val().trim();

        // Adding the animal from the textbox to the array
        topics.push(inputAnimal);

        // Calling createButtons which handles the processing of our animals array
        createButtons();

      });


      createButtons();
});