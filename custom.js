// Based on GerHobbelt/Developing-a-D3.js-Edge
d3.custom = {};
d3.custom.chart = function module() {
    var w = 960, 
        h = 500;
    var dispatch = d3.dispatch("customHover");
    function exports(_selection) {
        _selection.each(function(_data) {
            // Private variables

            var svg = d3.select(this)
                .selectAll("svg")
                .data([_data]);
            svg.enter().append("svg")
                .classed("chart", true);
            svg.transition().attr({width: w, height: h});

            // Enter, Update, Exit 
            var shape = svg.selectAll(".shape")
                .data(function(d, i) { return d; /* d === _data */ });
            
            shape.enter().append("polygon")
                .classed("shape", true)
                // set attributes here
                .on("mouseover", dispatch.customHover);
            
            shape.transition()
                .attr({
                // set attributes here for update
                });
            
            shape.exit().transition().style({opacity: 0}).remove();
        });
    }
    exports.w = function(_x) {
        if (!arguments.length) return w;
        w = _x;
        return this;
    };
    exports.h = function(_x) {
        if (!arguments.length) return h;
        h = _x;
        return this;
    };
    d3.rebind(exports, dispatch, "on");
    return exports;
};

// Usage
//
// var vis = d3.custom.chart()
//     .w(500).h(200)
//     .on("customHover", function(d, i) { 
//         d3.select("#message").text(d); 
//     });
//
// var container = d3.select("#container")
//     .datum(data)
//     .call(vis);