// collection of helper functions used across the app

/* 
Input: localStorage string entry (i.e. 'id,x,y,noteText')
Output: array with string entry 
*/
export function processLocalStorageEntry(entryString) {
    var pageX = '';
    var pageY = '';

    let ptr = 0;
    while(entryString[ptr] !== ',') {
      pageX += entryString[ptr];
      ptr ++;
    }
    ptr ++;
    while(entryString[ptr] !== ',') {
      pageY += entryString[ptr];
      ptr ++;
    }
    ptr ++;

    return [pageX, pageY, entryString.substring(ptr, entryString.length)]
  }

  export function genRandomNoteUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
  
  export function getRandomIntInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
