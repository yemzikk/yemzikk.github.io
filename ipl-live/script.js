let team1 = document.getElementById("team1");
let team2 = document.getElementById("team2");
let overCount = document.getElementById("overCount");
let currentScore = document.getElementById("currentScore");
let batter1 = document.getElementById("batter1");
let batter1Indication = document.getElementById("batter1Indication");
let batter2 = document.getElementById("batter2");
let batter2Indication = document.getElementById("batter2Indication");
let divOver = document.getElementById("divOver");
let divBatting = document.getElementById("divBatting");
let divTarget = document.getElementById("divTarget");
let divBowling = document.getElementById("divBowling");
let target = document.getElementById("target");
let bowler = document.getElementById("bowler");
let showBowlingInfo = true;
let bowls = document.getElementById("bowls");
let liveIndicator = document.getElementById("liveIndicator");
let shareIcon = document.getElementById("shareIcon");

let liveIndicatorColorWhite = "#ffffff"
let liveIndicatorColorRed = "#ff0000"
let liveIndicatorColorCurrent = liveIndicatorColorWhite
// demo data 
// {"teams": [{"name": "CSK", "isLeading": false}, {"name": "RCB", "isLeading": true}], "matchInfo": {"target": 187, "currentScore": 42, "wickets": 10, "bowlingInfo": {"overCount": 15, "ballCount": 3, "bowlerInfo": {"name": "Rashid", "wickets": 2, "allowedScore": 47}, "currentOver": [2, 1, 6, 1, 3, 3]}, "battingInfo": {"batters": [{"name": "Raina", "isBatting": false, "runs": 20, "bowlsFaced": 35}, {"name": "Rahane", "isBatting": true, "runs": 34, "bowlsFaced": 18}]}}}

const fetchData = async () => {
  const response = await fetch("https://api.yemzikk.in/v1/score.json");
  const data = await response.json();

  //  Set names of both teams
  team1.textContent = data.teams[0].name;
  team2.textContent = data.teams[1].name;

  //  Set leading team
  if (data.teams[0].isLeading === true) {
    team1.classList.add("leading");
    team2.classList.remove("leading");
  } else {
    team2.classList.add("leading");
    team1.classList.remove("leading");
  }

  //  Set overs
  overCount.textContent = `${data.matchInfo.bowlingInfo.overCount}.${data.matchInfo.bowlingInfo.ballCount}`;

  //  Set current score
  currentScore.textContent = `${data.matchInfo.currentScore}/${data.matchInfo.wickets}`;

  //  Set batters
  // 50 (20) Rahane
  batter1.textContent = `${data.matchInfo.battingInfo.batters[0].runs} (${data.matchInfo.battingInfo.batters[0].bowlsFaced}) ${data.matchInfo.battingInfo.batters[0].name}`;
  batter2.textContent = `${data.matchInfo.battingInfo.batters[1].runs} (${data.matchInfo.battingInfo.batters[1].bowlsFaced}) ${data.matchInfo.battingInfo.batters[1].name}`;

  // set active batter
  if (data.matchInfo.battingInfo.batters[0].isBatting === true) {
    batter1Indication.classList.add("active");
    batter2Indication.classList.remove("active");
  } else {
    batter2Indication.classList.add("active");
    batter1Indication.classList.remove("active");
  }

  target.textContent = data.matchInfo.target;

  // set bowler info in Siraj 2(40) format 
  bowler.textContent = `${data.matchInfo.bowlingInfo.bowlerInfo.name} ${data.matchInfo.bowlingInfo.bowlerInfo.wickets}(${data.matchInfo.bowlingInfo.bowlerInfo.allowedScore})`;

  bowls.innerHTML = "";
  data.matchInfo.bowlingInfo.currentOver.forEach((ball) => {
    let span = document.createElement("span");
    if (ball === -1) {
      span.classList.add("pending");
    }else{
      span.textContent = ball;
    }
    bowls.appendChild(span);
  });
  if (showBowlingInfo === true) {
    divOver.classList.add("hidden");
    divBatting.classList.add("hidden");
    divBowling.classList.remove("hidden");
    divTarget.classList.remove("hidden");
  } else {
    divOver.classList.remove("hidden");
    divBatting.classList.remove("hidden");
    divBowling.classList.add("hidden");
    divTarget.classList.add("hidden");
  }
  showBowlingInfo = !showBowlingInfo;

  if(liveIndicatorColorCurrent === liveIndicatorColorWhite){
    liveIndicatorColorCurrent = liveIndicatorColorRed
  }else{
    liveIndicatorColorCurrent = liveIndicatorColorWhite
  }
  liveIndicator.style.backgroundColor = liveIndicatorColorCurrent
};

fetchData();
setInterval(async () => {
  fetchData();
}, 2000);

shareIcon.addEventListener("click", () => {
  navigator.share({
    title: "IPL Live Score",
    text: "Check out the live score of the IPL match",
    url: "https://ipl.yemzikk.in",
  });
}
);

