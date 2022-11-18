import React from "react";

function HelperMenu({ signup, forgot, login }) {
    return (
        <div className="d-flex flex-column">
            {login && (
                <span className="py-1">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-dark"
                        style={{ fontWeight: 700 }}
                    >
                        Click here
                    </a>{" "}
                    to login.
                </span>
            )}
            {signup && (
                <span className="py-1">
                    Don't have an account?{" "}
                    <a
                        href="signup"
                        className="text-dark"
                        style={{ fontWeight: 700 }}
                    >
                        Click here
                    </a>{" "}
                    to create one.
                </span>
            )}
            {forgot && (
                <span className="py-1">
                    We all forget this.{" "}
                    <a
                        href="signup"
                        className="text-dark"
                        style={{ fontWeight: 700 }}
                    >
                        Click here
                    </a>{" "}
                    to reset your password.
                </span>
            )}
        </div>
    );
}

export default HelperMenu;
