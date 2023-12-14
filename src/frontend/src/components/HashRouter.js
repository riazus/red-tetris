import React, { useEffect, useState } from "react";
import Home from "../containers/Home/Home";

function HashRouter({ router }) {
  const [currElement, setCurrElement] = useState(<Home />);

  useEffect(() => {
    if (window.location.pathname !== "/" || window.location.hash.length > 0) {
      window.location.replace("/");
    }

    const onLocationChanged = (ev) => {
      const path = window.location.href.split("#")[1];
      const element = router.find((item) => item.href === path);

      if (element) setCurrElement(element.element);
      else window.location.replace("/");
    };

    window.addEventListener("popstate", onLocationChanged);

    return () => {
      window.removeEventListener("popstate", onLocationChanged);
    };
  }, []);

  return currElement;
}

export default HashRouter;
