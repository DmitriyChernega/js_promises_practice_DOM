'use strict';

function showMessege(message, className) {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.classList.add(className);
  el.textContent = message;

  document.body.appendChild(el);
}

let rightClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      rightClick = true;
    }

    if (rightClick || leftClick) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (rightClick || leftClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => showMessege(message, `success`))
  .catch((error) => showMessege(error.message, 'error'));

secondPromise.then((message) => showMessege(message, `success`));
thirdPromise.then((message) => showMessege(message, `success`));

