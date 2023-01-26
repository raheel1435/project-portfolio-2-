let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

// setting sound controller

var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var count = 0;

function playPause(){
    if(count == 0){
        count = 1;
        audio.play();
        playPauseBTN.innerHTML = "Pause ⏸";
    }else{
        count = 0;
        audio.pause();
        playPauseBTN.innerHTML = "Play ►";
    }

}

// getting bird element properties
let bird_props = bird.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.obstacle_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let obstacle_sprite = document.querySelectorAll('.obstacle_sprite');
        obstacle_sprite.forEach((element) => {
            let obstacle_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(obstacle_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < obstacle_sprite_props.left + obstacle_sprite_props.width && bird_props.left + bird_props.width > obstacle_sprite_props.left && bird_props.top < obstacle_sprite_props.top + obstacle_sprite_props.height && bird_props.top + bird_props.height > obstacle_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('white') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    
                    return;
                }else{
                    if(obstacle_sprite_props.right < bird_props.left && obstacle_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        
                    }
                    element.style.left = obstacle_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird-2.png';
                bird_dy = -7.6;
            }
        });
        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird.png';
            }
        });
        
        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let obstacle_seperation = 0;

    let obstacle_gap = 35;

    function create_obstacle(){
        if(game_state != 'Play') return;

        if(obstacle_seperation > 115){
            obstacle_seperation = 0;

            let obstacle_posi = Math.floor(Math.random() * 43) + 8;
            let obstacle_sprite_inv = document.createElement('div');
            obstacle_sprite_inv.className = 'obstacle_sprite';
            obstacle_sprite_inv.style.top = obstacle_posi - 70 + 'vh';
            obstacle_sprite_inv.style.left = '100vw';

            document.body.appendChild(obstacle_sprite_inv);
            let obstacle_sprite = document.createElement('div');
            obstacle_sprite.className = 'obstacle_sprite';
            obstacle_sprite.style.top = obstacle_posi + obstacle_gap + 'vh';
            obstacle_sprite.style.left = '100vw';
            obstacle_sprite.increase_score = '1';

            document.body.appendChild(obstacle_sprite);
        }
        obstacle_seperation++;
        requestAnimationFrame(create_obstacle);
    }
    requestAnimationFrame(create_obstacle);
}

