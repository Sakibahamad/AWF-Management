import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import slide1 from './slider_onen.png';
import slide2 from './slider_twon.png';
import slide3 from './slider_threen.png';
import './ImageSlider.css';  

const images = [
    { url: slide1 },
    { url: slide2 },
    { url: slide3 }
];

function ImageSlider() {
    return (
        <div className="slider-container">  
            <SimpleImageSlider
                className="slider"
                width={1100}
                height={406}
                images={images}
                showNavs={true}
                autoPlay={true}  
                autoPlayDelay={4.0}  
                onClick={(idx, event) => console.log(`Image ${idx + 1} clicked`)}
            />
        </div>
    );
}

export default ImageSlider;
