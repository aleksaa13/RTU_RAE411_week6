import React from "react";
import "./App.css";
import { Cascader } from "antd";
import { InputNumber } from "antd";
import axios from "axios";
import { Input } from "antd";

const options = [
  {
    value: "GET",
    label: "GET",
    children: [
      {
        value: "scores",
        label: "Scores",
      },
      {
        value: "Specific score",
        label: "Specific score",
      },
    ],
  },
  {
    value: "POST",
    label: "POST",
  },
  {
    value: "PUT",
    label: "PUT",
  },
  {
    value: "PATCH",
    label: "PATCH",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: [],
      n: 0,
      displayInputNumber: false,
      displayButton: false,
      result: "Check if endpoint is running. Check CORS",
      key: "a",
      value: 1,
    };
    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount = () => {
    this.setState({ requestType: "GET" });
  };

  onChange = (value) => {
    this.setState({ n: value });
  };

  onChangeRequest = (value) => {
    this.setState({ requestType: value });
    this.displayNumberInput(value);
    this.setState({ displayButton: true });
  };

  displayNumberInput = (req) => {
    if (
      req.length === 1 &&
      (req[0] === "PUT" || req[0] === "PATCH" || req[0] === "DELETE")
    ) {
      this.setState({ displayInputNumber: true });
    } else if (req[1] === "Specific score") {
      this.setState({ displayInputNumber: true });
    } else this.setState({ displayInputNumber: false });
  };

  getFormat = () => {
    switch (this.state.requestType[0]) {
      case "POST":
        return (
          <div>
            <span>
              <label htmlFor="input_score_key">Key:</label>
              <Input
                placeholder="a"
                defaultValue="a"
                onChange={(value) =>
                  this.setState({ key: value.nativeEvent.data })
                }
                value={this.state.key}
                className="input"
                id="input_score_key"
              />
            </span>{" "}
            <span>
              <label htmlFor="input_score_value">Value:</label>
              <InputNumber
                min={0}
                defaultValue={1}
                onChange={(value) => this.setState({ value: value })}
                value={this.state.value}
                className="input"
                id="input_score_value"
              />
            </span>
          </div>
        );

      case "PATCH":
        return (
          <div>
            <span>
              <label htmlFor="input_new_value">Value:</label>
              <InputNumber
                min={0}
                defaultValue={1}
                onChange={(value) => this.setState({ value: value })}
                value={this.state.value}
                className="input"
                id="input_new_value"
              />{" "}
            </span>
          </div>
        );
      case "PUT":
        return (
          <div>
            <span>
              <label htmlFor="input_new_score_key">Key:</label>
              <Input
                placeholder="a"
                defaultValue="a"
                onChange={(value) =>
                  this.setState({ key: value.nativeEvent.data })
                }
                value={this.state.key}
                className="input"
                id="input_new_score_key"
              />
            </span>
            <span>
              <label htmlFor="input_new_score_value">Value:</label>{" "}
              <InputNumber
                min={0}
                defaultValue={1}
                onChange={(value) => this.setState({ value: value })}
                value={this.state.value}
                className="input"
                id="input_new_score_value"
              />
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  makeRequest() {
    let url;
    if (this.state.requestType[0] === "GET") {
      if (this.state.requestType[1] === "scores") {
        url = `http://localhost:5000/scores`;
      } else {
        url = `http://localhost:5000/scores/${this.state.n}`;
      }
      axios
        .get(url)
        .then((res) => {
          this.setState({ result: res.data });
          console.log(res.data);
        })
        .catch((error) => {
          this.setState({ result: "BAD REQUEST! Check CORS and endpoint" });
        });
    } else if (this.state.requestType[0] === "POST") {
      let body = {
        score_key: this.state.key,
        score_value: this.state.value,
      };
      axios
        .post(`http://localhost:5000/scores`, body)
        .then((res) => {
          console.log(res.data);
          this.setState({ result: res.data });
        })
        .catch((error) => {
          this.setState({ result: "BAD REQUEST! Check CORS and endpoint" });
        });
    } else if (this.state.requestType[0] === "PUT") {
      let body = {
        new_key: this.state.key,
        new_value: this.state.value,
      };
      axios
        .put(`http://localhost:5000/scores/${this.state.n}`, body)
        .then((res) => {
          console.log(res.data);
          this.setState({ result: res.data });
        })
        .catch((error) => {
          this.setState({ result: "BAD REQUEST! Check CORS and endpoint" });
        });
    } else if (this.state.requestType[0] === "PATCH") {
      let body = {
        new_value: this.state.value,
      };
      axios
        .patch(`http://localhost:5000/scores/${this.state.n}`, body)
        .then((res) => {
          console.log(res.data);
          this.setState({ result: res.data });
        })
        .catch((error) => {
          this.setState({ result: "BAD REQUEST! Check CORS and endpoint" });
        });
    } else {
      axios
        .delete(`http://localhost:5000/scores/${this.state.n}`)
        .then((res) => {
          console.log(res.data);
          this.setState({ result: res.data });
        })
        .catch((error) => {
          this.setState({ result: "BAD REQUEST! Check CORS and endpoint" });
        });
    }
  }

  render() {
    return (
      <div className="App">
        <h1> Requester </h1>
        <div className="container">
          <div className="chose">
            <Cascader
              options={options}
              placeholder="Select Request Type"
              onChange={this.onChangeRequest}
            />
          </div>
          <div>
            <div
              className={this.state.displayInputNumber ? "normal" : "invisible"}
            >
              Choose n:
              <InputNumber
                min={0}
                defaultValue={0}
                onChange={this.onChange}
                value={this.state.n}
              />
            </div>
            <div className="requestBody">{this.getFormat()}</div>
          </div>
        </div>
        <div className="buttonHolder">
          <button
            onClick={this.makeRequest}
            className={this.state.displayButton ? "makeRequest" : "invisible"}
          >
            MAKE REQUEST
          </button>
        </div>
        <div className={this.state.displayButton ? "response" : "invisible"}>
          {typeof this.state.result === "string"
            ? this.state.result
            : Object.keys(this.state.result).map((key) => {
                return <div>{`"${key}" : ${this.state.result[key]}`}</div>;
              })}
        </div>
      </div>
    );
  }
}

export default App;
