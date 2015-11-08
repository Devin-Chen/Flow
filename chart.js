/*0, 1, 2*/

var canvas = document.getElementById('updating-chart');
var ctx = canvas.getContext('2d');
var startingData = {
    labels : ["Asia","Environment","Health","Politics","Technology"],
    datasets : [
        {
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: [20, 20, 20, 20, 20]
        }
    ]
};
var myLiveChart = new Chart(ctx).Bar(startingData, {animationSteps: 50});

function update(index, topic) {
    var topicIndex = topic;
    var weight = [0.2, -0.5, -0.1];
    var actionIndex = index;
    var dataLength = myLiveChart.datasets[0].bars.length;
    
    console.log(topicIndex);
    var valueChange = myLiveChart.datasets[0].bars[topicIndex].value * weight[actionIndex];
    myLiveChart.datasets[0].bars[topicIndex].value += valueChange;
    
    for (var i = 0; i < dataLength; i++) {
        if (i != topicIndex) {
            myLiveChart.datasets[0].bars[i].value -= valueChange / (dataLength - 1);
        }
    }
    
    myLiveChart.update();
}
export default update;
