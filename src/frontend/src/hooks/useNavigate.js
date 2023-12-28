import { useSelector } from "react-redux";

function useNavigate() {
  const { username } = useSelector((state) => state.player);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    const ev = new CustomEvent("linkClick", { detail: { username } });
    window.dispatchEvent(ev);
  };

  return navigate;
}

export default useNavigate;
