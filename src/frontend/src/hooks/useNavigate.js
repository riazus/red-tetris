function useNavigate() {
  const navigate = (path) => {
    window.history.pushState({}, "", path);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return navigate;
}

export default useNavigate;
