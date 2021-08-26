import { useEffect, useState, useRef } from "react";

function useSticky() {
  const [isSticky, setSticky] = useState(false);

  const element = useRef();

  const handleScroll = () => {
    const top = element.current?.getBoundingClientRect().top;
    top < 0 ? setSticky(true) : setSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, [handleScroll]);

  return { isSticky, element };
}

export default useSticky;
