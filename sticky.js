/* Tested on Chrome using User JavaScript and CSS plugin*/
window.scrollTo(0, 0);
let stickyArea = 1;
let stickyOn = false;

let stickyContainer = document.querySelector('.mobile.mobile-select-collapsed');
const topBreakpoint = document.querySelector('.mobile.mobile-select-collapsed .variant-selection-detail').offsetTop;

let sizeSelector = document.querySelector('.mobile #sizeSwatch');

// Move other add to bag button into stickyContainer when selection drawers are open
let moveButton = () => {
	stickyContainer.appendChild(document.querySelector('.product-actions.product-actions--collapsible.js-add-to-bag-container'));
};

//show only sizes that are multiples of 4 inside stickyContainer
let getMultiples = () => {
	let sizes = document.querySelectorAll('.variant-item__label[data-variant-type="band-size"');
	return [...sizes].filter(item => {
		return parseInt(item.getAttribute('data-variant-value')) % 4 !== 0;
	});
};

let multiples = getMultiples();
	
// listen to scroll events, adding sticky functionality when in between sticky breakpoints
window.addEventListener("scroll", () => {
	let bottomBreakpoint = document.querySelector('.recommendation-wrapper').getBoundingClientRect().top - stickyContainer.offsetHeight - 20 + this.scrollY;
	if(this.scrollY >= topBreakpoint && this.scrollY < bottomBreakpoint) {
		// Helps to prevent page jumping at bottom breakpoint
		if(stickyArea === 3) {
			this.scrollBy(0, -stickyContainer.offsetHeight - 15);
		}
		if(!stickyOn) {
			moveButton();
			stickyContainer.classList.add('sticky');
			multiples.forEach((size) => {
				size.parentNode.classList.add('sticky-size');
			});
			stickyOn = true;
		}
		stickyArea = 2;

	}
	else {
		if(this.scrollY < topBreakpoint) {
			stickyArea = 1;
		}
		else {
			// Bottom breakpoint page jumping
			if(stickyArea === 2) {
				this.scrollBy(0, stickyContainer.offsetHeight + 15);
			}
			stickyArea = 3;

		}
		if(stickyOn) {
			stickyContainer.classList.remove('sticky');
			multiples.forEach((size) => {
				size.parentNode.classList.remove('sticky-size');
			});
			stickyOn = false;
		}
	}
});

let classChanged = new MutationObserver(() => {
  multiples = getMultiples();
	multiples.forEach((size) => {
		size.parentNode.classList.add('sticky-size');
	});
});

classChanged.observe(sizeSelector, {
  attributes: true, 
  attributeFilter: ['aria-expanded'],
});
