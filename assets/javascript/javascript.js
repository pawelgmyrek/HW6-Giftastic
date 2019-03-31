$(document).ready(function() {
  var playerArray = [];

  function displayPlayer() {
    var player = $(this).attr("data-name");
    var apiKey = "9rL80faRUzI2YcFXY1qy357HkeMJSFC2"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {

        var rating = "<div> Rating: " + (response.data[i].rating) + "</div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
        '" data-still=" ' + response.data[i].images.fixed_height_still.url +
        '" data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="gif" style= "width:250px; height:250px">';

        var giffy = '<div class="col-6">' + image + "</div>";
        $("#players").prepend(giffy);
      }
    });
  }

  $(".gif").on("click", function() {
    var state = $(this).attr('data-state');
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });;

  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < playerArray.length; i++) {

      var newPlayer = $("<button>");
      newPlayer.addClass("player-btn");
      newPlayer.attr("data-name", playerArray[i]);
      newPlayer.text(playerArray[i]);
      $("#buttons-view").append(newPlayer);
    }
  }

  $("#add-player").on("click", function(event) {
    event.preventDefault();
    var userInput = $("#player-input").val().trim();
    playerArray.push(userInput);
    renderButtons();
  });

  renderButtons();

  $(document).on("click", ".player-btn", displayPlayer);
});
