import React, { useState } from "react";

function Input({
    label,
    name,
    type,
    placeholder,
    errorMessage = "",
    invalidErrorMessage = "This seems to be wrong",
}) {
    const [valid, setValid] = useState(true);
    const [value, setValue] = useState("");
    const [error, setError] = useState(errorMessage);
    function validate(t) {
        switch (t) {
            case "email":
                var re = /\S+@\S+\.\S+/;
                const res = re.test(value);
                setValid(res);
                setError(invalidErrorMessage);
        }
    }
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <input
                    type={type}
                    className={`form-control ${valid ? "" : "is-invalid"}`}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => validate(type)}
                    required
                />
                <div className="invalid-feedback">{error}</div>
                <div className="valid-feedback">
                    Signup Successfull! Login to Continue.
                </div>
            </div>
        </div>
    );
}

export default Input;
