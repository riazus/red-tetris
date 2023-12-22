import { useSelector } from "react-redux";

function useNavigate() {
  const { username } = useSelector((state) => state.userState);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    const ev = new CustomEvent("linkClick", { detail: { username } });
    window.dispatchEvent(ev);
  };

  return navigate;
}

export default useNavigate;
