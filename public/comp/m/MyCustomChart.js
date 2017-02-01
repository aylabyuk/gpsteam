import * as d3 from "d3";
import math from 'mathjs'

export default class MyCustomChart {
        constructor(el, props) {
            this.el = el;
            this.props = props;
        }


        getColor() {
            return d3.scaleOrdinal(d3.schemeCategory20c);
        }

        create(data) {

        var svg = d3.select(this.el).append('svg')
            .attr("width", 600)
            .attr("height", 200),
        width = +svg.attr("width"),
        height = +svg.attr("height");

        var margin = {top: 0, right: 0, bottom: 0, left: 0}

        var zoom = d3.zoom()
            .scaleExtent([1, 1000])
            .translateExtent([[-100, -100], [width + 90, height + 100]])
            .on("zoom", zoomed);

        // get the mean
        let focusData = []
        this.props.data.map((d) => {
            focusData.push(d.east)
        })
        var mean = math.mean(focusData)

        var x = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.date - 1; }), d3.max(data, function (d) { return d.date + 1; })])
            .range([margin.left, width - margin.right]).nice();

        var y = d3.scaleLinear()
            .domain([d3.max(data, function (d) { return d.east; }) - mean + 0.05, d3.min(data, function (d) { return d.east; }) - mean - 0.05])
            .range([margin.top, height - margin.bottom]).nice(); 

        var xAxis = d3.axisBottom(x)
            // .ticks((width + 2) / (height + 2) * 10)
            .tickSize(height)
            .tickPadding(-10)
            .tickFormat(d3.format(" "));

        var yAxis = d3.axisRight(y)
            .ticks(4)
            .tickSize(width)
            .tickPadding(8 - width);

        var view = svg.append("rect")
            .attr("class", "view")
            .attr("x", 0.5)
            .attr("y", 0.5)
            .attr("width", width - 1)
            .attr("height", height - 1);

        var gX = svg.append("g")
            .attr("class", "axis axis--x")
            .call(xAxis);

        var gY = svg.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);

        d3.select("button")
            .on("click", resetted);

        svg.call(zoom);

        //draw the dots
        svg.append("g")
                .classed('dots', true)
                .selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .classed("dot", true)
                .attr("r", 8)
                .attr("cx",function(d){return x(d.date);})
                .attr("cy",function(d){return y(d.east - mean);})
                .style("opacity",0.2)
                .attr("fill", "white")
                .attr("stroke-width", 2)
                .attr("stroke", "blue")

        //draw linear regression.
        let myY = []
        let myX = []
        this.props.data.map((d) => {
            myY.push(d.east - mean)
            myX.push(d.date)
        })

        var lr = linearRegression(myY,myX)
        var max = d3.max(data, function (d) { return d.date; });
        var min = d3.min(data, function (d) { return d.date; });
        var myLine = svg.append("g").classed("lr",true).append("svg:line")
            .classed("lrLine", true)
            .attr("x1", x(min))
            .attr("y1", y((min * lr.slope) + lr.intercept))
            .attr("x2", x(max))
            .attr("y2", y( (max * lr.slope) + lr.intercept ))
            .style("stroke", "lightgreen")
            
                

        function zoomed() {
            view.attr("transform", d3.event.transform);
            svg.select(".dots")
                .attr("transform", d3.event.transform );
            svg.selectAll(".dots circle").attr("r", function(){
                return ( 8 / d3.event.transform.k);
            }).attr("stroke-width", function(){
                return ( 2 / d3.event.transform.k);
            });
            svg.select(".lr").attr("transform", d3.event.transform)
                .select(".lrLine").attr("stroke-width", function(){
                    return ( 1 / d3.event.transform.k);
                });              
            gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
            gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
            
        }

        function resetted() {
            svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        }

        function linearRegression(y,x){
                var lr = {};
                var n = y.length;
                var sum_x = 0;
                var sum_y = 0;
                var sum_xy = 0;
                var sum_xx = 0;
                var sum_yy = 0;
                
                for (var i = 0; i < y.length; i++) {
                    
                    sum_x += x[i];
                    sum_y += y[i];
                    sum_xy += (x[i]*y[i]);
                    sum_xx += (x[i]*x[i]);
                    sum_yy += (y[i]*y[i]);
                } 
                
                lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
                lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
                lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
                
                return lr;
        }

/////////////TOOLTIP////////////////

        var focus = svg.append("g") 
            .style("display", "none");
        
        var bisectDate = d3.bisector(function(d) { return d.date; }).left;

        // append the x line
        focus.append("line")
            .attr("class", "x")
            .style("stroke", "red")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height);

        // append the y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "red")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width)
            .attr("x2", width);

        // append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "red")
            .attr("r", 8);

        // place the value at the intersection
        focus.append("text")
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // place the date at the intersection
        focus.append("text")
            .attr("class", "y3")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");
        
        // append the rectangle to capture mouse
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                console.log(data)

            var eastValue = d.east - mean

            focus.select("circle.y")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                                    y(eastValue) + ")");

            focus.select("text.y1")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                                    y(eastValue) + ")")
                .text(d.east);

            focus.select("text.y2")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                                    y(eastValue) + ")")
                .text(d.east);

            focus.select("text.y3")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                                    y(eastValue) + ")")
                .text(d.date);

            focus.select("text.y4")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                                    y(eastValue) + ")")
                .text(d.date);

            focus.select(".x")
                .attr("transform",
                    "translate(" + x(d.date) + "," +
                                    y(eastValue) + ")")
                        .attr("y2", height - y(eastValue));

            focus.select(".y")
                .attr("transform",
                    "translate(" + width * -1 + "," +
                                    y(eastValue) + ")")
                        .attr("x2", width + width);
        }


    }

    update() {
        // We don't want to do anything with
        // updates in this instance.
    }

    unmount() {
        this.el.remove();
    }
}