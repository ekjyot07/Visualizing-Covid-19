var width = 800,
    height = 350,
    radius = 10;
padding = 100;


var buttons = d3.selectAll('#buttons')
buttons.append('button')
    .text('Case Fatality Rate')
    .style("background-color", "transparent")
    .style("font-size", "14px")
    .style("padding", "10px")
    .style("margin", "3px")
    .style("border-color", "#6c757d")
    .style("border", "1px solid")
    .style("cursor", "pointer")
    .attr('value', 'percentageDied')
    .classed('d_sel', true)
    .on("mouseover", function (d) {
        d3.select(this)
            .style("background-color", "orange")
            .style("color", "white")
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .style("background-color", "transparent")
            .style("color", "#454545")
    })
buttons.append('button')
    .text('Tests per million')
    .style("font-size", "14px")
    .style("padding", "10px")
    .style("margin", "3px")
    .style("background-color", "transparent")
    .style("border-color", "#6c757d")
    .style("border", "1px solid")
    .style("cursor", "pointer")
    .attr('value', 'TestsPerM')
    .classed('d_sel', true)
    .on("mouseover", function (d) {
        d3.select(this)
            .style("background-color", "orange")
            .style("color", "white")
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .style("background-color", "transparent")
            .style("color", "#454545")
    })
buttons.append('button')
    .text('Health Expenditure Per Person')
    .style("font-size", "14px")
    .style("padding", "10px")
    .style("margin", "3px")
    .style("background-color", "transparent")
    .style("border-color", "#6c757d")
    .style("border", "1px solid")
    .style("cursor", "pointer")
    .attr('value', 'health_expenditure_per_person')
    .classed('d_sel', true)
    .on("mouseover", function (d) {
        d3.select(this)
            .style("background-color", "orange")
            .style("color", "white")
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .style("background-color", "transparent")
            .style("color", "#454545")
    })
buttons.append('button')
    .text('GDP per capita')
    .style("font-size", "14px")
    .style("padding", "10px")
    .style("margin", "3px")
    .style("background-color", "transparent")
    .style("border-color", "#6c757d")
    .style("border", "1px solid")
    .style("cursor", "pointer")
    .attr('value', 'gdp_per_capita')
    .classed('d_sel', true)
    .on("mouseover", function (d) {
        d3.select(this)
            .style("background-color", "orange")
            .style("color", "white")
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .style("background-color", "transparent")
            .style("color", "#454545")
    })
buttons.append('button')
    .text('% Older popoulation')
    .style("font-size", "14px")
    .style("padding", "10px")
    .style("margin", "3px")
    .style("background-color", "transparent")
    .style("border-color", "#6c757d")
    .style("border", "1px solid")
    .style("cursor", "pointer")
    .attr('value', 'age_over_65_percentage')
    .classed('d_sel', true)
    .on("mouseover", function (d) {
        d3.select(this)
            .style("background-color", "orange")
            .style("color", "white")
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .style("background-color", "transparent")
            .style("color", "#454545")
    })
buttons.append('button')
    .text('Government effectiveness')
    .style("font-size", "14px")
    .style("padding", "10px")
    .style("margin", "3px")
    .style("background-color", "transparent")
    .style("border-color", "#6c757d")
    .style("border", "1px solid")
    .style("cursor", "pointer")
    .attr('value', 'government_effectiveness')
    .classed('d_sel', true)
    .on("mouseover", function (d) {
        d3.select(this)
            .style("background-color", "orange")
            .style("color", "white")
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .style("background-color", "transparent")
            .style("color", "#454545")
    })
buttons.append('button')
    .text('Female MPs')
    .style("font-size", "14px")
    .style("padding", "10px")
    .style("margin", "3px")
    .style("background-color", "transparent")
    .style("border-color", "#6c757d")
    .style("border", "1px solid")
    .style("cursor", "pointer")
    .attr('value', 'womenMPs')
    .classed('d_sel', true)
    .on("mouseover", function (d) {
        d3.select(this)
            .style("background-color", "orange")
            .style("color", "white")
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .style("background-color", "transparent")
            .style("color", "#454545")
    })



var svg = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var formatValue = d3.format(",");
var selected_variable = 'percentageDied';
var selected_variable_scaled = 'percentageDied_scaled';
var preThing = ""
var postThing = ""
var pvariable = "Deaths: "
var formatValue = d3.format(",");





d3.csv('scaled_covid_dataset.csv', function (data) {
    console.log(data);
    var radiusScale = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {
            return parseFloat(d.population)
        }))
        .range([7, 32]);
    var scaleColor = d3.scaleSequential()
        .domain([0, 0.75])
        .interpolator(d3.interpolateYlOrRd);
    var xScale = d3.scaleLinear()
        .rangeRound([padding, width - padding])
    var bubbleHighlight = (function () {
        var current_stroke_width = 0.5
        var current_stroke = "black"

        return function () {
            current_stroke_width = current_stroke_width == 0.5 ? 2.8 : 0.5
            current_stroke = current_stroke == "black" ? "#0320c4" : "black"
            d3.select(this).style("stroke-width", current_stroke_width)
                .style("stroke", current_stroke);
        }
    })();

    xScale.domain(d3.extent(data, function (d) {
        return d[selected_variable_scaled];
    }));



    function tick() {

        d3.selectAll('.circ')
            .attr('cx', function (d) {
                return d.x
            })
            .attr('cy', function (d) {
                return d.y
            })
    }


    var circles = svg.selectAll('.circ')
        .data(data)
        .enter().append('circle').classed('circ', true)
        .attr('r', function (d) {
            return radiusScale(d.population);
        })
        .attr('cx', function (d) {
            return xScale(d[selected_variable_scaled]);
        })
        .attr('cy', function () {
            return height / 2;
        })
        .attr("fill", function (d) {
            return scaleColor(d.percentageDied_scaled);
        })
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .on('click', bubbleHighlight);


    circles.on("mouseover", function (d) {

            d3.select(this)
                .attr("stroke", "black")
                .attr("stroke-width", 3);


            d3.select("#ptooltip")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 80) + "px")
                .select("#country")
                .text(d.country)
            d3.select("#ptooltip")
                .select("#value")
                .text(formatValue(d[selected_variable]));
            d3.select("#ptooltip")
                .select("#pvariable")
                .text(pvariable);
            d3.select("#ptooltip")
                .select("#postThing")
                .text(postThing);
            d3.select("#ptooltip")
                .select("#preThing")
                .text(preThing);

            d3.select("#ptooltip").classed("hidden", false);

        })
        .on("mouseout", function () {

            //Hide the tooltip
            d3.select("#ptooltip").classed("hidden", true);
            d3.select(this)

                .attr("stroke", "black")
                .attr("stroke-width", 0.5)
                .attr("r", function (d) {
                    return radiusScale(d.population);
                });

        })


    var simulation = d3.forceSimulation(data)
        .force('x', d3.forceX(function (d) {
            return xScale(d[selected_variable_scaled])
        }))
        .force('y', d3.forceY(height / 2).strength(0.03))
        .force('collide', d3.forceCollide(function (d) {
            return radiusScale(d.population);
        }).strength(0.99))
        .alpha(0.12)
        .alphaTarget(0.3)
        .alphaDecay(0.1)
        .on('tick', tick)




    d3.selectAll('.d_sel').on('click', function () {

        selected_variable = this.value;
        selected_variable_scaled = this.value + '_scaled';

        simulation.force('x', d3.forceX(function (d) {
            return xScale(d[selected_variable_scaled])
        }))




        if (selected_variable == "percentageDied") {
            preThing = ""
            postThing = "%"
            pvariable = "Fatality Rate:"
            formatValue = d3.format(",");

            d3.select("#p0").transition().duration(800).style("opacity", 1).text("Case Fatality Rate");
            d3.select("#p1").transition().duration(800).style("opacity", 1).text(
                "Case fatality rate is proportion of deaths compared to the total number of people diagnosed."
            );
            d3.select("#p2").transition().duration(800).style("opacity", 1).text("Countries which test more people are more likely to identify mild cases. And mortality rates are generally higher in places with more older people.");

            d3.select("#less").transition().duration(800).style("opacity", 1).text("Lower death rate");
            d3.select("#more").transition().duration(800).style("opacity", 1).text("Higher death rate");
        } else if (selected_variable == "TestsPerM") {
            preThing = ""
            postThing = ""
            pvariable = "Tests per million: "
            formatValue = d3.format(",");

            d3.select("#p0").transition().duration(800).style("opacity", 1).text("Tests per million");
            d3.select("#p1").transition().duration(800).style("opacity", 1).text(
                "Testing has become very important for it gives authorities the opportunity to isolate the infected individuals and stem the spread of the virus."
            );
            d3.select("#p2").transition().duration(800).style("opacity", 1).text(
                "Germany conducted 20,629 tests per million compared to 7,103 tests per million conducted by France, as a result Germany has a fatality rate of 3% compared to France's far higher 12%."
            );

            d3.select("#less").transition().duration(800).style("opacity", 1).text(
                "Less tests");
            d3.select("#more").transition().duration(800).style("opacity", 1).text(
                "More tests");
        } else if (selected_variable == "health_expenditure_per_person") {
            preThing = "$"
            postThing = ""
            pvariable = "Health expenditure per person: "
            formatValue = d3.format(",");

            d3.select("#p0").transition().duration(800).style("opacity", 1).text(
                "Health expenditure per person");
            d3.select("#p1").transition().duration(800).style("opacity", 1).text(
                "More Healthcare spending per person can enable a country to conduct widespread testing and provide quality service to the patients."
            );
            d3.select("#p2").transition().duration(800).style("opacity", 1).text(
                "United States despite not having a universal healthcare system spends the most on healthcare per person. Although countries with higher healthcare spending like Germany and Norway have less fatality rates, Netherlands and Sweden have extremely high fatality rates despite high healthcare spending."
            );

            d3.select("#less").transition().duration(800).style("opacity", 1).text("Lower health expenditure");
            d3.select("#more").transition().duration(800).style("opacity", 1).text("Higher health expenditure");
        } else if (selected_variable == "gdp_per_capita") {
            preThing = "$"
            postThing = ""
            pvariable = "GDP per capita: "
            formatValue = d3.format(",");

            d3.select("#p0").transition().duration(800).style("opacity", 1).text(
                "GDP per capita");
            d3.select("#p1").transition().duration(800).style("opacity", 1).text(
                "GDP per capita is a measure of a country's economic output that accounts for its number of people."
            );
            d3.select("#p2").transition().duration(800).style("opacity", 1).text(
                "Top 7 countries with highest GDPs per capita seem to have less fatality rates. Some european countries like sweden and Belgium show higher fatality rates despite boasting higher GDPs which only shows that resources alone can't be effective in the absence of proper planning and timely responce."
            );

            d3.select("#less").transition().duration(800).style("opacity", 1).text(
                "Lower GDP per capita");
            d3.select("#more").transition().duration(800).style("opacity", 1).text(
                "Higher GDP per capita");
        } else if (selected_variable == "age_over_65_percentage") {
            preThing = ""
            postThing = "%"
            pvariable = "Population over 65: "
            formatValue = d3.format(",");

            d3.select("#p0").transition().duration(800).style("opacity", 1).text("Percentage of population over 65");
            d3.select("#p1").transition().duration(800).style("opacity", 1).text(
                "Older populations are at most risk with those aged 60+ having the highest fatality rates. Coutries with higher proportion of elderly population like Italy have some of the highest fatality rates."
            );
            d3.select("#p2").transition().duration(800).style("opacity", 1).text(
                "Japan seems to have lower fatality rates despite having the highest percentage of elderly population. Japan's low number of coronavirus cases can be due to its lack of testing for the virus - it has tested 796 people per capita, in comparison to South Korea's 10,659."
            );

            d3.select("#less").transition().duration(800).style("opacity", 1).text(
                "Younger Population");
            d3.select("#more").transition().duration(800).style("opacity", 1).text(
                "Older population");
        } else if (selected_variable == "government_effectiveness") {
            preThing = ""
            postThing = ""
            pvariable = "Government effectiveness score: "
            formatValue = d3.format(",");

            d3.select("#p0").transition().duration(800).style("opacity", 1).text(
                "Government effectiveness");
            d3.select("#p1").transition().duration(800).style("opacity", 1).text(
                "Government effectiveness score measures the quality of public services, civil service, policy formulation, policy implementation and government commitment and is measured on a scale from -2.5 to +2.5."
            );
            d3.select("#p2").transition().duration(800).style("opacity", 1).text(
                "There seems to be no direct correlation between higher government effectiveness score and fatality rates with Netherlands and Sweden having high fatality rates despite having some of the highest government effectiveness score"
            );

            d3.select("#less").transition().duration(800).style("opacity", 1).text(
                "Lower government effectiveness");
            d3.select("#more").transition().duration(800).style("opacity", 1).text(
                "Higher government effectiveness");
        } else if (selected_variable == "womenMPs") {
            preThing = ""
            postThing = "%"
            pvariable = "Women MPs: "
            formatValue = d3.format(",");

            d3.select("#p0").transition().duration(800).style("opacity", 1).text(
                "Proportion of female MPs");
            d3.select("#p1").transition().duration(800).style("opacity", 1).text(
                "Both Cuba and Iceland have nearly 50% MPs that are women. Although both of thsese countries have lower fatality rates, there seems to be no direct correlation between poportion of female MPs and coronavirus fatality rates"
            );
            d3.select("#p2").transition().duration(800).style("opacity", 1).text(
                ""
            );

            d3.select("#less").transition().duration(800).style("opacity", 1).text(
                "Fewer female MPs");
            d3.select("#more").transition().duration(800).style("opacity", 1).text(
                "More female MPs");
            // } else if (selected_variable == "women_mps_pct") {
            //     preThing = ""
            //     postThing = "%"
            //     pvariable = "Female MPs: "
            //     formatValue = d3.format(".2n");

            //     d3.select("#p0").transition().duration(800).style("opacity", 1).text(
            //         "Proportion of female MPs");
            //     d3.select("#p1").transition().duration(800).style("opacity", 1).text(
            //         "The proportion of MPs that are women does not seem to be stronly correlated with happiness."
            //     );
            //     d3.select("#p2").transition().duration(800).style("opacity", 1).text(
            //         "However, the happiest countries in the world do tend to have more female MPs, but there are also many less happy countries with lots of female MPs."
            //     );

            //     d3.select("#less").transition().duration(800).style("opacity", 1).text(
            //         "Fewer female MPs");
            //     d3.select("#more").transition().duration(800).style("opacity", 1).text("More female MPs");
            // } else if (selected_variable == "control_of_corruption") {
            //     preThing = ""
            //     postThing = ""
            //     pvariable = "Control of corruption score: "
            //     formatValue = d3.format(".2n");

            //     d3.select("#p0").transition().duration(800).style("opacity", 1).text(
            //         "Control of corruption");
            //     d3.select("#p1").transition().duration(800).style("opacity", 1).text(
            //         "The governemnt's percieved control of corruption appears to be somewhat correlated with happiness, despite some seemingly unhappy countries such as Botswana having surprisngly high control of corruption, and some seemingly happy countries such as Costa Rica, having lower control of corruption."
            //     );
            //     d3.select("#p2").transition().duration(800).style("opacity", 1).text(" ");

            //     d3.select("#less").transition().duration(800).style("opacity", 1).text(
            //         "Worse control of corruption");
            //     d3.select("#more").transition().duration(800).style("opacity", 1).text(
            //         "Better control of corruption");
        };

    })





})