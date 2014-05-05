(function() {
  var CountdownTimer, timer,
    _this = this;

  CountdownTimer = (function() {
    var element, endDate, interval, round_finished, rounds;

    element = document.getElementsByTagName('time')[0];

    endDate = 0;

    interval = false;

    rounds = 1;

    round_finished = false;

    function CountdownTimer() {
      this.on_sec = document.getElementsByName('on')[0];
      this.off_sec = document.getElementsByName('off')[0];
    }

    CountdownTimer.prototype.start = function() {
      rounds = document.getElementsByName('rounds')[0].value;
      timer.restart();
      return interval = setInterval(timer.tick, 100);
    };

    CountdownTimer.prototype.tick = function() {
      var formattedTime, time, timeDelta;
      time = Date.now();
      timeDelta = endDate - time + 2000;
      if (timeDelta > 0) {
        formattedTime = timer.convertToTime(timeDelta);
        return element.innerHTML = formattedTime.minutes + ':' + formattedTime.seconds;
      } else {
        if (rounds > 0) {
          if (round_finished) {
            document.getElementsByName('rounds')[0].value = rounds;
            return timer.restart();
          } else {
            timer["break"]();
            return rounds--;
          }
        } else {
          timer.playSound();
          return this.clearTimeout(interval);
        }
      }
    };

    CountdownTimer.prototype.pad = function(number) {
      if (number < 10) {
        return '0' + number;
      } else {
        return number;
      }
    };

    CountdownTimer.prototype.convertToTime = function(milliseconds) {
      var minutes, seconds, time;
      time = Math.floor(milliseconds / 1000);
      minutes = Math.floor(time / 60);
      seconds = time - (minutes * 60);
      return time = {
        minutes: this.pad(minutes),
        seconds: this.pad(seconds)
      };
    };

    CountdownTimer.prototype["break"] = function() {
      endDate = Date.now() + this.off_sec.value * 1000;
      round_finished = true;
      element.style.color = "red";
      return timer.playBreak();
    };

    CountdownTimer.prototype.restart = function() {
      endDate = Date.now() + this.on_sec.value * 1000;
      round_finished = false;
      element.style.color = "green";
      return timer.playStart();
    };

    CountdownTimer.prototype.playSound = function() {
      return alert("Fin!");
    };

    CountdownTimer.prototype.playBreak = function() {
      return document.getElementById('end').play();
    };

    CountdownTimer.prototype.playStart = function() {
      return document.getElementById('start').play();
    };

    return CountdownTimer;

  })();

  timer = new CountdownTimer;

  document.getElementsByTagName('button')[0].addEventListener("click", function(e) {
    e.preventDefault();
    return timer.start();
  });

}).call(this);
