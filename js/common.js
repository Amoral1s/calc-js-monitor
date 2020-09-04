'use strict'

const startItem = document.querySelectorAll('.calc__item'); //Блоки с экранами (для старта квиза) (4)

if (startItem.length == 4) {

  const startPage = document.querySelectorAll('.calc-startpage'), // Выбор какой калькулятор откроется (4)
        firstStep = document.querySelector('.calc-step'), //основной блок (исчезает после клика на выбор экрана)
        radioDiv = document.querySelectorAll('.calc-page__radio'), // блок с инпутами для валидации перехода на след страницу
        calcPage = document.querySelectorAll('.calc-page'); // Страницы калькулятора (для навигации)
  
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
    elem.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('calc-prev')) {
        calcPage[i].style.display = 'none';
        let pageSetNum = pageSet - 1;
        pageSet--;
        if (pageSet == -1) {
          firstStep.style.display = 'flex';
          startPage.forEach((elem) => {
            elem.style.display = 'none';
          });
          pageSet = 0;
        }
        if (calcPage[pageSetNum] != undefined) {
          calcPage[pageSetNum].style.display = 'block';
        }
      }
      if (target.classList.contains('calc-next')) {
        if (calcPage.length - 1 === pageSet) {
          calcPage[i].style.display = 'none';
          calcPage[i + 1].style.display = 'block';
        } else {
          calcPage[i].style.display = 'none';
          calcPage[i + 1].style.display = 'block';
          pageSet++;
        }
      }
    });
  });
  ///==== навигация ^





}