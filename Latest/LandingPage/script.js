var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");
document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    
    blur.style.left = dets.x - 180 + "px";
    blur.style.top = dets.y - 180 + "px";
});

var h4all = document.querySelectorAll("#nav h4");
h4all.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        crsr.style.scale = 3;
        crsr.style.border = "1px solid #fff";
        crsr.style.backgroundColor = "transparent";
    });

    elem.addEventListener("mouseleave", function () {
        crsr.style.scale = 1;
        crsr.style.border = "0px solidrgb(81, 134, 116)";
        crsr.style.backgroundColor = "#7FFFD4";
    });
});

// Restrict access to certain features until login
document.addEventListener("DOMContentLoaded", function () {
    const restrictedLinks = document.querySelectorAll(".restricted");

    restrictedLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Please log in to access this feature.");
        });
    });

    document.getElementById("login").addEventListener("click", function () {
        window.location.href = "login.html"; // Redirect to login page
    });

    document.getElementById("signup").addEventListener("click", function () {
        window.location.href = "signup.html"; // Redirect to signup page
    });
});

gsap.to("#nav", {
    backgroundColor: "#000",
    height: "12vh",
    duration: 0.5,
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 1
    }
});

gsap.to("#main", {
    backgroundColor: "#000",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2
    }
});

gsap.from("#about-us img ,#about-us-in", {
    y: 90,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#about-us",
        scroller: "body",
        markers: false, // Hide markers
        start: "top 70%",
        end: "top 65%",
        scrub: 3
    }
});

gsap.from(".cards", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
        trigger: ".cards",
        scroller: "body",
        markers: false, // Hide markers
        start: "top 70%",
        end: "top 65%",
        scrub: 2
    }
});
