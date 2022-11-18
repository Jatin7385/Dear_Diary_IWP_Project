import React from "react";

function Hero({ message }) {
    return (
        <React.Fragment>
            <span className="d-flex align-items-center">
                <img src="./assets/favicon.png" alt="Logo" width="40" />
                <h3 style={{ fontWeight: 700 }} className="px-3 m-0">
                    Diary
                </h3>
            </span>
            <span className="my-3 d-block" style={{ fontWeight: 500 }}>
                {message}
            </span>
        </React.Fragment>
    );
}

export default Hero;
