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

        var parseDate = d3.timeParse("%b %Y");

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
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.price); });

        var area2 = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x2(d.date); })
            .y0(height2)
            .y1(function(d) { return y2(d.price); });

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
    

            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.price; })]);
            x2.domain(x.domain());
            y2.domain(y.domain());

            focus.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);

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
                .call(zoom);
            
            focus.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 3.5)
                .attr("transform", transform)
                .classed("dot", true)
                

        function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            var s = d3.event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            focus.selectAll('.dot').attr("transform", transform);
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