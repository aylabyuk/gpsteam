import * as d3 from "d3";
import math from 'mathjs';

export default class MyCustomChart {
    constructor(el, props) {
        this.el = el;
        this.props = props;

    }

    getColor() {
        return d3.scaleOrdinal(d3.schemeCategory20c);
    }

    create(data) {

        // console.log(data)
    
        let styles = this.props.styles

        let svg = d3.select(this.el).append('svg')
            .classed(styles.chartSvg, true)
            .attr("width", 1250)
            .attr("height", 267)
            .attr("id", data[0].name ),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }

        let zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([
                [-100, -100],
                [width + 90, height + 100]
            ])
            .on("zoom", zoomed);

        //convert yVal to mm
        data.map((d) => {
            d.yVal = d.yVal * 1000
        }) 

        

        let xallowance = (d3.max(data, function (d) { return d.date;}) - d3.min(data, function (d) {return d.date;})) * .03

        let x = d3.scaleLinear()
            .domain([d3.min(data, function (d) {
                return d.date - xallowance;
            }), d3.max(data, function (d) {
                return d.date + xallowance;
            })])
            .range([margin.left, width - margin.right]).nice();
        
        // get the mean
        let focusData = [], mean
        data.map((d) => {
            focusData.push(d.yVal)
        })
        mean = math.mean(focusData)

        let ypercent = (d3.max(data, function (d) { return d.yVal; }) - mean) * 0.05

        let y = d3.scaleLinear()
            .domain([d3.max(data, function (d) {
                return d.yVal;
            }) - mean + ypercent, d3.min(data, function (d) {
                return d.yVal;
            }) - mean - ypercent])
            .range([margin.top, height - margin.bottom]).nice();

        let xAxis = d3.axisBottom(x)
            // .ticks((width + 2) / (height + 2) * 10)
            .tickSize(height)
            .tickPadding(-10)
            .tickFormat(d3.format(" "));

        let yAxis = d3.axisRight(y)
            .ticks(4)
            .tickSize(width)
            .tickPadding(8 - width);

        let view = svg.append("rect")
            .attr("class", styles.view)
            .attr("x", 0.5)
            .attr("y", 0.5)
            .attr("width", width - 1)
            .attr("height", height - 1);

        let gX = svg.append("g")
            .attr("class", styles.axis + " axis--x")
            .call(xAxis);

        let gY = svg.append("g")
            .attr("class", styles.axis + " axis--y")
            .call(yAxis);

        d3.select("." + data[0].name)
            .on("click", resetted);

        svg.call(zoom);

        //draw the dots
        let dots = svg.append("g")
            .classed('dots', true)
            .selectAll(styles.dot)
            .data(data)
            .enter().append("circle")
            .classed(styles.dot, true)
            .attr("r", 4)
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.yVal - mean);
            })
            .style("opacity", 1)
            .attr("fill", "white")
            .attr("stroke-width", 2)
            .attr("stroke", "blue");

        // draw earthquake line
        let line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.yVal); })

        let eq = svg.append("path")
            .datum([ { date: data.earthquake, yVal: -10000 }, { date: data.earthquake, yVal: 10000 } ])
            .classed("eq", true)
            .attr("fill", "none")
            .attr("stroke", "red" )
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);


        // PROBLEM: linear lines has different perspective (x, y) than the scatter plot

        let dataBeforeEarthquake = []
        let dataAfterEarthquake = []

        data.map((d) => {
            if(d.date <= data.earthquake) { dataBeforeEarthquake.push(d) } 
        })

        data.map((d) => {
            if(d.date > data.earthquake) { dataBeforeEarthquake.push(d) } 
        })

        let lineX = d3.scaleLinear()
            .domain(d3.extent(dataBeforeEarthquake, function(d) { return d.date }))

        focusData = [], mean
        dataBeforeEarthquake.map((d) => {
            focusData.push(d.yVal)
        })
        mean = math.mean(focusData)

        let lineY = d3.scaleLinear()
            .domain([d3.max(dataBeforeEarthquake, function (d) {
                return d.yVal;
            }) - mean + ypercent, d3.min(dataBeforeEarthquake, function (d) {
                return d.yVal;
            }) - mean - ypercent])
            .range([margin.top, height - margin.bottom]).nice();

        // let lineY = d3.scaleLinear()
        //     .domain(d3.extent(dataBeforeEarthquake, function(d) { return d.yVal }))

        let lineXAfter = d3.scaleLinear()
            .domain(d3.extent(dataAfterEarthquake, function(d) { return d.date }))

        let lineYAfter = d3.scaleLinear()
            .domain(d3.extent(dataAfterEarthquake, function(d) { return d.yVal }))
        
        if(data.lines.length == 2) {

            // DRAW LINE 1
            // console.log(data.lines[0])
            let len = data.lines[1].length-1

            let A = [ data.lines[1][0].date, data.lines[1][0].yVal ]
            let B = [ data.lines[1][len].date, data.lines[1][len].yVal ]
            let p0 = pointAtX(A, B, A[0])
            let p1 = pointAtX(A, B, data.earthquake)

            let line1 = d3.line()
                .x(function(d) { return lineX(d[0]); })
                .y(function(d) { return lineY(d[1]); })

            let lr2 = svg.append("path")
                .datum([p0, p1])
                .classed("lr2", true)
                .attr("fill", "none")
                .attr("stroke", "lightgreen" )
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line1);
            
            // DRAW LINE 2
            // len = data.lines[1].length-1

            //  A = [ data.lines[1][0].date, data.lines[1][0].yVal ]
            //  B = [ data.lines[1][len].date, data.lines[1][len].yVal ]
            //  p0 = pointAtX(A, B, A[0])
            //  p1 = pointAtX(A, B, data.earthquake)

            // let line2 = d3.line()
            //     .x(function(d) { return lineXAfter(d[0]); })
            //     .y(function(d) { return lineYAfter(d[1]); })

            // let lr3 = svg.append("path")
            //     .datum([p0, p1])
            //     .classed("lr3", true)
            //     .attr("fill", "none")
            //     .attr("stroke", "lightgreen" )
            //     .attr("stroke-linejoin", "round")
            //     .attr("stroke-linecap", "round")
            //     .attr("stroke-width", 1.5)
            //     .attr("d", line2);
        }
        
        function pointAtX(a, b, x) {
            var slope = (b[1] - a[1]) / (b[0] - a[0])
            var y = a[1] + (x - a[0]) * slope
            return [x, y]
        }

        function zoomed() {
            view.attr("transform", d3.event.transform);
            svg.select(".dots")
                .attr("transform", d3.event.transform);
            svg.selectAll(".dots circle").attr("r", function () {
                return (4 / d3.event.transform.k);
            }).attr("stroke-width", function () {
                return (2 / d3.event.transform.k);
            });
            // svg.select(".lr")
            //     .attr("transform", d3.event.transform)
            //     .attr("stroke-width", 1.5 / d3.event.transform.k);
            svg.select(".lr2")
                .attr("transform", d3.event.transform)
                .attr("stroke-width", 1.5 / d3.event.transform.k);
            svg.select(".lr3")
                .attr("transform", d3.event.transform)
                .attr("stroke-width", 1.5 / d3.event.transform.k);
            svg.select(".eq")
                .attr("transform", d3.event.transform)
                .attr("stroke-width", 1.5 / d3.event.transform.k);
            gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
            gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));

        }

        function resetted() {
            svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        }
    }

    update(data) {

        d3.select(this.el).select('svg').remove();
        this.create(data);

    }

    unmount() {
        this.el.remove();
    }
}