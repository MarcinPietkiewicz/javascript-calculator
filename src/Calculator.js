import React from "react";
import { evaluate, numberDependencies } from "mathjs";

const operators = ["+", "-", "*", "/"];
const nonZeroNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exp: "", display: "0" };
    this.clearCalculator = this.clearCalculator.bind(this);
    this.addToExp = this.addToExp.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clearCalculator() {
    this.setState({ exp: "", display: "0" });
  }

  addToExp(symbol) {
    // ***************************** case: display 0

    if (this.state.display === "0") {
      // dot
      if (symbol === ".") {
        if (this.state.exp === "") {
          this.setState({ display: "0.", exp: "0." });
        } else {
          this.setState({ display: "0.", exp: this.state.exp + "." });
        }
      }
      // zero
      else if (symbol === "0") {
        return;
      }
      // numbers
      else if (nonZeroNums.includes(symbol)) {
        this.setState({ display: symbol, exp: this.state.exp + symbol });
      }
      // operators - special case - new operation after equals in expression
      // else if (operators.includes(symbol) && this.state.exp.includes('=')){
      //     this.setState({display:symbol, exp: this.state.exp+symbol})
      // }

      // operators
      else if (operators.includes(symbol) && this.state.exp === "") {
        this.setState({ display: symbol, exp: this.state.exp + "0" + symbol });
      } else if (operators.includes(symbol)) {
        this.setState({ display: symbol, exp: this.state.exp + symbol });
      }
    }

    // ***************************** case: display is one of operator
    else if (operators.includes(this.state.display)) {
      // another operator
      if (operators.includes(symbol)) {
        this.setState({ display: symbol, exp: this.state.exp.slice(0, -1) + symbol });
      }
      // dot
      else if (symbol === ".") {
        this.setState({ display: "0.", exp: this.state.exp + "0." });
      }
      // nummbers
      else {
        this.setState({ display: symbol, exp: this.state.exp + symbol });
      }
    }

    // ***************************** rest: display is one of numbers (1-9)
    // case 0-9
    else if (nums.includes(symbol)) {
      this.setState({ display: this.state.display + symbol, exp: this.state.exp + symbol });
    }
    // case dot with multiple dots check
    else if (symbol === ".") {
      if (this.state.display.includes(".")) {
        return;
      } else {
        this.setState({ exp: this.state.exp + ".", display: this.state.display + "." });
      }
      // operators - special case - new operation after equals in expression
    } else if (operators.includes(symbol) && this.state.exp.includes("=")) {
      this.setState({ display: symbol, exp: this.state.exp.split("=")[1] + symbol });
      // operators case
    } else if (operators.includes(symbol)) {
      this.setState({ display: symbol, exp: this.state.exp + symbol });
    }
  }

  calculate(exp) {
    let result = "";
    // check whether result was already calculated
    if (this.state.exp.includes("=")) {
      return;
    }
    // check if display is operator remove it and calculate the rest of the exp
    if (operators.includes(this.state.display)) {
      result = Math.trunc(evaluate(this.state.exp.slice(0, -1)) * 1000000) / 1000000;
      this.setState({ display: result, exp: exp.slice(0, -1) + "=" + result });
    } else {
      // calculate normally in other cases
      result = Math.trunc(evaluate(this.state.exp) * 1000000) / 1000000;
      this.setState({ display: result, exp: this.state.exp + "=" + result });
    }
  }

  render() {
    return (
      <div className="Calculator">
        <div id="title">ReactJS Calculator</div>
        <div id="display-screen">
          <div id="display-result">{this.state.exp}</div>
          <div id="display">{this.state.display}</div>
        </div>
        <div id="clear" onClick={() => this.clearCalculator()}>
          AC
        </div>
        <div id="divide" onClick={() => this.addToExp("/")}>
          /
        </div>
        <div id="multiply" onClick={() => this.addToExp("*")}>
          *
        </div>
        <div id="seven" onClick={() => this.addToExp("7")}>
          7
        </div>
        <div id="eight" onClick={() => this.addToExp("8")}>
          8
        </div>
        <div id="nine" onClick={() => this.addToExp("9")}>
          9
        </div>
        <div id="subtract" onClick={() => this.addToExp("-")}>
          -
        </div>
        <div id="four" onClick={() => this.addToExp("4")}>
          4
        </div>
        <div id="five" onClick={() => this.addToExp("5")}>
          5
        </div>
        <div id="six" onClick={() => this.addToExp("6")}>
          6
        </div>
        <div id="add" onClick={() => this.addToExp("+")}>
          +
        </div>
        <div id="one" onClick={() => this.addToExp("1")}>
          1
        </div>
        <div id="two" onClick={() => this.addToExp("2")}>
          2
        </div>
        <div id="three" onClick={() => this.addToExp("3")}>
          3
        </div>
        <div id="equals" onClick={() => this.calculate(this.state.exp)}>
          =
        </div>
        <div id="zero" onClick={() => this.addToExp("0")}>
          0
        </div>
        <div id="decimal" onClick={() => this.addToExp(".")}>
          .
        </div>
      </div>
    );
  }
}

export default Calculator;
