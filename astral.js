// -*- coding: utf-8 -*-
// as·tral
// /ˈastrəl/
// Adjective
// Of, connected with, or resembling the stars: "astral navigation".
// Of or relating to a supposed nonphysical realm of existence in which
// the physical human body is said to have a counterpart.

(function () {
  var astral = {};

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
   function time_from_clock(hms){
     var h = hour(hms),
         m = minute(hms),
         s = seconds(hms);
     return(1/24 * (h + ((m + (s / 60)) / 60)));
   }
   astral. time_from_clock = time_from_clock;

   // Return fixed date from moment 'tee'.
   function fixed_from_moment(tee){
     return ifloor(tee);
   }
   astral.fixed_from_moment = fixed_from_moment;

   // Return time from moment 'tee'.
   function time_from_moment(tee) {
     return mod(tee, 1);
   }
   astral.time_from_moment = time_from_moment;

   // Return clock time hour:minute:second from moment 'tee'.
   function clock_from_moment(tee) {
     var time = time_from_moment(tee),
         hour = ifloor(time * 24),
         minute = ifloor(mod(time * 24 * 60, 60)),
         second = mod(time * 24 * 60 * 60, 60);
     return time_of_day(hour, minute, second);
   }
   astral.clock_from_moment = clock_from_moment;

   // Return the number of days given x hours.
   function days_from_hours(x) {
     return x / 24;
   }

  // days (and fractions) of Julian 2000 at 12 UTC
  // (since EPOCH = January 1, 1970, 00:00:00 UTC)
  var JD_EPOCH = rd(-1721424.5),
          τ = 2 * Math.PI,
    degrees = 360 / τ,
    radians = τ / 360;

   astral.JD_EPOCH = JD_EPOCH;

  // Return the moment corresponding to the Julian day number 'jd'.
  function moment_from_jd(jd) {
    return jd + JD_EPOCH;
  }
  astral.moment_from_jd = moment_from_jd;

  // Return the Julian day number corresponding to moment 'tee'.
  function jd_from_moment(tee) {
    return tee - JD_EPOCH;
  }
  astral.jd_from_moment = jd_from_moment;

  // Return the fixed date corresponding to Julian day number 'jd'.
  function fixed_from_jd(jd) {
    return ifloor(moment_from_jd(jd));
  }
  astral.fixed_from_jd = fixed_from_jd;


  // Return the Julian day number corresponding to fixed date 'rd'.
  function jd_from_fixed(date) {
    return jd_from_moment(date);
  }
  astral.jd_from_fixed = jd_from_fixed;

  // Return a Gregorian date data structure.
  function gregorian_date(year, month, day){
    return [year, month, day];
  }
   astral.gregorian_date = gregorian_date;

   var GREGORIAN_EPOCH = rd(1),
   JANUARY = 1,
   FEBRUARY = 2,
   MARCH = 3,
   APRIL = 4,
   MAY = 5,
   JUNE = 6,
   JULY = 7,
   AUGUST = 8,
   SEPTEMBER = 9,
   OCTOBER = 10,
   NOVEMBER = 11,
   DECEMBER = 12;

   // Return True if Gregorian year 'g_year' is leap.
   function is_gregorian_leap_year(g_year) {
     return (mod(g_year, 4) == 0) && !([100, 200, 300].indexOf(mod(g_year, 400)) != -1);
   }
   astral.is_gregorian_leap_year = is_gregorian_leap_year;

   // Return the fixed date equivalent to the Gregorian date 'g_date'.
   function fixed_from_gregorian(g_date) {
     var month = standard_month(g_date),
         day   = standard_day(g_date),
         year  = standard_year(g_date);
     return ((GREGORIAN_EPOCH - 1) +
             (365 * (year -1)) +
             quotient(year - 1, 4) -
             quotient(year - 1, 100) +
             quotient(year - 1, 400) +
             quotient((367 * month) - 362, 12) +
             (month <= 2 ? 0 : (is_gregorian_leap_year(year)? -1 : -2)) +
             day);
   }
   astral.fixed_from_gregorian = fixed_from_gregorian;

   // Return the Gregorian year corresponding to the fixed date 'date'.
   function gregorian_year_from_fixed(date) {
     var d0   = date - GREGORIAN_EPOCH,
         n400 = quotient(d0, 146097),
         d1   = mod(d0, 146097),
         n100 = quotient(d1, 36524),
         d2   = mod(d1, 36524),
         n4   = quotient(d2, 1461),
         d3   = mod(d2, 1461),
         n1   = quotient(d3, 365),
         year = (400 * n400) + (100 * n100) + (4 * n4) + n1;
     return ((n100 == 4) || (n1 == 4)) ? year : (year + 1);
   }
   astral.gregorian_year_from_fixed = gregorian_year_from_fixed;

   // Return the fixed date of January 1 in Gregorian year 'g_year'.
   function gregorian_new_year(g_year) {
     return fixed_from_gregorian(gregorian_date(g_year, JANUARY, 1));
   }
   astral.gregorian_new_year = gregorian_new_year;

   // Return the fixed date of December 31 in Gregorian year 'g_year'.
   function gregorian_year_end(g_year) {
     return fixed_from_gregorian(gregorian_date(g_year, DECEMBER, 31));
   }
   astral.gregorian_year_end = gregorian_year_end;

   // Return the Gregorian date corresponding to fixed date 'date'.
   function gregorian_from_fixed(date) {
     var year = gregorian_year_from_fixed(date),
         prior_days = date - gregorian_new_year(year),
         correction = ((date < fixed_from_gregorian(
                          gregorian_date(year, MARCH, 1))) ? 0
                       : (is_gregorian_leap_year(year) ? 1 : 2)),
         month = quotient((12 * (prior_days + correction)) + 373, 367),
         day = 1 + (date - fixed_from_gregorian(gregorian_date(year, month, 1)));
     return gregorian_date(year, month, day);
   }
   astral.gregorian_from_fixed = gregorian_from_fixed;

   // Return the number of days from Gregorian date 'g_date1'
   // till Gregorian date 'g_date2'.
   function gregorian_date_difference(g_date1, g_date2) {
     return fixed_from_gregorian(g_date2) - fixed_from_gregorian(g_date1);
   }


   var J2000 = days_from_hours(12) + gregorian_new_year(2000);
   astral.J2000 = J2000;

  // Return Julian centuries since 2000 at moment 'tee' (in days and
  // fractions since EPOCH).
  function julian_centuries(tee) {
    return (dynamical_from_universal(tee) - J2000) / 36525;
  }
  astral.julian_centuries = julian_centuries;

  // Return Dynamical time at Universal moment, tee.
  function dynamical_from_universal(tee) {
    return tee + ephemeris_correction(tee);
  }
  astral.dynamical_from_universal = dynamical_from_universal;

  // Return Universal moment from Dynamical time, tee.
  function universal_from_dynamical(tee) {
    return tee - ephemeris_correction(tee);
  }
  astral.universal_from_dynamical = universal_from_dynamical;

  // Return Dynamical Time minus Universal Time (in days) for
  // moment, 'tee'.  Adapted from "Astronomical Algorithms"
  // by Jean Meeus, Willmann_Bell, Inc., 1991.
  function ephemeris_correction(tee) {
    var year = gregorian_year_from_fixed(ifloor(tee)),
    c = gregorian_date_difference(gregorian_date(1900, JANUARY, 1),
                                  gregorian_date(year, JULY, 1)) / 36525;

    if ((1988 <= year) && (year <= 2019)) {
      return (year - 1933) / 86400;
    }
    else if ((1900 <= year) && (year <= 1987)) {
      return poly(c, [-0.00002, 0.000297, 0.025184,
                      -0.181133, 0.553040, -0.861938,
                      0.677066, -0.212591]);
    }
    else if ((1800 <= year) && (year <= 1899)) {
      return poly(c, [-0.000009, 0.003844, 0.083563,
                      0.865736, 4.867575, 15.845535,
                      31.332267, 38.291999, 28.316289,
                      11.636204, 2.043794]);
    }
    else if ((1700 <= year) && (year <= 1799)) {
      return (1 / 86400 *
              poly(year - 1700, [8.118780842, -0.005092142,
                                 0.003336121, -0.0000266484]));
    }
    else if ((1620 <= year) && (year <= 1699)) {
      return (1 / 86400 *
              poly(year - 1600,
                   [196.58333, -4.0675, 0.0219167]));
    }
    else {
      var x = (12/24 +
             gregorian_date_difference(gregorian_date(1810, JANUARY, 1),
                                       gregorian_date(year, JANUARY, 1)));
      return (1 / 86400 * (((x * x) / 41048480) - 15));
    }
  }
  astral.ephemeris_correction = ephemeris_correction;



  // Return the angular data structure.
  function degrees_minutes_seconds(d, m, s) {
    return [d, m, s];
  }

  // Return an angle in degrees:minutes:seconds from angle,
  // 'alpha' in degrees.
  function angle_from_degrees(alpha) {
    var d = ifloor(alpha),
        m = ifloor(60 * mod(alpha, 1)),
        s = mod(alpha * 60 * 60, 60);
    return degrees_minutes_seconds(d, m, s);
  }
  astral.angle_from_degrees = angle_from_degrees;

  // Return decimal degrees
  function decimal_degrees(d, m, s) {
    return d + (m + s /60) / 60;
  }
   astral.decimal_degrees = decimal_degrees;

   // define sign of number
   Math.signum = function(x) { return x ? x < 0 ? -1 : 1 : 0; };

   // round a-la Common Lisp
   function round(n) { return Math.signum(n) * Math.round(Math.abs(n)); }
   astral.round = round;

   // function integer(n) { return n - (mod(n,1));}
   // astral.int = integer;

   function mod(m, n) { return m - (n * ifloor(m/n));}
   astral.mod = mod;

   function quotient(m, n) { return ifloor(m/n); }
   astral.quotient = quotient;

   function ifloor(n) { return Math.floor(n); }
   astral.ifloor = ifloor;

   function iround(n) { return round(n);}
   astral.iround = iround;

   // Return same as mod() with y instead of 0
   function amod(x, y) { return y + (mod(x, -y)); }
   astral.amod = amod;

   // Return first integer greater or equal to initial index, i,
   // such that condition, p, holds.
   function next(i, p) {
     return (p(i) ? i : next(i+1, p));
   }
   astral.next= next;

   // Return last integer greater or equal to initial index, i,
   // such that condition, p, holds.
   function final(i, p) {
     return (!p(i)) ? i - 1 : final(i + 1, p);
   }
   astral.final = final;


   // Return the sum of f(i) from i=k, k+1, ... till p(i) holds true or 0.
   // This is a tail recursive implementation."""
   function summa(f, k, p) {
     return ((!p(k)) ? 0 : f(k) + summa(f, k+1, p));
   }
   astral.summa = summa;

   // Bisection search for x in [lo, hi] such that condition 'e' holds.
   // p determines when to go left.
   function binary_search(lo, hi, p, e) {
     var x = (lo + hi) / 2;
     if (p(lo, hi)) return x;
     if (e(x)) return binary_search(lo, x, p, e);
     return binary_search(x, hi, p, e);
   }
   astral.binary_search = binary_search;

   // Find inverse of angular function 'f' at 'y' within interval [a,b].
   // Default precision is 0.00001.
   function invert_angular(f, y, a, b, prec) {
     prec = prec || 1e-5;
     return binary_search(a, b,
       function(l, h){ return ((h - l) <= prec);},
       function(x) { return mod((f(x) - y), 360) < 180;});
   }
   astral.invert_angular = invert_angular;

   // homemade zip (could have used Underscore.js)
   function zip(arrays) {
     return arrays.length==0 ? [] : arrays[0].map(function(_,i){
         return arrays.map(function(array){return array[i];});
     });
   }
   astral.zip = zip;

   function sigma(l, b) {
     return zip(l).map(function(v){
                         return b.apply(null,v);})
       .reduce(function(memo, n){return memo+n;}, 0);
   }
   astral.sigma = sigma;

  // Calculate polynomial with coefficients 'a' at point 'x'.
  // The polynomial is
  //  a[0] + a[1] * x + a[2] * x^2 + ... + a[n] * x^n
  // The code below implements Horner's Rule
  function poly(x, a) {
    var l = a.length,
        p = a[l-1],
        i = l-2;
    while (i >= 0) {
      p = p * x + a[i];
      --i;
    }
    return p;
  }
  astral.poly = poly;

  function sin_degrees(α) { return Math.sin(α * radians);}
  astral.sin_degrees = sin_degrees;

  function cos_degrees(α) { return Math.cos(α * radians);}
  astral.cos_degrees = cos_degrees;

  // Return a normalize angle theta to range [0,360) degrees.
  function normalized_degrees(theta) {
    return mod(theta, 360);
  }

  // Return mean longitude of moon (in degrees) at moment
  // given in Julian centuries c (including the constant term of the
  // effect of the light-time (-0".70).
  // Adapted from eq. 47.1 in "Astronomical Algorithms" by Jean Meeus,
  // Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
  function mean_lunar_longitude(c) {
    return normalized_degrees(poly(c,[218.3164477, 481267.88123421,
                               -0.0015786, 1/538841, -1/65194000]));
  }
  astral.mean_lunar_longitude = mean_lunar_longitude;

  // Return elongation of moon (in degrees) at moment
  // given in Julian centuries c.
  // Adapted from eq. 47.2 in "Astronomical Algorithms" by Jean Meeus,
  // Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
  function lunar_elongation(c) {
    return normalized_degrees(poly(c,
                                   [297.8501921,
                                    445267.1114034,
                                    -0.0018819,
                                    1/545868,
                                    -1/113065000]));
  }
  astral.lunar_elongation = lunar_elongation;


  // Return mean anomaly of sun (in degrees) at moment
  // given in Julian centuries c.
  // Adapted from eq. 47.3 in "Astronomical Algorithms" by Jean Meeus,
  // Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
  function solar_anomaly(c) {
    return normalized_degrees(poly(c,
                                   [357.5291092,
                                    35999.0502909,
                                    -0.0001536,
                                    1/24490000]));
  }
  astral.solar_anomaly = solar_anomaly;



  // Return mean anomaly of moon (in degrees) at moment
  // given in Julian centuries c.
  // Adapted from eq. 47.4 in "Astronomical Algorithms" by Jean Meeus,
  // Willmann_Bell, Inc., 2nd ed. with corrections, 2005."""
  function lunar_anomaly(c) {
    return normalized_degrees(poly(c,
                                   [134.9633964,
                                    477198.8675055,
                                    0.0087414,
                                    1/69699,
                                    -1/14712000]));
  }
  astral.lunar_anomaly = lunar_anomaly;



  // Return Moon's argument of latitude (in degrees) at moment
  // given in Julian centuries 'c'.
  // Adapted from eq. 47.5 in "Astronomical Algorithms" by Jean Meeus,
  // Willmann_Bell, Inc., 2nd ed. with corrections, 2005."""
  function moon_node(c) {
    return normalized_degrees(poly(c,
                                   [93.2720950,
                                    483202.0175233,
                                    -0.0036539,
                                    -1/3526000,
                                    1/863310000]));
  }
  astral.moon_node = moon_node;


  // Return the longitudinal nutation at moment, tee."""
  function nutation(tee) {
    var c = julian_centuries(tee),
    cap_A = poly(c, [124.90, -1934.134, 0.002063]),
    cap_B = poly(c, [201.11, 72001.5377, 0.00057]);
    return (-0.004778  * sin_degrees(cap_A) +
            -0.0003667 * sin_degrees(cap_B));
  }
  astral.nutation = nutation;


  // Return longitude of moon (in degrees) at moment tee.
  // Adapted from "Astronomical Algorithms" by Jean Meeus,
  // Willmann_Bell, Inc., 2nd ed., 1998.
  function lunar_longitude(tee) {
    var c = julian_centuries(tee),
    cap_L_prime = mean_lunar_longitude(c),
    cap_D = lunar_elongation(c),
    cap_M = solar_anomaly(c),
    cap_M_prime = lunar_anomaly(c),
    cap_F = moon_node(c),
    cap_E = poly(c, [1, -0.002516, -0.0000074]),
    args_lunar_elongation = [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 4, 0, 4, 2, 2, 1,
                             1, 2, 2, 4, 2, 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 4, 0, 3, 2, 4, 0, 2,
                             2, 2, 4, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2],
    args_solar_anomaly = [0, 0, 0, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                          0, 1, -1, 0, 0, 0, 1, 0, -1, 0, -2, 1, 2, -2, 0, 0, -1, 0, 0, 1,
                          -1, 2, 2, 1, -1, 0, 0, -1, 0, 1, 0, 1, 0, 0, -1, 2, 1, 0],
    args_lunar_anomaly = [1, -1, 0, 2, 0, 0, -2, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 3, -2,
                          -1, 0, -1, 0, 1, 2, 0, -3, -2, -1, -2, 1, 0, 2, 0, -1, 1, 0,
                          -1, 2, -1, 1, -2, -1, -1, -2, 0, 1, 4, 0, -2, 0, 2, 1, -2, -3,
                          2, 1, -1, 3],
    args_moon_node = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, -2, 2, -2, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, -2, 2, 0, 2, 0, 0, 0, 0,
                      0, 0, -2, 0, 0, 0, 0, -2, -2, 0, 0, 0, 0, 0, 0, 0],
    sine_coefficients = [6288774,1274027,658314,213618,-185116,-114332,
                         58793,57066,53322,45758,-40923,-34720,-30383,
                         15327,-12528,10980,10675,10034,8548,-7888,
                         -6766,-5163,4987,4036,3994,3861,3665,-2689,
                         -2602, 2390,-2348,2236,-2120,-2069,2048,-1773,
                         -1595,1215,-1110,-892,-810,759,-713,-700,691,
                         596,549,537,520,-487,-399,-381,351,-340,330,
                         327,-323,299,294],
    correction = (1/1000000 *
                  sigma([sine_coefficients, args_lunar_elongation,
                         args_solar_anomaly, args_lunar_anomaly,
                         args_moon_node],
                        function(v, w, x, y, z) {
                          return (v * Math.pow(cap_E, Math.abs(x)) *
                                  sin_degrees((w * cap_D) +
                                              (y * cap_M_prime) +
                                              (z * cap_F)));})),
    A1 = 119.75 + (c * 131.849),
    venus = 3958/1000000 * sin_degrees(A1),
    A2 = 53.09 + (c * 479264.29),
    jupiter = 318/1000000 * sin_degrees(A2),
    flat_earth = 1962/1000000 * sin_degrees(cap_L_prime - cap_F);

    return mod(cap_L_prime + correction + venus +
               jupiter + flat_earth + nutation(tee), 360);
   }
   astral.lunar_longitude = lunar_longitude;



   // Return the latitude of moon (in degrees) at moment, tee.
   // Adapted from "Astronomical Algorithms" by Jean Meeus,
   // Willmann_Bell, Inc., 1998.
   function lunar_latitude(tee) {
     var c = julian_centuries(tee),
     cap_L_prime = mean_lunar_longitude(c),
     cap_D = lunar_elongation(c),
     cap_M = solar_anomaly(c),
     cap_M_prime = lunar_anomaly(c),
     cap_F = moon_node(c),
     cap_E = poly(c, [1, -0.002516, -0.0000074]),
     args_lunar_elongation = (
            [0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 4, 0, 0, 0,
             1, 0, 0, 0, 1, 0, 4, 4, 0, 4, 2, 2, 2, 2, 0, 2, 2, 2, 2, 4, 2, 2,
             0, 2, 1, 1, 0, 2, 1, 2, 0, 4, 4, 1, 4, 1, 4, 2]),
     args_solar_anomaly = (
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, -1, -1, -1, 1, 0, 1,
             0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 1,
             0, -1, -2, 0, 1, 1, 1, 1, 1, 0, -1, 1, 0, -1, 0, 0, 0, -1, -2]),
     args_lunar_anomaly = (
            [0, 1, 1, 0, -1, -1, 0, 2, 1, 2, 0, -2, 1, 0, -1, 0, -1, -1, -1,
             0, 0, -1, 0, 1, 1, 0, 0, 3, 0, -1, 1, -2, 0, 2, 1, -2, 3, 2, -3,
             -1, 0, 0, 1, 0, 1, 1, 0, 0, -2, -1, 1, -2, 2, -2, -1, 1, 1, -2,
             0, 0]),
     args_moon_node = (
            [1, 1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1,
             -1, 1, 3, 1, 1, 1, -1, -1, -1, 1, -1, 1, -3, 1, -3, -1, -1, 1,
             -1, 1, -1, 1, 1, 1, 1, -1, 3, -1, -1, 1, -1, -1, 1, -1, 1, -1,
             -1, -1, -1, -1, -1, 1]),
     sine_coefficients = (
            [5128122, 280602, 277693, 173237, 55413, 46271, 32573,
             17198, 9266, 8822, 8216, 4324, 4200, -3359, 2463, 2211,
             2065, -1870, 1828, -1794, -1749, -1565, -1491, -1475,
             -1410, -1344, -1335, 1107, 1021, 833, 777, 671, 607,
             596, 491, -451, 439, 422, 421, -366, -351, 331, 315,
             302, -283, -229, 223, 223, -220, -220, -185, 181,
             -177, 176, 166, -164, 132, -119, 115, 107]),
     beta = ((1/1000000) *
            sigma([sine_coefficients,
                   args_lunar_elongation,
                   args_solar_anomaly,
                   args_lunar_anomaly,
                   args_moon_node],
                  function(v, w, x, y, z){
                    return (v *
                            Math.pow(cap_E, Math.abs(x)) *
                            sin_degrees((w * cap_D) +
                                        (x * cap_M) +
                                        (y * cap_M_prime) +
                                        (z * cap_F)));})),
     venus = ((175/1000000) *
              (sin_degrees(119.75 + c * 131.849 + cap_F) +
               sin_degrees(119.75 + c * 131.849 - cap_F))),
     flat_earth = ((-2235/1000000) *  sin_degrees(cap_L_prime) +
                   (127/1000000) * sin_degrees(cap_L_prime - cap_M_prime) +
                   (-115/1000000) * sin_degrees(cap_L_prime + cap_M_prime)),
     extra = ((382/1000000) *
              sin_degrees(313.45 + c * 481266.484));
     return beta + venus + flat_earth + extra;
   }
   astral.lunar_latitude = lunar_latitude;


   return astral;
 }());

