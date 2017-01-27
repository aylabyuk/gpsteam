import React, {Component} from 'react';
import * as d3 from "d3";
import  Chart  from 'd3act'
import { mydata } from './m/mock'

class TimeSeries extends Component {
  constructor(props) {
        super(props);

        this.state = {
            data: mydata
        };
    }

    render() {
        return (
            <div>
                <h2>Custom Chart</h2>
                <Chart
                    type={"custom"}
                    customChart={MyCustomChart}
                    data={this.state.data}
                />
            </div>
        );
    }
}

class MyCustomChart {
    constructor(el, props) {
        this.el = el;
        this.props = props;
    }


    getColor() {
        return d3.scaleOrdinal(d3.schemeCategory20c);
    }

    create(data) {
       var svg = d3.select(this.el).append('svg').attr('width', 960)
            svg.attr('height', 500)
            
       var margin = {top: 20, right: 20, bottom: 110, left: 40},
            margin2 = {top: 430, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            height2 = +svg.attr("height") - margin2.top - margin2.bottom;

        var parseDate = d3.timeParse("%b %d %Y");
        var formatDate = d3.timeFormat("%b %d")

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

        var area = d3.area()
            .curve(d3.curveLinear)
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.price); });

        var area2 = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x2(d.date); })
            .y0(height2)
            .y(function(d) { return y2(d.price); });

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
    
        var bisectDate = d3.bisector(function(d) { return d.date; }).left;

            var maxY = d3.max(data, function(d) { return d.price; });

            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, maxY + maxY * 0.05]);
            x2.domain(x.domain());
            y2.domain(y.domain());


            focus.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "area")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", area);

            focus.append("g")
                .attr("class", "scat")


            focus.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            focus.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis)

            context.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", area2);

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
                .style("fill", "none")
                .style("pointer-events", "all")
                .on("mouseover", function() { foc.style("display", null); })
                .on("mouseout", function() { foc.style("display", "none"); })
                .on("mousemove", mousemove)
                .call(zoom);
            
            focus.select(".scat")
                .selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 3.5)
                .attr("transform", transform)
                .classed("dot", true)

            //TOOLTIP

            var foc = focus.select(".scat")
                .append("g")
                .attr("class", "tooltipContainer")

                // append the x line
                foc.append("line")
                    .attr("class", "x")
                    .style("stroke", "blue")
                    .style("stroke-dasharray", "3,3")
                    .style("opacity", 0.5)
                    .attr("y1", 0)
                    .attr("y2", height);

                // append the y line
                foc.append("line")
                    .attr("class", "y")
                    .style("stroke", "blue")
                    .style("stroke-dasharray", "3,3")
                    .style("opacity", 0.5)
                    .attr("x1", width)
                    .attr("x2", width);

                // append the circle at the intersection
                foc.append("circle")
                    .attr("class", "y")
                    .style("fill", "none")
                    .style("stroke", "blue")
                    .attr("r", 4);

                // place the value at the intersection
                foc.append("text")
                    .attr("class", "y1")
                    .style("stroke", "white")
                    .style("stroke-width", "3.5px")
                    .style("opacity", 0.8)
                    .attr("dx", 8)
                    .attr("dy", "-.3em");
                foc.append("text")
                    .attr("class", "y2")
                    .attr("dx", 8)
                    .attr("dy", "-.3em");

                // place the date at the intersection
                foc.append("text")
                    .attr("class", "y3")
                    .style("stroke", "white")
                    .style("stroke-width", "3.5px")
                    .style("opacity", 0.8)
                    .attr("dx", 8)
                    .attr("dy", "1em");
                foc.append("text")
                    .attr("class", "y4")
                    .attr("dx", 8)
                    .attr("dy", "1em");
                
                    

        function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(data, x0, 1),
                    d0 = data[i - 1],
                    d1 = data[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                focus.selectAll('.tooltipContainer').attr("display", "block");   
                 
                foc.select("circle.y")
                    .attr("transform",
                        "translate(" + x(d.date) + "," +
                                        y(d.price) + ")");

                foc.select("text.y1")
                    .attr("transform",
                        "translate(" + x(d.date) + "," +
                                        y(d.price) + ")")
                    .text(d.price);

                foc.select("text.y2")
                    .attr("transform",
                        "translate(" + x(d.date) + "," +
                                        y(d.price) + ")")
                    .text(d.price);

                foc.select("text.y3")
                    .attr("transform",
                        "translate(" + x(d.date) + "," +
                                        y(d.price) + ")")
                    .text(formatDate(d.date));

                foc.select("text.y4")
                    .attr("transform",
                        "translate(" + x(d.date) + "," +
                                        y(d.price) + ")")
                    .text(formatDate(d.date));

                foc.select(".x")
                    .attr("transform",
                        "translate(" + x(d.date) + "," +
                                        y(d.price) + ")")
                            .attr("y2", height - y(d.price));

                foc.select(".y")
                    .attr("transform",
                        "translate(" + width * -1 + "," +
                                        y(d.price) + ")")
                            .attr("x2", width + width);
            }
            //TOOLTIP
                

        function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            var s = d3.event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            focus.selectAll('.dot').attr("transform", transform);
            focus.selectAll('.tooltipContainer').attr("display", "none");
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));
        }

        function zoomed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            var t = d3.event.transform;
            x.domain(t.rescaleX(x2).domain());
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            focus.selectAll('.dot').attr("transform", transform);
            focus.selectAll('.tooltipContainer').attr("display", "none");
            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
            
        }

        function type(d) {
            d.date = parseDate(d.date);
            d.price = +d.price;
            return d;
        }

        function transform(d) {
            return "translate(" + x(d['date']) + "," + y(d['price'])  + ")";
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

export default TimeSeries;