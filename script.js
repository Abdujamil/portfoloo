var swiper = new Swiper(".projectsSwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  mousewheel: {
    releaseOnEdges: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


function setup() {
	const loaderText = document.querySelector(".loader__text");

	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	let progress = {
		current: 0,
		target: 0
	};

	// update progress target
	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				progress.target = loadedImages / totalImages;
			}
		});
	});

	// lerp progress current to progress target
	raf.add(({ id }) => {
		progress.current = lerp(progress.current, progress.target, 0.06);

		const progressPercent = Math.round(progress.current * 100);
		loaderText.textContent = `${progressPercent}%`;

		// hide loader when progress is 100%
		if (progressPercent === 100) {
			init();

			// remove raf callback when progress is 100%
			raf.remove(id);
		}
	});
}

setup();



// $(function () {
// 	$(".arr-down").on("click", function (e) {
// 		e.preventDefault();
// 		$("html, body").animate(
// 			{ scrollTop: $($(this).attr("href")).offset().top },
// 			500,
// 			"linear"
// 		);
// 	});
// });


