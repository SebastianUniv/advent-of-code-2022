import * as day1 from "./day-1";
import * as day2 from "./day-2";

const solutions = [day1, day2];

solutions.forEach((solution, index) => {
  const [one, two] = solution.solve();

  console.log(`----------------`);
  console.log(`[Day ${index + 1}]`);
  console.log(`----------------`);
  console.log(`Part 1: ${one}`);
  console.log(`Part 2: ${two}`);
});
