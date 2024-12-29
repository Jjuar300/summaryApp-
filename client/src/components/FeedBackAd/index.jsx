import { useDispatch, useSelector } from "react-redux";
import { setOnClick } from "../../Redux/feedBack";

export default function FeedbackAd() {
  const dispatch = useDispatch();
  const isOnClick = useSelector((state) => state.feedBack.isOnClick);

  return (
    <>
      {isOnClick && (
        <div
          style={{
            position: "relative",
            backgroundColor: "transparent",
            height: "9rem",
            width: "15rem",
            top: "26rem",
            left: ".3rem",
            borderRadius: ".3rem",
            border: "1px solid #e4e4e9",
          }}
        >
          <p
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              fontSize: "1.2rem",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Give us some feedback
          </p>
          <button
            style={{
              position: "absolute",
              top: "5rem",
              left: "3rem",
              backgroundColor: "black",
              color: "#e6e6e6",
              borderRadius: ".2rem",
              width: "8rem",
              height: "2rem",
              cursor: "pointer",
            }}
          >
            FeedBack
          </button>

          <button
            onClick={() => dispatch(setOnClick(false))}
            style={{
              backgroundColor: "transparent",
              border: "none",
              position: "absolute",
              left: "13rem",
              top: ".5rem",
              cursor: "pointer",
            }}
          >
            x
          </button>
        </div>
      )}
    </>
  );
}
