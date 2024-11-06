(function () {
  var h,
    aa =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    ba;
  if ("function" == typeof Object.setPrototypeOf) ba = Object.setPrototypeOf;
  else {
    var ca;
    a: {
      var da = { a: !0 },
        ea = {};
      try {
        ea.__proto__ = da;
        ca = ea.a;
        break a;
      } catch (a) {}
      ca = !1;
    }
    ba = ca
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var fa = ba,
    ha = function (a, b) {
      a.prototype = aa(b.prototype);
      a.prototype.constructor = a;
      if (fa) fa(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
      a.Ca = b.prototype;
    },
    ia =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          },
    ja =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this,
    ka = function (a, b) {
      if (b) {
        for (var c = ja, d = a.split("."), e = 0; e < d.length - 1; e++) {
          var f = d[e];
          f in c || (c[f] = {});
          c = c[f];
        }
        d = d[d.length - 1];
        e = c[d];
        f = b(e);
        f != e &&
          null != f &&
          ia(c, d, { configurable: !0, writable: !0, value: f });
      }
    },
    la = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
    },
    ma = function (a) {
      var b =
        "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b ? b.call(a) : { next: la(a) };
    };
  ka("Promise", function (a) {
    function b() {
      this.g = null;
    }
    function c(g) {
      return g instanceof e
        ? g
        : new e(function (k) {
            k(g);
          });
    }
    if (a) return a;
    b.prototype.i = function (g) {
      if (null == this.g) {
        this.g = [];
        var k = this;
        this.j(function () {
          k.H();
        });
      }
      this.g.push(g);
    };
    var d = ja.setTimeout;
    b.prototype.j = function (g) {
      d(g, 0);
    };
    b.prototype.H = function () {
      for (; this.g && this.g.length; ) {
        var g = this.g;
        this.g = [];
        for (var k = 0; k < g.length; ++k) {
          var m = g[k];
          g[k] = null;
          try {
            m();
          } catch (w) {
            this.o(w);
          }
        }
      }
      this.g = null;
    };
    b.prototype.o = function (g) {
      this.j(function () {
        throw g;
      });
    };
    var e = function (g) {
      this.i = 0;
      this.j = void 0;
      this.g = [];
      var k = this.o();
      try {
        g(k.resolve, k.reject);
      } catch (m) {
        k.reject(m);
      }
    };
    e.prototype.o = function () {
      function g(w) {
        return function (u) {
          m || ((m = !0), w.call(k, u));
        };
      }
      var k = this,
        m = !1;
      return { resolve: g(this.T), reject: g(this.H) };
    };
    e.prototype.T = function (g) {
      if (g === this)
        this.H(new TypeError("A Promise cannot resolve to itself"));
      else if (g instanceof e) this.U(g);
      else {
        a: switch (typeof g) {
          case "object":
            var k = null != g;
            break a;
          case "function":
            k = !0;
            break a;
          default:
            k = !1;
        }
        k ? this.V(g) : this.s(g);
      }
    };
    e.prototype.V = function (g) {
      var k = void 0;
      try {
        k = g.then;
      } catch (m) {
        this.H(m);
        return;
      }
      "function" == typeof k ? this.W(k, g) : this.s(g);
    };
    e.prototype.H = function (g) {
      this.R(2, g);
    };
    e.prototype.s = function (g) {
      this.R(1, g);
    };
    e.prototype.R = function (g, k) {
      if (0 != this.i) throw Error("a`" + g + "`" + k + "`" + this.i);
      this.i = g;
      this.j = k;
      this.S();
    };
    e.prototype.S = function () {
      if (null != this.g) {
        for (var g = 0; g < this.g.length; ++g) f.i(this.g[g]);
        this.g = null;
      }
    };
    var f = new b();
    e.prototype.U = function (g) {
      var k = this.o();
      g.yb(k.resolve, k.reject);
    };
    e.prototype.W = function (g, k) {
      var m = this.o();
      try {
        g.call(k, m.resolve, m.reject);
      } catch (w) {
        m.reject(w);
      }
    };
    e.prototype.then = function (g, k) {
      function m(Q, J) {
        return "function" == typeof Q
          ? function (B) {
              try {
                w(Q(B));
              } catch (R) {
                u(R);
              }
            }
          : J;
      }
      var w,
        u,
        C = new e(function (Q, J) {
          w = Q;
          u = J;
        });
      this.yb(m(g, w), m(k, u));
      return C;
    };
    e.prototype["catch"] = function (g) {
      return this.then(void 0, g);
    };
    e.prototype.yb = function (g, k) {
      function m() {
        switch (w.i) {
          case 1:
            g(w.j);
            break;
          case 2:
            k(w.j);
            break;
          default:
            throw Error("b`" + w.i);
        }
      }
      var w = this;
      null == this.g ? f.i(m) : this.g.push(m);
    };
    e.resolve = c;
    e.reject = function (g) {
      return new e(function (k, m) {
        m(g);
      });
    };
    e.race = function (g) {
      return new e(function (k, m) {
        for (var w = ma(g), u = w.next(); !u.done; u = w.next())
          c(u.value).yb(k, m);
      });
    };
    e.all = function (g) {
      var k = ma(g),
        m = k.next();
      return m.done
        ? c([])
        : new e(function (w, u) {
            function C(B) {
              return function (R) {
                Q[B] = R;
                J--;
                0 == J && w(Q);
              };
            }
            var Q = [],
              J = 0;
            do
              Q.push(void 0),
                J++,
                c(m.value).yb(C(Q.length - 1), u),
                (m = k.next());
            while (!m.done);
          });
    };
    return e;
  });
  var na = this || self,
    oa = function (a) {
      return void 0 !== a;
    },
    pa = function (a) {
      return "string" == typeof a;
    },
    qa = function (a) {
      return "number" == typeof a;
    },
    ra = function () {},
    sa = function (a) {
      a.Lb = void 0;
      a.$ = function () {
        return a.Lb ? a.Lb : (a.Lb = new a());
      };
    },
    ta = function (a) {
      var b = typeof a;
      if ("object" == b)
        if (a) {
          if (a instanceof Array) return "array";
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c) return "object";
          if (
            "[object Array]" == c ||
            ("number" == typeof a.length &&
              "undefined" != typeof a.splice &&
              "undefined" != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable("splice"))
          )
            return "array";
          if (
            "[object Function]" == c ||
            ("undefined" != typeof a.call &&
              "undefined" != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable("call"))
          )
            return "function";
        } else return "null";
      else if ("function" == b && "undefined" == typeof a.call) return "object";
      return b;
    },
    ua = function (a) {
      return "array" == ta(a);
    },
    va = function (a) {
      var b = ta(a);
      return "array" == b || ("object" == b && "number" == typeof a.length);
    },
    wa = function (a) {
      var b = typeof a;
      return ("object" == b && null != a) || "function" == b;
    },
    xa = function (a, b, c) {
      return a.call.apply(a.bind, arguments);
    },
    ya = function (a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () {
          var e = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(e, d);
          return a.apply(b, e);
        };
      }
      return function () {
        return a.apply(b, arguments);
      };
    },
    za = function (a, b, c) {
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
        ? (za = xa)
        : (za = ya);
      return za.apply(null, arguments);
    },
    Aa = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function () {
        var d = c.slice();
        d.push.apply(d, arguments);
        return a.apply(this, d);
      };
    },
    Ba =
      Date.now ||
      function () {
        return +new Date();
      },
    Da = function (a, b) {
      var c = a.split("."),
        d = na;
      c[0] in d ||
        "undefined" == typeof d.execScript ||
        d.execScript("var " + c[0]);
      for (var e; c.length && (e = c.shift()); )
        !c.length && oa(b)
          ? (d[e] = b)
          : d[e] && d[e] !== Object.prototype[e]
          ? (d = d[e])
          : (d = d[e] = {});
    },
    l = function (a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.Ca = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.Yc = function (d, e, f) {
        for (
          var g = Array(arguments.length - 2), k = 2;
          k < arguments.length;
          k++
        )
          g[k - 2] = arguments[k];
        return b.prototype[e].apply(d, g);
      };
    };
  var Fa = function (a, b, c, d, e, f) {
      if (6 == arguments.length) Ea(this, a, b, c, d, e, f);
      else {
        if (0 != arguments.length) throw Error("c");
        this.j = this.o = 1;
        this.s = this.H = this.i = this.g = 0;
      }
    },
    Ga = function (a) {
      return new Fa(a.j, a.s, a.H, a.o, a.i, a.g);
    },
    Ea = function (a, b, c, d, e, f, g) {
      if (!(qa(b) && qa(c) && qa(d) && qa(e) && qa(f) && qa(g)))
        throw Error("d");
      a.j = b;
      a.s = c;
      a.H = d;
      a.o = e;
      a.i = f;
      a.g = g;
      return a;
    };
  Fa.prototype.scale = function (a, b) {
    this.j *= a;
    this.s *= a;
    this.H *= b;
    this.o *= b;
    return this;
  };
  var Ha = function (a, b, c) {
    a.i += b * a.j + c * a.H;
    a.g += b * a.s + c * a.o;
    return a;
  };
  Fa.prototype.toString = function () {
    return (
      "matrix(" + [this.j, this.s, this.H, this.o, this.i, this.g].join() + ")"
    );
  };
  var Ia = function (a, b) {
    var c = a.j,
      d = a.H;
    a.j = b.j * c + b.s * d;
    a.H = b.H * c + b.o * d;
    a.i += b.i * c + b.g * d;
    c = a.s;
    d = a.o;
    a.s = b.j * c + b.s * d;
    a.o = b.H * c + b.o * d;
    a.g += b.i * c + b.g * d;
    return a;
  };
  Fa.prototype.transform = function (a, b, c, d, e) {
    var f = b;
    for (b += 2 * e; f < b; ) {
      e = a[f++];
      var g = a[f++];
      c[d++] = e * this.j + g * this.H + this.i;
      c[d++] = e * this.s + g * this.o + this.g;
    }
  };
  var Ja = function (a, b) {
    var c = Math.cos(b),
      d = Math.sin(b);
    return Ea(a, c, d, -d, c, -(0 * c) + 0 * d, -(0 * d) - 0 * c);
  };
  var Ka = Array.prototype.indexOf
      ? function (a, b) {
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if (pa(a)) return pa(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    La = Array.prototype.forEach
      ? function (a, b, c) {
          Array.prototype.forEach.call(a, b, c);
        }
      : function (a, b, c) {
          for (var d = a.length, e = pa(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a);
        },
    Ma = Array.prototype.map
      ? function (a, b) {
          return Array.prototype.map.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length, d = Array(c), e = pa(a) ? a.split("") : a, f = 0;
            f < c;
            f++
          )
            f in e && (d[f] = b.call(void 0, e[f], f, a));
          return d;
        },
    Na = Array.prototype.reduce
      ? function (a, b, c) {
          return Array.prototype.reduce.call(a, b, c);
        }
      : function (a, b, c) {
          var d = c;
          La(a, function (e, f) {
            d = b.call(void 0, d, e, f, a);
          });
          return d;
        },
    Oa = function (a, b) {
      a: {
        var c = a.length;
        for (var d = pa(a) ? a.split("") : a, e = 0; e < c; e++)
          if (e in d && b.call(void 0, d[e], e, a)) {
            c = e;
            break a;
          }
        c = -1;
      }
      return 0 > c ? null : pa(a) ? a.charAt(c) : a[c];
    },
    Pa = function (a, b) {
      var c = Ka(a, b),
        d;
      (d = 0 <= c) && Array.prototype.splice.call(a, c, 1);
      return d;
    },
    Qa = function (a) {
      return Array.prototype.concat.apply([], arguments);
    },
    Ra = function (a) {
      var b = a.length;
      if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c;
      }
      return [];
    },
    Sa = function (a, b) {
      for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (va(d)) {
          var e = a.length || 0,
            f = d.length || 0;
          a.length = e + f;
          for (var g = 0; g < f; g++) a[e + g] = d[g];
        } else a.push(d);
      }
    };
  var Ta = function (a, b, c) {
      return Math.min(Math.max(a, b), c);
    },
    n = function (a, b, c) {
      return a + c * (b - a);
    },
    Ua = function (a, b) {
      var c = ((180 * Math.atan2(b - 0, a - 0)) / Math.PI) % 360;
      return 0 > 360 * c ? c + 360 : c;
    },
    Va = function (a) {
      return Na(
        arguments,
        function (b, c) {
          return b + c;
        },
        0
      );
    },
    Wa = function (a) {
      return Va.apply(null, arguments) / arguments.length;
    };
  var p = function (a, b) {
      this.x = oa(a) ? a : 0;
      this.y = oa(b) ? b : 0;
    },
    Xa = function (a) {
      return Math.sqrt(a.x * a.x + a.y * a.y);
    },
    Ya = function (a, b) {
      return new p(a.x - b.x, a.y - b.y);
    };
  p.prototype.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  p.prototype.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  p.prototype.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  p.prototype.scale = function (a, b) {
    var c = qa(b) ? b : a;
    this.x *= a;
    this.y *= c;
    return this;
  };
  var q = function () {
      this.H = new Fa();
      this.va = 1;
      this.i = 0;
      this.g = !0;
      this.V = [];
      this.R = null;
      this.ub = this.Gb = this.Hb = 0;
      this.Ga = new Za();
    },
    r = function (a, b) {
      null != b.R && b.R.removeChild(b);
      b.R = a;
      a.V.push(b);
      $a(b);
    };
  q.prototype.removeChild = function (a) {
    var b = this.V.indexOf(a);
    -1 != b && (this.V.splice(b, 1), (a.R = null));
    $a(a);
  };
  var t = function (a) {
      a.R && a.R.removeChild(a);
    },
    ab = function (a) {
      for (var b = 0; b < a.V.length; b++) a.V[b].R = null;
      a.V = [];
    };
  q.prototype.update = function () {};
  q.prototype.ra = function () {};
  var v = function (a, b, c) {
      var d = a.H,
        e = -a.H.g;
      d.i += -a.H.i;
      d.g += e;
      d = a.H;
      e = void 0 === c ? b.y : c;
      d.i += void 0 === c ? b.x : b;
      d.g += e;
      $a(a);
    },
    bb = function (a) {
      return new p(a.H.i, a.H.g);
    },
    x = function (a, b) {
      a.H.j && a.H.scale(1 / a.H.j, 1 / a.H.o);
      a.H.scale(b, b);
      $a(a);
    },
    cb = function (a, b) {
      a.ub += b;
      var c = a.H;
      var d = Ja(new Fa(), b);
      Ia(c, d);
      $a(a);
    },
    db = function (a) {
      var b = a.H,
        c = -a.ub;
      c = Ja(new Fa(), c);
      Ia(b, c);
      a.ub = 0;
      $a(a);
    },
    eb = function (a) {
      if (!a.Fb) {
        var b = a.R
          ? Ha(Ia(Ga(eb(a.R)), a.H), a.Gb, a.Hb)
          : Ha(Ga(a.H), a.Gb, a.Hb);
        a.Fb = b;
      }
      return a.Fb;
    },
    $a = function (a) {
      a.Fb = null;
      for (var b = 0; b < a.V.length; b++) $a(a.V[b]);
    },
    Za = function () {
      this.order = this.Za = this.index = 0;
    },
    fb = function (a, b) {
      var c = a;
      for (c.Ga.index = -1; null != c; ) {
        var d = c.V;
        -1 == c.Ga.index && b(c) && (c.Ga.index = d.length);
        c.Ga.index++;
        c.Ga.index < d.length
          ? ((d[c.Ga.index].Ga.index = -1), (c = d[c.Ga.index]))
          : (c = c.R);
      }
    };
  var gb = function () {
    q.call(this);
    this.U = !1;
  };
  l(gb, q);
  h = gb.prototype;
  h.update = function (a) {
    this.U || ((this.U = !0), this.Zb());
    this.Mb(a);
    this.Wa() && this.Xa();
  };
  h.Mb = function () {};
  h.Zb = function () {};
  h.Xa = function () {};
  h.Wa = function () {
    return !1;
  };
  var hb = function (a) {
    gb.call(this);
    this.j = !1;
    this.Zb = a;
  };
  l(hb, gb);
  hb.prototype.update = function (a) {
    this.j = !0;
    return hb.Ca.update.call(this, a);
  };
  hb.prototype.Wa = function () {
    return this.j;
  };
  var y = function (a, b, c) {
    gb.call(this);
    this.j = 0;
    this.s = a;
    b && (this.Mb = b);
    c && (this.Xa = c);
  };
  l(y, gb);
  var ib = Number.POSITIVE_INFINITY;
  y.prototype.update = function (a) {
    this.j += a;
    return y.Ca.update.call(this, a);
  };
  y.prototype.Wa = function () {
    return this.j >= this.s;
  };
  var jb = function (a, b, c, d, e, f, g, k) {
      this.g = a;
      this.S = b;
      this.i = c;
      this.H = d;
      this.j = e;
      this.s = f;
      this.o = g;
      this.R = k;
    },
    lb = function (a, b) {
      if (0 == b) return a.g;
      if (1 == b) return a.o;
      var c = n(a.g, a.i, b),
        d = n(a.i, a.j, b),
        e = n(a.j, a.o, b);
      c = n(c, d, b);
      d = n(d, e, b);
      return n(c, d, b);
    },
    mb = function (a, b) {
      if (0 == b) return a.S;
      if (1 == b) return a.R;
      var c = n(a.S, a.H, b),
        d = n(a.H, a.s, b),
        e = n(a.s, a.R, b);
      c = n(c, d, b);
      d = n(d, e, b);
      return n(c, d, b);
    },
    nb = function (a, b) {
      var c = (b - a.g) / (a.o - a.g);
      if (0 >= c) return 0;
      if (1 <= c) return 1;
      for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
        f = lb(a, c);
        var k = (lb(a, c + 1e-6) - f) / 1e-6;
        if (1e-6 > Math.abs(f - b)) return c;
        if (1e-6 > Math.abs(k)) break;
        else f < b ? (d = c) : (e = c), (c -= (f - b) / k);
      }
      for (g = 0; 1e-6 < Math.abs(f - b) && 8 > g; g++)
        f < b ? ((d = c), (c = (c + e) / 2)) : ((e = c), (c = (c + d) / 2)),
          (f = lb(a, c));
      return c;
    };
  var ob = function (a, b, c) {
      var d = new jb(0, 0, a, b, c, 1, 1, 1);
      return function (e) {
        return mb(d, nb(d, e));
      };
    },
    pb = ob(0.25, 0.1, 0.25),
    qb = function (a, b, c, d) {
      d = void 0 === d ? pb : d;
      return b + d(a) * (c - b);
    },
    rb = function (a) {
      return a;
    },
    sb = ob(0.4, 0, 1),
    tb = ob(0, 0, 0.6),
    ub = ob(0.6, 0, 0.4);
  var vb = function (a, b, c, d, e, f) {
    y.call(this, b, null, e);
    this.wa = a;
    this.o = c;
    this.S = d;
    this.T = f || rb;
  };
  l(vb, y);
  vb.prototype.update = function (a) {
    this.o || (this.o = bb(this.wa));
    a = vb.Ca.update.call(this, a);
    var b = Ta(this.j / this.s, 0, 1),
      c = qb(b, this.o.x, this.S.x, this.T);
    b = qb(b, this.o.y, this.S.y, this.T);
    v(this.wa, c, b);
    return a;
  };
  var z = function () {
    q.call(this);
    this.W = [];
    this.S = [];
  };
  l(z, q);
  z.prototype.update = function (a) {
    if (0 < this.W.length && 0 < a) {
      var b = this.W[0];
      b.update(a);
      b.Wa() && this.W.shift();
    }
    for (b = 0; b < this.S.length; b++)
      this.S[b].update(a), this.S[b].Wa() && this.S.splice(b--, 1);
  };
  var A = function (a, b) {
      a.W.push(b);
    },
    wb = function (a, b) {
      a.W.push(new y(b));
    },
    D = function (a, b, c) {
      a.W.push(new y(b, null, c));
    },
    yb = function (a, b) {
      D(a, 0, function () {
        xb(a, b);
      });
    },
    zb = function (a, b, c, d, e, f) {
      a.W.push(new vb(a, b, c, d, e, f));
    },
    E = function (a) {
      a.W = [];
    },
    xb = function (a, b) {
      a.S.push(b);
    };
  var Ab = /#(.)(.)(.)/,
    Bb = /^#(?:[0-9a-f]{3}){1,2}$/i;
  var Cb = function (a, b, c) {
      b *= c.length;
      for (var d = 0, e = c[0]; 0 <= b && d < c.length; ) {
        e = c[d];
        var f = Math.min(b, 1);
        if (1 > f) {
          var g = (e = new jb(e.g, e.S, e.i, e.H, e.j, e.s, e.o, e.R));
          if (1 != f) {
            var k = n(g.g, g.i, f),
              m = n(g.S, g.H, f),
              w = n(g.i, g.j, f),
              u = n(g.H, g.s, f),
              C = n(g.j, g.o, f),
              Q = n(g.s, g.R, f);
            g.i = k;
            g.H = m;
            k = n(k, w, f);
            m = n(m, u, f);
            w = n(w, C, f);
            u = n(u, Q, f);
            g.j = k;
            g.s = m;
            g.o = n(k, w, f);
            g.R = n(m, u, f);
          }
        }
        g = a;
        f = e;
        g.save();
        g.beginPath();
        g.moveTo(f.g, f.S);
        g.bezierCurveTo(f.i, f.H, f.j, f.s, f.o, f.R);
        g.stroke();
        g.restore();
        d++;
        b--;
      }
      return e;
    },
    Db = [255, 255, 255];
  var Eb = function (a, b, c) {
      a.save();
      a.translate(b - 73, c - 15);
      a.beginPath();
      a.moveTo(66.7, 352.6);
      a.bezierCurveTo(66.7, 352.6, 67.8, 279.6, 67.8, 263.1);
      a.bezierCurveTo(67.8, 246.6, 50.3, 247.1, 43.3, 234.8);
      a.bezierCurveTo(36.4, 222.6, 8.7, 156.5, 49.7, 150.1);
      a.bezierCurveTo(52.4, 115.5, 56.1, 50.6, 57.7, 29.2);
      a.bezierCurveTo(59.3, 7.9, 90.2, 13.3, 89.7, 29.8);
      a.bezierCurveTo(89.1, 46.3, 87.5, 111.3, 87.5, 111.3);
      a.bezierCurveTo(87.5, 111.3, 93.4, 103.3, 107.2, 105.9);
      a.bezierCurveTo(121.1, 108.6, 124.8, 122.5, 124.8, 122.5);
      a.bezierCurveTo(124.8, 122.5, 149.9, 98.5, 161, 134.7);
      a.bezierCurveTo(176.5, 117.7, 188.2, 133.6, 189.8, 145.9);
      a.bezierCurveTo(191, 155.5, 196.2, 192.8, 189.3, 215.7);
      a.bezierCurveTo(182.3, 238.6, 163.7, 264.7, 163.7, 264.7);
      a.lineTo(162.6, 352.6);
      a.lineWidth = 9;
      a.strokeStyle = "rgb(255, 255, 255)";
      a.lineCap = "round";
      a.lineJoin = "round";
      a.stroke();
      a.restore();
    },
    Fb = function (a, b, c) {
      a.save();
      a.translate(b, c);
      a.save();
      a.beginPath();
      a.moveTo(12.5, 43.5);
      a.lineTo(0.2, 54.7);
      a.lineTo(0, 0);
      a.lineTo(44.9, 33.4);
      a.lineTo(25.9, 36.3);
      a.lineTo(33.4, 53);
      a.lineTo(21, 59.2);
      a.lineTo(12.5, 43.5);
      a.closePath();
      a.fillStyle = "rgb(255, 255, 255)";
      a.fill();
      a.beginPath();
      a.moveTo(36.8, 31.1);
      a.lineTo(3, 6);
      a.lineTo(3.2, 46.8);
      a.lineTo(13.2, 36.2);
      a.lineTo(22.3, 55.2);
      a.lineTo(29.4, 51.7);
      a.lineTo(20.2, 32.7);
      a.lineTo(36.8, 31.1);
      a.closePath();
      a.fillStyle = "rgb(1, 1, 1)";
      a.fill();
      a.restore();
      a.restore();
    },
    Gb = [
      new jb(390.1, 169.5, 406.9, 185.5, 430.7, 194.3, 476, 162.2),
      new jb(452.4, 164.3, 455.4, 164.2, 472.5, 162.8, 475.1, 162.6),
      new jb(466.6, 183.9, 467.2, 178.4, 472.8, 167.5, 475.7, 162.6),
    ],
    Hb = function (a, b, c, d) {
      return new jb(a, b, a, b, c, d, c, d);
    };
  var Ib = function (a, b) {
    q.call(this);
    this.j = 0;
    v(this, a, b);
  };
  l(Ib, q);
  Ib.prototype.update = function (a) {
    this.j += a;
  };
  Ib.prototype.ra = function (a) {
    var b = Math.min(1, this.j / 1500);
    a.save();
    a.lineCap = "round";
    a.lineJoin = "round";
    a.lineWidth = 3;
    a.strokeStyle = "white";
    a.translate(-476, -163);
    Cb(a, b, Gb);
    a.restore();
  };
  var Jb = function (a) {
      this.s = a;
      this.i = !1;
      this.j = [];
    },
    Kb = function (a) {
      if (!a.i) {
        a.i = !0;
        for (var b = 0, c; (c = a.j[b]); b++) c();
      }
    },
    Lb = function (a, b) {
      a.i ? b() : a.j.push(b);
    },
    Mb = function (a) {
      Jb.call(this, a);
      this.image = new Image();
    };
  l(Mb, Jb);
  Mb.prototype.g = function () {
    if (!this.image.src) {
      var a = this;
      this.image.onload = function () {
        Kb(a);
      };
      this.image.src = this.s;
      (this.image.complete || "complete" == this.image.readyState) && Kb(this);
    }
  };
  var Nb = function (a, b) {
    for (var c = 0, d = 0, e; (e = a[d]); d++)
      Lb(e, function () {
        c++;
        c == a.length && b();
      }),
        e.g();
  };
  var Ob = String.prototype.trim
      ? function (a) {
          return a.trim();
        }
      : function (a) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
        },
    Pb = function (a, b) {
      return -1 != a.indexOf(b);
    },
    Qb = function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
  var Rb;
  a: {
    var Sb = na.navigator;
    if (Sb) {
      var Tb = Sb.userAgent;
      if (Tb) {
        Rb = Tb;
        break a;
      }
    }
    Rb = "";
  }
  var Ub = function (a) {
    return Pb(Rb, a);
  };
  var Vb = function (a, b, c) {
      for (var d in a) b.call(c, a[d], d, a);
    },
    Wb =
      "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " "
      ),
    Xb = function (a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Wb.length; f++)
          (c = Wb[f]),
            Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    },
    F = function (a) {
      var b = arguments.length;
      if (1 == b && ua(arguments[0])) return F.apply(null, arguments[0]);
      if (b % 2) throw Error("f");
      for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
      return c;
    };
  var Zb = function () {
    this.g = "";
    this.i = Yb;
  };
  Zb.prototype.o = !0;
  Zb.prototype.j = function () {
    return this.g.toString();
  };
  var $b = function (a) {
      if (a instanceof Zb && a.constructor === Zb && a.i === Yb) return a.g;
      ta(a);
      return "type_error:SafeUrl";
    },
    ac = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    cc = function (a) {
      if (a instanceof Zb) return a;
      a = "object" == typeof a && a.o ? a.j() : String(a);
      ac.test(a) || (a = "about:invalid#zClosurez");
      return bc(a);
    },
    Yb = {},
    bc = function (a) {
      var b = new Zb();
      b.g = a;
      return b;
    };
  bc("about:blank");
  var dc = function (a) {
    a = a instanceof Zb ? a : cc(a);
    na.open($b(a), "", void 0, void 0);
  };
  var ec = function (a) {
    ec[" "](a);
    return a;
  };
  ec[" "] = ra;
  var fc = Ub("Opera"),
    gc = Ub("Trident") || Ub("MSIE"),
    hc = Ub("Edge"),
    ic =
      Ub("Gecko") &&
      !(Pb(Rb.toLowerCase(), "webkit") && !Ub("Edge")) &&
      !(Ub("Trident") || Ub("MSIE")) &&
      !Ub("Edge"),
    jc = Pb(Rb.toLowerCase(), "webkit") && !Ub("Edge"),
    kc = function () {
      var a = na.document;
      return a ? a.documentMode : void 0;
    },
    lc;
  a: {
    var mc = "",
      nc = (function () {
        var a = Rb;
        if (ic) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (hc) return /Edge\/([\d\.]+)/.exec(a);
        if (gc) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (jc) return /WebKit\/(\S+)/.exec(a);
        if (fc) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    nc && (mc = nc ? nc[1] : "");
    if (gc) {
      var oc = kc();
      if (null != oc && oc > parseFloat(mc)) {
        lc = String(oc);
        break a;
      }
    }
    lc = mc;
  }
  var pc = lc,
    qc = {},
    rc;
  rc = na.document && gc ? kc() : void 0;
  var sc;
  (sc = !gc) || (sc = 9 <= Number(rc));
  var tc = sc,
    uc;
  if ((uc = gc)) {
    var vc;
    if (Object.prototype.hasOwnProperty.call(qc, "9")) vc = qc["9"];
    else {
      for (
        var wc = 0,
          xc = Ob(String(pc)).split("."),
          yc = Ob("9").split("."),
          zc = Math.max(xc.length, yc.length),
          Ac = 0;
        0 == wc && Ac < zc;
        Ac++
      ) {
        var Bc = xc[Ac] || "",
          Cc = yc[Ac] || "";
        do {
          var Dc = /(\d*)(\D*)(.*)/.exec(Bc) || ["", "", "", ""],
            Ec = /(\d*)(\D*)(.*)/.exec(Cc) || ["", "", "", ""];
          if (0 == Dc[0].length && 0 == Ec[0].length) break;
          wc =
            Qb(
              0 == Dc[1].length ? 0 : parseInt(Dc[1], 10),
              0 == Ec[1].length ? 0 : parseInt(Ec[1], 10)
            ) ||
            Qb(0 == Dc[2].length, 0 == Ec[2].length) ||
            Qb(Dc[2], Ec[2]);
          Bc = Dc[3];
          Cc = Ec[3];
        } while (0 == wc);
      }
      vc = qc["9"] = 0 <= wc;
    }
    uc = !vc;
  }
  var Fc = uc,
    Gc = (function () {
      if (!na.addEventListener || !Object.defineProperty) return !1;
      var a = !1,
        b = Object.defineProperty({}, "passive", {
          get: function () {
            a = !0;
          },
        });
      try {
        na.addEventListener("test", ra, b),
          na.removeEventListener("test", ra, b);
      } catch (c) {}
      return a;
    })();
  var Hc = function () {
    this.S = this.S;
    this.o = this.o;
  };
  Hc.prototype.S = !1;
  Hc.prototype.Yb = function () {
    this.S || ((this.S = !0), this.g());
  };
  var Ic = function (a, b) {
    a.S
      ? oa(void 0)
        ? b.call(void 0)
        : b()
      : (a.o || (a.o = []), a.o.push(oa(void 0) ? za(b, void 0) : b));
  };
  Hc.prototype.g = function () {
    if (this.o) for (; this.o.length; ) this.o.shift()();
  };
  var Jc = function (a) {
    a && "function" == typeof a.Yb && a.Yb();
  };
  var Kc = function (a, b) {
    this.type = a;
    this.i = this.target = b;
    this.j = !1;
    this.hc = !0;
  };
  Kc.prototype.stopPropagation = function () {
    this.j = !0;
  };
  Kc.prototype.preventDefault = function () {
    this.hc = !1;
  };
  var Mc = function (a, b) {
    Kc.call(this, a ? a.type : "");
    this.relatedTarget = this.i = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.o = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.g = null;
    if (a) {
      var c = (this.type = a.type),
        d =
          a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : null;
      this.target = a.target || a.srcElement;
      this.i = b;
      var e = a.relatedTarget;
      if (e) {
        if (ic) {
          a: {
            try {
              ec(e.nodeName);
              var f = !0;
              break a;
            } catch (g) {}
            f = !1;
          }
          f || (e = null);
        }
      } else
        "mouseover" == c
          ? (e = a.fromElement)
          : "mouseout" == c && (e = a.toElement);
      this.relatedTarget = e;
      d
        ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
          (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
          (this.screenX = d.screenX || 0),
          (this.screenY = d.screenY || 0))
        : ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0));
      this.button = a.button;
      this.o = a.keyCode || 0;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = pa(a.pointerType)
        ? a.pointerType
        : Lc[a.pointerType] || "";
      this.state = a.state;
      this.g = a;
      a.defaultPrevented && this.preventDefault();
    }
  };
  l(Mc, Kc);
  var Lc = { 2: "touch", 3: "pen", 4: "mouse" };
  Mc.prototype.stopPropagation = function () {
    Mc.Ca.stopPropagation.call(this);
    this.g.stopPropagation
      ? this.g.stopPropagation()
      : (this.g.cancelBubble = !0);
  };
  Mc.prototype.preventDefault = function () {
    Mc.Ca.preventDefault.call(this);
    var a = this.g;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), Fc))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  var Nc = "closure_listenable_" + ((1e6 * Math.random()) | 0),
    Oc = function (a) {
      return !(!a || !a[Nc]);
    },
    Pc = 0;
  var Qc = function (a, b, c, d, e) {
      this.listener = a;
      this.g = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.Ab = e;
      this.key = ++Pc;
      this.Ya = this.wb = !1;
    },
    Rc = function (a) {
      a.Ya = !0;
      a.listener = null;
      a.g = null;
      a.src = null;
      a.Ab = null;
    };
  var Sc = function (a) {
    this.src = a;
    this.g = {};
    this.i = 0;
  };
  Sc.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.g[f];
    a || ((a = this.g[f] = []), this.i++);
    var g = Tc(a, b, d, e);
    -1 < g
      ? ((b = a[g]), c || (b.wb = !1))
      : ((b = new Qc(b, this.src, f, !!d, e)), (b.wb = c), a.push(b));
    return b;
  };
  var Uc = function (a, b) {
      var c = b.type;
      if (!(c in a.g)) return !1;
      var d = Pa(a.g[c], b);
      d && (Rc(b), 0 == a.g[c].length && (delete a.g[c], a.i--));
      return d;
    },
    Vc = function (a, b, c, d, e) {
      a = a.g[b.toString()];
      b = -1;
      a && (b = Tc(a, c, d, e));
      return -1 < b ? a[b] : null;
    },
    Tc = function (a, b, c, d) {
      for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.Ya && f.listener == b && f.capture == !!c && f.Ab == d) return e;
      }
      return -1;
    };
  var Wc = "closure_lm_" + ((1e6 * Math.random()) | 0),
    Xc = {},
    Yc = 0,
    $c = function (a, b, c, d, e) {
      if (d && d.once) return Zc(a, b, c, d, e);
      if (ua(b)) {
        for (var f = 0; f < b.length; f++) $c(a, b[f], c, d, e);
        return null;
      }
      c = ad(c);
      return Oc(a)
        ? a.i.add(String(b), c, !1, wa(d) ? !!d.capture : !!d, e)
        : bd(a, b, c, !1, d, e);
    },
    bd = function (a, b, c, d, e, f) {
      if (!b) throw Error("g");
      var g = wa(e) ? !!e.capture : !!e,
        k = cd(a);
      k || (a[Wc] = k = new Sc(a));
      c = k.add(b, c, d, g, f);
      if (c.g) return c;
      d = dd();
      c.g = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener)
        Gc || (e = g),
          void 0 === e && (e = !1),
          a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(ed(b.toString()), d);
      else if (a.addListener && a.removeListener) a.addListener(d);
      else throw Error("h");
      Yc++;
      return c;
    },
    dd = function () {
      var a = fd,
        b = tc
          ? function (c) {
              return a.call(b.src, b.listener, c);
            }
          : function (c) {
              c = a.call(b.src, b.listener, c);
              if (!c) return c;
            };
      return b;
    },
    Zc = function (a, b, c, d, e) {
      if (ua(b)) {
        for (var f = 0; f < b.length; f++) Zc(a, b[f], c, d, e);
        return null;
      }
      c = ad(c);
      return Oc(a)
        ? a.i.add(String(b), c, !0, wa(d) ? !!d.capture : !!d, e)
        : bd(a, b, c, !0, d, e);
    },
    gd = function (a, b, c, d, e) {
      if (ua(b)) for (var f = 0; f < b.length; f++) gd(a, b[f], c, d, e);
      else
        (d = wa(d) ? !!d.capture : !!d),
          (c = ad(c)),
          Oc(a)
            ? ((a = a.i),
              (b = String(b).toString()),
              b in a.g &&
                ((f = a.g[b]),
                (c = Tc(f, c, d, e)),
                -1 < c &&
                  (Rc(f[c]),
                  Array.prototype.splice.call(f, c, 1),
                  0 == f.length && (delete a.g[b], a.i--))))
            : a && (a = cd(a)) && (c = Vc(a, b, c, d, e)) && hd(c);
    },
    hd = function (a) {
      if (qa(a) || !a || a.Ya) return !1;
      var b = a.src;
      if (Oc(b)) return Uc(b.i, a);
      var c = a.type,
        d = a.g;
      b.removeEventListener
        ? b.removeEventListener(c, d, a.capture)
        : b.detachEvent
        ? b.detachEvent(ed(c), d)
        : b.addListener && b.removeListener && b.removeListener(d);
      Yc--;
      (c = cd(b))
        ? (Uc(c, a), 0 == c.i && ((c.src = null), (b[Wc] = null)))
        : Rc(a);
      return !0;
    },
    ed = function (a) {
      return a in Xc ? Xc[a] : (Xc[a] = "on" + a);
    },
    jd = function (a, b, c, d) {
      var e = !0;
      if ((a = cd(a)))
        if ((b = a.g[b.toString()]))
          for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f &&
              f.capture == c &&
              !f.Ya &&
              ((f = id(f, d)), (e = e && !1 !== f));
          }
      return e;
    },
    id = function (a, b) {
      var c = a.listener,
        d = a.Ab || a.src;
      a.wb && hd(a);
      return c.call(d, b);
    },
    fd = function (a, b) {
      if (a.Ya) return !0;
      if (!tc) {
        var c;
        if (!(c = b))
          a: {
            c = ["window", "event"];
            for (var d = na, e = 0; e < c.length; e++)
              if (((d = d[c[e]]), null == d)) {
                c = null;
                break a;
              }
            c = d;
          }
        e = c;
        c = new Mc(e, this);
        d = !0;
        if (!(0 > e.keyCode || void 0 != e.returnValue)) {
          a: {
            var f = !1;
            if (0 == e.keyCode)
              try {
                e.keyCode = -1;
                break a;
              } catch (m) {
                f = !0;
              }
            if (f || void 0 == e.returnValue) e.returnValue = !0;
          }
          e = [];
          for (f = c.i; f; f = f.parentNode) e.push(f);
          f = a.type;
          for (var g = e.length - 1; !c.j && 0 <= g; g--) {
            c.i = e[g];
            var k = jd(e[g], f, !0, c);
            d = d && k;
          }
          for (g = 0; !c.j && g < e.length; g++)
            (c.i = e[g]), (k = jd(e[g], f, !1, c)), (d = d && k);
        }
        return d;
      }
      return id(a, new Mc(b, this));
    },
    cd = function (a) {
      a = a[Wc];
      return a instanceof Sc ? a : null;
    },
    kd = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0),
    ad = function (a) {
      if ("function" == ta(a)) return a;
      a[kd] ||
        (a[kd] = function (b) {
          return a.handleEvent(b);
        });
      return a[kd];
    };
  var ld = function () {
    Hc.call(this);
    this.i = new Sc(this);
    this.V = this;
    this.H = null;
  };
  l(ld, Hc);
  ld.prototype[Nc] = !0;
  ld.prototype.addEventListener = function (a, b, c, d) {
    $c(this, a, b, c, d);
  };
  ld.prototype.removeEventListener = function (a, b, c, d) {
    gd(this, a, b, c, d);
  };
  var nd = function (a, b) {
    var c,
      d = a.H;
    if (d) for (c = []; d; d = d.H) c.push(d);
    d = a.V;
    var e = b,
      f = e.type || e;
    if (pa(e)) e = new Kc(e, d);
    else if (e instanceof Kc) e.target = e.target || d;
    else {
      var g = e;
      e = new Kc(f, d);
      Xb(e, g);
    }
    g = !0;
    if (c)
      for (var k = c.length - 1; !e.j && 0 <= k; k--) {
        var m = (e.i = c[k]);
        g = md(m, f, !0, e) && g;
      }
    e.j ||
      ((m = e.i = d),
      (g = md(m, f, !0, e) && g),
      e.j || (g = md(m, f, !1, e) && g));
    if (c)
      for (k = 0; !e.j && k < c.length; k++)
        (m = e.i = c[k]), (g = md(m, f, !1, e) && g);
    return g;
  };
  ld.prototype.g = function () {
    ld.Ca.g.call(this);
    this.Nb();
    this.H = null;
  };
  ld.prototype.Nb = function (a) {
    if (this.i) {
      var b = this.i;
      a = a && a.toString();
      var c = 0,
        d;
      for (d in b.g)
        if (!a || d == a) {
          for (var e = b.g[d], f = 0; f < e.length; f++) ++c, Rc(e[f]);
          delete b.g[d];
          b.i--;
        }
    }
  };
  var md = function (a, b, c, d) {
    b = a.i.g[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.Ya && g.capture == c) {
        var k = g.listener,
          m = g.Ab || g.src;
        g.wb && Uc(a.i, g);
        e = !1 !== k.call(m, d) && e;
      }
    }
    return e && 0 != d.hc;
  };
  var od = function (a, b) {
    this.i = {};
    this.g = [];
    this.j = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error("f");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a)
      if (a instanceof od)
        for (c = a.ab(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
      else for (d in a) this.set(d, a[d]);
  };
  od.prototype.hb = function () {
    pd(this);
    for (var a = [], b = 0; b < this.g.length; b++) a.push(this.i[this.g[b]]);
    return a;
  };
  od.prototype.ab = function () {
    pd(this);
    return this.g.concat();
  };
  var pd = function (a) {
    if (a.j != a.g.length) {
      for (var b = 0, c = 0; b < a.g.length; ) {
        var d = a.g[b];
        qd(a.i, d) && (a.g[c++] = d);
        b++;
      }
      a.g.length = c;
    }
    if (a.j != a.g.length) {
      var e = {};
      for (c = b = 0; b < a.g.length; )
        (d = a.g[b]), qd(e, d) || ((a.g[c++] = d), (e[d] = 1)), b++;
      a.g.length = c;
    }
  };
  od.prototype.get = function (a, b) {
    return qd(this.i, a) ? this.i[a] : b;
  };
  od.prototype.set = function (a, b) {
    qd(this.i, a) || (this.j++, this.g.push(a));
    this.i[a] = b;
  };
  od.prototype.forEach = function (a, b) {
    for (var c = this.ab(), d = 0; d < c.length; d++) {
      var e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  var qd = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };
  var rd =
      /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
    sd = function (a, b) {
      if (a)
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
          var e = c[d].indexOf("="),
            f = null;
          if (0 <= e) {
            var g = c[d].substring(0, e);
            f = c[d].substring(e + 1);
          } else g = c[d];
          b(g, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "");
        }
    };
  var td = function (a, b) {
      this.H = a;
      this.o = b;
      this.j = this.g = null;
      this.R = this.s = !1;
      this.S = [];
      this.i = null;
    },
    zd = function (a) {
      var b = ud;
      if (vd && !b.g) {
        b.g = new (window.AudioContext || window.webkitAudioContext)();
        b.j = b.g.createGain();
        b.j.connect(b.g.destination);
        for (var c in b.H) b.H[c].H = b.g;
        for (var d in b.o) wd(b.o[d], b.g, b.j);
        b.g.onstatechange = function () {
          xd(b);
        };
        xd(b);
        yd(b);
        Zc(
          a,
          ["click", "pointerup", "mouseup", "touchend"],
          function () {
            b.g.resume();
            yd(b);
          },
          !0
        );
      }
    },
    xd = function (a) {
      if ("running" == a.g.state && !a.R) {
        a.R = !0;
        for (var b = 0; b < a.S.length; b++) a.S[b]();
      }
    },
    Ad = function (a) {
      a.i = a.g.createBufferSource();
      a.i.buffer = a.g.createBuffer(1, 1, 22050);
      a.i.connect(a.g.destination);
      a.i.start(0);
    },
    yd = function (a) {
      a.g &&
        (null == a.i
          ? Ad(a)
          : void 0 === a.i.playbackState
          ? Ad(a)
          : a.i.playbackState !== a.i.PLAYING_STATE &&
            a.i.playbackState !== a.i.FINISHED_STATE &&
            Ad(a));
    };
  td.prototype.destroy = function () {
    this.g.close();
    this.g = null;
  };
  td.prototype.reset = function () {
    for (var a in this.H) this.H[a].j = [];
    for (var b in this.o) Bd(this.o[b]);
  };
  var Cd = function () {
    var a = ud;
    a.j && a.j.gain.setValueAtTime(0, a.g.currentTime);
    a.s = !0;
  };
  td.prototype.isMuted = function () {
    return this.s && !!this.j && 0 == this.j.gain.value;
  };
  var vd =
      !(!window.AudioContext && !window.webkitAudioContext) &&
      !!window.GainNode,
    G = function (a, b, c) {
      this.s = a;
      this.S = b;
      this.R = c;
      this.i = {};
      this.j = this.H = this.g = this.o = null;
      this.V = 0;
    },
    wd = function (a, b, c) {
      a.g = b;
      a.H = c;
    },
    Dd = function (a) {
      if (a.g) {
        var b = 1e3 * a.g.currentTime,
          c;
        for (c in a.i) {
          var d = a.i[c];
          !d.Nc && d.$b + a.R < b && delete a.i[c];
        }
      }
    };
  G.prototype.play = function (a, b, c, d, e, f) {
    a = void 0 === a ? 0 : a;
    b = void 0 === b ? !1 : b;
    c = void 0 === c ? 0 : c;
    e = void 0 === e ? !1 : e;
    if (!this.g || !this.H) return -1;
    Dd(this);
    f = void 0 === f ? this.g.currentTime + a / 1e3 : f;
    d ||
      ((d = this.g.createBufferSource()),
      d.playbackRate.setValueAtTime(1, this.g.currentTime));
    !this.o && this.g.createGain && (this.o = this.g.createGain());
    this.j && d.connect(this.j);
    this.o
      ? (this.j ? this.j.connect(this.o) : d.connect(this.o),
        this.o.connect(this.H))
      : this.j
      ? this.j.connect(this.H)
      : d.connect(this.H);
    this.j = null;
    d.loop = b;
    try {
      d.buffer = this.s.R;
    } catch (k) {
      return -1;
    }
    a = this.S / 1e3;
    var g = this.R / 1e3 / d.playbackRate.value;
    b
      ? ((d.loopStart = a + (e ? c / 1e3 : 0)),
        (d.loopEnd = a + g),
        d.start(f, a + c / 1e3))
      : d.start(f, a + c / 1e3, g);
    e = this.V++;
    this.i[e] = { node: d, $b: 1e3 * f - c, Nc: b };
    return e;
  };
  var Bd = function (a, b) {
      Dd(a);
      if (void 0 !== b) {
        if (a.i[b]) {
          try {
            a.i[b].node.stop(0);
          } catch (e) {}
          var c = (1e3 * a.g.currentTime - a.i[b].$b) % a.R;
          delete a.i[b];
          return [c];
        }
        return [];
      }
      c = [];
      for (var d in a.i) c = c.concat(Bd(a, d));
      return c;
    },
    Ed = document.createElement("audio"),
    Fd =
      "function" == ta(Ed.canPlayType) && "" != Ed.canPlayType("audio/mpeg")
        ? ".mp3"
        : ".ogg",
    Gd = function (a, b) {
      Jb.call(this, a + b + Fd);
      this.H = this.R = null;
      this.o = 0;
    };
  ha(Gd, Jb);
  Gd.prototype.g = function () {
    var a = this;
    new Promise(function (c) {
      Lb(a, c);
    });
    if (0 != this.o) Promise.resolve();
    else if (this.H) {
      var b = new XMLHttpRequest();
      b.open("GET", this.s, !0);
      b.responseType = "arraybuffer";
      b.onload = function () {
        a.H.decodeAudioData(b.response, function (c) {
          c && ((a.R = c), (a.o = 3), Kb(a));
        });
        a.o = 2;
      };
      b.send();
      this.o = 1;
    } else Promise.reject();
  };
  var H = function () {
    td.call(this, H.i, H.g);
  };
  ha(H, td);
  H.o = Gd;
  H.j = G;
  H.H = vd;
  H.i = {
    Fa: new Gd("./sounds/", "main"),
    xc: new Gd("./sounds/", "initial"),
    Kc: new Gd("./sounds/", "victory"),
    Ua: new Gd("./sounds/", "end"),
  };
  var I = H.i;
  H.g = {};
  H.g.kc = new G(I.Fa, 0, 3160.816, 0);
  H.g.lc = new G(I.Fa, 4160.816, 3233.333, 0);
  H.g.mc = new G(I.Fa, 8394.15, 3533.333, 0);
  H.g.nc = new G(I.Fa, 12927.483, 4966.667, 0);
  H.g.Ob = new G(I.Ua, 0, 1933.333, 0);
  H.g.qc = new G(I.Ua, 2933.333, 4466.667, 0);
  H.g.Pb = new G(I.Ua, 8400, 5233.333, 0);
  H.g.sc = new G(I.Ua, 14633.333, 2309.342, 0);
  H.g.Qb = new G(I.Ua, 17942.676, 2966.667, 0);
  H.g.tc = new G(I.Fa, 18894.15, 1984.014, 0);
  H.g.uc = new G(I.Fa, 21878.163, 4957.46, 0);
  H.g.vc = new G(I.Ua, 21909.342, 3e4, 0);
  H.g.Rb = new G(I.Fa, 27835.624, 2472.925, 0);
  H.g.Sb = new G(I.Fa, 31308.549, 25263.175, 0);
  H.g.Tb = new G(I.Fa, 57571.723, 1741.497, 0);
  H.g.wc = new G(I.Fa, 60313.22, 1335.147, 0);
  H.g.Ib = new G(I.Kc, 0, 18413.424, 0);
  H.g.Oc = new G(I.Fa, 62648.367, 1851.791, 0);
  H.g.vb = new G(I.xc, 0, 16921.542, 0);
  H.g.Vb = new G(I.Fa, 65500.159, 1573.152, 0);
  H.g.Bc = new G(I.Fa, 68073.311, 1168.254, 0);
  H.g.Kb = new G(I.Fa, 70241.565, 983.56, 0);
  H.g.Wb = new G(I.Fa, 72225.125, 1160, 0);
  H.g.Dc = new G(I.Fa, 74385.125, 1248.005, 0);
  H.g.Ec = new G(I.Fa, 76633.129, 1386.667, 0);
  H.g.Fc = new G(I.Fa, 79019.796, 1482.653, 0);
  H.g.Gc = new G(I.Fa, 81502.449, 1271.293, 0);
  H.g.Hc = new G(I.Fa, 83773.741, 1567.347, 0);
  H.g.Ic = new G(I.Fa, 86341.088, 1625.397, 0);
  H.g.Jc = new G(I.Fa, 88966.485, 2066.576, 0);
  sa(H);
  var K = H;
  var Jd = function (a) {
      var b = new Image();
      b.onerror =
        b.onload =
        b.onabort =
          function () {
            delete Hd[Id];
          };
      Hd[Id] = b;
      b.src = "/";
      Id++;
    },
    Hd = [],
    Id = 0;
  var Kd = function (a) {
    this.j = this.R = this.o = "";
    this.S = null;
    this.H = this.i = "";
    this.s = !1;
    var b;
    a instanceof Kd
      ? ((this.s = oa(void 0) ? void 0 : a.s),
        Ld(this, a.o),
        (this.R = a.R),
        (this.j = a.j),
        Md(this, a.S),
        (this.i = a.i),
        Nd(this, Od(a.g)),
        (this.H = a.H))
      : a && (b = String(a).match(rd))
      ? ((this.s = !1),
        Ld(this, b[1] || "", !0),
        (this.R = Pd(b[2] || "")),
        (this.j = Pd(b[3] || "", !0)),
        Md(this, b[4]),
        (this.i = Pd(b[5] || "", !0)),
        Nd(this, b[6] || "", !0),
        (this.H = Pd(b[7] || "")))
      : ((this.s = !1), (this.g = new Qd(null, this.s)));
  };
  Kd.prototype.toString = function () {
    var a = [],
      b = this.o;
    b && a.push(Rd(b, Sd, !0), ":");
    var c = this.j;
    if (c || "file" == b)
      a.push("//"),
        (b = this.R) && a.push(Rd(b, Sd, !0), "@"),
        a.push(
          encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
        ),
        (c = this.S),
        null != c && a.push(":", String(c));
    if ((c = this.i))
      this.j && "/" != c.charAt(0) && a.push("/"),
        a.push(Rd(c, "/" == c.charAt(0) ? Td : Ud, !0));
    (c = this.g.toString()) && a.push("?", c);
    (c = this.H) && a.push("#", Rd(c, Vd));
    return a.join("");
  };
  Kd.prototype.resolve = function (a) {
    var b = new Kd(this),
      c = !!a.o;
    c ? Ld(b, a.o) : (c = !!a.R);
    c ? (b.R = a.R) : (c = !!a.j);
    c ? (b.j = a.j) : (c = null != a.S);
    var d = a.i;
    if (c) Md(b, a.S);
    else if ((c = !!a.i)) {
      if ("/" != d.charAt(0))
        if (this.j && !this.i) d = "/" + d;
        else {
          var e = b.i.lastIndexOf("/");
          -1 != e && (d = b.i.substr(0, e + 1) + d);
        }
      e = d;
      if (".." == e || "." == e) d = "";
      else if (Pb(e, "./") || Pb(e, "/.")) {
        d = 0 == e.lastIndexOf("/", 0);
        e = e.split("/");
        for (var f = [], g = 0; g < e.length; ) {
          var k = e[g++];
          "." == k
            ? d && g == e.length && f.push("")
            : ".." == k
            ? ((1 < f.length || (1 == f.length && "" != f[0])) && f.pop(),
              d && g == e.length && f.push(""))
            : (f.push(k), (d = !0));
        }
        d = f.join("/");
      } else d = e;
    }
    c ? (b.i = d) : (c = "" !== a.g.toString());
    c ? Nd(b, Od(a.g)) : (c = !!a.H);
    c && (b.H = a.H);
    return b;
  };
  var Ld = function (a, b, c) {
      a.o = c ? Pd(b, !0) : b;
      a.o && (a.o = a.o.replace(/:$/, ""));
    },
    Md = function (a, b) {
      if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b) throw Error("l`" + b);
        a.S = b;
      } else a.S = null;
    },
    Nd = function (a, b, c) {
      b instanceof Qd
        ? ((a.g = b), Wd(a.g, a.s))
        : (c || (b = Rd(b, Xd)), (a.g = new Qd(b, a.s)));
    },
    Pd = function (a, b) {
      return a
        ? b
          ? decodeURI(a.replace(/%25/g, "%2525"))
          : decodeURIComponent(a)
        : "";
    },
    Rd = function (a, b, c) {
      return pa(a)
        ? ((a = encodeURI(a).replace(b, Yd)),
          c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
          a)
        : null;
    },
    Yd = function (a) {
      a = a.charCodeAt(0);
      return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    },
    Sd = /[#\/\?@]/g,
    Ud = /[#\?:]/g,
    Td = /[#\?]/g,
    Xd = /[#\?@]/g,
    Vd = /#/g,
    Qd = function (a, b) {
      this.i = this.g = null;
      this.j = a || null;
      this.o = !!b;
    },
    Zd = function (a) {
      a.g ||
        ((a.g = new od()),
        (a.i = 0),
        a.j &&
          sd(a.j, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
          }));
    };
  Qd.prototype.add = function (a, b) {
    Zd(this);
    this.j = null;
    a = $d(this, a);
    var c = this.g.get(a);
    c || this.g.set(a, (c = []));
    c.push(b);
    this.i += 1;
    return this;
  };
  var ae = function (a, b) {
      Zd(a);
      b = $d(a, b);
      if (qd(a.g.i, b)) {
        a.j = null;
        a.i -= a.g.get(b).length;
        var c = a.g,
          d = b;
        qd(c.i, d) && (delete c.i[d], c.j--, c.g.length > 2 * c.j && pd(c));
      }
    },
    be = function (a, b) {
      Zd(a);
      b = $d(a, b);
      return qd(a.g.i, b);
    };
  h = Qd.prototype;
  h.forEach = function (a, b) {
    Zd(this);
    this.g.forEach(function (c, d) {
      La(
        c,
        function (e) {
          a.call(b, e, d, this);
        },
        this
      );
    }, this);
  };
  h.ab = function () {
    Zd(this);
    for (var a = this.g.hb(), b = this.g.ab(), c = [], d = 0; d < b.length; d++)
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  h.hb = function (a) {
    Zd(this);
    var b = [];
    if (pa(a)) be(this, a) && (b = Qa(b, this.g.get($d(this, a))));
    else {
      a = this.g.hb();
      for (var c = 0; c < a.length; c++) b = Qa(b, a[c]);
    }
    return b;
  };
  h.set = function (a, b) {
    Zd(this);
    this.j = null;
    a = $d(this, a);
    be(this, a) && (this.i -= this.g.get(a).length);
    this.g.set(a, [b]);
    this.i += 1;
    return this;
  };
  h.get = function (a, b) {
    if (!a) return b;
    var c = this.hb(a);
    return 0 < c.length ? String(c[0]) : b;
  };
  h.toString = function () {
    if (this.j) return this.j;
    if (!this.g) return "";
    for (var a = [], b = this.g.ab(), c = 0; c < b.length; c++) {
      var d = b[c],
        e = encodeURIComponent(String(d));
      d = this.hb(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }
    return (this.j = a.join("&"));
  };
  var Od = function (a) {
      var b = new Qd();
      b.j = a.j;
      a.g && ((b.g = new od(a.g)), (b.i = a.i));
      return b;
    },
    $d = function (a, b) {
      var c = String(b);
      a.o && (c = c.toLowerCase());
      return c;
    },
    Wd = function (a, b) {
      b &&
        !a.o &&
        (Zd(a),
        (a.j = null),
        a.g.forEach(function (c, d) {
          var e = d.toLowerCase();
          d != e &&
            (ae(this, d),
            ae(this, e),
            0 < c.length &&
              ((this.j = null),
              this.g.set($d(this, e), Ra(c)),
              (this.i += c.length)));
        }, a));
      a.o = b;
    };
  var ce = navigator.userAgent,
    de = new Kd(location.href),
    ee = Pb(ce, "iPad") || Pb(ce, "iPhone") || Pb(ce, "iPod"),
    fe = Pb(ce.toLowerCase(), "gsa"),
    ge = fe && ee,
    he = fe && !ee,
    ie = Pb(ce, "Gbot"),
    je =
      ee ||
      Pb(ce, "Android") ||
      Pb(ce, "Mobile") ||
      Pb(ce, "Silk") ||
      Pb(ce, "UCBrowser") ||
      Pb(ce, "UCWEB"),
    ke = !!document.querySelector("body.hp"),
    le = Pb(ce, "MSIE"),
    me = Pb(de.i, "/logos/") && Pb(de.i, ".html"),
    ne = function () {
      return !!document.getElementById("fkbx");
    },
    oe = function () {
      return "1" == de.g.get("ntp");
    },
    pe = function () {
      return (
        "1" == de.g.get("fpdoodle") && !!document.getElementById("fpdoodle")
      );
    },
    qe = function () {
      return !!document.querySelector("body#iframedoodle");
    };
  var re = function (a, b) {
      for (var c = 1; c < arguments.length; c += 2) {
        var d = arguments[c],
          e = arguments[c + 1],
          f = a.style;
        f && d in f
          ? (f[d] = e)
          : d in a
          ? (a[d] = e)
          : le &&
            f &&
            "opacity" == d &&
            ((a.zoom = 1),
            (d = (f.filter || "").replace(/alpha\([^)]*\)/, "")),
            isNaN(parseFloat(e)) || (d += "alpha(opacity=" + 100 * e + ")"),
            (f.filter = d));
      }
    },
    se = function () {
      return self.performance && self.performance.now
        ? self.performance.now()
        : Ba();
    },
    te = function () {
      var a = ["Itim"];
      window.WebFontConfig ||
        (Da("WebFontConfig.google.families", a),
        (a = document.createElement("script")),
        (a.src =
          ("https:" == document.location.protocol ? "https" : "http") +
          "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"),
        (a.type = "text/javascript"),
        (a.async = "true"),
        (document.getElementById("xjsc") || document.body).appendChild(a));
    },
    ue = ["Moz", "ms", "O", "webkit"],
    ve = function (a, b, c) {
      for (var d = 0, e; (e = ue[d++]); ) a.style[e + b] = c;
      a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c;
    },
    we = ["", "moz", "ms", "o", "webkit"],
    xe = function (a, b) {
      if (!a) return null;
      for (var c = 0; c < we.length; c++) {
        var d = we[c],
          e = b;
        0 < d.length && (e = b.charAt(0).toUpperCase() + b.substr(1));
        d += e;
        if ("undefined" != typeof a[d]) return d;
      }
      return null;
    },
    ye = function (a) {
      var b = google.doodle ? google.doodle.url : "";
      b &&
        ((a = (a = a && !ge) || oe())
          ? dc(b)
          : ((a = window.top.location),
            (b = b instanceof Zb ? b : cc(b)),
            a.assign($b(b))));
    },
    ze = function (a, b) {
      var c = window.google ? window.google.doodle : null;
      return c && void 0 != c[a] ? c[a] : b;
    },
    Ae = function () {
      var a = ze("doodle_args", {}).is_dogfood;
      return null != a ? a : !1;
    },
    Be = ze("alt", ""),
    Ce = ze("hl", "en"),
    L = function (a) {
      var b,
        c = ze("msgs", {});
      oa(b) || (b = a);
      if (!(c = c[a])) {
        var d = ze("alltranslations", {});
        if (d)
          if (((c = d.messages), (d = d.translations), c && d)) {
            for (var e = -1, f = 0; f < c.length; f++)
              if (c[f] == a) {
                e = f;
                break;
              }
            c = -1 == e ? "" : (d[Ce] || d.en).ALL[e];
          } else c = "";
        else c = "";
      }
      return c || b;
    },
    Ee = function (a, b, c) {
      var d =
        Math.max(0, c - 230) + (document.querySelector("div.og-pdp") ? 36 : 12);
      re(a, "width", b + "px", "height", c + "px");
      De(d);
    },
    De = function (a) {
      var b = a + "px",
        c = document.getElementById("lga");
      c && re(c, "marginBottom", b);
      if (!ne() && !oe()) {
        c = document.getElementById("searchform");
        var d = document.getElementById("gb");
        c &&
          (re(c, "transform", "translateY(" + b + ")"),
          re(d, "transform", "translateY(-" + (a + 311) + "px)"),
          re(d, "z-index", "1"));
        a = document.createEvent("UIEvents");
        a.initUIEvent("resize", !1, !1, window, 0);
        window.dispatchEvent(a);
      }
    },
    Fe = null,
    Ge = null,
    He = null,
    Ie = function () {
      He ||
        (window.google && window.google.kEI && window.google.kEI.length
          ? (He = window.google.kEI)
          : qe() && be(de.g, "ei") && (He = de.g.get("ei")));
      return He;
    },
    Je = function (a, b, c) {
      (ne() || oe()) && (a += "&ntp=1");
      b
        ? (Fe ||
            ((b = document.getElementById("hplogoved"))
              ? (Fe = b.getAttribute("data-ved"))
              : qe() && be(de.g, "ved") && (Fe = de.g.get("ved"))),
          (b = Fe) && (a += "&ved=" + b))
        : c &&
          (Ge ||
            ((b = document.getElementById("hplogoshareved"))
              ? (Ge = b.getAttribute("data-ved"))
              : qe() && be(de.g, "sved") && (Ge = de.g.get("sved"))),
          (b = Ge) && (a += "&ved=" + b));
      -1 == a.search("&ei=") && (a = Ie() ? a + ("&ei=" + Ie()) : a + "&ei=");
      window.google && window.google.log
        ? window.google.log("doodle", a)
        : Jd(a);
    };
  var Ke = function (a, b) {
      this.g = [];
      this.i = [];
      for (var c = 0, d; (d = b[c]); c++) {
        var e = new Mb(a + d.filename);
        d = d.size;
        this.g.push(e);
        this.i.push(d);
      }
    },
    Ne = function (a) {
      var b = Le(Me, 0);
      new Promise(function (c) {
        Lb(b, c);
        b.g();
      }).then(function () {
        return a && a();
      });
    },
    Le = function (a, b) {
      return a.g[qa(b) ? b : b[0]];
    },
    Oe = function (a, b) {
      return b[3];
    };
  Ke.prototype.ra = function (a, b, c, d, e, f, g) {
    var k = a[3],
      m = a[4];
    e = void 0 != e ? e : 1;
    b.save();
    b.translate(c, d);
    b.scale(g ? -e : e, e);
    var w = -k * (f ? 0.5 : g ? 1 : 0),
      u = a[1],
      C = a[2],
      Q = a[3],
      J = a[4];
    void 0 == k
      ? ((c = u), (d = C), (g = Q), (e = J), (f = w = 0), (k = Q), (m = J))
      : void 0 == w
      ? ((c = u), (d = C), (g = Q), (e = J), (f = w = 0))
      : ((c = u + 0), (d = C + 0), (g = k), (e = m), (f = -m * (f ? 0.5 : 0)));
    if (c < u) {
      var B = u - c;
      c = u;
      g -= B;
      w += B;
      k -= B;
    }
    d < C && ((B = C - d), (d = C), (e -= B), (f += B), (m -= B));
    c + g > u + Q && ((B = c + g - (u + Q)), (g -= B), (k -= B));
    d + e > C + J && ((B = d + e - (C + J)), (e -= B), (m -= B));
    a = Le(this, a);
    if (!a.i) throw Error("n");
    0 < g && 0 < e && b.drawImage(a.image, c, d, g, e, w, f, k, m);
    b.restore();
  };
  var Qe = function () {
    Ke.call(this, "./images/", Pe);
  };
  ha(Qe, Ke);
  var Pe = [
      { filename: "cta-png-sprite.png", size: [217, 80] },
      { filename: "main-png-sprite.png", size: [1381, 1467] },
      { filename: "level1-png-sprite.png", size: [3617, 820] },
      { filename: "level1-png1-sprite.png", size: [717, 295] },
      { filename: "level1-jpg-sprite.png", size: [1283, 360] },
      { filename: "gameover-png-sprite.png", size: [441, 119] },
      { filename: "level2-png-sprite.png", size: [5929, 378] },
      { filename: "level2-jpg-sprite.png", size: [640, 360] },
      { filename: "level3-png-sprite.png", size: [2458, 779] },
      { filename: "level3-jpg-sprite.png", size: [640, 360] },
      { filename: "level4-png-sprite.png", size: [5586, 393] },
      { filename: "level4-jpg-sprite.png", size: [640, 360] },
      { filename: "level5-png-sprite.png", size: [1251, 1710] },
      { filename: "level5-png1-sprite.png", size: [4187, 723] },
      { filename: "level5-png2-sprite.png", size: [2566, 1165] },
      { filename: "level5-png3-sprite.png", size: [4035, 360] },
      { filename: "level5-jpg-sprite.jpg", size: [2703, 1069] },
      { filename: "end-png-sprite.png", size: [2360, 1244] },
      { filename: "end-png1-sprite.png", size: [2428, 183] },
      { filename: "end-jpg-sprite.png", size: [640, 360] },
      { filename: "main-jpg-sprite.jpg", size: [1283, 280] },
    ],
    Re = [1, 1315, 1130, 46, 24],
    Se = [1, 421, 1200, 43, 32],
    Te = [16, 0, 0, 1350, 1069],
    Ue = [16, 1353, 0, 1350, 1069],
    Ve = [2, 1894, 0, 189, 124],
    We = [20, 0, 0, 640, 280],
    Xe = [20, 643, 0, 640, 280],
    M = [1, 1313, 0, 68, 27],
    Ye = [1, 504, 1302, 69, 68],
    Ze = [1, 381, 1322, 59, 53],
    $e = [1, 1313, 226, 61, 53],
    af = [1, 1313, 170, 61, 53],
    bf = [1, 1313, 226, 61, 53],
    cf = [2, 1438, 0, 453, 140],
    df = [14, 0, 1089, 159, 41],
    ef = [5, 74, 0, 71, 71],
    ff = [5, 0, 0, 71, 71],
    gf = [5, 222, 0, 71, 71],
    hf = [5, 148, 0, 71, 71],
    jf = [5, 370, 0, 71, 71],
    kf = [5, 296, 0, 71, 71],
    lf = [6, 241, 0, 236, 105],
    mf = [6, 0, 0, 238, 101],
    nf = [2, 2518, 554, 107, 106],
    of = [2, 1019, 556, 107, 106],
    pf = [2, 0, 560, 107, 106],
    qf = [2, 110, 560, 107, 106],
    rf = [2, 2959, 0, 160, 106],
    sf = [2, 3122, 0, 160, 106],
    tf = [2, 3122, 0, 160, 106],
    uf = [2, 3285, 0, 160, 106],
    vf = [2, 3285, 0, 160, 106],
    wf = [2, 3448, 0, 160, 106],
    xf = [2, 3448, 0, 160, 106],
    yf = [2, 522, 68, 160, 106],
    zf = [2, 685, 68, 160, 106],
    Af = [2, 848, 68, 160, 106],
    Bf = [2, 1011, 68, 160, 106],
    Cf = [2, 1174, 68, 160, 106],
    Df = [2, 2086, 90, 160, 106],
    Ef = [2, 2959, 109, 160, 106],
    Ff = [2, 2959, 109, 160, 106],
    Gf = [2, 2959, 109, 160, 106],
    Hf = [2, 2959, 109, 160, 106],
    If = [2, 3122, 109, 160, 106],
    Jf = [2, 3285, 109, 160, 106],
    Kf = [2, 3448, 109, 160, 106],
    Lf = [2, 1894, 127, 160, 106],
    Mf = [2, 1337, 143, 160, 106],
    Nf = [2, 1337, 143, 160, 106],
    Of = [2, 1337, 143, 160, 106],
    Pf = [2, 1337, 143, 160, 106],
    Qf = [2, 1337, 143, 160, 106],
    Rf = [2, 1337, 143, 160, 106],
    Sf = [2, 1337, 143, 160, 106],
    Tf = [2, 1337, 143, 160, 106],
    Uf = [2, 1337, 143, 160, 106],
    Vf = [2, 1337, 143, 160, 106],
    Wf = [3, 590, 0, 87, 75],
    Xf = [3, 590, 0, 87, 75],
    Yf = [3, 590, 0, 87, 75],
    Zf = [3, 590, 78, 87, 75],
    $f = [3, 0, 108, 87, 75],
    ag = [3, 90, 108, 87, 75],
    bg = [3, 180, 108, 87, 75],
    cg = [3, 270, 108, 87, 75],
    dg = [3, 270, 108, 87, 75],
    eg = [3, 270, 108, 87, 75],
    fg = [3, 180, 108, 87, 75],
    gg = [3, 90, 108, 87, 75],
    hg = [3, 0, 108, 87, 75],
    ig = [3, 590, 78, 87, 75],
    jg = [3, 590, 0, 87, 75],
    kg = [3, 590, 0, 87, 75],
    lg = [3, 360, 108, 87, 75],
    mg = [3, 450, 108, 87, 75],
    ng = [3, 540, 156, 87, 75],
    og = [3, 630, 156, 87, 75],
    pg = [3, 0, 186, 87, 75],
    qg = [3, 0, 186, 87, 75],
    rg = [3, 0, 186, 87, 75],
    sg = [3, 630, 156, 87, 75],
    tg = [3, 540, 156, 87, 75],
    ug = [3, 450, 108, 87, 75],
    vg = [3, 90, 186, 87, 75],
    wg = [3, 590, 0, 87, 75],
    xg = [3, 590, 0, 87, 75],
    N = [1, 0, 293, 122, 134],
    yg = [1, 1101, 300, 122, 134],
    zg = [1, 1226, 300, 122, 134],
    Ag = [1, 614, 302, 122, 134],
    Bg = [1, 739, 322, 122, 134],
    Cg = [1, 864, 333, 122, 134],
    Dg = [1, 375, 335, 122, 134],
    Eg = [1, 0, 430, 122, 134],
    Fg = [1, 125, 430, 122, 134],
    Gg = [1, 250, 430, 122, 134],
    Hg = [1, 989, 437, 122, 134],
    Ig = [1, 1114, 437, 122, 134],
    Jg = [1, 1239, 437, 122, 134],
    Kg = [1, 500, 439, 122, 134],
    Lg = [1, 750, 470, 122, 134],
    Mg = [1, 125, 567, 122, 134],
    Ng = [1, 250, 567, 122, 134],
    Og = [1, 875, 574, 122, 134],
    Pg = [1, 1250, 574, 122, 134],
    Qg = [1, 500, 576, 122, 134],
    Rg = [1, 625, 596, 122, 134],
    Sg = [1, 750, 607, 122, 134],
    Tg = [1, 875, 711, 122, 134],
    Ug = [1, 500, 713, 122, 134],
    Vg = [1, 625, 733, 122, 134],
    Wg = [1, 375, 746, 122, 134],
    Xg = [1, 875, 848, 122, 134],
    Yg = [1, 1e3, 848, 122, 134],
    Zg = [1, 375, 883, 122, 134],
    $g = [1, 1e3, 985, 118, 85],
    ah = [1, 1121, 985, 118, 85],
    bh = [1, 1242, 985, 118, 85],
    ch = [1, 500, 987, 118, 85],
    dh = [1, 621, 1007, 118, 85],
    eh = [1, 742, 1018, 118, 85],
    fh = [3, 0, 0, 115, 105],
    gh = [3, 118, 0, 115, 105],
    hh = [3, 236, 0, 115, 105],
    ih = [3, 354, 0, 115, 105],
    jh = [3, 472, 0, 115, 105],
    kh = [2, 0, 0, 519, 283],
    lh = [2, 2864, 161, 56, 45],
    mh = [0, 166, 54, 26, 26],
    nh = [1, 85, 1115, 82, 78],
    oh = [1, 170, 1115, 82, 78],
    ph = [1, 255, 1115, 82, 78],
    qh = [1, 795, 1122, 82, 78],
    rh = [1, 880, 1122, 82, 78],
    sh = [0, 166, 0, 51, 51],
    th = [1, 989, 333, 102, 87],
    uh = [1, 500, 335, 102, 87],
    vh = [1, 875, 470, 102, 87],
    wh = [1, 375, 1020, 102, 87],
    xh = [1, 375, 1020, 102, 87],
    yh = [4, 0, 0, 640, 360],
    zh = [19, 0, 0, 640, 360],
    Ah = [2, 522, 0, 455, 65],
    Bh = [2, 980, 0, 455, 65],
    Ch = [2, 3233, 709, 78, 63],
    Dh = [2, 2802, 296, 50, 50],
    Eh = [2, 1286, 177, 42, 31],
    Fh = [2, 2432, 718, 42, 31],
    Gh = [8, 2327, 0, 59, 77],
    Hh = [8, 2148, 564, 154, 205],
    Ih = [8, 2305, 564, 153, 179],
    Jh = [2, 2271, 0, 169, 158],
    Kh = [2, 2086, 0, 182, 87],
    Lh = [2, 1134, 177, 149, 95],
    Mh = [2, 2206, 199, 20, 40],
    Nh = [1, 955, 169, 143, 161],
    Oh = [15, 3834, 230, 52, 61],
    Ph = [12, 418, 624, 390, 360],
    Qh = [12, 811, 624, 390, 360],
    Rh = [12, 0, 936, 390, 360],
    Sh = [12, 393, 987, 390, 360],
    Th = [1, 653, 0, 179, 158],
    Uh = [17, 360, 943, 108, 72],
    O = [1, 421, 1242, 80, 77],
    Vh = [1, 900, 1244, 80, 77],
    Wh = [1, 983, 1244, 80, 77],
    Xh = [2, 1813, 522, 50, 50],
    Yh = [1, 480, 1165, 81, 74],
    Zh = [1, 564, 1185, 81, 74],
    $h = [1, 375, 293, 87, 37],
    ai = [5, 48, 74, 45, 45],
    bi = [5, 0, 74, 45, 45],
    ci = [5, 144, 74, 45, 45],
    di = [5, 96, 74, 45, 45],
    ei = [5, 240, 74, 45, 45],
    fi = [5, 192, 74, 45, 45],
    gi = [5, 288, 74, 45, 45],
    hi = [5, 384, 74, 45, 45],
    ii = [5, 336, 74, 45, 45],
    ji = [1, 1248, 1410, 39, 45],
    ki = [2, 2518, 431, 127, 120],
    li = [2, 2518, 431, 127, 120],
    mi = [2, 0, 437, 127, 120],
    ni = [2, 130, 437, 127, 120],
    oi = [2, 260, 437, 127, 120],
    pi = [2, 390, 443, 127, 120],
    qi = [2, 520, 443, 127, 120],
    ri = [2, 2894, 504, 113, 79],
    si = [2, 3010, 504, 113, 79],
    ti = [2, 3126, 504, 113, 79],
    ui = [2, 3242, 504, 113, 79],
    vi = [2, 3358, 504, 113, 79],
    wi = [2, 3474, 504, 113, 79],
    xi = [2, 447, 312, 144, 128],
    yi = [2, 447, 312, 144, 128],
    zi = [2, 594, 312, 144, 128],
    Ai = [2, 741, 312, 144, 128],
    Bi = [2, 888, 312, 144, 128],
    Ci = [2, 1957, 350, 144, 128],
    Di = [2, 2802, 369, 144, 128],
    Ei = [2, 2711, 161, 150, 132],
    Fi = [2, 2711, 161, 150, 132],
    Gi = [2, 522, 177, 150, 132],
    Hi = [2, 675, 177, 150, 132],
    Ii = [2, 828, 177, 150, 132],
    Ji = [2, 981, 177, 150, 132],
    Ki = [2, 981, 177, 150, 132],
    Li = [2, 2949, 369, 139, 132],
    Mi = [2, 2949, 369, 139, 132],
    Ni = [2, 3091, 369, 139, 132],
    Oi = [2, 3233, 369, 139, 132],
    Pi = [2, 3375, 369, 139, 132],
    Qi = [2, 1733, 387, 139, 132],
    Ri = [2, 1283, 403, 139, 132],
    Si = [2, 1500, 143, 151, 116],
    Ti = [2, 1500, 143, 151, 116],
    Ui = [2, 1654, 143, 151, 116],
    Vi = [2, 2249, 161, 151, 116],
    Wi = [2, 2403, 161, 151, 116],
    Xi = [2, 2557, 161, 151, 116],
    Yi = [2, 2557, 161, 151, 116],
    Zi = [2, 650, 443, 120, 130],
    $i = [2, 650, 443, 120, 130],
    aj = [2, 773, 443, 120, 130],
    bj = [2, 896, 443, 120, 130],
    cj = [2, 2648, 447, 120, 130],
    dj = [2, 1875, 481, 120, 130],
    ej = [2, 2771, 500, 120, 130],
    fj = [1, 262, 0, 203, 290],
    gj = [1, 0, 0, 259, 290];
  sa(Qe);
  var hj = new p(320, 180);
  Qe.$();
  var ij = Te[3] / 2;
  Qe.$();
  var jj = new p(ij, -Te[4] / 2 + 360 - 40);
  var kj = Qe.$(),
    P = function (a, b) {
      z.call(this);
      this.ya = this.ha = this.time = 0;
      this.U = !1;
      qa(a[0])
        ? (this.s = { Aa: a, duration: 0, x: 0, y: 0, z: null, children: null })
        : ((this.ma = a), (this.s = this.ma[this.ya]));
      this.Cc = b ? b : ra;
    };
  l(P, z);
  var lj = function (a) {
      for (var b = 0, c = 0; c < a.length; c++)
        b += 0 < a[c].duration ? a[c].duration : 83;
      return b;
    },
    S = function (a, b, c, d, e) {
      return Ma(a, function (f) {
        return {
          Aa: f,
          duration: b,
          x: c,
          y: d,
          z: void 0 === e ? null : e,
          children: null,
        };
      });
    },
    T = function (a, b, c, d, e) {
      a = S(a, b, c, d, e);
      0 < a.length && (a[a.length - 1].duration = 0);
      return a;
    },
    mj = function (a, b) {
      var c = Ma(a, function (d) {
        var e = {
          Aa: d[0],
          duration: b,
          x: d[1],
          y: d[2],
          z: null,
          children: null,
        };
        4 == d.length && d[3] && (e.children = mj(d[3], b));
        return e;
      });
      0 < c.length && (c[c.length - 1].duration = 0);
      return c;
    };
  P.prototype.Qa = function () {
    var a = this.ma[this.ya].duration;
    0 < a &&
      this.ha > a &&
      ((this.ya = ++this.ya % this.ma.length), (this.ha -= a));
    this.s = this.ma[this.ya];
  };
  P.prototype.update = function (a) {
    P.Ca.update.call(this, a);
    this.Cc(a);
    this.ha += a;
    this.ma && this.Qa();
  };
  P.prototype.ra = function (a) {
    P.Ca.ra.call(this, a);
    if (this.s.Aa) {
      var b = this.s.x || 0,
        c = this.s.y || 0;
      kj.ra(this.s.Aa, a, b, c, 1, !0, this.U);
      if (this.s.children)
        for (var d = 0, e; (e = this.s.children[d]); d++)
          kj.ra(e.Aa, a, b + (e.x || 0), c + (e.y || 0), 1, !0, this.U);
    }
  };
  var nj = function (a) {
      return a.s.Aa[3];
    },
    oj = function (a, b) {
      a.ma = null;
      a.s = { Aa: b, duration: 0, x: 0, y: 0, z: null, children: null };
    };
  var pj = function (a, b, c, d, e, f) {
    y.call(this, c, null, this.Xa);
    this.T = a;
    this.S = f || ra;
    this.W = b;
    e && (this.o = new vb(a, c, d, e));
  };
  l(pj, y);
  pj.prototype.update = function (a) {
    this.o && this.o.update(a);
    pj.Ca.update.call(this, a);
  };
  pj.prototype.Xa = function () {
    this.T.ka(this.W);
    this.S();
  };
  var qj = function (a, b) {
    this.state = 0;
    this.Ub = a;
    this.Na = b || {};
    P.call(this, this.Ub[this.state]);
  };
  l(qj, P);
  qj.prototype.Qa = function () {
    var a = this.Ub[this.state];
    a && ((this.ma = a), qj.Ca.Qa.call(this));
  };
  var U = function (a, b, c, d, e, f) {
    A(a, new pj(a, b, c, d, e, f));
  };
  qj.prototype.ka = function (a) {
    this.Na.hasOwnProperty(this.state) && Bd(this.Na[this.state]);
    this.state = a;
    this.ya = this.ha = 0;
    this.Qa();
    this.Na.hasOwnProperty(a) && this.Na[a].play();
  };
  var vj = function () {
    var a = F([0, rj, 1, sj, 2, tj, 3, uj]);
    qj.call(this, a);
  };
  l(vj, qj);
  var rj = mj(
      [
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [M, 115, 206],
        [[1, 1300, 1251, 75, 37], 112, 197],
        [[1, 0, 1208, 81, 43], 112, 191],
        [[1, 0, 1254, 75, 37], 112, 192],
        [[1, 1305, 1210, 75, 38], 112, 189],
        [[1, 1066, 1244, 75, 38], 112, 187],
        [[1, 1144, 1244, 75, 38], 112, 180],
        [[1, 1222, 1244, 75, 38], 112, 174],
        [[1, 504, 1262, 75, 37], 112, 165],
        [[1, 1305, 1163, 75, 44], 112, 148],
        [[1, 232, 1273, 74, 47], 113, 135],
        [[1, 155, 1273, 74, 59], 114, 116],
        [[1, 78, 1273, 74, 64], 114, 101],
        [[1, 658, 1273, 69, 68], 116, 81],
        [[1, 309, 1277, 69, 68], 116, 69],
        [[1, 730, 1280, 69, 68], 116, 55],
        [[1, 802, 1280, 69, 68], 116, 41],
        [[1, 1066, 1285, 69, 68], 116, 26],
        [[1, 1138, 1285, 69, 68], 116, 21],
        [[1, 1210, 1285, 69, 68], 116, 18],
        [[1, 1313, 30, 67, 69], 118, 15],
        [[1, 1282, 1291, 69, 68], 116, 16],
        [[1, 0, 1294, 69, 68], 116, 19],
        [Ye, 116, 20],
        [Ye, 116, 20],
        [Ye, 116, 20],
        [Ye, 116, 20],
        [Ye, 116, 20],
        [Ye, 116, 20],
      ],
      83
    ),
    sj = mj(
      [
        [[1, 582, 1273, 73, 64], 112, 21],
        [[1, 72, 1340, 52, 45], 132, 26],
        [[1, 232, 1323, 58, 50], 131, 19],
        [[1, 738, 1351, 51, 47], 133, 17],
        [[1, 1044, 1356, 51, 46], 133, 18],
        [[1, 792, 1351, 51, 47], 133, 18],
        [[1, 1098, 1356, 51, 46], 133, 19],
        [[1, 1205, 1356, 50, 46], 120, 5],
        [[1, 1258, 1362, 50, 45], 77, 0],
        [[1, 788, 1401, 47, 44], 29, 16],
        [[1, 656, 1404, 46, 42], 19, 22],
        [[1, 1002, 1405, 46, 42], 19, 20],
        [[1, 1051, 1405, 46, 42], 19, 17],
        [[1, 1100, 1405, 46, 42], 19, 19],
      ],
      83
    ),
    tj = mj(
      [
        [Ze, 60, 84],
        [Ze, 60, 84],
        [Ze, 60, 84],
        [Ze, 60, 84],
        [[1, 1315, 1073, 59, 54], 66, 92],
        [[1, 1313, 170, 61, 53], 67, 96],
        [$e, 68, 98],
        [$e, 68, 98],
        [[1, 1315, 1073, 59, 54], 66, 92],
        [af, 67, 96],
        [af, 67, 96],
        [bf, 68, 98],
        [bf, 68, 98],
        [[1, 443, 1322, 54, 50], 53, 82],
        [[1, 1101, 223, 54, 51], 17, 53],
        [[1, 576, 1340, 51, 51], 0, 27],
        [[1, 874, 1324, 54, 50], 3, 26],
        [[1, 931, 1324, 54, 50], 35, 26],
        [[1, 988, 1324, 53, 50], 72, 25],
        [[1, 1101, 169, 55, 51], 137, 21],
        [[1, 155, 1335, 53, 50], 198, 20],
        [[1, 630, 1344, 51, 50], 254, 18],
        [[1, 293, 1348, 51, 50], 329, 18],
        [[1, 684, 1351, 51, 50], 366, 18],
        [[1, 1152, 1356, 50, 50], 407, 18],
        [[1, 614, 166, 11, 29], 446, 23],
      ],
      83
    ),
    uj = T(
      [
        [1, 0, 1365, 49, 66],
        [1, 500, 1373, 49, 66],
        [1, 500, 1373, 49, 66],
        [1, 500, 1373, 49, 66],
        [1, 500, 1373, 49, 66],
        [1, 500, 1373, 49, 66],
        [1, 443, 1375, 49, 66],
        [1, 211, 1376, 49, 66],
        [1, 846, 1377, 49, 66],
        [1, 898, 1377, 49, 66],
        [1, 898, 1377, 49, 66],
        [1, 898, 1377, 49, 66],
        [1, 898, 1377, 49, 66],
        [1, 898, 1377, 49, 66],
        [1, 950, 1377, 49, 66],
        [1, 347, 1378, 49, 66],
        [1, 52, 1388, 49, 66],
        [1, 104, 1388, 49, 66],
        [1, 156, 1388, 49, 66],
        [1, 552, 1394, 49, 66],
        [1, 604, 1397, 49, 66],
        [1, 604, 1397, 49, 66],
        [1, 604, 1397, 49, 66],
        [1, 263, 1401, 49, 66],
      ],
      83,
      0,
      0
    ),
    wj = 83 * rj.length,
    xj = 83 * uj.length;
  var yj = function () {
    this.g = [];
  };
  sa(yj);
  var V = function (a, b, c) {
    for (var d = a.g.slice(0), e = 0; e < d.length; e++)
      -1 != a.g.indexOf(d[e]) && d[e].La(b, c);
  };
  yj.prototype.addListener = function (a) {
    this.g.push(a);
  };
  yj.prototype.removeListener = function (a) {
    for (var b = this.g.indexOf(a); -1 != b; )
      this.g.splice(b, 1), (b = this.g.indexOf(a));
  };
  yj.prototype.Nb = function () {
    this.g = [];
  };
  var W = function (a, b, c, d, e) {
    y.call(this, b, null, e);
    this.wa = a;
    this.o = c;
    this.S = d;
  };
  l(W, y);
  W.prototype.update = function (a) {
    a = W.Ca.update.call(this, a);
    var b = qb(Ta(this.j / this.s, 0, 1), this.o, this.S, rb);
    this.wa.va = b;
    return a;
  };
  var zj = function (a, b, c, d) {
    y.call(this, ib);
    this.o = a;
    this.W = c;
    this.T = b;
    this.S = d || 0;
  };
  l(zj, y);
  zj.prototype.update = function (a) {
    zj.Ca.update.call(this, a);
    a = Math.sin((this.T * this.j * 2 * Math.PI) / 1e3);
    var b = this.o;
    b.Gb = a * this.S;
    $a(b);
    b = this.o;
    b.Hb = a * this.W;
    $a(b);
  };
  var Aj = { Pc: 0, Qc: 1, Rc: 2, Sc: 3, Tc: 4, Uc: 5, Vc: 6, Wc: 7, Xc: 8 },
    Bj = [],
    Cj = 0,
    Dj;
  for (Dj in Aj) Bj[Cj++] = Aj[Dj];
  var Ej = [
      [Hb(0, -100, 0, 100)],
      null,
      [Hb(175, 0, -175, 0)],
      null,
      null,
      null,
      [Hb(25, -62.5, -25, 0), Hb(-25, 0, 31, -4), Hb(31, -4, -19, 58.5)],
      null,
      null,
    ],
    Fj = [
      new p(50, 180),
      null,
      new p(320, 240),
      null,
      null,
      null,
      new p(410, 190),
      null,
      null,
    ],
    Gj = [null, null, null, null, K.g.Ic, null, K.g.Jc, null, null],
    Hj = function (a) {
      for (var b = {}, c = 0, d = Bj.length; c < d; c++) b[Bj[c]] = a[c];
      return b;
    },
    Ij = Hj(
      "#0000ff #22ff43 #ff0000 #ffff00 #ff69b4 #4682b4 #ffd700 #800080 #ff9900".split(
        " "
      )
    ),
    Jj = {},
    Kj;
  for (Kj in Ij) {
    var Lj = Kj,
      Mj = Ij[Kj],
      Nj = Mj;
    if (!Bb.test(Nj)) throw Error("e`" + Nj);
    4 == Nj.length && (Nj = Nj.replace(Ab, "#$1$1$2$2$3$3"));
    Mj = Nj.toLowerCase();
    var Oj = parseInt(Mj.substr(1), 16);
    Jj[Lj] = [Oj >> 16, (Oj >> 8) & 255, Oj & 255];
  }
  var Pj = Hj([
      [2, 3611, 0, 6, 20],
      [2, 2923, 161, 21, 19],
      [2, 2057, 171, 21, 6],
      [2, 2057, 149, 22, 19],
      [2, 2057, 127, 24, 19],
      null,
      [2, 2249, 90, 17, 19],
      null,
      null,
    ]),
    Qj = Hj(Ej),
    Rj = Hj(Fj),
    Sj = Hj(Gj);
  var Tj = function (a, b, c) {
      this.g = a;
      this.j = b;
      this.i = c;
    },
    X = function (a, b, c, d) {
      return new Tj(Uj(a, b), 1e3 * c, Vj(d));
    },
    Vj = function (a) {
      for (var b = [], c = 0; c < a.length; c++) b.push(Wj[a[c]]);
      return b;
    },
    Wj = { "|": 0, "^": 1, "-": 2, v: 3, z: 6, 3: 4 },
    Uj = function (a, b) {
      var c = (2 * a * Math.PI) / 360;
      return new p(320 + Math.cos(c) * b, Math.sin(c) * b + 203);
    };
  var Xj = yj.$(),
    sk = function () {
      var a = F([
        0,
        Yj,
        1,
        Zj,
        2,
        ak,
        3,
        bk,
        4,
        ck,
        5,
        dk,
        6,
        ek,
        7,
        fk,
        8,
        gk,
        9,
        hk,
        10,
        ik,
        11,
        jk,
        12,
        kk,
        13,
        lk,
        14,
        mk,
        15,
        nk,
        16,
        ok,
        17,
        pk,
        18,
        qk,
        19,
        rk,
      ]);
      qj.call(this, a);
    };
  l(sk, qj);
  var Zj = mj([[Nh, 33, 5, [[$h, -2, -27]]]], 83),
    Yj = mj(
      [
        [[1, 1313, 102, 64, 65], 62, 47],
        [[1, 0, 1115, 82, 90], 47, 31],
        [[1, 653, 161, 149, 138], 29, 27],
        [[1, 999, 0, 159, 166], 28, 0],
      ],
      83
    ),
    ak = mj(
      [
        [Nh, 33, 3, [[$h, -2, -25]]],
        [Nh, 33, 1, [[$h, -2, -23]]],
      ],
      83
    ),
    bk = mj(
      [
        [Nh, 33, 5, [[$h, -3, -23]]],
        [[1, 835, 0, 161, 162], 27, 4],
        [[1, 468, 0, 182, 163], 2, 3],
      ],
      83
    ),
    ck = mj(
      [
        [Th, 0, 1],
        [Th, 0, 1],
        [Th, 0, 1],
      ],
      83
    ),
    dk = mj(
      [
        [Th, 0, 1],
        [Th, 0, 1],
        [Th, 0, 1],
        [Th, 0, 1],
        [Th, 0, 3],
        [Th, 0, -1],
        [Th, 0, -3],
        [Th, 0, -1],
        [Th, 0, 1],
        [Th, 0, 3],
        [Th, 0, -1],
        [Th, 0, -3],
        [Th, 0, -1],
        [Th, 0, 1],
        [Th, 0, 3],
      ],
      83
    ),
    ek = mj(
      [
        [[1, 805, 165, 147, 154], 36, 0],
        [[1, 1161, 0, 149, 149], 47, 0],
        [[1, 1161, 152, 149, 145], 80, 0],
      ],
      83
    ),
    fk = T([[1, 468, 166, 143, 166]], 83, 33, 0),
    gk = T([Oh, [15, 3889, 230, 52, 61], [15, 3944, 230, 52, 61]], 83, 0, 0),
    ik = T([Oh], 83, 0, 0),
    jk = T([[14, 2514, 0, 52, 61]], 83, 0, 0),
    hk = S(
      [
        [14, 2095, 726, 195, 218],
        [14, 2293, 726, 195, 218],
        [14, 2095, 947, 195, 218],
        [14, 2293, 947, 195, 218],
      ],
      83,
      0,
      0
    ),
    kk = T(
      [
        Ph,
        Qh,
        Rh,
        Sh,
        Ph,
        Qh,
        Rh,
        Sh,
        [12, 786, 987, 390, 360],
        [12, 0, 1299, 390, 360],
        [12, 393, 1350, 390, 360],
        [12, 786, 1350, 390, 360],
      ],
      83,
      0,
      0
    ),
    lk = S(
      [
        [12, 0, 0, 415, 309],
        [12, 418, 0, 415, 309],
        [12, 836, 0, 415, 309],
        [12, 0, 312, 415, 309],
        [12, 418, 312, 415, 309],
        [12, 836, 312, 415, 309],
        [12, 0, 624, 415, 309],
      ],
      83,
      0,
      25
    ),
    mk = T(
      [
        [17, 0, 0, 373, 360],
        [17, 376, 0, 373, 360],
        [17, 752, 0, 373, 360],
        [17, 1128, 0, 373, 360],
      ],
      83,
      0,
      0
    ),
    nk = S(
      [
        [17, 1504, 0, 373, 360],
        [17, 1880, 0, 373, 360],
        [17, 0, 363, 373, 360],
        [17, 376, 363, 373, 360],
      ],
      83,
      0,
      0
    ),
    ok = T([[17, 620, 726, 59, 67]], 83, 0, 0),
    pk = T(
      [
        [15, 0, 0, 423, 360],
        [15, 426, 0, 423, 360],
        [15, 852, 0, 423, 360],
        [15, 1278, 0, 423, 360],
        [15, 1704, 0, 423, 360],
        [15, 2130, 0, 423, 360],
        [15, 2556, 0, 423, 360],
        [15, 2982, 0, 423, 360],
        [15, 3408, 0, 423, 360],
      ],
      83,
      0,
      25
    ),
    qk = T(
      [
        [13, 0, 0, 416, 360],
        [13, 419, 0, 416, 360],
        [13, 838, 0, 416, 360],
        [13, 1257, 0, 416, 360],
        [13, 1676, 0, 416, 360],
        [13, 2095, 0, 416, 360],
        [13, 2514, 0, 416, 360],
        [13, 2933, 0, 416, 360],
        [13, 3352, 0, 416, 360],
        [13, 3771, 0, 416, 360],
        [13, 0, 363, 416, 360],
        [13, 419, 363, 416, 360],
        [13, 838, 363, 416, 360],
        [13, 1257, 363, 416, 360],
        [13, 1676, 363, 416, 360],
        [13, 2095, 363, 416, 360],
        [13, 2514, 363, 416, 360],
        [13, 2933, 363, 416, 360],
        [13, 3352, 363, 416, 360],
        [13, 3771, 363, 416, 360],
        [14, 0, 0, 416, 360],
      ],
      83,
      0,
      25
    ),
    rk = T(
      [
        [14, 419, 0, 416, 360],
        [14, 838, 0, 416, 360],
        [14, 1257, 0, 416, 360],
        [14, 1676, 0, 416, 360],
        [14, 2095, 0, 416, 360],
        [14, 0, 363, 416, 360],
        [14, 419, 363, 416, 360],
        [14, 838, 363, 416, 360],
        [14, 1257, 363, 416, 360],
        [14, 1676, 363, 416, 360],
        [14, 2095, 363, 416, 360],
        [14, 0, 726, 416, 360],
        [14, 419, 726, 416, 360],
        [14, 838, 726, 416, 360],
        [14, 1257, 726, 416, 360],
        [14, 1676, 726, 416, 360],
      ],
      83,
      0,
      25
    ),
    tk = T(
      [
        [1, 399, 1378, 40, 40],
        [1, 1205, 1405, 40, 40],
        [1, 1149, 1409, 40, 40],
      ],
      83,
      0,
      0
    ),
    uk = 83 * Yj.length,
    vk = 83 * bk.length,
    wk = 83 * ck.length,
    xk = 83 * dk.length,
    yk = 83 * kk.length,
    zk = 83 * mk.length,
    Ak = new p(475, 181),
    Bk = new p(Ak.x - 90, Ak.y),
    Ck = 83 * pk.length,
    Dk = 83 * qk.length,
    Ek = 83 * rk.length;
  sk.prototype.update = function (a) {
    this.j &&
      5 == this.j.state &&
      ((this.j = null),
      E(this),
      (this.S = []),
      Bd(K.g.Ob),
      this.ka(17),
      zb(this, 300, null, Ak),
      xb(this, new pj(this, 13, Ck)));
    sk.Ca.update.call(this, a);
  };
  var Fk = function (a) {
    U(a, 18, 4e3);
    yb(
      a,
      new y(1e3, null, function () {
        K.g.Ob.play();
      })
    );
    U(a, 19, Dk, Ak, Bk, function () {
      K.g.Tb.play();
      V(Xj, 6);
      zb(a, 300, null, Ak);
      Fk(a);
    });
    U(a, 13, Ek);
  };
  var Gk = Qe.$(),
    Hk = 206 + Gh[4] / 2,
    Ik = S(
      [
        [8, 2389, 0, 53, 74],
        [8, 2389, 77, 53, 74],
        [8, 2327, 80, 53, 74],
        [8, 2383, 154, 53, 74],
        [8, 2327, 157, 53, 74],
        [8, 2383, 231, 53, 74],
        [8, 2327, 234, 53, 74],
        [8, 2383, 308, 53, 74],
        [8, 2327, 311, 53, 74],
        [8, 2383, 385, 53, 74],
        [8, 2327, 388, 53, 74],
        [8, 2383, 462, 53, 74],
        [8, 2327, 465, 53, 74],
        [8, 0, 705, 53, 74],
        [8, 56, 705, 53, 74],
        [8, 112, 705, 53, 74],
        [8, 168, 705, 53, 74],
        [8, 224, 705, 53, 74],
        [8, 280, 705, 53, 74],
        [8, 336, 705, 53, 74],
        [8, 392, 705, 53, 74],
        [8, 448, 705, 53, 74],
        [8, 504, 705, 53, 74],
        [8, 560, 705, 53, 74],
      ],
      83,
      545,
      155,
      Hk - 1
    ),
    Jk = S(
      [
        [6, 480, 0, 199, 123],
        [6, 682, 0, 199, 123],
        [6, 884, 0, 199, 123],
        [6, 1086, 0, 199, 123],
        [6, 1288, 0, 199, 123],
        [6, 1490, 0, 199, 123],
        [6, 1692, 0, 199, 123],
        [6, 1894, 0, 199, 123],
        [6, 2096, 0, 199, 123],
        [6, 2298, 0, 199, 123],
        [6, 2500, 0, 199, 123],
        [6, 2702, 0, 199, 123],
        [6, 2904, 0, 199, 123],
        [6, 3106, 0, 199, 123],
        [6, 3308, 0, 199, 123],
        [6, 3510, 0, 199, 123],
        [6, 3712, 0, 199, 123],
        [6, 3914, 0, 199, 123],
        [6, 4116, 0, 199, 123],
        [6, 4318, 0, 199, 123],
        [6, 4520, 0, 199, 123],
        [6, 4722, 0, 199, 123],
        [6, 4924, 0, 199, 123],
        [6, 4924, 0, 199, 123],
        [6, 4924, 0, 199, 123],
        [6, 5126, 0, 199, 123],
        [6, 5328, 0, 199, 123],
        [6, 5530, 0, 199, 123],
      ],
      83,
      329,
      81,
      0
    ),
    Kk = S(
      [
        Jh,
        [2, 2443, 0, 169, 158],
        [2, 2615, 0, 169, 158],
        [2, 2787, 0, 169, 158],
      ],
      83,
      Jh[3] / 2,
      360 - Jh[4] / 2,
      273
    ),
    Lk = [Le(Gk, 2), Le(Gk, 3), Le(Gk, 4), Le(Gk, 5)],
    Tk = [
      {
        title: L("Level Start - Level 1"),
        background: [4, 643, 0, 640, 360],
        $a: [
          T([Kh], 83, Kh[3] / 2, 360 - Kh[4] / 2, 360 - Kh[4]),
          T([Lh], 83, 640 - Lh[3] / 2, 360 - Lh[4] / 2, 360 - Kh[4] / 2),
          Kk,
        ],
        mb: [],
        nb: [6, 7],
        tb: function (a) {
          var b = function (d) {
              return new y(1e3 * d);
            },
            c = function (d) {
              return Mk(a, d);
            };
          b = [
            c([X(-20, 295, 8, "-^v|")]),
            b(0.8),
            c([X(0, 295, 8, "-^v|")]),
            b(0.8),
            c([X(150, 295, 8, "-^v|")]),
            Y(a),
            c([X(0, 295, 8, "-^v|"), X(160, 295, 8, "-^v|"), X(190, 140, 8, "-^v|")]),
            Y(a),
            b(1),
            c([X(0, 295, 8, "-^v|")]),
            b(0.4),
            c([X(-20, 295, 8, "-^v|")]),
            b(0.4),
            c([X(180, 295, 8, "-^v|")]),
            b(0.4),
            c([X(160, 295, 8, "-^v|")]),
            Y(a),
            b(1),
            c([X(50, 140, 8, "-^v|")]),
            b(0.5),
            c([X(190, 140, 8, "-^v|")]),
            Y(a),
            b(1),
            c([X(-30, 295, 9, "-^v|"), X(210, 295, 9, "-^v|")]),
            b(0.3),
            c([X(-10, 295, 9, "-^v|"), X(190, 295, 9, "-^v|")]),
            b(0.3),
            c([X(10, 295, 9, "-^v|"), X(170, 295, 9, "-^v|")]),
            b(0.3),
            c([X(30, 295, 9, "-^v|"), X(150, 295, 9, "-^v|")]),
            b(0.3),
            Y(a),
            b(1),
            c([X(-30, 295, 12, "vv-|vv-|^^vv|||z"), X(150, 295, 12, "|")]),
            b(0),
            c([X(-10, 295, 12, "vv-|vv-|^^vv|||z"), X(170, 295, 12, "vv-|vv-|^^vv|||z")]),
            b(0.3),
            c([X(10, 295, 12, "vv-|vv-|^^vv|||z"), X(190, 295, 12, "vv-|vv-|^^vv|||z")]),
            b(0.3),
            c([X(30, 295, 12, "vv-|vv-|^^vv|||z"), X(210, 295, 12, "v")]),
            c([X(-10, 285, 0, "vv-|vv-|^^vv|||z")]),
            Y(a),
            b(2),
            Nk(a),
            Y(a),
            b(1),
          ];
          Ok(a, b);
          return b;
        },
        state: 13,
      },
      {
        title: L("Level Start - Level 2"),
        background: [7, 0, 0, 640, 360],
        $a: [
          T([lf], 83, lf[3] / 2, 360 - lf[4] / 2, 360 - lf[4] / 2),
          T([mf], 83, 640 - mf[3] / 2, 360 - mf[4] / 2, 360 - mf[4] / 2),
          Jk,
        ],
        mb: [],
        nb: [8, 9],
        tb: function (a) {
          var b = function (d) {
              return new y(1e3 * d);
            },
            c = function (d) {
              return Mk(a, d);
            };
          b = [
            b(1),
            c([
              X(-80, 140, 10, "--"),
              X(10, 140, 10, "|-"),
              X(100, 140, 10, "^-"),
              X(190, 140, 10, "v-"),
            ]),
            c([X(0, 295, 10, "z")]),
            Y(a),
            b(1),
            c([
              X(-80, 140, 10, "-^"),
              X(10, 140, 10, "|-"),
              X(100, 140, 10, "^v"),
              X(190, 140, 10, "v|"),
            ]),
            b(2),
            c([
              X(-35, 140, 10, "-^"),
              X(55, 140, 10, "|-"),
              X(145, 140, 10, "^v"),
              X(235, 140, 10, "v|"),
            ]),
            b(1),
            c([X(130, 217.5, 10, "z")]),
            Y(a),
            b(1),
            c([
              X(162, 140, 9, "|"),
              X(90, 140, 9, "-"),
              X(18, 140, 9, "|"),
              X(-54, 140, 9, "-"),
              X(-126, 140, 9, "|"),
            ]),
            b(2),
            c([
              X(-162, 217.5, 9, "^-|"),
              X(-90, 217.5, 9, "v-|"),
              X(-18, 217.5, 9, "^--"),
              X(54, 217.5, 9, "v--"),
              X(126, 217.5, 9, "^-|"),
            ]),
            Y(a),
            c([X(180, 217.5, 0, "3")]),
            b(1),
            c([X(-20, 295, 22, "z")]),
            c([X(-30, 140, 12, "|")]),
            b(0.9),
            c([X(0, 140, 12, "^")]),
            b(0.9),
            c([X(30, 140, 12, "v")]),
            b(0.9),
            c([X(60, 140, 12, "-")]),
            b(0.9),
            c([X(90, 140, 12, "v|")]),
            b(0.9),
            c([X(120, 140, 12, "-^")]),
            b(0.9),
            c([X(150, 140, 12, "|v")]),
            b(0.9),
            c([X(180, 140, 12, "^-")]),
            b(0.9),
            c([X(210, 140, 12, "v|")]),
            b(0.9),
            c([X(240, 140, 12, "-^")]),
            b(0.9),
            c([X(270, 140, 12, "|v")]),
            b(0.9),
            c([X(300, 140, 12, "^-")]),
            Y(a),
            b(2),
            Pk(a),
            Y(a),
            b(1),
          ];
          Ok(a, b);
          return b;
        },
        state: 14,
      },
      {
        title: L("Level Start - Level 3"),
        background: [9, 0, 0, 640, 360],
        $a: [
          T([Hh], 83, Hh[3] / 2, 360 - Hh[4] / 2 - 5, 360 - Hh[4] / 2 - 5),
          T(
            [Ih],
            83,
            640 - Ih[3] / 2,
            360 - Ih[4] / 2 - 21,
            360 - Ih[4] / 2 - 21 - 10
          ),
          Ik,
          T([Gh], 83, 546, 206, Hk),
        ],
        mb: [],
        nb: [10, 11],
        tb: function (a) {
          var b = function (d) {
              return new y(1e3 * d);
            },
            c = function (d) {
              return Mk(a, d);
            };
          b = [
            b(1),
            c([X(120, 140, 8, "v-^"), X(15, 140, 8, "|-^")]),
            Y(a),
            c([X(-20, 295, 15, "-^-v-^-v"), X(20, 295, 15, "|^|v|^|v")]),
            Y(a),
            c([
              X(0, 295, 15, "-v^-"),
              X(190, 295, 15, "|v|-"),
              X(150, 295, 15, "|-|^"),
            ]),
            Y(a),
            b(1),
            c([X(-30, 295, 12, "^^-"), X(150, 295, 12, "vv-")]),
            b(1),
            c([X(170, 295, 20, "z")]),
            b(2),
            c([X(10, 295, 3, "-")]),
            b(3),
            c([X(-30, 295, 12, "|^|-"), X(150, 295, 12, "v|v-")]),
            b(3),
            c([X(170, 295, 3, "-")]),
            Y(a),
            c([
              X(0, 295, 15, "v|^-"),
              X(-30, 217.5, 15, "v-"),
              X(0, 217.5, 15, "|^-"),
              X(30, 217.5, 15, "^-"),
              X(150, 217.5, 15, "v^-"),
              X(180, 217.5, 15, "v|-"),
              X(210, 217.5, 15, "|-"),
              X(90, 140, 15, "|-"),
              X(0, 140, 15, "-"),
              X(180, 140, 15, "^-"),
              X(270, 140, 15, "v-"),
            ]),
            b(2),
            c([X(170, 295, 13, "z")]),
            Y(a),
            c([X(0, 295, 3, "-")]),
            b(0.2),
            c([X(170, 295, 3, "|")]),
            b(0.2),
            c([X(10, 295, 3, "^")]),
            b(0.2),
            c([X(190, 295, 3, "v")]),
            b(0.2),
            c([X(-15, 295, 3, "-")]),
            b(0.2),
            c([X(160, 295, 3, "|")]),
            b(0.2),
            c([X(5, 295, 3, "^")]),
            b(0.2),
            c([X(10, 295, 23, "z")]),
            c([X(180, 295, 3, "v")]),
            b(0.2),
            c([X(0, 295, 3, "-")]),
            b(0.2),
            c([X(0, 295, 3, "-")]),
            b(0.2),
            c([X(170, 295, 3, "|")]),
            b(0.2),
            c([X(10, 295, 3, "^")]),
            b(0.2),
            c([X(190, 295, 3, "v")]),
            b(0.2),
            c([X(-15, 295, 3, "z")]),
            b(0.2),
            c([X(160, 295, 3, "|")]),
            b(0.2),
            c([X(5, 295, 3, "^")]),
            b(0.2),
            c([X(-20, 295, 0, "3")]),
            c([X(180, 295, 3, "v")]),
            b(0.2),
            c([X(0, 295, 3, "-")]),
            b(0.2),
            Y(a),
            b(2),
            Qk(a),
            Y(a),
            b(1),
          ];
          Ok(a, b);
          return b;
        },
        state: 15,
      },
      {
        title: L("Level Start - Level 4"),
        background: [11, 0, 0, 640, 360],
        $a: [],
        ac: new p(320, 220),
        mb: [K.g.Pb],
        nb: [12, 13, 14, 15, 16],
        scale: 0.8,
        tb: function (a) {
          var b = function (d) {
              return new y(1e3 * d);
            },
            c = function (d) {
              return Mk(a, d);
            };
          b = [
            c([X(0, 295, 12, "^^vv^^")]),
            b(1),
            c([X(180, 295, 3, "-")]),
            b(1.5),
            c([X(30, 295, 3, "|")]),
            b(1.5),
            c([X(150, 295, 3, "-")]),
            Y(a),
            c([X(-30, 295, 12, "-v-^-v-^")]),
            b(1),
            c([X(20, 295, 2, "|")]),
            b(2),
            c([X(20, 295, 2, "|")]),
            b(2),
            c([X(20, 295, 2, "|")]),
            b(2),
            c([X(20, 295, 2, "|")]),
            Y(a),
            c([
              X(-20, 295, 12, "vvvv"),
              X(160, 295, 12, "^^^^"),
              X(90, 140, 12, "||||"),
            ]),
            b(1),
            c([X(20, 295, 2, "-")]),
            b(2),
            c([X(20, 295, 2, "-")]),
            b(2),
            c([X(20, 295, 2, "-")]),
            b(2),
            c([X(20, 295, 2, "-")]),
            b(2),
            c([X(20, 295, 2, "-")]),
            Y(a),
            c([X(-20, 295, 12, "--v^--v^--")]),
            b(1),
            c([X(20, 295, 2, "|")]),
            b(2),
            c([X(20, 295, 2, "|")]),
            b(2),
            c([X(20, 295, 12, "--||-^-||")]),
            b(1),
            c([X(170, 295, 2, "v")]),
            b(2),
            c([X(170, 295, 2, "v")]),
            b(2),
            c([X(0, 295, 12, "v-v-v-")]),
            b(1),
            c([X(180, 295, 2, "^")]),
            b(2),
            c([X(180, 295, 2, "^")]),
            b(2),
            c([X(180, 295, 2, "^")]),
            b(2),
            c([X(180, 295, 2, "^")]),
            b(2),
            Y(a),
            c([
              X(-30, 295, 2, "|"),
              X(-10, 295, 3, "-"),
              X(10, 295, 4, "^"),
              X(30, 295, 5, "v"),
              X(150, 295, 6, "v-"),
              X(170, 295, 7, "^|"),
              X(190, 295, 8, "v^"),
              X(210, 295, 9, "^v"),
            ]),
            Y(a),
            c([
              X(162, 217.5, 3, "|"),
              X(90, 217.5, 3, "-"),
              X(18, 217.5, 3, "|"),
              X(-54, 217.5, 3, "-"),
              X(-126, 217.5, 3, "|"),
              X(-162, 217.5, 9, "^-|^"),
              X(-90, 217.5, 9, "v-|v"),
              X(-18, 217.5, 9, "^--^"),
              X(54, 217.5, 9, "v--v"),
              X(126, 217.5, 9, "^-|^"),
            ]),
            Y(a),
            b(2),
            Rk(a),
            Y(a),
            b(1),
          ];
          Ok(a, b);
          return b;
        },
        state: 16,
      },
      {
        title: L("Level Start - Level 5"),
        background: Te,
        backgroundPosition: new p(-Te[3] / 2 + 640, Te[4] / 2),
        scale: 0.44,
        mb: [K.g.Ib],
        nb: [17, 18, 19],
        $a: [],
        ac: new p(160, 230),
        wa: new sk(),
        jc: !0,
        Mc: K.g.vc,
        tb: function (a) {
          var b = function (d) {
              return new y(1e3 * d);
            },
            c = function (d) {
              return Mk(a, d);
            };
          b = [
            c([X(230, 217.5, 9, "^")]),
            b(0.1),
            c([X(-90, 217.5, 9, "-")]),
            b(0.1),
            c([X(150, 295, 9, "v")]),
            b(0.1),
            c([X(190, 295, 9, "|")]),
            b(0.1),
            c([X(100, 217.5, 9, "v")]),
            b(0.1),
            c([X(-100, 217.5, 9, "-")]),
            b(0.1),
            c([X(160, 295, 9, "|")]),
            Y(a),
            Sk(a, "-|-^-^-^z"),
            Y(a),
            c([X(-90, 217.5, 12, "vv"), X(160, 295, 12, "^^")]),
            b(2),
            c([X(-120, 295, 12, "--"), X(180, 295, 12, "||")]),
            b(2),
            c([X(-90, 217.5, 12, "v|"), X(160, 295, 12, "^-")]),
            Y(a),
            Sk(a, "^|-v^|-vz"),
            Y(a),
            c([X(230, 217.5, 5, "^")]),
            b(0.1),
            c([X(-90, 217.5, 4, "-")]),
            b(0.1),
            c([X(150, 295, 5, "v")]),
            b(0.1),
            c([X(190, 295, 4, "|")]),
            b(0.1),
            c([X(100, 217.5, 5, "v")]),
            b(0.1),
            c([X(-100, 217.5, 4, "-")]),
            b(0.1),
            c([X(160, 295, 5, "|")]),
            b(0.1),
            c([X(240, 295, 4, "^")]),
            Y(a),
            Sk(a, "vv-|vv-|^^vv|||z"),
            Y(a),
          ];
          Ok(a, b);
          return b;
        },
        state: 17,
      },
    ],
    Uk = function () {
      return Z.scale || 1;
    },
    Vk = function () {
      return Z.ac || hj;
    },
    Wk = function () {
      return Z.Mc || K.g.Sb;
    },
    Xk = function () {
      return Ma(Z.mb, function (a) {
        return a.s;
      }).concat(
        Ma(Z.nb, function (a) {
          return Le(Gk, a);
        })
      );
    },
    Z = Tk[0];
  var Yk = Qe.$(),
    Zk = function () {
      q.call(this);
      this.s = 0;
      this.W = new p(0, 0);
      this.j = [];
      this.S = [];
      this.o = [];
      this.T = [];
      this.U = [];
    };
  l(Zk, q);
  Zk.prototype.update = function (a) {
    this.s += a;
    a = eb(this);
    this.j = [new p(0, -a.g / a.o), this.W];
    this.j = $k(this, this.j[0], this.j[1], 3);
    this.S = $k(
      this,
      this.j[parseInt(Math.random() * this.j.length * 0.2, 10)],
      null,
      2
    );
    this.o = $k(
      this,
      this.j[parseInt(Math.random() * this.j.length * 0.5, 10)],
      null,
      2
    );
    this.T = $k(this, this.o[this.o.length - 1], null, 2);
    this.U = $k(this, this.o[this.o.length - 1], null, 2);
  };
  Zk.prototype.ra = function (a) {
    var b = 8 + 4 * Math.cos((3 * this.s) / 1e3);
    a.save();
    a.globalCompositeOperation = "overlay";
    a.shadowColor = "#7fa7fe";
    al(a, this.j, b);
    al(a, this.S, 0.5 * b);
    al(a, this.o, 0.3 * b);
    al(a, this.T, 0.2 * b);
    al(a, this.U, 0.1 * b);
    a.restore();
  };
  var $k = function (a, b, c, d) {
      var e = 0.5 < Math.random() ? -1 : 1;
      d = Math.pow(2, d) + 1 - 1;
      var f = [b];
      c ||
        (c = new p(
          b.x + (20 * Math.random() + 10) * e,
          b.y + 10 * Math.random() + 30
        ));
      f[d] = c;
      bl(a, f, 0, d);
      return f;
    },
    bl = function (a, b, c, d) {
      if (c + 1 != d) {
        var e = Math.floor((c + d) / 2),
          f = b[c],
          g = b[d];
        b[e] = new p(
          (f.x + g.x) / 2 + (20 * Math.random() - 10),
          (f.y + g.y) / 2 + (10 * Math.random() - 5)
        );
        bl(a, b, c, e);
        bl(a, b, e, d);
      }
    },
    al = function (a, b, c) {
      for (var d = 0; d < b.length - 1; d += 1) {
        var e = b[d],
          f = b[d + 1];
        a.save();
        a.translate(e.x, e.y);
        a.scale(0.2, 0.2);
        var g = f.x - e.x;
        e = f.y - e.y;
        f = Math.sqrt(g * g + e * e);
        a.rotate(Math.atan2(e, g) + 0.5 * Math.PI);
        a.scale(2 * c, 0.14 * f);
        Yk.ra(Mh, a, -10, -40, 1);
        a.restore();
        c -= 0.5;
        c = Math.max(0, c);
      }
      a.beginPath();
      a.moveTo(b[0].x, b[0].y);
      for (d = 1; d < b.length; d++) a.lineTo(b[d].x, b[d].y);
      a.lineWidth = c;
      a.strokeStyle = "white";
      a.stroke();
      a.closePath();
    };
  var cl = yj.$(),
    sl = function () {
      var a = S(
          [
            Wf,
            Xf,
            Yf,
            Zf,
            $f,
            ag,
            bg,
            cg,
            dg,
            eg,
            fg,
            gg,
            hg,
            ig,
            jg,
            kg,
            lg,
            mg,
            ng,
            og,
            pg,
            qg,
            rg,
            sg,
            tg,
            ug,
            vg,
            wg,
            xg,
          ],
          83,
          0,
          0
        ),
        b = T([nf, of, pf, qf], 83, 0, -31),
        c = S([ri, si, ti, ui, vi, wi], 83, 10, -3),
        d = T([ki, li, mi, ni, oi, pi, qi], 83, 12, -21),
        e = T([xi, yi, zi, Ai, Bi, Ci, Di], 83, 0, -26.5),
        f = T([Si, Ti, Ui, Vi, Wi, Xi, Yi], 83, 0, -19),
        g = T([Zi, $i, aj, bj, cj, dj, ej], 83, 0, -27),
        k = S([$g, ah, bh, ch, dh, eh], 83, 0, -5),
        m = T([fh, gh, hh, ih], 83, 14, -15),
        w = T([jh, hh, ih], 83, 14, -15),
        u = T([Ei, Fi, Gi, Hi, Ii, Ji, Ki], 83, 6, -22),
        C = T([Li, Mi, Ni, Oi, Pi, Qi, Ri], 83, 0, -28),
        Q = T(
          [
            rf,
            sf,
            tf,
            uf,
            vf,
            wf,
            xf,
            yf,
            zf,
            Af,
            Bf,
            Cf,
            Df,
            Ef,
            Ff,
            Gf,
            Hf,
            If,
            Jf,
            Kf,
            Lf,
            Mf,
            Nf,
            Of,
            Pf,
            Qf,
            Rf,
            Sf,
            Tf,
            Uf,
            Vf,
          ],
          83,
          0,
          0
        );
      a = F([
        10,
        c,
        1,
        b,
        0,
        a,
        14,
        c,
        8,
        k,
        2,
        d,
        3,
        e,
        4,
        f,
        5,
        g,
        6,
        u,
        7,
        C,
        11,
        m,
        12,
        w,
        13,
        dl,
        9,
        el,
        16,
        Q,
        17,
        fl,
        18,
        gl,
        19,
        hl,
        20,
        il,
        21,
        jl,
        22,
        kl,
        23,
        ll,
        24,
        ml,
        25,
        nl,
        26,
        ol,
        27,
        pl,
        29,
        ql,
        28,
        rl,
      ]);
      b = F([8, K.g.tc]);
      qj.call(this, a, b);
      v(this, 320, 180);
      this.j = 5;
      this.Ba = this.j - 1;
      this.state = 0;
      this.Da = 83 * Q.length;
      this.Ea = 150;
      this.ta = 0;
      cl.addListener(this);
    };
  l(sl, qj);
  var el = T(
      [
        [2, 2057, 199, 146, 148],
        [2, 2057, 199, 146, 148],
        [2, 2864, 218, 146, 148],
        [2, 3013, 218, 146, 148],
        [2, 3162, 218, 146, 148],
        [2, 3311, 218, 146, 148],
        [2, 3460, 218, 146, 148],
        [2, 1808, 236, 146, 148],
        [2, 1286, 252, 146, 148],
        [2, 1435, 262, 146, 148],
        [2, 1584, 262, 146, 148],
        [2, 1134, 275, 146, 148],
        [2, 2206, 280, 146, 148],
        [2, 2355, 280, 146, 148],
        [2, 2504, 280, 146, 148],
        [2, 0, 286, 146, 148],
        [2, 149, 286, 146, 148],
        [2, 298, 286, 146, 148],
        [2, 2653, 296, 146, 148],
        [2, 2653, 296, 146, 148],
        [2, 2653, 296, 146, 148],
      ],
      83,
      0,
      -36
    ),
    dl = T([jh], 83, 14, -15),
    fl = T(
      [
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        [1, 125, 293, 122, 134],
        [1, 250, 293, 122, 134],
        N,
        N,
        N,
        N,
        N,
        N,
        N,
        yg,
        yg,
        zg,
        zg,
        Ag,
        Ag,
        Bg,
        Bg,
        Cg,
        Cg,
        Dg,
        Dg,
        Eg,
        Eg,
        Fg,
        Fg,
        Gg,
        Gg,
        Hg,
        Hg,
        Ig,
        Ig,
        Jg,
        Jg,
        Kg,
        Kg,
        Kg,
        Kg,
        Kg,
      ],
      83,
      0,
      -9
    ),
    gl = T(
      [
        [1, 625, 459, 122, 134],
        Lg,
        Lg,
        Lg,
        Lg,
        Lg,
        Lg,
        Lg,
        Lg,
        [1, 375, 472, 122, 134],
        [1, 0, 567, 122, 134],
        Mg,
        Mg,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Ng,
        Og,
        Og,
        Og,
        Og,
        Og,
        Og,
        [1, 1e3, 574, 122, 134],
        [1, 1125, 574, 122, 134],
      ],
      83,
      0,
      -9
    ),
    hl = T(
      [
        Pg,
        Pg,
        Pg,
        Pg,
        Qg,
        Rg,
        Sg,
        Sg,
        Qg,
        Rg,
        Rg,
        Sg,
        Sg,
        [1, 125, 704, 122, 134],
        [1, 250, 704, 122, 134],
      ],
      83,
      0,
      -9
    ),
    il = T(
      [
        Tg,
        Tg,
        Tg,
        Tg,
        Tg,
        [1, 1e3, 711, 122, 134],
        [1, 1125, 711, 122, 134],
        [1, 1250, 711, 122, 134],
        Ug,
        Ug,
        Ug,
        Vg,
        Vg,
        Vg,
        Vg,
        [1, 750, 744, 122, 134],
        Wg,
        Wg,
        Wg,
        Wg,
        Wg,
        Wg,
        Wg,
        Wg,
        Wg,
        Wg,
        [1, 0, 841, 122, 134],
        [1, 125, 841, 122, 134],
        [1, 250, 841, 122, 134],
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        Xg,
        [1, 0, 841, 122, 134],
        Yg,
        Yg,
        Yg,
        Yg,
        [1, 1125, 848, 122, 134],
      ],
      83,
      0,
      -9
    ),
    jl = T(
      [
        [1, 1250, 848, 122, 134],
        [1, 500, 850, 122, 134],
        [1, 625, 870, 122, 134],
        [1, 750, 881, 122, 134],
        Zg,
        Zg,
        Zg,
        Zg,
        Zg,
        Zg,
        Zg,
        Zg,
        Zg,
        [1, 0, 978, 122, 134],
        [1, 125, 978, 122, 134],
        [1, 250, 978, 122, 134],
        [1, 875, 985, 122, 134],
      ],
      83,
      0,
      -9
    ),
    kl = T(
      [
        [15, 3834, 0, 99, 112],
        [15, 3936, 0, 99, 112],
        [15, 3834, 115, 99, 112],
        [15, 3936, 115, 99, 112],
      ],
      83,
      -2,
      17
    ),
    ll = T([[17, 2170, 797, 117, 86]], 83, 20, -2),
    ml = T(
      [
        [17, 120, 943, 117, 86],
        [17, 240, 943, 117, 86],
      ],
      83,
      20,
      -2
    ),
    nl = T(
      [
        [17, 2170, 886, 117, 86],
        [17, 0, 943, 117, 86],
      ],
      83,
      20,
      -2
    ),
    ol = T(
      [
        [17, 752, 363, 307, 214],
        [17, 1062, 363, 307, 214],
        [17, 1372, 363, 307, 214],
        [17, 1682, 363, 307, 214],
        [17, 1992, 363, 307, 214],
        [17, 752, 580, 307, 214],
        [17, 1062, 580, 307, 214],
        [17, 1372, 580, 307, 214],
        [17, 1682, 580, 307, 214],
        [17, 1992, 580, 307, 214],
        [17, 1992, 580, 307, 214],
        [17, 0, 726, 307, 214],
        [17, 310, 726, 307, 214],
        [17, 620, 797, 307, 214],
        [17, 930, 797, 307, 214],
        [17, 1240, 797, 307, 214],
        [17, 1550, 797, 307, 214],
        [17, 1860, 797, 307, 214],
      ],
      83,
      60,
      -35
    ),
    pl = S(
      [
        [17, 561, 1160, 74, 81],
        [17, 561, 1160, 74, 81],
        [17, 638, 1160, 74, 81],
        [17, 638, 1160, 74, 81],
        [17, 715, 1160, 74, 81],
        [17, 715, 1160, 74, 81],
      ],
      83,
      -14,
      0
    ),
    rl = T(
      [
        [18, 0, 0, 184, 183],
        [18, 187, 0, 184, 183],
        [18, 374, 0, 184, 183],
        [18, 561, 0, 184, 183],
        [18, 561, 0, 184, 183],
        [18, 561, 0, 184, 183],
        [18, 748, 0, 184, 183],
        [18, 935, 0, 184, 183],
        [18, 1122, 0, 184, 183],
        [18, 1309, 0, 184, 183],
        [18, 1496, 0, 184, 183],
        [18, 1683, 0, 184, 183],
        [18, 1870, 0, 184, 183],
        [18, 2057, 0, 184, 183],
        [18, 2244, 0, 184, 183],
      ],
      83,
      -62,
      38
    ),
    ql = S(
      [
        [17, 471, 943, 105, 143],
        [17, 2170, 975, 105, 143],
        [17, 579, 1014, 105, 143],
        [17, 687, 1014, 105, 143],
        [17, 795, 1014, 105, 143],
        [17, 903, 1014, 105, 143],
        [17, 1011, 1014, 105, 143],
        [17, 1119, 1014, 105, 143],
        [17, 1227, 1014, 105, 143],
      ],
      83,
      -124,
      65
    ),
    tl = 83 * el.length,
    ul = 83 * dl.length,
    vl = 83 * hl.length,
    wl = 83 * il.length,
    xl = 83 * fl.length,
    yl = 83 * jl.length,
    zl = 83 * ol.length,
    Al = 83 * rl.length,
    Bl = F([0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 0, 6, 7, 7, 0, 8, 0]);
  sl.prototype.Bb = function () {
    0 >= this.ta &&
      1 != this.state &&
      ((this.j = Math.max(0, this.j - 1)),
      U(this, 1, 0),
      this.Oa()
        ? (V(cl, 0),
          U(this, 16, 350),
          U(this, 0, this.Da),
          D(this, 0, function () {
            V(cl, 16);
          }))
        : ((this.ta = this.Ea), U(this, 0, 350)));
    this.j <= this.Ba && (this.Ba--, V(cl, 20));
  };
  var Cl = function (a) {
    0 != a.state && a.ka(0);
  };
  sl.prototype.Oa = function () {
    return 0 >= this.j;
  };
  var Dl = function (a, b) {
    if (16 == a.state) return !1;
    E(a);
    a.ka(Bl[b]);
    U(a, 0, 500);
    return !0;
  };
  sl.prototype.reset = function () {
    this.j = 5;
    this.Ba = this.j - 1;
  };
  sl.prototype.update = function (a) {
    this.ta -= a;
    qj.prototype.update.call(this, a);
  };
  sl.prototype.La = function (a, b) {
    if (6 == a) this.Bb();
    else if (5 == a) this.o = this.o + b;
    else if (7 == a || 9 == a) El(this);
    else if (8 == a) Fl(this);
    else if (18 == a) {
      var c = this.j + 1;
      this.j = c;
      V(cl, 10, c);
    }
  };
  var Gl = function (a, b, c) {
      U(a, 8, 0);
      U(a, 0, 1e3 / a.H.j, null, b, c);
    },
    El = function (a) {
      0 == a.state && a.ka(14);
    },
    Fl = function (a) {
      14 == a.state && a.ka(0);
    },
    Hl = function (a) {
      a.T
        ? t(a.T)
        : ((a.T = new P(T([df], 0, -12, 37))), xb(a.T, new zj(a, 0.7, 3)));
      a.T.i = -1;
      a.T.U = !1;
      r(a, a.T);
    },
    Il = function (a) {
      a.T && t(a.T);
    };
  var Jl = Qe.$(),
    Kl = function (a) {
      q.call(this);
      this.j = a;
    };
  l(Kl, q);
  Kl.prototype.ra = function (a) {
    for (var b = this.j.length, c = -5, d = 0; d < b; d++) {
      var e = Pj[this.j[d]];
      c += e[3] + 5;
    }
    c = -c / 2;
    for (d = 0; d < b; d++)
      (e = Pj[this.j[d]]),
        Jl.ra(e, a, Math.floor(c), Math.floor(-e[4] / 2)),
        (c += e[3] + 5);
  };
  var Ll = function (a, b) {
    this.x = a;
    this.y = b;
  };
  l(Ll, p);
  var Ml = function (a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
  };
  Ll.prototype.scale = p.prototype.scale;
  Ll.prototype.add = function (a) {
    this.x += a.x;
    this.y += a.y;
    return this;
  };
  var Nl = yj.$(),
    Ol = function (a, b, c, d, e, f, g) {
      qj.call(this, a, g);
      this.Pa = b;
      this.Ma = new Zk();
      this.Ma.g = !1;
      r(this, this.Ma);
      this.j = c;
      this.U = 320 > d;
      this.Va = new Kl(c);
      v(this.Va, this.U ? -7 : 7, f);
      this.Va.i = 1;
      r(this, this.Va);
      this.o = 0;
      this.Ba = lj(a[2]);
      this.T = lj(a[3]);
      this.yc = lj(a[5]);
      v(this, d, e);
      this.i = e + this.s.Aa[4] / 2;
      this.va = 0.8;
      xb(this, new zj(this, 0.8, 5));
      Nl.addListener(this);
    };
  l(Ol, qj);
  var Pl = T([[2, 1957, 236, 83, 105]], 83, 0, 0),
    Ql = T(
      [
        [2, 1701, 522, 109, 91],
        [2, 1173, 538, 109, 91],
        [2, 1285, 538, 109, 91],
        [2, 1397, 543, 109, 91],
        [2, 1509, 543, 109, 91],
        [2, 1509, 543, 109, 91],
        [2, 1509, 543, 109, 91],
        [2, 1509, 543, 109, 91],
      ],
      83,
      0,
      0
    ),
    Rl = T(
      [
        [2, 1998, 604, 97, 112],
        [2, 1813, 614, 97, 112],
        [2, 1621, 616, 97, 112],
        [2, 1129, 632, 97, 112],
        [2, 1229, 632, 97, 112],
        [2, 2728, 633, 97, 112],
        [2, 1329, 637, 97, 112],
        [2, 1429, 637, 97, 112],
      ],
      83,
      0,
      0
    ),
    Sl = T(
      [
        [2, 1957, 236, 83, 105],
        [2, 1035, 312, 83, 105],
        [2, 1173, 426, 83, 105],
        [2, 1721, 616, 83, 105],
        [2, 1529, 637, 83, 105],
        [2, 196, 683, 83, 105],
        [2, 2098, 684, 83, 105],
        [2, 2184, 684, 83, 105],
        [2, 2184, 684, 83, 105],
      ],
      83,
      0,
      0
    );
  Ol.prototype.Ja = function (a) {
    if (0 < a) {
      this.o = a;
      var b = bb(this),
        c = Vk(),
        d = 1 - 0.2 * Uk();
      U(this, 1, a, bb(this), new Ll(n(b.x, c.x, d), n(b.y, c.y, d)));
    }
  };
  var Tl = function (a) {
    a.va = 0;
    xb(a, new W(a, 1e3, 0, 0.8));
  };
  h = Ol.prototype;
  h.Oa = function () {
    return 6 == this.state;
  };
  h.lb = function () {
    var a = this;
    U(this, 4, this.Ba, null, null, function () {
      a.va = 0.8;
      xb(a, new W(a, 500, 0.8, 0));
    });
    U(a, 6, 500);
  };
  h.Bb = function (a) {
    return this.j[0] != a ? !1 : 6 == a ? (V(Nl, 19), !0) : this.Cb();
  };
  h.Cb = function () {
    var a = this.j.shift();
    a = Ij[a];
    if (this.rb()) Ul(this, a);
    else {
      V(Nl, 11, { Pa: this.Pa, position: bb(this), color: a });
      this.ka(3);
      var b = this;
      xb(
        this,
        new y(this.T, null, function () {
          b.bc();
        })
      );
      this.Eb();
    }
    return !0;
  };
  h.bc = function () {
    this.ka(0);
  };
  h.rb = function () {
    return 0 == this.j.length;
  };
  h.Eb = ra;
  var Ul = function (a, b) {
      E(a);
      a.S = [];
      Nl.removeListener(a);
      a.ka(5);
      U(a, 6, a.yc);
      V(Nl, 5, { Pa: a.Pa, position: bb(a), color: b });
      K.g.wc.play();
    },
    Vl = function (a) {
      a.Ma.g = !0;
      xb(
        a,
        new y(500, null, function () {
          a.Ma.g = !1;
        })
      );
    };
  Ol.prototype.update = function (a) {
    Ol.Ca.update.call(this, a);
    this.Oa()
      ? t(this)
      : 1 == this.state &&
        (E(this),
        (this.S = []),
        this.ka(2),
        V(Nl, 6),
        K.g.Tb.play(),
        this.lb());
  };
  Ol.prototype.La = function (a) {
    19 == a && this.R && this.g && !this.Oa() && (Vl(this), this.Cb());
  };
  var Wl = function (a, b, c, d) {
    var e = F([0, Pl, 2, Sl, 3, Ql, 5, Rl, 6, [Rl[Rl.length - 1]]]);
    return new Ol(e, 10, a, b, c, d || -35);
  };
  var Xl = function (a, b, c, d, e, f) {
    this.ta = ["^-^|^-^|", "v-^-v-^-", "|-|--|"];
    c = F([5, K.g.kc]);
    Ol.call(this, a, b, Vj(this.ta.shift()), d, e, f, c);
    this.Da = d;
    this.Ea = e;
  };
  l(Xl, Ol);
  var Yl = T(
      [
        [2, 1733, 262, 69, 105],
        [2, 3314, 709, 69, 105],
        [2, 3386, 709, 69, 105],
        [2, 3458, 709, 69, 105],
        [2, 3530, 709, 69, 105],
        [2, 849, 711, 69, 105],
        [2, 921, 711, 69, 105],
        [2, 1913, 715, 69, 105],
      ],
      83,
      0,
      0
    ),
    Zl = T(
      [
        [2, 1425, 413, 135, 127],
        [2, 1563, 413, 135, 127],
        [2, 1035, 426, 135, 127],
        [2, 2104, 431, 135, 127],
        [2, 2242, 431, 135, 127],
        [2, 2380, 431, 135, 127],
        [2, 2380, 431, 135, 127],
      ],
      83,
      0,
      0
    ),
    $l = T(
      [
        [2, 3517, 369, 97, 120],
        [2, 3517, 369, 97, 120],
        [2, 1998, 481, 97, 120],
        [2, 220, 560, 97, 120],
        [2, 2098, 561, 97, 120],
        [2, 2198, 561, 97, 120],
        [2, 2298, 561, 97, 120],
        [2, 2398, 561, 97, 120],
        [2, 320, 566, 97, 120],
        [2, 420, 566, 97, 120],
        [2, 520, 566, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 620, 576, 97, 120],
        [2, 720, 576, 97, 120],
        [2, 820, 576, 97, 120],
        [2, 2628, 580, 97, 120],
        [2, 2894, 586, 97, 120],
        [2, 2994, 586, 97, 120],
        [2, 3094, 586, 97, 120],
        [2, 3194, 586, 97, 120],
        [2, 3294, 586, 97, 120],
        [2, 3394, 586, 97, 120],
        [2, 3494, 586, 97, 120],
      ],
      83,
      0,
      0
    ),
    am = T(
      [
        [2, 920, 576, 95, 132],
        [2, 920, 576, 95, 132],
        [2, 2498, 663, 95, 132],
        [2, 1018, 665, 95, 132],
        [2, 0, 669, 95, 132],
        [2, 98, 669, 95, 132],
        [2, 98, 669, 95, 132],
      ],
      83,
      0,
      0
    ),
    bm = S(
      [
        [3, 180, 186, 67, 109],
        [3, 250, 186, 67, 109],
        [3, 320, 186, 67, 109],
        [3, 390, 186, 67, 109],
      ],
      83,
      0,
      0
    );
  Xl.prototype.lb = function () {
    var a = this;
    U(this, 9, this.Ba);
    U(this, 0, this.T, bb(this), new p(this.Da, this.Ea), function () {
      a.Ja(a.o);
    });
  };
  Xl.prototype.rb = function () {
    return 0 == this.j.length && 0 == this.ta.length;
  };
  Xl.prototype.Eb = function () {
    if (0 == this.j.length) {
      E(this);
      var a = this.ta.shift();
      a || Ul(this, 0);
      var b = this;
      U(this, 0, this.T, bb(this), new p(this.Da, this.Ea), function () {
        Sa(b.j, Vj(a));
        b.o *= 0.5;
        b.Ja(b.o);
      });
    }
  };
  var cm = function (a, b, c, d, e, f, g, k) {
    d = F([5, K.g.lc]);
    Ol.call(this, b, c, [], e, f, g, d);
    this.Sa = lj(b[7]);
    this.Jb = a;
    this.Da = 0;
    this.Ra = ["--^--", "||v||", "|-^-|"];
    this.Ta = [
      [X(-30, 295, 8, "---"), X(20, 140, 8, "|||")],
      [X(-30, 295, 8, "-|-"), X(20, 140, 8, "|-|"), X(30, 295, 9, "^")],
      [X(-20, 295, 8, "^v"), X(20, 295, 8, "v-"), X(30, 295, 9, "-|")],
    ];
    this.ta = [];
    this.zc = e;
    this.Ac = f;
    this.Ka = k;
    this.Ea = 1200;
  };
  l(cm, Ol);
  var dm = T(
      [
        [6, 1600, 253, 197, 124],
        [6, 1800, 253, 197, 124],
        [6, 2e3, 253, 197, 124],
        [6, 2200, 253, 197, 124],
        [6, 2400, 253, 197, 124],
        [6, 2600, 253, 197, 124],
        [6, 2800, 253, 197, 124],
        [6, 3e3, 253, 197, 124],
        [6, 3200, 253, 197, 124],
      ],
      83,
      0,
      0
    ),
    em = T(
      [
        [6, 0, 231, 197, 124],
        [6, 200, 235, 197, 124],
        [6, 400, 253, 197, 124],
        [6, 600, 253, 197, 124],
        [6, 800, 253, 197, 124],
        [6, 1e3, 253, 197, 124],
        [6, 1200, 253, 197, 124],
        [6, 1400, 253, 197, 124],
        [6, 1400, 253, 197, 124],
      ],
      83,
      0,
      0
    ),
    fm = T(
      [
        [6, 1400, 126, 197, 124],
        [6, 1600, 126, 197, 124],
        [6, 1800, 126, 197, 124],
        [6, 2e3, 126, 197, 124],
        [6, 2200, 126, 197, 124],
        [6, 2400, 126, 197, 124],
        [6, 2600, 126, 197, 124],
        [6, 2800, 126, 197, 124],
        [6, 3e3, 126, 197, 124],
        [6, 3200, 126, 197, 124],
        [6, 3400, 126, 197, 124],
        [6, 3400, 126, 197, 124],
        [6, 3400, 126, 197, 124],
        [6, 3400, 126, 197, 124],
        [6, 3600, 126, 197, 124],
        [6, 3800, 126, 197, 124],
        [6, 4e3, 126, 197, 124],
        [6, 4200, 126, 197, 124],
        [6, 4200, 126, 197, 124],
        [6, 4200, 126, 197, 124],
        [6, 4200, 126, 197, 124],
        [6, 4200, 126, 197, 124],
        [6, 4400, 126, 197, 124],
        [6, 4600, 126, 197, 124],
        [6, 4800, 126, 197, 124],
        [6, 5e3, 126, 197, 124],
        [6, 5200, 126, 197, 124],
        [6, 5400, 126, 197, 124],
        [6, 5600, 127, 197, 124],
      ],
      83,
      0,
      0
    ),
    gm = T(
      [
        [6, 5732, 0, 197, 124],
        [6, 0, 104, 197, 124],
        [6, 200, 108, 197, 124],
        [6, 400, 126, 197, 124],
        [6, 600, 126, 197, 124],
        [6, 800, 126, 197, 124],
        [6, 1e3, 126, 197, 124],
        [6, 1200, 126, 197, 124],
        [6, 1200, 126, 197, 124],
        [6, 1200, 126, 197, 124],
      ],
      83,
      0,
      0
    ),
    hm = T(
      [
        [6, 3400, 253, 197, 124],
        [6, 3600, 253, 197, 124],
        [6, 3800, 253, 197, 124],
        [6, 4e3, 253, 197, 124],
        [6, 4200, 253, 197, 124],
        [6, 4400, 253, 197, 124],
        [6, 4600, 253, 197, 124],
        [6, 4800, 253, 197, 124],
      ],
      83,
      0,
      0
    ),
    im = S(
      [
        [6, 5e3, 253, 197, 124],
        [6, 5200, 253, 197, 124],
        [6, 5400, 253, 197, 124],
        [6, 5600, 254, 197, 124],
        [6, 5600, 254, 197, 124],
      ],
      83,
      0,
      0
    );
  h = cm.prototype;
  h.Ja = function (a) {
    this.Ka = a;
    cm.Ca.Ja.call(this, a);
  };
  h.lb = function () {
    var a = this;
    U(this, 9, this.Ba);
    U(this, 0, this.T, bb(this), new p(this.zc, this.Ac), function () {
      a.Ja(a.o);
    });
  };
  h.update = function (a) {
    cm.Ca.update.call(this, a);
    for (var b = this.ta.length - 1; 0 <= b; b--)
      this.ta[b].Oa() && this.ta.splice(b, 1);
    0 < this.Ea && (this.Ea -= a);
    0 == this.state && (this.Ka -= a);
    if (8 == this.state && 0 == this.ta.length)
      this.ka(0),
        (this.Da = 0),
        (a = this.Ra.shift()) || Ul(this, 0),
        Sa(this.j, Vj(a)),
        this.Ja(this.Ka);
    else if (0 == this.state && 0 == this.j.length && 0 >= this.Ea) {
      E(this);
      this.ka(7);
      this.Da = 7;
      var c = this;
      U(this, 8, this.Sa, null, null, function () {
        c.Da = 8;
        var d = c.Ta.shift();
        d && ((d = jm(c.Jb, d)), Sa(c.ta, d));
      });
    }
  };
  h.bc = function () {
    this.ka(this.Da);
  };
  h.rb = function () {
    return 0 == this.j.length && 0 == this.Ra.length;
  };
  h.La = function (a, b) {
    cm.Ca.La.call(this, a, b);
    if (6 == a && 2 != this.state) {
      var c = this.state;
      U(this, 9, 0);
      U(this, c, this.T);
    }
  };
  var lm = function (a, b, c, d, e, f) {
    c = F([5, K.g.mc]);
    Ol.call(this, a, b, [], d, e, f, c);
    this.ta = ["-^v", "v|-", "-^v", "-|v", "|^|"];
    this.Da = d;
    this.Ea = e;
    var g = this;
    U(this, 0, 2e3, null, null, function () {
      km(g);
    });
  };
  l(lm, Ol);
  var mm = T(
      [
        [8, 1253, 423, 176, 138],
        [8, 1432, 423, 176, 138],
        [8, 1611, 423, 176, 138],
        [8, 1790, 423, 176, 138],
        [8, 1969, 423, 176, 138],
        [8, 2148, 423, 176, 138],
        [8, 0, 564, 176, 138],
        [8, 179, 564, 176, 138],
        [8, 358, 564, 176, 138],
        [8, 537, 564, 176, 138],
        [8, 716, 564, 176, 138],
        [8, 895, 564, 176, 138],
        [8, 1074, 564, 176, 138],
        [8, 1253, 564, 176, 138],
      ],
      83,
      0,
      0
    ),
    nm = T(
      [
        [8, 0, 423, 176, 138],
        [8, 179, 423, 176, 138],
        [8, 358, 423, 176, 138],
        [8, 537, 423, 176, 138],
        [8, 716, 423, 176, 138],
        [8, 895, 423, 176, 138],
        [8, 1074, 423, 176, 138],
        [8, 1074, 423, 176, 138],
      ],
      83,
      0,
      0
    ),
    om = T(
      [
        [8, 179, 141, 176, 138],
        [8, 358, 141, 176, 138],
        [8, 537, 141, 176, 138],
        [8, 716, 141, 176, 138],
        [8, 895, 141, 176, 138],
        [8, 1074, 141, 176, 138],
        [8, 1253, 141, 176, 138],
        [8, 1432, 141, 176, 138],
        [8, 1611, 141, 176, 138],
        [8, 1790, 141, 176, 138],
        [8, 1969, 141, 176, 138],
        [8, 2148, 141, 176, 138],
        [8, 0, 282, 176, 138],
        [8, 179, 282, 176, 138],
        [8, 358, 282, 176, 138],
        [8, 358, 282, 176, 138],
        [8, 358, 282, 176, 138],
        [8, 358, 282, 176, 138],
        [8, 358, 282, 176, 138],
        [8, 358, 282, 176, 138],
        [8, 358, 282, 176, 138],
        [8, 537, 282, 176, 138],
        [8, 716, 282, 176, 138],
        [8, 895, 282, 176, 138],
        [8, 1074, 282, 176, 138],
        [8, 1253, 282, 176, 138],
        [8, 1432, 282, 176, 138],
        [8, 1611, 282, 176, 138],
        [8, 1790, 282, 176, 138],
        [8, 1969, 282, 176, 138],
        [8, 2148, 282, 176, 138],
      ],
      83,
      0,
      0
    ),
    pm = T(
      [
        [8, 0, 0, 176, 138],
        [8, 179, 0, 176, 138],
        [8, 358, 0, 176, 138],
        [8, 537, 0, 176, 138],
        [8, 716, 0, 176, 138],
        [8, 895, 0, 176, 138],
        [8, 1074, 0, 176, 138],
        [8, 1253, 0, 176, 138],
        [8, 1432, 0, 176, 138],
        [8, 1611, 0, 176, 138],
        [8, 1790, 0, 176, 138],
        [8, 1969, 0, 176, 138],
        [8, 2148, 0, 176, 138],
        [8, 0, 141, 176, 138],
      ],
      83,
      0,
      0
    ),
    qm = S(
      [
        [8, 1432, 564, 176, 138],
        [8, 1611, 564, 176, 138],
        [8, 1790, 564, 176, 138],
        [8, 1969, 564, 176, 138],
      ],
      83,
      0,
      0
    );
  lm.prototype.lb = function () {
    var a = this;
    U(this, 9, this.Ba);
    U(this, 0, this.T, bb(this), new p(this.Da, this.Ea), function () {
      a.Ja(a.o);
    });
  };
  lm.prototype.rb = function () {
    return 0 == this.j.length && 0 == this.ta.length;
  };
  lm.prototype.Eb = function () {
    if (0 == this.j.length) {
      E(this);
      U(this, 0, this.T, bb(this), new p(this.Da, this.Ea));
      var a = this;
      U(this, 0, this.T + 1e3, null, null, function () {
        km(a);
      });
    }
  };
  var km = function (a) {
    var b = a.ta.shift();
    b || Ul(a, 0);
    Sa(a.j, Vj(b));
    a.o *= 0.8;
    a.Ja(a.o);
  };
  var rm = function (a, b, c, d, e, f, g) {
    this.Ea = ["^^vv^^vv", "||-||-v-", "--^-|--v"];
    d = F([5, K.g.nc]);
    Ol.call(this, b, c, Vj(this.Ea.shift()), e, f, g, d);
    this.Jb = a;
    this.Ra = [
      [X(200, 295, 999, "-")],
      [X(160, 295, 999, "|")],
      [X(200, 295, 999, "^")],
      [X(200, 295, 999, "v")],
      [X(160, 295, 999, "--")],
      [X(200, 295, 999, "-|")],
      [X(160, 295, 999, "-v")],
      [X(200, 295, 999, "-^")],
      [X(160, 295, 999, "|-")],
      [X(200, 295, 999, "||")],
      [X(160, 295, 999, "|v")],
      [X(200, 295, 999, "|^")],
      [X(160, 295, 999, "v-")],
      [X(200, 295, 999, "v|")],
      [X(160, 295, 999, "^-")],
      [X(200, 295, 999, "^|")],
      [X(160, 295, 999, "-"), X(200, 295, 999, "-")],
      [X(160, 295, 999, "-"), X(200, 295, 999, "|")],
      [X(160, 295, 999, "-"), X(200, 295, 999, "v")],
      [X(160, 295, 999, "-"), X(200, 295, 999, "^")],
      [X(160, 295, 999, "|"), X(200, 295, 999, "-")],
      [X(160, 295, 999, "|"), X(200, 295, 999, "|")],
      [X(160, 295, 999, "|"), X(200, 295, 999, "v")],
      [X(160, 295, 999, "|"), X(200, 295, 999, "^")],
      [X(160, 295, 999, "v"), X(200, 295, 999, "-")],
      [X(160, 295, 999, "v"), X(200, 295, 999, "|")],
      [X(160, 295, 999, "^"), X(200, 295, 999, "-")],
      [X(160, 295, 999, "^"), X(200, 295, 999, "|")],
    ];
    this.Ka = 2500;
    this.ta = [];
    this.Sa = e;
    this.Ta = f;
    this.Da = 1e3;
  };
  l(rm, Ol);
  var sm = T(
      [
        [10, 2691, 198, 204, 195],
        [10, 2898, 198, 204, 195],
        [10, 3105, 198, 204, 195],
        [10, 3312, 198, 204, 195],
        [10, 3519, 198, 204, 195],
        [10, 3726, 198, 204, 195],
        [10, 3933, 198, 204, 195],
      ],
      83,
      0,
      0
    ),
    tm = T(
      [
        [10, 1449, 198, 204, 195],
        [10, 1656, 198, 204, 195],
        [10, 1863, 198, 204, 195],
        [10, 2070, 198, 204, 195],
        [10, 2277, 198, 204, 195],
        [10, 2484, 198, 204, 195],
        [10, 2484, 198, 204, 195],
      ],
      83,
      0,
      0
    ),
    um = T(
      [
        [10, 1242, 0, 204, 195],
        [10, 1449, 0, 204, 195],
        [10, 1656, 0, 204, 195],
        [10, 1449, 0, 204, 195],
        [10, 1863, 0, 204, 195],
        [10, 2070, 0, 204, 195],
        [10, 2277, 0, 204, 195],
        [10, 2484, 0, 204, 195],
        [10, 2691, 0, 204, 195],
        [10, 2484, 0, 204, 195],
        [10, 2898, 0, 204, 195],
        [10, 3105, 0, 204, 195],
        [10, 3312, 0, 204, 195],
        [10, 3519, 0, 204, 195],
        [10, 3726, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 3933, 0, 204, 195],
        [10, 4140, 0, 204, 195],
        [10, 4347, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4554, 0, 204, 195],
        [10, 4761, 0, 204, 195],
        [10, 4968, 0, 204, 195],
        [10, 5175, 0, 204, 195],
        [10, 5382, 0, 204, 195],
        [10, 0, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 207, 198, 204, 195],
        [10, 414, 198, 204, 195],
        [10, 621, 198, 204, 195],
        [10, 828, 198, 204, 195],
        [10, 1035, 198, 204, 195],
        [10, 1242, 198, 204, 195],
      ],
      83,
      0,
      0
    ),
    vm = T(
      [
        [10, 0, 0, 204, 195],
        [10, 207, 0, 204, 195],
        [10, 414, 0, 204, 195],
        [10, 621, 0, 204, 195],
        [10, 828, 0, 204, 195],
        [10, 1035, 0, 204, 195],
        [10, 1035, 0, 204, 195],
      ],
      83,
      0,
      0
    ),
    wm = S(
      [
        [10, 4140, 198, 204, 195],
        [10, 4347, 198, 204, 195],
        [10, 4554, 198, 204, 195],
        [10, 4761, 198, 204, 195],
        [10, 4968, 198, 204, 195],
        [10, 5175, 198, 204, 195],
        [10, 5175, 198, 204, 195],
        [10, 5175, 198, 204, 195],
        [10, 5175, 198, 204, 195],
      ],
      83,
      0,
      0
    ),
    xm = 83 * wm.length;
  rm.prototype.lb = function () {
    var a = this;
    U(this, 9, this.Ba);
    U(this, 0, xm, bb(this), new p(this.Sa, this.Ta), function () {
      a.Ja(a.o);
    });
  };
  rm.prototype.update = function (a) {
    rm.Ca.update.call(this, a);
    for (var b = this.ta.length - 1; 0 <= b; b--)
      this.ta[b].Oa() && this.ta.splice(b, 1);
    if (0 == this.state && 0 == this.ta.length)
      if (0 < this.Da) this.Da -= a;
      else {
        a = this.Ra[Math.floor(Math.random() * this.Ra.length)];
        for (b = 0; b < a.length; b++) a[b].j = this.Ka;
        a = jm(this.Jb, a);
        Sa(this.ta, a);
        this.Da = 500;
      }
  };
  rm.prototype.rb = function () {
    return 0 == this.j.length && 0 == this.Ea.length;
  };
  rm.prototype.Eb = function () {
    if (0 == this.j.length) {
      E(this);
      var a = this.Ea.shift();
      a || Ul(this, 0);
      var b = this;
      U(this, 0, this.T, bb(this), new p(this.Sa, this.Ta), function () {
        Sa(b.j, Vj(a));
        b.Ka *= 0.8;
        b.Ja(b.o);
      });
    }
  };
  var ym = function () {};
  ym.prototype.Xb = function () {
    return !0;
  };
  var zm = function (a, b, c, d) {
    this.g = a;
    this.i = b;
    this.j = Math.abs(c);
    this.o = void 0 === d ? !1 : d;
    this.o || ((this.g += this.j), (this.i += this.j));
  };
  ha(zm, ym);
  var Am = function (a, b, c) {
    a.g = b;
    a.i = c;
    a.o || ((a.g += a.j), (a.i += a.j));
  };
  zm.prototype.contains = function (a, b) {
    return (
      Math.sqrt((this.g - a) * (this.g - a) + (this.i - b) * (this.i - b)) <=
      this.j
    );
  };
  zm.prototype.ra = function (a) {
    a.beginPath();
    a.arc(this.g, this.i, this.j, 0, 2 * Math.PI, !0);
    a.fill();
    a.stroke();
  };
  var Bm = function (a, b, c, d, e, f, g, k, m) {
    e = F([0, T([e], 0, 0, 0), 1, T([f || e], 0, 0, 0)]);
    qj.call(this, e);
    this.Ba = g;
    this.j = new zm(a, b, c, !0);
    this.o = d;
    this.ta = k;
    this.T = m || ra;
    v(this, a, b);
  };
  l(Bm, qj);
  var Dm = function (a, b, c, d, e, f) {
      var g = Cm;
      f = f || 0;
      g = Oa(g, function (m) {
        a: if (((m = m.Aa), va(m) && va(b) && m.length == b.length)) {
          for (var w = m.length, u = 0; u < w; u++)
            if (m[u] !== b[u]) {
              m = !1;
              break a;
            }
          m = !0;
        } else m = !1;
        return m;
      }) || { x: 0, y: 0 };
      var k = Oe(Qe.$(), b) / 2;
      return new Bm(g.x + k + f, g.y + k, k, a, b, c, d, e);
    },
    Gm = function (a) {
      var b = eb(a);
      Am(a.j, b.i, b.g);
      a.ka(0);
      a.T(!1);
      Em(a.o, a.j, function (c) {
        "mouseup" == c
          ? a.Ba()
          : "mouseover" == c
          ? (a.ka(1), a.T(!0), (document.getElementById("hplogo").title = a.ta))
          : "mouseout" == c &&
            (a.ka(0), a.T(!1), (document.getElementById("hplogo").title = ""));
      });
      Fm(a.o.i, a.j);
    },
    Im = function (a) {
      Hm(a.o.i, a.j);
      document.getElementById("hplogo").title = "";
    };
  var Jm = function () {
    q.call(this);
  };
  l(Jm, q);
  Jm.prototype.ra = function (a) {
    a.clearRect(-320, -180, 640, 360);
    Jm.Ca.ra.call(this, a);
  };
  var Km = Qe.$(),
    Mm = function () {
      q.call(this);
      this.j = [];
      for (var a = 0; 90 > a; a++) this.j.push(new Lm()), r(this, this.j[a]);
    };
  l(Mm, q);
  var Om = function (a) {
      for (var b = 0; 90 > b; b++) Nm(a.j[b], !0);
    },
    Pm = function (a) {
      for (var b = 0; 90 > b; b++) Nm(a.j[b], !1);
    },
    Lm = function () {
      q.call(this);
      this.W = !1;
      this.o = 640 * Math.random();
      this.s = 360 * Math.random();
      this.j = 1 - 2 * Math.random();
      this.S = 1 - 2 * Math.random();
      this.U = this.ha = 0.2;
      this.T = 0;
    };
  l(Lm, q);
  Lm.prototype.update = function (a) {
    this.T += a;
    this.U = this.W
      ? Math.min(this.U, this.ha * Ta(1 - this.T / 1e3, 0, 1))
      : Math.max(this.U, this.ha * Ta(this.T / 1500, 0, 1));
    var b = 2;
    this.W
      ? (this.j += 320 > this.o ? -0.5 : 0.5)
      : ((b -= 0.2),
        (this.j += 0.2 * (1 - 2 * Math.random())),
        (this.S += 0.2 * (1 - 2 * Math.random())));
    this.j = Ta(this.j, -b, b);
    this.S = Ta(this.S, -b, b);
    this.o += (this.j / 17) * a;
    this.s += (this.S / 17) * a;
    this.o = Ta(this.o, 100, 540);
    this.s = Ta(this.s, 110, 250);
    if (100 == this.o || 540 == this.o) this.j = this.W ? 0 : -this.j;
    if (110 == this.s || 250 == this.s) this.S = -this.S;
  };
  Lm.prototype.ra = function (a) {
    a.globalAlpha = this.U;
    Km.ra(sh, a, this.o, this.s, 4, !0);
    a.globalAlpha = 1;
  };
  var Nm = function (a, b) {
    b || (a.j = 4 * Math.random());
    a.T = 0;
    a.W = b;
  };
  var Tm = function () {
    z.call(this);
    this.j = new Qm();
    r(this, this.j);
    for (var a = 0; 50 > a; a++) {
      for (var b = new Rm(8 + a * a * 0.002, 3e3), c = 0; c < 2 * a; c++)
        b.update(17);
      b.i = -1;
      r(this, b);
    }
    a = new Sm(14, 3e3);
    c = new Sm(14, 3e3);
    var d = new Sm(14, 3e3);
    a.i = -1;
    c.i = -1;
    d.i = -1;
    v(c, 0, 113);
    v(d, 100, 56);
    a.j = b.j;
    c.j = b.j + 2 / 3;
    d.j = b.j + 1 / 3;
    r(this, a);
    r(this, c);
    r(this, d);
  };
  l(Tm, z);
  Tm.prototype.ra = function (a) {
    a.fillStyle = "#2c3039";
    a.shadowBlur = 50;
    a.shadowColor = "#fff";
    a.beginPath();
    a.lineTo(0, 113);
    a.lineTo(100, 56);
    a.lineTo(0, 0);
    a.fill();
    a.fill();
    a.shadowBlur = 0;
  };
  var Rm = function (a, b) {
    q.call(this);
    this.o = a;
    this.s = b;
    this.j = 0;
  };
  l(Rm, q);
  Rm.prototype.update = function (a) {
    this.j += a / this.s;
    var b = this.j % 1;
    b > 2 / 3
      ? ((a = 100 - 300 * (b - 2 / 3)), (b = 56 - 168 * (b - 2 / 3)))
      : b > 1 / 3
      ? ((a = 300 * (b - 1 / 3)), (b = 113 - 168 * (b - 1 / 3)))
      : ((a = 0), (b *= 339));
    v(this, a, b);
  };
  Rm.prototype.ra = function (a) {
    var b = a.createRadialGradient(0, 0, 0, 0, 0, this.o);
    b.addColorStop(0, "rgba(255, 255, 255, 1)");
    b.addColorStop(0.6, "rgba(245, 245, 255, .3)");
    b.addColorStop(0.8, "rgba(225, 225, 255, .15)");
    b.addColorStop(1, "rgba(210, 210, 255, 0)");
    a.fillStyle = b;
    a.beginPath();
    a.arc(0, 0, this.o, 0, 2 * Math.PI, !1);
    a.fill();
  };
  var Sm = function (a, b) {
    q.call(this);
    this.s = a;
    this.o = b;
    this.j = 0;
  };
  l(Sm, q);
  Sm.prototype.update = function (a) {
    this.j += a / this.o;
    a = (this.j + 0.1) % 1;
    var b = (0.8 - 0.2) / 2;
    b = b + 0.2 - b * Math.cos((Math.PI * a) / 0.25);
    0.25 < a && 0.75 > a && (b = 0.8);
    this.va = b;
  };
  Sm.prototype.ra = function (a) {
    var b = this.s * (0.7 + 0.5 * this.va),
      c = a.createRadialGradient(0, 0, 0, 0, 0, b);
    c.addColorStop(0, "rgba(255, 255, 255, 1)");
    c.addColorStop(0.6, "rgba(245, 245, 255, .7)");
    c.addColorStop(0.8, "rgba(225, 225, 255, .25)");
    c.addColorStop(1, "rgba(210, 210, 255, 0)");
    a.fillStyle = c;
    a.beginPath();
    a.arc(0, this.va, b, 0, 2 * Math.PI, !1);
    a.fill();
  };
  var Qm = function () {
    q.call(this);
  };
  l(Qm, q);
  Qm.prototype.ra = function (a) {
    a.fillStyle = "#fff";
    a.beginPath();
    a.moveTo(-1, -1);
    a.lineTo(-1, 114);
    a.lineTo(101, 56);
    a.lineTo(-1, -1);
    a.fill();
  };
  var Um = function (a, b, c) {
    z.call(this);
    this.j = a;
    this.s = b;
    this.o = c;
  };
  l(Um, z);
  Um.prototype.ra = function (a) {
    a.fillStyle = this.j;
    a.fillRect(0, 0, this.s, this.o);
  };
  var Vm = function () {
    this.g = new q();
  };
  sa(Vm);
  Vm.prototype.reset = function () {
    this.g = new q();
  };
  var Ym = function (a, b) {
      var c = Wm,
        d = [];
      fb(c.g, function (g) {
        if (g.g) d.push(g);
        else return !0;
      });
      for (var e = 0; e < d.length; e++) d[e].update(a);
      d = [];
      var f = 0;
      fb(c.g, function (g) {
        if (g.g)
          d.push(g),
            (g.Ga.order = ++f),
            (g.Ga.Za = g.i + (g.R ? g.R.Ga.Za : 0));
        else return !0;
      });
      d.sort(function (g, k) {
        return g.Ga.Za != k.Ga.Za ? g.Ga.Za - k.Ga.Za : g.Ga.order - k.Ga.order;
      });
      b.save();
      for (e = 0; e < d.length; e++)
        Xm(b, eb(d[e])), (b.globalAlpha = d[e].va), d[e].ra(b);
      b.restore();
    },
    Xm = function (a, b) {
      a.setTransform(b.j, b.H, b.s, b.o, b.i, b.g);
    };
  var Zm = function () {
    this.j = !1;
  };
  Zm.prototype.update = function () {
    return this.j ? ((this.j = !1), 1) : 0;
  };
  Zm.prototype.Ha = ra;
  Zm.prototype.Ia = ra;
  var an = function () {
    this.R = !0;
    this.U = !1;
    this.H = [];
    this.T = !1;
    this.j = this.V = this.i = 0;
    this.s = $m;
  };
  l(an, Hc);
  sa(an);
  var $m = 1e3 / 60,
    bn = function (a) {
      this.i = 1e3 / 60;
      this.j = a;
      this.g = an.$().i;
      this.o = 0;
    },
    cn = function (a) {
      var b = a.j(a.o);
      a.o++;
      a.g = an.$().i + a.i / an.$().s;
      return b;
    };
  bn.prototype.cancel = function () {
    this.j = function () {
      return !1;
    };
  };
  var en = function (a, b) {
      var c = new bn(b);
      dn(a, c);
    },
    dn = function (a, b) {
      a.H.push(b);
      a.T = !0;
    },
    gn = function (a) {
      if (a.R) a.U = !1;
      else {
        a.U = !0;
        fn(a);
        a.T &&
          (a.H.sort(function (e, f) {
            return e.g == f.g ? f.i - e.i : e.g - f.g;
          }),
          (a.T = !1));
        for (var b = 0, c = 0, d; (d = a.H[c]); c++)
          if (d.g <= a.i) cn(d) && dn(a, d), b++;
          else break;
        a.H.splice(0, b);
        a.i++;
        requestAnimationFrame(function () {
          gn(a);
        });
      }
    },
    fn = function (a) {
      var b = new Date().getTime();
      30 < a.i &&
        a.V &&
        (b - a.V >= 1.05 * a.s ? a.j++ : (a.j >>= 1),
        20 < a.j && ((a.s = Math.min(50, 1.2 * a.s)), (a.j = 0)));
      a.V = b;
    };
  an.prototype.start = function () {
    this.R = !1;
    this.U || gn(this);
  };
  var hn = function (a) {
    a.j = 0;
    a.V = 0;
  };
  an.prototype.g = function () {
    this.reset();
    an.Ca.g.call(this);
  };
  an.prototype.reset = function () {
    this.R = !0;
    hn(this);
    this.H = [];
    this.i = 0;
    this.T = !1;
    this.s = $m;
    hn(this);
  };
  var jn = function (a) {
    this.g = a;
  };
  ha(jn, ym);
  var kn = function (a, b, c, d) {
    return new jn([a, b, a + c, b, a + c, b + d, a, b + d]);
  };
  jn.prototype.contains = function (a, b) {
    var c = this.g;
    if (6 > c.length) return !1;
    for (var d = !1, e = 0, f = c.length - 2; e < c.length; f = e, e += 2) {
      var g = c[e],
        k = c[e + 1],
        m = c[f];
      f = c[f + 1];
      a < g != a < m && b > k + ((a - g) * (f - k)) / (m - g) && (d = !d);
    }
    return d;
  };
  jn.prototype.ra = function (a) {
    a.beginPath();
    for (var b = 0; b < this.g.length; b += 2)
      a.lineTo(this.g[b], this.g[b + 1]);
    a.lineTo(this.g[0], this.g[1]);
    a.fill();
    a.stroke();
  };
  var ln = Vm.$(),
    mn = function (a, b) {
      this.j = !1;
      this.S = a;
      this.V = b;
      this.R = kn(25, 25, 590, 310);
      this.s = new Jm();
      v(this.s, 320, 180);
      this.g = new Tm();
      v(this.g, 310, 60);
      this.g.i = 2;
      this.H = new Mm();
      this.o = new Um("white", 640, 360);
      this.o.i = 460;
      this.i = new z();
      r(this.i, this.s);
      r(this.i, this.H);
      r(this.i, this.g);
      r(this.i, this.o);
    };
  l(mn, Zm);
  mn.prototype.Ha = function () {
    this.g.j.va = 0;
    this.o.va = 0;
    var a = this;
    Em(this.S, this.R, function (b) {
      switch (b) {
        case "mouseup":
          A(a.i, new W(a.o, 150, 0, 1));
          D(a.i, 300, function () {
            a.j = !0;
            a.V &&
              (nn(a.V, function () {
                var c = an.$();
                c.R = !0;
                hn(c);
              }),
              an.$().start());
          });
          break;
        case "mouseover":
          Om(a.H);
          a.g.S = [];
          xb(a.g, new W(a.g.j, 200, a.g.j.va, 1));
          break;
        case "mouseout":
          Pm(a.H), (a.g.S = []), xb(a.g, new W(a.g.j, 200, a.g.j.va, 0));
      }
    });
    r(ln.g, this.i);
  };
  mn.prototype.Ia = function () {
    t(this.i);
    Hm(this.S.i, this.R);
    document.getElementById("hplogo").removeAttribute("title");
  };
  var on = function (a, b, c, d, e) {
    a = F([0, a, 1, b, 2, c, 3, d, 4, e]);
    qj.call(this, a);
    this.state = 0;
  };
  l(on, qj);
  var pn = S(
      [
        Yh,
        Yh,
        Yh,
        Yh,
        Yh,
        Yh,
        Zh,
        [1, 85, 1196, 81, 74],
        [1, 169, 1196, 81, 74],
        Zh,
        Zh,
      ],
      83,
      0,
      0
    ),
    qn = T(
      [
        [1, 648, 1196, 81, 74],
        [1, 337, 1200, 81, 74],
        [1, 732, 1203, 81, 74],
        [1, 816, 1203, 81, 74],
      ],
      83,
      0,
      0
    ),
    rn = T([[17, 2290, 797, 64, 84]], 83, 0, -2),
    sn = T(
      [
        [17, 2290, 884, 64, 84],
        [17, 387, 1134, 64, 84],
      ],
      83,
      0,
      -2
    ),
    tn = S(
      [
        [17, 1656, 1014, 100, 113],
        [17, 1759, 1014, 100, 113],
        [17, 1862, 1014, 100, 113],
        [17, 1965, 1014, 100, 113],
        [17, 360, 1018, 100, 113],
        [17, 0, 1032, 100, 113],
      ],
      83,
      0,
      -2
    ),
    un = S(
      [
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        O,
        Vh,
        Vh,
        Wh,
        Wh,
        Wh,
        Wh,
        Wh,
        Wh,
        Vh,
        Vh,
      ],
      83,
      0,
      0
    ),
    vn = T([[17, 792, 1160, 63, 82]], 83, 0, 0),
    wn = T(
      [
        [17, 858, 1160, 63, 82],
        [17, 924, 1160, 63, 82],
      ],
      83,
      0,
      0
    ),
    xn = S(
      [
        [17, 2256, 0, 104, 113],
        [17, 2256, 116, 104, 113],
        [17, 2256, 232, 104, 113],
        [17, 1335, 1014, 104, 113],
        [17, 1442, 1014, 104, 113],
        [17, 1549, 1014, 104, 113],
      ],
      83,
      0,
      0
    ),
    yn = S(
      [
        th,
        th,
        th,
        th,
        uh,
        uh,
        vh,
        vh,
        wh,
        wh,
        xh,
        xh,
        xh,
        xh,
        xh,
        xh,
        xh,
        xh,
        xh,
        xh,
        wh,
        wh,
        vh,
        vh,
        uh,
        uh,
        th,
        th,
        th,
        th,
      ],
      83,
      0,
      0
    ),
    zn = T(
      [
        [1, 1105, 1073, 102, 87],
        [1, 1210, 1073, 102, 87],
        [1, 480, 1075, 102, 87],
        [1, 585, 1095, 102, 87],
        [1, 690, 1106, 102, 87],
        [1, 375, 1110, 102, 87],
      ],
      83,
      0,
      0
    ),
    An = T([[17, 990, 1160, 61, 84]], 83, 0, -6),
    Bn = T(
      [
        [17, 1054, 1160, 61, 84],
        [17, 1118, 1160, 61, 84],
      ],
      83,
      0,
      -6
    ),
    Cn = S(
      [
        [17, 2068, 1122, 92, 113],
        [17, 1335, 1130, 92, 113],
        [17, 1430, 1130, 92, 113],
        [17, 1525, 1130, 92, 113],
        [17, 1620, 1130, 92, 113],
        [17, 1715, 1130, 92, 113],
      ],
      83,
      0,
      -6
    ),
    Dn = S([nh, nh, oh, oh, ph, ph, qh, qh, rh, rh], 83, 0, 0),
    En = T(
      [
        [1, 965, 1163, 82, 78],
        [1, 1050, 1163, 82, 78],
        [1, 1135, 1163, 82, 78],
        [1, 1220, 1163, 82, 78],
      ],
      83,
      0,
      0
    ),
    Fn = S(
      [
        [17, 2278, 975, 76, 75],
        [17, 1986, 1130, 76, 75],
        [17, 103, 1140, 76, 75],
        [17, 182, 1140, 76, 75],
        [17, 0, 1148, 76, 75],
      ],
      83,
      0,
      1
    ),
    Gn = T(
      [
        [17, 1898, 1130, 85, 81],
        [17, 299, 1134, 85, 81],
      ],
      83,
      0,
      1
    ),
    Hn = S(
      [
        [17, 2068, 1014, 95, 105],
        [17, 103, 1032, 95, 105],
        [17, 201, 1032, 95, 105],
        [17, 463, 1089, 95, 105],
        [17, 2166, 1121, 95, 105],
        [17, 2264, 1121, 95, 105],
      ],
      83,
      0,
      1
    ),
    In = 83 * Gn.length;
  var Jn = function () {
    q.call(this);
    var a = new Um("#000", 640, 46);
    v(a, 0, 0);
    r(this, a);
    a = new Um("#000", 640, 46);
    v(a, 0, 314);
    r(this, a);
    this.i = 463;
  };
  l(Jn, q);
  var Kn = function (a, b, c, d) {
    y.call(this, a);
    this.T = b;
    this.S = c;
    this.o = d;
  };
  l(Kn, y);
  Kn.prototype.Mb = function () {
    this.o(n(this.T, this.S, Ta(this.j / this.s, 0, 1)));
  };
  Kn.prototype.Xa = function () {
    this.o(this.S);
  };
  var Ln = Vm.$(),
    Mn = function (a) {
      this.j = !1;
      this.o = new z();
      this.i = a;
      this.s = new P(Te);
      r(this.o, this.s);
      this.ma = new Jn();
      r(this.o, this.ma);
      this.R = new P(Uh);
      this.R.i = 3;
      r(this.o, this.R);
      this.ha = new P(df);
      this.H = new q();
      v(this.H, -jj.x + 320, -jj.y + 180);
      r(this.s, this.H);
      this.U = new on(un, un, vn, wn, xn);
      v(this.U, -190, 73);
      r(this.H, this.U);
      this.T = new on(yn, zn, An, Bn, Cn);
      v(this.T, -82, 73);
      r(this.H, this.T);
      this.W = new on(pn, qn, rn, sn, tn);
      v(this.W, 26, 73);
      r(this.H, this.W);
      this.V = new on(Dn, En, Fn, Gn, Hn);
      v(this.V, 134, 73);
      r(this.H, this.V);
      this.S = new Um("#fff", 640, 360);
      this.S.i = 560;
      r(this.o, this.S);
    };
  l(Mn, Zm);
  Mn.prototype.Ha = function () {
    r(Ln.g, this.o);
    r(this.o, this.i);
    v(this.s, Z.backgroundPosition || hj);
    this.S.i = 560;
    oj(this.s, Te);
    x(this.i, Uk());
    this.i.ka(0);
    v(this.i, Vk());
    this.i.i = 4;
    Hl(this.i);
    this.H.g = !1;
    this.U.ka(2);
    this.W.ka(2);
    this.V.ka(2);
    this.T.ka(2);
    this.ma.g = !1;
    this.g = Z.wa;
    r(this.o, this.g);
    x(this.g, 1);
    this.g.i = 2;
    this.g.g = !0;
    this.g.ka(14);
    v(this.g, Ak);
    this.g.va = 1;
    x(this.ha, Uk());
    v(this.ha, -10, 18);
    this.ha.i = -1;
    this.R.g = !0;
    x(this.R, Uk());
    v(this.R, 330, -50);
    this.S.va = 0;
    K.g.Pb.play();
    U(this.g, 15, zk);
    A(this.g, new W(this.S, 1e3, 0, 1));
    var a = this;
    D(this.g, 0, function () {
      oj(a.s, Ue);
      a.ma.g = !0;
      a.g.ka(16);
      a.i.ka(23);
    });
    A(this.g, new W(this.S, 200, 1, 0));
    yb(
      this.g,
      new y(1500, function (b) {
        cb(a.g, 3.06 / b);
      })
    );
    zb(this.g, 1e3, null, new p(Ak.x, 410));
    D(this.g, 0, function () {
      U(a.i, 24, 0);
      U(a.i, 25, 700);
    });
    A(
      this.g,
      new vb(
        this.i,
        1e3,
        null,
        hj,
        function () {
          Bd(Wk());
          K.g.Ib.play();
        },
        ub
      )
    );
    A(this.g, new vb(this.R, 1e3, null, new p(330, 132), null, tb));
    D(this.g, 0, function () {
      a.i.ka(26);
      Il(a.i);
      a.R.g = !1;
    });
    D(this.g, zl, function () {
      K.g.Qb.play();
      a.i.ka(27);
      a.i.U = !0;
      v(a.i, 345, 200);
      Hl(a.i);
      a.i.T.U = !0;
      a.g.va = 0;
      a.H.g = !0;
    });
    yb(
      this.g,
      new Kn(500, Uk(), 1, function (b) {
        x(a.i, b);
      })
    );
    A(this.g, new vb(this.i, 500, null, new p(420, 100)));
    A(this.g, new vb(this.s, 2e3, null, jj));
    D(this.g, 100, function () {
      a.i.U = !1;
      K.g.uc.play();
      a.i.ka(28);
      U(a.V, 3, 200);
      U(a.V, 4, In);
      U(a.W, 3, 200);
      U(a.W, 4, In);
      U(a.T, 3, 200);
      U(a.T, 4, In);
      U(a.U, 3, 200);
      U(a.U, 4, In);
    });
    D(this.g, Al, function () {
      a.i.ka(29);
    });
    wb(this.g, 1e3);
    A(this.g, new W(this.S, 1700, 0, 1));
    D(this.g, 700, function () {
      a.j = !0;
    });
  };
  Mn.prototype.Ia = function () {
    E(this.s);
    E(this.i);
    Il(this.i);
    this.i.U = !1;
    E(this.o);
    E(this.g);
    this.g.S = [];
    db(this.g);
    this.g.va = 1;
    t(this.ha);
    t(this.o);
    Bd(Wk());
  };
  var Nn = Vm.$(),
    On = function (a) {
      this.j = !1;
      this.o = new z();
      this.i = a;
      this.S = new P(Te);
      r(this.o, this.S);
      this.T = new Jn();
      r(this.o, this.T);
      this.R = new P(df);
      this.V = new Um("#000", 640, 360);
      this.V.i = 461;
      r(this.o, this.V);
      this.s = new vj();
      this.s.i = 3;
      v(this.s, 500, 90);
      r(this.o, this.s);
      this.H = new Um("#fff", 640, 360);
      r(this.o, this.H);
      this.H.i = 560;
    };
  l(On, Zm);
  On.prototype.Ha = function () {
    r(Nn.g, this.o);
    r(this.o, this.i);
    v(this.R, 110, 273);
    this.R.i = 2;
    r(this.o, this.R);
    v(this.S, jj);
    this.i.ka(8);
    x(this.i, 1);
    v(this.i, -nj(this.i) / 2 - 5, 272);
    this.i.i = 4;
    this.T.g = !0;
    this.g = Z.wa;
    r(this.o, this.g);
    x(this.g, 1);
    this.g.i = 2;
    this.g.g = !1;
    this.g.ka(10);
    v(this.g, 540, 130);
    this.s.g = !1;
    this.s.ka(3);
    this.H.g = !1;
    this.H.va = 0;
    v(this.V, 0, 0);
    A(this.i, new vb(this.V, 1e3, null, new p(-640, 0)));
    zb(this.i, 800, null, new p(bb(this.R).x + 10, 272));
    var a = this;
    D(this.i, 0, function () {
      a.i.ka(22);
      var b = bb(a.i);
      v(a.i, b.x + 2, b.y - 30);
    });
    D(this.i, 249, function () {
      t(a.R);
      Hl(a.i);
    });
    D(this.i, 300, function () {
      K.g.Qb.play();
      zb(a.S, 1700, null, Z.backgroundPosition || hj, null, ub);
    });
    zb(
      this.i,
      700,
      null,
      new p(520, -this.i.s.Aa[4] / 2),
      function () {
        x(a.i, Uk());
      },
      sb
    );
    wb(this.i, 300);
    zb(
      this.i,
      700,
      new p(-nj(this.i) / 2, 360 + this.i.s.Aa[4] / 2),
      Vk(),
      null,
      tb
    );
    D(this.i, 0, function () {
      a.g.g = !0;
    });
    D(this.g, 200, function () {
      a.s.g = !0;
    });
    U(this.g, 8, 200);
    U(this.g, 11, xj - 200);
    U(this.g, 9, 83, null, null, function () {
      K.g.qc.play();
      x(a.g, 0.27);
    });
    D(this.g, 1e3, function () {
      a.H.g = !0;
      a.H.va = 0;
      wb(a.o, 100);
      A(a.o, new W(a.H, 1400, 0, 1));
    });
    A(
      this.g,
      new Kn(1500, 0.27, 1, function (b) {
        x(a.g, b);
      })
    );
    D(this.g, 0, function () {
      x(a.g, 1);
      v(a.g, Ak);
      a.s.g = !1;
      a.T.g = !1;
      Il(a.i);
      a.i.ka(0);
      Hl(a.i);
      K.g.sc.play();
    });
    U(this.g, 12, 0);
    yb(this.g, new W(a.H, 200, 1, 0));
    U(this.g, 13, yk);
    D(this.g, yk, function () {
      a.j = !0;
    });
  };
  On.prototype.Ia = function () {
    E(this.S);
    E(this.i);
    Il(this.i);
    E(this.o);
    E(this.g);
    13 != this.g.state && this.g.ka(13);
    v(this.g, Ak);
    x(this.g, 1);
    this.g.g = !0;
    this.g.i = 459;
    t(this.R);
    t(this.o);
  };
  Qe.$();
  var Sn = function (a, b) {
    var c = F([
      0,
      [{ Aa: Eh, duration: 0 }],
      1,
      [{ Aa: Eh, duration: 0 }],
      2,
      [{ Aa: Fh, duration: 0 }],
      3,
      T(Pn, Qn, 0, 0),
      4,
      T(Rn, Qn, -3, 0),
    ]);
    qj.call(this, c);
    v(this, a, b);
  };
  l(Sn, qj);
  var Pn = [
      Eh,
      [2, 1286, 211, 42, 31],
      [2, 1621, 543, 42, 31],
      [2, 1813, 575, 42, 31],
      [2, 1621, 577, 42, 31],
      [2, 2828, 633, 42, 31],
      [2, 2828, 667, 42, 31],
      [2, 2432, 684, 42, 31],
      [2, 2677, 703, 42, 31],
      Fh,
    ],
    Rn = [
      [2, 1985, 719, 41, 38],
      [2, 2029, 719, 41, 38],
      [2, 1721, 724, 41, 38],
      [2, 1765, 724, 41, 38],
      [2, 1809, 729, 41, 38],
      [2, 1853, 729, 41, 38],
      [2, 1615, 731, 41, 38],
      [2, 1659, 731, 41, 38],
      [2, 2677, 737, 41, 38],
      [2, 1529, 745, 41, 38],
      [2, 1116, 747, 41, 38],
      [2, 1160, 747, 41, 38],
    ],
    Qn = 1e3 / 12,
    Tn = Pn.length * Qn,
    Un = Rn.length * Qn,
    Vn = Eh[3];
  Sn.prototype.update = function (a) {
    Sn.Ca.update.call(this, a);
    a = 1;
    1 == this.state && (a += 0.1 * Math.max(0, Math.sin(this.ha / 100)));
    x(this, a);
  };
  var Wn = { 2: !0, 3: !0 },
    Xn = { 0: !0, 1: !0, 4: !0 };
  Sn.prototype.ka = function (a) {
    this.state == a ||
      (3 == this.state && 2 == a) ||
      (4 == this.state && 1 == a) ||
      (Wn[a] && Xn[this.state]
        ? (E(this), U(this, 2, Tn), (a = 3))
        : Xn[a] && Wn[this.state] && (E(this), U(this, 0, Un), (a = 4)),
      Sn.Ca.ka.call(this, a));
  };
  var Yn = function (a, b, c, d, e, f, g, k) {
    q.call(this);
    this.o = a;
    this.U = e + "px " + d;
    this.s = f || "#000";
    this.S = g ? g : "left";
    this.T = k;
    v(this, b, c);
  };
  l(Yn, q);
  Yn.prototype.ra = function (a) {
    Yn.Ca.ra.call(this, a);
    a.save();
    a.font = this.U;
    this.s && (a.fillStyle = this.s);
    this.T && ((a.shadowColor = this.T), (a.shadowBlur = 5));
    a.textAlign = this.S;
    a.fillText(this.o, 0, 0);
    a.restore();
  };
  var Zn = yj.$(),
    ao = function (a) {
      z.call(this);
      this.T = a;
      this.o = [];
      for (a = 0; 5 > a; a++) {
        var b = new Sn(Vn * (a + 1), 25);
        this.o.push(b);
        r(this, b);
      }
      $n(this);
      this.j = 0;
      this.s = new Yn(
        this.j.toString(),
        640 - (ge ? 74 : 25),
        37,
        "'Itim', sans-serif",
        40,
        "orange",
        "right",
        "black"
      );
      r(this, this.s);
      Zn.addListener(this);
    };
  l(ao, z);
  ao.prototype.La = function (a, b) {
    if (10 == a && 5 < b) this.o[this.o.length - 1].ka(2);
    else if (2 == a) {
      E(this);
      var c = this;
      this.j < b
        ? A(
            this,
            new Kn(300, this.j, b, function (d) {
              c.j = Math.ceil(d);
              c.s.o = c.j.toString();
            })
          )
        : ((this.j = b), (this.s.o = this.j.toString()));
    }
  };
  ao.prototype.update = function (a) {
    ao.Ca.update.call(this, a);
    $n(this);
  };
  var $n = function (a) {
    for (var b = a.V, c = 0; 5 > c; c++) {
      var d = 0;
      c > a.T.j - 1 ? (d = 2) : c == a.T.j - 1 && (d = 1);
      b[c].ka(d);
    }
  };
  var bo = function (a) {
    z.call(this);
    var b = a.position,
      c = new Yn(
        "+" + a.Pa.toString(),
        0,
        0,
        "'Itim', sans-serif",
        24,
        a.color,
        "center"
      );
    r(this, c);
    v(this, b.x, b.y - 30);
    this.va = 0;
    this.i = 470;
    xb(this, new vb(this, 400, null, new p(b.x, b.y - 60), pb));
    xb(
      this,
      new W(c, 400, 1, 0, function () {
        t(c);
      })
    );
    xb(this, new zj(this, 1.1 * (320 > b.x ? -1 : 1), 0, 2));
  };
  l(bo, z);
  var co = function () {
      return qe() ? "1" != de.g.get("scta") : !(ne() || oe());
    },
    eo = function () {
      if (qe()) throw "";
      return ke || ne() || oe();
    },
    fo = function () {
      if (qe()) throw "";
      return pe() || me;
    };
  var go = yj.$(),
    ho = function () {
      z.call(this);
      this.U = this.o = 0;
      this.s = new z();
      r(this, this.s);
      this.ya = 0;
      this.j = new Yn(
        "0",
        315,
        340,
        "'Itim', sans-serif",
        32,
        "orange",
        "center",
        "black"
      );
      this.j.i = 470;
      xb(this, new zj(this.j, 0.7, 3));
      this.j.g = !1;
      this.T = new P(Ve);
      this.T.i = -1;
      x(this.T, 0.5);
      this.T.va = 0.6;
      v(this.T, 5, -10);
      r(this.j, this.T);
      r(this, this.j);
      this.ha = K.g.Kb;
      yj.$().addListener(this);
    };
  l(ho, z);
  var io = [K.g.Wb, K.g.Dc, K.g.Ec, K.g.Fc];
  ho.prototype.La = function (a, b) {
    !this.g || (5 != a && 11 != a)
      ? this.g && 0 < this.U && (8 == a || 17 == a)
        ? (E(this.s),
          yb(this.s, new W(this.T, 200, 0.6, 0)),
          A(this.s, new W(this.j, 200, 1, 0)),
          this.ma())
        : 13 == a && (this.ya = this.o)
      : (E(this.s),
        (this.s.S = []),
        this.U++,
        2 <= this.U
          ? (2 == this.U
              ? (xb(this, new W(this.j, 200, 0, 1)),
                xb(this, new W(this.T, 200, 0, 0.6)))
              : ((this.j.va = 1), (this.T.va = 0.6)),
            (this.j.g = !0),
            (this.j.o = " x " + this.U),
            wb(this.s, 500),
            yb(this.s, new W(this.T, 500, 0.6, 0)),
            A(this.s, new W(this.j, 500, 1, 0, za(this.ma, this))))
          : D(this.s, 1e3, za(this.ma, this)),
        (this.ha = io[(this.U - 1) % io.length]),
        (b.Pa *= this.U),
        jo(this, this.o + b.Pa),
        r(this, new bo(b)));
  };
  ho.prototype.ma = function () {
    this.U = 0;
    this.ha = K.g.Kb;
  };
  var jo = function (a, b) {
    a.o = b;
    V(go, 2, a.o);
    ie && (document.cookie = "sessionHighScore=" + Math.floor(a.o));
  };
  var ko = yj.$(),
    no = function (a, b) {
      var c = F([0, lo, 2, lo, 3, lo, 5, mo, 6, [mo[mo.length - 1]]]);
      Ol.call(this, c, 20, [4], a, b, -35);
    };
  l(no, Ol);
  var lo = S(
      [
        [2, 2990, 709, 78, 63],
        [2, 3071, 709, 78, 63],
        [2, 3152, 709, 78, 63],
        Ch,
        Ch,
        Ch,
        Ch,
        Ch,
      ],
      83,
      0,
      0
    ),
    mo = T(
      [
        [2, 1337, 68, 78, 63],
        [2, 1808, 143, 78, 63],
        [2, 2104, 350, 78, 63],
        [2, 1875, 387, 78, 63],
        [2, 687, 699, 78, 63],
        [2, 768, 699, 78, 63],
        [2, 2596, 703, 78, 63],
        [2, 2828, 709, 78, 63],
        [2, 2909, 709, 78, 63],
        [2, 2909, 709, 78, 63],
        [2, 2909, 709, 78, 63],
        [2, 2909, 709, 78, 63],
      ],
      83,
      0,
      0
    );
  no.prototype.Cb = function () {
    V(ko, 18);
    return no.Ca.Cb.call(this);
  };
  var oo = yj.$(),
    po = function (a, b) {
      q.call(this);
      this.j = a;
      this.o = null;
      this.S = b;
      this.s = null;
      oo.addListener(this);
    };
  l(po, q);
  po.prototype.reset = function () {
    var a = Z.tb(this)[0];
    this.o && t(this.o);
    this.o = a;
    r(this, a);
    this.s = null;
  };
  var Y = function (a) {
      var b = new gb();
      b.Wa = function () {
        return a.j.V.length == (a.s && !a.s.Oa() ? 1 : 0);
      };
      return b;
    },
    Mk = function (a, b) {
      return new hb(function () {
        jm(a, b);
      });
    },
    jm = function (a, b) {
      for (var c = [], d = 0; d < b.length; d++) {
        var e = b[d];
        if (!(4 == e.i[0] && 5 <= a.S.j)) {
          var f;
          0 < e.i.length && 4 == e.i[0]
            ? (f = new no(e.g.x, e.g.y))
            : (f = Wl(e.i.slice(), e.g.x, e.g.y));
          Tl(f);
          0 < e.j && f.Ja(e.j);
          x(f, Uk());
          r(a.j, f);
          c.push(f);
        }
      }
      return c;
    },
    Nk = function (a) {
      var b = X(5, 295, 14, "");
      return new hb(function () {
        var c = b.i.slice();
        var d = b.g.x,
          e = b.g.y,
          f = F([0, Yl, 2, am, 9, bm, 3, Zl, 5, $l, 6, [$l[$l.length - 1]]]);
        c = new Xl(f, 100, c, d, e, -60);
        Tl(c);
        c.Ja(b.j);
        r(a.j, c);
      });
    },
    Pk = function (a) {
      var b = X(-5, 217.5, 12, "");
      return new hb(function () {
        var c = b.i.slice();
        var d = b.g.x,
          e = b.g.y,
          f = b.j,
          g = F([
            0,
            dm,
            8,
            dm,
            7,
            hm,
            2,
            gm,
            9,
            im,
            3,
            em,
            5,
            fm,
            6,
            [fm[fm.length - 1]],
          ]);
        c = new cm(a, g, 100, c, d, e, -60, f);
        Tl(c);
        r(a.j, c);
      });
    },
    Qk = function (a) {
      var b = X(20, 245, 3.8, "");
      return new hb(function () {
        var c = b.i.slice();
        var d = b.g.x,
          e = b.g.y,
          f = F([0, mm, 2, pm, 9, qm, 3, nm, 5, om, 6, [om[om.length - 1]]]);
        c = new lm(f, 100, c, d, e, -60);
        Tl(c);
        c.Ja(b.j);
        r(a.j, c);
      });
    },
    Rk = function (a) {
      var b = X(5, 295, 12, "");
      return new hb(function () {
        var c = b.i.slice();
        var d = b.g.x,
          e = b.g.y,
          f = F([0, sm, 2, vm, 9, wm, 3, tm, 5, um, 6, [um[um.length - 1]]]);
        c = new rm(a, f, 100, c, d, e, -60);
        Tl(c);
        c.Ja(b.j);
        r(a.j, c);
      });
    },
    Sk = function (a, b) {
      return new hb(function () {
        var c = Wl(Vj(b), 0, 0, -105),
          d = Z.wa;
        d.j = c;
        var e = bb(d);
        v(d.j, e.x - 50, e.y);
        d.j.Pa = 200;
        d.j.va = 0;
        d.j.i = d.i + 1;
        Fk(d);
        r(a.j, c);
      });
    },
    Ok = function (a, b) {
      for (
        var c = function (e) {
            return function () {
              t(b[e]);
              if (e < b.length - 1) {
                var f = b[e + 1];
                a.o && t(a.o);
                a.o = f;
                r(a, f);
              } else V(oo, 1);
            };
          },
          d = 0;
        d < b.length;
        d++
      )
        b[d].Xa = c(d);
    };
  po.prototype.La = function (a) {
    20 != a ||
      (this.s && !this.s.Oa()) ||
      ((a = Uj(190, 295)),
      (a = new no(a.x, a.y)),
      Tl(a),
      x(a, Uk()),
      r(this.j, a),
      (this.s = a));
  };
  var qo = yj.$(),
    ro = Vm.$(),
    so = function (a, b) {
      this.g = a;
      this.S = b;
      this.H = new q();
      this.s = new po(this.H, this.g);
      this.V = new ao(this.g);
      this.o = new ho();
      this.o.g = !1;
      this.i = new q();
      this.i.g = !1;
      this.R = 0;
      qo.addListener(this);
      r(this.i, this.g);
      r(this.i, this.H);
      r(this.i, this.s);
      r(this.i, this.o);
      this.V.i = 462;
      r(this.i, this.V);
    };
  l(so, Zm);
  so.prototype.La = function (a, b) {
    switch (a) {
      case 4:
        if (!this.i.g) break;
        if (!Dl(this.g, b)) break;
        for (var c = this.H.V, d = !1, e = 0, f; (f = c[e++]); )
          f.Oa() || (d = f.Bb(b) || d);
        d || V(qo, 17);
        Sj[b] ? Sj[b].play() : this.o.ha.play();
        break;
      case 7:
      case 9:
        if (!this.i.g) break;
        El(this.g);
        break;
      case 8:
        if (!this.i.g) break;
        Fl(this.g);
        break;
      case 1:
        E(this.g);
        V(qo, 13);
        this.R = 1;
        break;
      case 0:
        to(this.S);
        this.s.g = !1;
        break;
      case 16:
        this.R = 7;
        break;
      case 15:
        t(this.i);
        this.g.reset();
        c = this.o;
        jo(c, 0);
        c.ya = 0;
        break;
      case 14:
        (c = this.g),
          (c.j = 5),
          (c.Ba = c.j - 1),
          (c = this.o),
          jo(c, c.ya),
          uo(this);
    }
  };
  var uo = function (a) {
    Cl(a.g);
    ab(a.H);
    a.s.reset();
  };
  so.prototype.Ha = function () {
    this.i.g = !0;
    this.R = 0;
    r(this.i, this.g);
    E(this.g);
    v(this.g, Vk());
    Cl(this.g);
    this.g.i = 180 + this.g.s.Aa[4] / 2;
    x(this.g, Uk());
    this.o.g = !0;
    this.s.g = !0;
    Z.wa && r(this.i, Z.wa);
    Z.jc && Hl(this.g);
    r(ro.g, this.i);
    vo(this.S);
  };
  so.prototype.Ia = function () {
    this.i.g = !1;
    this.o.g = !1;
    Z.wa && (E(Z.wa), (Z.wa.S = []), t(Z.wa));
    Il(this.g);
    t(this.i);
    to(this.S);
    E(this.g);
    Bd(K.g.Sb);
  };
  so.prototype.update = function () {
    return this.R;
  };
  var xo = function (a, b, c, d, e, f, g) {
      var k = a.font;
      a.font = " " + d + "px " + c;
      for (var m = wo(a, b, f); m.length > g && d > e; )
        (d = Math.max(e, 1 < d ? d - 1 : d - 0.1)),
          (a.font = " " + d + "px " + c),
          (m = wo(a, b, f));
      for (b = 0; b < m.length; b++)
        for (; a.measureText(m[b]).width > f && d > e; )
          (d = Math.max(e, 1 < d ? d - 1 : d - 0.1)),
            (a.font = " " + d + "px " + c);
      a.font = k;
      return { lines: m, fontFamily: c, fontSize: d, fontStyle: "" };
    },
    wo = function (a, b, c) {
      b = b.match(/[^\s-]+-?/g);
      if (!b || 1 > b.length) return [""];
      for (var d = b[0], e = [], f = 1; f < b.length; f++) {
        var g = d + ("-" == d[d.length - 1] ? "" : " ") + b[f];
        a.measureText(g).width > c ? (e.push(d), (d = b[f])) : (d = g);
      }
      e.push(d);
      return e;
    };
  var yo = function (a, b, c, d, e, f, g, k, m, w, u, C) {
    Yn.call(this, b, c, d, g, k, e, f);
    this.j = xo(a, b, g, k, m, w, u);
    if (C) {
      a = new q();
      var Q = this;
      a.ra = function (J) {
        J.fillStyle = "#000";
        var B = Q.j;
        J.font = B.fontStyle + " " + B.fontSize + "px " + B.fontFamily;
        for (var R = 0, Ca = 0; Ca < B.lines.length; Ca++)
          R = Math.max(R, J.measureText(B.lines[Ca]).width);
        var kb = R + 40;
        Ca = Q.j.lines.length * k + 20;
        B = -Ca / 2;
        R = -kb / 2;
        kb /= 2;
        Ca /= 2;
        J.beginPath();
        J.moveTo(R + 20, B);
        J.lineTo(kb - 20, B);
        J.quadraticCurveTo(kb, B, kb, B + 20);
        J.lineTo(kb, Ca - 20);
        J.quadraticCurveTo(kb, Ca, kb - 20, Ca);
        J.lineTo(R + 20, Ca);
        J.quadraticCurveTo(R, Ca, R, Ca - 20);
        J.lineTo(R, B + 20);
        J.quadraticCurveTo(R, B, R + 20, B);
        J.fill();
      };
      a.va = 0.7;
      a.i = -1;
      v(a, 0, -5);
      r(this, a);
    }
  };
  l(yo, Yn);
  yo.prototype.ra = function (a) {
    a.fillStyle = this.s;
    a.textAlign = this.S;
    var b = this.j,
      c =
        this.j.fontSize / 4 - ((this.j.lines.length - 1) / 2) * this.j.fontSize,
      d = this.j.fontSize,
      e = a.font;
    a.font = b.fontStyle + " " + b.fontSize + "px " + b.fontFamily;
    for (var f = 0; f < b.lines.length; f++)
      a.fillText(b.lines[f], 0, c + f * d);
    a.font = e;
  };
  var zo = function (a, b) {
    this.width = a;
    this.height = b;
  };
  h = zo.prototype;
  h.aspectRatio = function () {
    return this.width / this.height;
  };
  h.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  h.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  h.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  h.scale = function (a, b) {
    var c = qa(b) ? b : a;
    this.width *= a;
    this.height *= c;
    return this;
  };
  var Ao = function () {
    var a = window.document;
    a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
    return new zo(a.clientWidth, a.clientHeight);
  };
  var Bo = [5, 6, 7, 8, 9, 11, 12, 16],
    Co = 0,
    Do = 0,
    Eo = !1,
    Fo = {},
    Go = [],
    Ho = function (a) {
      var b = Ba();
      Fo.dt = b - Do;
      Do = b;
      0 == a && (Co = b);
      Fo.e = a;
      Fo.t = 0 == Co ? -1 : Math.floor(b - Co);
      Fo.m = je ? 1 : 0;
      b = Ao();
      Fo.w = b.width > b.height ? 1 : 0;
      b = [];
      for (var c in Fo) Fo.hasOwnProperty(c) && b.push(c + ":" + Fo[c]);
      for (Je(b.join(","), 10 == a, 0 <= Bo.indexOf(a)); 0 < Go.length; )
        delete Fo[Go.pop()];
      Eo ||
        0 != a ||
        (qe()
          ? "1" == de.g.get("ccta")
          : (pe() && !ne() && !oe()) || (me && je)) ||
        ((Eo = !0), Ho(10));
    };
  var Io = function (a) {
    ld.call(this);
    this.j = a;
    $c(a, "keydown", this.R, !1, this);
    $c(a, "click", this.s, !1, this);
  };
  l(Io, ld);
  Io.prototype.R = function (a) {
    (13 == a.o || (jc && 3 == a.o)) && Jo(this, a);
  };
  Io.prototype.s = function (a) {
    Jo(this, a);
  };
  var Jo = function (a, b) {
    var c = new Ko(b);
    if (nd(a, c)) {
      c = new Lo(b);
      try {
        nd(a, c);
      } finally {
        b.stopPropagation();
      }
    }
  };
  Io.prototype.g = function () {
    Io.Ca.g.call(this);
    gd(this.j, "keydown", this.R, !1, this);
    gd(this.j, "click", this.s, !1, this);
    delete this.j;
  };
  var Lo = function (a) {
    Mc.call(this, a.g);
    this.type = "action";
  };
  l(Lo, Mc);
  var Ko = function (a) {
    Mc.call(this, a.g);
    this.type = "beforeaction";
  };
  l(Ko, Mc);
  var Mo = function (a) {
    Hc.call(this);
    this.V = a;
    this.i = {};
  };
  l(Mo, Hc);
  var No = [],
    Oo = function (a, b, c, d, e) {
      ua(c) || (c && (No[0] = c.toString()), (c = No));
      for (var f = 0; f < c.length; f++) {
        var g = $c(b, c[f], d || a.handleEvent, e || !1, a.V || a);
        if (!g) break;
        a.i[g.key] = g;
      }
    },
    Po = function (a, b, c, d, e, f) {
      if (ua(c)) for (var g = 0; g < c.length; g++) Po(a, b, c[g], d, e, f);
      else
        (d = d || a.handleEvent),
          (e = wa(e) ? !!e.capture : !!e),
          (f = f || a.V || a),
          (d = ad(d)),
          (e = !!e),
          (c = Oc(b)
            ? Vc(b.i, String(c), d, e, f)
            : b
            ? (b = cd(b))
              ? Vc(b, c, d, e, f)
              : null
            : null),
          c && (hd(c), delete a.i[c.key]);
    },
    Qo = function (a) {
      Vb(
        a.i,
        function (b, c) {
          this.i.hasOwnProperty(c) && hd(b);
        },
        a
      );
      a.i = {};
    };
  Mo.prototype.g = function () {
    Mo.Ca.g.call(this);
    Qo(this);
  };
  Mo.prototype.handleEvent = function () {
    throw Error("o");
  };
  var Ro = function (a, b, c, d, e) {
    Mo.call(this);
    this.T = a;
    this.ha = b;
    this.W = c;
    this.U = d;
    e &&
      (this.j && Po(this, this.j, "action", this.H),
      e &&
        ((this.j = new Io(e)),
        Ic(this, Aa(Jc, this.j)),
        (this.H = za(this.s, this)),
        Oo(this, this.j, "action", this.H)));
  };
  l(Ro, Mo);
  Ro.prototype.s = function () {
    Ho(7);
    So() && !Ub("Trident") && !Ub("MSIE") && window.gapi && window.gapi.load
      ? window.gapi.load("share", za(this.R, this))
      : window.open("https://plus.google.com/share?url=" + this.T);
  };
  var So = function () {
    if (!window.gbar) return !1;
    var a = !!(window.gbar.sos && 0 < window.gbar.sos().length),
      b = !(!window.gbar.so || !window.gbar.so());
    return a || b;
  };
  Ro.prototype.R = function () {
    if (window.gapi && window.gapi.share) {
      var a = {
          items: [
            {
              type: "http://schema.org/WebPage",
              id: location.protocol + "//" + location.host,
              properties: { url: [this.T], name: [this.ha], image: [this.U] },
            },
          ],
        },
        b = window.location.toString().match(/[?&]authuser=(\d+)/);
      b = b && b[1];
      var c = So() || !!window.google.doodle.sf;
      window.gapi.share.lightbox(a, {
        isLoggedInForGooglePlus: c,
        onLoginPopupBlocked: function () {
          Je("gplus,popupblocked");
        },
        onLoginStateChanged: za(function () {
          Da("google.doodle.sf", !0);
          this.R();
        }, this),
        editorText: this.W,
        sessionIndex: b || "",
        sourceForLogging: "doodle",
      });
    }
  };
  var To = function (a) {
      return 0 == a.indexOf("//") ? "https:" + a : a;
    },
    Uo = function (a, b) {
      var c = new Qd();
      for (d in b) c.add(d, b[d]);
      var d = new Kd(a);
      Nd(d, c);
      return d.toString();
    };
  var Vo = function () {
      return ze("shortlink", "http://www.google.com/?doodle=28464230");
    },
    Wo = function (a) {
      return L("Share Message").replace(/\[.*\]/, "" + a);
    },
    Xo = function () {
      var a = Vo();
      Ae() ||
        ((a = To(a)),
        (a = Uo("https://www.facebook.com/dialog/share", {
          app_id: "738026486351791",
          href: a,
          hashtag: "#GoogleDoodle",
        })),
        dc(a),
        Ho(5));
    };
  var Cm = [
    { Aa: ef, x: 350, y: 141 },
    { Aa: ff, x: 350, y: 141 },
    { Aa: gf, x: 431, y: 141 },
    { Aa: hf, x: 431, y: 141 },
    { Aa: jf, x: 511, y: 141 },
    { Aa: kf, x: 511, y: 141 },
    { Aa: zh, x: 0, y: 0 },
    { Aa: ai, x: 528, y: 231 },
    { Aa: bi, x: 528, y: 231 },
    { Aa: ci, x: 474, y: 231 },
    { Aa: di, x: 474, y: 231 },
    { Aa: ei, x: 366, y: 231 },
    { Aa: fi, x: 366, y: 231 },
    { Aa: gi, x: 445, y: 231 },
    { Aa: hi, x: 420, y: 231 },
    { Aa: ii, x: 420, y: 231 },
  ];
  var Yo = yj.$(),
    Zo = function (a, b, c) {
      this.ya = b;
      this.ha = c;
      this.R = this.S = !1;
      this.o = 0;
      var d = this;
      c = b ? -40 : 0;
      this.ta = Dm(
        a,
        ef,
        ff,
        function () {
          d.S = !0;
        },
        L("End Screen - Replay")
      );
      this.Ba = Dm(
        a,
        gf,
        hf,
        function () {
          d.R = !0;
        },
        L("End Screen - New Game"),
        c
      );
      this.Da = Dm(a, jf, kf, ye, L("Search - Icon"), c);
      this.W = Dm(
        a,
        ei,
        fi,
        function () {
          var e = Vo(),
            f = Wo(d.o);
          Ae() ||
            ((e = To(e)),
            new Ro(
              e,
              window.google.doodle.alt || "",
              f,
              "https://www.google.com/logos/2016/halloween16/share.png"
            ).s());
        },
        L("Share - G+")
      );
      this.Ea = Dm(
        a,
        hi,
        ii,
        function () {
          var e = Vo(),
            f = Wo(d.o);
          Ae() ||
            ((e = To(e)),
            (e = "text=" + encodeURIComponent(String(f + "\n" + e))),
            dc("http://twitter.com/intent/tweet?" + e),
            Ho(6));
        },
        L("Share - Twitter")
      );
      this.U = Dm(a, ci, di, Xo, L("Share - Facebook"));
      this.T = Dm(
        a,
        ai,
        bi,
        function () {
          var e = d.o;
          Je("share,5,x");
          var f = window.location;
          var g = Vo();
          e = Wo(e);
          g = To(g);
          g = Uo("mailto:", { subject: Be, body: e + "\n" + g });
          f.href = g;
        },
        L("Share - E-mail")
      );
      this.ma = Dm(
        a,
        gi,
        gi,
        function () {
          window.location =
            "http://www.google.com/doodles/_SHARE?description=" +
            encodeURIComponent(String(Wo(d.o))) +
            "&url=" +
            encodeURIComponent(String(Vo()));
        },
        L("Share")
      );
      this.g = [this.Ba, this.Da];
      b || this.g.push(this.ta);
      ge && !me
        ? this.g.push(this.ma)
        : (this.g = this.g.concat([this.W, this.Ea, this.U, this.T]));
      this.i = new q();
      this.i.i = 461;
      a = new P(b ? zh : yh);
      v(a, 320, 180);
      r(this.i, a);
      this.H = new q();
      r(this.i, this.H);
      x(this.H, 0.9);
      v(this.H, 46, 45);
      La(this.g, function (e) {
        r(d.H, e);
      });
      this.s = null;
      this.V = new Yn(
        "0",
        466,
        150,
        "'Itim', sans-serif",
        40,
        "white",
        "center"
      );
      r(this.i, this.V);
      Yo.addListener(this);
    };
  l(Zo, Zm);
  Zo.prototype.Ha = function () {
    this.R = this.S = !1;
    this.s ||
      ((this.s = new yo(
        this.ha,
        L("Happy Halloween!"),
        466,
        85,
        "white",
        "center",
        "'Itim', sans-serif",
        36,
        20,
        244,
        1,
        !1
      )),
      r(this.i, this.s));
    r(Vm.$().g, this.i);
    La(this.g, function (a) {
      Gm(a);
    });
    this.ya || (Bd(Wk()), K.g.Rb.play());
  };
  Zo.prototype.Ia = function () {
    t(this.i);
    Bd(K.g.Ib);
    Bd(K.g.Rb);
    La(this.g, function (a) {
      Im(a);
    });
  };
  Zo.prototype.update = function () {
    return this.S ? (V(Yo, 14), Z.state) : this.R ? (V(Yo, 15), 13) : 0;
  };
  Zo.prototype.La = function (a, b) {
    2 == a && ((this.o = b), (this.V.o = "" + this.o));
  };
  var $o = Qe.$(),
    bp = function () {
      this.o = 0;
      ap(this, 0, 0);
    },
    ap = function (a, b, c) {
      a.j = b;
      a.g = c;
      a.R = 0.8 * Math.random();
      a.S = 0.5 * Math.random() + 0.9;
      a.i = Math.random() + 2;
      a.H = -0.2;
      a.s = 2 * Math.random() * Math.PI;
    };
  bp.prototype.update = function (a, b, c) {
    this.V = b;
    this.T = c;
    this.o = a;
    this.j += Math.cos(this.s) * this.S;
    this.g += Math.sin(this.s) * this.S;
    this.g += this.H;
    this.i -= 0.05;
    this.H += 0.04;
    2 >= this.i && ap(this, this.V, this.T);
  };
  bp.prototype.ra = function (a) {
    a.save();
    a.globalAlpha = 0.2 * Math.sin(this.i) * this.i;
    var b = this.o * (0.5 - 2 * this.R + 0.2 * this.o);
    $o.ra(Dh, a, this.j - 4, this.g - 4, 0.1 * b, !0);
    a.globalAlpha = 0.5 * this.i + 0.2 * this.o;
    b = Math.sin(this.j) + 0.15 * this.R + 0.2 * this.o;
    $o.ra(Xh, a, this.j - 4, this.g - 4, 0.3 * b, !0);
    a.restore();
  };
  var fp = function (a, b, c) {
    Hc.call(this);
    this.W = a;
    this.ya = b;
    this.Ba = c;
    this.U = Ba();
    this.ha = xe(document, "hidden");
    this.s = (this.T = xe(document, "visibilityState"))
      ? this.T.replace(/state$/i, "change").toLowerCase()
      : null;
    this.R = cp(this);
    this.j = !1;
    this.H = this.R;
    dp(this);
    ep(this);
  };
  ha(fp, Hc);
  var dp = function (a) {
      a.s
        ? gp(a)
        : he &&
          hp(a, function () {
            gp(a);
          });
    },
    gp = function (a) {
      a.i = function () {
        a.R = cp(a);
        a.R || ((a.U = Ba()), (a.j = !1));
        ip(a);
      };
      var b = window.agsa_ext;
      a.s
        ? document.addEventListener(a.s, a.i, !1)
        : b &&
          b.registerPageVisibilityListener &&
          (google.doodle || (google.doodle = {}),
          (google.doodle.pvc = function () {
            a.i && a.i();
          }),
          b.registerPageVisibilityListener("google.doodle.pvc();"));
    },
    hp = function (a, b) {
      window.agsa_ext
        ? b()
        : (a.ma = window.setTimeout(function () {
            dp(a);
          }, 100));
    };
  fp.prototype.g = function () {
    window.clearTimeout(this.V);
    window.clearTimeout(this.ma);
    this.i &&
      (this.s && document.removeEventListener
        ? document.removeEventListener(this.s, this.i, !1)
        : window.agsa_ext &&
          window.agsa_ext.registerPageVisibilityListener &&
          (this.i = null));
    Hc.prototype.g.call(this);
  };
  var cp = function (a) {
      if (!a.ha && !a.T && window.agsa_ext && window.agsa_ext.getPageVisibility)
        return "hidden" == window.agsa_ext.getPageVisibility();
      var b = document[a.T];
      return document[a.ha] || "hidden" == b;
    },
    ip = function (a) {
      var b = a.R || a.j;
      a.H && !b
        ? ((a.H = !1), a.Ba(), ep(a))
        : !a.H && b && ((a.H = !0), a.ya());
    },
    ep = function (a) {
      a.V && window.clearTimeout(a.V);
      var b = Math.max(100, a.W - jp(a));
      a.V = window.setTimeout(function () {
        a.V = null;
        a.j = jp(a) >= a.W;
        a.j || ep(a);
        ip(a);
      }, b);
    },
    jp = function (a) {
      return Ba() - a.U;
    };
  var kp = function () {};
  ha(kp, ym);
  kp.prototype.contains = function () {
    return !1;
  };
  kp.prototype.ra = function () {};
  var lp = function (a, b, c) {
      this.o = a;
      this.V = b;
      this.W = void 0 === c ? null : c;
      this.i = [];
      this.g = null;
      this.s = this.H = 0;
      this.ha = this.R = !1;
      this.S = [];
      this.ma = this.o.width / this.o.clientWidth;
      this.T = this.o.height / this.o.clientHeight;
      this.ya = [this.o];
      this.U = !1;
    },
    mp = function (a, b) {
      a.ma = a.o.width / a.o.clientWidth;
      a.T = a.o.height / a.o.clientHeight;
      void 0 !== b && (a.U = b);
    },
    Hm = function (a, b) {
      for (var c = a.i.length - 1; 0 <= c; c--)
        a.i[c].i === b && a.i.splice(c, 1);
      a.g && b === a.g.i && ((a.g = null), np(a));
      a.j && b === a.j.i && (a.j = null);
      op(a, "areamove", a.H, a.s);
    },
    Fm = function (a, b) {
      for (var c = null, d = 0; d < a.i.length; d++)
        a.i[d].i === b && (c = a.i[d]);
      c && (Pa(a.i, c), a.i.unshift(c));
    };
  lp.prototype.handleEvent = function (a) {
    var b, c;
    c = (c = (c = a.g) || window.event)
      ? (b =
          (c.targetTouches && c.targetTouches[0]) ||
          (c.changedTouches && c.changedTouches[0])) && void 0 !== b.pageX
        ? [b.pageX, b.pageY]
        : void 0 !== c.clientX
        ? [
            c.clientX +
              ("rtl" == document.dir ? -1 : 1) *
                (document.body.scrollLeft ||
                  document.documentElement.scrollLeft ||
                  0),
            c.clientY +
              (document.body.scrollTop ||
                document.documentElement.scrollTop ||
                0),
          ]
        : void 0 !== c.pageX
        ? [c.pageX, c.pageY]
        : [0, 0]
      : [0, 0];
    b = this.o;
    var d = 0,
      e = 0;
    if (b) {
      do (d += b.offsetLeft), (e += b.offsetTop);
      while ((b = b.offsetParent));
    }
    b = [d, e];
    b = [c[0] - b[0], c[1] - b[1]];
    b[0] *= this.ma;
    b[1] *= this.T;
    this.U && ((c = b[0]), (b[0] = b[1]), (b[1] = 0 - c));
    c = b[0];
    b = b[1];
    this.W && ((d = this.W), (d.U = Ba()), (d.j = !1), ip(d));
    this.H = c;
    this.s = b;
    c = a.type;
    (this.ha && 0 == c.indexOf("mouse")) ||
      ((b = {
        touchstart: "mousedown",
        touchend: "mouseup",
        touchmove: "mousemove",
      }),
      c in b && ((this.ha = !0), (c = b[c])),
      "mousedown" == c && (a.preventDefault(), this.V && this.V.focus()),
      op(this, c, this.H, this.s));
  };
  var op = function (a, b, c, d) {
      if (!a.R && "mousedown" == b) {
        a.R = !0;
        for (var e = 0; e < a.S.length; e++) a.S[e]();
      }
      if ("mousedown" == b) {
        if (!a.j)
          for (b = 0; b < a.i.length; b++)
            if (((e = a.i[b]), e.i.contains(c, d))) {
              a.j = e;
              e.g("mousedown", c, d);
              break;
            }
      } else if ("mouseup" == b)
        a.j
          ? (a.j.g("mouseup", c, d), (a.j = null))
          : a.g && a.g.g("mouseup", c, d);
      else if ("mousemove" == b || "areamove" == b) {
        e = null;
        for (var f = 0; f < a.i.length; f++) {
          var g = a.i[f];
          if (g.i.contains(c, d)) {
            e = g;
            break;
          }
        }
        a.g != e &&
          (a.g && a.g.g("mouseout", c, d),
          e && e.g("mouseover", c, d),
          (a.g = e));
        if ("mousemove" == b)
          for (a.j && a.j.g("mousemove", c, d), b = 0; b < a.i.length; b++)
            (e = a.i[b]),
              e != a.j && e.i.contains(c, d) && e.g("mousemove", c, d);
      } else
        "mouseout" == b
          ? (a.g && a.g.g("mouseout", c, d), (a.j = null), (a.g = null))
          : "contextmenu" == b && a.g && a.g.g("contextmenu", c, d);
      np(a);
    },
    np = function (a) {
      for (
        var b = a.g && a.g.i.Xb() ? "pointer" : "default", c = 0, d;
        (d = a.ya[c]);
        c++
      )
        re(d, "cursor", b);
    },
    pp = function (a, b) {
      this.i = a;
      this.g = b;
    },
    qp = (function () {
      var a = new kp();
      a.contains = function () {
        return !0;
      };
      a.Xb = function () {
        return !1;
      };
      return a;
    })();
  var rp = yj.$(),
    up = function (a) {
      q.call(this);
      this.j = [];
      this.Va = [];
      this.Qa = [];
      this.Sa = this.Ta = this.Ma = 0;
      this.T = new p(0, 0);
      this.S = new p(0, 0);
      this.ha = new p(0, 0);
      this.ya = new p(0, 0);
      this.Ea = new p(0, 0);
      this.U = new p(0, 0);
      sp(this);
      this.Ra = a;
      this.Ba = [];
      if (tp) for (a = 0; 100 > a; a++) this.Ba.push(new bp());
      this.Ka = !1;
      this.s = this.o = this.Da = this.ta = this.Na = this.ma = 0;
    };
  l(up, q);
  var vo = function (a) {
      a.Ka ||
        (Em(a.Ra, qp, function (b, c, d) {
          a.handleEvent(b, c, d);
        }),
        (a.Ka = !0));
    },
    to = function (a) {
      a.Ka && (Hm(a.Ra.i, qp), (a.Ka = !1), (a.W = !1), sp(a));
    },
    sp = function (a) {
      a.j = [];
      a.Qa = [];
      a.Ma = 0;
      a.T.x = 640;
      a.T.y = 360;
      a.S.x = 0;
      a.S.y = 0;
      a.ya.y = 360;
      a.ha.y = 0;
      a.ma = 0;
      a.Na = 0;
      a.ta = 0;
      a.Da = 0;
      a.o = 0;
      a.s = 0;
    },
    vp = function (a) {
      if (3 > a.Ma || 3 > a.j.length) return null;
      var b = a.S,
        c = a.T;
      var d = new Ll(b.x - c.x, b.y - c.y);
      var e = Ml(d),
        f = a.T.y,
        g = a.S.y;
      c = a.Ea;
      b = a.U;
      var k = d.y / 3,
        m = Ta(e / 320, 0, 1),
        w = 10 < a.Ma / ((d.x / 2 + d.y / 2) / 2);
      if (3 < d.x / d.y) return [2, m];
      if (
        3 > a.Na &&
        ((3 < d.y / d.x && 2 > a.ma) || (5 < d.y / d.x && 4 > a.ma))
      )
        return [0, m];
      var u = [[0], [0, 0], [0, 0, 0]];
      if (0 < d.y)
        for (var C = 0, Q = a.j.length; C < Q - 1; C++)
          for (
            var J = a.Qa[C], B = (a.j[C][1] - f) / d.y, R = 0;
            R < u.length;
            R++
          )
            u[R][Math.floor(Ta(B * (R + 1), 0, R))] += J;
      d = Ml(new Ll(b.x - c.x, b.y - c.y));
      C = e / 3;
      if (d < C && ((m = 1 - Ta(d / C, 0, 1)), u[1][0] > u[1][1] && !w))
        return [4, m];
      if (
        3 == a.ma ||
        (u[2][1] > 0.4 * u[0][0] &&
          ((c.y < f + k && b.y > g - k) || (b.y < f + k && c.y > g - k)))
      )
        return [6, m];
      e /= 6;
      m = Ya(a.ya, c);
      f = Xa(m);
      k = Ya(b, a.ya);
      g = Xa(k);
      if (
        f > e &&
        g > e &&
        ((m = Ua(m.x, m.y)),
        (k = Ua(k.x, k.y)),
        (270 < m && 90 > k) || (180 < m && 270 > m && 90 < k && 180 > k))
      )
        return (m = Ta(1 - Math.abs(f - Math.min(f, g)) / f, 0, 1)), [1, m];
      f = Ya(a.ha, c);
      c = Xa(f);
      b = Ya(b, a.ha);
      a = Xa(b);
      return c > e &&
        a > e &&
        ((e = Ua(f.x, f.y)),
        (b = Ua(b.x, b.y)),
        (90 > e && 270 < b) || (90 < e && 180 > e && 180 < b && 270 > b))
        ? ((m = Ta(1 - Math.abs(c - Math.min(c, a)) / c, 0, 1)), [3, m])
        : null;
    };
  up.prototype.ra = function (a) {
    a.save();
    var b = Ba() - this.Sa,
      c = !this.W && 500 > b;
    if (this.W || c)
      if ((c && (a.globalAlpha = 1 - b / 500), this.Ea && this.j.length)) {
        (c = vp(this))
          ? ((b = Jj[c[0]]),
            (c = c[1]),
            (c = Ta(c, 0, 1)),
            (b =
              "rgb(" +
              [
                Math.round(Db[0] + c * (b[0] - Db[0])),
                Math.round(Db[1] + c * (b[1] - Db[1])),
                Math.round(Db[2] + c * (b[2] - Db[2])),
              ].join() +
              ")"))
          : (b = "white");
        a.strokeStyle = b;
        a.lineWidth = 10;
        a.lineCap = "round";
        a.beginPath();
        a.moveTo(this.Ea.x, this.Ea.y);
        b = this.j.length;
        for (c = 0; c < b - 2; c++)
          a.quadraticCurveTo(
            this.j[c][0],
            this.j[c][1],
            (this.j[c][0] + this.j[c + 1][0]) / 2,
            (this.j[c][1] + this.j[c + 1][1]) / 2
          );
        1 < b &&
          a.quadraticCurveTo(
            this.j[c][0],
            this.j[c][1],
            this.j[c + 1][0],
            this.j[c + 1][1]
          );
        a.stroke();
        b = this.j.length;
        if (
          0 < b &&
          (a.beginPath(),
          a.arc(this.j[b - 1][0], this.j[b - 1][1], 10, 0, 2 * Math.PI),
          (a.fillStyle = "white"),
          a.fill(),
          tp)
        )
          for (
            a.globalCompositeOperation = "lighter",
              c = b - 1,
              b = this.U.x - (0 < c ? this.j[c - 1][0] : 0),
              c = this.U.y - (0 < c ? this.j[c - 1][1] : 0),
              b = Math.sqrt(b * b + c * c),
              b = Math.min(b, 1.5),
              c = 0;
            c < this.Ba.length;
            c++
          )
            this.W && this.Ba[c].ra(a),
              this.Ba[c].update(b, this.U.x, this.U.y);
      }
    a.restore();
  };
  var tp = !je,
    wp = function (a, b, c) {
      a.W &&
        ((a.W = !1),
        (a.U = new p(b, c)),
        (a.Sa = Ba()),
        (b = vp(a)),
        ua(b) && 0 < b.length ? ((a.Ta = b[0]), V(rp, 4, a.Ta)) : V(rp, 8));
    };
  up.prototype.handleEvent = function (a, b, c) {
    switch (a) {
      case "mousemove":
        if (8 > b || 8 > c || 632 < b || 352 < c) wp(this, b, c);
        else if (this.W) {
          this.j.push([b, c]);
          this.Va.push(new p(b, c));
          a = this.j.length - 1;
          if (0 < a) {
            a = this.j[a - 1];
            var d = a[1] - c,
              e = Math.abs(d);
            0 == this.Da && 3.75 < e
              ? (this.Na++, (this.Da = d / e))
              : 0 > d * this.Da
              ? ((this.s += e),
                15 < this.s && (this.Na++, (this.s = 0), (this.Da = d / e)))
              : 0 < d * this.Da &&
                ((this.s -= e), -7.5 > this.s && (this.s = 0));
            d = a[0] - b;
            e = Math.abs(d);
            0 == this.ta && 3.75 < e
              ? (this.ma++, (this.ta = d / e))
              : 0 > d * this.ta
              ? ((this.o += e),
                15 < this.o && (this.ma++, (this.o = 0), (this.ta = d / e)))
              : 0 < d * this.ta &&
                ((this.o -= e), -7.5 > this.o && (this.o = 0));
            a = Math.sqrt(Math.pow(b - a[0], 2) + Math.pow(c - a[1], 2));
            this.Qa.push(a);
            this.Ma += a;
          }
          this.T.x = Math.min(this.T.x, b);
          this.T.y = Math.min(this.T.y, c);
          this.S.x = Math.max(this.S.x, b);
          this.S.y = Math.max(this.S.y, c);
          c > this.ha.y && ((this.ha.x = b), (this.ha.y = c));
          c < this.ya.y && ((this.ya.x = b), (this.ya.y = c));
          this.U = new p(b, c);
          V(rp, 9);
        }
        break;
      case "mousedown":
        sp(this);
        for (a = 0; a < this.Ba.length; a++) ap(this.Ba[a], b, c);
        this.j = [];
        this.Va = [];
        this.W = !0;
        this.Ea = new p(b, c);
        V(rp, 7);
        break;
      case "mouseup":
        wp(this, b, c);
        break;
      case "mouseout":
        wp(this, b, c);
    }
  };
  var xp = Vm.$(),
    yp = function (a, b) {
      this.g = a;
      this.S = this.s = 0;
      Qe.$();
      var c = Ah[3];
      this.U = new p(-c / 2, 40);
      this.ha = new p(c / 2, 40);
      this.W = new p(-c / 2, 120);
      this.ma = new p(c / 2, 120);
      this.R = b;
    };
  l(yp, Zm);
  var zp = F([0, 1400, 1, 900, 2, 900, 3, 1200]);
  yp.prototype.Ha = function () {
    this.i = new q();
    this.i.i = 461;
    this.o = new P(Ah);
    v(this.o, this.U);
    r(
      this.o,
      new yo(
        this.R,
        L("Level Start - Ready"),
        -90,
        3,
        "black",
        "left",
        "'Itim', sans-serif",
        53,
        20,
        260,
        1,
        !1
      )
    );
    this.H = new P(Bh);
    v(this.H, this.W);
    r(
      this.H,
      new yo(
        this.R,
        L("Level Start - Set"),
        -90,
        3,
        "black",
        "left",
        "'Itim', sans-serif",
        53,
        20,
        260,
        1,
        !1
      )
    );
    this.V = new yo(
      this.R,
      L("Level Start - Draw!"),
      320,
      80,
      "white",
      "center",
      "'Itim', sans-serif",
      53,
      26.5,
      640,
      1,
      !0
    );
    v(this.V, 320, 80);
    this.T = new yo(
      this.R,
      Z.title,
      320,
      105,
      "white",
      "center",
      "'Itim', sans-serif",
      53,
      26.5,
      640,
      2,
      !0
    );
    this.s = 0;
    r(xp.g, this.i);
    r(xp.g, this.g);
    this.g.i = 2;
    v(this.g, Vk());
    x(this.g, Uk());
    Cl(this.g);
    Z.wa && r(xp.g, Z.wa);
    Z.jc && Hl(this.g);
    Ap(this, 0);
  };
  yp.prototype.Ia = function () {
    t(this.i);
    t(this.g);
    this.g.i = 0;
    Il(this.g);
    Z.wa && t(Z.wa);
  };
  yp.prototype.update = function (a) {
    this.s += a;
    if (this.s >= zp[this.S]) {
      this.s = 0;
      if (3 == this.S) return 1;
      Ap(this, this.S + 1);
    }
    return 0;
  };
  var Ap = function (a, b) {
    switch (b) {
      case 0:
        r(a.i, a.T);
        break;
      case 1:
        t(a.T);
        r(a.i, a.o);
        zb(a.o, 500, null, a.ha);
        break;
      case 2:
        r(a.i, a.H);
        zb(a.H, 500, null, a.ma);
        break;
      case 3:
        zb(a.o, 300, null, a.U), zb(a.H, 300, null, a.W), r(a.i, a.V);
    }
    a.S = b;
  };
  var Bp = Qe.$(),
    Cp = Vm.$(),
    Dp = function (a, b) {
      this.j = !1;
      this.i = new z();
      this.H = a;
      this.ma = new P(We);
      v(this.ma, 320, 180);
      r(this.i, this.ma);
      r(this.i, new Jn());
      this.W = new on(pn, qn, rn, sn, tn);
      v(this.W, 160, 170);
      r(this.i, this.W);
      this.ha = new on(un, un, vn, wn, xn);
      v(this.ha, 65, 250);
      r(this.i, this.ha);
      this.U = new on(yn, zn, An, Bn, Cn);
      v(this.U, 480, 170);
      r(this.i, this.U);
      this.T = new on(Dn, En, Fn, Gn, Hn);
      v(this.T, 575, 230);
      r(this.i, this.T);
      this.s = new z();
      var c = new P(fj);
      v(c, nj(c) / 2, 180);
      var d = new Um("#fff", 869, 360);
      v(d, nj(c) - 2, 0);
      var e = new P(gj);
      v(e, nj(c) + 865 + nj(e) / 2, 180);
      r(this.s, c);
      r(this.s, d);
      r(this.s, e);
      this.s.i = 462;
      r(this.i, this.s);
      this.g = new sk();
      r(this.i, this.g);
      this.V = new vj();
      v(this.V, 212, 89);
      this.V.i = 461;
      r(this.i, this.V);
      this.Ba = new Um("#000", 640, 360);
      this.Ba.i = 461;
      r(this.i, this.Ba);
      var f = this;
      this.S = new Bm(
        600,
        337,
        20,
        b,
        ji,
        null,
        function () {
          f.j = !0;
        },
        "",
        function (g) {
          this.va = g ? 1 : 0.8;
        }
      );
      x(this.S, 0.5);
      this.S.va = 0.8;
      this.S.i = 470;
      r(this.i, this.S);
      this.R = new P(Re);
      this.o = new P(Se);
      r(this.R, this.o);
      v(this.R, 48, 337);
      this.R.i = 470;
      x(this.R, 0.8);
      r(this.i, this.R);
    };
  l(Dp, Zm);
  var Ep = [Le(Bp, 1), Le(Bp, 20), K.g.vb.s];
  Dp.prototype.Ha = function () {
    te();
    K.g.Wb.s.g();
    Gm(this.S);
    this.S.g = !0;
    this.o.va = 0;
    this.R.g = !0;
    this.R.va = 0.8;
    A(this.o, new W(this.o, 600, 0, 0.8));
    A(this.o, new W(this.o, 600, 0.8, 0));
    A(this.o, new W(this.o, 600, 0, 0.8));
    A(this.o, new W(this.o, 600, 0.8, 0));
    A(this.o, new W(this.o, 600, 0, 0.8));
    yb(this.o, new W(this.R, 600, 0.8, 0));
    A(this.o, new W(this.o, 600, 0.8, 0));
    oj(this.ma, We);
    v(this.H, 320, 224);
    this.H.ka(17);
    r(this.i, this.H);
    this.T.g = !0;
    this.U.g = !0;
    this.ha.g = !0;
    this.W.g = !0;
    this.s.g = !1;
    this.g.g = !1;
    this.g.ka(0);
    v(this.Ba, 640, 0);
    this.ya = new P(tk);
    v(this.ya, -35, 60);
    this.V.ka(0);
    U(this.V, 1, wj);
    r(Cp.g, this.i);
    D(this.i, 0, function () {
      K.g.vb.play(0, !1);
    });
    var a = this;
    U(this.H, 18, xl, null, null, function () {
      U(a.W, 1, 0);
      U(a.U, 1, 83);
      U(a.T, 1, 166);
    });
    D(this.i, 4731, function () {
      v(a.g, 300, 125);
      a.g.g = !0;
    });
    U(this.g, 1, uk);
    U(this.g, 2, 498);
    U(this.g, 3, 996);
    D(this.g, 0, function () {
      v(a.s, -1958, 0);
      a.s.g = !0;
      wb(a.s, 996);
      zb(a.s, 1660, null, new p(640, 0));
    });
    U(this.g, 4, vk, null, null, function () {
      r(a.g, a.ya);
    });
    U(this.g, 5, wk, null, null, function () {
      a.g.removeChild(a.ya);
    });
    U(this.g, 7, xk);
    D(this.g, 240, function () {
      Fp(a);
    });
    Nb(Lk, ra);
  };
  var Fp = function (a) {
    oj(a.ma, Xe);
    a.T.g = !1;
    a.U.g = !1;
    a.ha.g = !1;
    a.W.g = !1;
    U(a.H, 19, 0);
    U(a.V, 2, 0);
    D(a.g, 1162, function () {
      U(a.g, 6, 0);
      zb(a.g, 830, null, new p(640 + nj(a.g) / 2, 125));
    });
    U(a.H, 20, vl);
    U(a.H, 21, wl);
    U(a.H, 8, yl, null, null, function () {
      zb(a.Ba, 1e3, null, new p(0, 0));
      a.S.g = !1;
      a.R.g = !1;
    });
    zb(a.H, 1e3, new p(340, 224), new p(640 + nj(a.H) / 2, 224));
    D(a.H, 1e3, function () {
      a.j = !0;
    });
  };
  Dp.prototype.Ia = function () {
    t(this.ya);
    Im(this.S);
    E(this.i);
    E(this.T);
    E(this.U);
    E(this.ha);
    E(this.W);
    E(this.g);
    E(this.s);
    E(this.H);
    E(this.o);
    Bd(K.g.vb);
    t(this.i);
  };
  var Gp = yj.$(),
    Hp = Vm.$(),
    Ip = function (a) {
      this.j = !1;
      this.H = new z();
      this.g = a;
      this.i = new P(kh);
      this.i.i = 461;
      xb(this.i, new zj(this.i, 0.5, 4));
      r(this.H, this.i);
      this.R = new Yn(
        L("Level Complete"),
        0,
        -60,
        "'Itim', sans-serif",
        53,
        "white",
        "center"
      );
      this.R.va = 0.8;
      r(this.i, this.R);
      this.o = new P(cf);
      v(this.o, 0, 40);
      r(this.i, this.o);
      this.s = 0;
      Gp.addListener(this);
    };
  l(Ip, Zm);
  var Jp = [
    new p(-190, 40),
    new p(-98, 40),
    new p(5, 40),
    new p(111, 40),
    new p(220, 40),
  ];
  Ip.prototype.Ha = function () {
    K.g.Vb.play();
    v(this.g, Vk());
    r(this.H, this.g);
    r(Hp.g, this.H);
    for (var a = 0; a < this.s; a++) {
      var b = new P(lh);
      v(b, Jp[a]);
      r(this.o, b);
    }
    a = new P(lh);
    v(a, Jp[this.s]);
    a.va = 0;
    r(this.o, a);
    v(this.i, 640 + nj(this.i) / 2, 180);
    U(this.g, 9, 500);
    D(this.g, 0, function () {
      K.g.Hc.play();
    });
    D(this.g, 1e3, function () {
      K.g.Gc.play();
    });
    wb(this.g, tl - 1e3);
    Bd(Wk());
    K.g.Vb.play();
    A(this.g, new vb(this.i, 500, null, new p(320, 180)));
    wb(this.g, 200);
    D(this.g, 0, function () {
      K.g.Bc.play();
    });
    A(this.g, new W(a, 200, 0, 1));
    var c = this;
    wb(this.g, 200);
    U(this.g, 0, 0);
    wb(this.g, 1e3);
    A(this.g, new vb(this.i, 500, null, new p(-nj(this.i) / 2, 180)));
    D(this.g, 500, function () {
      c.j = !0;
    });
  };
  Ip.prototype.Ia = function () {
    E(this.g);
    ab(this.o);
    t(this.H);
  };
  Ip.prototype.La = function (a, b) {
    12 == a && (this.s = b);
  };
  var Kp = yj.$(),
    Lp = Vm.$(),
    Mp = function (a, b) {
      this.j = !1;
      this.i = a;
      this.o = b;
      this.g = new Um("black", 640, 360);
      this.g.i = 461;
    };
  l(Mp, Zm);
  var Np = null,
    Op = null;
  Mp.prototype.Ha = function () {
    Z = Tk[this.i];
    Nb(Xk(), ra);
    Np
      ? oj(Np, Z.background)
      : ((Np = new P(Z.background)), (Np.i = -1), v(Np, 320, 180), r(Lp.g, Np));
    v(Np, Z.backgroundPosition || hj);
    Op ? ab(Op) : ((Op = new q()), r(Lp.g, Op));
    for (var a = Z.$a, b = 0; b < a.length; b++) {
      var c = new P(a[b]);
      void 0 != a[b][0].z && (c.i = a[b][0].z);
      r(Op, c);
    }
    uo(this.o);
    V(Kp, 12, this.i);
    this.j = !0;
    r(Lp.g, this.g);
    Wk().play(0, !0);
  };
  Mp.prototype.reset = function () {
    Op = Np = null;
  };
  Mp.prototype.Ia = function () {
    t(this.g);
  };
  var Pp = function (a) {
    P.call(this, a);
    this.i = 462;
    v(this, hj);
  };
  l(Pp, P);
  var Qp = function (a) {
    A(
      a,
      new y(2e3, function (b) {
        cb(a, (0.1 * 17) / b);
      })
    );
    D(a, 0, function () {
      Qp(a);
    });
  };
  var Rp = Vm.$(),
    Up = function (a, b) {
      this.j = !1;
      this.H = a;
      this.s = b || null;
      this.g = new z();
      this.o = new Um(Sp[this.H], 640, 360);
      this.o.i = 461;
      r(this.g, this.o);
      this.i = new Pp(Tp[this.H]);
      r(this.g, this.i);
    };
  l(Up, Zm);
  var Sp = F([0, "white", 1, "black"]),
    Tp = F([0, [0, 83, 0, 80, 80], 1, [0, 0, 0, 80, 80]]);
  Up.prototype.Ha = function () {
    this.i.va = 0;
    db(this.i);
    cb(this.i, -20);
    Qp(this.i);
    Vp(this);
    r(Rp.g, this.g);
  };
  Up.prototype.Ia = function () {
    t(this.g);
    E(this.g);
    E(this.i);
  };
  var Vp = function (a) {
    Nb(a.s || Xk(), function () {
      E(a.g);
      0 < a.i.va && A(a.g, new W(a.i, 200, a.i.va, 0));
      D(a.g, 0, function () {
        a.j = !0;
      });
    });
    wb(a.g, 500);
    A(a.g, new W(a.i, 200, 0, 1));
  };
  var Wp = Vm.$(),
    Xp = function (a) {
      this.j = !1;
      this.o = new q();
      this.g = a;
      this.i = new Um("#000", 640, 360);
      this.i.i = 461;
      r(this.o, this.i);
    };
  l(Xp, Zm);
  Xp.prototype.Ha = function () {
    r(this.o, this.g);
    r(Wp.g, this.o);
    v(this.i, 0, 0);
    var a = Vk();
    v(this.g, -nj(this.g) / 2, a.y);
    x(this.g, Uk());
    var b = this;
    A(this.i, new vb(this.i, 1e3, null, new p(-640, 0)));
    wb(this.g, 200);
    Gl(this.g, a, function () {
      b.j = !0;
    });
  };
  Xp.prototype.Ia = function () {
    E(this.g);
    E(this.i);
    t(this.o);
  };
  var Yp = Vm.$(),
    Zp = function (a) {
      this.j = !1;
      this.i = new q();
      this.g = a;
    };
  l(Zp, Zm);
  Zp.prototype.Ha = function () {
    r(this.i, this.g);
    r(Yp.g, this.i);
    var a = Vk(),
      b = this;
    v(this.g, a);
    x(this.g, Uk());
    Gl(this.g, new p(640 + nj(this.g) / 2, a.y), function () {
      b.j = !0;
    });
  };
  Zp.prototype.Ia = function () {
    E(this.g);
    t(this.i);
  };
  var $p = function () {
    this.g = this.i = this.o = 0;
    yj.$().addListener(this);
  };
  sa($p);
  var aq = { 0: !0, 1: !0, 5: !0, 10: !0, 11: !0, 12: !0 };
  $p.prototype.reset = function () {
    this.g = this.i = this.o = 0;
  };
  $p.prototype.La = function (a, b) {
    2 == a
      ? (this.o = b)
      : 3 == a
      ? (this.i = b)
      : 12 == a
      ? (this.g = b)
      : 15 == a && this.reset();
  };
  $p.prototype.log = function (a, b) {
    if (!aq[a]) {
      var c = Ba(),
        d = this.j ? c - this.j : 0;
      this.j = c;
      c = Ao();
      c = c.width > c.height;
      Je(
        [
          "halloween16",
          "s:" + a,
          "v:" + (oa(b) ? b : "_"),
          "gs:" + this.o,
          "ls:" + this.i,
          "l:" + this.g,
          "dt:" + d,
          "t:" + (oa(je) ? (je ? "1" : "0") : "_"),
          "w:" + (oa(c) ? (c ? "1" : "0") : "_"),
          "o:" +
            ("orientation" in window ? parseInt(window.orientation, 10) : "_"),
        ].join()
      );
    }
  };
  var bq = $p.$(),
    dq = function (a) {
      this.o = a;
      cq(this);
      this.o[this.j].Ha();
    },
    cq = function (a) {
      oa(a.j) && a.o[a.j] && a.o[a.j].Ia();
      a.s = 0;
      if (!co() || (pe() && (!ee || ge))) a.s = 1;
      a.j = eq[a.s];
    },
    eq = [
      2, 22, 3, 24, 13, 10, 4, 9, 5, 6, 19, 11, 12, 21, 14, 10, 5, 6, 19, 11,
      12, 21, 15, 10, 5, 6, 19, 11, 12, 21, 16, 10, 5, 6, 19, 11, 12, 21, 17,
      18, 5, 6, 20, 8, 23,
    ];
  dq.prototype.update = function (a) {
    if ((a = this.o[this.j].update(a))) {
      if (1 == a && this.s < eq.length - 1) a = eq[++this.s];
      else {
        var b = eq.indexOf(a);
        -1 != b && (this.s = b);
      }
      this.o[this.j].Ia();
      this.j = a;
      this.o[this.j].Ha();
      bq.log(a);
    }
  };
  var fq = function (a) {
    return 3 * a * a - 2 * a * a * a;
  };
  var gq = function (a) {
    q.call(this);
    this.o = this.j = 0;
    this.S = Qj[a];
    this.s = Ij[a];
    this.T = je ? Eb : Fb;
    v(this, Rj[a].x, Rj[a].y);
  };
  l(gq, q);
  gq.prototype.update = function (a) {
    this.j += a;
    this.o = fq(Ta((this.j % 2e3) / 1e3, 0, 1));
  };
  gq.prototype.ra = function (a) {
    a.save();
    a.lineWidth = 10;
    a.lineCap = "round";
    a.lineJoin = "round";
    a.strokeStyle = this.s;
    var b = Cb(a, this.o, this.S);
    b = new p(lb(b, 1), mb(b, 1));
    this.T(a, b.x, b.y);
    a.restore();
  };
  var hq = yj.$(),
    iq = Vm.$(),
    jq = function (a, b, c, d, e) {
      this.j = !1;
      this.V = d;
      this.g = e;
      this.wa = new z();
      this.T = b;
      this.R = [];
      this.U = a;
      this.o = new q();
      v(this.o, 320, 70);
      this.o.i = 465;
      r(this.wa, this.o);
      this.o.g = !1;
      r(
        this.o,
        new yo(
          this.U,
          L("Tutorial"),
          0,
          0,
          "white",
          "center",
          "'Itim', sans-serif",
          50,
          20,
          400,
          2,
          !0
        )
      );
      this.s = new gq(b);
      this.s.i = 464;
      this.s.g = !1;
      r(this.wa, this.s);
      this.i = 0;
    };
  l(jq, Zm);
  h = jq.prototype;
  h.Ha = function () {
    hq.addListener(this);
    v(this.g, 320, 180);
    Cl(this.g);
    r(this.wa, this.g);
    this.S = Wl([this.T], 550, 198);
    v(this.S, 690, 180);
    this.H = new Ib(-20, -30);
    this.H.g = !1;
    r(this.S, this.H);
    this.R.push(this.S);
    r(this.wa, this.S);
    this.H && (this.H.g = !1);
    this.s.g = !1;
    r(iq.g, this.wa);
    this.ka(1);
    vo(this.V);
  };
  h.Ia = function () {
    to(this.V);
    E(this.wa);
    E(this.g);
    hq.removeListener(this);
    for (var a = 0; a < this.R.length; a++) this.wa.removeChild(this.R[a]);
    this.R = [];
    t(this.wa);
    this.i = 0;
  };
  h.update = function () {
    return 6 == this.i ? 1 : 0;
  };
  h.La = function (a, b) {
    switch (a) {
      case 4:
        if (b != this.T) {
          this.ka(3);
          Fl(this.g);
          break;
        }
        Dl(this.g, b);
        for (var c = 0; c < this.R.length; c++) this.R[c].Bb(b);
        Sj[b] ? Sj[b].play() : K.g.Kb.play();
        this.H && this.H.g && xb(this.wa, new W(this.H, 200, 1, 0));
        break;
      case 5:
        var d = this;
        A(
          this.wa,
          new y(500, null, function () {
            d.ka(5);
          })
        );
        break;
      case 8:
        if (3 == this.i || 2 == this.i) this.ka(3), Fl(this.g);
        break;
      case 7:
        if (3 == this.i || 2 == this.i) this.ka(4), El(this.g);
        break;
      case 9:
        (3 != this.i && 2 != this.i && 4 != this.i) || El(this.g);
    }
  };
  h.ka = function (a) {
    switch (a) {
      case 1:
        kq(this);
        break;
      case 2:
        lq(this);
        break;
      case 3:
        this.o.g = !0;
        this.s.g = !0;
        break;
      case 4:
        E(this.wa);
        this.o.g = !1;
        this.s.g = !1;
        break;
      case 5:
        to(this.V);
        this.o.g = !1;
        this.s.g = !1;
        this.o.g = !1;
        var b = this;
        D(this.g, 1e3, function () {
          b.ka(6);
        });
    }
    this.i = a;
  };
  var kq = function (a) {
      U(a.g, 12, 500);
      U(a.g, 13, 1e3);
      U(a.g, 0, ul);
      zb(a.S, 2e3, null, new p(490, 180), function () {
        a.ka(2);
      });
    },
    lq = function (a) {
      Cl(a.g);
      a.o.g = !0;
      a.H && (a.H.g = !0);
      A(
        a.wa,
        new y(2e3, null, function () {
          a.ka(3);
        })
      );
    };
  var mq = Vm.$(),
    nq = function () {
      this.j = !1;
      this.g = new Um("#000", 640, 360);
      this.g.i = 461;
    };
  l(nq, Zm);
  nq.prototype.Ha = function () {
    r(mq.g, this.g);
    v(this.g, 640, 0);
    A(this.g, new vb(this.g, 1e3, new p(640, 0), new p(0, 0)));
    var a = this;
    A(
      this.g,
      new y(1e3, null, function () {
        a.j = !0;
      })
    );
  };
  nq.prototype.Ia = function () {
    E(this.g);
    t(this.g);
  };
  var oq = function () {
    this.T = this.U = this.W = this.g = this.H = null;
    this.ma = !1;
    this.R = null;
    this.ha = this.S = this.i = !1;
    this.o = !0;
    this.j = this.V = !1;
    this.s = null;
  };
  oq.prototype.reset = function () {
    this.T = this.U = this.W = this.g = this.H = null;
    this.ma = !1;
    this.R = null;
    this.ha = this.S = this.i = !1;
    this.o = !0;
    this.j = this.V = !1;
    this.s = null;
  };
  var qq = function (a) {
      a.i &&
        (a.j
          ? (pq.call(document), (a.j = !1))
          : (a.R.call(a.g),
            a.s &&
              (window.screen.lockOrientation &&
                window.screen.lockOrientation(a.s),
              window.screen.orientation &&
                window.screen.orientation.lock &&
                window.screen.orientation.lock(a.s)["catch"](ra))));
    },
    tq = function (a, b, c, d) {
      var e = rq;
      d = void 0 === d ? ra : d;
      var f = void 0 === f ? !0 : f;
      e.g = a;
      e.H = b;
      e.W = d;
      e.R = a[xe(a, "requestFullscreen")];
      a = !!(document[xe(document, "fullscreenEnabled")] && e.R && pq);
      if (qe()) throw "";
      b = ie ? !1 : (pe() && !(ge || he)) || (me && je);
      e.i = b && a;
      e.S = f && fo();
      e.ha = !f && fo();
      e.o = !0;
      if (e.i || e.S)
        re(document.body, "margin", "0"),
          re(e.g, "overflow", "visible", "width", "100%", "height", "100%"),
          (document.body.scrollLeft = 0),
          c ? Oo(c, window, "scroll", sq) : $c(window, "scroll", sq, !0);
    },
    uq = function () {
      var a = rq;
      return function (b) {
        "mousedown" == b && (a.j = !0);
      };
    };
  oq.prototype.close = function () {
    this.j = !0;
    qq(this);
  };
  oq.prototype.update = function () {
    if (!this.ha && (this.i || this.S)) {
      var a = !!document[vq],
        b = window.innerWidth,
        c = window.innerHeight;
      (0 == window.scrollX && 0 == window.scrollY) || window.scrollTo(0, 0);
      if (b != this.U || c != this.T || a != this.ma || this.o) {
        this.V = b < c;
        for (var d = !1, e = 0; e < this.H.length; ++e) {
          var f = this.H[e],
            g = f.width || f.dataset.width,
            k = f.height || f.dataset.height;
          if (qe()) throw "";
          fo() && je && !ge && !ie && 0 == e && (d = g < k != this.V);
          var m = d ? Math.min(b / k, c / g) : Math.min(b / g, c / k);
          g = m * g;
          k = m * k;
          if (d) {
            m = (b - k) / 2 + k;
            var w = (c - g) / 2;
            var u = "rotate(90deg)";
          } else (m = (b - g) / 2), (w = (c - k) / 2), (u = "");
          ve(f, "TransformOrigin", "0 0");
          ve(f, "Transform", u);
          re(
            f,
            "position",
            "absolute",
            "width",
            g + "px",
            "height",
            k + "px",
            "left",
            m + "px",
            "top",
            w + "px"
          );
        }
        Pb(ce, "CriOS") ||
          (document.body.clientWidth > b &&
            0 < b &&
            re(document.body, "width", b + "px"));
        re(this.g, "height", "100%", "width", "100%");
        this.W(d);
        this.U = b;
        this.T = c;
        this.ma = a;
        this.o = !1;
      }
    }
  };
  sa(oq);
  var vq = xe(document, "fullscreenElement"),
    pq = document[xe(document, "exitFullscreen")],
    sq = function (a) {
      a.preventDefault();
      a.stopPropagation();
      return !1;
    };
  var rq = oq.$(),
    Bq = function (a, b, c, d) {
      c = void 0 === c ? [] : c;
      d = void 0 === d ? 6e4 : d;
      Hc.call(this);
      this.j = b;
      this.W = Ao();
      this.H = new Mo(this);
      Ic(this, Aa(Jc, this.H));
      var e = this;
      this.U = new fp(
        d,
        function () {
          wq();
          Cd();
        },
        function () {
          var f = xq;
          f && !f.R && ((f.R = !0), (f.V = Ba()), f.s || ((f.s = !0), yq(f)));
          f = ud;
          f.j && f.j.gain.setValueAtTime(1, f.g.currentTime);
          f.s = !1;
        }
      );
      Ic(this, Aa(Jc, this.U));
      this.i = new lp(b, a, this.U);
      Oo(
        this.H,
        a,
        ["mousedown", "mouseout", "touchstart"],
        function (f) {
          e.i.handleEvent(f);
        },
        !0
      );
      Oo(
        this.H,
        document,
        ["mouseup", "mousemove", "touchend", "touchmove", "contextmenu"],
        function (f) {
          e.i.handleEvent(f);
        },
        !0
      );
      tq(a, [b].concat(c), this.H, function (f) {
        mp(e.i, f);
      });
      zq(this, b);
      this.Ba = Me;
      this.V = mh;
      this.s = 0.5;
      this.ya = !0;
      this.T = this.V[3];
      this.ha = this.V[4];
      this.R = 0;
      this.ma = kn(this.R, 0, this.T + 10, this.ha + 10);
      Em(this, this.ma, uq());
      Aq(this);
    };
  l(Bq, Hc);
  Bq.prototype.g = function () {
    rq.reset();
    Bq.Ca.g.call(this);
  };
  Bq.prototype.update = function () {
    rq.update();
    var a = Ao();
    ((document[vq] && (this.W.width != a.width || this.W.height != a.height)) ||
      this.ya) &&
      0 < parseInt(getComputedStyle(this.j).width, 10) &&
      ((this.W = a), Aq(this), (this.ya = !1));
  };
  var Aq = function (a) {
      a.s =
        ((26 / a.T) * a.j.width) / parseInt(getComputedStyle(a.j).width, 10);
      a.R = a.j.width - a.s * (10 + a.T);
      var b = a.s * (10 + a.ha);
      a.ma.g = [a.R, 0, a.j.width, 0, a.j.width, b, a.R, b];
      a = a.i;
      op(a, "areamove", a.H, a.s);
    },
    Cq = function (a, b) {
      document[vq] && a.Ba.ra(a.V, b, a.R, 10 * a.s, a.s);
    },
    zq = function (a, b) {
      Oo(a.H, b, "touchend", function () {
        qq(rq);
      });
    },
    Em = function (a, b, c) {
      a.i.i.push(new pp(b, c));
    };
  var Dq = function (a, b, c) {
      this.o = a;
      this.H = b;
      this.s = {};
      this.duration = 400;
      this.R = fq || pb;
      this.j = c || se;
      this.g = null;
      this.i = !1;
    },
    Fq = function (a) {
      var b = Math.min(Math.max(Eq(a) / a.duration, 0), 1);
      a.i && (b = 1 - b);
      for (var c in a.o)
        a.H.hasOwnProperty(c) && (a.s[c] = qb(b, a.o[c], a.H[c], a.R));
      return a.s;
    },
    Eq = function (a) {
      return null === a.g ? 0 : a.j() - a.g;
    };
  Dq.prototype.start = function () {
    this.g = this.j();
    this.i = !1;
  };
  Dq.prototype.resume = function () {
    if (null === this.g) this.start();
    else if (this.i) {
      var a = Math.min(this.duration, Eq(this));
      this.g = this.j() - (this.duration - a);
      this.i = !1;
    }
  };
  Dq.prototype.reset = function () {
    this.g = null;
  };
  var Gq = function (a, b) {
    Hc.call(this);
    this.j = !1;
    this.i = a;
    this.s = b || null;
    this.H = function () {
      return !1;
    };
    this.Db = null;
    eo() && (this.i.style.willChange = "width,height");
  };
  ha(Gq, Hc);
  var nn = function (a, b) {
    b = void 0 === b ? function () {} : b;
    var c = void 0 === c ? 0 : c;
    if (a.i && eo() && !a.j) {
      var d = a.i;
      if (oe()) {
        window.parent.postMessage(
          {
            cmd: "resizeDoodle",
            width: "640px",
            height: "360px",
            duration: "400ms",
          },
          "chrome-search://local-ntp"
        );
        a.j = !0;
        var e = !1;
        a.Db = setTimeout(function () {
          e = !0;
          b();
        }, 500);
        window.addEventListener("message", function (C) {
          "resizeComplete" === C.data.Zc &&
            (null !== this.Db && (clearTimeout(this.Db), (this.Db = null)),
            e || ((e = !0), b()));
        });
      } else {
        ne() && re(d.parentNode, "width", "100%");
        var f = d.offsetHeight,
          g = d.offsetWidth;
        c = Math.min(640, d.parentNode.clientWidth) - 2 * c;
        var k = c / (640 / 360),
          m = an.$(),
          w = se(),
          u = new Dq(
            { height: f, width: g },
            { height: k, width: c },
            function () {
              return w;
            }
          );
        u.start();
        a.j = !0;
        a.H = function (C) {
          w = void 0 !== C ? w + C : se();
          C = Fq(u);
          Ee(d, Math.round(C.width), Math.round(C.height));
          a.s && mp(a.s, !1);
          return Eq(u) >= u.duration
            ? (b(),
              (a.i.style.willChange = "unset"),
              (a.H = function () {
                return !1;
              }),
              !1)
            : !0;
        };
        en(m, function () {
          return a.H();
        });
      }
    }
  };
  Gq.prototype.g = function () {
    Hc.prototype.g.call(this);
    this.reset();
    this.i = null;
  };
  Gq.prototype.reset = function () {
    this.j &&
      (re(this.i, "width", "", "height", ""),
      De(0),
      (this.i.style.width = ""),
      (this.i.style.height = ""));
    this.j = !1;
  };
  Gq.prototype.update = function (a) {
    this.H(a);
  };
  var Hq = function () {
    this.o = this.i = null;
    this.g = {};
    this.H = null;
    this.kb = Number.MIN_VALUE;
    this.min = Number.MAX_VALUE;
    this.j = this.s = 0;
  };
  sa(Hq);
  Hq.prototype.update = function () {
    var a = self.performance ? self.performance.now() : Date.now();
    if (this.i) {
      var b = a - this.i,
        c = Math.round(1e3 / b);
      c > this.kb && (this.kb = c);
      c < this.min && (this.min = c);
      this.s++;
      this.j += b;
      b = Math.round((1e3 * this.s) / this.j);
      this.g[a] = c;
      this.H = {
        now: c,
        ad: Iq(this, 1e3, a),
        $c: Iq(this, 5e3, a),
        hd: { Lc: b, kb: this.kb, min: this.min },
      };
    }
    this.i = a;
    for (var d in this.g) Number(d) + 5100 < a && delete this.g[d];
    return this.H;
  };
  var Kq = function (a) {
      var b = Jq;
      b.o || (b.o = a);
    },
    Iq = function (a, b, c) {
      var d = [],
        e = Number.MIN_VALUE,
        f = Number.MAX_VALUE,
        g;
      for (g in a.g)
        Number(g) + b >= c &&
          (a.g[g] > e && (e = a.g[g]),
          a.g[g] < f && (f = a.g[g]),
          d.push(a.g[g]));
      return { Lc: Math.round(Wa.apply(null, d)), kb: e, min: f };
    };
  var Lq = function (a, b) {
    window.google &&
      google.doodle &&
      (b && Da("google.doodle.cpDestroy", b),
      Da("google.doodle.cpInit", function () {
        b && b();
        a();
      }));
  };
  var ud = K.$(),
    Me = Qe.$(),
    Jq = Hq.$(),
    Wm = Vm.$(),
    Mq = function (a, b) {
      Bq.call(this, a, b);
    };
  ha(Mq, Bq);
  var Nq = function (a, b) {
    Hc.call(this);
    this.j = b.getContext("2d");
    Kq(this.j);
    this.i = new Mq(a, b);
    Ic(this, Aa(Jc, this.i));
    var c = this.i.i,
      d = this.i.H;
    this.R = !0;
    this.s = !1;
    this.V = Ba();
    this.H = null;
    eo() &&
      ((this.H = new Gq(a, c)),
      Ic(this, Aa(Jc, this.H)),
      co() ||
        (nn(this.H, function () {
          var g = an.$();
          g.R = !0;
          hn(g);
        }),
        an.$().start()));
    c = new sl();
    var e = new up(this.i);
    e.i = 461;
    r(Wm.g, e);
    var f = new so(c, e);
    c = F([
      2,
      new mn(this.i, this.H),
      6,
      f,
      3,
      new Dp(c, this.i),
      5,
      new yp(c, this.j),
      7,
      new Zo(this.i, !1, this.j),
      8,
      new Zo(this.i, !0, this.j),
      4,
      new jq(this.j, 2, d, e, c),
      9,
      new jq(this.j, 0, d, e, c),
      10,
      new Xp(c),
      11,
      new Zp(c),
      12,
      new nq(),
      13,
      new Mp(0, f),
      14,
      new Mp(1, f),
      15,
      new Mp(2, f),
      16,
      new Mp(3, f),
      17,
      new Mp(4, f),
      18,
      new On(c),
      19,
      new Ip(c),
      20,
      new Mn(c),
      21,
      new Up(1),
      22,
      new Up(0, Ep),
      23,
      new Up(0),
      24,
      new Up(1, Lk),
    ]);
    this.U = [c[13], c[14], c[15], c[16], c[17]];
    this.T = new dq(c);
    Oo(
      d,
      a,
      "contextmenu",
      function (g) {
        g.preventDefault();
      },
      !1
    );
  };
  ha(Nq, Hc);
  Nq.prototype.g = function () {
    for (var a = 0, b; (b = this.U[a++]); ) b.reset();
    cq(this.T);
    Wm.reset();
    Hc.prototype.g.call(this);
  };
  Nq.prototype.start = function () {
    !this.i.U.H || he ? ((this.s = !0), yq(this)) : wq();
  };
  var yq = function (a) {
      if (a.R) {
        requestAnimationFrame(function () {
          yq(a);
        });
        var b = Ba(),
          c = Math.min(b - a.V, 50);
        a.V = b;
        a.T.update(c);
        Ym(c, a.j);
        a.i.update();
        Cq(a.i, a.j);
      } else a.s = !1;
    },
    Oq = function () {
      var a = document.getElementById("hplogo"),
        b = a ? a.querySelector("canvas") : null;
      Ne(function () {
        xq = new Nq(a, b);
        xq.start();
      });
      zd(a);
      K.g.vb.s.g();
    },
    wq = function () {
      var a = xq;
      a && (a.R = !1);
    },
    xq = null;
  (function (a, b) {
    var c = function () {
      a();
      window.lol && window.lol();
    };
    Lq(c, b);
    c();
  })(
    function () {
      var a = document.getElementById("hplogo"),
        b = a ? a.querySelector("canvas") : null;
      b &&
        (co()
          ? Oq()
          : $c(b, "click", function () {
              Oq();
              if (b)
                if (Oc(b)) b.Nb("click");
                else {
                  var c = cd(b);
                  if (c) {
                    var d = 0,
                      e = "click".toString(),
                      f;
                    for (f in c.g)
                      if (!e || f == e)
                        for (var g = c.g[f].concat(), k = 0; k < g.length; ++k)
                          hd(g[k]) && ++d;
                  }
                }
            }));
    },
    function () {
      Cd();
      for (var a = Me, b = 0, c; (c = a.g[b]); b++) c.j = [];
      wq();
      Jc(xq);
      xq = null;
    }
  );
}).call(this);
