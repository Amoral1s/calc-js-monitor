'use strict'

const startItem = document.querySelectorAll('.calc__item'); //Блоки с экранами (для старта квиза) (4)
 //Блоки с экранами (для старта квиза) (4)

if (startItem.length == 4) {

  const startPage = document.querySelectorAll('.calc-startpage'), // Выбор какой калькулятор откроется (4)
        firstStep = document.querySelector('.calc-step'), //основной блок (исчезает после клика на выбор экрана)
        /* radioDiv = document.querySelectorAll('.calc-page__radio'), */ // блок с инпутами для валидации перехода на след страницу
        calcPage = document.querySelectorAll('.calc-page'), // Страницы калькулятора (для навигации)
        calcPaintRAL = document.querySelector('.calc-page__right-paint'); //Блок RAL покраски
        const nastAllSize = document.querySelectorAll('.nast-all-size');
        const nastScreenSize = document.querySelectorAll('.nast-screen-size');
        const nastScreenActive = document.querySelectorAll('.nast-screen-active');

        

        

  let firstCalcSet = {
      diag: 0,
      screenWidth: 0,
      screenHeight: 0,
      plateType: '',
      plateTypeCost: 0,
      deep: 0,
      screenActive: '',
      allSizeWidth: 0,
      allSizeHeight: 0,
      paint: 35,
      diod: '',
      floor: '',
      messageStep2: '',
      messageStep3: '',
      messageStep4: '',
      messageStep5: '',
      messageStep6: ''
  };
  //Допольнительные сообщения в каждой странице
  const textarea1 = document.querySelector('#text-step-2');

  textarea1.addEventListener('change', () => {
    firstCalcSet.messageStep2 = textarea1.value;
  });
  
  //Первый шаг, клик по выбору монитора
  startItem.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      firstStep.style.display = 'none';
      startPage[i].style.display = 'block';
      calcPage[0].style.display = 'block';
    });
  });
  
  
  //Навигация по кнопкам через индексы
  let pageSet = 0;
  calcPage.forEach((elem, i) => { // начало цикла страниц
        const diagSelect = document.querySelector('#diag-select');
        
      

      nastScreenSize.forEach((elem) => {
        elem.addEventListener('input', (e, i) => {
          if (elem.value > 1) {
            nextValid.disabled = false;
          } else {
            nextValid.disabled = true;
            
          }
          let target = e.target;
          if (target.classList.contains('screen-diag')) {
            firstCalcSet.diag = elem.value;
            console.log(elem.value);
            let inchCM = elem.value * 2.54;
            console.log(inchCM);
            if (diagSelect.value == 1) {
              inchCM = inchCM / Math.sqrt(337, 2);
              firstCalcSet.screenWidth = Math.round((inchCM * 16) * 10);
              firstCalcSet.screenHeight = Math.round((inchCM * 9) * 10);
            }
            if (diagSelect.value == 2) {
              inchCM = inchCM / Math.sqrt(356, 2);
              firstCalcSet.screenWidth = Math.round((inchCM * 16) * 10);
              firstCalcSet.screenHeight = Math.round((inchCM * 10) * 10);
            }
            if (diagSelect.value == 3) {
              inchCM = inchCM / Math.sqrt(25, 2);
              firstCalcSet.screenWidth = Math.round((inchCM * 4) * 10);
              firstCalcSet.screenHeight = Math.round((inchCM * 3) * 10);
            }
            nastScreenSize[1].value = firstCalcSet.screenWidth;
            nastScreenSize[2].value = firstCalcSet.screenHeight;
          }
          if (target.classList.contains('screen-width')) {
            firstCalcSet.screenWidth = elem.value;
          }
          if (target.classList.contains('screen-height')) {
            firstCalcSet.screenHeight = elem.value;
          }
        });
      });


    const nextValid = elem.querySelector('.calc-next'); //Кнопка некст
      if (elem.classList.contains('novalid')) {
        nextValid.disabled = false;
    }
    elem.addEventListener('click', (event) => {
      const checkbox = elem.querySelectorAll('input[type="radio"]');
          checkbox.forEach((elem, i) => {
            elem.addEventListener('click', (e) => {
              let target = e.target;
              if (target == target) {
                checkbox.forEach((elem) => {
                  elem.classList.remove('check');
                });
                target.classList.add('check');
                
              }
            });
          });
      const diagrows = document.querySelector('.calc-page__diagrows'); //оверлей первого шага диагонали
      //валидация значение Минимум у инпутов
      const startItem = document.querySelectorAll('input[type="number"]');
      startItem.forEach((elem) => {
        elem.addEventListener('input', () => {
          if (elem.value < elem.getAttribute('min')) {
            elem.value = elem.getAttribute('min');
          }
        });
      });
      //
      let target = event.target;
      const nextValid = elem.querySelector('.calc-next'); //Кнопка некст
      //валадиция 1 экрана 1 калькулятора (диагональ)
      if (target.classList.contains('nast-diag')) {
        nextValid.disabled = false;

        firstCalcSet.diag = +target.dataset.diag;
        firstCalcSet.screenWidth = +target.dataset.width;
        firstCalcSet.screenHeight = +target.dataset.height;
        
        nastScreenSize[0].value = +firstCalcSet.diag; //ширина
        nastScreenSize[1].value = +firstCalcSet.screenWidth; //ширина
        nastScreenSize[1].min = +firstCalcSet.screenWidth;
        nastScreenSize[2].value = +firstCalcSet.screenHeight; //высота
        nastScreenSize[2].min = +firstCalcSet.screenHeight;
        
        diagrows.classList.remove('calc-page__diagrows__active'); // ovarlay
      } if (target.classList.contains('nast-diag-other')) {
        nextValid.disabled = false;
        
        diagrows.classList.add('calc-page__diagrows__active'); // overlay delete
        nastScreenSize.forEach((elem) => { // сброс значений при нажатии на свою диагональ
          elem.value = 0;
          elem.min = 0;
          elem.value = elem.value.replace(/^0+/, '');
        });
      }
      //валадиция 2 экрана (тип платы)
      if (target.classList.contains('nast-plate')) {
        nextValid.disabled = false;

        firstCalcSet.plateType = target.dataset.title;
        firstCalcSet.deep = +target.dataset.deep;
        //Добавление значений к инпутам (шаг 4), минимальные габариты
        nastAllSize[0].value = +firstCalcSet.screenWidth + 140; //ширина + минимальная рамка в 70мм
        nastAllSize[0].min = +firstCalcSet.screenWidth + 140;
        nastAllSize[1].value = +firstCalcSet.screenHeight + 140; //высота
        nastAllSize[1].min = +firstCalcSet.screenHeight + 140;
        nastAllSize[2].value = +firstCalcSet.deep; //глубина
        nastAllSize[2].min = +firstCalcSet.deep;

        //Активная область экрана при нажатии на плату
        nastScreenActive[0].value = +firstCalcSet.screenWidth; //высота
        nastScreenActive[0].max = +firstCalcSet.screenWidth;
        nastScreenActive[1].value = +firstCalcSet.screenHeight; //глубина
        nastScreenActive[1].max = +firstCalcSet.screenHeight;

        
      }
      //валадиция 7 экрана 1 калькулятора (покраска)
      if (target.classList.contains('nast-diod')) {
        if (target.checked) {
          firstCalcSet.diod = 10000; /// ЦЕНА ДИОДНОЙ ПОДСВЕТКИ
        } else {
          firstCalcSet.diod = 0;
        }
      }
      if (target.classList.contains('nast-floor')) {
        if (target.checked) {
          firstCalcSet.floor = 20000; /// ЦЕНА ПОДСТАВКИ ДЛЯ ПОЛА
        } else {
          firstCalcSet.floor = 0;
        }
      }

      


      if (firstCalcSet.diag === undefined || firstCalcSet.diag === 0) { // валидация кнопки
        nextValid.disabled = true;
      } 
      console.log(firstCalcSet);



      if (target.classList.contains('paint-ral')) { //валидация блока покраски
        calcPaintRAL.style.display = 'block';
        nextValid.disabled = true;
      } else if (target.classList.contains('nast-paint')) {
        calcPaintRAL.style.display = 'none';
        nextValid.disabled = false;
      }

      if (target.classList.contains('nast-ral')) {
        nextValid.disabled = true;
        target.addEventListener('input', () => {
          if (target.value.length < 4) {
            nextValid.disabled = true;
          } else {
            nextValid.disabled = false;
          }
        });
      }
      
      if (target.classList.contains('calc-prev')) { // кнопка назад
        calcPage[i].style.display = 'none'; // текущий слайд минус
        let pageSetNum = pageSet - 1; // редирект счетчика
        pageSet--;// счетчик минус
        if (pageSet == -1) { // если массив счетчика меньше 0
          firstStep.style.display = 'flex'; // главный экран +
          startPage.forEach((elem) => {
            elem.style.display = 'none'; // все калькуляторы минус
          });
          pageSet = 0; // ссчетчик слайдов в 0
        }
        if (calcPage[pageSetNum] != undefined) {
          calcPage[pageSetNum].style.display = 'block'; // возврат к начальному экрану
        }
      }
      if (target.classList.contains('calc-next')) { //кнопка вперед
        if (calcPage.length - 1 === pageSet) { //макс значение
          calcPage[i].style.display = 'none'; // текущи слайд мину
          calcPage[i + 1].style.display = 'block'; // след слайд +
        } else {
          calcPage[i].style.display = 'none'; // текущий лайд минус
          calcPage[i + 1].style.display = 'block'; //след слайд +
          pageSet++; // счетчик ++
        }
      }
    });
  });
  ///==== навигация ^
  

  //Визуализация с картинками
  const nastPlate = document.querySelectorAll('.nast-plate'),
        nastImages = calcPage[1].querySelectorAll('.calc-page__right div');

  nastPlate.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      nastImages.forEach((elem) => {
        elem.style.display = 'none';
      });
      nastImages[i].style.display = 'block';
    });
  });


}