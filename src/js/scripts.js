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
    
    // Source: http://davidwalsh.name/battery-api
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    
    // A few useful battery properties
    console.warn("Battery charging: ", battery.charging); // true
    console.warn("Battery level: ", battery.level); // 0.58
    console.warn("Battery discharging time: ", battery.dischargingTime);
    
    var updateBatteryMeter = function() {

      $('meter.battery').attr('value', battery.level*100).text( battery.level*100 +'%' );
      
    };
    
    var updateBatteryTime = function() {

      var batteryMinutes, batteryHours;

      if(isNaN(battery.dischargingTime)) {
        $('.battery-remaining time').text( 'plugged in' );
      } else {
        batteryMinutes = battery.dischargingTime / 60;
        batteryHours = Math.floor(batteryMinutes / 60);
        batteryMinutes = batteryMinutes - (batteryHours * 60);
    
        $('.battery-remaining time').text( batteryHours + ' hours ' + batteryMinutes + ' minutes' );
        
      }
      
    };
    
    var updateLuminosity = function(lux) {
    
      var description;
      
      if( lux < 50 ) {
        description = 'dark';
        
      } else if( lux > 50 && lux <= 1000 ) {
        description = 'normal';
        
      } else {
        description = 'bright';
      }
      
      $('.luminosity').html(description);
      $('meter.brightness').attr('value', lux);
      
    };
    
    // Add a few event listeners
    battery.addEventListener("chargingchange", function(e) {
    	console.debug("Battery charge change: ", battery.charging);
      updateBatteryMeter();
    }, false);
    battery.addEventListener("levelchange", function(e) {
    	console.debug("Battery level change: ", battery.level);
      updateBatteryMeter();
    }, false);
    battery.addEventListener("chargingtimechange", function(e) {
    	console.debug("Battery charge time change: ", battery.chargingTime);
      updateBatteryTime();
    }, false);
    battery.addEventListener("dischargingtimechange", function(e) {
    	console.debug("Battery discharging time change: ", battery.dischargingTime);
      updateBatteryTime();
    }, false);
    
    window.addEventListener('devicelight', function(e){
      var lux = e.value;
      console.debug("Light changed: ", lux);
      updateLuminosity(lux);
    });




    $('button.vibrate').on('click', start(1000));

  });

})(jQuery, window, document);
