export class Solver {
  constructor(private target: number, private values: number[]) {}

  solve() {
    const sum = this.values.reduce((prev, curr) => prev + curr, 0);
    if (sum === this.target) {
      return this.values.join(" + ");
    } else return undefined;
  }
}

// class Solution {
//     constructor()
// }
