
const fibonacciLogger = lengthOfOutput => {
     function* fibbo() {
          const indexBase = [1, 1]
          while (true) {
               const newIndex = indexBase[0] + indexBase[1]
               indexBase.shift()
               indexBase.push(newIndex)
               indexBase[0] === 1 && (yield 1)
               yield newIndex
          }
     }
     const fibbonacci = fibbo()
     for (let i = 0; i < lengthOfOutput; i++) {
          console.log(fibbonacci.next().value)
     }
}
fibonacciLogger(10)