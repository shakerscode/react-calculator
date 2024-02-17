import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { commonStyle } from "./StopWatch";

function Calculator() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "*", "/"];
  const [numberInput, setNumberInput] = useState([]);

  //handler for calculation
  const handleCalculation = (inputs) => {
    if (inputs.length > 0) {
      const expression = inputs.join("");

      const sanitizedExpression = expression.replace(/[^0-9+\-*/()]/g, "");

      try {
        const result = eval(sanitizedExpression);
        if (!isNaN(result)) {
          setNumberInput([result]);
        } else {
          setNumberInput([]);
        }
      } catch (error) {
        setNumberInput([]);
      }
    } else {
      setNumberInput([]);
    }
  };

  return (
    <div className="main-box">
      <div
        style={{
          marginLeft: "80%",
          fontFamily:"inter"
        }}
      >
        <Link style={{ textDecoration: "none" }} to={"/time-watch"}>
          <button style={{ ...commonStyle, margin: "20px", width: "100px" }}>
            Stop Watch
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "550px",
            width: "300px",
            background: "rgb(15 23 42)",
            marginTop: "10vh",
            borderRadius: "20px",
            padding: "10px",
            boxShadow: "1px 1px 1px gray",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                height: "20px",
                width: "20px",
                background: "black",
                borderRadius: "15px",
                backgroundColor: "yellow",
              }}
            ></div>
            <p
              style={{
                fontSize: "26px",
                fontFamily: "Orbitron",
                lineHeight: "10px",
                color: "white",
              }}
            >
              CASIO
            </p>
            <div
              style={{
                height: "20px",
                width: "70px",
                background: "gray",
                borderRadius: "5px",
              }}
            ></div>
          </div>
          <div
            style={{
              height: "80px",
              width: "auto",
              border: "1px solid gray",
              borderRadius: "16px",
              background: "white",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <p
              style={{
                textAlign: "right",
                padding: "10px",
                marginTop: "2vh",
                fontSize: "36px",
              }}
            >
              {numberInput.length === 0
                ? 0
                : numberInput?.map((number) => number)}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <div
              onClick={() => setNumberInput([])}
              style={{
                height: "50px",
                width: "50px",
                background: "black",
                borderRadius: "8px",
                marginBottom: "10px",
                marginLeft: "10px",
                backgroundColor: "lightgreen",
                boxShadow: "1px 1px 1px gray",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Clear
            </div>
            <div
              onClick={() => setNumberInput([])}
              style={{
                height: "50px",
                width: "50px",
                background: "black",
                borderRadius: "8px",
                marginBottom: "10px",
                backgroundColor: "#c2c2c2",
                boxShadow: "1px 1px 1px gray",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              AC
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "fit-content",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                marginTop: "10px",
              }}
            >
              {numbers.map((number, i) => (
                <div
                  onClick={() => setNumberInput([...numberInput, number])}
                  key={i}
                  style={{
                    height: "50px",
                    width: "50px",
                    background: "black",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#c2c2c2",
                    boxShadow: "1px 1px 1px gray",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                    fontSize: "24px",
                  }}
                >
                  {number}
                </div>
              ))}
            </div>
            <div
              onClick={() => handleCalculation(numberInput)}
              style={{
                height: "50px",
                width: "120px",
                background: "black",
                borderRadius: "8px",
                marginBottom: "10px",
                backgroundColor: "orange",
                boxShadow: "1px 1px 1px gray",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: "0px",
                right: "20px",
                fontSize: "24px",
              }}
            >
              =
            </div>
          </div>
        </div>
      </div>
      <p
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        A simple calculator by{" "}
        <a
          style={{ color: "wheat" }}
          target="_blank"
          href="https://www.linkedin.com/in/shaker-ahamed/"
        >
          Shaker Ahamed
        </a>
      </p>
    </div>
  );
}

export default Calculator;
