
var data_luke=[]
var yr=2000

d3.csv("data/top_names.csv", function (d) {
        data_luke = d;
        data_luke.forEach(function (item) {
            item.n = parseInt(item.n);
        });
    })  
    
    var indic = false
    data_luke.forEach(function (d) {
        if(yr===d.Year){
            indic=true
        }
        }
    )

    var t = d3.select("#v6").selectAll("text")
    //if(indic) {

    d3.select("#v6").append("text").text(yr).attr("fill","black").attr("font-size", "40px").attr("x",150).attr("y",80).attr("font-weight", "bold")

    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.a1)}).attr("fill","black").attr("font-size", "20px").attr("x",100).attr("y",120).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b1)}).attr("fill","black").attr("font-size", "20px").attr("x",100).attr("y",142).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b2)}).attr("fill","black").attr("font-size", "20px").attr("x",100).attr("y",164).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b3)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",186).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b4)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",208).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b5)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",230).attr("font-weight", "bold")

    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.a2)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",270).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w1)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",292).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w2)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",314).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w3)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",336).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w4)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",358).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w5)}).attr("fill","black").attr("font-size", "20px").attr("x",150).attr("y",380).attr("font-weight", "bold")

function load_perc(yr) {

    $("#v6").empty();
    //yr = d3.select("#searchbar_6").property("value")

    d3.csv("data/top_names.csv", function (d) {
        data_luke = d;
        data_luke.forEach(function (item) {
            item.n = parseInt(item.n);
        });
    })  
    
    var indic = false
    data_luke.forEach(function (d) {
        if(yr===d.Year){
            indic=true
        }
        }
    )

    var t = d3.select("#v6").selectAll("text")
    //if(indic) {

    d3.select("#v6").append("text").text(yr).attr("fill","black").attr("font-size", "40px").attr("x",180).attr("y",80).attr("font-weight", "bold")

    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.a1)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",120).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b1)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",142).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b2)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",164).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b3)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",186).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b4)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",208).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.b5)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",230).attr("font-weight", "bold")

    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.a2)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",270).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w1)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",292).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w2)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",314).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w3)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",336).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w4)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",358).attr("font-weight", "bold")
    t.data(data_luke).enter().append("text").filter(function(d) { return d.Year ===yr }).text(function(d){return(d.w5)}).attr("fill","black").attr("font-size", "20px").attr("x",80).attr("y",380).attr("font-weight", "bold")
//} else {
    //t.data(data_luke).enter().append("text").text(function(d){return("Query unavailable. Please search for a year between 1881 and 2017.")}).attr("fill","black").attr("font-size", "20px").attr("x",20).attr("y",20)
//}
}