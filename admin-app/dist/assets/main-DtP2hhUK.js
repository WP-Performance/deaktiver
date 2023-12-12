var Ce = !1,
	Me = !1,
	L = [],
	Te = -1;
function zn(e) {
	Hn(e);
}
function Hn(e) {
	L.includes(e) || L.push(e), qn();
}
function Mt(e) {
	let t = L.indexOf(e);
	t !== -1 && t > Te && L.splice(t, 1);
}
function qn() {
	!Me && !Ce && ((Ce = !0), queueMicrotask(Wn));
}
function Wn() {
	(Ce = !1), (Me = !0);
	for (let e = 0; e < L.length; e++) L[e](), (Te = e);
	(L.length = 0), (Te = -1), (Me = !1);
}
var z,
	H,
	Z,
	Tt,
	Ie = !0;
function Un(e) {
	(Ie = !1), e(), (Ie = !0);
}
function Jn(e) {
	(z = e.reactive),
		(Z = e.release),
		(H = (t) =>
			e.effect(t, {
				scheduler: (n) => {
					Ie ? zn(n) : n();
				},
			})),
		(Tt = e.raw);
}
function _t(e) {
	H = e;
}
function Vn(e) {
	let t = () => {};
	return [
		(r) => {
			let i = H(r);
			return (
				e._x_effects ||
					((e._x_effects = new Set()),
					(e._x_runEffects = () => {
						e._x_effects.forEach((s) => s());
					})),
				e._x_effects.add(i),
				(t = () => {
					i !== void 0 && (e._x_effects.delete(i), Z(i));
				}),
				i
			);
		},
		() => {
			t();
		},
	];
}
function Y(e, t, n = {}) {
	e.dispatchEvent(
		new CustomEvent(t, {
			detail: n,
			bubbles: !0,
			composed: !0,
			cancelable: !0,
		}),
	);
}
function I(e, t) {
	if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
		Array.from(e.children).forEach((i) => I(i, t));
		return;
	}
	let n = !1;
	if ((t(e, () => (n = !0)), n)) return;
	let r = e.firstElementChild;
	for (; r; ) I(r, t), (r = r.nextElementSibling);
}
function O(e, ...t) {
	console.warn(`Alpine Warning: ${e}`, ...t);
}
var ht = !1;
function Yn() {
	ht &&
		O(
			"Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.",
		),
		(ht = !0),
		document.body ||
			O(
				"Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?",
			),
		Y(document, "alpine:init"),
		Y(document, "alpine:initializing"),
		Ge(),
		Qn((t) => C(t, I)),
		Je((t) => Ue(t)),
		Dt((t, n) => {
			et(t, n).forEach((r) => r());
		});
	let e = (t) => !he(t.parentElement, !0);
	Array.from(document.querySelectorAll($t().join(",")))
		.filter(e)
		.forEach((t) => {
			C(t);
		}),
		Y(document, "alpine:initialized");
}
var We = [],
	It = [];
function Pt() {
	return We.map((e) => e());
}
function $t() {
	return We.concat(It).map((e) => e());
}
function jt(e) {
	We.push(e);
}
function Rt(e) {
	It.push(e);
}
function he(e, t = !1) {
	return ge(e, (n) => {
		if ((t ? $t() : Pt()).some((i) => n.matches(i))) return !0;
	});
}
function ge(e, t) {
	if (e) {
		if (t(e)) return e;
		if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
			return ge(e.parentElement, t);
	}
}
function Gn(e) {
	return Pt().some((t) => e.matches(t));
}
var Lt = [];
function Xn(e) {
	Lt.push(e);
}
function C(e, t = I, n = () => {}) {
	pr(() => {
		t(e, (r, i) => {
			n(r, i),
				Lt.forEach((s) => s(r, i)),
				et(r, r.attributes).forEach((s) => s()),
				r._x_ignore && i();
		});
	});
}
function Ue(e) {
	I(e, (t) => {
		kt(t), Zn(t);
	});
}
var Nt = [],
	Ft = [],
	Bt = [];
function Qn(e) {
	Bt.push(e);
}
function Je(e, t) {
	typeof t == "function"
		? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
		: ((t = e), Ft.push(t));
}
function Dt(e) {
	Nt.push(e);
}
function Kt(e, t, n) {
	e._x_attributeCleanups || (e._x_attributeCleanups = {}),
		e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
		e._x_attributeCleanups[t].push(n);
}
function kt(e, t) {
	e._x_attributeCleanups &&
		Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
			(t === void 0 || t.includes(n)) &&
				(r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
		});
}
function Zn(e) {
	if (e._x_cleanups) for (; e._x_cleanups.length; ) e._x_cleanups.pop()();
}
var Ve = new MutationObserver(Qe),
	Ye = !1;
function Ge() {
	Ve.observe(document, {
		subtree: !0,
		childList: !0,
		attributes: !0,
		attributeOldValue: !0,
	}),
		(Ye = !0);
}
function zt() {
	er(), Ve.disconnect(), (Ye = !1);
}
var G = [],
	we = !1;
function er() {
	(G = G.concat(Ve.takeRecords())),
		G.length &&
			!we &&
			((we = !0),
			queueMicrotask(() => {
				tr(), (we = !1);
			}));
}
function tr() {
	Qe(G), (G.length = 0);
}
function x(e) {
	if (!Ye) return e();
	zt();
	let t = e();
	return Ge(), t;
}
var Xe = !1,
	de = [];
function nr() {
	Xe = !0;
}
function rr() {
	(Xe = !1), Qe(de), (de = []);
}
function Qe(e) {
	if (Xe) {
		de = de.concat(e);
		return;
	}
	let t = [],
		n = [],
		r = new Map(),
		i = new Map();
	for (let s = 0; s < e.length; s++)
		if (
			!e[s].target._x_ignoreMutationObserver &&
			(e[s].type === "childList" &&
				(e[s].addedNodes.forEach((o) => o.nodeType === 1 && t.push(o)),
				e[s].removedNodes.forEach((o) => o.nodeType === 1 && n.push(o))),
			e[s].type === "attributes")
		) {
			let o = e[s].target,
				a = e[s].attributeName,
				c = e[s].oldValue,
				u = () => {
					r.has(o) || r.set(o, []),
						r.get(o).push({ name: a, value: o.getAttribute(a) });
				},
				l = () => {
					i.has(o) || i.set(o, []), i.get(o).push(a);
				};
			o.hasAttribute(a) && c === null
				? u()
				: o.hasAttribute(a)
				  ? (l(), u())
				  : l();
		}
	i.forEach((s, o) => {
		kt(o, s);
	}),
		r.forEach((s, o) => {
			Nt.forEach((a) => a(o, s));
		});
	for (let s of n) t.includes(s) || (Ft.forEach((o) => o(s)), Ue(s));
	t.forEach((s) => {
		(s._x_ignoreSelf = !0), (s._x_ignore = !0);
	});
	for (let s of t)
		n.includes(s) ||
			(s.isConnected &&
				(delete s._x_ignoreSelf,
				delete s._x_ignore,
				Bt.forEach((o) => o(s)),
				(s._x_ignore = !0),
				(s._x_ignoreSelf = !0)));
	t.forEach((s) => {
		delete s._x_ignoreSelf, delete s._x_ignore;
	}),
		(t = null),
		(n = null),
		(r = null),
		(i = null);
}
function Ht(e) {
	return te(K(e));
}
function ee(e, t, n) {
	return (
		(e._x_dataStack = [t, ...K(n || e)]),
		() => {
			e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
		}
	);
}
function K(e) {
	return e._x_dataStack
		? e._x_dataStack
		: typeof ShadowRoot == "function" && e instanceof ShadowRoot
		  ? K(e.host)
		  : e.parentNode
			  ? K(e.parentNode)
			  : [];
}
function te(e) {
	return new Proxy({ objects: e }, ir);
}
var ir = {
	ownKeys({ objects: e }) {
		return Array.from(new Set(e.flatMap((t) => Object.keys(t))));
	},
	has({ objects: e }, t) {
		return t == Symbol.unscopables
			? !1
			: e.some((n) => Object.prototype.hasOwnProperty.call(n, t));
	},
	get({ objects: e }, t, n) {
		return t == "toJSON"
			? sr
			: Reflect.get(
					e.find((r) => Object.prototype.hasOwnProperty.call(r, t)) || {},
					t,
					n,
			  );
	},
	set({ objects: e }, t, n, r) {
		const i =
				e.find((o) => Object.prototype.hasOwnProperty.call(o, t)) ||
				e[e.length - 1],
			s = Object.getOwnPropertyDescriptor(i, t);
		return s != null && s.set && s != null && s.get
			? Reflect.set(i, t, n, r)
			: Reflect.set(i, t, n);
	},
};
function sr() {
	return Reflect.ownKeys(this).reduce(
		(t, n) => ((t[n] = Reflect.get(this, n)), t),
		{},
	);
}
function qt(e) {
	let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null,
		n = (r, i = "") => {
			Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(
				([s, { value: o, enumerable: a }]) => {
					if (a === !1 || o === void 0) return;
					let c = i === "" ? s : `${i}.${s}`;
					typeof o == "object" && o !== null && o._x_interceptor
						? (r[s] = o.initialize(e, c, s))
						: t(o) && o !== r && !(o instanceof Element) && n(o, c);
				},
			);
		};
	return n(e);
}
function Wt(e, t = () => {}) {
	let n = {
		initialValue: void 0,
		_x_interceptor: !0,
		initialize(r, i, s) {
			return e(
				this.initialValue,
				() => or(r, i),
				(o) => Pe(r, i, o),
				i,
				s,
			);
		},
	};
	return (
		t(n),
		(r) => {
			if (typeof r == "object" && r !== null && r._x_interceptor) {
				let i = n.initialize.bind(n);
				n.initialize = (s, o, a) => {
					let c = r.initialize(s, o, a);
					return (n.initialValue = c), i(s, o, a);
				};
			} else n.initialValue = r;
			return n;
		}
	);
}
function or(e, t) {
	return t.split(".").reduce((n, r) => n[r], e);
}
function Pe(e, t, n) {
	if ((typeof t == "string" && (t = t.split(".")), t.length === 1)) e[t[0]] = n;
	else {
		if (t.length === 0) throw error;
		return e[t[0]] || (e[t[0]] = {}), Pe(e[t[0]], t.slice(1), n);
	}
}
var Ut = {};
function S(e, t) {
	Ut[e] = t;
}
function $e(e, t) {
	return (
		Object.entries(Ut).forEach(([n, r]) => {
			let i = null;
			function s() {
				if (i) return i;
				{
					let [o, a] = Qt(t);
					return (i = { interceptor: Wt, ...o }), Je(t, a), i;
				}
			}
			Object.defineProperty(e, `$${n}`, {
				get() {
					return r(t, s());
				},
				enumerable: !1,
			});
		}),
		e
	);
}
function ar(e, t, n, ...r) {
	try {
		return n(...r);
	} catch (i) {
		Q(i, e, t);
	}
}
function Q(e, t, n = void 0) {
	Object.assign(e, { el: t, expression: n }),
		console.warn(
			`Alpine Expression Error: ${e.message}

${
	n
		? 'Expression: "' +
		  n +
		  `"

`
		: ""
}`,
			t,
		),
		setTimeout(() => {
			throw e;
		}, 0);
}
var le = !0;
function Jt(e) {
	let t = le;
	le = !1;
	let n = e();
	return (le = t), n;
}
function N(e, t, n = {}) {
	let r;
	return m(e, t)((i) => (r = i), n), r;
}
function m(...e) {
	return Vt(...e);
}
var Vt = Yt;
function cr(e) {
	Vt = e;
}
function Yt(e, t) {
	let n = {};
	$e(n, e);
	let r = [n, ...K(e)],
		i = typeof t == "function" ? ur(r, t) : fr(r, t, e);
	return ar.bind(null, e, t, i);
}
function ur(e, t) {
	return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
		let s = t.apply(te([r, ...e]), i);
		pe(n, s);
	};
}
var Ee = {};
function lr(e, t) {
	if (Ee[e]) return Ee[e];
	let n = Object.getPrototypeOf(async function () {}).constructor,
		r =
			/^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim())
				? `(async()=>{ ${e} })()`
				: e,
		s = (() => {
			try {
				let o = new n(
					["__self", "scope"],
					`with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`,
				);
				return Object.defineProperty(o, "name", { value: `[Alpine] ${e}` }), o;
			} catch (o) {
				return Q(o, t, e), Promise.resolve();
			}
		})();
	return (Ee[e] = s), s;
}
function fr(e, t, n) {
	let r = lr(t, n);
	return (i = () => {}, { scope: s = {}, params: o = [] } = {}) => {
		(r.result = void 0), (r.finished = !1);
		let a = te([s, ...e]);
		if (typeof r == "function") {
			let c = r(r, a).catch((u) => Q(u, n, t));
			r.finished
				? (pe(i, r.result, a, o, n), (r.result = void 0))
				: c
						.then((u) => {
							pe(i, u, a, o, n);
						})
						.catch((u) => Q(u, n, t))
						.finally(() => (r.result = void 0));
		}
	};
}
function pe(e, t, n, r, i) {
	if (le && typeof t == "function") {
		let s = t.apply(n, r);
		s instanceof Promise
			? s.then((o) => pe(e, o, n, r)).catch((o) => Q(o, i, t))
			: e(s);
	} else
		typeof t == "object" && t instanceof Promise ? t.then((s) => e(s)) : e(t);
}
var Ze = "x-";
function q(e = "") {
	return Ze + e;
}
function dr(e) {
	Ze = e;
}
var je = {};
function g(e, t) {
	return (
		(je[e] = t),
		{
			before(n) {
				if (!je[n]) {
					console.warn(
						"Cannot find directive `${directive}`. `${name}` will use the default order of execution",
					);
					return;
				}
				const r = R.indexOf(n);
				R.splice(r >= 0 ? r : R.indexOf("DEFAULT"), 0, e);
			},
		}
	);
}
function et(e, t, n) {
	if (((t = Array.from(t)), e._x_virtualDirectives)) {
		let s = Object.entries(e._x_virtualDirectives).map(([a, c]) => ({
				name: a,
				value: c,
			})),
			o = Gt(s);
		(s = s.map((a) =>
			o.find((c) => c.name === a.name)
				? { name: `x-bind:${a.name}`, value: `"${a.value}"` }
				: a,
		)),
			(t = t.concat(s));
	}
	let r = {};
	return t
		.map(tn((s, o) => (r[s] = o)))
		.filter(rn)
		.map(hr(r, n))
		.sort(gr)
		.map((s) => _r(e, s));
}
function Gt(e) {
	return Array.from(e)
		.map(tn())
		.filter((t) => !rn(t));
}
var Re = !1,
	V = new Map(),
	Xt = Symbol();
function pr(e) {
	Re = !0;
	let t = Symbol();
	(Xt = t), V.set(t, []);
	let n = () => {
			for (; V.get(t).length; ) V.get(t).shift()();
			V.delete(t);
		},
		r = () => {
			(Re = !1), n();
		};
	e(n), r();
}
function Qt(e) {
	let t = [],
		n = (a) => t.push(a),
		[r, i] = Vn(e);
	return (
		t.push(i),
		[
			{
				Alpine: re,
				effect: r,
				cleanup: n,
				evaluateLater: m.bind(m, e),
				evaluate: N.bind(N, e),
			},
			() => t.forEach((a) => a()),
		]
	);
}
function _r(e, t) {
	let n = () => {},
		r = je[t.type] || n,
		[i, s] = Qt(e);
	Kt(e, t.original, s);
	let o = () => {
		e._x_ignore ||
			e._x_ignoreSelf ||
			(r.inline && r.inline(e, t, i),
			(r = r.bind(r, e, t, i)),
			Re ? V.get(Xt).push(r) : r());
	};
	return (o.runCleanups = s), o;
}
var Zt =
		(e, t) =>
		({ name: n, value: r }) => (
			n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }
		),
	en = (e) => e;
function tn(e = () => {}) {
	return ({ name: t, value: n }) => {
		let { name: r, value: i } = nn.reduce((s, o) => o(s), {
			name: t,
			value: n,
		});
		return r !== t && e(r, t), { name: r, value: i };
	};
}
var nn = [];
function tt(e) {
	nn.push(e);
}
function rn({ name: e }) {
	return sn().test(e);
}
var sn = () => new RegExp(`^${Ze}([^:^.]+)\\b`);
function hr(e, t) {
	return ({ name: n, value: r }) => {
		let i = n.match(sn()),
			s = n.match(/:([a-zA-Z0-9\-_:]+)/),
			o = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
			a = t || e[n] || n;
		return {
			type: i ? i[1] : null,
			value: s ? s[1] : null,
			modifiers: o.map((c) => c.replace(".", "")),
			expression: r,
			original: a,
		};
	};
}
var Le = "DEFAULT",
	R = [
		"ignore",
		"ref",
		"data",
		"id",
		"anchor",
		"bind",
		"init",
		"for",
		"model",
		"modelable",
		"transition",
		"show",
		"if",
		Le,
		"teleport",
	];
function gr(e, t) {
	let n = R.indexOf(e.type) === -1 ? Le : e.type,
		r = R.indexOf(t.type) === -1 ? Le : t.type;
	return R.indexOf(n) - R.indexOf(r);
}
var Ne = [],
	nt = !1;
function rt(e = () => {}) {
	return (
		queueMicrotask(() => {
			nt ||
				setTimeout(() => {
					Fe();
				});
		}),
		new Promise((t) => {
			Ne.push(() => {
				e(), t();
			});
		})
	);
}
function Fe() {
	for (nt = !1; Ne.length; ) Ne.shift()();
}
function yr() {
	nt = !0;
}
function it(e, t) {
	return Array.isArray(t)
		? gt(e, t.join(" "))
		: typeof t == "object" && t !== null
		  ? xr(e, t)
		  : typeof t == "function"
			  ? it(e, t())
			  : gt(e, t);
}
function gt(e, t) {
	let n = (i) =>
			i
				.split(" ")
				.filter((s) => !e.classList.contains(s))
				.filter(Boolean),
		r = (i) => (
			e.classList.add(...i),
			() => {
				e.classList.remove(...i);
			}
		);
	return (t = t === !0 ? (t = "") : t || ""), r(n(t));
}
function xr(e, t) {
	let n = (a) => a.split(" ").filter(Boolean),
		r = Object.entries(t)
			.flatMap(([a, c]) => (c ? n(a) : !1))
			.filter(Boolean),
		i = Object.entries(t)
			.flatMap(([a, c]) => (c ? !1 : n(a)))
			.filter(Boolean),
		s = [],
		o = [];
	return (
		i.forEach((a) => {
			e.classList.contains(a) && (e.classList.remove(a), o.push(a));
		}),
		r.forEach((a) => {
			e.classList.contains(a) || (e.classList.add(a), s.push(a));
		}),
		() => {
			o.forEach((a) => e.classList.add(a)),
				s.forEach((a) => e.classList.remove(a));
		}
	);
}
function ye(e, t) {
	return typeof t == "object" && t !== null ? br(e, t) : vr(e, t);
}
function br(e, t) {
	let n = {};
	return (
		Object.entries(t).forEach(([r, i]) => {
			(n[r] = e.style[r]),
				r.startsWith("--") || (r = mr(r)),
				e.style.setProperty(r, i);
		}),
		setTimeout(() => {
			e.style.length === 0 && e.removeAttribute("style");
		}),
		() => {
			ye(e, n);
		}
	);
}
function vr(e, t) {
	let n = e.getAttribute("style", t);
	return (
		e.setAttribute("style", t),
		() => {
			e.setAttribute("style", n || "");
		}
	);
}
function mr(e) {
	return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Be(e, t = () => {}) {
	let n = !1;
	return function () {
		n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
	};
}
g(
	"transition",
	(e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
		typeof r == "function" && (r = i(r)),
			r !== !1 && (!r || typeof r == "boolean" ? Er(e, n, t) : wr(e, r, t));
	},
);
function wr(e, t, n) {
	on(e, it, ""),
		{
			enter: (i) => {
				e._x_transition.enter.during = i;
			},
			"enter-start": (i) => {
				e._x_transition.enter.start = i;
			},
			"enter-end": (i) => {
				e._x_transition.enter.end = i;
			},
			leave: (i) => {
				e._x_transition.leave.during = i;
			},
			"leave-start": (i) => {
				e._x_transition.leave.start = i;
			},
			"leave-end": (i) => {
				e._x_transition.leave.end = i;
			},
		}[n](t);
}
function Er(e, t, n) {
	on(e, ye);
	let r = !t.includes("in") && !t.includes("out") && !n,
		i = r || t.includes("in") || ["enter"].includes(n),
		s = r || t.includes("out") || ["leave"].includes(n);
	t.includes("in") && !r && (t = t.filter((_, y) => y < t.indexOf("out"))),
		t.includes("out") && !r && (t = t.filter((_, y) => y > t.indexOf("out")));
	let o = !t.includes("opacity") && !t.includes("scale"),
		a = o || t.includes("opacity"),
		c = o || t.includes("scale"),
		u = a ? 0 : 1,
		l = c ? U(t, "scale", 95) / 100 : 1,
		d = U(t, "delay", 0) / 1e3,
		p = U(t, "origin", "center"),
		b = "opacity, transform",
		M = U(t, "duration", 150) / 1e3,
		ie = U(t, "duration", 75) / 1e3,
		f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
	i &&
		((e._x_transition.enter.during = {
			transformOrigin: p,
			transitionDelay: `${d}s`,
			transitionProperty: b,
			transitionDuration: `${M}s`,
			transitionTimingFunction: f,
		}),
		(e._x_transition.enter.start = { opacity: u, transform: `scale(${l})` }),
		(e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
		s &&
			((e._x_transition.leave.during = {
				transformOrigin: p,
				transitionDelay: `${d}s`,
				transitionProperty: b,
				transitionDuration: `${ie}s`,
				transitionTimingFunction: f,
			}),
			(e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
			(e._x_transition.leave.end = { opacity: u, transform: `scale(${l})` }));
}
function on(e, t, n = {}) {
	e._x_transition ||
		(e._x_transition = {
			enter: { during: n, start: n, end: n },
			leave: { during: n, start: n, end: n },
			in(r = () => {}, i = () => {}) {
				De(
					e,
					t,
					{
						during: this.enter.during,
						start: this.enter.start,
						end: this.enter.end,
					},
					r,
					i,
				);
			},
			out(r = () => {}, i = () => {}) {
				De(
					e,
					t,
					{
						during: this.leave.during,
						start: this.leave.start,
						end: this.leave.end,
					},
					r,
					i,
				);
			},
		});
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
	e,
	t,
	n,
	r,
) {
	const i =
		document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
	let s = () => i(n);
	if (t) {
		e._x_transition && (e._x_transition.enter || e._x_transition.leave)
			? e._x_transition.enter &&
			  (Object.entries(e._x_transition.enter.during).length ||
					Object.entries(e._x_transition.enter.start).length ||
					Object.entries(e._x_transition.enter.end).length)
				? e._x_transition.in(n)
				: s()
			: e._x_transition
			  ? e._x_transition.in(n)
			  : s();
		return;
	}
	(e._x_hidePromise = e._x_transition
		? new Promise((o, a) => {
				e._x_transition.out(
					() => {},
					() => o(r),
				),
					e._x_transitioning &&
						e._x_transitioning.beforeCancel(() =>
							a({ isFromCancelledTransition: !0 }),
						);
		  })
		: Promise.resolve(r)),
		queueMicrotask(() => {
			let o = an(e);
			o
				? (o._x_hideChildren || (o._x_hideChildren = []),
				  o._x_hideChildren.push(e))
				: i(() => {
						let a = (c) => {
							let u = Promise.all([
								c._x_hidePromise,
								...(c._x_hideChildren || []).map(a),
							]).then(([l]) => l());
							return delete c._x_hidePromise, delete c._x_hideChildren, u;
						};
						a(e).catch((c) => {
							if (!c.isFromCancelledTransition) throw c;
						});
				  });
		});
};
function an(e) {
	let t = e.parentNode;
	if (t) return t._x_hidePromise ? t : an(t);
}
function De(
	e,
	t,
	{ during: n, start: r, end: i } = {},
	s = () => {},
	o = () => {},
) {
	if (
		(e._x_transitioning && e._x_transitioning.cancel(),
		Object.keys(n).length === 0 &&
			Object.keys(r).length === 0 &&
			Object.keys(i).length === 0)
	) {
		s(), o();
		return;
	}
	let a, c, u;
	Sr(e, {
		start() {
			a = t(e, r);
		},
		during() {
			c = t(e, n);
		},
		before: s,
		end() {
			a(), (u = t(e, i));
		},
		after: o,
		cleanup() {
			c(), u();
		},
	});
}
function Sr(e, t) {
	let n,
		r,
		i,
		s = Be(() => {
			x(() => {
				(n = !0),
					r || t.before(),
					i || (t.end(), Fe()),
					t.after(),
					e.isConnected && t.cleanup(),
					delete e._x_transitioning;
			});
		});
	(e._x_transitioning = {
		beforeCancels: [],
		beforeCancel(o) {
			this.beforeCancels.push(o);
		},
		cancel: Be(function () {
			for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
			s();
		}),
		finish: s,
	}),
		x(() => {
			t.start(), t.during();
		}),
		yr(),
		requestAnimationFrame(() => {
			if (n) return;
			let o =
					Number(
						getComputedStyle(e)
							.transitionDuration.replace(/,.*/, "")
							.replace("s", ""),
					) * 1e3,
				a =
					Number(
						getComputedStyle(e)
							.transitionDelay.replace(/,.*/, "")
							.replace("s", ""),
					) * 1e3;
			o === 0 &&
				(o =
					Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
				x(() => {
					t.before();
				}),
				(r = !0),
				requestAnimationFrame(() => {
					n ||
						(x(() => {
							t.end();
						}),
						Fe(),
						setTimeout(e._x_transitioning.finish, o + a),
						(i = !0));
				});
		});
}
function U(e, t, n) {
	if (e.indexOf(t) === -1) return n;
	const r = e[e.indexOf(t) + 1];
	if (!r || (t === "scale" && isNaN(r))) return n;
	if (t === "duration" || t === "delay") {
		let i = r.match(/([0-9]+)ms/);
		if (i) return i[1];
	}
	return t === "origin" &&
		["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
		? [r, e[e.indexOf(t) + 2]].join(" ")
		: r;
}
var P = !1;
function ne(e, t = () => {}) {
	return (...n) => (P ? t(...n) : e(...n));
}
function Ar(e) {
	return (...t) => P && e(...t);
}
var cn = [];
function un(e) {
	cn.push(e);
}
function Or(e, t) {
	cn.forEach((n) => n(e, t)),
		(P = !0),
		ln(() => {
			C(t, (n, r) => {
				r(n, () => {});
			});
		}),
		(P = !1);
}
var Ke = !1;
function Cr(e, t) {
	t._x_dataStack || (t._x_dataStack = e._x_dataStack),
		(P = !0),
		(Ke = !0),
		ln(() => {
			Mr(t);
		}),
		(P = !1),
		(Ke = !1);
}
function Mr(e) {
	let t = !1;
	C(e, (r, i) => {
		I(r, (s, o) => {
			if (t && Gn(s)) return o();
			(t = !0), i(s, o);
		});
	});
}
function ln(e) {
	let t = H;
	_t((n, r) => {
		let i = t(n);
		return Z(i), () => {};
	}),
		e(),
		_t(t);
}
function fn(e, t, n, r = []) {
	switch (
		(e._x_bindings || (e._x_bindings = z({})),
		(e._x_bindings[t] = n),
		(t = r.includes("camel") ? Nr(t) : t),
		t)
	) {
		case "value":
			Tr(e, n);
			break;
		case "style":
			Pr(e, n);
			break;
		case "class":
			Ir(e, n);
			break;
		case "selected":
		case "checked":
			$r(e, t, n);
			break;
		default:
			dn(e, t, n);
			break;
	}
}
function Tr(e, t) {
	if (e.type === "radio")
		e.attributes.value === void 0 && (e.value = t),
			window.fromModel &&
				(typeof t == "boolean"
					? (e.checked = fe(e.value) === t)
					: (e.checked = yt(e.value, t)));
	else if (e.type === "checkbox")
		Number.isInteger(t)
			? (e.value = t)
			: !Array.isArray(t) &&
				  typeof t != "boolean" &&
				  ![null, void 0].includes(t)
			  ? (e.value = String(t))
			  : Array.isArray(t)
				  ? (e.checked = t.some((n) => yt(n, e.value)))
				  : (e.checked = !!t);
	else if (e.tagName === "SELECT") Lr(e, t);
	else {
		if (e.value === t) return;
		e.value = t === void 0 ? "" : t;
	}
}
function Ir(e, t) {
	e._x_undoAddedClasses && e._x_undoAddedClasses(),
		(e._x_undoAddedClasses = it(e, t));
}
function Pr(e, t) {
	e._x_undoAddedStyles && e._x_undoAddedStyles(),
		(e._x_undoAddedStyles = ye(e, t));
}
function $r(e, t, n) {
	dn(e, t, n), Rr(e, t, n);
}
function dn(e, t, n) {
	[null, void 0, !1].includes(n) && Fr(t)
		? e.removeAttribute(t)
		: (pn(t) && (n = t), jr(e, t, n));
}
function jr(e, t, n) {
	e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Rr(e, t, n) {
	e[t] !== n && (e[t] = n);
}
function Lr(e, t) {
	const n = [].concat(t).map((r) => r + "");
	Array.from(e.options).forEach((r) => {
		r.selected = n.includes(r.value);
	});
}
function Nr(e) {
	return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function yt(e, t) {
	return e == t;
}
function fe(e) {
	return [1, "1", "true", "on", "yes", !0].includes(e)
		? !0
		: [0, "0", "false", "off", "no", !1].includes(e)
		  ? !1
		  : e
			  ? !!e
			  : null;
}
function pn(e) {
	return [
		"disabled",
		"checked",
		"required",
		"readonly",
		"hidden",
		"open",
		"selected",
		"autofocus",
		"itemscope",
		"multiple",
		"novalidate",
		"allowfullscreen",
		"allowpaymentrequest",
		"formnovalidate",
		"autoplay",
		"controls",
		"loop",
		"muted",
		"playsinline",
		"default",
		"ismap",
		"reversed",
		"async",
		"defer",
		"nomodule",
	].includes(e);
}
function Fr(e) {
	return ![
		"aria-pressed",
		"aria-checked",
		"aria-expanded",
		"aria-selected",
	].includes(e);
}
function Br(e, t, n) {
	return e._x_bindings && e._x_bindings[t] !== void 0
		? e._x_bindings[t]
		: _n(e, t, n);
}
function Dr(e, t, n, r = !0) {
	if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
	if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
		let i = e._x_inlineBindings[t];
		return (i.extract = r), Jt(() => N(e, i.expression));
	}
	return _n(e, t, n);
}
function _n(e, t, n) {
	let r = e.getAttribute(t);
	return r === null
		? typeof n == "function"
			? n()
			: n
		: r === ""
		  ? !0
		  : pn(t)
			  ? !![t, "true"].includes(r)
			  : r;
}
function hn(e, t) {
	var n;
	return function () {
		var r = this,
			i = arguments,
			s = function () {
				(n = null), e.apply(r, i);
			};
		clearTimeout(n), (n = setTimeout(s, t));
	};
}
function gn(e, t) {
	let n;
	return function () {
		let r = this,
			i = arguments;
		n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
	};
}
function yn({ get: e, set: t }, { get: n, set: r }) {
	let i = !0,
		s,
		o = H(() => {
			const a = e(),
				c = n();
			if (i) r(Se(a)), (i = !1), (s = JSON.stringify(a));
			else {
				const u = JSON.stringify(a);
				u !== s ? (r(Se(a)), (s = u)) : (t(Se(c)), (s = JSON.stringify(c)));
			}
			JSON.stringify(n()), JSON.stringify(e());
		});
	return () => {
		Z(o);
	};
}
function Se(e) {
	return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e;
}
function Kr(e) {
	(Array.isArray(e) ? e : [e]).forEach((n) => n(re));
}
var j = {},
	xt = !1;
function kr(e, t) {
	if ((xt || ((j = z(j)), (xt = !0)), t === void 0)) return j[e];
	(j[e] = t),
		typeof t == "object" &&
			t !== null &&
			t.hasOwnProperty("init") &&
			typeof t.init == "function" &&
			j[e].init(),
		qt(j[e]);
}
function zr() {
	return j;
}
var xn = {};
function Hr(e, t) {
	let n = typeof t != "function" ? () => t : t;
	return e instanceof Element ? bn(e, n()) : ((xn[e] = n), () => {});
}
function qr(e) {
	return (
		Object.entries(xn).forEach(([t, n]) => {
			Object.defineProperty(e, t, {
				get() {
					return (...r) => n(...r);
				},
			});
		}),
		e
	);
}
function bn(e, t, n) {
	let r = [];
	for (; r.length; ) r.pop()();
	let i = Object.entries(t).map(([o, a]) => ({ name: o, value: a })),
		s = Gt(i);
	return (
		(i = i.map((o) =>
			s.find((a) => a.name === o.name)
				? { name: `x-bind:${o.name}`, value: `"${o.value}"` }
				: o,
		)),
		et(e, i, n).map((o) => {
			r.push(o.runCleanups), o();
		}),
		() => {
			for (; r.length; ) r.pop()();
		}
	);
}
var vn = {};
function Wr(e, t) {
	vn[e] = t;
}
function Ur(e, t) {
	return (
		Object.entries(vn).forEach(([n, r]) => {
			Object.defineProperty(e, n, {
				get() {
					return (...i) => r.bind(t)(...i);
				},
				enumerable: !1,
			});
		}),
		e
	);
}
var Jr = {
		get reactive() {
			return z;
		},
		get release() {
			return Z;
		},
		get effect() {
			return H;
		},
		get raw() {
			return Tt;
		},
		version: "3.13.3",
		flushAndStopDeferringMutations: rr,
		dontAutoEvaluateFunctions: Jt,
		disableEffectScheduling: Un,
		startObservingMutations: Ge,
		stopObservingMutations: zt,
		setReactivityEngine: Jn,
		onAttributeRemoved: Kt,
		onAttributesAdded: Dt,
		closestDataStack: K,
		skipDuringClone: ne,
		onlyDuringClone: Ar,
		addRootSelector: jt,
		addInitSelector: Rt,
		interceptClone: un,
		addScopeToNode: ee,
		deferMutations: nr,
		mapAttributes: tt,
		evaluateLater: m,
		interceptInit: Xn,
		setEvaluator: cr,
		mergeProxies: te,
		extractProp: Dr,
		findClosest: ge,
		onElRemoved: Je,
		closestRoot: he,
		destroyTree: Ue,
		interceptor: Wt,
		transition: De,
		setStyles: ye,
		mutateDom: x,
		directive: g,
		entangle: yn,
		throttle: gn,
		debounce: hn,
		evaluate: N,
		initTree: C,
		nextTick: rt,
		prefixed: q,
		prefix: dr,
		plugin: Kr,
		magic: S,
		store: kr,
		start: Yn,
		clone: Cr,
		cloneNode: Or,
		bound: Br,
		$data: Ht,
		walk: I,
		data: Wr,
		bind: Hr,
	},
	re = Jr;
function Vr(e, t) {
	const n = Object.create(null),
		r = e.split(",");
	for (let i = 0; i < r.length; i++) n[r[i]] = !0;
	return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Yr = Object.freeze({}),
	Gr = Object.prototype.hasOwnProperty,
	xe = (e, t) => Gr.call(e, t),
	F = Array.isArray,
	X = (e) => mn(e) === "[object Map]",
	Xr = (e) => typeof e == "string",
	st = (e) => typeof e == "symbol",
	be = (e) => e !== null && typeof e == "object",
	Qr = Object.prototype.toString,
	mn = (e) => Qr.call(e),
	wn = (e) => mn(e).slice(8, -1),
	ot = (e) =>
		Xr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	Zr = (e) => {
		const t = Object.create(null);
		return (n) => t[n] || (t[n] = e(n));
	},
	ei = Zr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	En = (e, t) => e !== t && (e === e || t === t),
	ke = new WeakMap(),
	J = [],
	A,
	B = Symbol("iterate"),
	ze = Symbol("Map key iterate");
function ti(e) {
	return e && e._isEffect === !0;
}
function ni(e, t = Yr) {
	ti(e) && (e = e.raw);
	const n = si(e, t);
	return t.lazy || n(), n;
}
function ri(e) {
	e.active && (Sn(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var ii = 0;
function si(e, t) {
	const n = function () {
		if (!n.active) return e();
		if (!J.includes(n)) {
			Sn(n);
			try {
				return ai(), J.push(n), (A = n), e();
			} finally {
				J.pop(), An(), (A = J[J.length - 1]);
			}
		}
	};
	return (
		(n.id = ii++),
		(n.allowRecurse = !!t.allowRecurse),
		(n._isEffect = !0),
		(n.active = !0),
		(n.raw = e),
		(n.deps = []),
		(n.options = t),
		n
	);
}
function Sn(e) {
	const { deps: t } = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0;
	}
}
var k = !0,
	at = [];
function oi() {
	at.push(k), (k = !1);
}
function ai() {
	at.push(k), (k = !0);
}
function An() {
	const e = at.pop();
	k = e === void 0 ? !0 : e;
}
function E(e, t, n) {
	if (!k || A === void 0) return;
	let r = ke.get(e);
	r || ke.set(e, (r = new Map()));
	let i = r.get(n);
	i || r.set(n, (i = new Set())),
		i.has(A) ||
			(i.add(A),
			A.deps.push(i),
			A.options.onTrack &&
				A.options.onTrack({ effect: A, target: e, type: t, key: n }));
}
function $(e, t, n, r, i, s) {
	const o = ke.get(e);
	if (!o) return;
	const a = new Set(),
		c = (l) => {
			l &&
				l.forEach((d) => {
					(d !== A || d.allowRecurse) && a.add(d);
				});
		};
	if (t === "clear") o.forEach(c);
	else if (n === "length" && F(e))
		o.forEach((l, d) => {
			(d === "length" || d >= r) && c(l);
		});
	else
		switch ((n !== void 0 && c(o.get(n)), t)) {
			case "add":
				F(e)
					? ot(n) && c(o.get("length"))
					: (c(o.get(B)), X(e) && c(o.get(ze)));
				break;
			case "delete":
				F(e) || (c(o.get(B)), X(e) && c(o.get(ze)));
				break;
			case "set":
				X(e) && c(o.get(B));
				break;
		}
	const u = (l) => {
		l.options.onTrigger &&
			l.options.onTrigger({
				effect: l,
				target: e,
				key: n,
				type: t,
				newValue: r,
				oldValue: i,
				oldTarget: s,
			}),
			l.options.scheduler ? l.options.scheduler(l) : l();
	};
	a.forEach(u);
}
var ci = Vr("__proto__,__v_isRef,__isVue"),
	On = new Set(
		Object.getOwnPropertyNames(Symbol)
			.map((e) => Symbol[e])
			.filter(st),
	),
	ui = Cn(),
	li = Cn(!0),
	bt = fi();
function fi() {
	const e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach((t) => {
			e[t] = function (...n) {
				const r = h(this);
				for (let s = 0, o = this.length; s < o; s++) E(r, "get", s + "");
				const i = r[t](...n);
				return i === -1 || i === !1 ? r[t](...n.map(h)) : i;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
			e[t] = function (...n) {
				oi();
				const r = h(this)[t].apply(this, n);
				return An(), r;
			};
		}),
		e
	);
}
function Cn(e = !1, t = !1) {
	return function (r, i, s) {
		if (i === "__v_isReactive") return !e;
		if (i === "__v_isReadonly") return e;
		if (i === "__v_raw" && s === (e ? (t ? Ci : Pn) : t ? Oi : In).get(r))
			return r;
		const o = F(r);
		if (!e && o && xe(bt, i)) return Reflect.get(bt, i, s);
		const a = Reflect.get(r, i, s);
		return (st(i) ? On.has(i) : ci(i)) || (e || E(r, "get", i), t)
			? a
			: He(a)
			  ? !o || !ot(i)
					? a.value
					: a
			  : be(a)
				  ? e
						? $n(a)
						: ft(a)
				  : a;
	};
}
var di = pi();
function pi(e = !1) {
	return function (n, r, i, s) {
		let o = n[r];
		if (!e && ((i = h(i)), (o = h(o)), !F(n) && He(o) && !He(i)))
			return (o.value = i), !0;
		const a = F(n) && ot(r) ? Number(r) < n.length : xe(n, r),
			c = Reflect.set(n, r, i, s);
		return (
			n === h(s) && (a ? En(i, o) && $(n, "set", r, i, o) : $(n, "add", r, i)),
			c
		);
	};
}
function _i(e, t) {
	const n = xe(e, t),
		r = e[t],
		i = Reflect.deleteProperty(e, t);
	return i && n && $(e, "delete", t, void 0, r), i;
}
function hi(e, t) {
	const n = Reflect.has(e, t);
	return (!st(t) || !On.has(t)) && E(e, "has", t), n;
}
function gi(e) {
	return E(e, "iterate", F(e) ? "length" : B), Reflect.ownKeys(e);
}
var yi = { get: ui, set: di, deleteProperty: _i, has: hi, ownKeys: gi },
	xi = {
		get: li,
		set(e, t) {
			return (
				console.warn(
					`Set operation on key "${String(t)}" failed: target is readonly.`,
					e,
				),
				!0
			);
		},
		deleteProperty(e, t) {
			return (
				console.warn(
					`Delete operation on key "${String(t)}" failed: target is readonly.`,
					e,
				),
				!0
			);
		},
	},
	ct = (e) => (be(e) ? ft(e) : e),
	ut = (e) => (be(e) ? $n(e) : e),
	lt = (e) => e,
	ve = (e) => Reflect.getPrototypeOf(e);
function se(e, t, n = !1, r = !1) {
	e = e.__v_raw;
	const i = h(e),
		s = h(t);
	t !== s && !n && E(i, "get", t), !n && E(i, "get", s);
	const { has: o } = ve(i),
		a = r ? lt : n ? ut : ct;
	if (o.call(i, t)) return a(e.get(t));
	if (o.call(i, s)) return a(e.get(s));
	e !== i && e.get(t);
}
function oe(e, t = !1) {
	const n = this.__v_raw,
		r = h(n),
		i = h(e);
	return (
		e !== i && !t && E(r, "has", e),
		!t && E(r, "has", i),
		e === i ? n.has(e) : n.has(e) || n.has(i)
	);
}
function ae(e, t = !1) {
	return (
		(e = e.__v_raw), !t && E(h(e), "iterate", B), Reflect.get(e, "size", e)
	);
}
function vt(e) {
	e = h(e);
	const t = h(this);
	return ve(t).has.call(t, e) || (t.add(e), $(t, "add", e, e)), this;
}
function mt(e, t) {
	t = h(t);
	const n = h(this),
		{ has: r, get: i } = ve(n);
	let s = r.call(n, e);
	s ? Tn(n, r, e) : ((e = h(e)), (s = r.call(n, e)));
	const o = i.call(n, e);
	return (
		n.set(e, t), s ? En(t, o) && $(n, "set", e, t, o) : $(n, "add", e, t), this
	);
}
function wt(e) {
	const t = h(this),
		{ has: n, get: r } = ve(t);
	let i = n.call(t, e);
	i ? Tn(t, n, e) : ((e = h(e)), (i = n.call(t, e)));
	const s = r ? r.call(t, e) : void 0,
		o = t.delete(e);
	return i && $(t, "delete", e, void 0, s), o;
}
function Et() {
	const e = h(this),
		t = e.size !== 0,
		n = X(e) ? new Map(e) : new Set(e),
		r = e.clear();
	return t && $(e, "clear", void 0, void 0, n), r;
}
function ce(e, t) {
	return function (r, i) {
		const s = this,
			o = s.__v_raw,
			a = h(o),
			c = t ? lt : e ? ut : ct;
		return (
			!e && E(a, "iterate", B), o.forEach((u, l) => r.call(i, c(u), c(l), s))
		);
	};
}
function ue(e, t, n) {
	return function (...r) {
		const i = this.__v_raw,
			s = h(i),
			o = X(s),
			a = e === "entries" || (e === Symbol.iterator && o),
			c = e === "keys" && o,
			u = i[e](...r),
			l = n ? lt : t ? ut : ct;
		return (
			!t && E(s, "iterate", c ? ze : B),
			{
				next() {
					const { value: d, done: p } = u.next();
					return p
						? { value: d, done: p }
						: { value: a ? [l(d[0]), l(d[1])] : l(d), done: p };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function T(e) {
	return function (...t) {
		{
			const n = t[0] ? `on key "${t[0]}" ` : "";
			console.warn(
				`${ei(e)} operation ${n}failed: target is readonly.`,
				h(this),
			);
		}
		return e === "delete" ? !1 : this;
	};
}
function bi() {
	const e = {
			get(s) {
				return se(this, s);
			},
			get size() {
				return ae(this);
			},
			has: oe,
			add: vt,
			set: mt,
			delete: wt,
			clear: Et,
			forEach: ce(!1, !1),
		},
		t = {
			get(s) {
				return se(this, s, !1, !0);
			},
			get size() {
				return ae(this);
			},
			has: oe,
			add: vt,
			set: mt,
			delete: wt,
			clear: Et,
			forEach: ce(!1, !0),
		},
		n = {
			get(s) {
				return se(this, s, !0);
			},
			get size() {
				return ae(this, !0);
			},
			has(s) {
				return oe.call(this, s, !0);
			},
			add: T("add"),
			set: T("set"),
			delete: T("delete"),
			clear: T("clear"),
			forEach: ce(!0, !1),
		},
		r = {
			get(s) {
				return se(this, s, !0, !0);
			},
			get size() {
				return ae(this, !0);
			},
			has(s) {
				return oe.call(this, s, !0);
			},
			add: T("add"),
			set: T("set"),
			delete: T("delete"),
			clear: T("clear"),
			forEach: ce(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach((s) => {
			(e[s] = ue(s, !1, !1)),
				(n[s] = ue(s, !0, !1)),
				(t[s] = ue(s, !1, !0)),
				(r[s] = ue(s, !0, !0));
		}),
		[e, n, t, r]
	);
}
var [vi, mi, wi, Ei] = bi();
function Mn(e, t) {
	const n = t ? (e ? Ei : wi) : e ? mi : vi;
	return (r, i, s) =>
		i === "__v_isReactive"
			? !e
			: i === "__v_isReadonly"
			  ? e
			  : i === "__v_raw"
				  ? r
				  : Reflect.get(xe(n, i) && i in r ? n : r, i, s);
}
var Si = { get: Mn(!1, !1) },
	Ai = { get: Mn(!0, !1) };
function Tn(e, t, n) {
	const r = h(n);
	if (r !== n && t.call(e, r)) {
		const i = wn(e);
		console.warn(
			`Reactive ${i} contains both the raw and reactive versions of the same object${
				i === "Map" ? " as keys" : ""
			}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
		);
	}
}
var In = new WeakMap(),
	Oi = new WeakMap(),
	Pn = new WeakMap(),
	Ci = new WeakMap();
function Mi(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function Ti(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Mi(wn(e));
}
function ft(e) {
	return e && e.__v_isReadonly ? e : jn(e, !1, yi, Si, In);
}
function $n(e) {
	return jn(e, !0, xi, Ai, Pn);
}
function jn(e, t, n, r, i) {
	if (!be(e))
		return console.warn(`value cannot be made reactive: ${String(e)}`), e;
	if (e.__v_raw && !(t && e.__v_isReactive)) return e;
	const s = i.get(e);
	if (s) return s;
	const o = Ti(e);
	if (o === 0) return e;
	const a = new Proxy(e, o === 2 ? r : n);
	return i.set(e, a), a;
}
function h(e) {
	return (e && h(e.__v_raw)) || e;
}
function He(e) {
	return !!(e && e.__v_isRef === !0);
}
S("nextTick", () => rt);
S("dispatch", (e) => Y.bind(Y, e));
S("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
		let s = t(r),
			o = !0,
			a,
			c = n(() =>
				s((u) => {
					JSON.stringify(u),
						o
							? (a = u)
							: queueMicrotask(() => {
									i(u, a), (a = u);
							  }),
						(o = !1);
				}),
			);
		e._x_effects.delete(c);
	});
S("store", zr);
S("data", (e) => Ht(e));
S("root", (e) => he(e));
S(
	"refs",
	(e) => (e._x_refs_proxy || (e._x_refs_proxy = te(Ii(e))), e._x_refs_proxy),
);
function Ii(e) {
	let t = [],
		n = e;
	for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
	return t;
}
var Ae = {};
function Rn(e) {
	return Ae[e] || (Ae[e] = 0), ++Ae[e];
}
function Pi(e, t) {
	return ge(e, (n) => {
		if (n._x_ids && n._x_ids[t]) return !0;
	});
}
function $i(e, t) {
	e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Rn(t));
}
S("id", (e) => (t, n = null) => {
	let r = Pi(e, t),
		i = r ? r._x_ids[t] : Rn(t);
	return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S("el", (e) => e);
Ln("Focus", "focus", "focus");
Ln("Persist", "persist", "persist");
function Ln(e, t, n) {
	S(t, (r) =>
		O(
			`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
			r,
		),
	);
}
g(
	"modelable",
	(e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
		let s = r(t),
			o = () => {
				let l;
				return s((d) => (l = d)), l;
			},
			a = r(`${t} = __placeholder`),
			c = (l) => a(() => {}, { scope: { __placeholder: l } }),
			u = o();
		c(u),
			queueMicrotask(() => {
				if (!e._x_model) return;
				e._x_removeModelListeners.default();
				let l = e._x_model.get,
					d = e._x_model.set,
					p = yn(
						{
							get() {
								return l();
							},
							set(b) {
								d(b);
							},
						},
						{
							get() {
								return o();
							},
							set(b) {
								c(b);
							},
						},
					);
				i(p);
			});
	},
);
g("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
	e.tagName.toLowerCase() !== "template" &&
		O("x-teleport can only be used on a <template> tag", e);
	let i = St(n),
		s = e.content.cloneNode(!0).firstElementChild;
	(e._x_teleport = s),
		(s._x_teleportBack = e),
		e.setAttribute("data-teleport-template", !0),
		s.setAttribute("data-teleport-target", !0),
		e._x_forwardEvents &&
			e._x_forwardEvents.forEach((a) => {
				s.addEventListener(a, (c) => {
					c.stopPropagation(), e.dispatchEvent(new c.constructor(c.type, c));
				});
			}),
		ee(s, {}, e);
	let o = (a, c, u) => {
		u.includes("prepend")
			? c.parentNode.insertBefore(a, c)
			: u.includes("append")
			  ? c.parentNode.insertBefore(a, c.nextSibling)
			  : c.appendChild(a);
	};
	x(() => {
		o(s, i, t), C(s), (s._x_ignore = !0);
	}),
		(e._x_teleportPutBack = () => {
			let a = St(n);
			x(() => {
				o(e._x_teleport, a, t);
			});
		}),
		r(() => s.remove());
});
var ji = document.createElement("div");
function St(e) {
	let t = ne(
		() => document.querySelector(e),
		() => ji,
	)();
	return t || O(`Cannot find x-teleport element for selector: "${e}"`), t;
}
var Nn = () => {};
Nn.inline = (e, { modifiers: t }, { cleanup: n }) => {
	t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
		n(() => {
			t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
		});
};
g("ignore", Nn);
g(
	"effect",
	ne((e, { expression: t }, { effect: n }) => {
		n(m(e, t));
	}),
);
function qe(e, t, n, r) {
	let i = e,
		s = (c) => r(c),
		o = {},
		a = (c, u) => (l) => u(c, l);
	if (
		(n.includes("dot") && (t = Ri(t)),
		n.includes("camel") && (t = Li(t)),
		n.includes("passive") && (o.passive = !0),
		n.includes("capture") && (o.capture = !0),
		n.includes("window") && (i = window),
		n.includes("document") && (i = document),
		n.includes("debounce"))
	) {
		let c = n[n.indexOf("debounce") + 1] || "invalid-wait",
			u = _e(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
		s = hn(s, u);
	}
	if (n.includes("throttle")) {
		let c = n[n.indexOf("throttle") + 1] || "invalid-wait",
			u = _e(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
		s = gn(s, u);
	}
	return (
		n.includes("prevent") &&
			(s = a(s, (c, u) => {
				u.preventDefault(), c(u);
			})),
		n.includes("stop") &&
			(s = a(s, (c, u) => {
				u.stopPropagation(), c(u);
			})),
		n.includes("self") &&
			(s = a(s, (c, u) => {
				u.target === e && c(u);
			})),
		(n.includes("away") || n.includes("outside")) &&
			((i = document),
			(s = a(s, (c, u) => {
				e.contains(u.target) ||
					(u.target.isConnected !== !1 &&
						((e.offsetWidth < 1 && e.offsetHeight < 1) ||
							(e._x_isShown !== !1 && c(u))));
			}))),
		n.includes("once") &&
			(s = a(s, (c, u) => {
				c(u), i.removeEventListener(t, s, o);
			})),
		(s = a(s, (c, u) => {
			(Fi(t) && Bi(u, n)) || c(u);
		})),
		i.addEventListener(t, s, o),
		() => {
			i.removeEventListener(t, s, o);
		}
	);
}
function Ri(e) {
	return e.replace(/-/g, ".");
}
function Li(e) {
	return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function _e(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function Ni(e) {
	return [" ", "_"].includes(e)
		? e
		: e
				.replace(/([a-z])([A-Z])/g, "$1-$2")
				.replace(/[_\s]/, "-")
				.toLowerCase();
}
function Fi(e) {
	return ["keydown", "keyup"].includes(e);
}
function Bi(e, t) {
	let n = t.filter(
		(s) =>
			!["window", "document", "prevent", "stop", "once", "capture"].includes(s),
	);
	if (n.includes("debounce")) {
		let s = n.indexOf("debounce");
		n.splice(s, _e((n[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
	}
	if (n.includes("throttle")) {
		let s = n.indexOf("throttle");
		n.splice(s, _e((n[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
	}
	if (n.length === 0 || (n.length === 1 && At(e.key).includes(n[0]))) return !1;
	const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((s) =>
		n.includes(s),
	);
	return (
		(n = n.filter((s) => !i.includes(s))),
		!(
			i.length > 0 &&
			i.filter(
				(o) => ((o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`]),
			).length === i.length &&
			At(e.key).includes(n[0])
		)
	);
}
function At(e) {
	if (!e) return [];
	e = Ni(e);
	let t = {
		ctrl: "control",
		slash: "/",
		space: " ",
		spacebar: " ",
		cmd: "meta",
		esc: "escape",
		up: "arrow-up",
		down: "arrow-down",
		left: "arrow-left",
		right: "arrow-right",
		period: ".",
		equal: "=",
		minus: "-",
		underscore: "_",
	};
	return (
		(t[e] = e),
		Object.keys(t)
			.map((n) => {
				if (t[n] === e) return n;
			})
			.filter((n) => n)
	);
}
g(
	"model",
	(e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
		let s = e;
		t.includes("parent") && (s = e.parentNode);
		let o = m(s, n),
			a;
		typeof n == "string"
			? (a = m(s, `${n} = __placeholder`))
			: typeof n == "function" && typeof n() == "string"
			  ? (a = m(s, `${n()} = __placeholder`))
			  : (a = () => {});
		let c = () => {
				let p;
				return o((b) => (p = b)), Ot(p) ? p.get() : p;
			},
			u = (p) => {
				let b;
				o((M) => (b = M)),
					Ot(b) ? b.set(p) : a(() => {}, { scope: { __placeholder: p } });
			};
		typeof n == "string" &&
			e.type === "radio" &&
			x(() => {
				e.hasAttribute("name") || e.setAttribute("name", n);
			});
		var l =
			e.tagName.toLowerCase() === "select" ||
			["checkbox", "radio"].includes(e.type) ||
			t.includes("lazy")
				? "change"
				: "input";
		let d = P
			? () => {}
			: qe(e, l, t, (p) => {
					u(Di(e, t, p, c()));
			  });
		if (
			(t.includes("fill") &&
				([null, ""].includes(c()) ||
					(e.type === "checkbox" && Array.isArray(c()))) &&
				e.dispatchEvent(new Event(l, {})),
			e._x_removeModelListeners || (e._x_removeModelListeners = {}),
			(e._x_removeModelListeners.default = d),
			i(() => e._x_removeModelListeners.default()),
			e.form)
		) {
			let p = qe(e.form, "reset", [], (b) => {
				rt(() => e._x_model && e._x_model.set(e.value));
			});
			i(() => p());
		}
		(e._x_model = {
			get() {
				return c();
			},
			set(p) {
				u(p);
			},
		}),
			(e._x_forceModelUpdate = (p) => {
				p === void 0 && typeof n == "string" && n.match(/\./) && (p = ""),
					(window.fromModel = !0),
					x(() => fn(e, "value", p)),
					delete window.fromModel;
			}),
			r(() => {
				let p = c();
				(t.includes("unintrusive") && document.activeElement.isSameNode(e)) ||
					e._x_forceModelUpdate(p);
			});
	},
);
function Di(e, t, n, r) {
	return x(() => {
		if (n instanceof CustomEvent && n.detail !== void 0)
			return n.detail !== null && n.detail !== void 0
				? n.detail
				: n.target.value;
		if (e.type === "checkbox")
			if (Array.isArray(r)) {
				let i = null;
				return (
					t.includes("number")
						? (i = Oe(n.target.value))
						: t.includes("boolean")
						  ? (i = fe(n.target.value))
						  : (i = n.target.value),
					n.target.checked ? r.concat([i]) : r.filter((s) => !Ki(s, i))
				);
			} else return n.target.checked;
		else
			return e.tagName.toLowerCase() === "select" && e.multiple
				? t.includes("number")
					? Array.from(n.target.selectedOptions).map((i) => {
							let s = i.value || i.text;
							return Oe(s);
					  })
					: t.includes("boolean")
					  ? Array.from(n.target.selectedOptions).map((i) => {
								let s = i.value || i.text;
								return fe(s);
						  })
					  : Array.from(n.target.selectedOptions).map((i) => i.value || i.text)
				: t.includes("number")
				  ? Oe(n.target.value)
				  : t.includes("boolean")
					  ? fe(n.target.value)
					  : t.includes("trim")
						  ? n.target.value.trim()
						  : n.target.value;
	});
}
function Oe(e) {
	let t = e ? parseFloat(e) : null;
	return ki(t) ? t : e;
}
function Ki(e, t) {
	return e == t;
}
function ki(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function Ot(e) {
	return (
		e !== null &&
		typeof e == "object" &&
		typeof e.get == "function" &&
		typeof e.set == "function"
	);
}
g("cloak", (e) => queueMicrotask(() => x(() => e.removeAttribute(q("cloak")))));
Rt(() => `[${q("init")}]`);
g(
	"init",
	ne((e, { expression: t }, { evaluate: n }) =>
		typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1),
	),
);
g("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
	let i = r(t);
	n(() => {
		i((s) => {
			x(() => {
				e.textContent = s;
			});
		});
	});
});
g("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
	let i = r(t);
	n(() => {
		i((s) => {
			x(() => {
				(e.innerHTML = s), (e._x_ignoreSelf = !0), C(e), delete e._x_ignoreSelf;
			});
		});
	});
});
tt(Zt(":", en(q("bind:"))));
var Fn = (
	e,
	{ value: t, modifiers: n, expression: r, original: i },
	{ effect: s },
) => {
	if (!t) {
		let a = {};
		qr(a),
			m(e, r)(
				(u) => {
					bn(e, u, i);
				},
				{ scope: a },
			);
		return;
	}
	if (t === "key") return zi(e, r);
	if (
		e._x_inlineBindings &&
		e._x_inlineBindings[t] &&
		e._x_inlineBindings[t].extract
	)
		return;
	let o = m(e, r);
	s(() =>
		o((a) => {
			a === void 0 && typeof r == "string" && r.match(/\./) && (a = ""),
				x(() => fn(e, t, a, n));
		}),
	);
};
Fn.inline = (e, { value: t, modifiers: n, expression: r }) => {
	t &&
		(e._x_inlineBindings || (e._x_inlineBindings = {}),
		(e._x_inlineBindings[t] = { expression: r, extract: !1 }));
};
g("bind", Fn);
function zi(e, t) {
	e._x_keyExpression = t;
}
jt(() => `[${q("data")}]`);
g("data", (e, { expression: t }, { cleanup: n }) => {
	if (Hi(e)) return;
	t = t === "" ? "{}" : t;
	let r = {};
	$e(r, e);
	let i = {};
	Ur(i, r);
	let s = N(e, t, { scope: i });
	(s === void 0 || s === !0) && (s = {}), $e(s, e);
	let o = z(s);
	qt(o);
	let a = ee(e, o);
	o.init && N(e, o.init),
		n(() => {
			o.destroy && N(e, o.destroy), a();
		});
});
un((e, t) => {
	e._x_dataStack &&
		((t._x_dataStack = e._x_dataStack),
		t.setAttribute("data-has-alpine-state", !0));
});
function Hi(e) {
	return P ? (Ke ? !0 : e.hasAttribute("data-has-alpine-state")) : !1;
}
g("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
	let i = m(e, n);
	e._x_doHide ||
		(e._x_doHide = () => {
			x(() => {
				e.style.setProperty(
					"display",
					"none",
					t.includes("important") ? "important" : void 0,
				);
			});
		}),
		e._x_doShow ||
			(e._x_doShow = () => {
				x(() => {
					e.style.length === 1 && e.style.display === "none"
						? e.removeAttribute("style")
						: e.style.removeProperty("display");
				});
			});
	let s = () => {
			e._x_doHide(), (e._x_isShown = !1);
		},
		o = () => {
			e._x_doShow(), (e._x_isShown = !0);
		},
		a = () => setTimeout(o),
		c = Be(
			(d) => (d ? o() : s()),
			(d) => {
				typeof e._x_toggleAndCascadeWithTransitions == "function"
					? e._x_toggleAndCascadeWithTransitions(e, d, o, s)
					: d
					  ? a()
					  : s();
			},
		),
		u,
		l = !0;
	r(() =>
		i((d) => {
			(!l && d === u) ||
				(t.includes("immediate") && (d ? a() : s()), c(d), (u = d), (l = !1));
		}),
	);
});
g("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
	let i = Wi(t),
		s = m(e, i.items),
		o = m(e, e._x_keyExpression || "index");
	(e._x_prevKeys = []),
		(e._x_lookup = {}),
		n(() => qi(e, i, s, o)),
		r(() => {
			Object.values(e._x_lookup).forEach((a) => a.remove()),
				delete e._x_prevKeys,
				delete e._x_lookup;
		});
});
function qi(e, t, n, r) {
	let i = (o) => typeof o == "object" && !Array.isArray(o),
		s = e;
	n((o) => {
		Ui(o) && o >= 0 && (o = Array.from(Array(o).keys(), (f) => f + 1)),
			o === void 0 && (o = []);
		let a = e._x_lookup,
			c = e._x_prevKeys,
			u = [],
			l = [];
		if (i(o))
			o = Object.entries(o).map(([f, _]) => {
				let y = Ct(t, _, f, o);
				r((v) => l.push(v), { scope: { index: f, ...y } }), u.push(y);
			});
		else
			for (let f = 0; f < o.length; f++) {
				let _ = Ct(t, o[f], f, o);
				r((y) => l.push(y), { scope: { index: f, ..._ } }), u.push(_);
			}
		let d = [],
			p = [],
			b = [],
			M = [];
		for (let f = 0; f < c.length; f++) {
			let _ = c[f];
			l.indexOf(_) === -1 && b.push(_);
		}
		c = c.filter((f) => !b.includes(f));
		let ie = "template";
		for (let f = 0; f < l.length; f++) {
			let _ = l[f],
				y = c.indexOf(_);
			if (y === -1) c.splice(f, 0, _), d.push([ie, f]);
			else if (y !== f) {
				let v = c.splice(f, 1)[0],
					w = c.splice(y - 1, 1)[0];
				c.splice(f, 0, w), c.splice(y, 0, v), p.push([v, w]);
			} else M.push(_);
			ie = _;
		}
		for (let f = 0; f < b.length; f++) {
			let _ = b[f];
			a[_]._x_effects && a[_]._x_effects.forEach(Mt),
				a[_].remove(),
				(a[_] = null),
				delete a[_];
		}
		for (let f = 0; f < p.length; f++) {
			let [_, y] = p[f],
				v = a[_],
				w = a[y],
				D = document.createElement("div");
			x(() => {
				w || O('x-for ":key" is undefined or invalid', s),
					w.after(D),
					v.after(w),
					w._x_currentIfEl && w.after(w._x_currentIfEl),
					D.before(v),
					v._x_currentIfEl && v.after(v._x_currentIfEl),
					D.remove();
			}),
				w._x_refreshXForScope(u[l.indexOf(y)]);
		}
		for (let f = 0; f < d.length; f++) {
			let [_, y] = d[f],
				v = _ === "template" ? s : a[_];
			v._x_currentIfEl && (v = v._x_currentIfEl);
			let w = u[y],
				D = l[y],
				W = document.importNode(s.content, !0).firstElementChild,
				pt = z(w);
			ee(W, pt, s),
				(W._x_refreshXForScope = (Dn) => {
					Object.entries(Dn).forEach(([Kn, kn]) => {
						pt[Kn] = kn;
					});
				}),
				x(() => {
					v.after(W), C(W);
				}),
				typeof D == "object" &&
					O(
						"x-for key cannot be an object, it must be a string or an integer",
						s,
					),
				(a[D] = W);
		}
		for (let f = 0; f < M.length; f++)
			a[M[f]]._x_refreshXForScope(u[l.indexOf(M[f])]);
		s._x_prevKeys = l;
	});
}
function Wi(e) {
	let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
		n = /^\s*\(|\)\s*$/g,
		r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
		i = e.match(r);
	if (!i) return;
	let s = {};
	s.items = i[2].trim();
	let o = i[1].replace(n, "").trim(),
		a = o.match(t);
	return (
		a
			? ((s.item = o.replace(t, "").trim()),
			  (s.index = a[1].trim()),
			  a[2] && (s.collection = a[2].trim()))
			: (s.item = o),
		s
	);
}
function Ct(e, t, n, r) {
	let i = {};
	return (
		/^\[.*\]$/.test(e.item) && Array.isArray(t)
			? e.item
					.replace("[", "")
					.replace("]", "")
					.split(",")
					.map((o) => o.trim())
					.forEach((o, a) => {
						i[o] = t[a];
					})
			: /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
			  ? e.item
						.replace("{", "")
						.replace("}", "")
						.split(",")
						.map((o) => o.trim())
						.forEach((o) => {
							i[o] = t[o];
						})
			  : (i[e.item] = t),
		e.index && (i[e.index] = n),
		e.collection && (i[e.collection] = r),
		i
	);
}
function Ui(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function Bn() {}
Bn.inline = (e, { expression: t }, { cleanup: n }) => {
	let r = he(e);
	r._x_refs || (r._x_refs = {}),
		(r._x_refs[t] = e),
		n(() => delete r._x_refs[t]);
};
g("ref", Bn);
g("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
	e.tagName.toLowerCase() !== "template" &&
		O("x-if can only be used on a <template> tag", e);
	let i = m(e, t),
		s = () => {
			if (e._x_currentIfEl) return e._x_currentIfEl;
			let a = e.content.cloneNode(!0).firstElementChild;
			return (
				ee(a, {}, e),
				x(() => {
					e.after(a), C(a);
				}),
				(e._x_currentIfEl = a),
				(e._x_undoIf = () => {
					I(a, (c) => {
						c._x_effects && c._x_effects.forEach(Mt);
					}),
						a.remove(),
						delete e._x_currentIfEl;
				}),
				a
			);
		},
		o = () => {
			e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
		};
	n(() =>
		i((a) => {
			a ? s() : o();
		}),
	),
		r(() => e._x_undoIf && e._x_undoIf());
});
g("id", (e, { expression: t }, { evaluate: n }) => {
	n(t).forEach((i) => $i(e, i));
});
tt(Zt("@", en(q("on:"))));
g(
	"on",
	ne((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
		let s = r ? m(e, r) : () => {};
		e.tagName.toLowerCase() === "template" &&
			(e._x_forwardEvents || (e._x_forwardEvents = []),
			e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
		let o = qe(e, t, n, (a) => {
			s(() => {}, { scope: { $event: a }, params: [a] });
		});
		i(() => o());
	}),
);
me("Collapse", "collapse", "collapse");
me("Intersect", "intersect", "intersect");
me("Focus", "trap", "focus");
me("Mask", "mask", "mask");
function me(e, t, n) {
	g(t, (r) =>
		O(
			`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
			r,
		),
	);
}
re.setEvaluator(Yt);
re.setReactivityEngine({ reactive: ft, effect: ni, release: ri, raw: h });
var Ji = re,
	dt = Ji;
const Vi = () => {
		const e = document.querySelectorAll("input[type=checkbox][role^=switch]");
		for (const t of e)
			t.addEventListener("focus", (n) => {
				n.target.closest("label").classList.add("focus");
			}),
				t.addEventListener("blur", (n) => {
					n.target.closest("label").classList.remove("focus");
				});
	},
	Yi = async (
		{ data: e, action: t, ajaxUrl: n } = { action: null, ajaxUrl: "" },
	) => {
		if (!t) return;
		const r = new FormData();
		if ((r.append("action", t), e))
			for (const [i, s] of Object.entries(e)) r.append(i, s);
		try {
			return await (
				await fetch(n, { method: "POST", credentials: "same-origin", body: r })
			).json();
		} catch (i) {
			console.log(i);
		}
	};
window.Alpine = dt;
dt.data("options", () => ({
	loading: !1,
	btn: null,
	disabled: !1,
	success: !1,
	error: !1,
	elems: [],
	init() {
		if (
			((this.btn = this.$el.querySelector("button")),
			(this.elems = this.$el.querySelectorAll("input[type='checkbox']")),
			this.$el.classList.contains("dkr_disabled"))
		) {
			(this.btn.disabled = !0), (this.disabled = !0);
			for (const e of this.elems) e.disabled = !0;
		}
	},
	async sendForm(e) {
		if (this.disabled) return;
		(this.btn.disabled = !0), (this.loading = !0), e.preventDefault();
		const t = {};
		for (const s of this.elems) {
			const o = s.name,
				a = s.checked;
			o && (t[o] = a);
		}
		const n = this.$el.elements.action.value,
			r = this.$el.getAttribute("action"),
			i = await Yi({ data: t, action: n, ajaxUrl: r });
		(i == null ? void 0 : i.success) === !0
			? ((this.success = !0),
			  setTimeout(() => {
					this.success = !1;
			  }, 2e3))
			: ((this.error = !0),
			  setTimeout(() => {
					this.error = !1;
			  }, 2e3)),
			(this.loading = !1),
			(this.btn.disabled = !1);
	},
}));
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("gm-admin-app") && Vi();
});
dt.start();
