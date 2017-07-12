import * as d3 from "d3";
import math from 'mathjs';

// xVals = dates, yVals = data
export function drawline(xVals, yVals, name) {

    let data = []

    for(let i = 0; i <= xVals.length - 1; i++) {
        data.push({ date: xVals[i], yVals: yVals[i] })
    }
    
    console.log(data)

    let svg = d3.select(document.getElementById(name));

    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.line); });
            

    let lr = svg.append("path")
        .datum(data)
        .classed("lr", true)
        .attr("fill", "none")
        .attr("stroke", "lightgreen" )
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);


}

function pointAtX(a, b, x) {
  var slope = (b[1] - a[1]) / (b[0] - a[0])
  var y = a[1] + (x - a[0]) * slope
  return [x, y]
}