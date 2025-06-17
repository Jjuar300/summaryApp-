import "./styles/Index.css";
import fireIcon from "./assets/fireIcon.webp";
import checkMark from "./assets/checkMark.png";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import NoteLogo from "./assets/NoteLogo.png";
import { UserAvatar } from "../../components";

export default function Index() {
  const isMobileScreen = useMediaQuery("(max-width:430px)");
  const [isPlanButton, setPlanButton] = useState(false);
  const pricePlan = isPlanButton ? 20 : 10;

  const handleSubscriptionPlan = () => {
    setPlanButton(!isPlanButton);
  };

  return (
    <div>
    
      <h1 className={isMobileScreen ? "pickPlan-mobile" : "pickPlan"}>
        Pick your plan
      </h1>

      <div className={isMobileScreen ? "logo-mobile" : "logo"}>
        <img className="NoteLogo" src={NoteLogo} />
        <span className="LogoTitle">Noto</span>
      </div>

      <div className={isMobileScreen ? "mo-ye-mobile" : "mo-ye"}>
        <span className={isPlanButton ? "tl-monthly" : "tl-monthly-click"}>
          Monthly
        </span>
        <span className={isPlanButton ? "tl-annually-click" : "tl-annually"}>
          Annually
        </span>
        <span className={isPlanButton ? "tl-discount-click" : "tl-discount"}>
          50% off
        </span>
        <button
          onClick={handleSubscriptionPlan}
          className={isPlanButton ? "btn-mo-ye-click" : "btn-mo-ye"}
        >
          <span
            className={
              isPlanButton ? "animationCircle-click" : "animationCircle"
            }
          />
        </button>
      </div>

      <div className={isMobileScreen ? "subPlan-mobile" : "subPlan"}>
        <span className="pricePlan">
          <div className="threeFreeModal">
            <img className="fireIcon" src={fireIcon} alt="fireIcon" />
            <span className="threeFree">3 days free</span>
          </div>

          <span className="proPlan">Pro plan</span>
          <span className="pricePlan">
            ${pricePlan}
            <span className="month">/mo</span>
          </span>
        </span>
        <button className="btn-startTrial">Start free trial</button>
        <span className="divider">
          ________________________________________
        </span>

        <div className="details">
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> All
            features
          </li>
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> Unlimied
            spaces
          </li>
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> Unlimited
            tasks and notes
          </li>
          <li>
            <img className="checkMark" src={checkMark} alt="check" /> 25MB
            uploads & 500MB storage
          </li>
        </div>
      </div>
    </div>
  );
}
