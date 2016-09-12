$(document).ready(function(){
  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1'

  function loadUsers() {
    $('#users').empty();
    $.ajax({
      url: BASEURL + '/users',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data) {
      data.forEach(function(user) {
        $('#users').prepend('<li data-user-id="' + user.id + '">' + user.first_name + ' ' + user.last_name + ' ' + user.phone_number +  
                            '<button class="delete_user">Delete</button> \
                             <button class="edit_user">Edit</button>     \
                                                                  </li>')
      })
    }).fail(function(data) {
      console.log(data);
    });
  }

  $('#load_users').click(function() {
    loadUsers();
  })

  $('#create_users').click(function(){
    var $newUserContent = $('#new_user_content')
    $newUserContent.slideToggle(100, function(){
      var $createButton = $('create_users');
      if($newUserContent.is(':hidden')) {
        $createButton.text('Create User');
      } else {
        $createButton.text('Hide Create User');
      }
    });  
  });

  $('#new_user').submit(function(e){
    e.prevent();
    var $userFirstName = $('#user_first_name');
    var $userLastName = $('#user_last_name');
    var $userPhoneNumber = $('#user_phone_number');
      $.ajax({
        url: BASEURL + $(this).attr('action'),
        type:$(this).attr('method'),
        dataType: 'JSON'
        data: {user: {first_name: $userFirstName.val(),
                      last_name: $userLastName.val(),
                      phone_number: $userPhoneNumber.val()}}
      }).done(function(data){
        alert('New User Created');
        $userFirstName.val('');
        $userLastName.val('');
        $userPhoneNumber.val('');
        loadUsers();
      }).done(function(data){

      }).fail(function(data){

      });
  });

  $(document).on('click', '.delete_user', function(){
    var userId = $(this).parent().data('user-id');

    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'DELETE',
      dataType: 'JSON'
    }).done(function(data){
      loadUsers();
    }).fail(function(data){
      console.log(data);
    });
  });

  $(document).on('click', '.edit_user', function(){
    var userId = $(this).parent().data('user-id');

    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'PUT',
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done(function(data){
      var firstName = data.first_name;
      var lastName = data.last_name;
      var phoneNumber = data.phone_number;
      
    }).fail(function(data){
      console.log(data);
    });
  });

});
















