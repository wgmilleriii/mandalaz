$(document).on('click','#btnCreate', function() {

    var username=$("#username").val();
    var password=$("#password").val();

    var url="php/post.php?username=" + username + "&password=" + password;
    console.log("Posting to " + url);
   $.post(url)
      .done(function(data) {
        console.log(data);
        // $("#divEditPerson").html(data);
        // $("#divEditPerson")[0].scrollIntoView();        
        console.log("Created!");
      });

  
});
