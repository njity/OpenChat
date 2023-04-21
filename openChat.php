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

    <div class="list">
        <?php
            include "db.php";

            $query = "SELECT username FROM openChat";
            $result = $con->query($query);

            if (!$result) {
                die("Error executing query: ($con->errno) $con->error<br>SQL = $query");
            }

            echo "<h3>Existing Usernames</h3>";

            echo "<ul>";
            while ($row = $result->fetch_assoc()) {
                echo "<li>" . $row["username"] . "</li>";
            }

            echo "</ul>";
        ?>


    </div>



    <body>
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
                <textarea id="sendText" name="sendText" rows="15" cols="80"></textarea>
            </div>

            <div id="warning">

            </div>


        </section>


        <section class="listening">
            <div>
                <label for="listenName">Enter name from list and click listen: </label>
                <input type="text" id="listenName" name="listenName">
                <button type="button" id="listenButton" name="listenButton">
                    Listen
                </button>
            </div>

            <div>
                <textarea id="listenText" name="listenText" rows="15" cols="80" disabled></textarea>
            </div>

            <div id="listenWarning">

            </div>

        </section>


    </body>



</html>