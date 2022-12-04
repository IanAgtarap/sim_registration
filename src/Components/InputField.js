function InputField({label, forTag, type, placeholder, getValue, changeValue}) {
    return ( 
        <div className="mb-3 w-100">
        <label htmlFor={forTag} className="form-label">
          {label}
        </label>
        <input
          type={type}
          className="form-control"
          id={forTag}
          placeholder={placeholder}
          value={getValue}
          onChange={(e) => changeValue(e)}
        />
      </div>
     );
}

export default InputField;