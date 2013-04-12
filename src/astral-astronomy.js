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



