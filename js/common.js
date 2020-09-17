


const calcPage = document.querySelectorAll('.calc-page'),
      calcStepItem = document.querySelectorAll('.calc-step__item');

const firstCalcSet = {
  diagonal: 0,
  allHeight: 0,
  allWidth: 0,
  deep: 0,
  screenWidth: 0,
  screenHeight: 0,
  plateType: ''
}

///первый шаг fadein out
calcStepItem.forEach((elem,i) => {
  elem.addEventListener('click', () => {
    calcPage.forEach((elem) => {
      elem.style.display = 'none';
    });
    myFadeIn(calcPage[i]);
    const calcPageStepsStart = calcPage[i].querySelectorAll('.calc-page__step');
    calcPageStepsStart.forEach((elem) => {
      elem.style.display = 'none'
    });
    myFadeIn(calcPageStepsStart[0]);
    let pageCount = 0,
        plateSelect = false,
        plateSelectNext = false;
    let buttonPrev = calcPage[i].querySelector('.calc-page__prev'),
          buttonNext = calcPage[i].querySelector('.calc-page__next'),
          calcDiagItem = calcPage[i].querySelectorAll('.calc-diag__item'),
          typeAllHeight = calcPage[i].querySelector('.type-all-height'),
          typeAllWidth = calcPage[i].querySelector('.type-all-width'),
          typeAllDeep = calcPage[i].querySelector('.type-all-deep'),
          textHeight = calcPage[i].querySelector('.first-screen-height'),
          textWidth = calcPage[i].querySelector('.first-screen-width'),
          textDeep = calcPage[i].querySelector('.first-screen-deep'),
          plateTypeButtons = calcPage[i].querySelectorAll('.calc-inner__plate'),
          plateImages = calcPage[i].querySelectorAll('.calc-inner__plateimg'),
          activeHeight = calcPage[i].querySelector('.active-height'),
          activeWidth = calcPage[i].querySelector('.active-width'),
          calcAlert = calcPage[i].querySelector('.calc-page__alert'),
          calcOverlay = calcPage[i].querySelector('.calc-page__overlay'),
          calcAlertButtonPrev = calcPage[i].querySelector('.button-alert__prev'),
          calcAlertButtonNext = calcPage[i].querySelector('.button-alert__next');
          

    plateTypeButtons.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        plateTypeButtons.forEach((elem) => {
          elem.classList.remove('calc-inner__plate-active');
        });
        elem.classList.add('calc-inner__plate-active');
        if (elem.classList.contains('calc-inner__plate-active')) {
          plateImages.forEach((img) => {
            img.style.display = 'none';
          });
          
          myFadeInFlex(plateImages[i]);
        }
        typeAllDeep.value = elem.dataset.deep;
        textDeep.textContent = elem.dataset.deep;
        firstCalcSet.deep = elem.dataset.deep;
        buttonNext.disabled = false; 
        plateSelect = true;
      });
    });

    if(typeAllDeep) {
      typeAllDeep.addEventListener('click', () => {
        calcPageStepsStart.forEach((elem) => {
          elem.style.display = 'none'
        });
        pageCount++;
        myFadeIn(calcPageStepsStart[pageCount]);
        buttonNext.textContent = 'Выбрать';
      });
    }

    if (typeAllWidth) {
      typeAllWidth.addEventListener('input', () => {
        firstCalcSet.allWidth= typeAllWidth.value;
        textWidth.textContent = typeAllWidth.value;
        activeWidth.value = typeAllWidth.value - 70;
        if (typeAllDeep.value > 10 && typeAllHeight.value > 10) {
          buttonNext.disabled = false; 
        }
      });
    }
    if(typeAllHeight) {
      typeAllHeight.addEventListener('input', () => {
        firstCalcSet.allHeight = typeAllHeight.value;
        textHeight.textContent = typeAllHeight.value;
        activeHeight.value = typeAllHeight.value - 70;
        if (typeAllDeep.value > 10 && typeAllHeight.value > 10) {
          buttonNext.disabled = false; 
        }
      });
    }
    

    calcDiagItem.forEach((elem) => {
      elem.addEventListener('click', () => {
        calcDiagItem.forEach((elem) => {
          elem.classList.remove('calc-diag__item-active');
        });
        elem.classList.add('calc-diag__item-active');
        firstCalcSet.allHeight = elem.dataset.height;
        firstCalcSet.allWidth = elem.dataset.width;
        firstCalcSet.diagonal = elem.dataset.diagonal;
        typeAllHeight.value = elem.dataset.height;
        typeAllWidth.value = elem.dataset.width;
        textHeight.textContent = elem.dataset.height;
        textWidth.textContent = elem.dataset.width;
        
        activeHeight.value = +elem.dataset.height - 70;
        activeWidth.value = +elem.dataset.width - 70;
        typeAllDeep.disabled = false;
      });
    });

    activeWidth.addEventListener('input', () => {
      if (activeWidth.value > typeAllWidth.value - 70) {
        buttonNext.disabled = true; 
        myFadeIn(calcOverlay);
        myFadeIn(calcAlert);
      }
      else {
        buttonNext.disabled = false;
      }
    });
    activeHeight.addEventListener('input', () => {
      if (activeHeight.value > typeAllHeight.value - 70) {
        buttonNext.disabled = true;
        myFadeIn(calcOverlay);
        myFadeIn(calcAlert);
      } else {
        buttonNext.disabled = false;
      }
    });
    calcAlertButtonPrev.addEventListener('click', () => {
        calcPageStepsStart.forEach((elem) => { 
          elem.style.display = 'none'
        });
        myFadeOut(calcOverlay);
        myFadeOut(calcAlert);
        pageCount = 0;
        myFadeIn(calcPageStepsStart[pageCount]);
        buttonNext.disabled = true; 
        plateSelect = false;
        plateSelectNext = false;
        typeAllDeep.disabled = false;
        typeAllDeep.value = 0;
    });
    calcAlertButtonNext.addEventListener('click', () => {
        myFadeOut(calcOverlay);
        myFadeOut(calcAlert);
        activeHeight.value = typeAllHeight.value - 70;
        activeWidth.value = typeAllWidth.value - 70;
        buttonNext.disabled = false; 
    });






//BUTTONS
    buttonNext.disabled = true;      
    calcPage[i].addEventListener('click', (e) => {
      let target = e.target;

      if(target == buttonNext && buttonNext.disabled == false) { //NEXT BUTTON
        if (pageCount >= calcPageStepsStart.length - 2) {
          buttonNext.style.display = 'none';
        }
        calcPageStepsStart.forEach((elem) => {
          elem.style.display = 'none'
        });
        if (plateSelectNext == true) {
          pageCount = 2;
          myFadeIn(calcPageStepsStart[pageCount]);
          buttonNext.disabled = false; 
          plateSelectNext = false;
        } 
        else if (plateSelect === true) {
          pageCount = 0;
          myFadeIn(calcPageStepsStart[pageCount]);
          buttonNext.disabled = false; 
          plateSelect = false;
          plateSelectNext = true;
          typeAllDeep.disabled = true;
          buttonNext.textContent = 'Далее';
        } else {
          pageCount++;
          myFadeIn(calcPageStepsStart[pageCount]);
          buttonNext.disabled = true; 
        }

        
        
        
        
      }
      if(target == buttonPrev) {//PREV BUTTON
        if (pageCount >= calcPageStepsStart.length - 3) {
          buttonNext.style.display = 'block';
        }
        calcPageStepsStart.forEach((elem) => { 
          elem.style.display = 'none'
        });
        if (pageCount == 0) {
          myFadeOut(calcPage[i]);
          console.log(pageCount + ' reset');
          
        } else {
          pageCount--;
          myFadeIn(calcPageStepsStart[pageCount]);
        }
        
      }
    });
    
  }, { once: false });
  
});


function myFadeIn(el) {
	var opacity = 0.01;
	el.style.display = "block";
	var timer = setInterval(function() {
		if(opacity >= 1) {
			clearInterval(timer);
		}
		el.style.opacity = opacity;
		opacity += opacity * 0.1;
	}, 10);
}
function myFadeOut(el) {
	var opacity = 1;
	var timer = setInterval(function() {
		if(opacity <= 0.1) {
			clearInterval(timer);
			el.style.display = "none";
		}
		el.style.opacity = opacity;
		opacity -= opacity * 0.1;
	}, 10);
}

function myFadeInFlex(el) {
	var opacity = 0.01;
	el.style.display = "flex";
	var timer = setInterval(function() {
		if(opacity >= 1) {
			clearInterval(timer);
		}
		el.style.opacity = opacity;
		opacity += opacity * 0.1;
	}, 10);
}








