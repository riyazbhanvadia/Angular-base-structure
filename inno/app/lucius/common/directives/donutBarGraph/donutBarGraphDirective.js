    /**
     * Stacked Bar Chart Graph Directive
     * @memberOf innoApp
     * @ngdoc directive
     * @scope filters
     * @format HTML  - <stackedbar-chart ></stackedbar-chart>
     * @format DATA - { title: 'Title', data: [ dataPoints: [ {indexLabel: 'label', 'y': point} ] ] }
     * @author Akshay Kasliwal
     */

    innoApp.directive('donutBargraph', function($compile, $timeout) {
      return {
        template: '<div id="donutGraph"></div>',
        restrict: 'E',
        scope: {
          data: '='
        },

        link: function(scope, oElement, attrs) {
            var graphname = attrs.graphname;
            currency=scope.$parent.$parent.$parent.$parent.filterObj[0].values;
            currencytype=scope.$parent.$parent.$parent.$parent.$parent.currencyType;
            var groups1=[];
            if(graphname === "salesfiguredonut"){
              var bindId = attrs.id;
              var colorPatern = [];

              scope.salesfiguredonutdata = scope.$parent.salesfiguredonutData.chart;
              var salesfiguredonutGraphData = [];
              salesfiguredonutGraphdata = scope.salesfiguredonutdata;
              var graphdata = new Array(salesfiguredonutGraphdata.data.length);
              for(var i = 0 ; i< salesfiguredonutGraphdata.data.length; i++){
                graphdata[i]= new Array(2);
              }
              for(var i = 0; i< salesfiguredonutGraphdata.data.length; i++){
                 graphdata[i][0] = salesfiguredonutGraphdata.data[i].title;
                  graphdata[i][1] = salesfiguredonutGraphdata.data[i].data;
                  groups1[i]=salesfiguredonutGraphdata.data[i].title;
              }
              colorPatern = ["#0F65AE","#2CB8C8" ];

            }else if(graphname === "breakupdonut"){
              var bindId = attrs.id;
              var colorPatern = [];

              scope.breakupdonutdata = scope.$parent.breakupofdiscountsdonutdata.chart;
              var breakupdonutGraphData = [];
              breakupdonutGraphdata = scope.breakupdonutdata;
              var graphdata = new Array(breakupdonutGraphdata.data.length);
              for(var i = 0 ; i< breakupdonutGraphdata.data.length; i++){
                graphdata[i]= new Array(2);
              }
              for(var i = 0; i< breakupdonutGraphdata.data.length; i++){
                 graphdata[i][0] = breakupdonutGraphdata.data[i].title;
                  graphdata[i][1] = breakupdonutGraphdata.data[i].data;
                  groups1[i]=breakupdonutGraphdata.data[i].title;
              }
              colorPatern = ["#4D3185","#FB46A2", "#C0E2A7","#00A05A", "#A1CF4D", "#8EDBD4", "#FFC734" , "#FF2D30"  ];
            }


          var chart = c3.generate({
            bindto: '#'+bindId,
            donut: {
              label: {
                show: false
              }
            },
            data: {
              type: 'donut',
              columns: graphdata
            },
            legend: {
              show: false
            },
            color: {
              pattern: colorPatern
            },
            tooltip: {
            //  format: {
            //      title: function (d) {
            //          var format = d3.time.format('%d/%m/%Y');
            //          return format(d)
            //      }
            //  },
            grouped: false,
            // position: function (data, width, height, element) {
            //   // var chartOffsetX = document.querySelector("#breakupgraph").getBoundingClientRect().left,
            //   // graphOffsetX = document.querySelector("#breakupgraph g.c3-axis-y").getBoundingClientRect().right,
            //   // tooltipWidth = document.getElementById('tooltip').parentNode.clientWidth,
            //   // x = (parseInt(element.getAttribute('cx')) ) + graphOffsetX - chartOffsetX - Math.floor(tooltipWidth/2),
            //   // y = element.getAttribute('cy');
            //   // y = y - height - 14;
            //   return {top: y, left: x}
            // },
           contents: function (data, defaultTitleFormat, defaultValueFormat, color) {
              var text, i, value;
              var $$ = this, config = $$.config,
              titleFormat = config.tooltip_format_title || defaultTitleFormat,
              title=data[0].name,
              text = "<div id='tooltip' class='d3-tip tooltip-custom tooltip-sm'>"
                          +"<div class='tooltip-header'>"
                          +"<div class='tooltip-header-list'>"
                          +"<div class=''>"
                          +"<div class='value'>"+title+"</div>"
                          +"</div>"
                          +"</div></div>"
                          +"<div class='tooltip-content'>"
                            +"<div class='tooltip-content-list'>"
                              +"<div class='list'>"
                                +"<div class='txt'>"+currencytype[currency]+data[0].value+"</div>"
                              +"</div>"
                            +"</div>"
                          +"</div>"
               text += "</div>";
              return text;
            }
            }
          });

          function toggle(id) {
              chart.toggle(id);
          }

        d3.select('#'+bindId).insert('div', '.chart').attr('class', 'legend').selectAll('span')
          .data(groups1)
        .enter().append('div').attr('class','legend-item').append('span')
          .attr('data-id', function (id) { return id; })
          .html(function (id) { return id; })
          .each(function (id) {
              var data  = d3.select(this)[0][0];
              var newItem = document.createElement("label");
              newItem.style.backgroundColor =chart.color(id);
              data.parentElement.insertBefore(newItem,data);
          })
          .on('mouseover', function (id) {
              chart.focus(id);
          })
          .on('mouseout', function (id) {
              chart.revert();
          })
          .on('click', function (id) {
              $(this).parent().toggleClass('disabled');
              chart.toggle(id);
          });
        }
      };
    });
