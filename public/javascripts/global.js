// Userlist data array for filling in info box
var userListData = [];
var userdetailskey = "";
// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateSearchedTable() {

    // Empty content string
    var tableContent = '';
    var searchField = {
        // how to define which row?
        //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
        // '_id':  $(this).attr('rel'),
        'username': $('#searchFields fieldset input#inputSearchUserName').val(),
        'email': $('#searchFields fieldset input#inputSearchEmail').val()

        // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
    }
    $.ajax({
        type: 'POST',
        data: searchField,
        url: '/users/searchlist',
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
        url: '/users/searchemaillist',
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


function populateTable() {

    // Empty content string
    var tableContent = '';



    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {
        // Stick our user data array into a userlist variable in the global object
        userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

function populateDetailsTable(val) {

    // Empty content string
    var tableContent = '';
    var topass = val;


    // jQuery AJAX call for JSON
    $.getJSON( '/users/userdetails', function(data) {
        // Stick our user data array into a userlist variable in the global object
        // userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            if(topass==this.username){
                // console.log("topass : " + topass);
                // console.log(topass==this.username);
                tableContent += '<tr id = "' + this._id + '">';
                tableContent += '<td id=\'username\'><a href="#" class="linkshowdetails" rel="' + this.username + '">' + this.username + '</a></td>';
                tableContent += '<td contenteditable=\'true\', id=\'address\'>' + this.address + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'phone\'>' + this.phone + '</td>';
                tableContent += '<td contenteditable=\'true\', id=\'title\'>' + this.title + '</td>';
                tableContent += '<td id=\'delete\'><a href="#" class="linkdeletedetails" rel="' + this._id + '">delete</a></td>';
                tableContent += '<td id=\'update\'><a href="#" class="linkupdatedetails" rel="' + this._id + '">update</a></td>';
                tableContent += '</tr>';}
        });

        // Inject the whole content string into our existing HTML table
        $('#detailList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
    $('#userInfoUsername').text(thisUserObject.username);
    $('#userInfoEmail').text(thisUserObject.email);
    populateDetailsTable(thisUserObject.username.toString());
    userdetailskey = thisUserObject.username.toString();
};

// Username link click
$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
// $('#userInfo p span').on('change', 'td a.linkshowuser', populateDetailsTable);
$('#btnSearchUser').on('click', populateSearchedTable);
// $('#btnSearchEmail').on('click', populateSearchedTableByEmail);
$('#btnAddUser').on('click', addUser);
$('#btnAddDetails').on('click', addUserDetails);
$('#btnUpdateUser').on('click', updateUser);
$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
$('#detailList table tbody').on('click', 'td a.linkdeletedetails', deleteUserDetails);
$('#detailList table tbody').on('click', 'td a.linkupdatedetails', updateUserDetails);
// Add User
function addUser(event) {
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
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

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

function addUserDetails(event) {

    //generate new table rows
    var tableContent = '';
    tableContent += '<tr>';
    tableContent += '<td id=\'username\'><a href="#" class="linkshowdetails" rel="' + userdetailskey + '">' + userdetailskey + '</a></td>';
    tableContent += '<td contenteditable=\'true\', id=\'address\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'phone\'>' + '' + '</td>';
    tableContent += '<td contenteditable=\'true\', id=\'title\'>' + '' + '</td>';
    tableContent += '<td id=\'delete\'><a href="#" class="linkdeletedetails" rel="' + '' + '">delete</a></td>';
    tableContent += '<td id=\'update\'><a href="#" class="linkupdatedetails" rel="' + 'toadd' + '">update</a></td>';
    tableContent += '</tr>';
    console.log(tableContent);
    $('#detailList table tbody').html($('#detailList table tbody').html() + tableContent);

};

// Update User
function updateUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to update this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        var newUser2update = {
            'username': $('#userInfo p span#userInfoUsername').text(),
            'email': $('#userInfo p span#userInfoEmail').text(),
            'fullname': $('#userInfo p span#userInfoName').text(),
            'age': $('#userInfo p span#userInfoAge').text(),
            'location': $('#userInfo p span#userInfoLocation').text(),
            'gender': $('#userInfo p span#userInfoGender').text()
        }
        // If they did, do our delete
        $.ajax({
            type: 'PUT',
            data: newUser2update,
            url: '/users/updateuser/',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log("populateTable")
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            // populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
function updateUserDetails(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to update this userDetail?' + "+ $(this).attr('rel') : " +  $(this).attr('rel'));

    // Check and make sure the user confirmed
    if (confirmation === true) {

        //if update != add
        console.log("$(this).attr('rel') in details update : " + $(this).attr('rel'));
        if ($(this).attr('rel') != 'toadd') {
            console.log($(this).attr('rel'));
            // console.log($('#detailList table td#update').innerHTML);
            // console.log($('#detailList table td#update').attr('rel').val());
            console.log($('#detailList table')[0].rows.length);
            console.log($('#detailList table td#update'));
            // console.log($('#detailList table td#update').children[3]);
            var rowLength = $('#detailList table')[0].rows.length;
            var id = $(this).attr('rel').toString();
            console.log($('#' + id));
            console.log($('#' + id)[0].children[3]);
            console.log($('#' + id)[0].children[3].textContent);
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'username': $('#' + id)[0].children[0].textContent,
                'address': $('#' + id)[0].children[1].textContent,
                'phone': $('#' + id)[0].children[2].textContent,
                'title': $('#' + id)[0].children[3].textContent,
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }

        }
        else
        {
            var newUserDetails2update = {
                // how to define which row?
                //  '_id': "ObjectId(\"" + $(this).attr('rel') + "\")",
                // '_id':  $(this).attr('rel'),
                'username': $('#detailList table tr:last')[0].children[0].textContent,
                'address': $('#detailList table tr:last')[0].children[1].textContent,
                'phone': $('#detailList table tr:last')[0].children[2].textContent,
                'title': $('#detailList table tr:last')[0].children[3].textContent,
                // 'update': $('#detailList table td#update').text()// used this field to decide whether to add or update
            }
        }
        //if update == add

        // If they did, do our delete
        $.ajax({
            type: 'PUT',
            data: newUserDetails2update,
            url: '/users/updateuserdetails/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log("populateTable")
                populateDetailsTable(userdetailskey);
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            // populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?' + " $(this).attr('rel'" +  $(this).attr('rel'));

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable(userdetailskey);

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

function deleteUserDetails(event) {

    event.preventDefault();
    console.log("into deleteUserDetails");
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user detail?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuserdatails/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateDetailsTable(userdetailskey);

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};