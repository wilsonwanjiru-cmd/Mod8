$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    // Handle form submission with AJAX
    $('#your-form-id').submit(function(e){
        e.preventDefault(); // Prevent the default form submission

        // Gather form data
        var formData = $(this).serialize(); // serializes the form data into a query string

        // Send data to the backend using AJAX POST request
        $.ajax({
            url: 'http://localhost:6000/api/messages', // Replace with your backend endpoint
            type: 'POST',
            data: formData,
            success: function(response) {
                // Handle success response
                console.log('Form submitted successfully:', response);
                alert('Form submitted successfully!');
                // Optionally reset the form
                $('674652ccfbb23dc15858b9ce')[0].reset();
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error('Form submission failed:', error);
                alert('Form submission failed. Please try again.');
            }
        });
    });
});
