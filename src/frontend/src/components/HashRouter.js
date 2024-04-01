import React, { useEffect, useState } from "react";
import Home from "../containers/Home/Home";
import GameRoomForm from "../containers/GameRoom/GameRoom";

function HashRouter({ router }) {
  const [currElement, setCurrElement] = useState(<Home />);

  useEffect(() => {
    if (window.location.pathname !== "/" || window.location.hash.length > 0) {
      window.location.replace("/");
    }

    const onLinkClick = (ev) => {
      // TODO make url redirects with buttons
      if (!ev.detail.username) return;

      const path = window.location.href.split("#")[1];
      let element;

      // TODO:
      if (path.includes("[") && path.includes("]")) {
        const params = extractRoomAndPlayerRoom(path);
        if (params) {
          element = {
            href: ":roomName[:playerName]",
            element: (
              <GameRoomForm
                playerName={params.playerName}
                roomName={params.roomName}
              />
            ),
          };
        }
      } else {
        element = router.find((item) => item.href === path);
      }

      if (element) setCurrElement(element.element);
      else window.location.replace("/");
    };

    const onLocationChanged = (ev) => {
      window.location.replace("/");
    };

    window.addEventListener("popstate", onLocationChanged);
    window.addEventListener("linkClick", onLinkClick);

    return () => {
      window.removeEventListener("popstate", onLocationChanged);
      window.addEventListener("linkClick", onLinkClick);
    };
  }, [router]);

  const extractRoomAndPlayerRoom = (url) => {
    const match = url.match(/([^[]+)\[([^\]]+)\]/);

    if (match) {
      const roomName = match[1];
      const playerName = match[2];
      return { roomName, playerName };
    }
  };

  return currElement;
}

export default HashRouter;
