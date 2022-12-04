import { useState } from "react";
import SelectNetwork from "./SelectNetwork";

function AddContact({ removeField, index, getContact, setContact }) {
  const [inputNetwork, setInputNetwork] = useState("");
  const onClickRemove = () => {
    removeField(index);
  };
  const onChangeNumber = (e, index) => {
    let data = [...getContact];
    data[index].number = e.target.value;
    data[index].network = inputNetwork;
    setContact(data);
  };
  return (
    <div className="input-group mb-3">
      <SelectNetwork 
       getNework={inputNetwork}
       setNetwork={setInputNetwork}
      />
      <span className="input-group-text" id="basic-addon1">
        +63
      </span>
      <input
        className="form-control"
        type={"tel"}
        pattern={"[9]{1}[0-9]{9}"}
        name='number'
        placeholder={"9876543210"}
        value={getContact[index].number}
        onChange={(e) => onChangeNumber(e, index)}
        // required
      />
      <span
        className="input-group-text btn btn-danger"
        id="basic-addon1"
        onClick={onClickRemove}
      >
        X
      </span>
    </div>
  );
}

export default AddContact;
