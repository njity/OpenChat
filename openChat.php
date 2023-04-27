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


            </section>


            <section class="listening">
                <div>
                    <label for="listenName">Enter a name from the list to listen: </label>
                    <input type="text" id="listenName" name="listenName">
                </div>

                
                <textarea id="listenText" name="listenText" disabled></textarea>
                
                

                <div class="warning" id="listenWarning">
                    
                </div>

            </section>

        </div>


    </body>



</html>