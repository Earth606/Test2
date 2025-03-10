! function() {
    var e, t, o, n, r = {
            frameRate: 150,
            animationTime: 600,
            stepSize: 80,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            fixedBackground: !0,
            excluded: ""
        },
        a = r,
        l = !1,
        i = {
            x: 0,
            y: 0
        },
        c = !1,
        u = document.documentElement,
        s = [],
        d = /^Mac/.test(navigator.platform),
        f = 37,
        m = 38,
        h = 39,
        w = 40,
        v = 32,
        p = 33,
        y = 34,
        b = 35,
        g = 36,
        S = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        };

    function x() {
        if (!c && document.body) {
            c = !0;
            var n = document.body,
                r = document.documentElement,
                i = window.innerHeight,
                s = n.scrollHeight;
            if (u = document.compatMode.indexOf("CSS") >= 0 ? r : n, e = n, a.keyboardSupport && q("keydown", B), top != self) l = !0;
            else if (le && s > i && (n.offsetHeight <= i || r.offsetHeight <= i)) {
                var d, f = document.createElement("div");
                f.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + u.scrollHeight + "px", document.body.appendChild(f), o = function() {
                    d || (d = setTimeout((function() {
                        f.style.height = "0", f.style.height = u.scrollHeight + "px", d = null
                    }), 500))
                }, setTimeout(o, 10), q("resize", o);
                if ((t = new G(o)).observe(n, {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    }), u.offsetHeight <= i) {
                    var m = document.createElement("div");
                    m.style.clear = "both", n.appendChild(m)
                }
            }
            a.fixedBackground || (n.style.backgroundAttachment = "scroll", r.style.backgroundAttachment = "scroll")
        }
    }
    var k = [],
        D = !1,
        M = Date.now();

    function E(e, t, o) {
        var n, r;
        if (n = (n = t) > 0 ? 1 : -1, r = (r = o) > 0 ? 1 : -1, (i.x !== n || i.y !== r) && (i.x = n, i.y = r, k = [], M = 0), 1 != a.accelerationMax) {
            var l = Date.now() - M;
            if (l < a.accelerationDelta) {
                var c = (1 + 50 / l) / 2;
                c > 1 && (c = Math.min(c, a.accelerationMax), t *= c, o *= c)
            }
            M = Date.now()
        }
        if (k.push({
                x: t,
                y: o,
                lastX: t < 0 ? .99 : -.99,
                lastY: o < 0 ? .99 : -.99,
                start: Date.now()
            }), !D) {
            var u = J(),
                s = e === u || e === document.body;
            null == e.$scrollBehavior && function(e) {
                var t = L(e);
                if (null == Y[t]) {
                    var o = getComputedStyle(e, "")["scroll-behavior"];
                    Y[t] = "smooth" == o
                }
                return Y[t]
            }(e) && (e.$scrollBehavior = e.style.scrollBehavior, e.style.scrollBehavior = "auto");
            var d = function(n) {
                for (var r = Date.now(), l = 0, i = 0, c = 0; c < k.length; c++) {
                    var u = k[c],
                        f = r - u.start,
                        m = f >= a.animationTime,
                        h = m ? 1 : f / a.animationTime;
                    a.pulseAlgorithm && (h = Z(h));
                    var w = u.x * h - u.lastX >> 0,
                        v = u.y * h - u.lastY >> 0;
                    l += w, i += v, u.lastX += w, u.lastY += v, m && (k.splice(c, 1), c--)
                }
                s ? window.scrollBy(l, i) : (l && (e.scrollLeft += l), i && (e.scrollTop += i)), t || o || (k = []), k.length ? U(d, e, 1e3 / a.frameRate + 1) : (D = !1, null != e.$scrollBehavior && (e.style.scrollBehavior = e.$scrollBehavior, e.$scrollBehavior = null))
            };
            U(d, e, 0), D = !0
        }
    }

    function T(t) {
        c || x();
        var o = t.target;
        if (t.defaultPrevented || t.ctrlKey) return !0;
        if (F(e, "embed") || F(o, "embed") && /\.pdf/i.test(o.src) || F(e, "object") || o.shadowRoot) return !0;
        var r = -t.wheelDeltaX || t.deltaX || 0,
            i = -t.wheelDeltaY || t.deltaY || 0;
        d && (t.wheelDeltaX && I(t.wheelDeltaX, 120) && (r = t.wheelDeltaX / Math.abs(t.wheelDeltaX) * -120), t.wheelDeltaY && I(t.wheelDeltaY, 120) && (i = t.wheelDeltaY / Math.abs(t.wheelDeltaY) * -120)), r || i || (i = -t.wheelDelta || 0), 1 === t.deltaMode && (r *= 40, i *= 40);
        var u = P(o);
        return u ? !! function(e) {
            if (!e) return;
            s.length || (s = [e, e, e]);
            e = Math.abs(e), s.push(e), s.shift(), clearTimeout(n), n = setTimeout((function() {
                try {
                    localStorage.SS_deltaBuffer = s.join(",")
                } catch (e) {}
            }), 1e3);
            var t = e > 120 && _(e),
                o = !_(120) && !_(100) && !t;
            return e < 50 || o
        }(i) || (Math.abs(r) > 1.2 && (r *= a.stepSize / 120), Math.abs(i) > 1.2 && (i *= a.stepSize / 120), E(u, r, i), t.preventDefault(), void A()) : !l || !oe || (Object.defineProperty(t, "target", {
            value: window.frameElement
        }), parent.wheel(t))
    }

    function B(t) {
        var o = t.target,
            n = t.ctrlKey || t.altKey || t.metaKey || t.shiftKey && t.keyCode !== v;
        document.body.contains(e) || (e = document.activeElement);
        var r = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (t.defaultPrevented || /^(textarea|select|embed|object)$/i.test(o.nodeName) || F(o, "input") && !r.test(o.type) || F(e, "video") || function(e) {
                var t = e.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do {
                        if (o = t.classList && t.classList.contains("html5-video-controls")) break
                    } while (t = t.parentNode);
                return o
            }(t) || o.isContentEditable || n) return !0;
        if ((F(o, "button") || F(o, "input") && r.test(o.type)) && t.keyCode === v) return !0;
        if (F(o, "input") && "radio" == o.type && S[t.keyCode]) return !0;
        var i = 0,
            c = 0,
            u = P(e);
        if (!u) return !l || !oe || parent.keydown(t);
        var s = u.clientHeight;
        switch (u == document.body && (s = window.innerHeight), t.keyCode) {
            case m:
                c = -a.arrowScroll;
                break;
            case w:
                c = a.arrowScroll;
                break;
            case v:
                c = -(t.shiftKey ? 1 : -1) * s * .9;
                break;
            case p:
                c = .9 * -s;
                break;
            case y:
                c = .9 * s;
                break;
            case g:
                u == document.body && document.scrollingElement && (u = document.scrollingElement), c = -u.scrollTop;
                break;
            case b:
                var d = u.scrollHeight - u.scrollTop - s;
                c = d > 0 ? d + 10 : 0;
                break;
            case f:
                i = -a.arrowScroll;
                break;
            case h:
                i = a.arrowScroll;
                break;
            default:
                return !0
        }
        E(u, i, c), t.preventDefault(), A()
    }

    function C(t) {
        e = t.target
    }
    var H, z, L = (H = 0, function(e) {
            return e.uniqueID || (e.uniqueID = H++)
        }),
        O = {},
        X = {},
        Y = {};

    function A() {
        clearTimeout(z), z = setInterval((function() {
            O = X = Y = {}
        }), 1e3)
    }

    function N(e, t, o) {
        for (var n = o ? O : X, r = e.length; r--;) n[L(e[r])] = t;
        return t
    }

    function K(e, t) {
        return (t ? O : X)[L(e)]
    }

    function P(e) {
        var t = [],
            o = document.body,
            n = u.scrollHeight;
        do {
            var r = K(e, !1);
            if (r) return N(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = j(u) && j(o) || R(u);
                if (l && $(u) || !l && a) return N(t, J())
            } else if ($(e) && R(e)) return N(t, e)
        } while (e = e.parentElement)
    }

    function $(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function j(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }

    function R(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function q(e, t, o) {
        window.addEventListener(e, t, o || !1)
    }

    function V(e, t, o) {
        window.removeEventListener(e, t, o || !1)
    }

    function F(e, t) {
        return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        s = localStorage.SS_deltaBuffer.split(",")
    } catch (e) {}

    function I(e, t) {
        return Math.floor(e / t) == e / t
    }

    function _(e) {
        return I(s[0], e) && I(s[1], e) && I(s[2], e)
    }
    var W, U = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        },
        G = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        J = (W = document.scrollingElement, function() {
            if (!W) {
                var e = document.createElement("div");
                e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                var t = document.body.scrollTop;
                document.documentElement.scrollTop, window.scrollBy(0, 3), W = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
            }
            return W
        });

    function Q(e) {
        var t, o;
        return (e *= a.pulseScale) < 1 ? t = e - (1 - Math.exp(-e)) : (e -= 1, t = (o = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - o)), t * a.pulseNormalize
    }

    function Z(e) {
        return e >= 1 ? 1 : e <= 0 ? 0 : (1 == a.pulseNormalize && (a.pulseNormalize /= Q(1)), Q(e))
    }
    var ee = window.navigator.userAgent,
        te = /Edge/.test(ee),
        oe = /chrome/i.test(ee) && !te,
        ne = /safari/i.test(ee) && !te,
        re = /mobile/i.test(ee),
        ae = /Windows NT 6.1/i.test(ee) && /rv:11/i.test(ee),
        le = ne && (/Version\/8/i.test(ee) || /Version\/9/i.test(ee)),
        ie = (oe || ne || ae) && !re,
        ce = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                ce = !0
            }
        }))
    } catch (e) {}
    var ue = !!ce && {
            passive: !1
        },
        se = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function de(e) {
        for (var t in e) r.hasOwnProperty(t) && (a[t] = e[t])
    }
    se && ie && (q(se, T, ue), q("mousedown", C), q("load", x)), de.destroy = function() {
        t && t.disconnect(), V(se, T), V("mousedown", C), V("keydown", B), V("resize", o), V("load", x)
    }, window.SmoothScrollOptions && de(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define((function() {
        return de
    })) : "object" == typeof exports ? module.exports = de : window.SmoothScroll = de
}();