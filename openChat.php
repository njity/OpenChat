<!DOCTYPE html>
<html>
    <head>
        <title>OpenChat</title>
        <link rel="stylesheet" href="openChat.css">
        <script
            src="https://code.jquery.com/jquery-3.6.4.min.js"
            integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
            crossorigin="anonymous">
        </script>
        <script src="openChat.js"></script>
    </head>

    



    <body>

        <header>       
            Open Chat
        </header>
        
        <div class="main">


            <div class="list">
                <?php
                    include "db.php";

                    $query = "SELECT username FROM openChat";
                    $result = $con->query($query);

                    if (!$result) {
                        die("Error executing query: ($con->errno) $con->error<br>SQL = $query");
                    }

                    echo "<div class='userHead'>Existing Usernames</div>";

                    echo "<ul>";
                    while ($row = $result->fetch_assoc()) {
                        echo "<li>" . $row["username"] . "</li>";
                    }

                    echo "</ul>";
                ?>


            </div>

            <section class="sending">
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password">
                </div>

                <div>
                    <textarea id="sendText" name="sendText"></textarea>
                </div>

                <div class="warning" id="warning">

                </div>


            </section>


            <section class="listening">
                <div>
                    <label for="listenName">Enter name from list to listen: </label>
                    <input type="text" id="listenName" name="listenName">
                </div>

                <div>
                    <textarea id="listenText" name="listenText" disabled></textarea>
                </div>

                <div class="warning" id="listenWarning">

                </div>

            </section>

        </div>


    </body>



</html>