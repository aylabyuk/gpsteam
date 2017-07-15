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
            .scaleExtent([-1, Infinity])
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
            .ticks(6)
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

        
        let pre, post

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
            
            let A = [ data.lineBefore[0][0], data.lineBefore[0][1] ],
                B = [ data.lineBefore[data.lineBefore.length-1][0], data.lineBefore[data.lineBefore.length-1][1] ],
                p0 = pointAtX(A, B, A[0]),
                p1 = pointAtX(A, B, data.earthquake)

            svg.append("path")
                .classed("lr1", true)
                .attr("fill", "none")
                .attr("stroke", "green" )
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", beforeLine([p0, p1]));

            p1[1] = beforeY(p1[1])
            pre = p1

        }

        // draw the line after earthquake 
        if(data.earthquake != '' && data.lineAfter) {
            let dataAfter = []
            data.map((d) => {
                if(d.date > data.earthquake) {
                    dataAfter.push(d)
                }
            })

            // get the mean
            focusData = [], mean
            dataAfter.map((d) => {
                focusData.push(d.yVal)
            })
            let afmean = math.mean(focusData)

            let minY = y(d3.min(dataAfter, function (d) {
                    return d.yVal - mean;
                })) 
            let maxY = y(d3.max(dataAfter, function (d) {
                    return d.yVal - mean; 
                })) 

            let afterY = d3.scaleLinear()
                .domain([d3.max(dataAfter, function (d) {
                    return d.yVal;
                }) - afmean , d3.min(dataAfter, function (d) {
                    return d.yVal;
                }) - afmean ])
                .range([maxY, minY])

            let afterLine = d3.line()
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return afterY(d[1]); })

            let A = [ data.lineAfter[0][0], data.lineAfter[0][1] ],
                B = [ data.lineAfter[data.lineAfter.length-1][0], data.lineAfter[data.lineAfter.length-1][1] ],
                p0 = pointAtX(A, B, data.earthquake),
                p1 = pointAtX(A, B, B[0])

            
            
            p0[1] = afterY(p0[1])
            post = p0

            let lineMiddle = d3.line()
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return d[1]; })

            
            // get the distance ( final - initial )
            let distance = y.invert(afterY(dataAfter[0].yVal - afmean)) - y.invert(pre[1])
            
            // draw the distance line
            let lr3 = svg.append("path")
                .classed("lr3", true)
                .attr("fill", "none")
                .attr("stroke", "green" )
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", lineMiddle([ pre, [ data.earthquake, afterY(dataAfter[0].yVal - afmean) ] ]));
            

            // append distance label
            if(distance) { console.log('displacement ' + data.name  + ': ' + distance)
            
                let distancelabel = svg.append('text')
                    .attr('x', 1000)
                    .attr('y', 25)
                    .attr('fill', '#000')
                    .classed('distanceLabel', true)
                    .text('displacement: ' + (distance / 10).toFixed(4) + ' cm')
                
                let bbox = distancelabel.node().getBBox();

                let rect = svg.append("rect")
                    .attr("x", bbox.x)
                    .attr("y", bbox.y)
                    .attr("width", bbox.width + 10)
                    .attr("height", bbox.height)
                    .style("fill", "#fff")
                    .style("fill-opacity", "1")
                    .style("stroke", "#000")
                    .style("stroke-width", "1px");
                
                svg.append('text')
                    .attr('x', 1005)
                    .attr('y', 25)
                    .attr('fill', '#000')
                    .classed('distanceLabel', true)
                    .text('displacement: ' + (distance / 10).toFixed(4) + ' cm')
                }


        }

        //append label
        let namelabel = svg.append('text')
            .attr('x', 28)
            .attr('y', 25)
            .attr('fill', '#000')
            .attr("class", "shadow") 
            .classed('namelabel', true)
            .text(data.name.toUpperCase())

        let bbox = namelabel.node().getBBox();

        let rect = svg.append("rect")
            .attr("x", bbox.x)
            .attr("y", bbox.y)
            .attr("width", bbox.width + 10)
            .attr("height", bbox.height)
            .style("fill", "#fff")
            .style("fill-opacity", "1")
            .style("stroke", "#000")
            .style("stroke-width", "1px");

        svg.append('text')
            .attr('x', 33)
            .attr('y', 25)
            .attr('fill', '#000')
            .attr("class", "shadow") 
            .classed('namelabel', true)
            .text(data.name.toUpperCase())

        function pointAtX(a, b, x) {
            var slope = (b[1] - a[1]) / (b[0] - a[0])
            var y = a[1] + (x - a[0]) * slope
            return [x, y]
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
                .attr("stroke", "green" )
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
            svg.select(".lr2")
                .attr("transform", d3.event.transform)
                .attr("stroke-width", 1.5 / d3.event.transform.k);
            svg.select(".lr3")
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