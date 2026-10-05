// BSDate.js - Bikram Sambat conversion for Omarchy bar widget.
// Data source: Nepal Panchanga Nirnayak Samiti data, as published by
// @sonill/nepali-dates (calendar-data.json), BS 2000-2100.
// Anchor: BS 2000-01-01 (Baisakh 1) = AD 1943-04-14.
// Pure JS + QML compatible (imported as `import "BSDate.js" as BS`).
// Also testable under node.

var MS_PER_DAY = 86400000;

var BS_DATA = {
  "2000": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2001": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2002": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2003": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2004": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2005": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2006": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2007": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2008": [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  "2009": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2010": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2011": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2012": [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  "2013": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2014": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2015": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2016": [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  "2017": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2018": [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2019": [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2020": [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  "2021": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2022": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  "2023": [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2024": [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  "2025": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2026": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2027": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2028": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2029": [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  "2030": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2031": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2032": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2033": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2034": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2035": [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  "2036": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2037": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2038": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2039": [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  "2040": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2041": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2042": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2043": [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  "2044": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2045": [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2046": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2047": [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  "2048": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2049": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  "2050": [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2051": [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  "2052": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2053": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  "2054": [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2055": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2056": [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  "2057": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2058": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2059": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2060": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2061": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2062": [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  "2063": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2064": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2065": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2066": [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  "2067": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2068": [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2069": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2070": [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  "2071": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2072": [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2073": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  "2074": [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  "2075": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2076": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  "2077": [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2078": [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  "2079": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  "2080": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  "2081": [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2082": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2083": [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  "2084": [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  "2085": [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  "2086": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2087": [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  "2088": [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  "2089": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2090": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2091": [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  "2092": [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2093": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2094": [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  "2095": [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
  "2096": [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  "2097": [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  "2098": [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31],
  "2099": [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],
  "2100": [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30]
};

var MONTH_EN = ["Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
var MONTH_EN_SHORT = ["Bai", "Jes", "Ash", "Shr", "Bha", "Ash", "Kar", "Man", "Pou", "Mag", "Fal", "Cha"];
var MONTH_EN_SHORT = ["Bai", "Jet", "Asa", "Sau", "Bha", "Aso", "Kar", "Man", "Pus", "Mag", "Fal", "Cha"];
var MONTH_NE = ["बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत"];
var WEEKDAY_EN_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var WEEKDAY_NE_SHORT = ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"];
var WEEKDAY_NE_LONG = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
var DEV_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function toDevanagari(value) {
  var s = String(value);
  var out = "";
  for (var i = 0; i < s.length; i++) {
    var ch = s[i];
    if (ch >= "0" && ch <= "9") out += DEV_DIGITS[Number(ch)];
    else out += ch;
  }
  return out;
}

function daysInBsYear(bsYear) {
  var months = BS_DATA[String(bsYear)];
  if (!months) return 0;
  var total = 0;
  for (var i = 0; i < 12; i++) total += months[i];
  return total;
}

// AD (year, month0, day) -> {year, month (1-12), day, weekday} or null if out of range.
function adToBs(adYear, adMonth0, adDay) {
  var anchor = Date.UTC(1943, 3, 14);
  var target = Date.UTC(adYear, adMonth0, adDay);
  if (!isFinite(target)) return null;
  var diff = Math.floor((target - anchor) / MS_PER_DAY);
  if (diff < 0) return null;

  var weekday = new Date(adYear, adMonth0, adDay).getDay();
  var bsYear = 2000;
  while (true) {
    var yearDays = daysInBsYear(bsYear);
    if (yearDays <= 0) return null;
    if (diff < yearDays) break;
    diff -= yearDays;
    bsYear++;
    if (bsYear > 2100) return null;
  }
  var months = BS_DATA[String(bsYear)];
  var bsMonth = 0;
  while (bsMonth < 12) {
    if (diff < months[bsMonth]) break;
    diff -= months[bsMonth];
    bsMonth++;
  }
  if (bsMonth >= 12) return null;
  return { year: bsYear, month: bsMonth + 1, day: diff + 1, weekday: weekday };
}

function bsForDate(date) {
  if (!date) return null;
  return adToBs(date.getFullYear(), date.getMonth(), date.getDate());
}

// "19 Ashwin 2083" — bar-friendly Roman form.
function formatRoman(bs) {
  if (!bs) return "BS --";
  return bs.day + " " + MONTH_EN[bs.month - 1] + " " + bs.year;
}

// "१९ असोज २०८३" — Devanagari form.
function formatNepali(bs) {
  if (!bs) return "BS --";
  return toDevanagari(bs.day) + " " + MONTH_NE[bs.month - 1] + " " + toDevanagari(bs.year);
}

function formatLongRoman(bs) {
  if (!bs) return "BS date out of range";
  return WEEKDAY_EN_SHORT[bs.weekday] + " " + MONTH_EN[bs.month - 1] + " " + bs.day + ", " + bs.year + " BS";
}

function formatLongNepali(bs) {
  if (!bs) return "BS date out of range";
  return WEEKDAY_NE_LONG[bs.weekday] + ", " + MONTH_NE[bs.month - 1] + " " + toDevanagari(bs.day) + ", " + toDevanagari(bs.year);
}

function tooltipFor(adDate, bs) {
  if (!adDate || !bs) return "Bikram Sambat (out of range 2000-2100 BS)";
  var adStr = WEEKDAY_EN_SHORT[adDate.getDay()] + " " + (adDate.getMonth() + 1) + "/" + adDate.getDate() + "/" + adDate.getFullYear() + " AD";
  return adStr + "  ↔  " + formatLongRoman(bs) + "\n" + formatLongNepali(bs) + "\nLeft: BS calendar • Right: toggle Roman/नेपाली • Middle: full Patro online";
}

// ---- BS <-> AD reverse, grid, and progress (for the popup panel).

function pad2(value) {
  var n = Number(value);
  return (n < 10 ? "0" : "") + n;
}

function bsDateKey(bsYear, bsMonth1, bsDay) {
  return bsYear + "-" + pad2(bsMonth1) + "-" + pad2(bsDay);
}

function bsKey(bs) {
  if (!bs) return "";
  return bsDateKey(bs.year, bs.month, bs.day);
}

// UTC ms for a BS noon-independent date. Nepal has no DST so midnight-UTC
// arithmetic is stable for calendar purposes.
function bsToUtcMs(bsYear, bsMonth1, bsDay) {
  var anchor = Date.UTC(1943, 3, 14);
  var y = Number(bsYear), m = Number(bsMonth1), d = Number(bsDay);
  if (!(y >= 2000 && y <= 2100 && m >= 1 && m <= 12)) return NaN;
  var months = BS_DATA[String(y)];
  if (!months || d < 1 || d > months[m - 1]) return NaN;
  var days = d - 1;
  for (var i = 0; i < m - 1; i++) days += months[i];
  for (var yy = 2000; yy < y; yy++) days += daysInBsYear(yy);
  return anchor + days * MS_PER_DAY;
}

// BS (year, month 1-12, day) -> AD {year, month (1-12), day, weekday} or null.
function bsToAd(bsYear, bsMonth1, bsDay) {
  var ms = bsToUtcMs(bsYear, bsMonth1, bsDay);
  if (!isFinite(ms)) return null;
  var d = new Date(ms);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(), weekday: d.getUTCDay() };
}

function bsDayOfYear(bsYear, bsMonth1, bsDay) {
  var months = BS_DATA[String(bsYear)];
  if (!months) return 0;
  var total = 0;
  for (var i = 0; i < bsMonth1 - 1; i++) total += months[i];
  return total + bsDay;
}

// Share of the BS year already behind you.
function bsYearProgress(bsYear, bsMonth1, bsDay) {
  var total = daysInBsYear(bsYear);
  if (total <= 0) return 0;
  return Math.max(0, Math.min(1, (bsDayOfYear(bsYear, bsMonth1, bsDay) - 1) / total));
}

function bsYearProgressPercent(bsYear, bsMonth1, bsDay) {
  return Math.round(bsYearProgress(bsYear, bsMonth1, bsDay) * 100);
}

function stepBsMonth(bsYear, bsMonth1, delta) {
  var total = Number(bsYear) * 12 + (Number(bsMonth1) - 1) + Number(delta);
  var y = Math.floor(total / 12), m = total - y * 12 + 1;
  if (y < 2000) return { year: 2000, month: 1 };
  if (y > 2100) return { year: 2100, month: 12 };
  return { year: y, month: m };
}

// Weekday indices match JS Date.getDay() (0 = Sunday).
var WEEKDAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function coerceWeekStart(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === "number")
    return isFinite(value) ? ((Math.round(value) % 7) + 7) % 7 : null;
  var text = String(value).replace(/^\s+|\s+$/g, "").toLowerCase();
  if (text === "") return null;
  for (var i = 0; i < WEEKDAY_NAMES.length; i++)
    if (WEEKDAY_NAMES[i] === text || WEEKDAY_NAMES[i].substr(0, 3) === text) return i;
  var parsed = parseInt(text, 10);
  return isFinite(parsed) ? ((parsed % 7) + 7) % 7 : null;
}

function normalizedWeekStart(value, fallback) {
  var configured = coerceWeekStart(value);
  if (configured !== null) return configured;
  var fallbackStart = coerceWeekStart(fallback);
  return fallbackStart === null ? 1 : fallbackStart;
}

function weekStartSettingName(index) {
  return WEEKDAY_NAMES[normalizedWeekStart(index, 1)];
}

function toggledWeekStart(index) {
  return normalizedWeekStart(index, 1) === 1 ? 0 : 1;
}

function weekdayOrder(weekStart) {
  var start = normalizedWeekStart(weekStart, 1);
  var out = [];
  for (var i = 0; i < 7; i++) out.push((start + i) % 7);
  return out;
}

// ISO-8601 week number (same definition the AD clock uses).
function isoWeek(year, month0, day) {
  var date = new Date(Date.UTC(year, month0, day));
  var weekday = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - weekday);
  var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / MS_PER_DAY + 1) / 7);
}

// Always six rows of seven days, like the AD clock: the grid is driven by
// AD-day arithmetic from the BS month's first day and labelled in BS, so
// month boundaries resolve themselves. Cells carry both calendars.
function bsMonthGrid(bsYear, bsMonth1, weekStart, todayBsKey) {
  var start = normalizedWeekStart(weekStart, 1);
  var firstMs = bsToUtcMs(bsYear, bsMonth1, 1);
  if (!isFinite(firstMs)) return [];
  var leading = (new Date(firstMs).getUTCDay() - start + 7) % 7;
  var today = String(todayBsKey || "");
  var weeks = [];

  for (var w = 0; w < 6; w++) {
    var days = [];
    var thursday = null;
    for (var d = 0; d < 7; d++) {
      var cellMs = firstMs + (w * 7 + d - leading) * MS_PER_DAY;
      var cellDate = new Date(cellMs);
      var adY = cellDate.getUTCFullYear();
      var adM0 = cellDate.getUTCMonth();
      var adD = cellDate.getUTCDate();
      var weekday = cellDate.getUTCDay();
      var cellBs = adToBs(adY, adM0, adD);
      if (weekday === 4) thursday = { year: adY, month: adM0, day: adD };
      days.push({
        key: cellBs ? bsKey(cellBs) : "ad-" + adY + "-" + adM0 + "-" + adD,
        bsYear: cellBs ? cellBs.year : 0,
        bsMonth: cellBs ? cellBs.month : 0,
        bsDay: cellBs ? cellBs.day : 0,
        adYear: adY,
        adMonth: adM0 + 1,
        adDay: adD,
        weekday: weekday,
        inMonth: !!cellBs && cellBs.year === bsYear && cellBs.month === bsMonth1,
        weekend: weekday === 0 || weekday === 6,
        today: !!cellBs && bsKey(cellBs) === today
      });
    }
    // Seven consecutive days always contain exactly one Thursday.
    weeks.push({
      week: isoWeek(thursday.year, thursday.month, thursday.day),
      days: days
    });
  }
  return weeks;
}

if (typeof module !== "undefined") {
  module.exports = {
    adToBs: adToBs,
    bsForDate: bsForDate,
    bsToAd: bsToAd,
    bsToUtcMs: bsToUtcMs,
    bsDateKey: bsDateKey,
    bsKey: bsKey,
    bsDayOfYear: bsDayOfYear,
    bsYearProgress: bsYearProgress,
    bsYearProgressPercent: bsYearProgressPercent,
    bsMonthGrid: bsMonthGrid,
    stepBsMonth: stepBsMonth,
    normalizedWeekStart: normalizedWeekStart,
    weekStartSettingName: weekStartSettingName,
    toggledWeekStart: toggledWeekStart,
    weekdayOrder: weekdayOrder,
    isoWeek: isoWeek,
    formatRoman: formatRoman,
    formatNepali: formatNepali,
    formatLongRoman: formatLongRoman,
    formatLongNepali: formatLongNepali,
    tooltipFor: tooltipFor,
    toDevanagari: toDevanagari,
    daysInBsYear: daysInBsYear,
    MONTH_EN: MONTH_EN,
    MONTH_EN_SHORT: MONTH_EN_SHORT,
    MONTH_NE: MONTH_NE
  };
}
