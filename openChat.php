<!DOCTYPE html>
<html>
    <head>
        <title>OpenChat</title>
        <link rel="stylesheet" href="openChat.css">
        <script src="openChat.js"></script>
    </head>

    <div class="list">

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
                <textarea id="listenText" name="listenText" rows="15" cols="80"></textarea>
            </div>

        </section>


    </body>



</html>