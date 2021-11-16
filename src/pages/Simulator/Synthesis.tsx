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
      <div>Mensualité : {roundTwoDec(creditM) + assuranceCM}€ </div>
      <div>Coût mensuel de l'assurance {assuranceCM}€</div>
      <div>Coût total de l'assurance {assuranceCT}€</div>
      <div>Coût du crédit (intérets) {roundTwoDec(interets)}€</div>
      <div>Coût total du projet {roundTwoDec(interets) + assuranceCT}</div>
    </div>
  );
};

export default Synthesis;
