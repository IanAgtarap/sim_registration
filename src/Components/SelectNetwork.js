import { useSelector } from "react-redux";

function SelectNetwork({ getNework, setNetwork }) {
  const allNework = useSelector((state) => state.AllNetwork);

  const handleNetworkChange = (e) => {
    setNetwork(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <label htmlFor="selectNetwork">Select network:</label>
      <select
        className="form-select w-100"
        id="selectNetwork"
        value={getNework}
        onChange={(e) => handleNetworkChange(e)}
        required
        
      >
          <option disabled={true} value="">
          --Select Network--
        </option>
        {allNework.map((network) => {
          return (
            <option key={network} value={network}>
              {network}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectNetwork;
