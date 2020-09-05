'use strict'

const startItem = document.querySelectorAll('.calc__item'); //Блоки с экранами (для старта квиза) (4)
 //Блоки с экранами (для старта квиза) (4)

if (startItem.length == 4) {

  const startPage = document.querySelectorAll('.calc-startpage'), // Выбор какой калькулятор откроется (4)
        firstStep = document.querySelector('.calc-step'), //основной блок (исчезает после клика на выбор экрана)
        /* radioDiv = document.querySelectorAll('.calc-page__radio'), */ // блок с инпутами для валидации перехода на след страницу
        calcPage = document.querySelectorAll('.calc-page'), // Страницы калькулятора (для навигации)
        calcPaintRAL = document.querySelector('.calc-page__right-paint'); //Блок RAL покраски
        
  let firstCalcSet = {
      diag: 0,
      screenWidth: 0,
      screenHeight: 0,
      plateType: '',
      plateTypeCost: 0,
      deep: 0,
      screenActive: '',
      paint: 35,
      diod: '',
      floor: ''
  };

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
  calcPage.forEach((elem, i) => {
    


    const nextValid = elem.querySelector('.calc-next'); //Кнопка некст
      if (elem.classList.contains('novalid')) {
        nextValid.disabled = false;
    }
    elem.addEventListener('click', (event) => {
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
        firstCalcSet.diag = +target.dataset.diag;
        firstCalcSet.screenWidth = +target.dataset.width;
        firstCalcSet.screenHeight = +target.dataset.height;
      }
      //валадиция 2 экрана 1 калькулятора (тип платы)
      if (target.classList.contains('nast-plate')) {
        firstCalcSet.plateType = target.dataset.title;
        firstCalcSet.deep = +target.dataset.deep;

        //Добавление значений к инпутам (шаг 4), минимальные габариты
        const nastAllSize = document.querySelectorAll('.nast-all-size');
        nastAllSize[0].value = +firstCalcSet.screenWidth; //ширина
        nastAllSize[0].min = +firstCalcSet.screenWidth;
        nastAllSize[1].value = +firstCalcSet.screenHeight; //высота
        nastAllSize[1].min = +firstCalcSet.screenHeight;
        nastAllSize[2].value = +firstCalcSet.deep; //глубина
        nastAllSize[2].min = +firstCalcSet.deep;
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
      } else {
        nextValid.disabled = false;
      }
      console.log(firstCalcSet);



      if (target.classList.contains('paint-ral')) { //валидация блока покраски
        calcPaintRAL.style.display = 'block';
        nextValid.disabled = true;
      } else if (target.classList.contains('nast-paint')) {
        calcPaintRAL.style.display = 'none';
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