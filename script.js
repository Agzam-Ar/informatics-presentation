let slideID = 0;

let eSlides;

const SLIDES = [
	{file: "motherboard", 	name: "Материнская плата"},
	{file: "cpu", 			name: "Центральный процессор (CPU)"},
	{file: "ram", 			name: "Оперативная память"},
	{file: "video_card", 	name: "Видеокарта"},
	{file: "power_block", 	name: "Блок питания (БП)"},
	{file: "memory", 		name: "Внутренние устройства хранения и записи данных"},
	{file: "audio_card", 	name: "Звуковая карта"},
	{file: "сooler", 		name: "Кулеры, радиаторы, вентиляторы и другие типы систем охлаждения."},
];

let s;

window.onload = function() {
}


window.onkeydown = function(e) {
	if(!isLoaded) loadAll();
}
window.onmousedown = function(e) {
	if(!isLoaded) loadAll();
}

let isLoaded = false;

function loadAll() {
	isLoaded = true;
	eSlides = document.getElementById('slides');
	eSlides.innerHTML = "";
	slideID = 0;

	for (var i = 0; i < SLIDES.length; i++) {
		var silde = SLIDES[i];
		var eSlide = document.createElement('iframe');

		eSlide.classList = "slide-box";
		eSlide.id = "slide-" + i;
		eSlide.src = "slides/" + silde.file + ".html";
		eSlides.append(eSlide);

		if(i == 0) {
			s = eSlide;
			eSlide.focus();
		}
	}

	console.log("Loaded");
	console.log(document.onkeydown);


	window.onmessage = function(e) {
		keyPressed(e.data.payload);
	}
	window.onkeydown = function(e) {
		keyPressed(e.code);
	}

	document.body.focus();

	setInterval(function() {
		document.activeElement.blur();
		if(document.documentElement.offsetWidth < document.documentElement.offsetHeight) {
			document.body.style.overflowY = 'visible';
		} else {
			document.body.style.overflowY = 'hidden';
		}
	}, 1000 / 60);
}


function keyPressed(key) {
		if(eSlides == undefined) return;
		console.log(key);

		if(key == 'ArrowRight' || key == 'Space') {
			slideID++;
			if(slideID > SLIDES.length-1) slideID = SLIDES.length-1;
		} else if(key == 'ArrowLeft') {
			slideID--;
			if(slideID < 0) slideID = 0;
		}

		var scrollDiv = eSlides.children[slideID].offsetTop;

		window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
}





window.ontouchstart = handleTouchStart;    
window.ontouchmove = handleTouchMove;    

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}    

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }


    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    console.log(xDiff);
                            
        if ( xDiff > 0 ) {
            keyPressed('ArrowRight');
        } else {
            keyPressed('ArrowLeft');
        }    

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/                   
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};