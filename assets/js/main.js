

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

// Sticky header

document.addEventListener('scroll', function () {
	const header = document.querySelector('#header'); 
	const scrollThreshold = 50;

	if (window.scrollY > scrollThreshold) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

// Make anchor stop after header

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
	  e.preventDefault();
	  const target = document.querySelector(this.getAttribute('href'));
	  if (target) {
		const headerHeight = document.querySelector('header').offsetHeight;
		const offset = target.offsetTop - headerHeight;
		window.scrollTo({ top: offset, behavior: 'smooth' });
	  }
	});
  });	

// Arrow icon appear when scrolling down

document.addEventListener('scroll', function () {
	const scrollToTopButton = document.getElementById('scrollToTop');
	const scrollThreshold = 100;

	if (window.scrollY > scrollThreshold) {
		scrollToTopButton.style.display = 'block';
	} else {
		scrollToTopButton.style.display = 'none';
	}
});

document.getElementById('scrollToTop').addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// Show/hide the down arrow based on scroll position

document.addEventListener('scroll', function () {
	const scrollDownButton = document.getElementById('scrollDown');

	// Show the down arrow only when at the top of the page

	if (window.scrollY === 0) {
		scrollDownButton.style.display = 'block';
	} else {
		scrollDownButton.style.display = 'none';
	}
});

// Scroll to the portfolio section when clicking the down arrow

document.getElementById('scrollDown').addEventListener('click', function () {
	const portfolioSection = document.getElementById('portfolio');

	portfolioSection.scrollIntoView({
		behavior: 'smooth'
	});
});

// Scroll down smoothly from header

document.querySelectorAll('nav ul li a').forEach(anchor => {
	anchor.addEventListener('click', function (event) {
		const targetId = this.getAttribute('href');

		if (targetId.startsWith('#')) {
			event.preventDefault();

			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth'
				});
			}
		}
	});
});

// Parallax effect .conent over .about-me 

document.addEventListener("scroll", () => {
	const content = document.querySelector(".content");
	const opening = document.querySelector(".opening");
	const scrollY = window.scrollY;
  
	// Fade out opening section as you scroll down
	if (scrollY < window.innerHeight) {
	  opening.style.opacity = 1 - scrollY / window.innerHeight;
	}
  
	// Ensure .opening stays fixed while .content scrolls over it
	if (scrollY >= window.innerHeight) {
	  opening.style.opacity = 0;
	}
  });

//   Make .bio and .location div disappear at bottom of the page
  
  window.addEventListener('scroll', function() {
    const bio = document.querySelector('.bio');
    const location = document.querySelector('.location');
	const photo = document.querySelector('.photo');
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight * 0.8) {
        bio.style.opacity = '0';
        location.style.opacity = '0';
		photo.style.opacity = '0';
    } else {
        bio.style.opacity = '1';
        location.style.opacity = '1';
		photo.style.opacity = '1';
    }
});



  

  
  











