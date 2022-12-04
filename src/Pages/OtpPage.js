import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import OTPInput from "otp-input-react";
import Lottie from "lottie-react";
import otp from "../Lottie/otp.json";

function OtpPage({ getUserNumber }) {
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState("");
  const [randomCode, setRandomCode] = useState(0);
  const [timeOut, setTimeOut] = useState(0);
  const [resendCodeClass, setResendCodeClass] = useState(
    "btn btn-link disabled"
  );
  const resetTime = 10;
  /* 
  TODO:
  generate random 4 digit code then display is on console log
  compare the generated code with the input code
  if its equal then proceed
  else try again
  */
  const generateCode = () => {
    //NOTE: generate random 5 digit code
    setRandomCode(Math.floor(Math.random() * 90000) + 10000);
  };
  //NOTE: on mount generate code
  useEffect(() => {
    if (getUserNumber === "") {
      navigate("/");
    }
    startCountdown(resetTime);
    generateCode();
  }, [navigate, getUserNumber]);

  const onClickResendCode = () => {
    startCountdown(resetTime);
    generateCode();
  };

  function startCountdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
      setTimeOut(counter);
      setResendCodeClass("btn btn-link disabled");
      counter--;

      if (counter < 0) {
        setResendCodeClass("btn btn-link");
        clearInterval(interval);
      }
    }, 1000);
  }

  const handleVerify = (e) => {
    e.preventDefault();
    if (randomCode === Number(otpInput)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="d-flex flex-column vh-100 align-items-center p-2">
      {console.log(randomCode)}
      <div className=".lottie-container otp">
        <Lottie animationData={otp} loop={true} />
      </div>
      <div className="d-flex flex-column align-items-center px-3">
        <h6>Authentication</h6>
        <small className="w-100">
          Please enter the 5-digit code sent to{" "}
          {getUserNumber.toString().substr(0, 3) +
            "***" +
            getUserNumber.toString().substr(9)}
        </small>
      </div>
      <div className="mt-5">
        <OTPInput
          value={otpInput}
          onChange={setOtpInput}
          autoFocus
          OTPLength={5}
          otpType="number"
          disabled={false}
          secure
        />
      </div>
      <div className="mt-3 d-flex justify-content-end w-75">
        <button
          type="button"
          className={resendCodeClass}
          onClick={onClickResendCode}
        >
          {timeOut !== 0 ? `${timeOut} Resend code` : "Resend code"}
        </button>
      </div>
      <div className="mt-3 d-flex w-75 justify-content-center">
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={(e) => handleVerify(e)}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default OtpPage;
