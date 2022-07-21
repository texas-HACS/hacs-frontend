import React from "react";

function Socials(props) {
  return (
    <div className="socials flex-row">
      <a
        href="https://www.facebook.com/groups/TexasHACS"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-facebook-f" />
      </a>
      <a
        href="https://twitter.com/texasHACS"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter" />
      </a>
      <a
        href="https://www.instagram.com/texashacs/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-instagram" />
      </a>
      <a
        href="mailto:texashacs@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="far fa-envelope" />
      </a>
      <a
        href="https://github.com/texas-HACS"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-github" />
      </a>
      <a
        href="https://discord.gg/ynMdcDBf7y"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-discord"></i>
      </a>
      
    </div>
  );
}

export default Socials;
