<!DOCTYPE html>
<html>
    <head>
        <title>OpenChat</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
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


            <fieldset class="list">
                <legend>Usernames</legend>

                <?php
                    include "db.php";

                    $query = "SELECT username FROM openChat";
                    $result = $con->query($query);

                    if (!$result) {
                        die("Error executing query: ($con->errno) $con->error<br>SQL = $query");
                    }

                    echo "<ul>";
                    while ($row = $result->fetch_assoc()) {
                        echo "<li>" . $row["username"] . "</li>";
                    }

                    echo "</ul>";
                ?>


            </fieldset>

            <fieldset class="sending">
                <legend>Send Message</legend>
                <div class="horizontal">
                    <div> 
                        <input type="text" id="username" name="username" required>
                        <label for="username">Username</label>
                    </div>

                    <div>
                        <input type="password" id="password" name="password" required>
                        <i class="fa-solid fa-eye" id="eye"></i>
                        <label for="password">Password</label>
                    </div>
                </div>
                

                
                <textarea id="sendText" name="sendText"></textarea>
                


                <div class="warning" id="warning">

                </div>


            </fieldset>


            <fieldset class="listening">
                <legend>Receive Message</legend>
                <div class="horizontal">
                    <div>
                        <input type="text" id="listenName" name="listenName" title="Type A Name From The List" required>
                        <label for="listenName">Username</label>
                    </div>
                </div>

                
                <textarea id="listenText" name="listenText" disabled></textarea>
                
                

                <div class="warning" id="listenWarning">
                    
                </div>

            </fieldset>

        </div>


    </body>



</html>