


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
  paint: '',
  paintTop: 0,
  paintBot: 0,
  dop: {
    diod: 'Не нужна',
    stand: 'Не нужно',
    secur: 'Не нужна'
  },
  activeSpace: {
    left: 35,
    right: 35,
    top: 35,
    bot: 35
  },
  complNeed: 'Комплектующие не нужны',
  count: 1
}

///первый шаг fadein out
calcStepItem.forEach((elem,i) => {
  elem.addEventListener('click', (e) => {
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
          calcAlertButtonChange = calcPage[i].querySelector('.button-alert__change'),
          calcAlertButtonPrev = calcPage[i].querySelector('.button-alert__prev'),
          calcAlertButtonNext = calcPage[i].querySelector('.button-alert__next'),
          joyArrows = calcPage[i].querySelectorAll('.joy-item'),
          joyCircle = calcPage[i].querySelector('.joy-circle'),
          joySquare = calcPage[i].querySelector('.joy-square__wrap'),
          buttonRalNone = calcPage[i].querySelector('.button-ral-none'),
          ralTopInput = calcPage[i].querySelector('.ral-top'),
          ralBottomInput = calcPage[i].querySelector('.ral-bottom'),
          paintImg = calcPage[i].querySelector('.paint-click'),
          calcDopButtons = calcPage[i].querySelector('.calc-dop__button'),
          dopDiodsButton = calcPage[i].querySelector('.dop-diods'),
          dopStandButton = calcPage[i].querySelector('.dop-stand'),
          dopSecurButton = calcPage[i].querySelector('.dop-security'),
          complNoneButton = calcPage[i].querySelector('.compl-none'),
          complNeedButton = calcPage[i].querySelector('.compl-need'),
          inputData = calcPage[i].querySelectorAll('.input-data'),
          buttonCalculated = calcPage[i].querySelector('.button-calculated');


    const corpNumber = calcPage[i].querySelector('.corp-number'),
          totalsFullheight = calcPage[i].querySelector('.totals-fullheight'),
          totalsFullwidth = calcPage[i].querySelector('.totals-fullwidth'),
          totalsDeep = calcPage[i].querySelector('.totals-deep'),
          totalsAleft = calcPage[i].querySelector('.totals-aleft'),
          totalsAright = calcPage[i].querySelector('.totals-aright'),
          totalsAtop = calcPage[i].querySelector('.totals-atop'),
          totalsAbot = calcPage[i].querySelector('.totals-abot'),
          totalsActiveheight = calcPage[i].querySelector('.totals-activeheight'),
          totalsActivewidth = calcPage[i].querySelector('.totals-activewidth'),
          totalsRaltop = calcPage[i].querySelector('.totals-raltop'),
          totalsRalinner = calcPage[i].querySelector('.totals-ralinner'),
          totalsDopstand = calcPage[i].querySelector('.totals-dopstand'),
          totalsDopdiod = calcPage[i].querySelector('.totals-dopdiod'),
          totalsDopsave = calcPage[i].querySelector('.totals-dopsave');
          totalsCount = calcPage[i].querySelector('.totals-count');

          if (corpNumber) {
            corpNumber.addEventListener('change', () => {
              firstCalcSet.count = corpNumber.value;
              totalsCount.textContent = corpNumber.value;
            });
          }
    const totalCost = () => {
      corpNumber.textContent;
      totalsFullheight.textContent = firstCalcSet.allHeight;
      totalsFullwidth.textContent = firstCalcSet.allWidth;
      totalsDeep.textContent = firstCalcSet.deep;
      totalsActiveheight.textContent = firstCalcSet.screenHeight;
      totalsActivewidth.textContent = firstCalcSet.screenWidth;
      totalsRaltop.textContent = firstCalcSet.paintTop;
      totalsRalinner.textContent = firstCalcSet.paintBot;
      totalsDopstand.textContent = firstCalcSet.dop.stand;
      totalsDopdiod.textContent = firstCalcSet.dop.diod;
      totalsDopsave.textContent = firstCalcSet.dop.secur;
      totalsAleft.textContent = firstCalcSet.activeSpace.left;
      totalsAright.textContent = firstCalcSet.activeSpace.right;
      totalsAtop.textContent = firstCalcSet.activeSpace.top;
      totalsAbot.textContent = firstCalcSet.activeSpace.bot;
      
    };
    if (typeAllDeep) {
      if (typeAllDeep.value > 0) {
        buttonNext.disabled = false;
      }
    }
    
    if(inputData) {
      inputData.forEach((elem) => {
        elem.addEventListener('input', () => {
          if (inputData[0].value != 0 && 
              inputData[1].value != 0 && 
              inputData[2].value != 0 && 
              inputData[3].value != 0 && 
              inputData[4].value != 0) {
            
              buttonCalculated.disabled = false; 
              
          }
        });
      });
    }
    if (buttonCalculated) {
      buttonCalculated.addEventListener('click', () => {
        totalCost();
        if (pageCount >= calcPageStepsStart.length - 2) {
          buttonNext.style.display = 'none';
        }
        calcPageStepsStart.forEach((elem) => {
          elem.style.display = 'none'
        });
        pageCount++;
          buttonNext.disabled = false; 
          myFadeIn(calcPageStepsStart[pageCount]);
      });
    }
    if (complNoneButton) {
      complNoneButton.addEventListener('click', () => {
        if(complNoneButton.classList.contains('calc-dop-active')) {
          firstCalcSet.complNeed = 'Комплектующие не нужны';
          complNoneButton.classList.remove('calc-dop-active');
          complNeedButton.classList.remove('calc-dop-active');
          buttonNext.disabled = false; 
        } else {
          firstCalcSet.complNeed = 'Комплектующие не нужны';
          complNoneButton.classList.add('calc-dop-active');
          complNeedButton.classList.remove('calc-dop-active');
          buttonNext.disabled = false; 
        }
      });
    }
    if (complNeedButton) {
      complNeedButton.addEventListener('click', () => {
        if(complNeedButton.classList.contains('calc-dop-active')) {
          firstCalcSet.complNeed = 'Нужны комплектующие';
          complNeedButton.classList.remove('calc-dop-active');
          complNoneButton.classList.remove('calc-dop-active');

          buttonNext.disabled = false; 
        } else {
          firstCalcSet.complNeed = 'Нужны комплектующие';
          complNeedButton.classList.add('calc-dop-active');
          complNoneButton.classList.remove('calc-dop-active');
          buttonNext.disabled = false; 
        }
      });
    }
    if (dopDiodsButton) {
      dopDiodsButton.addEventListener('click', () => {
        if(dopDiodsButton.classList.contains('calc-dop-active')) {
          firstCalcSet.dop.secur = 'Не нужна';
          dopDiodsButton.classList.remove('calc-dop-active');
          buttonNext.disabled = false; 

        } else {
          firstCalcSet.dop.diod = 'Нужна';
          dopDiodsButton.classList.add('calc-dop-active');
          buttonNext.disabled = false; 
        }
      });
    }
    if (dopStandButton) {
      dopStandButton.addEventListener('change', () => {
        dopStandButton.classList.add('calc-dop-active');
        if (dopStandButton.value == 0) {
          firstCalcSet.dop.secur = 'Не нужно';
          buttonNext.disabled = false; 
          dopStandButton.classList.remove('calc-dop-active');

        } if (dopStandButton.value == 1) {
          buttonNext.disabled = false; 
          firstCalcSet.dop.stand = 'Напольное крепление';
        } if (dopStandButton.value == 2) {
          buttonNext.disabled = false; 
          firstCalcSet.dop.stand = 'Настенное крепление';
        }
         if (dopStandButton.value == 3) {
          buttonNext.disabled = false; 
          firstCalcSet.dop.secur = 'Не нужно';
        }
      });
    }
    if (dopSecurButton) {
      dopSecurButton.addEventListener('click', () => {
        if (dopSecurButton.classList.contains('calc-dop-active')) {
          firstCalcSet.dop.secur = 'Не нужна';
          dopSecurButton.classList.remove('calc-dop-active');
          buttonNext.disabled = false; 

        } else {
          firstCalcSet.dop.secur = 'Нужна';
          dopSecurButton.classList.add('calc-dop-active');
          buttonNext.disabled = false; 

        }
        

      });
    }

          
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
          plateSelectNext = false;
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
        pageCount = 1;
        myFadeIn(calcPageStepsStart[pageCount]);
        buttonNext.textContent = 'Выбрать';
        buttonNext.disabled = true;
        plateTypeButtons.forEach((e) => {
          e.classList.remove('calc-inner__plate-active');
        })
        deepClick = true;

        arrowFunc();
      });
    }

    if (typeAllWidth) {
      typeAllWidth.addEventListener('input', () => {
        if (typeAllWidth.value < 180) {
          buttonNext.disabled = true;
          arrowFunc();
        }
        else {
          typeAllDeep.disabled = false;
          firstCalcSet.allWidth= typeAllWidth.value;
          textWidth.textContent = typeAllWidth.value;
          activeWidth.value = typeAllWidth.value - 70;
          firstCalcSet.screenWidth = typeAllWidth.value - 70;
          buttonNext.disabled = true; 
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
          buttonNext.disabled = true;
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
            buttonNext.disabled = true;
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
        activeHeight.value = +typeAllHeight.value - 70;
        activeWidth.value = +typeAllWidth.value - 70;
        firstCalcSet.screenHeight = activeHeight.value;
        firstCalcSet.screenWidth = activeWidth.value;
        buttonNext.disabled = false; 
    });
    }

    if (calcAlertButtonChange) {
      calcAlertButtonChange.addEventListener('click', () => {
        myFadeOut(calcOverlay);
        myFadeOut(calcAlert);
        typeAllHeight.value = +activeHeight.value + 70;
        typeAllWidth.value = +activeWidth.value + 70;
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
        firstCalcSet.activeSpace.left = 35;
        firstCalcSet.activeSpace.right = 35;
        firstCalcSet.activeSpace.top = 35;
        firstCalcSet.activeSpace.bot = 35;
        joyArrows.forEach((elem) => {
          elem.children[0].textContent = 35;
        });
        
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

          firstCalcSet.activeSpace.left = joyArrowsValueWidthLeft;
          firstCalcSet.activeSpace.right = joyArrowsValueWidthRight;
          firstCalcSet.activeSpace.top = joyArrowsValueHeightTop;
          firstCalcSet.activeSpace.bot = joyArrowsValueHeightBottom;
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
        firstCalcSet.paintTop = 'нет';
        firstCalcSet.paintBot = 'нет';
        buttonNext.disabled = false; 
        buttonRalNone.classList.add('button-active');
        ralBottomInput.value = '';
        ralTopInput.value = '';
      });
    }
    if (ralTopInput) {
      ralTopInput.addEventListener('input', () => {
        buttonRalNone.classList.remove('button-active');
        firstCalcSet.paint = 'Нужна покраска';
        buttonNext.disabled = true; 
        
        if (ralTopInput.value.length >= 4 && ralBottomInput.value.length >= 4) {
          buttonNext.disabled = false; 
          firstCalcSet.paintTop = ralTopInput.value;
          firstCalcSet.paintBot = ralBottomInput.value;
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
          firstCalcSet.paintTop = ralTopInput.value;
          firstCalcSet.paintBot = ralBottomInput.value;
          ralBottomInput.value = ralBottomInput.value.slice(0, 4);

        } else if (ralBottomInput.value.length >= 4) {
          ralBottomInput.value = ralBottomInput.value.slice(0, 4);
        }


      });
    }
    if(paintImg) {
      const over = document.querySelector('.calc-page__overlay__paint');

      paintImg.addEventListener('click', () => {
        if(paintImg.classList.contains('paint-img-active')) {
          myFadeOut(over);
          paintImg.classList.remove('paint-img-active');
        } else {
          myFadeIn(over);
          paintImg.classList.add('paint-img-active');
        }
      });
      over.addEventListener('click', () => {
        myFadeOut(over);
        paintImg.classList.remove('paint-img-active');
      });
    }

   

//BUTTONS
    buttonNext.disabled = true; 
    
    let calcPageI = calcPage[i];
    

    let calcPageIClick = function(e) {

      console.log(pageCount);
      console.log(plateSelectNext + ' plateSelectNext');
      console.log(plateSelect + ' plateSelect');
      console.log(deepClick + ' deepClick');
      
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
        if (pageCount == 2) {
          deepClick = false;
        }
        
       if (pageCount === 4) {
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
        else if (pageCount === 6) {
        buttonNext.disabled = true; 
       }
        
        
        
      }
      if(target == buttonPrev) {//PREV BUTTON
        calcPageStepsStart.forEach((elem) => { 
          elem.style.display = 'none'
        });

        if (pageCount == calcPageStepsStart.length - 1 && calcPageStepsStart.length > 2) {
          buttonNext.style.display = 'block';
          pageCount--;
          myFadeIn(calcPageStepsStart[pageCount]);
        } else if (pageCount == 0) {
          window.location.reload()
          calcDiagItem.forEach((e) => {
            e.classList.remove('calc-diag__item-active');
          });
          myFadeOut(calcPage[i]);
          typeAllDeep.value = 0;
          typeAllDeep.disabled = true;
          typeAllHeight.value = 0;
          typeAllWidth.value = 0
          calcPageI.removeEventListener("click", calcPageIClick);

        } else if (deepClick === true) {
          buttonNext.textContent = 'Далee';
          pageCount = 0;
          myFadeIn(calcPageStepsStart[pageCount]);
          pageCount = 1;
          deepClick = false;
          console.log('lols')
          
        } 
         else if (plateSelect === true && plateSelectNext === false) {
          buttonNext.textContent = 'Далee';
          pageCount = 0;
          myFadeIn(calcPageStepsStart[pageCount]);
          deepClick = false;
          plateSelect = false;

        } else if (pageCount == 2) {
          console.log(1111)
          buttonNext.textContent = 'Далee';
          pageCount = 0;
          myFadeIn(calcPageStepsStart[pageCount]);
          deepClick = false;
          plateSelect = false;
          plateSelectNext = true;
        } else {
          buttonNext.style.display = 'block';
          pageCount--;
          myFadeIn(calcPageStepsStart[pageCount]);

        }

       /*  if (pageCount === 3) {
         buttonNext.disabled = false; 
       } else if (pageCount === 5) {
         buttonNext.disabled = false; 
          
       } */
        
      }
    };
    calcPageI.addEventListener('click', calcPageIClick);
    





    //end
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








