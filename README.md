# Noodles-YSWS-submission


## About
A top to bottom slideshow of a chicken's lifespan made with GSAP for HackClub's Noodles YSWS

## How it works
We have 3 main files:

- index.html : The main HTML lives here.
- style.css : For CSS styles and structural layouts.
- main.js : For the logic and GSAP scroll animations.

### index.html
Our mainlayout uses a slide <div> element configured like this:

```html
<div class="slide" data-bg="#fff0e0">
  <div class="slide-inner">
    <p class="slide-credit">subtitle goes here</p>
    <img src="img link" alt="" class="slide-img" />
    <p class="slide-text">
      slide text goes here
    </p>
  </div>
</div>
```

### style.css
originally I had planned to use tailwind.css but I couldnt get it ro run properly so I used regular css
The css is pretty self explanatory with styles for the bg , slides and progress dots


### main.js 
Uses gsap code to make a top to bottom slideshow. We use a basic circular queue method here for changing current slide. NOTE: AI was used to help make the gsap animations 

