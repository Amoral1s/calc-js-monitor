


const calcPage = document.querySelectorAll('.calc-page'),
      calcStepItem = document.querySelectorAll('.calc-step__item');

const firstCalcSet = {
  diagonal: 0,
  allHeight: 0,
  allWidth: 0,
  deep: 0,
  screenWidth: 0,
  screenHeight: 0,
  plateType: '',
  paint: ''
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
        plateSelectNext = false,
        deepClick = false;
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
          calcAlertButtonNext = calcPage[i].querySelector('.button-alert__next'),
          joyArrows = calcPage[i].querySelectorAll('.joy-item'),
          joyCircle = calcPage[i].querySelector('.joy-circle'),
          joySquare = calcPage[i].querySelector('.joy-square__wrap'),
          buttonRalNone = calcPage[i].querySelector('.button-ral-none'),
          ralTopInput = calcPage[i].querySelector('.ral-top'),
          ralBottomInput = calcPage[i].querySelector('.ral-bottom'),
          paintImg = calcPage[i].querySelector('.paint-click'),
          calcDopButtons = calcPage[i].querySelector('.calc-dop__button');
          
    let joyArrowsValueWidthLeft, 
        joyArrowsValueWidthRight, 
        joyArrowsValueHeightTop, 
        joyArrowsValueHeightBottom,
        joySelect = true;

    const arrowFunc = () => {
      joyArrowsValueWidthLeft = +(firstCalcSet.allWidth - firstCalcSet.screenWidth) / 2,
      joyArrowsValueWidthRight = +(firstCalcSet.allWidth - firstCalcSet.screenWidth) / 2,
      joyArrowsValueHeightTop = +(firstCalcSet.allHeight - firstCalcSet.screenHeight) / 2;
      joyArrowsValueHeightBottom = +(firstCalcSet.allHeight - firstCalcSet.screenHeight) / 2;
      joyArrows[0].children[0].textContent = joyArrowsValueWidthLeft;
      joyArrows[2].children[0].textContent = joyArrowsValueWidthRight;
      joyArrows[1].children[0].textContent = joyArrowsValueHeightTop;
      joyArrows[3].children[0].textContent = joyArrowsValueHeightBottom;
    } 
      
          
         
    if (plateTypeButtons) {
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
    }

    if(typeAllDeep) {
      typeAllDeep.addEventListener('click', () => {
        calcPageStepsStart.forEach((elem) => {
          elem.style.display = 'none'
        });
        pageCount++;
        myFadeIn(calcPageStepsStart[pageCount]);
        buttonNext.textContent = 'Выбрать';
        deepClick = true;

        arrowFunc();
      });
    }

    if (typeAllWidth) {
      typeAllWidth.addEventListener('input', () => {
        if (typeAllWidth.value < 180) {
          typeAllDeep.disabled = true;
          arrowFunc();

        }
        else {
          typeAllDeep.disabled = false;
          firstCalcSet.allWidth= typeAllWidth.value;
          textWidth.textContent = typeAllWidth.value;
          activeWidth.value = typeAllWidth.value - 70;
          firstCalcSet.screenWidth = typeAllWidth.value - 70;
          arrowFunc();
          if (typeAllDeep.value > 10 && typeAllHeight.value > 10) {
            buttonNext.disabled = false; 
          }
        }
      });
    }

    if(typeAllHeight) {
      typeAllHeight.addEventListener('input', () => {
        if (typeAllHeight.value < 180) {
          typeAllDeep.disabled = true;
          arrowFunc();
        }
        else {
        typeAllDeep.disabled = false;
        firstCalcSet.allHeight = typeAllHeight.value;
        textHeight.textContent = typeAllHeight.value;
        activeHeight.value = typeAllHeight.value - 70;
        firstCalcSet.screenHeight = typeAllHeight.value - 70;
        arrowFunc();
        if (typeAllDeep.value > 10 && typeAllHeight.value > 10) {
          buttonNext.disabled = false; 
        }
        }
      });
    }

    if(calcDiagItem) {
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
          firstCalcSet.screenHeight = typeAllHeight.value - 70;
          firstCalcSet.screenWidth = typeAllWidth.value - 70;
          arrowFunc();
          typeAllHeight.disabled = false;
          typeAllWidth.disabled = false;
          joySelect = true;
          typeAllDeep.disabled = false;
          if (elem.classList.contains('another')) {
            typeAllDeep.disabled = true;
          }
        });
      });
    }

    if (activeWidth) {
      activeWidth.addEventListener('input', () => {
        if (activeWidth.value < 10 || activeHeight.value < 10) {
          buttonNext.disabled = true; 
          arrowFunc();
          return
        }
        if (activeWidth.value > typeAllWidth.value - 70) {
          buttonNext.disabled = true; 
          myFadeIn(calcOverlay);
          myFadeIn(calcAlert);
        }
        else {
          buttonNext.disabled = false;
          firstCalcSet.screenWidth = activeWidth.value;
          arrowFunc();
          joySelect = true;

        }
      });
    }

    if (activeHeight) {
      activeHeight.addEventListener('input', () => {
        if (activeHeight.value < 10 || activeWidth.value < 10) {
          buttonNext.disabled = true; 
          arrowFunc();
          return
        }
        if (activeHeight.value > typeAllHeight.value - 70) {
          buttonNext.disabled = true;
          myFadeIn(calcOverlay);
          myFadeIn(calcAlert);
        } else {
          buttonNext.disabled = false;
          firstCalcSet.screenHeight = activeHeight.value;
          arrowFunc();
          joySelect = true;
        }
      });
    }

    if (calcAlertButtonPrev) {
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
    }

    if (calcAlertButtonNext) {
      calcAlertButtonNext.addEventListener('click', () => {
        myFadeOut(calcOverlay);
        myFadeOut(calcAlert);
        activeHeight.value = typeAllHeight.value - 70;
        activeWidth.value = typeAllWidth.value - 70;
        firstCalcSet.screenHeight = activeHeight.value;
        firstCalcSet.screenWidth = activeWidth.value;
        buttonNext.disabled = false; 
    });
    }

    let sqLeft = 1,
        sqTop = 1;
    
    if (joyCircle) {
      joyCircle.addEventListener('click', () => {
        arrowFunc();
        sqLeft = 1;
        sqTop = 1;
        joySquare.style.left =  0  + 'px';
        joySquare.style.top = 0  + 'px';
      });
    }

    let intervalLeft,
        intervalRight,
        intervalTop,
        intervalBottom;
    
    if (joyArrows) {
      const joyWarning = document.querySelector('.joy-warning');
      joyArrows.forEach((elem, i) => {
        elem.addEventListener('mouseup', () => {
          clearInterval(intervalLeft);
          clearInterval(intervalRight);
          clearInterval(intervalTop);
          clearInterval(intervalBottom);
        });
        
        elem.addEventListener('mousedown', () => {
            if (i == 0) {
              if (+joyArrows[0].children[0].textContent <= 35) {
                  joyWarning.style.opacity = '1';
                return 
              } else {
                joyWarning.style.opacity = '0';
                intervalLeft = setInterval(() => {
                  if (+joyArrows[0].children[0].textContent <= 35) {
                    joyWarning.style.opacity = '1';
                    return 
                  }
                  joyArrowsValueWidthLeft = +joyArrowsValueWidthLeft - 1;
                  joyArrowsValueWidthRight = +joyArrowsValueWidthRight + 1;
                  joyArrows[0].children[0].textContent = joyArrowsValueWidthLeft;
                  joyArrows[2].children[0].textContent = joyArrowsValueWidthRight;
                  if (sqLeft > -28) {
                    sqLeft--;
                    joySquare.style.left =  sqLeft  + 'px';
                  }
                  
                }, 100);
              }
              
              
            } 
            if (i == 2) {
              if (+joyArrows[2].children[0].textContent <= 35) {
                  joyWarning.style.opacity = '1';
                return 
              } else {
                joyWarning.style.opacity = '0';
                intervalRight = setInterval(() => {
                  if (+joyArrows[2].children[0].textContent <= 35) {
                    joyWarning.style.opacity = '1';
                    return 
                  }
                  joyArrowsValueWidthLeft = +joyArrowsValueWidthLeft + 1;
                  joyArrowsValueWidthRight = +joyArrowsValueWidthRight - 1;
                  joyArrows[0].children[0].textContent = joyArrowsValueWidthLeft;
                  joyArrows[2].children[0].textContent = joyArrowsValueWidthRight;
                  if(sqLeft < 31) {
                    sqLeft++;
                  joySquare.style.left = sqLeft  + 'px';
                  }
                }, 100);
              }
              
            } 
            if (i == 1) {
              if (+joyArrows[1].children[0].textContent <= 35) {
                  joyWarning.style.opacity = '1';
                return 
              } else {
                joyWarning.style.opacity = '0';
                intervalTop = setInterval(() => {
                  if (+joyArrows[1].children[0].textContent <= 35) {
                    joyWarning.style.opacity = '1';
                    return 
                  }
                  joyArrowsValueHeightTop = +joyArrowsValueHeightTop - 1;
                  joyArrowsValueHeightBottom= +joyArrowsValueHeightBottom + 1;
                  joyArrows[1].children[0].textContent = joyArrowsValueHeightTop;
                  joyArrows[3].children[0].textContent = joyArrowsValueHeightBottom;
                  if (sqTop > -32) {
                    sqTop--;
                    joySquare.style.top = sqTop  + 'px';
                  }
                }, 100);
              }
              
            } 
            if (i == 3) {
              if (+joyArrows[3].children[0].textContent <= 35) {
                  joyWarning.style.opacity = '1';
                return 
              } else {
                joyWarning.style.opacity = '0';
                intervalBottom = setInterval(() => {
                  if (+joyArrows[3].children[0].textContent <= 35) {
                    joyWarning.style.opacity = '1';
                    return 
                  }
                  joyArrowsValueHeightTop = +joyArrowsValueHeightTop + 1;
                  joyArrowsValueHeightBottom= +joyArrowsValueHeightBottom - 1;
                  joyArrows[1].children[0].textContent = joyArrowsValueHeightTop;
                  joyArrows[3].children[0].textContent = joyArrowsValueHeightBottom;
                  if (sqTop < 29) {
                    sqTop++;
                    joySquare.style.top = sqTop  + 'px';
                  }
                }, 100);
              }
              
            } 
        });
  
        
      });
    }
    
    if(buttonRalNone) {
      buttonRalNone.addEventListener('click', () => {
        firstCalcSet.paint = 'Покраска не нужна';
        buttonNext.disabled = false; 
        buttonRalNone.classList.add('button-active');
      });
    }
    if (ralTopInput) {
      ralTopInput.addEventListener('input', () => {
        buttonRalNone.classList.remove('button-active');
        firstCalcSet.paint = 'Нужна покраска';
        buttonNext.disabled = true; 

        
        if (ralTopInput.value.length >= 4 && ralBottomInput.value.length >= 4) {
          buttonNext.disabled = false; 
          
        } else if (ralTopInput.value.length >= 4) {
          ralTopInput.value = ralTopInput.value.slice(0, 4);
        }
        
      });
    }
    if (ralBottomInput) {
      ralBottomInput.addEventListener('input', () => {
        buttonRalNone.classList.remove('button-active');
        firstCalcSet.paint = 'Нужна покраска';
        buttonNext.disabled = true; 

        if (ralTopInput.value.length >= 4 && ralBottomInput.value.length >= 4) {
          buttonNext.disabled = false; 

        } else if (ralBottomInput.value.length >= 4) {
          ralBottomInput.value = ralBottomInput.value.slice(0, 4);
        }


      });
    }
    if(paintImg) {
      paintImg.addEventListener('click', () => {
        const over = document.querySelector('.calc-page__overlay__paint');
        if(paintImg.classList.contains('paint-img-active')) {
          myFadeOut(over);
          paintImg.classList.remove('paint-img-active');
        } else {
          myFadeIn(over);
          paintImg.classList.add('paint-img-active');
        }
      });
    }

   

//BUTTONS
    buttonNext.disabled = true;      
    calcPage[i].addEventListener('click', (e) => {
      console.log(plateSelect);
      console.log(plateSelectNext);
      console.log(deepClick);
      console.log(pageCount)
      console.log(firstCalcSet)
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
          myFadeIn(calcPageStepsStart[2]);
          buttonNext.disabled = false; 
          plateSelectNext = false;
        } 
        else if (plateSelect === true) {
          pageCount = 0;
          myFadeIn(calcPageStepsStart[pageCount]);
          buttonNext.disabled = false; 
          plateSelect = false;
          plateSelectNext = true;
          buttonNext.textContent = 'Далее';
        } else if (joySelect = true || pageCount == 2) {
          pageCount++;
          buttonNext.disabled = false; 
          myFadeIn(calcPageStepsStart[pageCount]);
          joySelect = false;
        } else if (pageCount == 2) {
          console.log('page 2')

          calcPageStepsStart.forEach((elem) => {
            elem.style.display = 'none'
          });
          pageCount++;
          buttonNext.disabled = false; 
          myFadeIn(calcPageStepsStart[pageCount]);
        } 
        else {
          pageCount++;
          myFadeIn(calcPageStepsStart[pageCount]);
          buttonNext.disabled = true; 
        }

        
        
       if (pageCount === 4) {
          console.log('page 3')
         buttonNext.disabled = true; 
         calcPageStepsStart.forEach((elem) => {
           elem.style.display = 'none'
         });
         myFadeIn(calcPageStepsStart[pageCount]);
         buttonNext.disabled = true; 
       } else if (pageCount === 3) {
        buttonNext.disabled = true; 
        calcPageStepsStart.forEach((elem) => {
          elem.style.display = 'none'
        });
        myFadeIn(calcPageStepsStart[pageCount]);
        buttonNext.disabled = false; 
       }
        
        
        
      }
      if(target == buttonPrev) {//PREV BUTTON
        calcPageStepsStart.forEach((elem) => { 
          elem.style.display = 'none'
        });
        if (pageCount == 2) {
          console.log('123')
          buttonNext.textContent = 'Далee';
          buttonNext.disabled = true; 
          pageCount = 0;
          myFadeIn(calcPageStepsStart[pageCount]);
          deepClick = false;
          plateSelect = false;
          return
        }

        if (pageCount == calcPageStepsStart.length - 1) {
          console.log('-3')
          buttonNext.style.display = 'block';
          pageCount--;
          myFadeIn(calcPageStepsStart[pageCount]);

        } else if (pageCount == 0) {
          myFadeOut(calcPage[i]);
          console.log(pageCount + ' reset');
          buttonNext.disabled = true; 
          
        } else if (deepClick === true) {
          buttonNext.textContent = 'Далee';
          buttonNext.disabled = true; 
          pageCount--;
          myFadeIn(calcPageStepsStart[pageCount]);
          deepClick = false;
        } 
         else if (plateSelect === true && plateSelectNext === false) {
          buttonNext.textContent = 'Далee';
          buttonNext.disabled = true; 
          pageCount = 0;
          myFadeIn(calcPageStepsStart[pageCount]);
          deepClick = false;
          plateSelect = false;
        } 
        else {
          buttonNext.style.display = 'block';
          pageCount--;
          myFadeIn(calcPageStepsStart[pageCount]);
          buttonNext.disabled = false; 
        }

        if (pageCount === 3) {
         buttonNext.disabled = false; 
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








