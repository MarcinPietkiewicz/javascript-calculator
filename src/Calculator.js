import React from "react";
import { evaluate } from 'mathjs';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expression: "", result: "544" };
    this.clearResult = this.clearResult.bind(this);
  }

  clearResult() {
    this.setState({ result: "0" });
  }

  render() {
    return (
      <div className="Calculator">
        <div id="title">ReactJS Calculator</div>
        <div id="display-screen">
          <div id="display-result">9/3+21</div>
          <div id="display">{evaluate('9/3+21')}</div>
        </div>
        <div id="clear">AC</div>
        <div id="divide">/</div>
        <div id="multiply">x</div>
        <div id="seven">7</div>
        <div id="eight">8</div>
        <div id="nine">9</div>
        <div id="subtract">-</div>
        <div id="four">4</div>
        <div id="five">5</div>
        <div id="six">6</div>
        <div id="add">+</div>
        <div id="one">1</div>
        <div id="two">2</div>
        <div id="three">3</div>
        <div id="equals">=</div>
        <div id="zero">0</div>
        <div id="decimal">.</div>
      </div>
    );
  }
}

export default Calculator;
