Ext.define('Rally.technicalservices.chart.FeaturesPushed', {
    extend: 'Rally.ui.chart.Chart',
    alias: 'widget.tsfeaturespushed',

    config: {

        loadMask: false,

        chartConfig: {
            colors: [ '#2f7ed8','#8bbc21',  '#910000',
                '#492970', '#f28f43',
                '#7cb5ec', '#90ed7d', '#434348', '#f7a35c', '#8085e9','#aa1925',
                '#145499','#77a1e5', '#c42525', '#a6c96a',
                '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#1aadce',
                '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
                '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],

            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                type: 'column'
            },
            title: {
                text: '',
                align: 'center',
                useHTML: true
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b>'
            },
            xAxis: {
                type: 'category',
                labels: {
                    enabled: true
                }
            },
            yAxis: {
                title: {
                    text: 'Feature Count'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    colorByPoint: true
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            }
        },
        chartData: {
            series: []
        }

    },
    constructor: function(config) {
        this.mergeConfig(config);

        this.chartData.series = this._getSeries(config.featureSummaryCalculator);
        this.chartConfig.title.text = this._getTitle();
        this.chartData.categories = this._getCategories(config.featureSummaryCalculator);
        this.callParent([this.config]);

    },
    initComponent: function() {
        this.callParent(arguments);
    },
    _getTitle: function(){
        return Ext.String.format('<div style="text-align:center"><span style="font-size:20px;color:black;"><b>{0}</b></span></div>', this.title);
    },

    _getSeries: function(calculator){
        console.log('_getSeries', calculator);
        var sprint_hash = calculator.featurePushedSprintHash,
            data = [];

        _.each(calculator.featurePushedSprintHash, function(count, sprint){
            data.push(count);
        });


        var series =  [{
            name: 'Pushed Features',
            data: data
        }];
        return series;
    },
    _getCategories: function(calculator){
        return _.keys(calculator.featurePushedSprintHash);
    },
    //Overriding this function because we want to set colors ourselves.
    _setChartColorsOnSeries: function (series) {
        return null;
    }
});

