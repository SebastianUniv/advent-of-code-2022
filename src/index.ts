import * as day1 from "./day-1";
import * as day2 from "./day-2";
import * as day3 from "./day-3";
import * as day4 from "./day-4";
import * as day5 from "./day-5";
import * as day6 from "./day-6";
import * as day7 from "./day-7";
import * as day8 from "./day-8";
import * as day9 from "./day-9";
import * as day10 from "./day-10";
import * as day11 from "./day-11";
import * as day12 from "./day-12";
import * as day13 from "./day-13";
import * as day14 from "./day-14";
import * as day15 from "./day-15";
import * as day16 from "./day-16";

const solutions = [
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
  day13,
  day15,
  day16,
];

solutions.forEach((solution, index) => {
  const [one, two] = solution.solve();

  console.log(`----------------`);
  console.log(`[Day ${index + 1}]`);
  console.log(`----------------`);
  console.log(`Part 1: ${one}`);
  console.log(`Part 2: ${two}`);
});
