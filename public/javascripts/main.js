var owl = $('.owl-carousel');

owl.owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,

    //items: 4,
    nav: true,
    center: true,
    dots: true,
    loop: true,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
        0: {
            items: 2,
        },
        485: {
            items: 2,
        },
        728: {
            items: 3,
        },
        960: {
            items: 4,
        },
        1200: {
            items: 4,
        }
    }

});

// Owl Carousel Mousewheel
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY > 0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});