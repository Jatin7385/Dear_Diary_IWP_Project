import React from "react";
import Carousel from "./Carousel";
import HelperMenu from "./HelperMenu";
import Hero from "./Hero";
import Input from "./Input";
import OpenSource from "./OpenSource";

function LoginPage() {
    return (
        <div className="container-fluid fs">
            <div className="row h-100">
                <div className="col-4 d-md-flex d-none h-100 p-0 align-items-center">
                    <Carousel />
                </div>
                <div className="col-sm col-md-8 h-100 p-5 align-items-center">
                    <Hero message="To continue further, you'll need to login" />
                    <form className="w-75 w-sm-100 my-4" method="POST">
                        <Input
                            name="email"
                            label="Email Address"
                            placeholder="example@example.com"
                            type="email"
                            errorMessage="Can't find this email in database. Did you mean to signup?"
                            invalidErrorMessage="This email doesn't seem to be correct"
                        />
                        <Input
                            name="password"
                            label="Password"
                            placeholder="P@$$W0rD"
                            type="password"
                            errorMessage="Your password is wrong. Did you forget it?"
                        />

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="loginCheck"
                                name="remember"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="loginCheck"
                            >
                                Keep me logged in
                            </label>
                        </div>
                        <button type="submit" className="btn btn-dark w-100">
                            Submit
                        </button>
                    </form>
                    <HelperMenu signup={true} forgot={false} />
                    <OpenSource />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
