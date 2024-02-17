import { FcStart } from "react-icons/fc";
import { VscDebugRestart } from "react-icons/vsc";
import { BsPauseBtnFill } from "react-icons/bs";
import { useEffect, useState } from "react"; 

export const commonStyle = {
  padding: "10px",
  border: "1px solid white",
  borderRadius: "10px",
  cursor: "pointer",
};

function StopWatch() {
  const [time, setTime] = useState({
    hours: 0,
    min: 0,
    sec: 0,
  });
  const [isStarted, setIsStarted] = useState(false);

  let interval;

  //use effect for timer. This effect works a specific state named isStarted. We have declare interval variable with let so that we can the updated number as let keep numbers in it and it is editable. We use setInterval function here for the calculation and clearInterval for clearing the function.
  useEffect(() => {
    if (isStarted) {
      interval = setInterval(() => {
        setTime((prev) => {
          let newSec = prev.sec + 1;
          let newMin = prev.min;
          let newHours = prev.hours;

          if (newSec === 60) {
            newSec = 0;
            newMin += 1;
          }

          if (newMin === 60) {
            newMin = 0;
            newHours += 1;
          }

          return {
            hours: newHours,
            min: newMin,
            sec: newSec,
          };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isStarted]);

  //formatting the time
  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  //handler for pause the timer function
  const handlePause = () => {
    setIsStarted(false);
  };

  //handler for start the timer function
  const handleStart = () => {
    setIsStarted(true);
  };

  //handler for restart the timer function
  const handleRestart = () => {
    setTime({
      hours: 0,
      min: 0,
      sec: 0,
    });
    setIsStarted(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgb(15 23 42)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >  
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "Orbitron",
          gap: "12vw",
        }}
      >
        <p>HOURS</p>
        <p>MINUTES</p>
        <p>SECONDS</p>
      </div>
      <div
        style={{
          width: "800px",
          height: "150px",
          border: "1px solid white",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <div
          style={{
            borderRight: "1px solid white",
            width: "33.3%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "Orbitron",
              fontSize: "46px",
              color: "white",
            }}
          >
            {formatTimeUnit(time.hours)}
          </p>
        </div>
        <div
          style={{
            borderRight: "1px solid white",
            width: "33.3%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "Orbitron",
              fontSize: "46px",
              color: "white",
            }}
          >
            {formatTimeUnit(time.min)}
          </p>
        </div>
        <div
          style={{
            width: "33.3%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "Orbitron",
              fontSize: "46px",
              color: "white",
            }}
          >
            {formatTimeUnit(time.sec)}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "Orbitron",
          gap: "5vw",
          marginTop: "5vh",
        }}
      >
        <button onClick={handlePause} style={commonStyle}>
          <BsPauseBtnFill size={46} color="#f44336" />
        </button>
        <button onClick={handleStart} style={commonStyle}>
          <FcStart size={46} color="#f44336" />
        </button>
        <button onClick={handleRestart} style={commonStyle}>
          <VscDebugRestart size={46} color="#f44336" />
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
