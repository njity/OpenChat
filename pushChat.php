<?php
    include "db.php";

    if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["text"])) {
        die("ERR_UPDATE_QUERY");
    }

    $query = "SELECT * FROM openChat WHERE username = ? AND password = ?";

    $stmt = $con->prepare($query);
    $stmt->bind_param("ss", $_POST["username"], $_POST["password"]);
    $stmt->execute();
    
    $stmt->bind_result($c1, $c2, $c3);

    $result = $stmt->fetch();
    
    if ($result === null) {
        die("ERR_CHECK_CRED");
    } else if ($result === false) {
        die("ERR_CHECK_QUERY");
    }

    $stmt->free_result();



    $query = "UPDATE openChat SET text = ? WHERE username = ? AND password = ?";

    $stmt = $con->prepare($query);
    $stmt->bind_param("sss", $_POST["text"], $_POST["username"], $_POST["password"]);
    $stmt->execute();

    // $result = $stmt->fetch();
    
    // if ($result === null) {
    //     echo "ERR_UPDATE_CRED";
    //     die;
    // } else if ($result === false) {
    //     echo "ERR_UPDATE_QUERY";
    //     die;
    // }
    
    echo "SUCCESS";

    $stmt->close();

    
    
    //


?>