aa = function() {
  function degrees_minutes_seconds(d, m, s) {
    return [ d, m, s ];
  }
  function angle_from_degrees(alpha) {
    var d = ifloor(alpha), m = ifloor(60 * mod(alpha, 1)), s = mod(60 * alpha * 60, 60);
    return degrees_minutes_seconds(d, m, s);
  }
  function decimal_degrees(d, m, s) {
    return d + (m + s / 60) / 60;
  }
  function signum(x) {
    return x ? 0 > x ? -1 : 1 : 0;
  }
  function round(n) {
    return Math.signum(n) * Math.round(Math.abs(n));
  }
  function mod(m, n) {
    return m - n * ifloor(m / n);
  }
  function quotient(m, n) {
    return ifloor(m / n);
  }
  function ifloor(n) {
    return Math.floor(n);
  }
  function iround(n) {
    return round(n);
  }
  function amod(x, y) {
    return y + mod(x, -y);
  }
  function next(i, p) {
    return p(i) ? i : next(i + 1, p);
  }
  function final(i, p) {
    return p(i) ? final(i + 1, p) : i - 1;
  }
  function summa(f, k, p) {
    return p(k) ? f(k) + summa(f, k + 1, p) : 0;
  }
  function binary_search(lo, hi, p, e) {
    var x = (lo + hi) / 2;
    return p(lo, hi) ? x : e(x) ? binary_search(lo, x, p, e) : binary_search(x, hi, p, e);
  }
  function invert_angular(f, y, a, b, prec) {
    return prec = prec || 1e-5, binary_search(a, b, function(l, h) {
      return prec >= h - l;
    }, function(x) {
      return mod(f(x) - y, 360) < 180;
    });
  }
  function zip(arrays) {
    return 0 == arrays.length ? [] : arrays[0].map(function(_, i) {
      return arrays.map(function(array) {
        return array[i];
      });
    });
  }
  function sigma(l, b) {
    return zip(l).map(function(v) {
      return b.apply(null, v);
    }).reduce(function(memo, n) {
      return memo + n;
    }, 0);
  }
  function poly(x, a) {
    for (var l = a.length, p = a[l - 1], i = l - 2; i >= 0; ) p = p * x + a[i], --i;
    return p;
  }
  function polyAlt(x, a) {
    for (var l = a.length, p = a[l - 1], y = x, i = l - 2; i >= 0; ) p = p.multiply(y).add(a[i]), 
    --i;
    return p;
  }
  function sin_degrees(α) {
    return Math.sin(α * radians);
  }
  function cos_degrees(α) {
    return Math.cos(α * radians);
  }
  function normalized_degrees(α) {
    return mod(α, 360);
  }
  function epoch() {
    return 0;
  }
  function rd(tee) {
    return tee - epoch();
  }
  function standard_month(date) {
    return date[1];
  }
  function standard_day(date) {
    return date[2];
  }
  function standard_year(date) {
    return date[0];
  }
  function day_of_week_from_fixed(date) {
    return mod(date - rd(0) - SUNDAY, 7);
  }
  function time_of_day(hour, minute, second) {
    return [ hour, minute, second ];
  }
  function hour(clock) {
    return clock[0];
  }
  function minute(clock) {
    return clock[1];
  }
  function seconds(clock) {
    return clock[2];
  }
  function time_from_clock(hms) {
    var h = hour(hms), m = minute(hms), s = seconds(hms);
    return 1 / 24 * (h + (m + s / 60) / 60);
  }
  function fixed_from_moment(tee) {
    return ifloor(tee);
  }
  function time_from_moment(tee) {
    return mod(tee, 1);
  }
  function clock_from_moment(tee) {
    var time = time_from_moment(tee), hour = ifloor(24 * time), minute = ifloor(mod(24 * time * 60, 60)), second = mod(24 * time * 60 * 60, 60);
    return time_of_day(hour, minute, second);
  }
  function days_from_hours(x) {
    return x / 24;
  }
  function moment_from_jd(jd) {
    return jd + JD_EPOCH;
  }
  function jd_from_moment(tee) {
    return tee - JD_EPOCH;
  }
  function fixed_from_jd(jd) {
    return ifloor(moment_from_jd(jd));
  }
  function jd_from_fixed(date) {
    return jd_from_moment(date);
  }
  function gregorian_date(year, month, day) {
    return [ year, month, day ];
  }
  function is_gregorian_leap_year(g_year) {
    return 0 == mod(g_year, 4) && !(-1 != [ 100, 200, 300 ].indexOf(mod(g_year, 400)));
  }
  function fixed_from_gregorian(g_date) {
    var month = standard_month(g_date), day = standard_day(g_date), year = standard_year(g_date);
    return GREGORIAN_EPOCH - 1 + 365 * (year - 1) + quotient(year - 1, 4) - quotient(year - 1, 100) + quotient(year - 1, 400) + quotient(367 * month - 362, 12) + (2 >= month ? 0 : is_gregorian_leap_year(year) ? -1 : -2) + day;
  }
  function gregorian_year_from_fixed(date) {
    var d0 = date - GREGORIAN_EPOCH, n400 = quotient(d0, 146097), d1 = mod(d0, 146097), n100 = quotient(d1, 36524), d2 = mod(d1, 36524), n4 = quotient(d2, 1461), d3 = mod(d2, 1461), n1 = quotient(d3, 365), year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
    return 4 == n100 || 4 == n1 ? year : year + 1;
  }
  function gregorian_new_year(g_year) {
    return fixed_from_gregorian(gregorian_date(g_year, JANUARY, 1));
  }
  function gregorian_year_end(g_year) {
    return fixed_from_gregorian(gregorian_date(g_year, DECEMBER, 31));
  }
  function gregorian_from_fixed(date) {
    var year = gregorian_year_from_fixed(date), prior_days = date - gregorian_new_year(year), correction = date < fixed_from_gregorian(gregorian_date(year, MARCH, 1)) ? 0 : is_gregorian_leap_year(year) ? 1 : 2, month = quotient(12 * (prior_days + correction) + 373, 367), day = 1 + (date - fixed_from_gregorian(gregorian_date(year, month, 1)));
    return gregorian_date(year, month, day);
  }
  function gregorian_date_difference(g_date1, g_date2) {
    return fixed_from_gregorian(g_date2) - fixed_from_gregorian(g_date1);
  }
  function julian_centuries(tee) {
    return (dynamical_from_universal(tee) - J2000) / 36525;
  }
  function dynamical_from_universal(tee) {
    return tee + ephemeris_correction(tee);
  }
  function universal_from_dynamical(tee) {
    return tee - ephemeris_correction(tee);
  }
  function ephemeris_correction(tee) {
    var year = gregorian_year_from_fixed(ifloor(tee)), c = gregorian_date_difference(gregorian_date(1900, JANUARY, 1), gregorian_date(year, JULY, 1)) / 36525;
    if (year >= 1988 && 2019 >= year) return (year - 1933) / 86400;
    if (year >= 1900 && 1987 >= year) return poly(c, [ -2e-5, 297e-6, .025184, -.181133, .55304, -.861938, .677066, -.212591 ]);
    if (year >= 1800 && 1899 >= year) return poly(c, [ -9e-6, .003844, .083563, .865736, 4.867575, 15.845535, 31.332267, 38.291999, 28.316289, 11.636204, 2.043794 ]);
    if (year >= 1700 && 1799 >= year) return 1 / 86400 * poly(year - 1700, [ 8.118780842, -.005092142, .003336121, -266484e-10 ]);
    if (year >= 1620 && 1699 >= year) return 1 / 86400 * poly(year - 1600, [ 196.58333, -4.0675, .0219167 ]);
    var x = .5 + gregorian_date_difference(gregorian_date(1810, JANUARY, 1), gregorian_date(year, JANUARY, 1));
    return 1 / 86400 * (x * x / 41048480 - 15);
  }
  function mean_lunar_longitude(c) {
    return normalized_degrees(poly(c, [ 218.3164477, 481267.88123421, -.0015786, 1 / 538841, -1 / 65194e3 ]));
  }
  function lunar_elongation(c) {
    return normalized_degrees(poly(c, [ 297.8501921, 445267.1114034, -.0018819, 1 / 545868, -1 / 113065e3 ]));
  }
  function solar_anomaly(c) {
    return normalized_degrees(poly(c, [ 357.5291092, 35999.0502909, -1536e-7, 1 / 2449e4 ]));
  }
  function lunar_anomaly(c) {
    return normalized_degrees(poly(c, [ 134.9633964, 477198.8675055, .0087414, 1 / 69699, -1 / 14712e3 ]));
  }
  function moon_node(c) {
    return normalized_degrees(poly(c, [ 93.272095, 483202.0175233, -.0036539, -1 / 3526e3, 1 / 86331e4 ]));
  }
  function nutation(tee) {
    var c = julian_centuries(tee), cap_A = poly(c, [ 124.9, -1934.134, .002063 ]), cap_B = poly(c, [ 201.11, 72001.5377, 57e-5 ]);
    return -.004778 * sin_degrees(cap_A) + -3667e-7 * sin_degrees(cap_B);
  }
  function lunar_longitude(tee) {
    var c = julian_centuries(tee), cap_L_prime = mean_lunar_longitude(c), cap_D = lunar_elongation(c), cap_M = solar_anomaly(c), cap_M_prime = lunar_anomaly(c), cap_F = moon_node(c), cap_E = poly(c, [ 1, -.002516, -74e-7 ]), args_lunar_elongation = [ 0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 4, 0, 4, 2, 2, 1, 1, 2, 2, 4, 2, 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 4, 0, 3, 2, 4, 0, 2, 2, 2, 4, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2 ], args_solar_anomaly = [ 0, 0, 0, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, -2, 1, 2, -2, 0, 0, -1, 0, 0, 1, -1, 2, 2, 1, -1, 0, 0, -1, 0, 1, 0, 1, 0, 0, -1, 2, 1, 0 ], args_lunar_anomaly = [ 1, -1, 0, 2, 0, 0, -2, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 3, -2, -1, 0, -1, 0, 1, 2, 0, -3, -2, -1, -2, 1, 0, 2, 0, -1, 1, 0, -1, 2, -1, 1, -2, -1, -1, -2, 0, 1, 4, 0, -2, 0, 2, 1, -2, -3, 2, 1, -1, 3 ], args_moon_node = [ 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, -2, 2, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, -2, 2, 0, 2, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, -2, -2, 0, 0, 0, 0, 0, 0, 0 ], sine_coefficients = [ 6288774, 1274027, 658314, 213618, -185116, -114332, 58793, 57066, 53322, 45758, -40923, -34720, -30383, 15327, -12528, 10980, 10675, 10034, 8548, -7888, -6766, -5163, 4987, 4036, 3994, 3861, 3665, -2689, -2602, 2390, -2348, 2236, -2120, -2069, 2048, -1773, -1595, 1215, -1110, -892, -810, 759, -713, -700, 691, 596, 549, 537, 520, -487, -399, -381, 351, -340, 330, 327, -323, 299, 294 ], correction = 1e-6 * sigma([ sine_coefficients, args_lunar_elongation, args_solar_anomaly, args_lunar_anomaly, args_moon_node ], function(v, w, x, y, z) {
      return v * Math.pow(cap_E, Math.abs(x)) * sin_degrees(w * cap_D + x * cap_M + y * cap_M_prime + z * cap_F);
    }), A1 = 119.75 + 131.849 * c, venus = .003958 * sin_degrees(A1), A2 = 53.09 + 479264.29 * c, jupiter = 318e-6 * sin_degrees(A2), flat_earth = .001962 * sin_degrees(cap_L_prime - cap_F);
    return mod(cap_L_prime + correction + venus + jupiter + flat_earth + nutation(tee), 360);
  }
  function lunar_latitude(tee) {
    var c = julian_centuries(tee), cap_L_prime = mean_lunar_longitude(c), cap_D = lunar_elongation(c), cap_M = solar_anomaly(c), cap_M_prime = lunar_anomaly(c), cap_F = moon_node(c), cap_E = poly(c, [ 1, -.002516, -74e-7 ]), args_lunar_elongation = [ 0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 4, 4, 0, 4, 2, 2, 2, 2, 0, 2, 2, 2, 2, 4, 2, 2, 0, 2, 1, 1, 0, 2, 1, 2, 0, 4, 4, 1, 4, 1, 4, 2 ], args_solar_anomaly = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, -1, -1, -1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 1, 0, -1, -2, 0, 1, 1, 1, 1, 1, 0, -1, 1, 0, -1, 0, 0, 0, -1, -2 ], args_lunar_anomaly = [ 0, 1, 1, 0, -1, -1, 0, 2, 1, 2, 0, -2, 1, 0, -1, 0, -1, -1, -1, 0, 0, -1, 0, 1, 1, 0, 0, 3, 0, -1, 1, -2, 0, 2, 1, -2, 3, 2, -3, -1, 0, 0, 1, 0, 1, 1, 0, 0, -2, -1, 1, -2, 2, -2, -1, 1, 1, -2, 0, 0 ], args_moon_node = [ 1, 1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 3, 1, 1, 1, -1, -1, -1, 1, -1, 1, -3, 1, -3, -1, -1, 1, -1, 1, -1, 1, 1, 1, 1, -1, 3, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1 ], sine_coefficients = [ 5128122, 280602, 277693, 173237, 55413, 46271, 32573, 17198, 9266, 8822, 8216, 4324, 4200, -3359, 2463, 2211, 2065, -1870, 1828, -1794, -1749, -1565, -1491, -1475, -1410, -1344, -1335, 1107, 1021, 833, 777, 671, 607, 596, 491, -451, 439, 422, 421, -366, -351, 331, 315, 302, -283, -229, 223, 223, -220, -220, -185, 181, -177, 176, 166, -164, 132, -119, 115, 107 ], beta = 1e-6 * sigma([ sine_coefficients, args_lunar_elongation, args_solar_anomaly, args_lunar_anomaly, args_moon_node ], function(v, w, x, y, z) {
      return v * Math.pow(cap_E, Math.abs(x)) * sin_degrees(w * cap_D + x * cap_M + y * cap_M_prime + z * cap_F);
    }), venus = 175e-6 * (sin_degrees(119.75 + 131.849 * c + cap_F) + sin_degrees(119.75 + 131.849 * c - cap_F)), flat_earth = -0.002235 * sin_degrees(cap_L_prime) + 127e-6 * sin_degrees(cap_L_prime - cap_M_prime) + -115 / 1e6 * sin_degrees(cap_L_prime + cap_M_prime), extra = 382e-6 * sin_degrees(313.45 + 481266.484 * c);
    return beta + venus + flat_earth + extra;
  }
  function lunar_distance(tee) {
    var c = julian_centuries(tee), cap_D = lunar_elongation(c), cap_M = solar_anomaly(c), cap_M_prime = lunar_anomaly(c), cap_F = moon_node(c), cap_E = poly(c, [ 1, -.002516, -74e-7 ]);
    return args_lunar_elongation = [ 0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 4, 0, 4, 2, 2, 1, 1, 2, 2, 4, 2, 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 4, 0, 3, 2, 4, 0, 2, 2, 2, 4, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2, 2 ], 
    args_solar_anomaly = [ 0, 0, 0, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, -2, 1, 2, -2, 0, 0, -1, 0, 0, 1, -1, 2, 2, 1, -1, 0, 0, -1, 0, 1, 0, 1, 0, 0, -1, 2, 1, 0, 0 ], 
    args_lunar_anomaly = [ 1, -1, 0, 2, 0, 0, -2, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 3, -2, -1, 0, -1, 0, 1, 2, 0, -3, -2, -1, -2, 1, 0, 2, 0, -1, 1, 0, -1, 2, -1, 1, -2, -1, -1, -2, 0, 1, 4, 0, -2, 0, 2, 1, -2, -3, 2, 1, -1, 3, -1 ], 
    args_moon_node = [ 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, -2, 2, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, -2, 2, 0, 2, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, -2, -2, 0, 0, 0, 0, 0, 0, 0, -2 ], 
    cosine_coefficients = [ -20905355, -3699111, -2955968, -569925, 48888, -3149, 246158, -152138, -170733, -204586, -129620, 108743, 104755, 10321, 0, 79661, -34782, -23210, -21636, 24208, 30824, -8379, -16675, -12831, -10445, -11650, 14403, -7003, 0, 10056, 6322, -9884, 5751, 0, -4950, 4130, 0, -3958, 0, 3258, 2616, -1897, -2117, 2354, 0, 0, -1423, -1117, -1571, -1739, 0, -4421, 0, 0, 0, 0, 1165, 0, 0, 8752 ], 
    correction = sigma([ cosine_coefficients, args_lunar_elongation, args_solar_anomaly, args_lunar_anomaly, args_moon_node ], function(v, w, x, y, z) {
      return v * Math.pow(cap_E, Math.abs(x)) * cos_degrees(w * cap_D + x * cap_M + y * cap_M_prime + z * cap_F);
    }), 385000560 + correction;
  }
  function lunar_diameter(tee) {
    return 1792367e3 / 9 / lunar_distance(tee);
  }
  function lunar_position(tee) {
    return [ lunar_latitude(tee), lunar_longitude(tee), lunar_distance(tee) ];
  }
  function nth_new_moon(n) {
    var n0 = 24724, k = n - n0, c = k / 1236.85, approx = J2000 + poly(c, [ 5.09766, 1236.85 * MEAN_SYNODIC_MONTH, 1437e-7, -1.5e-7, 7.3e-10 ]), cap_E = poly(c, [ 1, -.002516, -74e-7 ]), solar_anomaly = poly(c, [ 2.5534, 35998.960422026496, -14e-7, -1.1e-7 ]), lunar_anomaly = poly(c, [ 201.5643, 477197.67640106793, .0107582, 1238e-8, -5.8e-8 ]), moon_argument = poly(c, [ 160.7108, 483200.81143765396, -.0016118, -227e-8, 1.1e-8 ]), cap_omega = poly(c, [ 124.7746, -1934.1314601779998, .0020672, 215e-8 ]), E_factor = [ 0, 1, 0, 0, 1, 1, 2, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], solar_coeff = [ 0, 1, 0, 0, -1, 1, 2, 0, 0, 1, 0, 1, 1, -1, 2, 0, 3, 1, 0, 1, -1, -1, 1, 0 ], lunar_coeff = [ 1, 0, 2, 0, 1, 1, 0, 1, 1, 2, 3, 0, 0, 2, 1, 2, 0, 1, 2, 1, 1, 1, 3, 4 ], moon_coeff = [ 0, 0, 0, 2, 0, 0, 0, -2, 2, 0, 0, 2, -2, 0, 0, -2, 0, -2, 2, 2, 2, -2, 0, 0 ], sine_coeff = [ -.4072, .17241, .01608, .01039, .00739, -.00514, .00208, -.00111, -57e-5, 56e-5, -42e-5, 42e-5, 38e-5, -24e-5, -7e-5, 4e-5, 4e-5, 3e-5, 3e-5, -3e-5, 3e-5, -2e-5, -2e-5, 2e-5 ], correction = -17e-5 * sin_degrees(cap_omega) + sigma([ sine_coeff, E_factor, solar_coeff, lunar_coeff, moon_coeff ], function(v, w, x, y, z) {
      return v * Math.pow(cap_E, w) * sin_degrees(x * solar_anomaly + y * lunar_anomaly + z * moon_argument);
    }), add_const = [ 251.88, 251.83, 349.42, 84.66, 141.74, 207.14, 154.84, 34.52, 207.19, 291.34, 161.72, 239.56, 331.55 ], add_coeff = [ .016321, 26.651886, 36.412478, 18.206239, 53.303771, 2.453732, 7.30686, 27.261239, .121824, 1.844379, 24.198154, 25.513099, 3.592518 ], add_factor = [ 165e-6, 164e-6, 126e-6, 11e-5, 62e-6, 6e-5, 56e-6, 47e-6, 42e-6, 4e-5, 37e-6, 35e-6, 23e-6 ], extra = 325e-6 * sin_degrees(poly(c, [ 299.77, 132.8475848, -.009173 ])), additional = sigma([ add_const, add_coeff, add_factor ], function(i, j, l) {
      return l * sin_degrees(i + j * k);
    });
    return universal_from_dynamical(approx + correction + extra + additional);
  }
  function lunar_phase(tee) {
    var phi = mod(lunar_longitude(tee) - solar_longitude(tee), 360), t0 = nth_new_moon(0), n = iround((tee - t0) / MEAN_SYNODIC_MONTH), phi_prime = deg(360) * mod((tee - nth_new_moon(n)) / MEAN_SYNODIC_MONTH, 1);
    return Math.abs(phi - phi_prime) > 180 ? phi_prime : phi;
  }
  var aa = {
    version: .1
  }, τ = 2 * Math.PI, degrees = 360 / τ, radians = τ / 360;
  aa.angle_from_degrees = angle_from_degrees, aa.decimal_degrees = decimal_degrees, 
  aa.signum = signum, Math.signum = signum, aa.round = round, aa.mod = mod, aa.quotient = quotient, 
  aa.ifloor = ifloor, aa.iround = iround, aa.amod = amod, aa.next = next, aa["final"] = final, 
  aa.summa = summa, aa.binary_search = binary_search, aa.invert_angular = invert_angular, 
  aa.zip = zip, aa.sigma = sigma, aa.poly = poly, aa.polyAlt = polyAlt, aa.sin_degrees = sin_degrees, 
  aa.cos_degrees = cos_degrees;
  var SUNDAY = 0, MONDAY = 1, TUESDAY = 2, WEDNESDAY = 3, THURSDAY = 4, FRIDAY = 5, SATURDAY = 6;
  aa.time_from_clock = time_from_clock, aa.fixed_from_moment = fixed_from_moment, 
  aa.time_from_moment = time_from_moment, aa.clock_from_moment = clock_from_moment;
  var JD_EPOCH = rd(-1721424.5);
  aa.JD_EPOCH = JD_EPOCH, aa.moment_from_jd = moment_from_jd, aa.jd_from_moment = jd_from_moment, 
  aa.fixed_from_jd = fixed_from_jd, aa.jd_from_fixed = jd_from_fixed, aa.gregorian_date = gregorian_date;
  var GREGORIAN_EPOCH = rd(1), JANUARY = 1, FEBRUARY = 2, MARCH = 3, APRIL = 4, MAY = 5, JUNE = 6, JULY = 7, AUGUST = 8, SEPTEMBER = 9, OCTOBER = 10, NOVEMBER = 11, DECEMBER = 12;
  aa.is_gregorian_leap_year = is_gregorian_leap_year, aa.fixed_from_gregorian = fixed_from_gregorian, 
  aa.gregorian_year_from_fixed = gregorian_year_from_fixed, aa.gregorian_new_year = gregorian_new_year, 
  aa.gregorian_year_end = gregorian_year_end, aa.gregorian_from_fixed = gregorian_from_fixed;
  var J2000 = days_from_hours(12) + gregorian_new_year(2e3);
  aa.J2000 = J2000, aa.julian_centuries = julian_centuries, aa.dynamical_from_universal = dynamical_from_universal, 
  aa.universal_from_dynamical = universal_from_dynamical, aa.ephemeris_correction = ephemeris_correction, 
  aa.mean_lunar_longitude = mean_lunar_longitude, aa.lunar_elongation = lunar_elongation, 
  aa.solar_anomaly = solar_anomaly, aa.lunar_anomaly = lunar_anomaly, aa.moon_node = moon_node, 
  aa.nutation = nutation, aa.lunar_longitude = lunar_longitude, aa.lunar_latitude = lunar_latitude, 
  aa.lunar_distance = lunar_distance, aa.lunar_diameter = lunar_diameter, aa.lunar_position = lunar_position;
  var MEAN_SYNODIC_MONTH = 29.530588861;
  return aa.MEAN_SYNODIC_MONTH = MEAN_SYNODIC_MONTH, aa.nth_new_moon = nth_new_moon, 
  aa.lunar_phase = lunar_phase, aa;
}();