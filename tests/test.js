// Dependency-free tests for BSDate.js. Run with: node tests/test.js
const path = require("path");
const BS = require(path.join(__dirname, "..", "BSDate.js"));

let failures = 0;
function check(name, cond) {
  if (cond) {
    console.log("ok   " + name);
  } else {
    failures++;
    console.log("FAIL " + name);
  }
}

// Anchor: BS 2000-01-01 = AD 1943-04-14.
let anchor = BS.adToBs(1943, 3, 14);
check("anchor converts to 2000-01-01",
  anchor && anchor.year === 2000 && anchor.month === 1 && anchor.day === 1);

// AD -> BS -> AD round-trips across the supported range.
const samples = [
  [2026, 9, 5], [2024, 0, 1], [2000, 0, 1], [2033, 11, 31],
  [1943, 3, 14], [1990, 6, 15], [2015, 4, 24], [2040, 0, 15],
];
for (const [y, m, d] of samples) {
  const bs = BS.adToBs(y, m, d);
  const back = bs && BS.bsToAd(bs.year, bs.month, bs.day);
  check(`round-trip ${y}-${m + 1}-${d} -> ${bs && BS.bsDateKey(bs.year, bs.month, bs.day)}`,
    !!back && back.year === y && back.month === m + 1 && back.day === d);
}

// Regression: 17 Oct 2026 is 31 Ashwin 2083 (Ashwin 2083 has 31 days).
const todayBs = BS.adToBs(2026, 9, 17);
check("2026-10-17 -> 2083-06-31",
  todayBs && todayBs.year === 2083 && todayBs.month === 6 && todayBs.day === 31);
check("1 Ashwin 2083 -> 2026-09-17",
  (() => { const ad = BS.bsToAd(2083, 6, 1); return ad && ad.year === 2026 && ad.month === 9 && ad.day === 17; })());
check("Ashwin 2083 has 31 days",
  BS.MONTH_EN[5] === "Ashwin" && BS.bsToAd(2083, 6, 31) !== null && BS.bsToAd(2083, 6, 32) === null);

// Out-of-range AD dates return null instead of garbage.
check("before anchor returns null", BS.adToBs(1943, 3, 13) === null);

// Grid invariants for a known month: Ashwin 2083 has 31 days.
const grid = BS.bsMonthGrid(2083, 6, 1, "2083-06-31");
check("grid has 6 weeks", grid.length === 6);
check("grid has 42 cells",
  grid.reduce((n, w) => n + w.days.length, 0) === 42);
const flat = grid.flatMap((w) => w.days);
check("exactly one today cell",
  flat.filter((c) => c.today).length === 1);
check("today cell is 2083-06-31",
  flat.some((c) => c.today && c.bsYear === 2083 && c.bsMonth === 6 && c.bsDay === 31));
check("31 in-month days for Ashwin 2083",
  flat.filter((c) => c.inMonth).length === 31);
const weekNos = grid.map((w) => w.week);
check("BS weeks run consecutively",
  weekNos.every((v, i) => i === 0 || v === weekNos[i - 1] + 1));
check("all cells carry both calendars",
  flat.every((c) => c.adYear > 0 && c.adDay > 0 && c.weekday >= 0 && c.weekday <= 6));

// Week numbers are weeks of the BS year, resetting at Baisakh 1.
const baisakh = BS.bsMonthGrid(2083, 1, 1, "2083-01-01");
check("Baisakh 2083 grid starts at BS week 1",
  baisakh.length > 0 && baisakh[0].week === 1);
check("week 1 cell is Baisakh 1",
  (() => { const ad = BS.bsToAd(2083, 1, 1); const bs = BS.adToBs(ad.year, ad.month - 1, ad.day);
    return baisakh[0].days.some((c) => c.key === BS.bsKey(bs)); })());
check("bsWeekOfYear resets at Baisakh",
  BS.bsWeekOfYear(2083, 1, 1, 1) === 1 && BS.bsWeekOfYear(2083, 12, 30, 1) > 48);
check("Chaitra 2082 is late in its own year, not reset with 2083",
  BS.bsWeekOfYear(2082, 12, 30, 1) > 48 && BS.bsWeekOfYear(2083, 1, 1, 1) === 1);

// Year progress stays within bounds.
for (const [y, m, d] of [[2000, 1, 1], [2083, 6, 19], [2100, 12, 30]]) {
  const p = BS.bsYearProgressPercent(y, m, d);
  check(`year progress ${y}-${m}-${d} in [0,100] (${p}%)`, p >= 0 && p <= 100);
}

// Month stepping clamps at the data edges and rolls years over.
check("step Dec->Jan rolls year",
  JSON.stringify(BS.stepBsMonth(2083, 12, 1)) === JSON.stringify({ year: 2084, month: 1 }));
check("step Jan->Dec rolls year back",
  JSON.stringify(BS.stepBsMonth(2083, 1, -1)) === JSON.stringify({ year: 2082, month: 12 }));
check("step clamps at 2000-01",
  JSON.stringify(BS.stepBsMonth(2000, 1, -5)) === JSON.stringify({ year: 2000, month: 1 }));
check("step clamps at 2100-12",
  JSON.stringify(BS.stepBsMonth(2100, 12, 5)) === JSON.stringify({ year: 2100, month: 12 }));

// Labels render in both scripts.
const bs = { year: 2083, month: 6, day: 19, weekday: 1 };
check("roman label", BS.formatRoman(bs) === "19 Ashwin 2083");
check("nepali label", BS.formatNepali(bs) === "१९ असोज २०८३");

if (failures > 0) {
  console.log(`\n${failures} test(s) failed`);
  process.exit(1);
}
console.log("\nAll tests passed");
