
$(function() {
    $("#sendText").keyup(pushText);

    $("#listenButton").click(listen);

    $("#listenName").focus(stopInterval);

});



function pushText() {
    // console.log("push");
    if (emptyCredentials()) {
        return;
    }

    let username = $("#username").val();
    let password = $("#password").val();
    let pushtext = $("#sendText").val();

    // console.log(username);
    // console.log(password);
    // console.log(text);
    
    let pushData = {username: username, password: password, text: pushtext};
    // console.log("RUN");

    $.ajax({
        url: "pushChat.php",
        type: "POST",
        data: pushData,
        dataType: "text"
    })
    .done(function (data, textStatus, jqXHR) {
        
        // console.log("finished " + data);
        switch (data) {
            case "ERR_CHECK_CRED":
                $("#warning").html("Warning: Username and/or Password is Incorrect");
                break;
            case "ERR_CHECK_QUERY":
                $("#warning").html("Error: Server Request Error");
                break;
            case "ERR_UPDATE_CRED":
                $("#warning").html("Warning: Username and/or Password Cannot be Found");
                break;
            case "ERR_UPDATE_QUERY":
                $("#warning").html("Error: Server Cannot be Updated");
                break;
            case "SUCCESS":
                //console.log("SUCCESS");
                $("#warning").html("Connection Successful");
                break;
            default:
                $("#warning").html("Warning: Unexpected Reach");
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        
        $("#warning").html("Fatal Error: POST Error");
        console.log(textStatus);
        console.log("Error: " + errorThrown);
    });
}

function emptyCredentials() {

    if (($("#username").val()).length == 0) {
        $("#warning").html("Warning: Enter Username");
        console.log("user");
        return true;
    } else if (($("#password").val()).length == 0) {
        $("#warning").html("Warning: Enter Password");
        console.log("pass");
        return true;
    }
    return false;
}


let islistening = false;
let interval;


function listen() {
    if (islistening) {
        return;
    }
    interval = setInterval(pullText, 100)
    islistening = true;
}

function stopInterval() {
    if (islistening) {
        clearInterval(interval);
        islistening = false;
    }
}

function pullText() {
    if ($("#listenName").val().length == 0) {
        $("#listenWarning").html("Please Enter Person to Listen to");
        return;
    }
    $("#listenWarning").html("");

    let name = $("#listenName").val();

    pullData = {username: name};

    $.ajax({
        url: "pullChat.php",
        type: "GET",
        data: pullData,
        dataType: "text"
    })
    .done(function(data, textStatus, jqXHR) {

        switch (data) {
            case "ERR_GET":
                $("#listenWarning").html("Fatal Error: Username did not go through");
                break;
            case "ERR_USER_NOT_FOUND":
                $("#listenWarning").html("Error: Username does not exist");
                break;
            case "ERR_CHECK_QUERY":
                $("#listenWarning").html("Error: Server Request Error");
                break;
            default:
                $("#listenText").val(data);
        }

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        
        $("#listenWarning").html("Fatal Error: GET Error");
        // console.log(textStatus);
        // console.log("Error: " + errorThrown);
    });
    

}



//Ajax functionallity