import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import Fade from "react-reveal/Fade";



function ImageSlider(props) {
  const [captionIndex, updateCaptionIndex] = useState(0);
  let images = Object.keys(props?.images)
    .map((uid) => (props.images[uid]))
    ?.sort((a, b) => {
      return a?.order - b?.order;
    })
    .map((i) => ({
      original: i.image.url,
      originalAlt: i.alt,
    }));

  return (
    <section className="image-slider">
      <h3 className="section-title">Photos</h3>
      <Fade>
        <ImageGallery
          items={images}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          autoPlay={true}
          slideDuration={0}
          slideInterval={7000}
          onBeforeSlide={updateCaptionIndex}
        />
      </Fade>
      <Fade bottom>
        <p className="caption">{images[captionIndex].originalAlt}</p>
      </Fade>
    </section>
  );
}

export default ImageSlider;
