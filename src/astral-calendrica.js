import "astral-basic";

// Epoch definition. For Rata Diem, R.D., it is 0 (but any other reference
// would do.)
function epoch() {
  return 0;
}


// Return rata diem (number of days since epoch) of moment in time, tee.
function rd(tee) {
  return tee - epoch();
}

// Return the month of date 'date'.
function standard_month(date) {
  return date[1];
}


// Return the day of date 'date'.
function standard_day(date) {
  return date[2];
}

// Return the year of date 'date'.
function standard_year(date) {
  return date[0];
}

var SUNDAY    = 0,
    MONDAY    = 1,
    TUESDAY   = 2,
    WEDNESDAY = 3,
    THURSDAY  = 4,
    FRIDAY    = 5,
    SATURDAY  = 6;


// Return day of the week from a fixed date 'date'.
function day_of_week_from_fixed(date) {
  return mod(date - rd(0) - SUNDAY, 7);
}


// Return the time of day data structure.
function time_of_day(hour, minute, second) {
  return [hour, minute, second];
}

//Return the hour of clock time 'clock'.
function hour(clock) {
  return clock[0];
}


// Return the minutes of clock time 'clock'.
function minute(clock) {
  return clock[1];
}

// Return the seconds of clock time 'clock'.
function seconds(clock) {
  return clock[2];
}


// Return time of day from clock time 'hms'.
function time_from_clock(hms) {
  var h = hour(hms),
      m = minute(hms),
      s = seconds(hms);
  return (1 / 24 * (h + ((m + (s / 60)) / 60)));
}
aa.time_from_clock = time_from_clock;


// Return fixed date from moment 'tee'.
function fixed_from_moment(tee) {
  return ifloor(tee);
}
aa.fixed_from_moment = fixed_from_moment;

// Return time from moment 'tee'.
function time_from_moment(tee) {
  return mod(tee, 1);
}
aa.time_from_moment = time_from_moment;

// Return clock time hour:minute:second from moment 'tee'.
function clock_from_moment(tee) {
  var time = time_from_moment(tee),
      hour = ifloor(time * 24),
    minute = ifloor(mod(time * 24 * 60, 60)),
    second = mod(time * 24 * 60 * 60, 60);
  return time_of_day(hour, minute, second);
}
aa.clock_from_moment = clock_from_moment;

// Return the number of days given x hours.
function days_from_hours(x) {
  return x / 24;
}

// days (and fractions) of Julian 2000 at 12 UTC
// (since EPOCH = January 1, 1970, 00:00:00 UTC)
var JD_EPOCH = rd(-1721424.5);
aa.JD_EPOCH = JD_EPOCH;

// Return the moment corresponding to the Julian day number 'jd'.
function moment_from_jd(jd) {
  return jd + JD_EPOCH;
}
aa.moment_from_jd = moment_from_jd;

// Return the Julian day number corresponding to moment 'tee'.
function jd_from_moment(tee) {
  return tee - JD_EPOCH;
}
aa.jd_from_moment = jd_from_moment;

// Return the fixed date corresponding to Julian day number 'jd'.
function fixed_from_jd(jd) {
  return ifloor(moment_from_jd(jd));
}
aa.fixed_from_jd = fixed_from_jd;


// Return the Julian day number corresponding to fixed date 'rd'.
function jd_from_fixed(date) {
  return jd_from_moment(date);
}
aa.jd_from_fixed = jd_from_fixed;

// Return a Gregorian date data structure.
function gregorian_date(year, month, day) {
  return [year, month, day];
}
aa.gregorian_date = gregorian_date;

var GREGORIAN_EPOCH = rd(1),
    JANUARY   = 1,
    FEBRUARY  = 2,
    MARCH     = 3,
    APRIL     = 4,
    MAY       = 5,
    JUNE      = 6,
    JULY      = 7,
    AUGUST    = 8,
    SEPTEMBER = 9,
    OCTOBER   = 10,
    NOVEMBER  = 11,
    DECEMBER  = 12;

// Return True if Gregorian year 'g_year' is leap.
function is_gregorian_leap_year(g_year) {
  return (mod(g_year, 4) == 0) && !([100, 200, 300].indexOf(mod(g_year, 400)) != -1);
}
aa.is_gregorian_leap_year = is_gregorian_leap_year;

// Return the fixed date equivalent to the Gregorian date 'g_date'.
function fixed_from_gregorian(g_date) {
  var month = standard_month(g_date),
    day = standard_day(g_date),
    year = standard_year(g_date);
  return ((GREGORIAN_EPOCH - 1) +
    (365 * (year - 1)) +
    quotient(year - 1, 4) -
    quotient(year - 1, 100) +
    quotient(year - 1, 400) +
    quotient((367 * month) - 362, 12) +
    (month <= 2 ? 0 : (is_gregorian_leap_year(year) ? -1 : -2)) + day);
}
aa.fixed_from_gregorian = fixed_from_gregorian;

// Return the Gregorian year corresponding to the fixed date 'date'.
function gregorian_year_from_fixed(date) {
  var d0 = date - GREGORIAN_EPOCH,
    n400 = quotient(d0, 146097),
    d1 = mod(d0, 146097),
    n100 = quotient(d1, 36524),
    d2 = mod(d1, 36524),
    n4 = quotient(d2, 1461),
    d3 = mod(d2, 1461),
    n1 = quotient(d3, 365),
    year = (400 * n400) + (100 * n100) + (4 * n4) + n1;
  return ((n100 == 4) || (n1 == 4)) ? year : (year + 1);
}
aa.gregorian_year_from_fixed = gregorian_year_from_fixed;

// Return the fixed date of January 1 in Gregorian year 'g_year'.
function gregorian_new_year(g_year) {
  return fixed_from_gregorian(gregorian_date(g_year, JANUARY, 1));
}
aa.gregorian_new_year = gregorian_new_year;

// Return the fixed date of December 31 in Gregorian year 'g_year'.
function gregorian_year_end(g_year) {
  return fixed_from_gregorian(gregorian_date(g_year, DECEMBER, 31));
}
aa.gregorian_year_end = gregorian_year_end;

// Return the Gregorian date corresponding to fixed date 'date'.
function gregorian_from_fixed(date) {
  var year = gregorian_year_from_fixed(date),
    prior_days = date - gregorian_new_year(year),
    correction = ((date < fixed_from_gregorian(
    gregorian_date(year, MARCH, 1))) ? 0 : (is_gregorian_leap_year(year) ? 1 : 2)),
    month = quotient((12 * (prior_days + correction)) + 373, 367),
    day = 1 + (date - fixed_from_gregorian(gregorian_date(year, month, 1)));
  return gregorian_date(year, month, day);
}
aa.gregorian_from_fixed = gregorian_from_fixed;

// Return the number of days from Gregorian date 'g_date1'
// till Gregorian date 'g_date2'.
function gregorian_date_difference(g_date1, g_date2) {
  return fixed_from_gregorian(g_date2) - fixed_from_gregorian(g_date1);
}