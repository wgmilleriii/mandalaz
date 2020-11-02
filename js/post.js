var urlPrefix="http://localhost:8888/mandalaz/php/";
$(document).on('click','#btnCreate', function() {

    var username=$("#username").val();
    var password=$("#password").val();

    url=cs("post.php?action=login&username=" + username + "&password=" + password);
   $.post(url)
      .done(function(data) {
        console.log(data);
        // $("#divEditPerson").html(data);
        // $("#divEditPerson")[0].scrollIntoView();        
        // console.log("Created!");
      });

  
});

function cs(s) {
  console.log("-= Posting: =- ");  
  console.log(urlPrefix + s);
  return urlPrefix + s;
}