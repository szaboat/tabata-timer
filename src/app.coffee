class CountdownTimer
    element = document.getElementsByTagName('time')[0]
    endDate = 0
    interval = false
    rounds = 1
    round_finished = false

    constructor: ->
        @on_sec = document.getElementsByName('on')[0]
        @off_sec = document.getElementsByName('off')[0]

    start: ->
        rounds = document.getElementsByName('rounds')[0].value
        timer.restart()
        interval = setInterval timer.tick, 100 # FIXME use singleton

    tick: ->
        time = Date.now()
        timeDelta = endDate - time + 1000
        if timeDelta > 0
            formattedTime = timer.convertToTime timeDelta # FIXME use singleton
            element.innerHTML = formattedTime.minutes + ':' + formattedTime.seconds
        else
            if rounds > 0
                if round_finished
                    document.getElementsByName('rounds')[0].value = rounds
                    timer.restart()
                else
                    timer.break()
                    rounds--
            else
                timer.playSound()
                @.clearTimeout(interval)

    pad: (number) ->
        if number < 10
            '0' + number
        else
            number

    convertToTime: (milliseconds) ->
        time = Math.floor milliseconds / 1000
        minutes = Math.floor time / 60
        seconds = time - (minutes * 60)
        time =
            minutes : @pad minutes
            seconds : @pad seconds

    break: ->
        endDate = Date.now() + @off_sec.value * 1000
        round_finished = true
        element.style.color = "red"

    restart: ->
        endDate = Date.now() + @on_sec.value * 1000
        round_finished = false
        element.style.color = "green"

    playSound: ->
        alert "Fin!" # TODO find mp3, create audio tag, play mp3

timer = new CountdownTimer
document.getElementsByTagName('button')[0].addEventListener "click", (e) =>
    e.preventDefault()
    timer.start()
