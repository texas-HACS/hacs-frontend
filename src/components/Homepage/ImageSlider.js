import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import ABCSQuora from "../../media/Game Night w ABCS & Quora.jpg";
import GeneralMeeting from "../../media/General Meeting.jpg";
import GroupPhoto from "../../media/Group Photo.jpg";
import NetworkingDinner from "../../media/Networking Dinner.jpg";
import TopGolfPlaying from "../../media/Top Golf Playing.jpg";
import TopGolfTalking from "../../media/Top Golf Talking w Google.jpg";
import HACSbanquet1 from "../../media/HACSBanquet.jpg"
import HACSbanquet2 from "../../media/Banquet2.JPG"
import DaveNBuster from "../../media/DaveNBusters.jpg"
import kayak from "../../media/Kayak.jpg"
import kayak2 from "../../media/Kayak2.jpg"
import parkNpizza from "../../media/ParkNPizza.jpg"
import kayak3 from "../../media/HACSKayak.jpg"
import park from "../../media/HACSPark.jpg"
import Fade from "react-reveal/Fade";

const HACSFallKickoff1 =
  "https://firebasestorage.googleapis.com/v0/b/hacs-opensource.appspot.com/o/homepage_slider_images%2Fhacs_fall_2021_kickoff.png?alt=media&token=fd103545-1f6d-4432-a8eb-bd1617c6e773";
const HACSFallKickoff2 =
  "https://firebasestorage.googleapis.com/v0/b/hacs-opensource.appspot.com/o/homepage_slider_images%2Fhacs_fall_2021_kickoff_1.png?alt=media&token=41960e16-a10a-43e8-b144-f022fde41d76";

const images = [
  {
    original: HACSbanquet1,
    originalAlt: "2022 CS Diversity Banquet",
  },
  {
    original: HACSbanquet2,
    originalAlt: "2022 CS Diversity Banquet",
  },
  {
    original: parkNpizza,
    originalAlt: "HACS Austin's Park and Pizza",
  },
  {
    original: kayak,
    originalAlt: "HACS Kayaking Social",
  },
  {
    original: kayak2,
    originalAlt: "HACS Kayaking Social",
  },
  {
    original: DaveNBuster,
    originalAlt: "HACS Dave and Busters Social",
  },
  {
    original: HACSFallKickoff1,
    originalAlt: "HACS Fall 2021 Kickoff",
  },
  {
    original: HACSFallKickoff2,
    originalAlt: "HACS Fall 2021 Kickoff",
  },
  {
    original: ABCSQuora,
    originalAlt: "HACS Game Night w ABCS & Quora",
  },
  {
    original: GeneralMeeting,
    originalAlt: "HACS General Meeting",
  },
  {
    original: GroupPhoto,
    originalAlt: "Group Photo of HACS Members",
  },
  
  {
    original: NetworkingDinner,
    originalAlt: "Diversity Networking Dinner with ABCS",
  },
  {
    original: TopGolfPlaying,
    originalAlt: "Playing golf at TopGolf social",
  },
  {
    original: TopGolfTalking,
    originalAlt: "Talking to Google recruiters at TopGolf social",
  },
  {
    original: kayak3,
    originalAlt: "HACS 2023 Kayaking Social",
  },
  {
    original: park,
    originalAlt: "HACS 2023 Park Social",
  },
];

function ImageSlider() {
  const [captionIndex, updateCaptionIndex] = useState(0);

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
