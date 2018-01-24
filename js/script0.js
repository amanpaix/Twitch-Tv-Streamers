function look() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var url = "https://wind-bow.gomix.me/twitch-api";
  for(var i = 0; i < users.length; i++) {
    $.ajax({
      url: url + "/channels/" + users[i] ,
      dataType: "jsonp" ,
      success: function(data) {
        display(data);
      }
    });
  }
}

function search(name) {
  $(".display").hide();
  var url = "https://wind-bow.gomix.me/twitch-api";
  $.ajax({
    url: url + "/channels/" + name ,
    dataType: "jsonp" ,
    success: function(data) {
      console.log(data);
      if(data.error == "Not Found") {
        $(".error").html("<h1 style='text-align:center; color:white;'>Not Found!</h1>");
        console.log("htllo");
      } else {
        display(data , "searchR");
      }
    }
  });
}

function check(e) {
  if(e.keyCode == 13) {
      $(".btnS").html("Search Result");
    search($(".name").val());
  }
}

function display(data , arg) {
  console.log("run");
  var logo = "<div class='col-md-4 col-sm-12 col-12' style='text-align:center;'><img class='rounded-circle img-fluid logo' src='" + data.logo + "'></div>";

  var link = "https://www.twitch.tv/" + data.name;

  var lastUpdate = data.updated_at.match(/\d{4}-\d{2}-\d{2}/gi);

  var follower_link = "<a href='" + link + "/followers" + "' target='_blank'>" + data.followers + " People</a>";

  var game = data.game;
  if (game == null) {
    game = "(empty)";
  }
  var display_name = "<a href='" + link + "' target='_blank'>" + data.display_name + "</a>";
  var middleInfo =  "<div class='col-md-4 col-sm-12 col-12 md'><h2>" + display_name + "</h2><h4>Game: " + game + "</h4><span>Followed by " + follower_link + "</span> <br><span>Last Updated at " + lastUpdate[0] + "</span></div>";



  $.ajax({
    url : "https://wind-bow.gomix.me/twitch-api/streams/" + data.name ,
    dataType: "jsonp" ,
    success: function(json) {
      var show , status , html , searchRes;
      if(json.stream != null) {
        show = "<span class='badge badge-pill badge-success'>" + json.stream.stream_type + "</span>";
        status = "<div class='col-md-4 col-sm-12 col-12 status' style='text-align:center;'><h2>Status</h2><h4>" + show + "</h4></div>";
        if(arg == "searchR") {
          searchRes = "<div class='alert alert-secondary' role='alert' style='background-color:#1E2127;'><div class='row'>" + logo + middleInfo + status + "</div></div>";
          $(".btnS").html("Search Result");
        } else {
          html = "<div class='alert alert-secondary hide on' role='alert' style='background-color:#1E2127;'><div class='row'>" + logo + middleInfo + status + "</div></div>";
          $(".btnS").html("All");
        }

      } else {
        show = "<span class='badge badge-pill badge-danger'>Offline</span>";
        status = "<div class='col-md-4 col-sm-12 col-12 status' style='text-align:center;'><h2>Status</h2><h4>" + show + "</h4></div>";
        if(arg == "searchR") {
          searchRes = "<div class='alert alert-secondary' role='alert' style='background-color:#1E2127;'><div class='row'>" + logo + middleInfo + status + "</div></div>";
          $(".btnS").html("Search Result");
        } else {
          html = "<div class='alert alert-secondary hide off' role='alert' style='background-color:#1E2127;'><div class='row'>" + logo + middleInfo + status + "</div></div>";
          $(".btnS").html("All");
        }

      }


      $(".display").append(html);
      $(".error").html(" ");
      $(".error").append(searchRes);
      $(".error").show();
      $(".on").removeClass("hide");
      $(".off").removeClass("hide");
      $(".btnS").html("All");
    }
  });
}


$(document).ready(function(){

    $(".display").html(" ");
    look("all");


    $(".all").on("click" , function() {
      $(".display").show();
      $(".on").removeClass("hide");
      $(".off").removeClass("hide");
      $(".error").html(" ");
      $(".btnS").html("All");
    });

    $(".online").on("click" , function(){
      $(".display").show();
      $(".off").addClass("hide");
      $(".on").removeClass("hide");
      $(".error").html(" ");
      $(".btnS").html("Online");
    });

    $(".offline").on("click" , function() {
      $(".display").show();
      $(".on").addClass("hide");
      $(".off").removeClass("hide");
      $(".error").html(" ");
      $(".btnS").html("Offline");
    });

    $(".search").on("click" , function() {
      $(".error").html(" ");
      $(".error").show();
      $(".btnS").html("Search Result");
      search($(".name").val());
    });
});
