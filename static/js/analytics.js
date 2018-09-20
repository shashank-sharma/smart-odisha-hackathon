// TODO: Make sure of perfect scroll
// TODO: Let user add chart with the given API calls
// TODO: Make it more clean, organized

function getDate(count) {
    let today = new Date();
    let temp = new Date(today);
    temp.setDate(today.getDate() - count);
    today = temp;
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    console.log(today);
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
}

// Mainly for the working of Graph 1
//
// New Complaints
//
function new_complaints() {
    // http://127.0.0.1:8000/api/chart/complaint/?to=2018-01-01
    $.ajax({
        type: "GET",
        url: "/api/chart/complaint?date=" + getDate(0),
        success: function (response) {
            const complaint_stats = document.getElementById('new-complaint-stats');
            let new_complaints_stats = response['complaints'];
            complaint_stats.innerHTML += new_complaints_stats;
            const old_complaints_promise = new Promise((resolve, reject) => {
                $.ajax({
                    type: "GET",
                    url: "/api/chart/complaint?date=" + getDate(1),
                    success: function (response) {
                        resolve(response['complaints']);
                    },
                    error: function () {
                        console.log('Error, Please refresh this page');
                        Materialize.toast('There is some error with website. Please contact Admin', 4000);
                        return false;
                    }
                });
            });
            old_complaints_promise.then((old_complaints_stats) => {
                const complaint_compare = document.getElementById('new-complaint-compare');

                if (new_complaints_stats >= old_complaints_stats) {
                    complaint_compare.innerHTML += '<i class="material-icons icon-position">keyboard_arrow_up</i>';
                } else {
                    complaint_compare.innerHTML += '<i class="material-icons icon-position">keyboard_arrow_down</i>';
                }
                console.log(new_complaints_stats, old_complaints_stats);
                if (old_complaints_stats === 0) {
                    complaint_compare.innerHTML += '100+% from yesterday'
                } else {
                    complaint_compare.innerHTML += (Math.abs(new_complaints_stats - old_complaints_stats) / old_complaints_stats) * 100 + '% from yesterday';
                }
            });

        },
        error: function () {
            console.log('Error, Please refresh this page');
            Materialize.toast('There is some error with website. Please contact Admin', 4000);
        }
    });
}

// TODO: Check edge cases and get exact 1 month of difference
// TODO: Cross check this percentage issue
function total_complaints() {
    $.ajax({
        type: "GET",
        url: "/api/chart/complaint",
        success: function (response) {
            const complaint_stats = document.getElementById('total-complaint-stats');
            complaint_stats.innerHTML += response['complaints'];
            const old_month_stats = new Promise((resolve, reject) => {
                $.ajax({
                    type: "GET",
                    url: "/api/chart/complaint?from=" + getDate(60) + "&to=" + getDate(30),
                    success: function (response) {
                        resolve(response['complaints']);
                    },
                    error: function () {
                        console.log('Error, Please refresh this page');
                        Materialize.toast('There is some error with website. Please contact Admin', 4000);
                        return false;
                    }
                });
            });
            old_month_stats.then((old_data) => {
                const new_month_stats = new Promise((resolve, reject) => {
                    $.ajax({
                        type: "GET",
                        url: "/api/chart/complaint?from=" + getDate(30) + "&to=" + getDate(0),
                        success: function (response) {
                            resolve(response['complaints']);
                        },
                        error: function () {
                            console.log('Error, Please refresh this page');
                            Materialize.toast('There is some error with website. Please contact Admin', 4000);
                            return false;
                        }
                    });
                });

                new_month_stats.then((new_data) => {
                    const complaint_compare = document.getElementById('total-complaint-compare');

                    if (new_data >= old_data) {
                        complaint_compare.innerHTML += '<i class="material-icons icon-position">keyboard_arrow_up</i>';
                    } else {
                        complaint_compare.innerHTML += '<i class="material-icons icon-position">keyboard_arrow_down</i>';
                    }
                    if (old_data === 0) {
                        complaint_compare.innerHTML += '100+% last month'
                    } else {
                        complaint_compare.innerHTML += (Math.abs(new_data - old_data) / old_data) * 100 + '% last month';
                    }
                })
            })
        },
        error: function () {
            console.log('Error, Please refresh this page');
            Materialize.toast('There is some error with website. Please contact Admin', 4000);
            return false;
        }
    });
}


// Update 1 graph (Radar) and 1 Card (trending)
function get_tags(chart) {
    $.ajax({
        type: "GET",
        url: "/api/chart/tags",
        success: function (response) {
            const trending_stats = document.getElementById('trendingtag-complaint-stats');
            trending_stats.innerHTML += response['top'];
            const trending_compare = document.getElementById('trendingtag-complaint-compare');
            trending_compare.innerHTML += 'Total: ' + response['tags'][response['top']];

            let label = [];
            let data = [];
            for (const [key, values] of Object.entries(response['tags'])) {
                label.push(key);
                data.push(values)
            }

            chart.data.datasets[0].data = data;
            chart.data.labels = label;
            chart.update();
        },
        error: function () {
            console.log('Error, Please refresh this page');
            Materialize.toast('There is some error with website. Please contact Admin', 4000);
            return false;
        }
    });
}

// TODO: Think about saving these many functions and do something good. How about Python code ?
function get_week_complaints(chart) {
    const week_one_promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/api/chart/complaint?date=" + getDate(6),
            success: function (response) {
                resolve(response['complaints']);
            },
            error: function () {
                console.log('Error, Please refresh this page');
            }
        });
    });
    const week_two_promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/api/chart/complaint?date=" + getDate(5),
            success: function (response) {
                resolve(response['complaints']);
            },
            error: function () {
                console.log('Error, Please refresh this page');
            }
        });
    });
    const week_three_promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/api/chart/complaint?date=" + getDate(4),
            success: function (response) {
                resolve(response['complaints']);
            },
            error: function () {
                console.log('Error, Please refresh this page');
            }
        });
    });
    const week_four_promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/api/chart/complaint?date=" + getDate(3),
            success: function (response) {
                resolve(response['complaints']);
            },
            error: function () {
                console.log('Error, Please refresh this page');
            }
        });
    });
    const week_five_promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/api/chart/complaint?date=" + getDate(2),
            success: function (response) {
                resolve(response['complaints']);
            },
            error: function () {
                console.log('Error, Please refresh this page');
            }
        });
    });
    const week_six_promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/api/chart/complaint?date=" + getDate(1),
            success: function (response) {
                resolve(response['complaints']);
            },
            error: function () {
                console.log('Error, Please refresh this page');
            }
        });
    });
    const week_seven_promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/api/chart/complaint?date=" + getDate(0),
            success: function (response) {
                resolve(response['complaints']);
            },
            error: function () {
                console.log('Error, Please refresh this page');
            }
        });
    });
    Promise.all([week_one_promise, week_two_promise, week_three_promise, week_four_promise, week_five_promise,
        week_six_promise, week_seven_promise]).then(function (data) {
        console.log(data);
        chart.data.labels = [getDate(6), getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate(0)];
        chart.data.datasets[0].data = data;
        chart.update();
        return data;
    })
}

function get_gender(chart) {
    $.ajax({
        type: "GET",
        url: "/api/chart/week",
        success: function (response) {
            const label = [];

            const female_data = [];
            const male_data = [];
            const others_data = [];

            for(let i=0; i<response['data'].length; i++) {
                label.push(response['data'][i]['week']);
                female_data.push(response['data'][i]['female']);
                male_data.push(response['data'][i]['male']);
                others_data.push(response['data'][i]['others']);
            }

            chart.data.label = label;
            chart.data.datasets[0].data = male_data;
            chart.data.datasets[1].data = female_data;
            chart.data.datasets[2].data = others_data;
            chart.update();
        },
        error: function () {
            console.log('Error, Please refresh this page');
        }
    });
}

// CHART //



const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Indore", "Bhopal", "Lucknow", "Gandhi Nagar", "Ahemdabad", "Vadodra"],
        datasets: [{
            label: '# of Complaints',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    show: true,
                    color: "rgba(0,0,0,0)",
                    zeroLineColor: "rgba(39,170,225,1)"
                },
                scaleLabel: {
                    display: true,
                    fontFamily: "Helvetica",
                    fontColor: "#27AAE1"
                },
            }],
            yAxes: [{
                gridLines: {
                    show: true,
                    color: "rgba(0,0,0,0)",
                    zeroLineColor: "rgba(39,170,225,1)"
                },
                ticks: {
                    beginAtZero: true,
                    // max: 3,
                    // min: 0,
                    // stepSize: 0.9
                },
            }]
        }
    }
});


const CHART = document.getElementById("Chart");


const morningChart = new Chart(CHART, {

    type: 'pie',

    data: {

        labels: ["MON", "TUE", "WED", "THU", "FR", "SAT", "SUN",],

        datasets: [

            {

                label: "dataset",

                fill: true,

                /*  lineTension: 0.2, */

                backgroundColor: [

                    'rgba(255, 99, 132, 0.6)',

                    'rgba(54, 162, 235, 0.6)',

                    'rgba(255, 206, 86, 0.6)',

                    'rgba(75, 192, 192, 0.6)',

                    'rgba(153, 102, 255, 0.6)',

                    'rgba(255, 159, 64, 0.6)',

                    'rgba(255, 99, 132, 0.6)'

                ],

                borderColor: "rgba(39,170,225,100)",

                borderCapStyle: 'butt',

                borderDash: [],

                borderDashOffset: 0.0,

                borderJoinStyle: 'miter',

                pointBorderColor: "rgba(39,170,225,100)",

                pointBackgroundColor: "#fff",

                pointBorderWidth: 5,

                pointHoverRadius: 5,

                pointHoverBackgroundColor: "rgba(75,192,192,1)",

                pointHoverBorderColor: "rgba(220,220,220,1)",

                pointHoverBorderWidth: 2,

                pointRadius: 1,

                pointHitRadius: 10,

                data: [1, 2, 5, 3, 4, 2, 3],

                spanGaps: false,

            },

        ],


    },

    options: {
        legend: {
            position: 'top',
            //  display:false
        },
        scales: {
            ticks: {
                beginAtZero: true
            },


        },

    },

});


const lineCHART = document.getElementById("Line_chart");


const morning_Chart = new Chart(lineCHART, {
    type: 'line',
    data: {
        labels: ["2018-03-23", "2018-03-24", "2018-03-25", "2018-03-26", "2018-03-27", "2018-03-28", "2018-03-29"],
        datasets: [
            {
                label: "Complaints",
                fill: true,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderColor: "white",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "#00acc1",
                pointBorderWidth: 2,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: [0, 0, 0, 0, 0, 0, 0],
                spanGaps: false
            },
            // {
            //     label: "Female",
            //     fill: true,
            //     /*  lineTension: 0.2, */
            //     backgroundColor: "rgba(255, 255, 255, 0.3)",
            //     borderColor: "white",
            //     borderCapStyle: 'butt',
            //     borderDash: [],
            //     borderDashOffset: 0.0,
            //     borderJoinStyle: 'miter',
            //     pointBorderColor: "black",
            //     pointBackgroundColor: "#fff",
            //     pointBorderWidth: 3,
            //     pointHoverRadius: 3,
            //     pointHoverBackgroundColor: "rgba(75,192,192,1)",
            //     pointHoverBorderColor: "rgba(220,220,220,1)",
            //     pointHoverBorderWidth: 2,
            //     pointRadius: 1,
            //     pointHitRadius: 10,
            //     data: [1.7, 2.8, 5.5, 3.9, 4.5, 2.5, 3.5],
            //     spanGaps: false
            // }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    show: false,
                    color: "rgba(0,0,0,0)",
                    zeroLineColor: "rgba(39,170,225,1)"
                },
                ticks: {
                    fontColor: 'white'
                },
                scaleLabel: {
                    display: true,
                    fontFamily: "Helvetica",
                    fontColor: "#27AAE1"
                }
            }],
            yAxes: [{
                gridLines: {
                    show: true,
                    color: "lightcyan",
                    zeroLineColor: "rgba(39,170,225,1)"
                },
                ticks: {
                    beginAtZero: true,
                    fontColor: 'white'
                }
            }]
        }
    }
});

// TODO: Change it to week wise (It will be better I guess ?)
const radar_chart = document.getElementById("radarChart");

const radarChart = new Chart(radar_chart, {
    type: 'radar',
    data: {
        labels: ["-", "-", "-", "-", "-"],
        datasets: [
            {
                label: "dataset",
                fill: true,
                backgroundColor: "rgba(0,105,92,0.4)",
                borderColor: "white",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "#00bfa5",
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: [0, 0, 0, 0, 0],
                spanGaps: false,
            },
        ],
    },
    options: {
        scaleShowLabels: false,
        legend: {
            position: 'top',
            display: false,
        },
        scales: {
            ticks: {
                beginAtZero: true
            },
        },
    },
});

const linear_chart = document.getElementById("linearChart");
const linearChart = new Chart(linear_chart, {
    type: 'line',
    data: {
        labels: ["MON", "TUE", "WED", "THU", "FR", "SAT", "SUN",],
        datasets: [
            {
                label: "male",
                fill: false,
                lineTension: 0.2,
                borderColor: "red",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "rgba(0,105,92,1)",
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: [0, 0, 0, 0, 0, 0, 0],
                spanGaps: false
            },
            {
                label: "female",
                fill: false,
                lineTension: 0.2,
                borderColor: "blue",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "rgba(0,105,92,1)",
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: [0, 0, 0, 0, 0, 0, 0],
                spanGaps: false
            },
            {
                label: "others",
                fill: false,
                lineTension: 0.2,
                borderColor: "yellow",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "rgba(0,105,92,1)",
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: [0, 0, 0, 0, 0, 0, 0],
                spanGaps: false
            }
        ],
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    show: false,
                    color: "rgba(0,0,0,0)",
                    zeroLineColor: "rgba(39,170,225,1)"
                },
                ticks: {
                    fontColor: 'white'
                },
                scaleLabel: {
                    display: true,
                    fontFamily: "Helvetica",
                    fontColor: "#27AAE1"
                }
            }],
            yAxes: [{
                gridLines: {
                    show: true,
                    color: "lightcyan",
                    zeroLineColor: "white"
                },
                ticks: {
                    beginAtZero: true,
                    fontColor: 'white'
                }
            }]
        },
        animation: {
            animateRotate: false,
            animateScale: true
        }

    }
});

Chart.defaults.global.defaultFontColor = '#fff';

$(document).ready(function () {
    new_complaints();
    total_complaints();
    get_tags(radarChart);
    get_week_complaints(morning_Chart);
    get_gender(linearChart);
});