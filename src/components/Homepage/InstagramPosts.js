import React, { useEffect } from "react";
import { InstagramEmbed } from 'react-social-media-embed';

function InstagramPosts(props) {
  let postData = props.posts;

  return (
    <section className="insta-feed">
      
      <h3 className="section-title">Latest Posts</h3>

      <div className="posts">
        {Object.keys(postData)
          .map((uid) => postData[uid])
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
          .map((post) => {
            return <InstagramEmbed className="post" url={post.url} />
          })}
      </div>

    </section>
  );
}

export default InstagramPosts;
