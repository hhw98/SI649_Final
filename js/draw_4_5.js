// yipeng begin
var data = []
var female_name_data = []
var male_name_data = []
var total_name_data = []
var total_name_data_divide = []
var state_name = ["HI", "AK", "FL", "NH", "MI", "VT", "ME", "RI", "NY", "PA", "NJ", "DE", "MD", "VA", "WV", "OH", "IN", "IL", "CT", "WI", "NC", "DC", "MA", "TN", "AR", "MO", "GA", "SC", "KY", "AL", "LS", "MS", "IA", "MN", "OK", "TX", "NM", "KS", "NE", "SD", "ND", "WY", "MT", "CO", "ID", "UT", "AZ", "NV", "OR", "WA", "CA"];
state_name.sort();
console.log(state_name);
$(document).ready(function () {
    loadData();
});
// yipeng end


// Loads the CSV file 
function loadData() {

    // yipeng begin
        state_code = "";
        show_selected()
        document.getElementById('id_of_select').addEventListener('change', show_selected);
        document.getElementById('name_button').addEventListener('click', show_selected);
    //yipeng end
}


function show_selected() {
    //yipeng begin
    state_code = 'AK'
    name = 'Mary'
    state_code = state_name[d3.select("#id_of_select").node().value];
    name = document.getElementById("nameText").value;
    console.log(state_code, name)
    $("#v4").empty();
    $("#v5").empty();
    handle_data(state_code, name)
    //yipeng end

}

//yipeng
function handle_data(state_code, name) {
    d3.csv("data_cyp/namesbystate/" + state_code +".TXT", function(d){
        data = []
        female_name_data = []
        male_name_data = []
        total_name_data = []
        total_name_data_divide = []
        data = d;
        

        for (var i in data){
            if (data[i]["name"] == name && data[i]["gender"] == "F"){
                female_name_data.push([ parseInt(data[i]["year"], 10), parseInt(data[i]["number"], 10)]);
            }
            if (data[i]["name"] == name && data[i]["gender"] == "M"){
                male_name_data.push([ parseInt(data[i]["year"], 10), parseInt(data[i]["number"], 10)]);
            }
        }

        total_name_data = JSON.parse(JSON.stringify( female_name_data ));
        total_name_data_divide = JSON.parse(JSON.stringify( female_name_data ));
        for (var i in total_name_data_divide){
            total_name_data_divide[i].push(0);
        }
        // then add male data
        for (var i in male_name_data){
            var check = 0;
            for (var j in total_name_data){
                if (male_name_data[i][0] == total_name_data[j][0]){
                    total_name_data[j][1] += male_name_data[i][1];
                    total_name_data_divide[j][2] += male_name_data[i][1];
                    check = 1;
                }
            }
            //if not found, then new year, still need to add
            if (check == 0){
                total_name_data.push(male_name_data[i]);
                total_name_data_divide.push([male_name_data[i][0], 0, male_name_data[i][1]])
                check = 0;
            }
        }
        
        // NOTICE, DATA STORED HERE, SO VISUALIZATION START FROM HERE
        // First sort the data by year
        male_name_data.sort(function(a, b){return a[0] - b[0]});
        female_name_data.sort(function(a, b){return a[0] - b[0]});
        total_name_data.sort(function(a, b){return a[0] - b[0]});
        total_name_data_divide.sort(function(a, b){return a[0] - b[0]});
        // console.log(total_name_data_divide);
        // Do line chart
        line_chart(state_code, name);
        // Do bar chart
        bar_chart(state_code, name);
        
    });
}

//yipeng
function line_chart(state_code, name){
    data = total_name_data;

    o_width = parseInt($("#v4").attr("width"));
    o_height = parseInt($("#v4").attr("height"));

    var svg = d3.select("#v4")
    .attr("width", o_width)
    .attr("height", o_height),
    margin = {top: 50, right: 20, bottom: 110, left: 40},
    margin2 = {top: 430, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    height2 = +svg.attr("height") - margin2.top - margin2.bottom;

    var parseDate = d3.timeParse("%Y");

    var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

    var xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);

    var brush = d3.brushX()
        .extent([[0, 0], [width, height2]])
        .on("brush end", brushed);

    var zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed);

        var line = d3.line()
            .x(function (d) { return x(parseDate(d[0])); })
            .y(function (d) { return y(d[1]); });

        var line2 = d3.line()
            .x(function (d) { return x2(parseDate(d[0])); })
            .y(function (d) { return y2(d[1]); });

        var area = d3.area()
            .x(function(d) { return x(parseDate(d[0])); })
            .y0(height)
            .y1(function(d) { return y(d[1]); });


        var Line_chart = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("clip-path", "url(#clip)");

        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


    x.domain([d3.min(data, function(d) {return parseDate(d[0]); }), d3.max(data, function(d) {return parseDate(d[0]); })]);
    y.domain([0, d3.max(data, function (d) { return d[1]; })]);
    x2.domain(x.domain());
    y2.domain(y.domain());

        focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);

        Line_chart.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        Line_chart.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        context.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line2);


    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());

    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

    svg.append("text").attr("x",width/2.5).attr("y", 30).attr("class","title").attr("style", "font-size : 20").text("State: " + state_code + ", Name: " + name);

    function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    Line_chart.select(".line").attr("d", line);
    Line_chart.select(".area").attr("d", area);
    Line_chart.select(".text")
    .attr("x", function(d) { return x(parseDate(d[0])) - 4; })
    .attr("y", function(d) { if(y(d[1]) - 20 < y(70)){
        return y(d[1]) + 20} else { return y(d[1]) - 15; }})	
    .text(function(d) { return d[1]; });

    focus.select(".axis--x").call(xAxis);
    svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
    }

    function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    Line_chart.select(".line").attr("d", line);
    Line_chart.select(".area").attr("d", area);	

    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
    }
    
}

//yipeng
function bar_chart(state_code, name){
    data = total_name_data_divide;
    o_width = parseInt($("#v4").attr("width"));
    o_height = parseInt($("#v4").attr("height"));
    var margin = {top: 20, right: 30, bottom: 40, left: 30},
    width = o_width - margin.left - margin.right,
    height = o_height - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, 0.8 * width]);


y = d3.scaleTime().range([0, height]);

var xAxis = d3.axisBottom(x)
var yAxis = d3.axisLeft(y)
            .tickSize(0)
            .tickPadding(6);


var svg = d3.select("#v5")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
// d3.tsv("data.tsv", type, function(error, data) {
// handle data here.
var parseDate = d3.timeParse("%Y");

y.domain([d3.min(data, function(d) {return parseDate(d[0]); }), d3.max(data, function(d) {return parseDate(d[0]); })]);
x.domain([-1 * d3.max(data, function (d) { return d[1]; }), d3.max(data, function (d) { return d[2]; })]);




  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(Math.min(0, -d[1])); })
      .attr("y", function(d,i) {return y(parseDate(d[0])); })
      .attr("width", function(d) {return Math.abs(x(d[1]) - x(0)); })   
      .attr("height", 3)
      .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div	.html("year: "+d[0]+"</br>" + "num: "+ d[1])	
            .style("left", (d3.event.pageX + 10) + "px")		
            .style("top", (d3.event.pageY - 50) + "px");	
        })					
    .on("mouseout", function(d) {		
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    });

    svg.selectAll(".bar2")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(Math.min(0, d[2])); })
      .attr("y", function(d) { return y(parseDate(d[0])); })
      .attr("width", function(d) {return Math.abs(x(d[2]) - x(0)); })
      .attr("height", 3)
      .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div	.html("year: "+d[0]+"</br>" + "num: "+ d[2])	
            .style("left", (d3.event.pageX + 10) + "px")		
            .style("top", (d3.event.pageY - 50) + "px");	
        })
    .on("mouseout", function(d) {		
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    });		

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);
// });

function type(d) {
  d.value = +d.value;
  return d;
}    
}