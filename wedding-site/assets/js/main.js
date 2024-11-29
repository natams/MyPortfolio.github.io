

(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile)
		$body.addClass('is-touch');

	// Forms.
	var $form = $('form');

	// Auto-resizing textareas.
	$form.find('textarea').each(function () {

		var $this = $(this),
			$wrapper = $('<div class="textarea-wrapper"></div>'),
			$submits = $this.find('input[type="submit"]');

		$this
			.wrap($wrapper)
			.attr('rows', 1)
			.css('overflow', 'hidden')
			.css('resize', 'none')
			.on('keydown', function (event) {

				if (event.keyCode == 13
					&& event.ctrlKey) {

					event.preventDefault();
					event.stopPropagation();

					$(this).blur();

				}

			})
			.on('blur focus', function () {
				$this.val($.trim($this.val()));
			})
			.on('input blur focus --init', function () {

				$wrapper
					.css('height', $this.height());

				$this
					.css('height', 'auto')
					.css('height', $this.prop('scrollHeight') + 'px');

			})
			.on('keyup', function (event) {

				if (event.keyCode == 9)
					$this
						.select();

			})
			.triggerHandler('--init');

		// Fix.
		if (browser.name == 'ie'
			|| browser.mobile)
			$this
				.css('max-height', '10em')
				.css('overflow-y', 'auto');

	});

	// Menu.
	var $menu = $('#menu');

	$menu.wrapInner('<div class="inner"></div>');

	$menu._locked = false;

	$menu._lock = function () {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function () {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function () {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function () {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menu
		.appendTo($body)
		.on('click', function (event) {
			event.stopPropagation();
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			if (href == '#menu')
				return;

			window.setTimeout(function () {
				window.location.href = href;
			}, 350);

		})
		.append('<a class="close" href="#menu">Close</a>');

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('click', function (event) {

			// Hide.
			$menu._hide();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});

})(jQuery);

// Hide Header when scrolling down

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let screenWidth = window.innerWidth;

    // Apply the hide/show behavior only if the screen width is larger than 900px
    if (screenWidth > 900) {
        if (currentScroll > lastScrollTop) {
            header.style.transform = 'translateY(-100%)'; // Hide the header on scroll down
        } else if (currentScroll === 0) {
            header.style.transform = 'translateY(0)'; // Show the header only when at the top of the page
        }
    } else {
        // If screen width is less than or equal to 900px, ensure the header is visible
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);


// Up and Down Arrow Buttons
const scrollToTop = document.getElementById('scrollToTop');
const scrollDown = document.getElementById('scrollDown');

window.addEventListener('scroll', () => {
	const scrollTop = window.scrollY;

	// Show the "scroll-to-top" button when scrolling down
	if (scrollTop > 50) {
		scrollToTop.classList.add('visible');
		scrollToTop.classList.remove('hidden');
	} else {
		scrollToTop.classList.add('hidden');
		scrollToTop.classList.remove('visible');
	}

	// Hide the "scroll-down" button when not at the top
	if (scrollTop > 50) {
		scrollDown.classList.add('hidden');
		scrollDown.classList.remove('visible');
	} else {
		scrollDown.classList.add('visible');
		scrollDown.classList.remove('hidden');
	}
});

// Scroll-to-top button functionality
scrollToTop.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll-down button functionality
scrollDown.addEventListener('click', () => {
	const pageHeight = window.innerHeight;
	window.scrollTo({ top: pageHeight, behavior: 'smooth' });
});

// COUNTDOWN

class CountdownElement extends HTMLElement {
	connectedCallback() {
		this.updateCountdown();
		setInterval(() => this.updateCountdown(), 1000);
	}

	updateCountdown() {
		const countdownDate = new Date('July 20, 2025 00:00:00').getTime();
		const currentDate = new Date().getTime();
		const timeDifference = countdownDate - currentDate;

		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

		this.innerHTML = `
                <div id="days">${days}</div>
                <div id="hours">${hours}</div>
                <div id="minutes">${minutes}</div>
                <div id="seconds">${seconds}</div>
            `;
	}
}
customElements.define('custom-countdown', CountdownElement);
document.addEventListener('DOMContentLoaded', function () { });

// RSVP Email

document.getElementById('rsvp-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;

    fetch(form.action, {
        method: form.method,
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
    })
        .then(response => {
            if (response.ok) {
                form.reset(); 
                document.getElementById('thank-you-message').style.display = 'block'; 
            } else {
                alert('There was an issue submitting your RSVP. Please try again.');
            }
        })
        .catch(error => {
            alert('There was an error submitting the form. Please try again.');
        });
});

// Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const duration = 600; // Duration in milliseconds

        const start = window.pageYOffset;
        const end = target.getBoundingClientRect().top + start;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, start + (end - start) * ease);

            if (elapsed < duration) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    });
});

// Detect Chrome on mobile

if (/Chrome/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent)) {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('chrome-mobile');
    }
}




