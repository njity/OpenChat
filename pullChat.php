<?php
    include "db.php";

    if (!isset($_GET["username"])) {
        die("ERR_GET");
    }

    $query = "SELECT text FROM openChat WHERE username = ?";

    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $_GET["username"]);
    $stmt->execute();
    
    $stmt->bind_result($t);

    $result = $stmt->fetch();
    
    if ($result === null) {
        die("ERR_USER_NOT_FOUND");
    } else if ($result === false) {
        die("ERR_CHECK_QUERY");
    }

    echo $t;

    $stmt->close();

    //


?>