import React from "react";
import { evaluate } from 'mathjs';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expression: "500+44=544", display: "544" };
    this.clearResult = this.clearResult.bind(this);
    this.addToDisplay = this.addToDisplay.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clearResult() {
    this.setState({ expression: '', display: "0" });
  }

  addToDisplay(symbol) {
    if (this.state.display === '0') {
        this.setState({display: symbol})
    }
    else {
    this.setState({display: this.state.display+symbol})
    }
    console.log(this.state.display);
  }

  calculate(exp) {
    this.setState({display: evaluate(this.state.display)})
  }

  render() {
    return (
      <div className="Calculator">
        <div id="title">ReactJS Calculator</div>
        <div id="display-screen">
          <div id="display-result">{this.state.expression}</div>
          <div id="display">{this.state.display}</div>
        </div>
        <div id="clear" onClick={this.clearResult}>AC</div>
        <div id="divide" onClick={() => this.addToDisplay('/')}>/</div>
        <div id="multiply" onClick={() => this.addToDisplay('*')}>x</div>
        <div id="seven" onClick={() => this.addToDisplay('7')}>7</div>
        <div id="eight" onClick={() => this.addToDisplay('8')}>8</div>
        <div id="nine" onClick={() => this.addToDisplay('9')}>9</div>
        <div id="subtract" onClick={() => this.addToDisplay('-')}>-</div>
        <div id="four" onClick={() => this.addToDisplay('4')}>4</div>
        <div id="five" onClick={() => this.addToDisplay('5')}>5</div>
        <div id="six" onClick={() => this.addToDisplay('6')}>6</div>
        <div id="add" onClick={() => this.addToDisplay('+')}>+</div>
        <div id="one" onClick={() => this.addToDisplay('1')}>1</div>
        <div id="two" onClick={() => this.addToDisplay('2')}>2</div>
        <div id="three" onClick={() => this.addToDisplay('3')}>3</div>
        <div id="equals" onClick={() => this.calculate(this.state.display)}>=</div>
        <div id="zero" onClick={() => this.addToDisplay('0')}>0</div>
        <div id="decimal" onClick={() => this.addToDisplay('.')}>.</div>
      </div>
    );
  }
}

export default Calculator;
