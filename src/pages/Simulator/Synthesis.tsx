import React from "react";

// Utils
import { roundTwoDec } from "../../utils/format";

interface SynthesisProps {
  creditM: number;
  assuranceCM: number;
  assuranceCT: number;
  interets: number;
}

const Synthesis: React.FC<SynthesisProps> = (props) => {
  const { assuranceCM, creditM, assuranceCT, interets } = props;

  return (
    <div className="synthesis-container">
      <div className=" block-mensuality">
        <div className="item item-main">
          <p className="item-label">Mensualité :</p>
          <p className="item-value">{roundTwoDec(creditM) + assuranceCM}€ </p>
        </div>
      </div>
      <div className="block-assurance">
        <div className="item item-sub">
          <p className="item-label">Coût mensuel de l'assurance</p>
          <p className="item-value">{assuranceCM}€</p>
        </div>
        <div className="item item-sub">
          <p className="item-label">total de l'assurance</p>
          <p className="item-value">{assuranceCT}€</p>
        </div>
      </div>
      <div className="block-credit-cost">
        <div className="item item-sub">
          <p className="item-label">Coût du crédit (intérets)</p>
          <p className="item-value"> {roundTwoDec(interets)}€</p>
        </div>
        <div className="item item-sub">
          <p className="item-label">Coût total du projet</p>
          <p className="item-value"> {roundTwoDec(interets) + assuranceCT}</p>
        </div>
      </div>
    </div>
  );
};

export default Synthesis;
