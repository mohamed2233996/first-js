//local storage color
let mainColors = localStorage.getItem("color_option")

if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color', mainColors);

    //check active
    //remove active
    document.querySelectorAll(".color-op li").forEach(element => {
        element.classList.remove("active");
    

        //add active with Data-colors list item
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });

};

//local storage background
let backgroundLocol = localStorage.getItem("background_option")

if (backgroundLocol !== null) {


    if (backgroundLocol === 'true') {
        backgroundLocol = true;
    }
    else {
        backgroundLocol = false;
    }
    

    //remove active for all
    document.querySelectorAll(".Background span").forEach(element => {
        element.classList.remove("active");
    });

    //add active with Local Data-background

    if (backgroundLocol == true) {
        document.querySelector(".Background .yes").classList.add("active");
    } else {
        document.querySelector(".Background .no").classList.add("active");
    };

};




//setings
document.querySelector(".toggle-setings .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");


    //for elment
    document.querySelector(".settings-box").classList.toggle("open");

};


//switch color
const colorsli = document.querySelectorAll(".color-op li");

colorsli.forEach(li => {

    li.addEventListener("click", (e) => {

        //set on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //set on locl
        localStorage.setItem("color_option", e.target.dataset.color);
        //handel active
        handleActive(e)
    });

});

//switch background random

const backgroundcolor = document.querySelectorAll(".Background span");

backgroundcolor.forEach(span => {

    span.addEventListener("click", (e) => {
        //handle active
        handleActive(e)

        if (e.target.dataset.background === 'yes') {
            
            BackgroundOption = true;
            randomizeImg();
            localStorage.setItem("background_option", true);
        }
        else{
            BackgroundOption = false;
            clearInterval(intervalImg)
            localStorage.setItem("background_option", false);
        }
    });

});

//switch bullets

let bulletsli = document.querySelectorAll(".bullets-option span");
let bulletsContent = document.querySelector(".nav-bullets")
let bulletsLocal = localStorage.getItem("bullets_option")

if (bulletsLocal!== null) {
    bulletsli.forEach(span => {
        span.classList.remove("active")
    })
    if (bulletsLocal === 'block') {
        bulletsContent.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else{
        bulletsContent.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsli.forEach(span => {

    span.addEventListener("click", (e) => {

        if (e.target.dataset.display === "yes") {
            bulletsContent.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        }else{
            bulletsContent.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e)
    });
});

//reset btn
document.querySelector(".reset-btn").onclick = function() {
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    localStorage.removeItem("bullets_option")
    //reload window
    window.location.reload();
}

// landing page Element 
let page = document.querySelector(".landing-page");

// landing page img
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];


//Background option
let BackgroundOption = true;

//variable to control the interval
let intervalImg;


//function to randomize img
function randomizeImg() {
    if (BackgroundOption === true) {
        
        intervalImg = setInterval(() => {

            //random num
            let randomNum = Math.floor(Math.random() * imgsArray.length);
            
            //cheng bg
            page.style.backgroundImage = 'url("img/' + imgsArray[randomNum] + '")'
        
        
        }, 10000)
    }
}

// OUR SKILL

let ourskill = document.querySelector(".skills");

window.onscroll = function () {
    

    //skill offset top
    let skillOffsetTop = ourskill.offsetTop;

    //skill outer height
    let skillOuterHeight = ourskill.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //scrollTop
    let scrollTop = this.pageYOffset;

    if (scrollTop > (skillOffsetTop + skillOuterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll(".skills-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }

}


//Gallery

let ourGallery = document.querySelectorAll(".Gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {
        
        //creare overlay
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';

        //add overlay to body
        document.body.appendChild(overlay);

        //caeate popup box
        let popupBox = document.createElement("div");

        //add class to popup box
        popupBox.className = 'popup-box';

        //create heading and abend it
        if (img.alt !== null) {

            //create Heading
            let heading = document.createElement("h3");

            //creat text for Heading
            let headingText = document.createTextNode(img.alt);

            //add text to Heading
            heading.appendChild(headingText);

            //add Heading to popup box
            popupBox.appendChild(heading);
            
        }

        //create img
        let popupImg = document.createElement("img");

        //set img source
        popupImg.src = img.src;

        //add img to popup box
        popupBox.appendChild(popupImg);

        //add popup box to body
        document.body.appendChild(popupBox);

        // //add close button
        let closeBtn = document.createElement("span");
        closeBtn.className = 'popup-close';
        closeBtn.innerHTML = '&times;';
        popupBox.appendChild(closeBtn);
        closeBtn.addEventListener('click', (e) => {
            overlay.remove();
            popupBox.remove();
        });
    });
})

///////////
function handleActive(event) {

    //remove active for all
    event.target.parentElement.querySelectorAll(".active").forEach(Element => {
        Element.classList.remove("active");
    });
    //add active
    event.target.classList.add("active")
}


function scrollToSamewhere(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector (e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}

// nav bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

scrollToSamewhere (allBullets)

//nav links
const allKLinks = document.querySelectorAll(".links li")

scrollToSamewhere (allKLinks)


//popup menu

let popupMenu = document.querySelector(".popup-menu");
let popupLinks = document.querySelector(".links")

popupMenu.onclick = function name(e) {
    //stop propagation
    e.stopPropagation();

    //toggle menu active
    this.classList.toggle("active")

    //toggle links box
    popupLinks.classList.toggle("open")
};

//click anywhere outside menu and toggle button
document.addEventListener("click", (e) =>{
    if(e.target!= popupMenu && e.target !== popupLinks){
        //check if menu is open
        if(popupLinks.classList.contains("open")){

            popupMenu.classList.remove("active")
            popupLinks.classList.remove("open")
        }
    }
});

//stop propagation on menu
popupLinks.onclick = function (e) {
    e.stopPropagation();
}


