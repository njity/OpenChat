
$(function() {
    $("#sendText").keyup(pushText);

    $("#listenButton").click(pullText);

});



function pushText() {
    console.log("push");
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
    console.log("RUN");

    $.ajax({
        url: "pushChat.php",
        type: "POST",
        data: pushData,
        dataType: "text"
    })
    .done(function (data, textStatus, jqXHR) {
        // Process data, as received in data parameter
        console.log("finished " + data);
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
                console.log("SUCCESS");
                $("#warning").html("Connection Successful");
                break;
            default:
                $("#warning").html("Warning: Unexpected Reach");
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        // Request failed. Show error message to user. 
        // errorThrown has error message, or "timeout" in case of timeout.
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



function pullText() {

}



//Ajax functionallity