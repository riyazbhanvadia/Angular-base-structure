    /**
     * Stacked Bar Chart Graph Directive
     * @memberOf innoApp
     * @ngdoc directive
     * @scope filters
     * @format HTML  - <stackedbar-chart ></stackedbar-chart>
     * @format DATA - { title: 'Title', data: [ dataPoints: [ {indexLabel: 'label', 'y': point} ] ] }
     * @author Akshay Kasliwal
     */

    innoApp.directive('groupedStackedbargraph', function($compile, $timeout) {
      return {

        restrict: 'E',
        scope: {
          data: '='
        },

        link: function(scope, oElement, attrs) {
          var graphname = attrs.graphname;

          if(graphname === 'salesfigures'){
            groupslegend = false;
            chartwidth=36;
          }else{
            groupslegend = ['Cash Discount (LY)', 'Ac Returns (LY)','Discounts (LY)','Mand. Discounts (LY)','Adjustments (LY)'];
            chartwidth=24;
          }

          if(graphname === 'salesfigures'){
            scope.salesfiguredata = scope.$parent.salesfigureData.chart;
            var salesfigureGraphdata = [];
            var categories  = [];
            var colorPatern = [];
            var groups = [];
            var bindId = attrs.id;
            document.getElementById(bindId).value = JSON.stringify(scope.$parent.salesfigureData.tooltip);
           $compile(oElement.contents())(scope.$new());


              salesfigureGraphdata = scope.salesfiguredata;

              var graphdata = new Array(salesfigureGraphdata.data.length);
              for(var i = 0 ; i< salesfigureGraphdata.data.length; i++){
                graphdata[i]= new Array(salesfigureGraphdata.data[i].data.length+1);
              }

              for(var i = 0; i< salesfigureGraphdata.data.length; i++){
                 graphdata[i][0] = salesfigureGraphdata.data[i].title;
                 for(var j=1; j<=salesfigureGraphdata.data[i].data.length; j++){
                   graphdata[i][j] = salesfigureGraphdata.data[i].data[j-1];
                 }
              }
              categories = salesfigureGraphdata.categories;
              colorPatern = ["#B2B3B3", "#CFD0D0", "#0066B3", "#1dbecf"];
              groups = [
                ['Net Sales(LY)', 'Discounts & Returns (LY)'],
                ['Net Sales', 'Discounts & Returns']
              ];
              groups1 = [
                'Net Sales(LY)', 'Discounts & Returns (LY)','Net Sales', 'Discounts & Returns'
              ];
          }else if(graphname === 'breakupofdiscounts'){
            scope.breakupdiscdata = scope.$parent.breakupofdiscountsdata.data.chart;
            var breakupGraphdata = [];
            var categories  = [];
            var colorPatern = [];
            var groups = [];
            var bindId = attrs.id;
            document.getElementById(bindId).value = JSON.stringify(scope.$parent.salesfigureData.tooltip);
            $compile(oElement.contents())(scope.$new());


              breakupGraphdata = scope.breakupdiscdata;

              var graphdata = new Array(breakupGraphdata.data.length);
              for(var i = 0 ; i< breakupGraphdata.data.length; i++){
                graphdata[i]= new Array(breakupGraphdata.data[i].data.length+1);
              }

              for(var i = 0; i< breakupGraphdata.data.length; i++){
                 graphdata[i][0] = breakupGraphdata.data[i].title;
                 for(var j=1; j<=breakupGraphdata.data[i].data.length; j++){
                   graphdata[i][j] = breakupGraphdata.data[i].data[j-1];
                 }
              }
              categories = breakupGraphdata.categories;
              colorPatern = ['#A1A2A2','#C3C4C4','#D8D9D9','#E4E5E5','#eaebeb','#522f91','#ee3897','#009a5b','#ffcb08','#ed1a3b'];
              groups = [
                ['Cash Discount (LY)', 'Ac Returns (LY)','Discounts (LY)','Mand. Discounts (LY)','Adjustments (LY)'],
                ['Cash Discount', 'Ac Returns','Discounts','Mand. Discounts','Adjustments']
              ];
              groups1 = [
                'Cash Discount', 'Ac Returns','Discounts','Mand. Discounts','Adjustments'
              ];
          }



          var chart = c3.generate({
            bindto:'#'+bindId,
            data: {
              columns: graphdata,
              type: 'bar',
              groups: groups,
              order: 'asc'
            },
            bar: {
              width: chartwidth
            },
            legend: {
              show: false
              //or hide: 'data1'
              //or hide: ['data1', 'data2']
            },
            color: {
              pattern: colorPatern
            },
            axis: {
              x: {
                type: 'category',
                categories : categories,
                // padding: {
                //   left: 40,
                //   right: 40,
                // }

              //  categories: ['Nov\'14', 'Dec\'14', 'Jan\'15', 'Feb\'15', 'Mar\'15', 'Apr\'15', 'May\'15', 'June\'15', 'Jul\'15', 'Aug\'15', 'Sept\'15', 'Oct\'15']
              },
              y:{
                show:false
              }
            },
            tooltip: {
             format: {
                 title: function (d) {
                     var format = d3.time.format('%d/%m/%Y');
                     return format(d)
                 }
             },
            grouped: true,
            position: function (data, width, height, element) {
              // var chartOffsetX = document.querySelector("#breakupgraph").getBoundingClientRect().left,
              // graphOffsetX = document.querySelector("#breakupgraph g.c3-axis-y").getBoundingClientRect().right,
              // tooltipWidth = document.getElementById('tooltip').parentNode.clientWidth,
              // x = (parseInt(element.getAttribute('cx')) ) + graphOffsetX - chartOffsetX - Math.floor(tooltipWidth/2),
              // y = element.getAttribute('cy');
               tmptooltip=document.getElementById('tooltip'),
              tooltipWidth = $(tmptooltip).width(),
              x =(parseInt(element.getAttribute('x')) )
              y = 0;
              var dt =$(element).closest('svg').next().children();
              var offset=Number(element.getBoundingClientRect().left.toFixed(0));
               if(window.innerWidth < (offset+$(dt).width()+10) ){                 
                 x = x - ((x + tooltipWidth) - $(element).closest('svg').width());
                 $(element).closest('svg').next().children().addClass('arrow-right');
               }
              return {top: y, left: x}
            },
           contents: function (data, defaultTitleFormat, defaultValueFormat, color) {
             var cal =this.api.categories();
             var text, i, value;
             var $$ = this, config = $$.config,
             titleFormat = defaultTitleFormat,
             title=titleFormat(data[0].x),
             tmptooltip = JSON.parse($(this.config.bindto).val()),
             optarget = tmptooltip.OPTarget,
             performancetotarget = tmptooltip.PerformanceToTarget,
             grosssalesharetotal,grosssalesply,netsalesharetotal,netsalesply,
             currentpos =cal.indexOf(title);
             $.each(tmptooltip.data,function(ind,obj){
               if(obj.title == "Gross Sales"){
                 grosssalesharetotal=obj.data.shareOfTotal[currentpos];
                 grosssalesply=obj.data.vsSply[currentpos];
               }else if(obj.title == "Net Sales"){
                 netsalesharetotal=obj.data.shareOfTotal[currentpos];
                 netsalesply=obj.data.vsSply[currentpos];
               }
             });

             var text = "<div id='tooltip' class='d3-tip tooltip-custom arrow-left has-arrow'>"
                         +"<div class='tooltip-header'>"
                         +"<div class='tooltip-header-list has-space-btwn'>"
                         +"<div class='left'>"
                         +"<div class='txt'>OP Traget</div>"
                         +"<div class='txt'>Performance to Target</div>"
                         +"</div>"
                         +"<div class='right'>"
                         + "<div class='value'>$ " +optarget+"</div>"
                         + "<div class='value'>"+performancetotarget+"</div>"
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
                               +"<div class='value'>% Share of Total</div>"
                               +"<div class='value'>"+grosssalesharetotal+"%</div>"
                               +"<div class='value'>"+netsalesharetotal+"%</div>"
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
