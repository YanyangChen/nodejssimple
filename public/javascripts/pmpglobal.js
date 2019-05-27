// Userlist data array for filling in info box
var topicListData = [];
var thistopic = "";
// DOM Ready =============================================================

$(document).ready(function() {

    // Populate the user table on initial page load
    populateTopics();
    // $(document).ready(function() {
    //     $("table")
    //         .tablesorter({widthFixed: true, widgets: ['zebra']})
    //         .tablesorterPager({container: $("#pager")});
    // });


});



// Functions =============================================================

// Fill table with data
function populatePmSearchedTable() {

    // Empty content string
    var tableContent = '';
    var searchField = {
        // how to define which row?
        //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
        // '_id':  $(this).attr('rel'),
        'Topic': $('#searchPmtopicsFields fieldset input#inputSearchTopic').val(),
        'Group_No': $('#searchPmtopicsFields fieldset input#inputSearchGroupNo').val(),
        'Management_No': $('#searchPmtopicsFields fieldset input#inputSearchManagementNo').val()

        // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
    }
    $.ajax({
        type: 'POST',
        data: searchField,
        url: '/pmtopics/searchtopicslist',
        dataType: 'JSON'
    }).done(function( data ) {
        // console.log(data);
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<tr id = "' + this._id + '">';
            tableContent += '<td  id=\'Topic\'><a href="#" class="linkshowpmtopics" rel="' + this.Topic + '">' + this.Topic + '</a></td>';
            tableContent += '<td contenteditable=\'true\', id=\'Group\'>' + this.Group + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'Group_No\'>' + this.Group_No + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'Management\'>' + this.Management + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'Management_No\'>' + this.Management_No + '</td>';
            tableContent += '<td id=\'delete\'><a href="#" class="linkdeletetopics" rel="' + this._id + '">delete</a></td>';
            tableContent += '<td id=\'update\'><a href="#" class="linkupdatetopics" rel="' + this._id + '">update</a></td>';
            tableContent += '</tr>';
        });

        $('#pmtopicsList table tbody').html(tableContent);

    });

                        // jQuery AJAX call for JSON
                        // $.getJSON( '/users/userlist', function( data ) {
                        //   // Stick our user data array into a userlist variable in the global object
                        //     userListData = data;
                        //     // For each item in our JSON, add a table row and cells to the content string
                        //     $.each(data, function(){
                        //         tableContent += '<tr>';
                        //         tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
                        //         tableContent += '<td>' + this.email + '</td>';
                        //         tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
                        //         tableContent += '</tr>';
                        //     });

                            // Inject the whole content string into our existing HTML table
                        //     $('#userList table tbody').html(tableContent);
                        // });
};

function populateSearchedTableByEmail() {

    // Empty content string
    var tableContent = '';
    var searchField = {
        // how to define which row?
        //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
        // '_id':  $(this).attr('rel'),
        'email': $('#searchFields fieldset input#inputSearchEmail').val(),

        // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
    }
    $.ajax({
        type: 'POST',
        data: searchField,
        url: '/pmtopics/searchemaillist',
        dataType: 'JSON'
    }).done(function( data ) {
        console.log(data);
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        $('#userList table tbody').html(tableContent);

    });


    // });
};


function populateTopics() {

    // Empty content string
    var tableContent = '';



    // jQuery AJAX call for JSON
    $.getJSON( '/pmtopics/pmtopicslist', function( data ) {
        // Stick our user data array into a userlist variable in the global object
        topicListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<tr id = "' + this._id + '">';
            tableContent += '<td  id=\'Topic\'><a href="#" class="linkshowpmtopics" rel="' + this.Topic + '">' + this.Topic + '</a></td>';
            tableContent += '<td contenteditable=\'true\', id=\'Group\'>' + this.Group + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'Group_No\'>' + this.Group_No + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'Management\'>' + this.Management + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'Management_No\'>' + this.Management_No + '</td>';
            tableContent += '<td id=\'delete\'><a href="#" class="linkdeletetopics" rel="' + this._id + '">delete</a></td>';
            tableContent += '<td id=\'update\'><a href="#" class="linkupdatetopics" rel="' + this._id + '">update</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#pmtopicsList table tbody').html(tableContent);
    });
};

function populateInputTable(val) {

    // Empty content string
    var tableContent = '';
    var topass = val;


    // jQuery AJAX call for JSON
    $.getJSON( '/pmtopics/topicsInput', function(data) {
        // Stick our user data array into a userlist variable in the global object
        // userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        console.log("topass " + topass);
        // console.log("this.Topic " + this.Topic);
        $.each(data, function(){

            if(topass==this.Topic){
                console.log("topass : " + topass);
                // console.log(topass==this.username);
                tableContent += '<tr id = "' + this._id + '">';
                tableContent += '<td id=\'Topic\'><a href="#" class="linkshowinputs" rel="' + this.Topic + '">' + this.Topic + '</a></td>';
                tableContent += '<td contenteditable=\'true\', id=\'Input\'>' + this.Input + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'G\'>' + this.G + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'P\'>' + this.P + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'C\'>' + this.C + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'Reference\'>' + this.Reference + '</td>';
                tableContent += '<td id=\'delete\'><a href="#" class="linkdeleteinputs" rel="' + this._id + '">delete</a></td>';
                tableContent += '<td id=\'update\'><a href="#" class="linkupdateinputs" rel="' + this._id + '">update</a></td>';
                tableContent += '</tr>';}
        });

        // Inject the whole content string into our existing HTML table
        $('#inputList table tbody').html(tableContent);
    });
};

function getTopicInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisTopic = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = topicListData.map(function(arrayItem) { return arrayItem.Topic; }).indexOf(thisTopic);
    // Get our User Object
    var thisTopicObject = topicListData[arrayPosition];

    //Populate Info Box
    // $('#userInfoName').text(thisUserObject.fullname);
    // $('#userInfoAge').text(thisUserObject.age);
    // $('#userInfoGender').text(thisUserObject.gender);
    // $('#userInfoLocation').text(thisUserObject.location);
    // $('#userInfoUsername').text(thisUserObject.username);
    // $('#userInfoEmail').text(thisUserObject.email);
    populateInputTable(thisTopicObject.Topic.toString());
    populateToolTable(thisTopicObject.Topic.toString());
    populateOutputTable(thisTopicObject.Topic.toString());
    thistopic = thisTopicObject.Topic.toString();
    console.log(thistopic);
};

function populateToolTable(val) {

    // Empty content string
    var tableContent = '';
     var topass = val;


    // jQuery AJAX call for JSON
    $.getJSON( '/pmtopics/topicsTool', function(data) {
        // Stick our user data array into a userlist variable in the global object
        // userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        console.log("topass " + topass);
        // console.log("this.Topic " + this.Topic);
        $.each(data, function(){

            if(topass==this.Topic){
                 console.log("topass : " + topass);
                // console.log(topass==this.username);
            tableContent += '<tr id = "' + this._id + '">';
            tableContent += '<td id=\'Topic\'><a href="#" class="linkshowtools" rel="' + this.Topic + '">' + this.Topic + '</a></td>';
            tableContent += '<td contenteditable=\'true\', id=\'Tool\'>' + this.Tool + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'G\'>' + this.G + '</td>';
            tableContent += '<td contenteditable=\'true\', id=\'P\'>' + this.P + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'C\'>' + this.C + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'Reference\'>' + this.Reference + '</td>';
            tableContent += '<td id=\'delete\'><a href="#" class="linkdeletetools" rel="' + this._id + '">delete</a></td>';
            tableContent += '<td id=\'update\'><a href="#" class="linkupdatetools" rel="' + this._id + '">update</a></td>';
            tableContent += '</tr>';}
        });

        // Inject the whole content string into our existing HTML table
        $('#toolList table tbody').html(tableContent);
    });
};
function populateOutputTable(val) {

    // Empty content string
    var tableContent = '';
    var topass = val;


    // jQuery AJAX call for JSON
    $.getJSON( '/pmtopics/topicsOutput', function(data) {
        // Stick our user data array into a userlist variable in the global object
        // userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        console.log("topass " + topass);
        // console.log("this.Topic " + this.Topic);
        $.each(data, function(){

            if(topass==this.Topic){
                console.log("topass : " + topass);
                // console.log(topass==this.username);
                tableContent += '<tr id = "' + this._id + '">';
                tableContent += '<td id=\'Topic\'><a href="#" class="linkshowoutputs" rel="' + this.Topic + '">' + this.Topic + '</a></td>';
                tableContent += '<td contenteditable=\'true\', id=\'Output\'>' + this.Output + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'G\'>' + this.G + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'P\'>' + this.P + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'C\'>' + this.C + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'Reference\'>' + this.Reference + '</td>';
                tableContent += '<td id=\'delete\'><a href="#" class="linkdeleteoutputs" rel="' + this._id + '">delete</a></td>';
                tableContent += '<td id=\'update\'><a href="#" class="linkupdateoutputs" rel="' + this._id + '">update</a></td>';
                tableContent += '</tr>';}
        });

        // Inject the whole content string into our existing HTML table
        $('#outputList table tbody').html(tableContent);
    });
};
// Show User Info
// function showUserInfo(event) {
//
//   // Prevent Link from Firing
//   event.preventDefault();
//
//   // Retrieve username from link rel attribute
//   var thisUserName = $(this).attr('rel');
//
//   // Get Index of object based on id value
//   var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
//  // Get our User Object
//  var thisUserObject = userListData[arrayPosition];
//
//  //Populate Info Box
//  $('#userInfoName').text(thisUserObject.fullname);
//  $('#userInfoAge').text(thisUserObject.age);
//  $('#userInfoGender').text(thisUserObject.gender);
//  $('#userInfoLocation').text(thisUserObject.location);
//  $('#userInfoUsername').text(thisUserObject.username);
//  $('#userInfoEmail').text(thisUserObject.email);
//     populateDetailsTable(thisUserObject.username.toString());
//     userdetailskey = thisUserObject.username.toString();
// };

// Username link click
$('#pmtopicsList table tbody').on('click', 'td a.linkshowpmtopics', getTopicInfo);
// $('#userInfo p span').on('change', 'td a.linkshowuser', populateDetailsTable);
$('#btnSearchTopic').on('click', populatePmSearchedTable);
// $('#btnSearchEmail').on('click', populateSearchedTableByEmail);
$('#btnAddTopic').on('click', addTopic);
$('#btnAddInput').on('click', addInputs);
$('#btnAddTool').on('click', addTools);
$('#btnAddOutput').on('click', addOutputs);
// $('#btnAddDetails').on('click', addInputs);
// $('#btnUpdateUser').on('click', updateUser);
$('#pmtopicsList table tbody').on('click', 'td a.linkdeletetopics', deleteTopics);
$('#pmtopicsList table tbody').on('click', 'td a.linkupdatetopics', updateTopics);

$('#inputList table tbody').on('click', 'td a.linkdeleteinputs', deleteInputs);
$('#inputList table tbody').on('click', 'td a.linkupdateinputs', updateInputs);

$('#toolList table tbody').on('click', 'td a.linkdeletetools', deleteTools);
$('#toolList table tbody').on('click', 'td a.linkupdatetools', updateTools);

$('#outputList table tbody').on('click', 'td a.linkdeleteoutputs', deleteOutputs);
$('#outputList table tbody').on('click', 'td a.linkupdateoutputs', updateOutputs);
// $('#detailList table tbody').on('click', 'td a.linkdeletedetails', deleteUserDetails);
// $('#detailList table tbody').on('click', 'td a.linkupdatedetails', updateUserDetails);
// Add User
function addTopic(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

      // If it is, compile all user info into one object
      var newUser = {
          'Topic': $('#addTopic fieldset input#inputTopic').val(),
          'Group': $('#addTopic fieldset input#inputGroup').val(),
          'Group_No': $('#addTopic fieldset input#inputGroup_No').val(),
          'Management': $('#addTopic fieldset input#inputManagement').val(),
          'Management_No': $('#addTopic fieldset input#inputManagement_No').val()
      }

      // Use AJAX to post the object to our adduser service
      $.ajax({
          type: 'POST',
          data: newUser,
          url: '/pmtopics/addtopics',
          dataType: 'JSON'
      }).done(function( response ) {

          // Check for successful (blank) response
          if (response.msg === '') {

              // Clear the form inputs
              $('#addTopic fieldset input').val('');

              // Update the table
              populateTopics();

          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert('Error: ' + response.msg);

          }
      });
  }
  else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
  }
};

function addInputs(event) {

    //generate new table rows

    var tableContent = '';
    tableContent += '<tr>';
    tableContent += '<td id=\'Topic\'><a href="#" class="linkshowinputss" rel="' + thistopic + '">' + thistopic + '</a></td>';
    tableContent += '<td contenteditable=\'true\', id=\'Input\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'G\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'P\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'C\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'Reference\'>' + '' + '</td>';
    tableContent += '<td id=\'delete\'><a href="#" class="linkdeleteinputs" rel="' + '' + '">delete</a></td>';
    tableContent += '<td id=\'update\'><a href="#" class="linkupdateinputs" rel="' + 'toadd' + '">update</a></td>';
    tableContent += '</tr>';
    $('#inputList table tbody').html($('#inputList table tbody').html() + tableContent);

};
function addTools(event) {

    //generate new table rows
    var tableContent = '';
    tableContent += '<tr>';
    tableContent += '<td id=\'Topic\'><a href="#" class="linkshowtools" rel="' + thistopic + '">' + thistopic + '</a></td>';
    tableContent += '<td contenteditable=\'true\', id=\'Tool\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'G\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'P\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'C\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'Reference\'>' + '' + '</td>';
    tableContent += '<td id=\'delete\'><a href="#" class="linkdeletetools" rel="' + '' + '">delete</a></td>';
    tableContent += '<td id=\'update\'><a href="#" class="linkupdatetools" rel="' + 'toadd' + '">update</a></td>';
    tableContent += '</tr>';
    $('#toolList table tbody').html($('#toolList table tbody').html() + tableContent);

};
function addOutputs(event) {

    //generate new table rows
    var tableContent = '';
    tableContent += '<tr>';
    tableContent += '<td id=\'Topic\'><a href="#" class="linkshowoutputs" rel="' + thistopic + '">' + thistopic + '</a></td>';
    tableContent += '<td contenteditable=\'true\', id=\'Output\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'G\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'P\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'C\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'Reference\'>' + '' + '</td>';
    tableContent += '<td id=\'delete\'><a href="#" class="linkdeleteoutputs" rel="' + '' + '">delete</a></td>';
    tableContent += '<td id=\'update\'><a href="#" class="linkupdateoutputs" rel="' + 'toadd' + '">update</a></td>';
    tableContent += '</tr>';
    $('#outputList table tbody').html($('#outputList table tbody').html() + tableContent);

};

// Update User

function updateTopics(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to update this Topic?' + "+ $(this).attr('rel') : " +  $(this).attr('rel'));

    // Check and make sure the user confirmed
    if (confirmation === true) {


        if ($(this).attr('rel') != 'toadd') {

            // console.log($('#detailList table td#update').children[3]);
            var id = $(this).attr('rel').toString();
            console.log($('#' + id));
            console.log($('#' + id)[0].children[3]);
            console.log($('#' + id)[0].children[3].textContent);
                var newUserDetails2update = {
                    // how to define which row?
                    //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                    // '_id':  $(this).attr('rel'),
                    'Topic': $('#' + id)[0].children[0].textContent,
                    'Group': $('#' + id)[0].children[1].textContent,
                    'Group_No': $('#' + id)[0].children[2].textContent,
                    'Management': $('#' + id)[0].children[3].textContent,
                    'Management_No': $('#' + id)[0].children[4].textContent
                    // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
                }

        }
        else
        {
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'Topic': $('#pmtopicsList table tr:last')[0].children[0].textContent,
                'Group': $('#pmtopicsList table tr:last')[0].children[1].textContent,
                'Group_No': $('#pmtopicsList table tr:last')[0].children[2].textContent,
                'Management': $('#pmtopicsList table tr:last')[0].children[3].textContent,
                'Management_No': $('#pmtopicsList table tr:last')[0].children[4].textContent,
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }
        }
        //if update == add

        // If they did, do our delete
        $.ajax({
            type: 'PUT',
            data: newUserDetails2update,
            url: '/pmtopics/updatetopics/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log("populateTopics");
                // populateDetailsTable(userdetailskey);
                populateTopics();
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            // populateTopics();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
function updateInputs(event) {

    event.preventDefault();
    console.log("inside updateInputs")
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to update this Input?' + "+ $(this).attr('rel') : " +  $(this).attr('rel'));

    // Check and make sure the user confirmed
    if (confirmation === true) {


        if ($(this).attr('rel') != 'toadd') {

            // console.log($('#detailList table td#update').children[3]);
            var id = $(this).attr('rel').toString();
            console.log($('#' + id));
            console.log($('#' + id)[0].children[3]);
            console.log($('#' + id)[0].children[3].textContent);
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'Topic': $('#' + id)[0].children[0].textContent,
                'Input': $('#' + id)[0].children[1].textContent,
                'G': $('#' + id)[0].children[2].textContent,
                'P': $('#' + id)[0].children[3].textContent,
                'C': $('#' + id)[0].children[4].textContent,
                'Reference': $('#' + id)[0].children[5].textContent
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }

        }
        else
        {
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'Topic': $('#inputList table tr:last')[0].children[0].textContent,
                'Input': $('#inputList table tr:last')[0].children[1].textContent,
                'G': $('#inputList table tr:last')[0].children[2].textContent,
                'P': $('#inputList table tr:last')[0].children[3].textContent,
                'C': $('#inputList table tr:last')[0].children[4].textContent,
                'Reference': $('#inputList table tr:last')[0].children[5].textContent
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }
        }
        //if update == add

        // If they did, do our delete
        $.ajax({
            type: 'PUT',
            data: newUserDetails2update,
            url: '/pmtopics/updateinputs/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log("populateInputTable");
                // populateDetailsTable(userdetailskey);
                populateInputTable(thistopic);
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            // populateTopics();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
function updateTools(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to update this Tool?' + "+ $(this).attr('rel') : " +  $(this).attr('rel'));

    // Check and make sure the user confirmed
    if (confirmation === true) {


        if ($(this).attr('rel') != 'toadd') {

            // console.log($('#detailList table td#update').children[3]);
            var id = $(this).attr('rel').toString();
            console.log($('#' + id));
            console.log($('#' + id)[0].children[3]);
            console.log($('#' + id)[0].children[3].textContent);
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'Topic': $('#' + id)[0].children[0].textContent,
                'Tool': $('#' + id)[0].children[1].textContent,
                'G': $('#' + id)[0].children[2].textContent,
                'P': $('#' + id)[0].children[3].textContent,
                'C': $('#' + id)[0].children[4].textContent,
                'Reference': $('#' + id)[0].children[5].textContent
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }

        }
        else
        {
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'Topic': $('#toolList table tr:last')[0].children[0].textContent,
                'Tool': $('#toolList table tr:last')[0].children[1].textContent,
                'G': $('#toolList table tr:last')[0].children[2].textContent,
                'P': $('#toolList table tr:last')[0].children[3].textContent,
                'C': $('#toolList table tr:last')[0].children[4].textContent,
                'Reference': $('#toolList table tr:last')[0].children[5].textContent
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }
        }
        //if update == add

        // If they did, do our delete
        $.ajax({
            type: 'PUT',
            data: newUserDetails2update,
            url: '/pmtopics/updatetools/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log("populateTopics");
                // populateDetailsTable(userdetailskey);
                populateToolTable(thistopic);
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            // populateTopics();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
function updateOutputs(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to update this Output?' + "+ $(this).attr('rel') : " +  $(this).attr('rel'));

    // Check and make sure the user confirmed
    if (confirmation === true) {


        if ($(this).attr('rel') != 'toadd') {

            // console.log($('#detailList table td#update').children[3]);
            var id = $(this).attr('rel').toString();
            console.log($('#' + id));
            console.log($('#' + id)[0].children[3]);
            console.log($('#' + id)[0].children[3].textContent);
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'Topic': $('#' + id)[0].children[0].textContent,
                'Output': $('#' + id)[0].children[1].textContent,
                'G': $('#' + id)[0].children[2].textContent,
                'P': $('#' + id)[0].children[3].textContent,
                'C': $('#' + id)[0].children[4].textContent,
                'Reference': $('#' + id)[0].children[5].textContent
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }

        }
        else
        {
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'Topic': $('#outputList table tr:last')[0].children[0].textContent,
                'Output': $('#outputList table tr:last')[0].children[1].textContent,
                'G': $('#outputList table tr:last')[0].children[2].textContent,
                'P': $('#outputList table tr:last')[0].children[3].textContent,
                'C': $('#outputList table tr:last')[0].children[4].textContent,
                'Reference': $('#outputList table tr:last')[0].children[5].textContent
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }
        }
        //if update == add

        // If they did, do our delete
        $.ajax({
            type: 'PUT',
            data: newUserDetails2update,
            url: '/pmtopics/updateoutputs/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log("populateTopics");
                // populateDetailsTable(userdetailskey);
                populateTopics();
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            // populateTopics();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
// Delete User
function deleteTopics(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?' + " $(this).attr('rel'" +  $(this).attr('rel'));

  // Check and make sure the user confirmed
  if (confirmation === true) {

      // If they did, do our delete
      $.ajax({
          type: 'DELETE',
          url: '/pmtopics/deletetopic/' + $(this).attr('rel')
      }).done(function( response ) {

          // Check for a successful (blank) response
          if (response.msg === '') {
          }
          else {
              alert('Error: ' + response.msg);
          }

          // Update the table
          populateTopics(userdetailskey);

      });

  }
  else {

      // If they said no to the confirm, do nothing
      return false;

  }

};

function deleteInputs(event) {

    event.preventDefault();
    console.log("into deleteInputs");
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this input?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/pmtopics/deleteinputs/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateInputTable(thistopic);

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }



};

function deleteTools(event) {

    event.preventDefault();
    console.log("into deleteTools");
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this tool?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/pmtopics/deletetools/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateToolTable(thistopic);

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
function deleteOutputs(event) {

    event.preventDefault();
    console.log("into deleteOutputs");
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this output?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/pmtopics/deleteoutputs/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateOutputTable(thistopic);

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};