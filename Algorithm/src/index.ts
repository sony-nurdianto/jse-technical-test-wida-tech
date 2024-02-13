function findCombinations(l: number, t: number): number[][] {
    const result: number[][] = [];
  
    function backtrack(path: number[], remainingDigits: number[], target: number, start: number): void {
      if (path.length === l && target === 0) {
        result.push([...path]);
        return;
      }
  
      for (let i = start; i < remainingDigits.length; i++) {
        const digit = remainingDigits[i];
  
        if (!path.includes(digit)) {
          path.push(digit);
  
          const nextDigits = [...remainingDigits];
  
          backtrack(path, nextDigits, target - digit, i + 1);
  
          path.pop();
        }
      }
    }
  
    const initialDigits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    backtrack([], initialDigits, t, 0);
  
    return result;
  }
  
  console.log(findCombinations(3, 6));
  console.log(findCombinations(3, 8));
  console.log(findCombinations(4, 5));