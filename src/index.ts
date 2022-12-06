import * as day1 from "./day-1";
import * as day2 from "./day-2";
import * as day3 from "./day-3";
import * as day4 from "./day-4";
import * as day5 from "./day-5";

const solutions = [day1, day2, day3, day4, day5];

solutions.forEach((solution, index) => {
  const [one, two] = solution.solve();

  console.log(`----------------`);
  console.log(`[Day ${index + 1}]`);
  console.log(`----------------`);
  console.log(`Part 1: ${one}`);
  console.log(`Part 2: ${two}`);
});
