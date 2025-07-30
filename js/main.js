const player = document.querySelector('.player'),
    playBtn = document.querySelector('.play'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    progressContainer = document.querySelector('.progress_container'),
    progress = document.querySelector('.progress'),
    title = document.querySelector('.song'),
    cover = document.querySelector('.cover_img'),
    img_src = document.querySelector('.img_src')

// название песен
const songs = ['Darari', 'Fire', 'Not Today']

// песня по умолчанию
let songIndex = 0;

// Init
function loadSong(song) {
    title.innerHTML = song
    audio.src = `audio/${song}.mp3`
    cover.src = `img/cover${songIndex + 1}.jpg`
}
loadSong(songs[songIndex])

// Play
function playSong() {
    player.classList.add('play')
    cover.classList.add('active')
    img_src.src = 'img/play.png'
    audio.play()
}

// Pause
function pauseSong() {
    player.classList.remove('play')
    cover.classList.remove('active')
    img_src.src = 'img/stop.png'
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
})

// Next song
function nextSong() {
    songIndex++

    if (songIndex >= songs.length)
        songIndex = 0

    loadSong(songs[songIndex])
    playSong()
}

nextBtn.addEventListener('click', nextSong)

// Prev song

function prevSong() {
    songIndex--

    if (songIndex < 0)
        songIndex = songs.length - 1

    loadSong(songs[songIndex])
    playSong()
}

prevBtn.addEventListener('click', prevSong)

// ProgressBar

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

function  setProgress(e) {
    const width = this.clientWidth
    const clickLocationX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickLocationX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// autoplay

audio.addEventListener('ended', nextSong)