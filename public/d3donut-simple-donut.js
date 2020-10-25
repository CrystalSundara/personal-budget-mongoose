
// Example from https://bl.ocks.org/steveharoz/0638d230c133da1de385

function getBudget() {
    axios.get('/budget')
    .then(function (res) {
        console.log(res.data);



var data = res.data;

console.log(data);

var width = 800,
    height = 250,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
.range(['#790149',
        '#005Fcc',
        '#00EBC1',
        '#A700FC',
        '#FF6E3A',
        '#FFDC3D',
        '#00B408',
        '#003D30',]);

        
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
    return d.budget;
});



var svg = d3.select("#d3Chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
        return color(d.data.title);
    });

    g.append("text")
        .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
    })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
        return d.data.budget;
    });
});
};

getBudget();