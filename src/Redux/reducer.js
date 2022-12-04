//UID
import { v4 as uuidv4 } from "uuid";


const initialState = {
  AdminCredentials: [{ username: "admin", password: "admin" }],
  AllContactNumber: [
    {
      userId: "sampleId",
      contacts: [{ number: "09917335949", network: "DITO" }],
    },
    {
      userId: "qwe",
      contacts: [
        { number: "09917335941", network: "DITO" },
        { number: "09999999999", network: "TNT" },
      ],
    },
  ],
  AllProfiles: [
    {
      userId: "sampleId",
      firstName: "Juan",
      middleName: "De La",
      lastName: "Cruz",
      gender: "Male",
      email: "email@sample.com",
      birthday: "01/01/1950",
      region: "CAR",
      province: "Benguet",
      city: "Baguio City",
      street: "Kahit saan street",
      houseNumber: "123",
      validId: "",
      dateStamp: '01/11/2022'
    },
  ],
  AllNetwork: ["SMART", "TNT", "GLOBE", "TM", "DITO"],
  Gender: ["Male", "Female", "Other"],
  actions: Object.freeze({
    insertNumber: "NEW_NUMBER",
    insertProfile: "NEW_PROFILE",
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case state.actions.insertNumber:
      return {
        ...state,
        AllContactNumber: [
          ...state.AllContactNumber,
          {
            userId: uuidv4(),
            contacts: [
              {
                number: action.payload.newNumber,
                network: action.payload.network,
              },
            ],
          },
        ],
      };

    case state.actions.insertProfile:
      return {
        ...state,
        AllProfiles: [
          ...state.AllProfiles,
          {
            userId: action.payload.userIdInput,
            firstName: action.payload.firstNameInput,
            middleName: action.payload.middleNameInput,
            lastName: action.payload.lastNameInput,
            gender: action.payload.genderInput,
            email: action.payload.emailInput,
            birthday: action.payload.birthdayInput,
            region: action.payload.regionInput,
            province: action.payload.provinceInput,
            city: action.payload.cityInput,
            street: action.payload.streetInput,
            houseNumber: action.payload.houseNumberInput,
            validId: "",
            dateStamp:action.payload.dateStampInput,
          },
        ],
        AllContactNumber: [...state.AllContactNumber].filter((user) => {
          if (user.userId === action.payload.userIdInput) {
            return (user.contacts = user.contacts.concat(
              action.payload.otherContactInput
            ));
          }
          return user;
        }),
      };
    default:
      return state;
  }
};
export default reducer;
