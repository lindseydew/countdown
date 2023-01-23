export class Solver {
  constructor(private target: number, private values: number[]) {}

  solve() {
    let solutionBuilder = "";
    let currentTotal = 0;
    this.values.forEach((v) => {
      if (currentTotal === this.target) {
        return solutionBuilder;
      } else {
        currentTotal += v;
        solutionBuilder += `${v} + `;
      }
    });
    if (currentTotal !== this.target) {
      return undefined;
    } else return solutionBuilder;
  }
}

// class Solution {
//     constructor()
// }
