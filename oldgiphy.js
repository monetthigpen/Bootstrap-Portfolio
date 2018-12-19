var topics = ["dogs","pandas","elephants","mice" ];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayGif() {

        var topic = $(this).attr("data-name");
        var queryURL = "https:api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=1n42QHILWND8j2gCdeZzeuDYfgbUCAJQ&limit=10";
        // console.log(queryURL);
        // console.log(topics);
        // console.log(topic);

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#images").empty();

          // Creates a div to hold the movie
          console.log(response);
          for( a = 0; a < 10; a++){
            var imageUrl = response.data[a].images.fixed_height_still.url;
           console.log(imageUrl);
           var animatedUrl = response.data[a].images.fixed_height.url;
           console.log(animatedUrl);
            
          
            var rated = $(response.data[a].rating);
            var gifImage = $("<img>");
            var tag = $("<P>").text("rating:" + rated);
            $("#images").prepend(tag);
            console.log(rated);

          
            gifImage.attr("src", imageUrl);
            gifImage.attr("alt", "gif image");
            $("#images").prepend(gifImage);
            $("#images").on("click", function(){
             gifImage.attr("src", animatedUrl);
             gifImage.attr("alt", "gif image");
            });
         

          }
          });

        }

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var c = $("<button>");
          // Adds a class of movie to our button
          c.addClass("topics");
          // Added a data-attribute
          c.attr("data-name", topics[i]);
          // Provided the initial button text
          c.text( topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(c);
          console.log(topics[i]);
          
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-gif").on("click",".topics", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#gif-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(topic);
        

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".topics", displayGif);
      displayGif();
      renderButtons();

        // Calling the renderButtons function to display the intial buttons
      
   
 
