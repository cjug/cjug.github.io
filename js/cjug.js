$(document).ready(function(){
	$.ajax({
		url: 'https://api.meetup.com/ChicagoJug/events?photo-host=public&page=20&sig_id=13119970&sig=a0149059896b0b89fcaae31aeebe1be10df14570',
		dataType: 'jsonp',
        success: function(dataWeGotViaJsonp){
        	var source   = $("#meetup-template").html();
        	var template = Handlebars.compile(source);
        	$('#meetup-main').append(template(dataWeGotViaJsonp));
        }
	})
});

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
	
	return getFormattedDate(datetime) + " | " getFormattedTime(datetime);
}