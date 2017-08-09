import * as d3 from "d3";
import math from 'mathjs';
import regression from 'regression';

export default class MyChart {
    constructor(el, props) {
        this.el = el;
        this.props = props;
        this.drawEarthquake = null;

    }

    create(data){

        window.timeseriesUiState = {}
        window.timeseriesUiState.dotsOpacity = 1
        window.timeseriesUiState.earthquake = 0

        let { styles  } = this.props
        let { name } = data

        let svg = d3.select(this.el).append('svg')
            .classed(styles.chartSvg + ' svg'+name, true)
            .attr("width", 1250)
            .attr("height", 267)
            .attr("id", name ),
            width = +svg.attr("width"),
            height = +svg.attr("height");
        
        let view = svg.append("rect")
            .attr("class", styles.view)
            .attr("x", 0.5)
            .attr("y", 0.5)
            .attr("width", width - 1)
            .attr("height", height - 1);

        let gX = svg.append("g")
            .attr("class", styles.axis + " axis--x" + name)

        let gY = svg.append("g")
            .attr("class", styles.axis + " axis--y" + name)

        //append label
        let namelabel = svg.append('text')
            .attr('x', 50)
            .attr('y', 25)
            .attr('fill', '#000')
            .attr("class", "shadow") 
            .classed('namelabel', true)
            .text(name.toUpperCase())

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

        let dots = svg.append("g")
            .classed('dots', true)

        svg.append('text')
            .attr('x', 55)
            .attr('y', 25)
            .attr('fill', '#000')
            .attr("class", "shadow") 
            .classed('namelabel', true)
            .text(name.toUpperCase())

        svg.append("line")
            .classed('eq', true)
            .attr("stroke", "red" )
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "green" )
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .classed("lr1", true)
        
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "green" )
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .classed("lr2", true)

        this.svg = svg
        this.view = view
        this.dots = dots
        this.gX = gX
        this.gY = gY
        this.width = width
        this.height = height

        window['chart'+name] = this

    }

    update(data) {

        // sort data by date
        data = data.sort((a,b) => {
            return a.date - b.date
        })

        let { styles  } = this.props
        let { name, maxXval, minXval, margin } = data
        let { dotsOpacity, earthquake } = window.timeseriesUiState

         //convert yVal to cm
        data.map((d) => {
            d.yVal = d.yVal * 1000
        }) 

        // if maxX and minX is not set the min and max dates
        let x1 = minXval ? minXval : d3.min(data, function (d) { return d.date; })
        let x2 = maxXval ? maxXval : d3.max(data, function (d) { return d.date; })
        
        let x = d3.scaleLinear()
            .domain([x1, x2])
            .range([0, this.width])

        // get the mean
        let focusData = [], mean
        data.map((d) => {
            focusData.push(d.yVal)
        })
        mean = math.mean(focusData)

        let ypercent = (d3.max(data, function (d) { return d.yVal; }) - mean) * margin

        let y = d3.scaleLinear()
            .domain([d3.max(data, function (d) {
                return d.yVal;
            }) - mean + ypercent, d3.min(data, function (d) {
                return d.yVal;
            }) - mean - ypercent])
            .range([0, this.height]).nice();

        let xAxis = d3.axisBottom(x)
            .tickSize(this.height)
            .tickPadding(-15)
            .tickFormat(d3.format(" "));

        let yAxis = d3.axisRight(y)
            .ticks(6)
            .tickSize(this.width)
            .tickPadding(2 - this.width);

        let t = d3.transition()
                    .duration(500);

        this.gX.transition(t).call(xAxis);

        this.gY.transition(t).call(yAxis);

        let zoom = d3.zoom()
            .scaleExtent([-1, Infinity])
            .translateExtent([
                [-100, -100],
                [this.width + 100, this.height + 100]
            ])
            .on("zoom", zoomed);
                    
        let circles = d3.select('.svg'+name).selectAll('.dots').selectAll("circle").data(data)
        
        circles.transition(t)
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.yVal - mean);
            })
            .call(resetted);

        circles.enter()
            .append("circle")
            .classed(styles.dot, true)
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.yVal - mean);
            })
            .style("opacity", 0)
            .attr("stroke-width", 2)
            .attr("r", 4)
            .attr("fill", "white")
            .attr("stroke", "blue")
            .transition(t)
            .style("opacity", dotsOpacity)
            .call(resetted)

        circles.exit()
            .transition(t)
            .attr("stroke", "lightblue")
            .style("opacity", 0)
            .remove();


        this.svg.call(zoom);

        this.drawEarthquake = function drawEarthquake(earthquake) {
            let svg = d3.select('.svg'+name)

            svg.select('.eq')
                .attr("x1", x(earthquake))
                .attr("y1", 99999)
                .attr("x2", x(earthquake)) 
                .attr("y2", -99999);
        }
        this.drawEarthquake(earthquake)

        if(data.length > 1 && earthquake) { showDisplacement(data) }

        function showDisplacement(data) {

            let dataBefore = [], toRegression = []
            data.map((d) => {
                if(d.date < earthquake) {
                    dataBefore.push(d)
                    toRegression.push([ d.date, d.yVal ])
                }
            })
            if(dataBefore.length == 0) { return 0 }

            let result = regression.linear(toRegression)
            let lineBefore = result.points

            // console.log(name+ ': ',result)

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

            lineBefore.map((d) => {
                d[1] = (d[1] - b4mean)
            })

            let A = [ lineBefore[0][0], lineBefore[0][1] ],
                B = [ lineBefore[lineBefore.length-1][0], lineBefore[lineBefore.length-1][1] ],
                p0 = pointAtX(A, B, A[0]),
                p1 = pointAtX(A, B, earthquake)

            d3.select('.svg'+name).select(".lr1")
                .transition(t)
                .attr("d", beforeLine([p0, p1]));

            let dataAfter = []
            data.map((d) => {
                if(d.date > earthquake) {
                    dataAfter.push(d)
                }
            })
            if(dataAfter.length == 0) { return 0 }

            let line = d3.line()
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return d[1]; })

            let final = y(dataAfter[0].yVal - mean),
                initial = beforeY(p1[1])

            d3.select('.svg'+name).select(".lr2")
                .transition(t)
                .attr("d", line([ [earthquake, initial ] , [earthquake, final ] ]));

            let displacement = y.invert(final) - y.invert(initial)
            console.log(name+': '+ displacement )

        }

        function showDisplacementResult() {

        }

        function pointAtX(a, b, x) {
            var slope = (b[1] - a[1]) / (b[0] - a[0])
            var y = a[1] + (x - a[0]) * slope
            return [x, y]
        }
        
        function zoomed() {

            let svg = d3.select('.svg'+name)

            svg.select('rect').attr("transform", d3.event.transform);

            svg.selectAll('.dots').attr("transform", d3.event.transform);
            
            svg.selectAll('.dots').selectAll("circle").attr("r", function () {
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

            svg.select(".axis--x" + name).call(xAxis.scale(d3.event.transform.rescaleX(x)));
            svg.select(".axis--y" + name).call(yAxis.scale(d3.event.transform.rescaleY(y)));
        }

        function resetted() {
            let svg = d3.select('.svg'+name)

            svg.transition(t)
                .call(zoom.transform, d3.zoomIdentity);

            // fix opacity issue on first data
            d3.selectAll('svg').selectAll('.dots').selectAll('circle').style("opacity", dotsOpacity)
        }

    }

    unmount() {
        this.el.remove();
    }

}