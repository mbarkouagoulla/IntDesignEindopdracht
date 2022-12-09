const api1 = `1kGVYkYPJWDEsF3yI2RXvmEXQMlqqnFXCKOm7T4zAAAhEUnoZpUlOlyKma9V`;
// const api1 = `DSsmwgvtKwBZRnPpYcdUGX4M9FNTWYt9SsYVNqpzg7ihbuycSRxObwIhJOBW`;
const api2 = `DSsmwgvtKwBZRnPpYcdUGX4M9FNTWYt9SsYVNqpzg7ihbuycSRxObwIhJOBW`;


const logo = document.querySelector('.js-image');
const leaguename = document.querySelector('.js-leaguename');
const table = document.querySelector('.js-standings');
const standings_button = document.querySelector('.js-standings-in-button');
const stats_button = document.querySelector('.js-stats-in-button');
const close = document.querySelector('.close');
const seasonYear = document.querySelector('.js-season-year');

let clubs = document.querySelector('.js-clubs')
let matches = document.querySelector('.js-matches');;
let goals = document.querySelector('.js-goals');
let yellowcards = document.querySelector('.js-yellowc');
let redcards = document.querySelector('.js-redc');
let avg_yellow = document.querySelector('.js-avg-yellow');
let topscorer = document.querySelector('.js-topscorer');
let topassist = document.querySelector('.js-topassist');
let team_most_goals = document.querySelector('.js-team-most-goals');
let goalkeeper_cleansheet = document.querySelector('.js-cleansheet');
let win_percentage = document.querySelector('.js-win-perc');
let defeat_percentage = document.querySelector('.js-defeat-perc');
let imageTeam = document.querySelector('.js-imageinfo');
let data_season_topscorer, data_season_topassist, data_team_most_goals, data_goalkeeper_cleansheet;

let ListenToClickTeamSquad = () => {
    let team = document.querySelectorAll('.js-squad');
    var modal = document.getElementById("myModal");
    var span = document.querySelector('.closeme');
    for (let i = 0; i < team.length; i++) {
        team[i].addEventListener('click', () => {
            modal.style.display = "block";
            let id = team[i].id;
            console.log('team id', id);
            showTeamInfo(id)
        })
    }
    // // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        //set the image src empty
        imageTeam.src = '';
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            //set the image src empty
            imageTeam.src = '';
        }
    }
};

let showTeamInfo = async (id) => {
    const ENDPOINT = `https://soccer.sportmonks.com/api/v2.0/teams/${id}?api_token=${api1}&include=stats&seasons=18369`;
    let attacks = document.querySelector('.js-info-attack');
    let shots = document.querySelector('.js-info-shots');
    let fouls = document.querySelector('.js-info-fouls');
    let teamYellows = document.querySelector('.js-info-yellow');
    let teamReds = document.querySelector('.js-info-red');
    const request = await fetch(ENDPOINT);
    const data = await request.json();
    console.log('TEAM ', data.data);
    const image = data.data.logo_path;
    const TeamInfostats = data.data.stats.data[0]
    console.log('TEAM INFO STATS', TeamInfostats);
    let ScoringMinutes, Penalties, CleanSheet, Wins;
    FailedToScore = TeamInfostats.failed_to_score;
    Penalties = TeamInfostats.penalties;
    CleanSheet = TeamInfostats.clean_sheet;
    Wins = TeamInfostats.win;
    console.log('FailedToScore', FailedToScore);
    console.log('Penalties', Penalties);
    console.log('CleanSheet', CleanSheet);
    console.log('Wins', Wins);
    console.log('image', image);
    // .attacks .shots_on_target .fouls .yellowcards .redcards 
    imageTeam.src = image;
    attacks.innerHTML = TeamInfostats.attacks;
    shots.innerHTML = TeamInfostats.shots_on_target;
    fouls.innerHTML = TeamInfostats.fouls;
    teamYellows.innerHTML = TeamInfostats.yellowcards;
    teamReds.innerHTML = TeamInfostats.redcards;
    let donut1 = document.querySelector('.js-graph3');
    let donut2 = document.querySelector('.js-graph4');
    let donut3 = document.querySelector('.js-graph5');
    let donut4 = document.querySelector('.js-graph6');
    donut1.innerHTML = '<canvas class="" id="js-graph3_inner" width="3" height="1"></canvas>';
    donut2.innerHTML = '<canvas class="" id="js-graph4_inner" width="3" height="1"></canvas>';
    donut3.innerHTML = '<canvas class="" id="js-graph5_inner" width="3" height="1"></canvas>';
    donut4.innerHTML = '<canvas class="" id="js-graph6_inner" width="3" height="1"></canvas>';
    const ctx1 = document.getElementById('js-graph3_inner');
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Home wins', 'Away wins'],
            datasets: [{
                label: '# Matches',
                data: [Wins.home, Wins.away],
                backgroundColor: [
                    'rgba(255, 182, 92, 1)',
                    'rgba(143, 190, 237, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Wins',
                    fontSize: 20,
                    fontColor: 'black'
                }
            }
        }
    });
    const ctx2 = document.getElementById('js-graph4_inner');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Home cleansheets', 'Away cleansheets'],
            datasets: [{
                label: '# Matches',
                data: [CleanSheet.home, CleanSheet.away],
                backgroundColor: [
                    'rgba(255, 182, 92, 1)',
                    'rgba(143, 190, 237, 1)'],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Cleansheets',
                    fontSize: 20,
                    fontColor: 'black'
                }
            }
        }
    });
    const ctx3 = document.getElementById('js-graph5_inner');
    new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Awarded', 'Scored', 'Conceded'],
            datasets: [{
                // label: '% Matches',
                data: [Penalties.awarded, Penalties.scored, Penalties.conceded],
                backgroundColor: [
                    'rgba(143, 190, 237, 1)',
                    'rgba(255, 182, 92, 1)',
                    'rgba(255, 0, 0, 0.62)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Penalties',
                    fontSize: 20,
                    fontColor: 'black'
                }
            }
        }
    });
    const ctx4 = document.getElementById('js-graph6_inner');
    new Chart(ctx4, {
        type: 'pie',
        data: {
            labels: ['Home games', 'Away games'],
            datasets: [{
                label: '# Matches',
                data: [FailedToScore.away, FailedToScore.home],
                backgroundColor: [
                    'rgba(255, 182, 92, 1)',
                    'rgba(143, 190, 237, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Failed to score',
                    fontSize: 20,
                    fontColor: 'black'
                }
            }
        }
    });
};

let showResults = (standings) => {
    let html = ''
    for (let i = 0; i < standings.length; i++) {
        html +=
            `<a href="#" class="c-team__item c-button_team js-squad o-row--md " id="${standings[i].team_id}">
                    <div class="c-team__item__name">
                        <article class="u-fixed-widht-md u-text-bold">${standings[i].position}</article>
                        <article class="">${standings[i].team_name}</article>
                    </div>
                    <div class="c-team__item__info">
                        <article class="fixed_width">${standings[i].overall.games_played}</article>
                        <article class="u-mobile-hide fixed_width">${standings[i].overall.won}</article>
                        <article class="u-mobile-hide fixed_width">${standings[i].overall.draw}</article>
                        <article class="u-mobile-hide fixed_width">${standings[i].overall.lost}</article>
                        <article class="fixed_width">${standings[i].total.goal_difference}</article>
                        <article class="">${standings[i].points}</article>
                    </div>
                </a>`
    }
    table.innerHTML += html
    ListenToClickTeamSquad()
};

let showLeagueStats = (data, d_topscorer, d_topassist, d_team_most_goals, d_goalkeeper_cleansheet) => {
    console.log("Stats functie ", data.data.stats.data);
    console.log("Topscorer ", d_topscorer);
    console.log("Topassist ", d_topassist);
    console.log("Team most goals ", d_team_most_goals);
    console.log("Goalkeeper cleansheet ", d_goalkeeper_cleansheet);
    let stats = data.data.stats.data;
    seasonYear.innerHTML += `\t ${data.data.name}`;
    topscorer.innerHTML += `${d_topscorer}`;
    topassist.innerHTML += `${d_topassist}`;
    team_most_goals.innerHTML += `${d_team_most_goals}`;
    goalkeeper_cleansheet.innerHTML += `${d_goalkeeper_cleansheet}`;
    const ctx1 = document.getElementById('js-graph1');
    let draws = (100 - stats.win_percentage.all - stats.defeat_percentage.all);
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Wins', 'Draws', 'Defeats'],
            datasets: [{
                label: '% Matches',
                data: [stats.win_percentage.all, draws, stats.defeat_percentage.all],
                backgroundColor: [
                    'rgba(142, 246, 6, 0.62)',
                    'rgba(255, 83, 0, 0.62)',
                    'rgba(255, 0, 0, 0.62)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Matches',
                    fontSize: 20,
                    fontColor: 'black'
                }
            }
        }
    });
    const ctx2 = document.getElementById('js-graph2');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Yellow', 'Red'],
            datasets: [{
                label: '# Cards',
                data: [stats.number_of_yellowcards, stats.number_of_redcards],
                backgroundColor: [
                    'rgba(243, 232, 26, 1)',
                    'rgba(255, 0, 0, 0.62)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total of cards',
                    fontSize: 20,
                    fontColor: 'black'
                }
            }
        }
    });
};

let getData = async () => {
    // Met de fetch API proberen we de data op te halen.
    const ENDPOINT_1 = `https://soccer.sportmonks.com/api/v2.0/standings/season/18369?api_token=${api1}`;
    const ENDPOINT_2 = `https://soccer.sportmonks.com/api/v2.0/leagues/501?api_token=${api1}`;
    const ENDPOINT_3 = `https://soccer.sportmonks.com/api/v2.0/seasons/18369?api_token=${api1}&include=stats`;

    const request1 = await fetch(ENDPOINT_1);
    const data1 = await request1.json();
    const standings = data1.data[0].standings.data;
    console.log("Standings", standings);
    showResults(standings);

    const request2 = await fetch(ENDPOINT_2);
    const data2 = await request2.json();
    console.log("League and logo", data2);
    // showLeagueAndLogo(data2.data);

    const request3 = await fetch(ENDPOINT_3);
    const data3 = await request3.json();
    // console.log("Speler naam", data3.data.commom_name);
    console.log("Season stats", data3.data.stats.data);
    console.log("Season overview", data3.data.name);


    let api_season_topscorer = data3.data.stats.data.season_topscorer_id;
    console.log(`WWWW ${api_season_topscorer}`)
    let api_season_topassist = data3.data.stats.data.season_assist_topscorer_id;
    let api_goalkeeper_cleansheet = data3.data.stats.data.goalkeeper_most_cleansheets_id;
    let api_team_most_goals = data3.data.stats.data.team_with_most_goals_id;


    const ENDPOINT_4 = `https://soccer.sportmonks.com/api/v2.0/players/${api_season_topscorer}?api_token=${api1}`;
    const ENDPOINT_5 = `https://soccer.sportmonks.com/api/v2.0/players/${api_season_topassist}?api_token=${api1}`;
    const ENDPOINT_6 = `https://soccer.sportmonks.com/api/v2.0/teams/${api_team_most_goals}?api_token=${api1}`;
    const ENDPOINT_7 = `https://soccer.sportmonks.com/api/v2.0/players/${api_goalkeeper_cleansheet}?api_token=${api1}`;
    const request4 = await fetch(ENDPOINT_4);
    const request5 = await fetch(ENDPOINT_5);
    const request6 = await fetch(ENDPOINT_6);
    const request7 = await fetch(ENDPOINT_7);
    const data4 = await request4.json();
    const data5 = await request5.json();
    const data6 = await request6.json();
    const data7 = await request7.json();
    console.log("Top_scorer naam", data4.data.common_name);
    console.log("Top_assist naam", data5.data.common_name);
    console.log("Team most goals ", data6.data.name);
    console.log("Goalkeeper cleansheets", data7.data.common_name);
    data_season_topscorer = data4.data.common_name
    data_season_topassist = data5.data.common_name
    data_team_most_goals = data6.data.name
    data_goalkeeper_cleansheet = data7.data.common_name
    showLeagueStats(data3, data_season_topscorer, data_season_topassist, data_team_most_goals, data_goalkeeper_cleansheet);
};

document.addEventListener('DOMContentLoaded', function () {
    getData();
});