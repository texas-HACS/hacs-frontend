import React, { useState } from "react";
import "./Homepage.scss";
import ImageGallery from "react-image-gallery";
import ABCSQuora from "../../media/Game Night w ABCS & Quora.jpg";
import GeneralMeeting from "../../media/General Meeting.jpg";
import GroupPhoto from "../../media/Group Photo.jpg";
import GoogleMeeting from "../../media/Meeting w Google.jpg";
import NetworkingDinner from "../../media/Networking Dinner.jpg";
import StudyNight from "../../media/Study Night.jpg";
import TopGolfFood from "../../media/Top Golf Food Line.jpg";
import TopGolfPlaying from "../../media/Top Golf Playing.jpg";
import TopGolfTalking from "../../media/Top Golf Talking w Google.jpg";
import Fade from "react-reveal/Fade";

const HACSFallKickoff1 =
  "https://firebasestorage.googleapis.com/v0/b/hacs-opensource.appspot.com/o/homepage_slider_images%2Fhacs_fall_2021_kickoff.png?alt=media&token=fd103545-1f6d-4432-a8eb-bd1617c6e773";
const HACSFallKickoff2 =
  "https://firebasestorage.googleapis.com/v0/b/hacs-opensource.appspot.com/o/homepage_slider_images%2Fhacs_fall_2021_kickoff_1.png?alt=media&token=41960e16-a10a-43e8-b144-f022fde41d76";

const images = [
  {
    original: HACSFallKickoff1,
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
    original: GoogleMeeting,
    originalAlt: "General Meeting with Google Employees",
  },
  {
    original: HACSFallKickoff2,
    originalAlt: "HACS Fall 2021 Kickoff",
  },
  {
    original: NetworkingDinner,
    originalAlt: "Diversity Networking Dinner with ABCS",
  },
  {
    original: StudyNight,
    originalAlt: "Study Night with HACS Members",
  },
  {
    original: TopGolfFood,
    originalAlt: "Waiting in line for food at TopGolf social",
  },
  {
    original: TopGolfPlaying,
    originalAlt: "Playing golf at TopGolf social",
  },
  {
    original: TopGolfTalking,
    originalAlt: "Talking to Google recruiters at TopGolf social",
  },
];

function ImageSlider() {
  const [captionIndex, updateCaptionIndex] = useState(0);

  return (
    <section className="slider">
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
