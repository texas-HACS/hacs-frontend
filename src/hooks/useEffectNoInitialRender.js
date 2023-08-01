// Credit https://www.thearmchaircritic.org/tech-journal/prevent-useeffects-callback-firing-during-initial-render
// Exports a custom useEffect hook that does not run on the initial render which is typical of the 
// regular useEffect hook. So far, it is only used in AdminPanel.js

import { useEffect, useRef } from "react";

export default function useEffectNoInitialRender(effect, deps) {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns = () => {};

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
  }, deps);
}
