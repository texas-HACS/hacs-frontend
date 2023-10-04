import React, { useEffect } from "react";
import { InstagramEmbed } from 'react-social-media-embed';

function InstagramPosts(props) {
  let postData = props.posts;

  return (
    <section className="insta-feed">
      
      <h3 className="section-title">Latest Posts</h3>

      <div className="posts">
        <InstagramEmbed className="post" url="https://www.instagram.com/p/Cwyc4mfM5ds/" />
        <InstagramEmbed className="post" url="https://www.instagram.com/p/CwvxqMeLGZc/" />
        <InstagramEmbed className="post" url="https://www.instagram.com/p/CwNw-c6L_dr/" />
      </div>

    </section>
  );
}

export default InstagramPosts;
