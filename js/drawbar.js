function drawbar(state) {
    var margin = { top: 20, right: 20, bottom: 30, left: 60 },
    width = 940 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	d3.csv("data_sky/"+state+"_bar.txt", function (data) {
		console.log(data)
		var x = d3.scaleBand()
			.domain(data.map(function (d) { return d.name; }))
			.range([0, width])
			.padding(0.1);

		var y = d3.scaleLinear()
			.domain([0, d3.max(data, function (d) { return parseInt(d.num); })])
			.range([height, 0]);

		var svg = d3.select("#bar")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("fill", "#E0D22E")
			.attr("x", function (d) { return x(d.name); })
			.attr("width", x.bandwidth())
			.attr("y", function (d) { return y(parseInt(d.num)); })
			.attr("height", function (d) { return height - y(parseInt(d.num)); });

		// code for Q9 goes here
		// add the x Axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));
		// add the y Axis
		svg.append("g")
			.call(d3.axisLeft(y));
	}); 
}