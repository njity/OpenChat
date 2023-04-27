
$(function() {
    $("#sendText").keyup(pushText);

    $("#listenName").keyup(listen);

    $("#listenName").keydown(stopInterval);
    
    $("#eye").click(showHide);

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
                flashWarningSend();
                break;
            case "ERR_CHECK_QUERY":
                $("#warning").html("Error: Server Request Error");
                flashWarningSend();
                break;
            case "ERR_UPDATE_CRED":
                $("#warning").html("Warning: Username and/or Password Cannot be Found");
                flashWarningSend();
                break;
            case "ERR_UPDATE_QUERY":
                $("#warning").html("Error: Server Cannot be Updated");
                flashWarningSend();
                break;
            case "SUCCESS":
                //console.log("SUCCESS");
                $("#warning").css("border", "solid 1px rgb(51, 238, 70)");
                $("#warning").html("Connection Successful");
                break;
            default:
                $("#warning").html("Warning: Unexpected Reach");
                flashWarningSend();
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        
        $("#warning").html("Fatal Error: POST Error");
        flashWarningSend();
        console.log(textStatus);
        console.log("Error: " + errorThrown);
    });
}

function emptyCredentials() {

    if (($("#username").val()).length == 0) {
        $("#warning").html("Warning: Enter Username");
        flashWarningSend();
        console.log("user");
        return true;
    } else if (($("#password").val()).length == 0) {
        $("#warning").html("Warning: Enter Password");
        flashWarningSend();
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
        $("#listenWarning").html("Please Enter Person to Listen To");
        clearInterval(interval);
        return;
    }

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
                flashWarningListen();
                clearInterval(interval);
                break;
            case "ERR_USER_NOT_FOUND":
                $("#listenWarning").html("Error: Username does not exist");
                flashWarningListen();
                clearInterval(interval);
                break;
            case "ERR_CHECK_QUERY":
                $("#listenWarning").html("Error: Server Request Error");
                flashWarningListen();
                clearInterval(interval);
                break;
            default:
                $("#listenWarning").css("border", "solid 1px rgb(51, 238, 70)");
                $("#listenWarning").html("Person Exists");
                $("#listenText").css("transform","translateY(-5px)");
                $("#listenText").css("box-shadow","0px 5px 10px 5px rgba(254, 197, 255, 0.5)");
                $("#listenText").val(data);
        }

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        
        $("#listenWarning").html("Fatal Error: GET Error");
        // console.log(textStatus);
        // console.log("Error: " + errorThrown);
    });
    

}

function showHide() {
    $("#eye").toggleClass("fa-eye-slash");
    if ($("#password").attr("type") === "password") {
        $("#password").attr("type", "text");
    } else {
        $("#password").attr("type", "password");
    }
}

function flashWarningSend() {
    // console.log("Called");
    $("#warning").css("border", "solid 1px rgb(238, 51, 113)");
    $("#warning").css("box-shadow", "0px 0px 10px 10px rgba(255, 0, 0, 0.5)");
    $("#warning").css("text-shadow", "0px 0px 4px rgba(255, 0, 0, 0.5)");
    $("#warning").css("background-color", "rgba(240, 0, 0, 0.5)");
    setTimeout(() => {
        $("#warning").css("box-shadow", "");
        $("#warning").css("text-shadow", "");
        $("#warning").css("background-color", "");
    }, 1200);
}

function flashWarningListen() {
    // console.log("Called");
    $("#listenText").css("transform","");
    $("#listenText").css("box-shadow","");
    $("#listenWarning").css("border", "solid 1px rgb(238, 51, 113)");
    $("#listenWarning").css("box-shadow", "0px 0px 10px 10px rgba(255, 0, 0, 0.5)");
    $("#listenWarning").css("text-shadow", "0px 0px 4px rgba(255, 0, 0, 0.5)");
    $("#listenWarning").css("background-color", "rgba(240, 0, 0, 0.5)");
    setTimeout(() => {
        $("#listenWarning").css("box-shadow", "");
        $("#listenWarning").css("text-shadow", "");
        $("#listenWarning").css("background-color", "");
    }, 1200);
}



//Ajax functionallity

//transform: translateY(-5px);
//box-shadow:  0px 5px 10px 5px rgba(254, 197, 255, 0.5);