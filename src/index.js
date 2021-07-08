

function expressionCalculator(expr) {
    
    // Проверка на скобку с числом
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === ')' || expr[i] === '(') {
        if (expr[i - 1] !== ' ' || expr[i + 1] !== ' ') {
          throw Error('ExpressionError: Brackets must be paired');
        }
      }
    } 

    if (expr[0] === ' ' && expr[expr.length - 1] === ' ') {
      expr = expr.slice(1, expr.length - 1)
        expr = expr.split(' ');  
    } else {
        expr = expr.split(' ');  
    }
  
    // Удаление пустого элемента из массива (из-за двойного пробела)
    for (let i = 0; i < expr.length; i++) {
      if (expr[i].length === 0) expr.splice(i, 1);
    }

    // Проверка на деление на ноль
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '0' && expr[i - 1] === '/' && i !== 0) throw Error('TypeError: Division by zero.');
    }

    let arrArgument = [];

    //  аргументы для функции 
    for (let i = 0; i < expr.length; i++) {
      if (Number.isInteger(+expr[i])) {
        arrArgument.push(expr[i]);
      }
    }
  
  
    let stringExample = expr.slice();
    let nk = 0;
  
    // строка примера
    for (let i = 0; i < expr.length; i++) {
      if ( Number.isInteger(+expr[i])) {
        stringExample[i] = '+nk' + nk;
        nk++;
      }
    }
    stringExample = 'return ' + stringExample.join(' ');
  
    // строка для параметром функции
    let stringParameters = [];
    for (let i = 0; i < arrArgument.length; i++) {
      stringParameters.push('nk' + i);
    }
  
    let func = new Function(stringParameters, stringExample);
  
    let result = Number(func(...arrArgument).toFixed(4));
    return result;
}

module.exports = {
    expressionCalculator
}