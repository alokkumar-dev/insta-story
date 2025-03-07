import React, { useEffect, useState } from "react";
import "../App.css";

type StoryViewerProps = {
  stories: any;
  currentIndex: number;
  onClose: () => void;
};

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  onClose,
}) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < stories.length - 1) {
        setIndex(index + 1);
      } else {
        onClose();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, stories.length, onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={stories[index].userStory} className="modal-img" alt="Story" />
        <div
          className="nav-zone"
          style={{ left: 0 }}
          onClick={() => index > 0 && setIndex(index - 1)}
        />
        <div
          className="nav-zone"
          style={{ right: 0 }}
          onClick={() => index < stories.length - 1 && setIndex(index + 1)}
        />
        <button onClick={onClose} className="close-btn">
          ✕
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
