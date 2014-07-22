(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    // FireShell
    
    var vibrateInterval;
    
    // Starts vibration at passed in level
    var start = function(duration) {
    	navigator.vibrate(duration);
    }
    
    // Stops vibration
    var stop = function() {
      console.debug(navigator.vibrate);
    	// Clear interval and stop persistent vibrating 
    	if(vibrateInterval) clearInterval(vibrateInterval);
    	navigator.vibrate(0);
    }
    
    // Start persistent vibration at given duration and interval
    // Assumes a number value is given
    var startPeristent = function(duration, interval) {
    	vibrateInterval = setInterval(function() {
    		startVibrate(duration);
    	}, interval);
    }
    
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    
    // A few useful battery properties
    console.warn("Battery charging: ", battery.charging); // true
    console.warn("Battery level: ", battery.level); // 0.58
    console.warn("Battery discharging time: ", battery.dischargingTime);
    
    $('meter.battery').attr('value', battery.level*100).text( battery.level*100 +'%' );
    $('.battery-remaining time').text( battery.dischargingTime / 1000 );
    
    // Add a few event listeners
    battery.addEventListener("chargingchange", function(e) {
    	console.warn("Battery charge change: ", battery.charging);
    }, false);
    battery.addEventListener("chargingtimechange", function(e) {
    	console.warn("Battery charge time change: ", battery.chargingTime);
    }, false);
    battery.addEventListener("dischargingtimechange", function(e) {
    	console.warn("Battery discharging time change: ", battery.dischargingTime);
    }, false);
    battery.addEventListener("levelchange", function(e) {
    	console.warn("Battery level change: ", battery.level);
    }, false);
    
    $('button.vibrate').on('click', start(1000));

  });

})(jQuery, window, document);
