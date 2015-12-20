    /**
     * Stacked Bar Chart Graph Directive
     * @memberOf innoApp
     * @ngdoc directive
     * @scope filters
     * @format HTML  - <stackedbar-chart ></stackedbar-chart>
     * @format DATA - { title: 'Title', data: [ dataPoints: [ {indexLabel: 'label', 'y': point} ] ] }
     * @author Akshay Kasliwal
     */

    innoApp.directive('timeseriesBarcombination', function($compile, $timeout) {
      return {
        template:'<div id="timebar"></div>',
        restrict: 'E',
        scope: {
          data: '='
        },

        link: function(scope, oElement, attrs) {
          var margin = {
              top: 20,
              right: 20,
              bottom: 30,
              left: 40
            },
            width = 600 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;

          var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

          var x1 = d3.scale.ordinal();

          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .innerTickSize(-width)
            .outerTickSize(0)
            .tickPadding(10)
            .tickFormat(d3.format(".2s"));

          var color = d3.scale.ordinal()
            .range(["#B2B3B3", "#CFD0D0", "#0066B3", "#2CB8C8"]);

          var svg = d3.select("#timebar").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var yBegin;

          var innerColumns = {
            "column1": ["Net Sales(LY)", "Discounts & Returns(LY)"],
            "column4": ["Net Sales", "Discounts and Returns"]
          }

          d3.json("data.json", function(error, data) {
            var columnHeaders = d3.keys(data[0]).filter(function(key) {
              return key !== "State";
            });
            color.domain(d3.keys(data[0]).filter(function(key) {
              return key !== "State";
            }));
            data.forEach(function(d) {
              var yColumn = new Array();
              d.columnDetails = columnHeaders.map(function(name) {
                for (ic in innerColumns) {
                  if ($.inArray(name, innerColumns[ic]) >= 0) {
                    if (!yColumn[ic]) {
                      yColumn[ic] = 0;
                    }
                    yBegin = yColumn[ic];
                    yColumn[ic] += +d[name];
                    return {
                      name: name,
                      column: ic,
                      yBegin: yBegin,
                      yEnd: +d[name] + yBegin,
                    };
                  }
                }
              });
              d.total = d3.max(d.columnDetails, function(d) {

                return d.yEnd;
              });
            });

            x0.domain(data.map(function(d) {
              return d.State;
            }));
            x1.domain(d3.keys(innerColumns)).rangeRoundBands([0, x0.rangeBand()]);

            y.domain([0, d3.max(data, function(d) {
              return d.total;
            })]);

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".7em")
              .style("text-anchor", "end")
              .text("");

            var project_stackedbar = svg.selectAll(".project_stackedbar")
              .data(data)
              .enter().append("g")
              .attr("class", "g")
              .attr("transform", function(d) {
                return "translate(" + x0(d.State) + ",0)";
              });

            project_stackedbar.selectAll("rect")
              .data(function(d) {
                return d.columnDetails;
              })
              .enter().append("rect")
              .attr("width", x1.rangeBand())
              .attr("x", function(d) {
                return x1(d.column);
              })
              .attr("y", function(d) {
                return y(d.yEnd);
              })
              .attr("height", function(d) {
                return y(d.yBegin) - y(d.yEnd);
              })
              .style("fill", function(d) {
                return color(d.name);
              });

            var legend = svg.selectAll(".legend")
              .data(columnHeaders.slice().reverse())
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) {
                return "translate(0," + i * 20 + ")";
              });

            legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", color);

            legend.append("text")
              .attr("x", width-24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) {
                return d;
              });

          });
        }
      };
    });
