    /**
     * Stacked Bar Chart Graph Directive
     * @memberOf innoApp
     * @ngdoc directive
     * @scope filters
     * @format HTML  - <stackedbar-chart ></stackedbar-chart>
     * @format DATA - { title: 'Title', data: [ dataPoints: [ {indexLabel: 'label', 'y': point} ] ] }
     * @author Akshay Kasliwal
     */

    innoApp.directive('linechartGraph', function($compile, $timeout) {
      return {

        restrict: 'E',
        scope: {
          data: '='
        },

        link: function(scope, oElement, attrs) {
          var graphname = attrs.graphname;
          currency=scope.$parent.$parent.$parent.$parent.filterObj[0].values;
          currencytype=scope.$parent.$parent.$parent.$parent.$parent.currencyType;
          var groups1=[];
          scope.salesperformanceytddata = scope.$parent.salesperformanceData.ytd.chart;
          tooltipdata =  scope.$parent.salesperformanceData.ytd.tooltip;
          var salesperformanceytdGraphdata = [];
          var categories = [];
          var colorPatern = [];
          var bindId = attrs.id;
          document.getElementById(bindId).value = JSON.stringify(scope.$parent.salesperformanceData.ytd.tooltip);
          $compile(oElement.contents())(scope.$new());


          salesperformanceytdGraphdata = scope.salesperformanceytddata;

          var graphdata = new Array(salesperformanceytdGraphdata.data.length);
          for (var i = 0; i < salesperformanceytdGraphdata.data.length; i++) {
            graphdata[i] = new Array(salesperformanceytdGraphdata.data[i].data.length + 1);
          }

          for (var i = 0; i < salesperformanceytdGraphdata.data.length; i++) {
            graphdata[i][0] = salesperformanceytdGraphdata.data[i].title;
            groups1[i]=salesperformanceytdGraphdata.data[i].title;
            for (var j = 1; j <= salesperformanceytdGraphdata.data[i].data.length; j++) {
              graphdata[i][j] = salesperformanceytdGraphdata.data[i].data[j - 1];
            }
          }
          categories = salesperformanceytdGraphdata.categories;
          colorPatern = ["#CCCDCD", "#005BAF", "#ED68A6"];

          var chart = c3.generate({
            bindto: '#' + bindId,
            data: {
              columns: graphdata,
              type: 'line',
              regions: {
                'OP Target': [{
                  'style': 'dashed'
                }],
              }
            },
            point: {
                r: 5
            },
            color: {
              pattern: colorPatern
            },
            axis: {
              x: {
                type: 'category',
                categories: categories
                  //  categories: ['Nov\'14', 'Dec\'14', 'Jan\'15', 'Feb\'15', 'Mar\'15', 'Apr\'15', 'May\'15', 'June\'15', 'Jul\'15', 'Aug\'15', 'Sept\'15', 'Oct\'15']
              }
            },
            grid: {
              y: {
                  show: true
              },
            },
            legend: {
              show: false
              //or hide: 'data1'
              //or hide: ['data1', 'data2']
            },
            tooltip: {
            //  format: {
            //      title: function (d) {
            //          var format = d3.time.format('%d/%m/%Y');
            //          return format(d)
            //      }
            //  },
            grouped: false,
            position: function (data, width, height, element) {
              var chartOffsetX = document.querySelector("#"+bindId).getBoundingClientRect().left,
              graphOffsetX = document.querySelector("#"+bindId+" g.c3-axis-y").getBoundingClientRect().right,
              tmptooltip=document.getElementById('tooltip'),
              tooltipWidth = $(tmptooltip).width();
              x =(parseInt(element.getAttribute('cx')) ) + graphOffsetX - chartOffsetX - Math.floor(tooltipWidth/2),
              y = element.getAttribute('cy');
              y = y - height - 14;
              if((x + tooltipWidth) > $(element).closest('svg').width() ){
                x = x - ((x + tooltipWidth) - $(element).closest('svg').width());
                $(element).closest('svg').next().children().addClass('arrow-right');
              }
              return {top: y, left: x}
            },
           contents: function (data, defaultTitleFormat, defaultValueFormat, color) {
              var cal =this.api.categories();
              var text, i, value;
              var $$ = this, config = $$.config,
              titleFormat = config.tooltip_format_title || defaultTitleFormat,
              title=titleFormat(data[0].x),
              tmptooltip = JSON.parse($(this.config.bindto).val()),
              grosssalecurr,grosssaleprev,grosssalesply,netsalecurr,netsaleprev,netsalesply,
              currentpos =cal.indexOf(title),
              optarget = tmptooltip.OPTarget[currentpos],
              performancetotarget = tmptooltip.PerformanceToTarget[currentpos];
              $.each(tmptooltip.data,function(ind,obj){
                if(obj.title == "Gross Sales"){
                  grosssalecurr=obj.data.latest[currentpos];
                  grosssaleprev=obj.data.sply[currentpos];
                  grosssalesply=obj.data.percentageChange[currentpos];
                }else if(obj.title == "Net Sales"){
                  netsalecurr=obj.data.latest[currentpos];
                  netsaleprev=obj.data.sply[currentpos];
                  netsalesply=obj.data.percentageChange[currentpos];
                }
              });

              var text = "<div id='tooltip' class='d3-tip tooltip-custom has-arrow'>"
                          +"<div class='tooltip-header'>"
                          +"<div class='tooltip-header-list has-space-btwn'>"
                          +"<div class='left'>"
                          +"<div class='txt'>OP Traget</div>"
                          +"<div class='txt'>Performance to Target</div>"
                          +"</div>"
                          +"<div class='right'>"
                          + "<div class='value'>"+currencytype[currency]+optarget+"</div>"
                          + "<div class='value'>"+performancetotarget+"%</div>"
                          +"</div>"
                          +"</div></div>"
                          +"<div class='tooltip-content'>"
                            +"<div class='tooltip-content-list has-space-btwn'>"
                              +"<div class='list'>"
                                +"<div class='txt'>&nbsp;</div>"
                                +"<div class='txt'>Gross Sales</div>"
                                +"<div class='txt'>Net Sales</div>"
                              +"</div>"
                              +"<div class='list'>"
                                +"<div class='value'>"+title+"</div>"
                                +"<div class='value'>"+currencytype[currency]+grosssalecurr+"</div>"
                                +"<div class='value'>"+currencytype[currency]+netsalecurr+"</div>"
                              +"</div>"
                              +"<div class='list'>"
                                +"<div class='value'>"+title.substring(0,title.length -2)+"14</div>"
                                +"<div class='value'>"+currencytype[currency]+grosssaleprev+"</div>"
                                +"<div class='value'>"+currencytype[currency]+netsaleprev+"</div>"
                              +"</div>"
                              +"<div class='list'>"
                                +"<div class='value'>vs SPLY</div>"
                                +"<div class='value'>"+grosssalesply+"%</div>"
                                +"<div class='value'>"+netsalesply+"%</div>"
                              +"</div>"
                            +"</div>"
                          +"</div>"
               text += "</div>";
              return text;
            }
            }
          });


//----------Custom legend logic-----------------------------------

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

              //d3.select(this).style('background-color', chart.color(id));
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
