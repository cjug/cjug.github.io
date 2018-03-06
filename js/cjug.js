$(document).ready(function(){
	$.ajax({
		url: 'https://d1jzw0asklb6cp.cloudfront.net/ChicagoJug/events?photo-host=public&page=20&sig_id=13119970&sig=a0149059896b0b89fcaae31aeebe1be10df14570',
		dataType: 'jsonp',
		jsonpCallback: "meetupJsonpCallback"
	})
	$.ajax({
        url:'https://d1jzw0asklb6cp.cloudfront.net/2/groups?offset=0&format=json&group_id=6705342&photo-host=public&page=500&radius=25.0&fields=sponsors&order=id&desc=false&sig_id=193192469&sig=91943848b798fdfce1bf1ebdcf65372827f1da78',
        dataType: 'jsonp',
        jsonpCallback: "meetupSponsorJsonpCallback"
	})
});

function meetupJsonpCallback(dataWeGotViaJsonp){
	var source   = $("#meetup-template").html();
	var template = Handlebars.compile(source);
	$('#meetup-main').html(template(dataWeGotViaJsonp));
}

function meetupSponsorJsonpCallback(dataWeGotViaJsonp){
	var source   = $("#meetup-sponsors-template").html();
	var template = Handlebars.compile(source);
	$('#meetup-sponsors-main').html(template(dataWeGotViaJsonp.results[0]));
}

var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var addLeadingZero = function( num ) {
	return (num < 10) ? ('0' + num) : num;
};
var getFormattedDate = function( millis ) {
	var date = new Date( millis );
	return  months[date.getMonth()] + ' ' + addLeadingZero( date.getDate() ) + ', ' + date.getFullYear().toString();
};
var getFormattedTime = function( millis ) {
	var	time = new Date( millis ),
			hours = time.getHours(),
			min = time.getMinutes(),
			ampm = (hours > 11) ? 'PM' : 'AM';
	min = (min < 10) ? ('0' + min) : min;
	hours = (hours == 0) ? 1 : hours;
	hours = (hours > 12) ? hours-12 : hours;
	return hours + ':' + min + ' ' + ampm;
};

Handlebars.registerHelper("formatDate", function(datetime) {

	return getFormattedDate(datetime) + " | " + getFormattedTime(datetime);
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});