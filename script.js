const tracks = [
    {
        title: "Bad (Alternate Vocals)",
        artist: "Michael Jackson",
        album: "Bad",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438322/Michael_Jackson_Bad_Nick__Totally_Rad_Remix_Alternate_Vocals_Michael_256k_pbn3mu.mp3",
        duration: "3:30"
    },
    {
        title: "Bad (Shortened Version)",
        artist: "Michael Jackson",
        album: "Bad",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438386/Michael_Jackson_-_Bad_Shortened_Version__256k_fehu8y.mp3",
        duration: "3:10"
    },
    {
        title: "Black Or White",
        artist: "Michael Jackson",
        album: "Dangerous",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438389/Michael_Jackson_-_Black_Or_White_Official_Video_-_Shortened_Version__256k_ped9ha.mp3",
        duration: "4:15"
    },
    {
        title: "Come Together",
        artist: "Michael Jackson",
        album: "HIStory",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438390/Michael_Jackson_-_Come_Together_Official_Video__256k_qmnikk.mp3",
        duration: "5:27"
    },
    {
        title: "Don't Stop 'Til You Get Enough",
        artist: "Michael Jackson",
        album: "Off The Wall",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438391/Michael_Jackson_-_Don_t_Stop_Til_You_Get_Enough_Official_Video_-_Upscaled__256k_qykx60.mp3",
        duration: "4:11"
    },
    {
        title: "Wanna Be Startin' Somethin'",
        artist: "Michael Jackson",
        album: "Thriller",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438391/Wanna_Be_Startin_Somethin__256k_baing0.mp3",
        duration: "6:03"
    },
    {
        title: "They Don't Care About Us",
        artist: "Michael Jackson",
        album: "HIStory",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438393/Michael_Jackson_-_They_Don_t_Care_About_Us_256k_yctwd7.mp3",
        duration: "4:44"
    },
    {
        title: "Smooth Criminal",
        artist: "Michael Jackson",
        album: "Bad",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438393/Michael_Jackson_-_Smooth_Criminal_Official_Video__256k_tzkxbk.mp3",
        duration: "4:17"
    },
    {
        title: "Beat It",
        artist: "Michael Jackson",
        album: "Thriller",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438394/Michael_Jackson_-_Beat_It_Official_4K_Video__256k_fjm3x4.mp3",
        duration: "4:58"
    },
    {
        title: "Billie Jean",
        artist: "Michael Jackson",
        album: "Thriller",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779438398/Michael_Jackson_-_Billie_Jean_Official_Video__256k_g47hyd.mp3",
        duration: "4:55"
    },
    {
        title: "Thriller",
        artist: "Michael Jackson",
        album: "Thriller",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779443406/Michael_Jackson_-_Thriller_Official_Video_-_Shortened_Version__256k_hdb7og.mp3",
        duration: "5:57"
    },
    {
        title: "Jam",
        artist: "Michael Jackson",
        album: "Dangerous",
        url: "https://res.cloudinary.com/dm9f0cvxy/video/upload/v1779443407/Michael_Jackson_-_Jam_Official_Video_-_Upscaled__256k_pfcd5l.mp3",
        duration: "5:39"
    }
];

const trackListElement = document.getElementById('track-list');
const audioElement = document.getElementById('audio-element');
const playPauseBtn = document.getElementById('play-pause-btn');
const masterPlayBtn = document.getElementById('master-play');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playerTitle = document.getElementById('player-title');
const progress = document.getElementById('progress');
const progressWrapper = document.getElementById('progress-wrapper');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const albumArtWrapper = document.querySelector('.album-art-wrapper');

let currentTrackIndex = 0;
let isPlaying = false;

// Render track list
function renderTracks() {
    trackListElement.innerHTML = '';
    tracks.forEach((track, index) => {
        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');
        trackItem.dataset.index = index;
        
        trackItem.innerHTML = `
            <div class="col-index">
                <span class="index-number">${index + 1}</span>
                <i class="fa-solid fa-play play-anim"></i>
            </div>
            <div class="track-info">
                <img src="assets/mj_album_art.png" alt="Album Art">
                <div>
                    <div class="track-name">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
            </div>
            <div class="col-album">${track.album}</div>
            <div class="col-duration">${track.duration}</div>
        `;

        trackItem.addEventListener('click', () => {
            if (currentTrackIndex === index && isPlaying) {
                pauseTrack();
            } else {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playTrack();
            }
        });

        trackListElement.appendChild(trackItem);
    });
}

function loadTrack(index) {
    const track = tracks[index];
    audioElement.src = track.url;
    playerTitle.textContent = track.title;
    
    // Update UI
    document.querySelectorAll('.track-item').forEach(el => {
        el.classList.remove('playing');
        el.querySelector('.play-anim').className = 'fa-solid fa-play play-anim';
    });
    const currentTrackEl = document.querySelector(`.track-item[data-index="${index}"]`);
    if(currentTrackEl) {
        currentTrackEl.classList.add('playing');
        currentTrackEl.querySelector('.play-anim').className = 'fa-solid fa-pause play-anim';
    }
}

function playTrack() {
    isPlaying = true;
    audioElement.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    masterPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    albumArtWrapper.classList.add('playing');
    
    // Update icon in list
    const currentTrackEl = document.querySelector(`.track-item[data-index="${currentTrackIndex}"]`);
    if(currentTrackEl) {
        currentTrackEl.querySelector('.play-anim').className = 'fa-solid fa-pause play-anim';
        currentTrackEl.classList.add('playing');
    }
}

function pauseTrack() {
    isPlaying = false;
    audioElement.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-left: 2px;"></i>';
    masterPlayBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-left: 4px;"></i>';
    albumArtWrapper.classList.remove('playing');
    
    // Update icon in list
    const currentTrackEl = document.querySelector(`.track-item[data-index="${currentTrackIndex}"]`);
    if(currentTrackEl) {
        currentTrackEl.querySelector('.play-anim').className = 'fa-solid fa-play play-anim';
    }
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

function playPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    if (isNaN(duration)) return;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Format current time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    
    // Format duration
    let totalMinutes = Math.floor(duration / 60);
    let totalSeconds = Math.floor(duration % 60);
    if (totalSeconds < 10) totalSeconds = `0${totalSeconds}`;
    totalTimeEl.textContent = `${totalMinutes}:${totalSeconds}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    audioElement.currentTime = (clickX / width) * duration;
}

// Event Listeners
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        if(!audioElement.src || audioElement.src.includes('undefined')) loadTrack(currentTrackIndex);
        playTrack();
    }
});

masterPlayBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        if(!audioElement.src || audioElement.src.includes('undefined')) loadTrack(currentTrackIndex);
        playTrack();
    }
});

nextBtn.addEventListener('click', playNextTrack);
prevBtn.addEventListener('click', playPrevTrack);
audioElement.addEventListener('timeupdate', updateProgress);
audioElement.addEventListener('ended', playNextTrack);
progressWrapper.addEventListener('click', setProgress);

// Load initial track data (but don't play)
renderTracks();
loadTrack(0);

// Golden Sparks Animation
const sparksContainer = document.getElementById('sparks-container');

function createSpark() {
    if (!sparksContainer) return;
    const spark = document.createElement('div');
    spark.classList.add('spark');
    
    // Randomize spark properties
    const left = Math.random() * 100;
    const size = Math.random() * 3 + 2; // 2px to 5px
    const duration = Math.random() * 4 + 3; // 3s to 7s
    
    spark.style.left = `${left}%`;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.animationDuration = `${duration}s`;
    
    sparksContainer.appendChild(spark);
    
    // Remove spark after animation completes
    setTimeout(() => {
        if(spark.parentNode) spark.remove();
    }, duration * 1000);
}

// Create initial sparks and interval
for (let i = 0; i < 20; i++) {
    setTimeout(createSpark, Math.random() * 2000);
}
setInterval(createSpark, 150);
