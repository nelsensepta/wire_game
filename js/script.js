const path = "http://localhost/wire_game";
const stone = document.querySelectorAll(".stone");
const player = document.querySelectorAll(".player");
const playerLanding = document.querySelector("#player-landing");
const playerJump = document.querySelector("#player-jump");
const playerFall = document.querySelector("#player-fall");
const formLogin = document.querySelector("#form-login");
const form = document.querySelector("form");
const leftNavigation = document.querySelector(".navigation#left");
const rightNavigation = document.querySelector(".navigation#right");
const scoreContainer = document.querySelector(".score-container");
const resultForm = document.querySelector("#result-form");
const leaderboardForm = document.querySelector("#leaderboard-form");
const leaderBoardData = document.querySelector("#leaderboard-data .list-data");
const inputName = document.querySelector("input#username");
const inputPassword = document.querySelector("input#password");
const inputEmail = document.querySelector("input#email");
const labelEmail = document.querySelector("#labelEmail");
const resultName = document.querySelector(".result-name");
const resultHighScore = document.querySelector(".result-high-score");
const resultCurrentScore = document.querySelector(".result-current-score");

// username @
inputName.addEventListener("keydown", () => {
  let inputValue = inputName.value;
  if (inputValue) {
    if (inputValue.charAt(0) === "@") {
      inputValue = inputValue.substring(1);
    }
  }
  let newValue = `@${inputValue}`;
  inputName.value = newValue;
});

const Stone = {
  speed: 0.5,
  stone1Y: (window.innerHeight * 3) / 4,
  stone2Y: (window.innerHeight * 1) / 5,
  stone3Y: (window.innerHeight * 1) / 3,
  size: 400,
  init: function () {
    this.speed = 0.5;
    this.stone1Y = (window.innerHeight * 3) / 4;
    this.stone2Y = (window.innerHeight * 1) / 5;
    this.stone3Y = (window.innerHeight * 1) / 3;
    stone[0].style.top = this.stone1Y + "px";
    stone[0].style.left = (window.innerWidth * 1) / 2 - 200 + "px";

    stone[1].style.top = this.stone2Y + "px";
    stone[1].style.left = (window.innerWidth * 1) / 4 - 200 + "px";

    stone[2].style.top = this.stone3Y + "px";
    stone[2].style.left = (window.innerWidth * 3) / 4 - 200 + "px";
    for (let st of stone) {
      st.style.width = this.size + "px";
    }
  },
  running: function () {
    this.interval = setInterval(() => {
      this.stone1Y += this.speed;
      this.stone2Y += this.speed;
      this.stone3Y += this.speed;
      if (this.stone1Y > window.innerHeight) this.stone1Y = 0;
      if (this.stone2Y > window.innerHeight) this.stone2Y = 0;
      if (this.stone3Y > window.innerHeight) this.stone3Y = 0;
      stone[0].style.top = this.stone1Y + "px";
      stone[1].style.top = this.stone2Y + "px";
      stone[2].style.top = this.stone3Y + "px";
    }, 10);
  },

  stop: function () {
    clearInterval(this.interval);
  },
};

const Player = {
  id: 0,
  score: 0,
  speed: 0.5,
  size: 200,
  position: {
    top: 0,
    left: 0,
  },
  upTimerId: 0,
  gravitasi: 0,
  fall: 0,
  jump: 0,
  landing: 0,
  stoneHeight: 0,
  setStoneHeight: function (stoneHeight) {
    this.stoneHeight = stoneHeight;
  },

  positionOfStone: function () {
    return this.stoneHeight / 2 - this.size / 2;
  },

  fastStone: function () {
    for (let i = 2; i < this.score; i = +2) {
      switch (this.score > i) {
        case i:
          this.speed += 2;
          Stone.speed += 2;
          break;
      }
    }
  },

  // jumpStand: function (top) {
  //   upTimerId = setInterval(function () {
  //     top -= 40;
  //     playerJump.style.top = top + "px";
  //   }, 30);
  //   // gravitasi = setInterval(function () {
  //   //   top += 5;
  //   //   playerJump.style.top = top + "px";
  //   // }, 30);
  // },

  register: function () {
    inputEmail.style.display = "block";
    form.style.bottom = -12 + "px";
    labelEmail.style.display = "block";
    const body = new FormData();
    body.append("username", inputName.value);
    body.append("password", inputPassword.value);
    body.append("email", inputEmail.value);
    fetch(path + "/register.php", {
      method: "POST",
      body,
    })
      .then((res) => res.json)
      .then((res) => {
        console.log(res.status);
        if (res.status) {
          alert("Akun Berhasil Dibuat, Silakan Login");
        } else {
          alert(res.message);
        }
      });
  },

  init: function () {
    this.score = 0;
    this.speed = 0.5;
    this.jump = (window.innerHeight * 3) / 4 - this.positionOfStone();
    this.landing = (window.innerHeight * 1) / 3 - this.positionOfStone();
    this.fall = (window.innerHeight * 1) / 5 - this.positionOfStone();
    //jump
    playerJump.style.top = this.jump + "px";
    playerJump.style.left = (window.innerWidth * 1) / 2 - 100 + "px";

    //landing
    playerLanding.style.top = this.landing + "px";
    playerLanding.style.left = (window.innerWidth * 3) / 4 - 100 + "px";

    // fall
    playerFall.style.top = this.fall + "px";
    playerFall.style.left = (window.innerWidth * 1) / 4 - 100 + "px";

    for (let play of player) {
      play.style.width = this.size + "px";
    }

    this.position.left = parseFloat(playerJump.style.left.split("px")[0]);
    this.position.top = parseFloat(playerJump.style.top.split("px")[0]);
  },
  play: function () {
    formLogin.style.display = "none";
    resultForm.style.display = "none";
    leaderboardForm.style.display = "none";
    scoreContainer.style.display = "block";
    playerLanding.style.display = "none";
    playerFall.style.display = "none";
    playerJump.style.display = "block";

    this.interval = setInterval(() => {
      this.position.top += this.speed;
      if (this.position.top > window.innerHeight) {
        this.stop();
        Stone.stop();
      }
      playerJump.style.top = this.position.top + "px";
      playerLanding.style.top = this.position.top + "px";
    }, 10);
  },

  checkPosition: function () {
    let currentStone = 0.0;

    for (let st of stone) {
      console.log(
        "CheckPosition",
        parseInt(st.style.left.split("px")[0]) +
          Stone.size / 2 -
          (parseInt(playerJump.style.left.split("px")[0]) + 100),
        parseInt(st.style.left.split("px")[0]) +
          Stone.size / 2 -
          (parseInt(playerJump.style.left.split("px")[0]) + 100)
      );
      if (
        parseInt(st.style.left.split("px")[0]) +
          Stone.size / 2 -
          (parseInt(playerJump.style.left.split("px")[0]) + 100) <
          8 &&
        parseInt(st.style.left.split("px")[0]) +
          Stone.size / 2 -
          (parseInt(playerJump.style.left.split("px")[0]) + 100) >
          -8
      ) {
        currentStone = parseFloat(st.style.left.split("px")[0]);
      }
    }
    let stoneLeftPosition = [];
    let stoneRightPosition = [];

    for (let st of stone) {
      if (
        parseFloat(st.style.left.split("px")[0]) < currentStone &&
        parseFloat(st.style.top.split("px")[0]) <
          parseFloat(playerJump.style.top.split("px")[0]) +
            this.positionOfStone()
      ) {
        stoneLeftPosition.push(parseFloat(st.style.left.split("px")[0]));
      }
      if (
        parseFloat(st.style.left.split("px")[0]) > currentStone &&
        parseFloat(st.style.top.split("px")[0]) <
          parseInt(playerJump.style.top.split("px")[0]) + this.positionOfStone()
      ) {
        stoneRightPosition.push(parseFloat(st.style.left.split("px")[0]));
      }
    }
    return {
      left: Math.max(...stoneLeftPosition) || null,
      right: Math.max(...stoneRightPosition) || null,
    };
  },
  getTopDestination: function (playerPositionOfStone) {
    for (let st of stone) {
      if (parseFloat(st.style.left.split("px")[0]) == playerPositionOfStone) {
        return parseFloat(st.style.top.split("px")[0]) - this.positionOfStone();
      }
    }
  },
  landinged: function () {
    playerLanding.style.top = this.position.top + "px";
    playerLanding.style.left = this.position.left + "px";
    playerLanding.style.display = "block";
    playerJump.style.display = "none";
    // this.jumpStand(this.position.top);
    // playerLanding += 40;
    // doodler.style.bottom = doodlerBottomSpace + "px";
    this.speed += 0.1;
    Stone.speed += 0.1;
    this.score++;
  },
  jumping: function (direction, jumped) {
    this.position.left = parseFloat(playerJump.style.left.split("px")[0]);
    this.position.top = parseFloat(playerJump.style.top.split("px")[0]);
    console.log("Left", this.position.left);
    console.log("top", this.position.top);
    console.log(this.speed);
    console.log(Stone.speed);
    playerLanding.style.display = "none";
    playerJump.style.display = "block";
    const playerPositionOfStone = this.checkPosition();
    let topInterval;
    let leftInterval;
    let rightInterval;
    if (direction == "left" && playerPositionOfStone.left > 0) {
      topInterval = setInterval(() => {
        this.position.top -= this.speed * 2.2;
        playerJump.style.top = this.position.top + "px";
        if (
          this.getTopDestination(playerPositionOfStone.left) >=
          this.position.top
        ) {
          clearInterval(topInterval);
          jumped();
        }
      }, 10);
      leftInterval = setInterval(() => {
        this.position.left -= this.speed * (playerPositionOfStone.left * 0.01);
        playerJump.style.left = this.position.left + "px";
        if (
          playerPositionOfStone.left + 100 >
          parseFloat(playerJump.style.left.split("px")[0])
        ) {
          clearInterval(leftInterval);
          this.landinged();
        }
      }, 10);
    }
    if (direction == "right" && playerPositionOfStone.right) {
      topInterval = setInterval(() => {
        this.position.top -= this.speed * 3.8;
        playerJump.style.top = this.position.top + "px";
        if (
          this.getTopDestination(playerPositionOfStone.right) >=
          this.position.top
        ) {
          clearInterval(topInterval);
        }
      }, 10);
      rightInterval = setInterval(() => {
        this.position.left += this.speed * (playerPositionOfStone.right * 0.01);
        playerJump.style.left = this.position.left + "px";
        if (
          playerPositionOfStone.right + 100 <
          parseFloat(playerJump.style.left.split("px")[0])
        ) {
          clearInterval(rightInterval);
          this.landinged();
          jumped();
        }
      }, 10);
    }

    if (
      (direction == "left" && playerPositionOfStone.left < 0) ||
      (direction === "right" && playerPositionOfStone.right < 0)
    ) {
      Stone.stop();
      this.stop();
      clearInterval(topInterval);
    }
  },

  stop: function () {
    playerJump.style.display = "none";
    playerLanding.style.display = "none";
    playerFall.style.left = window.innerWidth / 2;
    playerFall.style.top = window.innerHeight / 2;
    playerFall.style.display = "block";
    scoreContainer.style.display = "none";
    clearInterval(this.interval);
    const body = new FormData();
    body.append("score", this.score);
    fetch(path + "/insert_score.php?id=" + this.id, {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.status) return;
        resultForm.style.display = "flex";
        resultCurrentScore.innerHTML = this.score - 1;
        resultHighScore.innerHTML = res.data.score;
        resultName.innerHTML = res.data.username;
      });
  },
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    let jumping = false;
    console.log(Player.positionOfStone());

    Stone.init();
    Player.setStoneHeight(Stone.size);
    Player.init();

    const buttonLogin = document.querySelector(".button-login");
    buttonLogin.addEventListener("click", function () {
      if (inputName.value === "" || inputPassword.value == "") {
        return console.log("Kosong");
      }
      const body = new FormData();
      body.append("username", inputName.value);
      body.append("password", inputPassword.value);

      fetch(path + "/login.php", {
        method: "POST",
        body,
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.status) {
            Player.register();

            // var inputEmail = document.createElement("input");
            // email.setAttribute("type", "email");
            // const body = new FormData();
            // body.append("username", inputName.value);
            // body.append("password", inputPassword.value);
            // body.append("email", inputEmail.value);
            // console.log(inputEmail.value);
            // fetch(path + "/register.php", (method = "POST"))
            //   .then((res) => res.json)
            //   .then((res) => {
            //     if (res.status) {
            //       alert("Akun Berhasil Dibuat, Silakan Login");
            //     } else {
            //       alert("Akun gagal Dibuat");
            //     }
            //   });
          } else {
            Player.id = res.id;
            Stone.running();
            // Player.FastStone();
            Player.play();
          }
        });
    });
    const buttonPlay = document.querySelectorAll(".button-play");
    buttonPlay.forEach((btn) => {
      btn.addEventListener("click", function () {
        Stone.init();
        Player.setStoneHeight(Stone.size);
        Player.init();

        Stone.running();
        // Player.FastStone();
        Player.play();
      });
    });
    const buttonExit = document.querySelectorAll(".button-exit");
    buttonExit.forEach((btn) => {
      btn.addEventListener("click", function () {
        resultForm.style.display = "none";
        leaderboardForm.style.display = "none";
        formLogin.style.display = "flex";
      });
    });
    const buttonLeaderboard = document.querySelector(".button-leaderboard");
    buttonLeaderboard.addEventListener("click", function () {
      fetch(path + "/leaderboard.php")
        .then((res) => res.json())
        .then((res) => {
          if (!res.status) return;

          for (let data of res.data) {
            const new_row = document.createElement("div");
            new_row.className = "data";
            const name = document.createElement("div");
            name.append(data.username);
            const score = document.createElement("div");
            score.append(data.score);
            new_row.appendChild(name);
            new_row.appendChild(score);

            leaderBoardData.appendChild(new_row);
          }
        });
      leaderboardForm.style.display = "flex";
    });
    leftNavigation.addEventListener("click", function () {
      if (!jumping) {
        jumping = true;
        Player.jumping("left", () => {
          jumping = false;
          document.querySelector(".score").innerHTML = Player.score;
        });
      }
    });

    rightNavigation.addEventListener("click", function () {
      if (!jumping) {
        jumping = true;
        Player.jumping("right", () => {
          jumping = false;
          document.querySelector(".score").innerHTML = Player.score;
        });
      }
    });
  }
};
