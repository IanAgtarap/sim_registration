// lottie-react is a package used to load lottie animation
import Lottie from "lottie-react";
// import the downloaded lottie animation
import register from "../Lottie/register.json";
import sending from "../Lottie/sending.json";

//Route
import { useNavigate } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
//React
import { useState } from "react";
//Component
import SelectNetwork from "../Components/SelectNetwork";
//Recaptcha
import ReCAPTCHA from "react-google-recaptcha";
//Icons
import * as Icon from "react-bootstrap-icons";

function HomePage({ setUserNumber }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allContactNumber = useSelector((state) => state.AllContactNumber);
  const actions = useSelector((state) => state.actions);
  const [newNumber, setNewNumber] = useState("");
  const [inputNetwork, setInputNetwork] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('d-none')
  const [alertText, setAlertText] = useState('');

  const onClickNext = (event) => {
    //NOTE: Prevent the page to reload when submitting a from
    event.preventDefault();
    /* 
    NOTE
    check if the number already exist
    True: proceed to otp then display number is already exist
    False: proceed to otp then display dashboard , update the AllContactNumber state
    */
   if(newNumber.charAt(0) === '9') {
    //NOTE: Get all contact number per user
    const findNumber = allContactNumber.map((item) => {
      return item.contacts.find((num) => {
        return num.number === `0${newNumber}`;
      });
    });
    //NOTE: filter the findNumber results to remove undifined
    const filteredResult = findNumber.filter((item) => {
      return item !== undefined;
    });
    if (filteredResult.length > 0) {
      setUserNumber(filteredResult[0].number);
      setAlert('alert alert-danger p-1 text-center')
      setAlertText('Number Already Registered!')
      console.log(`${filteredResult[0].number} Already Exist!`);
    } else {
      dispatch({
        type: actions.insertNumber,
        payload: { newNumber: `0${newNumber}`, network: inputNetwork },
      });
      setUserNumber(`0${newNumber}`);
      console.log(`${newNumber} ${inputNetwork} Added`);
      setIsLoading(true);
    }}
    else{
      setAlert('alert alert-danger p-1 text-center')
      setAlertText('Invalid Number!')
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="d-flex flex-column vh-100 justify-content-center align-items-center p-2">
          <div className="text-center">
            <h1>SIM CARD REGISTRATION</h1>
            <p>Republic Act (RA) No. 11934</p>
          </div>
          <div className="homepage-contents">
            <div className="lottie-container register">
              <Lottie animationData={register} loop={true} />
            </div>
            <div className="form-container w-50">
              <form className="form" onSubmit={onClickNext} autoComplete="off">
                <SelectNetwork
                  getNework={inputNetwork}
                  setNetwork={setInputNetwork}
                />
                <label className="label" htmlFor="contactNumber">
                  Contact number:
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    +63
                  </span>
                  <input
                    className="form-control"
                    value={newNumber}
                    type={"tel"}
                    pattern={"[9]{1}[0-9]{9}"}
                    name={"contactNumber"}
                    placeholder={"9876543210"}
                    onChange={(e) => {
                      setNewNumber(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className={alert} role="alert">
                  <Icon.ExclamationTriangleFill className="me-1"/>
               {alertText}
                </div>
                <div className="d-flex flex-column">
                  <ReCAPTCHA
                    sitekey="6LfFCdAiAAAAAMzlkMRfHBpUPXBfuJLfXVham1P5"
                    size="invisible"
                  />
                  <button className="btn btn-primary w-100 " type="submit">
                    Next
                    <Icon.ArrowBarRight className="ms-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex  justify-content-center align-items-center">
            <a href="/help" className="text-decoration-none">
              Help Center
            </a>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <div className="w-50">
            <Lottie animationData={sending} loop={true} />
            <div className="d-none">
              {setTimeout(() => {
                navigate("/otp");
              }, 5000)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
