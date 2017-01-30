import * as d3 from "d3";

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
                .attr("width", 960)
                .attr("height", 500),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var margin = {top: 0, right: 0, bottom: 0, left: 0}


        var zoom = d3.zoom()
            .scaleExtent([1, 40])
            .translateExtent([[-100, -100], [width + 90, height + 100]])
            .on("zoom", zoomed);

        var x = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.date - 1; }), d3.max(data, function (d) { return d.date + 1; })])
            .range([margin.left, width - margin.right]);

        var y = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.east; }), d3.max(data, function (d) { return d.east; })])
            .range([margin.top, height - margin.bottom]); 

        var xAxis = d3.axisBottom(x)
            .ticks((width + 2) / (height + 2) * 10)
            .tickSize(height)
            .tickPadding(8 - height)
            .tickFormat(d3.format(".4r"));

        var yAxis = d3.axisRight(y)
            .ticks(10)
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

        function zoomed() {
        view.attr("transform", d3.event.transform);
        gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
        gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
        }

        function resetted() {
        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
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