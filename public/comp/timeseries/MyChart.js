import * as d3 from "d3";
import math from 'mathjs';

export default class MyChart {
    constructor(el, props) {
        this.el = el;
        this.props = props;

    }

    getColor() {
        return d3.scaleOrdinal(d3.schemeCategory20c);
    }

    create(data){

        let styles = this.props.styles

        let svg = d3.select(this.el).append('svg')
            .classed(styles.chartSvg, true)
            .attr("width", 1250)
            .attr("height", 267)
            .attr("id", data.name ),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }

        let zoom = d3.zoom()
            .scaleExtent([0, Infinity])
            .translateExtent([
                [-100, -100],
                [width + 100, height + 100]
            ])
            .on("zoom", zoomed);
        
        //convert yVal to cm
        data.map((d) => {
            d.yVal = d.yVal * 1000
        }) 
        
        let x = d3.scaleLinear()
            .domain([d3.min(data, function (d) {
                return d.date;
            }), d3.max(data, function (d) {
                return d.date;
            })])
            .range([0, width])

        // get the mean
        let focusData = [], mean
        data.map((d) => {
            focusData.push(d.yVal)
        })
        mean = math.mean(focusData)

        let ypercent = (d3.max(data, function (d) { return d.yVal; }) - mean) * 0.05
         
        
        ypercent = 0

        let y = d3.scaleLinear()
            .domain([d3.max(data, function (d) {
                return d.yVal;
            }) - mean + ypercent, d3.min(data, function (d) {
                return d.yVal;
            }) - mean - ypercent])
            .range([0, height]).nice();

        let xAxis = d3.axisBottom(x)
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
            
        svg.call(zoom);

        // plot the data
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
            .datum([ { date: data.earthquake, yVal: -999999 }, { date: data.earthquake, yVal: 999999 } ])
            .classed("eq", true)
            .attr("fill", "none")
            .attr("stroke", "red" )
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);


        // draw the line before earthquake 
        if(data.earthquake != '' && data.lineBefore) {
            let dataBefore = []
            data.map((d) => {
                if(d.date < data.earthquake) {
                    dataBefore.push(d)
                }
            })

            // get the mean
            focusData = [], mean
            dataBefore.map((d) => {
                focusData.push(d.yVal)
            })
            let b4mean = math.mean(focusData)

            let minY = y(d3.min(dataBefore, function (d) {
                    return d.yVal - mean;
                })) 
            let maxY = y(d3.max(dataBefore, function (d) {
                    return d.yVal - mean; 
                })) 

            let beforeY = d3.scaleLinear()
                .domain([d3.max(dataBefore, function (d) {
                    return d.yVal;
                }) - b4mean , d3.min(dataBefore, function (d) {
                    return d.yVal;
                }) - b4mean ])
                .range([maxY, minY])

            let beforeLine = d3.line()
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return beforeY(d[1]); })

            svg.append("path")
                .datum(data.lineBefore)
                .classed("lr1", true)
                .attr("fill", "none")
                .attr("stroke", "lightgreen" )
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", beforeLine);

        }

        // if no earthquake
        if(data.earthquake == '' && data.lineBefore){
            let noEqLine = d3.line()
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); })
            
            svg.append("path")
                .datum(data.lineBefore)
                .classed("lr1", true)
                .attr("fill", "none")
                .attr("stroke", "lightgreen" )
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", noEqLine);

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

            svg.select(".eq")
                .attr("transform", d3.event.transform)
                .attr("stroke-width", 1.5 / d3.event.transform.k);
            svg.select(".lr1")
                .attr("transform", d3.event.transform)
                .attr("stroke-width", 1.5 / d3.event.transform.k);

            gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
            gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));

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