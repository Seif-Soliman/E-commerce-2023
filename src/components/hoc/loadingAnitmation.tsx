import { useRef, useEffect } from "react";
import Lottie from "lottie-web";

const LoadingAnimation = () => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      Lottie.loadAnimation({
        container: container.current, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "../../../../LoadingAnimation.json", // the path to the animation json
      });
    }
  }, []);

  return (
    <div>
      <div className="container" ref={container}></div>
    </div>
  );
};

export default LoadingAnimation;
