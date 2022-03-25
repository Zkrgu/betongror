const form = document.getElementById('form');
const out = document.getElementById('out');

form.addEventListener('submit', e => {
	e.preventDefault();
	processForm(e.target);
	[...form.querySelectorAll('input[type="number"]')].map(e=>e.addEventListener('change', e => processForm(e.target.parentElement.parentElement)));
});

function processForm(form){
	const formData = new FormData(form);

	const pipe = new HollowCylinder(+formData.get('d')/2, +formData.get('D')/2, formData.get('l'));
	const innerVolume = pipe.hollowVolume;
	const volume = pipe.volume;
	const concreteQuantity = Concrete.getQuantity(volume);
	const concretePrice = Concrete.getPrice(concreteQuantity);

	out.innerHTML = `<h3>Indre volum</h3><p>${innerVolume.toFixed(2)} L</p>
<h3>Betong nødvendig</h3><p>${volume.toFixed(2)} L, tilsvarer ${concreteQuantity} sekk(er) á ${Concrete.getPrice(1)} kr</p>
<h3>Total Pris</h3><p>${concretePrice} kr</p>`;
}

class HollowCylinder{
	constructor(inner, outer, height){
		this._r = inner;
		this._R = outer;
		this._h = height;
	}
	get volume(){
		return Math.PI*(this._R**2-this._r**2)*this._h;
	}
	get hollowVolume(){
		return Math.PI*this._r**2*this._h;
	}
}

class Concrete{
	static getPrice(q){ return q*89 }
	static getQuantity(volume) { return Math.ceil(volume/12.5)}
}
