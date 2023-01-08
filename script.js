let button = document.querySelector('.btn');
let login = document.querySelector('.login');
let icon = document.querySelector('.menu_small_icon')
let stick = document.querySelector('.stick')
let condition = true
let start = 0
let end = 0
let num = 1
let windowMy = document.querySelector('.window')
let timesId = [["time_0", 250], ["time_1", 290], ["time_2", 290], ["time_3", 330], ["time_4", 290], ["time_5", 350], ["time_6", 350], ["time_7", 400], ["time_8", 320], ["time_9", 350], ["time_10", 400], ["time_11", 450], ["time_12", 320], ["time_13", 350], ["time_14", 400], ["time_15", 450]]
let places = []
let price_result = 0
let doPlace = false
let price = 0

function addPlace(){
    places = []
    choice.innerHTML = ''
    price_result = 0
    document.querySelector('.price_result').innerHTML = 'Итого: ' + price_result + ' &#8381;'
    for (let i = 0; i < 41; i+=8){
        for(let j = 0; j < 8; j++){
            places.push("place_" + (i+j))
        }
        choice.insertAdjacentHTML('beforeend',
            `
            <div class="row-choice">
                <div class="place" data-place="place_${i}" data-choice="no"></div>
                <div class="place" data-place="place_${i+1}" data-choice="no"></div>
                <div class="place" data-place="place_${i+2}" data-choice="no"></div>
                <div class="place" data-place="place_${i+3}" data-choice="no"></div>
                <div class="place" data-place="place_${i+4}" data-choice="no"></div>
                <div class="place" data-place="place_${i+5}" data-choice="no"></div>
                <div class="place" data-place="place_${i+6}" data-choice="no"></div>
                <div class="place" data-place="place_${i+7}" data-choice="no"></div>
            </div>
            `
        )
    }
}
addPlace()

function forwards(){
    icon.style.marginLeft = '0px'
    anime({
        targets: '.naver',
        translateX: ['-100vw', '-1vw'],
        easing:'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    })
    
    anime({
        targets: '.menu_small_icon',
        rotate: 90,
   
        easing: 'easeInOutQuad',
        diraction: 'alternate',
        duration: 1000,
        loop: false
    })
    anime({
        targets: '.stick',
        rotate: 180,
        easing: 'easeInOutQuad',
        diraction: 'alternate',
        duration: 1000,
        loop: false
    })
    condition = false
}
function backwards(){
    anime({
        targets: '.naver',
        translateX: ['-1vw', '-100vw'],
        easing:'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    })
    
    anime({
        targets: '.menu_small_icon',
        rotate: 180,
        easing: 'easeInOutQuad',
        diraction: 'alternate',
        duration: 1000,
        loop: false
    })
    anime({
        targets: '.stick',
        rotate: -180,
        easing: 'easeInOutQuad',
        diraction: 'alternate',
        duration: 1000,
        loop: false
    })
    condition = true
}
function handle() {
    if(document.querySelector('.form-sub').value){
        let inputs = document.querySelectorAll("input");
        let input_values = [];
        for (let i = 0; i < inputs.length; i++) {
            input_values.push(inputs[i].value);
        }
        alert('Спасибо за подписку, ' + login.value)
    }
}


$('.menu_small_icon').click(function(){
    if(condition){
        forwards()

    }else{
        backwards()
    }
})
$('header').on('touchstart', function(event){
    start = event.originalEvent.touches[0].pageX
})
$('header').on('touchend', function(event){
    end = event.originalEvent.changedTouches[0].pageX
    if (end - start >= 100 && condition){
        forwards()
    }
    else if (start - end >= 100 && !condition){
        backwards()
    }
})
button.addEventListener('click', handle);
let links = document.querySelectorAll('.scroll')
let targetID
links.forEach(function(element){
    element.addEventListener('click', function(event){
        event.preventDefault()
        targetID = element.getAttribute('href')
        document.querySelector(targetID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
})
$(document).ready(function () {
    $('.slider').bxSlider({
        pagerCustom: '.slider-nav',
        infiniteLoop: false,
        hideControlOnEnd: true,
    });
});
films.addEventListener('click', function(e){
    if(!e.target.dataset.open){ 
        return
    }
    for(let i=0; i<timesId.length; i++){
        if(timesId[i][0] = e.target.dataset.open){
            windowMy.dataset.dis = 'flex'
            darker.style.display = 'block'
            price = timesId[i][1]
            i = timesId.length - 1
        }
    }
})
back.addEventListener('click', function(){
    windowMy.dataset.dis = 'none'
    darker.style.display = 'none'
    addPlace()
})
buy.addEventListener('click', function(){
    let inp1 = document.querySelector('.inp1').value
    let inp2 = document.querySelector('.inp2').value
    let inp3 = document.querySelector('.inp3').value
    if(inp1 && inp2 && inp3){
        Swal.fire({
            icon: 'success',
            title: 'Спасибо за покупку'
        })
        windowMy.dataset.dis = 'none'
        darker.style.display = 'none'
        addPlace()
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Пожалуйста, заполните все поля!',
          })
    }
    
    
})
choice.addEventListener('click', function(e){
    if(!e.target.dataset.place){ 
        return
    }

    if(e.target.dataset.choice = "yes"){
        e.target.dataset.choice = "no"
        price_result -= price
        document.querySelector('.price_result').innerHTML = 'Итого: ' + price_result + ' &#8381;'
        
    }
})
choice.addEventListener('click', function(e){
    if(!e.target.dataset.place){ 
        return
    }
    for(let i=0; i<places.length; i++){
        if(places[i][0] = e.target.dataset.place && doPlace == false){ 
            doPlace = true
        }
    }

    if(doPlace = true){
        if(e.target.dataset.choice = "no"){
            e.target.dataset.choice = "yes"
            price_result += price
            document.querySelector('.price_result').innerHTML = 'Итого: ' + price_result + ' &#8381;'
            
        }
        doPlace = false
    }
        
        
})

