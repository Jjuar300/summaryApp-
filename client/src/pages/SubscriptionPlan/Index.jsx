import "./styles/Index.css";
import fireIcon from "./assets/fireIcon.webp";
import checkMark from "./assets/checkMark.png";

export default function Index() {
  const pricePlan = 10;

  return (
    <div>
      <h1 className="pickPlan"> Pick your plan</h1>

      <div className="mo/ye">
        <span>Monthly</span>
        <span>Annually</span>
        <span>50% off</span>
      </div>

      <div className="subPlan">
        <span className="pricePlan">
          <div className="threeFreeModal">
            <img className="fireIcon" src={fireIcon} alt="fireIcon" />
            <span className="threeFree">3 day free</span>
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
