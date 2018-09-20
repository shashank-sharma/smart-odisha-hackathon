document.onreadystatechange = function () {
  var state = document.readyState;
  if (state === 'interactive') {
    console.log('Loading');
  } else if (state === 'complete') {
      setTimeout(function(){
         document.getElementById('load').style.visibility="hidden";
      },1000);
  }
};


$(document).ready(function() {

    $('#change_photo').submit(function() {
            console.log('FILE =', $(this).serializeArray()[0]['value']);
            var data = new FormData();
            var img = $('#change_photo_button')[0].files[0];
            data.append('img', img);
            data.append('csrfmiddlewaretoken', $(this).serializeArray()[0]['value']);
            $('#progress').css('display','block');
            $.ajax({
                data: data,
                type: "POST",
                processData : false,
                contentType : false,
                url: "ajax/update_photo/",
                success: function(response) {
                    // Action
                    console.log('response = ', response);
                    $('#progress').css('display', 'none');
                    $("#profile_picture").attr("src", response);
                    Materialize.toast('Successfully Changed!', 4000);
                }
            });
            return false;
        });
    });