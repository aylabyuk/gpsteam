import * as d3 from "d3";
import math from 'mathjs';

export default class MyChart {
    constructor(el, props) {
        this.el = el;
        this.props = props;
        this.displ = null;

    }

    create(data){

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

        this.svg = svg
        this.view = view
        this.dots = dots
        this.gX = gX
        this.gY = gY
        this.width = width
        this.height = height

    }

    update(data) {

        let { styles  } = this.props
        let { name, earthquake, maxXval, minXval, margin } = data

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
                    .duration(1000);

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
            });

        circles.enter()
            .append("circle")
            .classed(styles.dot, true)
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.yVal - mean);
            })
            .style("opacity", 1)
            .attr("stroke-width", 2)
            .attr("r", 4)
            .attr("fill", "lightblue")
            .attr("stroke", "lightblue")
            .transition(t)
            .attr("fill", "white")
            .attr("stroke", "blue")

        circles.exit()
            .transition(t)
            .attr("fill", "white")
            .attr("stroke", "lightblue")
            .remove();


        this.svg.call(zoom);
        
        function zoomed() {

            let svg = d3.select('.svg'+name)

            svg.select('rect').attr("transform", d3.event.transform);

            svg.selectAll('.dots').attr("transform", d3.event.transform);
            
            svg.selectAll('.dots').selectAll("circle").attr("r", function () {
                return (4 / d3.event.transform.k);
            }).attr("stroke-width", function () {
                return (2 / d3.event.transform.k);
            });

            svg.select(".axis--x" + name).call(xAxis.scale(d3.event.transform.rescaleX(x)));
            svg.select(".axis--y" + name).call(yAxis.scale(d3.event.transform.rescaleY(y)));

        }

    }

    unmount() {
        this.el.remove();
    }

}