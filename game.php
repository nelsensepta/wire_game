<?php 
session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link rel="stylesheet" href="css/style.css" />
</head>

<body>
  <img class="stone" src="FINAL_ASSET/STONE 01.svg" />
  <img class="stone" src="FINAL_ASSET/STONE 02.svg" />
  <img class="stone" src="FINAL_ASSET/STONE 03.svg" />
  <img class="player" id="player-landing" src="FINAL_ASSET/LANDING.svg" />
  <img class="player" id="player-jump" src="FINAL_ASSET/JUMP.svg" />
  <img class="player" id="player-fall" src="FINAL_ASSET/FALL.svg" />
  <div class="navigation-container">
    <img class="navigation" id="left" src="FINAL_ASSET/BUTTON_NAVIGATION.png" />
    <img class="navigation" id="right" src="FINAL_ASSET/BUTTON_NAVIGATION.png" />
  </div>
  <div id="form-login">
    <img class="form-login-image" src="FINAL_ASSET/FORM LOGIN.svg" alt="" />
    <form action="">
      <div>
        <label for="username">Name</label>
      </div>
      <input type="text" id="name" name="username" />
      <div style="margin-top: 20px">
        <label for="password">Password</label>
      </div>
      <input type="password" id="password" name="password" />
      <div class="button-login"></div>
    </form>
  </div>
  <div id="result-form" style="display: none">
    <img class="form-login-image" src="FINAL_ASSET/RESULT FORM.svg" alt="" />
    <div id="result-data">
      <div class="result-name">John Doe</div>
      <div class="result-label">Your High Score</div>
      <div class="result-high-score">40</div>
      <div class="result-label">Your Current Score</div>
      <div class="result-current-score">40</div>
      <div class="button-play"></div>
      <div class="button-leaderboard"></div>
      <div class="button-exit"></div>
    </div>
  </div>
  <div id="leaderboard-form" style="display: none">
    <img class="form-login-image" src="FINAL_ASSET/LEADERBOARD FORM.svg" alt="" />
    <div id="leaderboard-data">
      <div class="label">
        <div>name</div>
        <div>score</div>
      </div>
      <div class="list-data"></div>
      <div class="button-play"></div>
      <div class="button-exit"></div>
    </div>
  </div>

  <div class="score-container">
    <div class="score-label">YOUR SCORE</div>
    <div class="score">0</div>
  </div>
  <!-- <script src="js/script.js"></script> -->
</body>

</html>