(function ($) {
    "use strict";

    $.fn.extend({ 

      countdown100: function(options) {
        var defaults = {
          timeZone: "",
          endtimeYear: 0,
          endtimeMonth: 0,
          endtimeDate: 0,
          endtimeHours: 0,
          endtimeMinutes: 0,
          endtimeSeconds: 0,
        }

        var options =  $.extend(defaults, options);

        return this.each(function() {
          var obj = $(this);
          var timeNow = new Date();

          var tZ = options.timeZone; console.log(tZ);
          var endYear = options.endtimeYear;
          var endMonth = options.endtimeMonth;
          var endDate = options.endtimeDate;
          var endHours = options.endtimeHours;
          var endMinutes = options.endtimeMinutes;
          var endSeconds = options.endtimeSeconds;

          if(tZ == "") {
            var deadline = new Date(endYear, endMonth - 1, endDate, endHours, endMinutes, endSeconds);
          } 
          else {
            var deadline = moment.tz([endYear, endMonth - 1, endDate, endHours, endMinutes, endSeconds], tZ).format();
          }

          if(Date.parse(deadline) < Date.parse(timeNow)) {
            var deadline = new Date(Date.parse(new Date()) + endDate * 24 * 60 * 60 * 1000 + endHours * 60 * 60 * 1000); 
          }
          
          var t = Date.parse(deadline) - Date.parse(new Date());
            
          var clock = $(obj).FlipClock(t/1000, {
            clockFace: 'DailyCounter',
            countdown: true
          });


        });
      }
    });

    let savedEndTime = localStorage.getItem("countdownEndTime");

if (!savedEndTime) {
    // Set end time to 10 minutes from now
    let futureTime = new Date();
    futureTime.setMinutes(futureTime.getMinutes() + 10);

    savedEndTime = futureTime.toISOString();
    localStorage.setItem("countdownEndTime", savedEndTime);
}

let targetTime = new Date(savedEndTime);

$('.cd100').countdown100({
    endtimeYear: targetTime.getFullYear(),
    endtimeMonth: targetTime.getMonth() + 1, // JavaScript month is 2-based
    endtimeDate: targetTime.getDate(),
    endtimeHours: targetTime.getHours(),
    endtimeMinutes: targetTime.getMinutes(),
    endtimeSeconds: targetTime.getSeconds(),
    timeZone: "Asia/Kathmandu"
});
    // Clear the countdown when the page is closed or refreshed
    window.addEventListener("beforeunload", function() {
        localStorage.removeItem("countdownEndTime");
    });

    // Clear the countdown when the countdown ends
    clock.on('stop', function() {
        localStorage.removeItem("countdownEndTime");
    });

})(jQuery);