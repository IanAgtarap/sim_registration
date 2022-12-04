import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";

//Lottie
import Lottie from "lottie-react";
import thankyou from "../Lottie/thankyou.json";

//For address form
import cities from "philippines/cities";
import regions from "philippines/regions";
import provinces from "philippines/provinces";

//Component
import AddContact from "../Components/AddContact";
//Icons
import * as Icon from "react-bootstrap-icons";

/* 
TODO
set up cloudinary upload
enable crop image (if may mahanap na source)

if the number or user already exist 
onload display the profile data using useEffect
disable the register button
else  empty form to be fill out

actions:
ADD new profile upon clicking the register button
Update the contacts if there are listed in other contacts
*/
function DashboardPage({ getUserNumber }) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allContactNumber = useSelector((state) => state.AllContactNumber);
  const allProfile = useSelector((state) => state.AllProfiles);
  const actions = useSelector((state) => state.actions);
  const genders = useSelector((state) => state.Gender);
  const [currentUser, setCurrentUser] = useState("");

  // input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");

  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [iRegion, setIRegion] = useState("");
  const [iProvince, setIProvince] = useState("");
  const [iCity, setICity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const [validId, setValidId] = useState("");

  const [otherContact, setOtherContact] = useState([]);

  useEffect(() => {
    if (getUserNumber === "") {
      navigate("/");
    }
    for (let item = 0; item < allContactNumber.length; item++) {
      for (
        let index = 0;
        index < allContactNumber[item].contacts.length;
        index++
      ) {
        if (allContactNumber[item].contacts[index].number === getUserNumber) {
          return setCurrentUser(allContactNumber[item].userId);
        }
      }
    }
  }, [allContactNumber, getUserNumber, navigate]);

  // handle onchange on input fields
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    console.log(firstName);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handletMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleRegionChange = (e) => {
    setIRegion(e.target.value);
  };
  const handleProvinceChange = (e) => {
    setIProvince(e.target.value);
  };
  const handleCityChange = (e) => {
    setICity(e.target.value);
  };
  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };
  const handleHouseNumberChange = (e) => {
    setHouseNumber(e.target.value);
  };

  // const handleValidIdChange = (e) => {
  //   setValidId(e.target.value);
  // };

  const removeFields = (index) => {
    let data = [...otherContact];
    data.splice(index, 1);
    setOtherContact(data);
  };

  return (
    <>
      {!isLoading ? (
        <div className="d-flex  flex-column w-100 align-items-center p-2">
          <div className="text-center mt-5">
            {console.log(`Current user: ${currentUser}`)}
            {console.log(allProfile)}
            {console.log(allContactNumber)}
            {console.log("other contacts")}
            {console.log(otherContact)}
            <h4>Fill up the form:</h4>
          </div>
          <form
            autoComplete="off"
            className="d-flex flex-column align-items-center w-75"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({
                type: actions.insertProfile,
                payload: {
                  userIdInput: currentUser,
                  firstNameInput: firstName,
                  lastNameInput: lastName,
                  middleNameInput: middleName,
                  genderInput: gender,
                  emailInput: email,
                  birthdayInput: birthday,
                  regionInput: iRegion,
                  provinceInput: iProvince,
                  cityInput: iCity,
                  streetInput: street,
                  houseNumberInput: houseNumber,
                  otherContactInput: otherContact,
                  dateStamp: `${day}/${month}/${year}`,
                },
              });
              setIsLoading(true);
            }}
          >
            {/* Name group */}
            <div className="input-group mb-5">
              <InputField
                label={"First name:"}
                forTag={"firstName"}
                type={"text"}
                placeholder={"Enter first name"}
                getValue={firstName}
                changeValue={handleFirstNameChange}
              />
              <InputField
                label={"Middle name:"}
                forTag={"middleName"}
                type={"text"}
                placeholder={"Enter middle name"}
                getContact={middleName}
                changeValue={handletMiddleNameChange}
              />
              <InputField
                label={"Last name:"}
                forTag={"lastName"}
                type={"text"}
                placeholder={"Enter last name"}
                getContact={lastName}
                changeValue={handleLastNameChange}
              />
            </div>
            {/* Detail group */}
            <div className="input-group mb-5">
              <div className="mb-3 w-100">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-select"
                  id="gender"
                  value={gender}
                  onChange={(e) => handleGenderChange(e)}
                >
                  <option disabled={true} value="">
                    --Select Gender--
                  </option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label={"Email:"}
                forTag={"email"}
                type={"email"}
                placeholder={"Enter email"}
                getValue={email}
                changeValue={handleEmailChange}
              />
              <InputField
                label={"Birthday:"}
                forTag={"birthday"}
                type={"date"}
                placeholder={"Enter birthday"}
                getValue={birthday}
                changeValue={handleBirthdayChange}
              />
            </div>
            {/* Address group */}
            <div className="input-group mb-5">
              <div className="mb-3 w-100">
                <label htmlFor="region">Region:</label>
                <select
                  className="form-select"
                  id="region"
                  value={iRegion}
                  onChange={(e) => handleRegionChange(e)}
                >
                  <option disabled={true} value="">
                    --Select Region--
                  </option>
                  {regions.map((region, index) => (
                    <option key={region.name + index} value={region.key}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 w-100">
                <label htmlFor="province">Province:</label>
                <select
                  className="form-select"
                  id="province"
                  value={iProvince}
                  onChange={(e) => handleProvinceChange(e)}
                >
                  <option disabled={true} value="">
                    --Select Province--
                  </option>
                  {provinces
                    .filter((province, index) => province.region === iRegion)
                    .map((item, index) => {
                      return (
                        <option key={item.name + index} value={item.key}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3 w-100">
                <label htmlFor="city">City / Municipality:</label>
                <select
                  className="form-select"
                  id="city"
                  value={iCity}
                  onChange={(e) => handleCityChange(e)}
                >
                  <option disabled={true} value="">
                    --Select City / Municipality--
                  </option>
                  {cities
                    .filter((city, index) => city.province === iProvince)
                    .map((item, index) => {
                      return (
                        <option key={item.name + index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <InputField
                label={"Street / Barangray:"}
                forTag={"stBarangray"}
                type={"text"}
                placeholder={"Enter street / barangray"}
                getValue={street}
                changeValue={handleStreetChange}
              />
              <InputField
                label={"House number:"}
                forTag={"houseNumber"}
                type={"text"}
                placeholder={"Enter house number"}
                getValue={houseNumber}
                changeValue={handleHouseNumberChange}
              />
            </div>
            {/* ID validation */}
            <div className="input-group mb-5">
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Valid ID:
                </label>
                {/* Create cloudinary widget or component */}
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept=".png, .jpg, .jpeg"
                />
              </div>
            </div>
            {/* Other contacts */}
            <div className="input-group mb-5">
              <label htmlFor="otherNumber" className="mb-3 me-3">
                Other contact number:
              </label>
              {otherContact.map((item, index) => {
                return (
                  <AddContact
                    key={index}
                    removeField={removeFields}
                    index={index}
                    getContact={otherContact}
                    setContact={setOtherContact}
                  />
                );
              })}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setOtherContact([
                    ...otherContact,
                    { number: "", network: "" },
                  ]);
                }}
              >
                Add number
                <Icon.PlusSquareFill className="ms-2" />
              </button>
            </div>
            <div className="input-group mb-5 d-flex justify-content-center align-items-center ">
              <button type="submit" className="btn btn-primary w-100">
                Register
                <Icon.ArrowBarRight className="ms-2" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          {/* dislay loding */}
          <div className="w-50">
            <Lottie animationData={thankyou} loop={true} />
            <div className="d-none">
              {setTimeout(() => {
                navigate("/");
              }, 5000)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
