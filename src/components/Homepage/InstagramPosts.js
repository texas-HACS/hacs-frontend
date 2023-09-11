import React, { useEffect } from "react";
// import Fade from "react-reveal/Fade";
import { InstagramEmbed } from 'react-social-media-embed';

function InstagramPosts() {

  return (
    <section className="insta-feed">
      
      <h3 className="section-title">Latest Posts</h3>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <InstagramEmbed url="https://www.instagram.com/p/Cwyc4mfM5ds/" width={400} />
        <InstagramEmbed url="https://www.instagram.com/p/CwvxqMeLGZc/" width={400} />
        <InstagramEmbed url="https://www.instagram.com/p/CwNw-c6L_dr/" width={400} />
      </div>

    </section>
  );
}

export default InstagramPosts;
