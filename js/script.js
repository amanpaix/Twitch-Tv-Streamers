function look(menu) {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var url = "https://wind-bow.gomix.me/twitch-api";
  for(var i = 0; i < users.length; i++) {
    $.ajax({
      url: url + "/channels/" + users[i] ,
      dataType: "jsonp" ,
      success: function(data) {
        display(data , menu);
      }
    });
  }
}

function search(name) {
  $(".display").html(" ");
  var url = "https://wind-bow.gomix.me/twitch-api";
  $.ajax({
    url: url + "/channels/" + name ,
    dataType: "jsonp" ,
    success: function(data) {
      console.log(data);
      if(data.status != 422) {
        display(data , "all");
      } else {
        $(".display").html("<h1 style='text-align:center; color:white;'>Not Found!</h1>");
        console.log("htllo");
      }
    }
  });
}

function check(e) {
  if(e.keyCode == 13) {
    search($(".name").val());
  }
}

function display(data , menu) {
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
      var show , status , html;
      if(json.stream != null) {
        show = "<span class='badge badge-pill badge-success'>" + json.stream.stream_type + "</span>";
        status = "<div class='col-md-4 col-sm-12 col-12 status' style='text-align:center;'><h2>Status</h2><h4>" + show + "</h4></div>";
        if(menu == "online") {
          html = "<div class='alert alert-secondary' role='alert' style='background-color:#1E2127;'><div class='row'>" + logo + middleInfo + status + "</div></div>";
        }
      } else {
        show = "<span class='badge badge-pill badge-danger'>Offline</span>";
        status = "<div class='col-md-4 col-sm-12 col-12 status' style='text-align:center;'><h2>Status</h2><h4>" + show + "</h4></div>";
        if(menu == "offline") {
          html = "<div class='alert alert-secondary' role='alert' style='background-color:#1E2127;'><div class='row'>" + logo + middleInfo + status + "</div></div>";
        }
      }
      if(menu == "all") {
        html = "<div class='alert alert-secondary' role='alert' style='background-color:#1E2127;'><div class='row'>" + logo + middleInfo + status + "</div></div>";
      }
      $(".display").append(html);
    }
  });
}


$(document).ready(function(){

    $(".display").html(" ");
    look("all");

    $(".all").on("click" , function() {
      $(".display").html(" ");
      look("all");
    });

    $(".online").on("click" , function(){
      $(".display").html(" ");
      look("online");
    });

    $(".offline").on("click" , function() {
      $(".display").html(" ");
      look("offline");
    });

    $(".search").on("click" , function() {
      search($(".name").val());
    });
});
