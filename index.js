console.log("Welcome to Kong v/s Godzilla")
let score = 0;
let cross = true

let start = new Audio('sound.mp3')
let end = new Audio('roaring-5.mp3')

setTimeout(() => {
    start.play()
}, 1000);

document.onkeydown = function (e) {
    console.log('key code is: ', e.key)
    if (e.key == 'ArrowUp') {
        kong = document.querySelector('.kong');
        kong.classList.add('jumpKong');
        setTimeout(() => {
            kong.classList.remove('jumpKong');
        }, 1000);
    }
    if (e.key == 'ArrowRight') {
        kong = document.querySelector('.kong');
        kongX = parseInt(window.getComputedStyle(kong, null).getPropertyValue('left'));
        kong.style.left = (kongX + 100) + "px"
    }
    if (e.key == 'ArrowLeft') {
        kong = document.querySelector('.kong');
        kongX = parseInt(window.getComputedStyle(kong, null).getPropertyValue('left'));
        kong.style.left = (kongX - 100) + "px"
    }
}

setInterval(() => {
    kong = document.querySelector('.kong');
    gameOver = document.querySelector('.gameOver');
    godzilla = document.querySelector('.godzilla');

    kxVal = parseInt(window.getComputedStyle(kong, null).getPropertyValue('left'))
    kyVal = parseInt(window.getComputedStyle(kong, null).getPropertyValue('top'))

    gxVal = parseInt(window.getComputedStyle(godzilla, null).getPropertyValue('left'))
    gyVal = parseInt(window.getComputedStyle(godzilla, null).getPropertyValue('top'))

    offsetX = Math.abs(kxVal - gxVal)
    offsetY = Math.abs(kyVal - gyVal)

    if (offsetX < 115 && offsetY < 55) {
        gameOver.innerHTML = "Game Over: Reload to PLay Again"
        document.querySelector('.small').innerHTML = ""
        godzilla.classList.remove('attackGodzilla');
        end.play()
        setTimeout(() => {
            end.pause()
            start.pause()
        }, 2000);
    }
    else if (offsetX < 115 && cross) {
        score += 1
        incScore(score);
        cross = false;
        setTimeout(() => {
            cross = true
        }, 1000);

        setTimeout(() => {
            duration = parseFloat(window.getComputedStyle(godzilla, null).getPropertyValue('animation-duration'));
            if (duration != 3.0) {

                new_dur = duration - 0.2
                godzilla.style.animationDuration = new_dur + 's';
                console.log(new_dur)
            }
        }, 500);
    }

}, 10);

function incScore(score) {
    scoreCount = document.querySelector('.scoreCount');
    scoreCount.innerText = "Score = " + score
}