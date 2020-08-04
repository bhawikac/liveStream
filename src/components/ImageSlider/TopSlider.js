
import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './Distributor'






const images= [
    {
      original: 'https://ff-int.api.wexer.com/media/images/cathe_friedrich_lean_legs_and_abs.jpg',
      originalClass :'sliderImage',
      description :<div className="bannerTextBottom"><h1>MARKETING TAG LINE 1</h1><p>Description line lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p></div>
    },
    {
      original: 'https://ff-int.api.wexer.com/media/images/dance1_modified_highres.jpg',
      originalClass :'sliderImage',
      description :<div className="bannerTextBottom"><h1>MARKETING TAG LINE 2</h1><p>Description line lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p></div>
    
    },
    {
      original: 'https://ff-int.api.wexer.com/media/images/customfit_muay1__thsub__highres.jpg',
      originalClass :'sliderImage',
      description :<div className="bannerTextBottom"><h1>MARKETING TAG LINE 3</h1><p>Description line lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p></div>
    }
  ]

 
function TopSlider(props) {
  return( 
  <div  > 
  <ImageGallery items={images} showThumbnails={false} showFullscreenButton={false} showPlayButton={false}  lazyLoad={true} onClick={'ExecuteOnClick()'}/>
       
       {/* <div className="bannerTextBottom">
        <h1>MARKETING TAG LINE</h1>
        <p>Description line lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
       </div> */}
       
   </div>
);
  }

  export default TopSlider;