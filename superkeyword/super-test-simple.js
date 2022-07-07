                    
class k {
	constructor(t) {
		this.eventManager = t, this.data = Object.create(null)
	}
	destroy() {}
	createElement(t, e) {
		return e ? document.createElementNS(w[e] || e, t) : document.createElement(t)
	}
   
	appendChild(t, e) {
		t.appendChild(e)
	}
	insertBefore(t, e, n) {
		t && t.insertBefore(e, n)
	}
	removeChild(t, e) {
		t && t.removeChild(e)
	}
	setAttribute(t, e, n, i) {
		if (i) {
			e = i + ":" + e;
			const r = w[i];
			r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n)
		} else t.setAttribute(e, n)
	}
   
	setProperty(t, e, n) {
		t[e] = n
	}
	
}
                    
class D extends k {
	constructor(t, e, n, i) {
		super(t), this.component = n;
		const r = E(i + "-" + n.id, n.styles, []);
		var o;
		e.addStyles(r), this.contentAttr = (o = i + "-" + n.id, x.replace(C, o)), this.hostAttr = function(t) {
			return O.replace(C, t)
		}(i + "-" + n.id)
	}
	applyToHost(t) {
		super.setAttribute(t, this.hostAttr, "")
	}
	createElement(t, e) {
		const n = super.createElement(t, e);
		return super.setAttribute(n, this.contentAttr, ""), n
	}
}
                    
class A extends k {
	constructor(t, e, n, i) {
		super(t), this.sharedStylesHost = e, this.hostEl = n, this.component = i, i.encapsulation === r.qb.ShadowDom ? this.shadowRoot = n.attachShadow({
			mode: "open"
		}) : this.shadowRoot = n.createShadowRoot(), this.sharedStylesHost.addHost(this.shadowRoot);
		const o = E(i.id, i.styles, []);
		for (let r = 0; r < o.length; r++) {
			const t = document.createElement("style");
			t.textContent = o[r], this.shadowRoot.appendChild(t)
		}
	}
	nodeOrShadowRoot(t) {
		return t === this.hostEl ? this.shadowRoot : t
	}
	destroy() {
		this.sharedStylesHost.removeHost(this.shadowRoot)
	}
	appendChild(t, e) {
		return super.appendChild(this.nodeOrShadowRoot(t), e)
	}
	insertBefore(t, e, n) {
		return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
	}
	removeChild(t, e) {
		return super.removeChild(this.nodeOrShadowRoot(t), e)
	}
	parentNode(t) {
		return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
	}
}
					
var win = window.location;
					
function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function myFunction() {
  document.getElementById("demo").innerHTML = "" + randomInt(1,100);;
}