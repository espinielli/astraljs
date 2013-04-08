// as·tral
// /ˈastrəl/
// Adjective
// Of, connected with, or resembling the stars: "astral navigation".
// Of or relating to a supposed nonphysical realm of existence in which
// the physical human body is said to have a counterpart.

(function () {
  var astral = {};

  // days (and fractions) of Julian 2000 at 12 UTC
  // (since EPOCH = January 1, 1970, 00:00:00 UTC)
  var J2000 = Date.UTC(2000, 0, 1, 12) / 1000 / 86400,
          τ = 2 * Math.PI,
    degrees = 360 / τ,
    radians = τ / 360;

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

  // Return Dynamical Time minus Universal Time (in days) for
  // moment, 'tee'.  Adapted from "Astronomical Algorithms"
  // by Jean Meeus, Willmann_Bell, Inc., 1991.
  function ephemeris_correction(tee) {
    var year = tee.getUTCFullYear(),
    c = ((new Date(1900, 0, 1, 0, 0, 0)) - (new Date(year, 6, 1, 0, 0, 0))) / 36525;

    if (1988 <= year && year <= 2019) {
      return (year - 1933) / 86400;
    }
    else if (1900 <= year && year <= 1987) {
      return poly(c, [-0.00002, 0.000297, 0.025184,
                      -0.181133, 0.553040, -0.861938,
                      0.677066, -0.212591]);
    }
    else if (1800 <= year && year <= 1899) {
      return poly(c, [-0.000009, 0.003844, 0.083563,
                      0.865736, 4.867575, 15.845535,
                      31.332267, 38.291999, 28.316289,
                      11.636204, 2.043794]);
    }
    else if (1700 <= year && year <= 1799) {
      return (1 / 86400 *
              poly(year - 1700, [8.118780842, -0.005092142,
                                 0.003336121, -0.0000266484]));
    }
    else if (1620 <= year && year <= 1699) {
      return (1 / 86400 *
              poly(year - 1600,
                   [196.58333, -4.0675, 0.0219167]));
    }
    else {
      var x = (12/24 +
               ((new Date.UTC(1810, 0, 1, 0, 0, 0)) - (new Date.UTC(year, 0, 1, 0, 0, 0))));
      return (1 / 86400 * (((x * x) / 41048480) - 15));
    }
  }
  astral.ephemeris_correction = ephemeris_correction;


   function sigma() {}

   // define sign of number
   Math.signum = function(x) { return x ? x < 0 ? -1 : 1 : 0; };

   // round a-la Common Lisp
   function round(n) { return Math.signum(n) * Math.round(Math.abs(n)); }
   astral.round = round;

   function integer(n) { return n - (mod(n,1));}
   astral.int = integer;

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

   function sin_degrees(α) { return Math.sin(α * radians);}
   astral.sin_degrees = sin_degrees;

   function cos_degrees(α) { return Math.cos(α * radians);}
   astral.cos_degrees = cos_degrees;

     function mean_lunar_longitude() {}
     function lunar_elongation() {}
     function solar_anomaly() {}
     function lunar_anomaly() {}
     function moon_node() {}

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


     return astral;
 }());

