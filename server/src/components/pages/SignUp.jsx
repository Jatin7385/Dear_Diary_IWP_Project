import React from "react";
import Carousel from "./Carousel";
import HelperMenu from "./HelperMenu";
import Hero from "./Hero";
import Input from "./Input";
import OpenSource from "./OpenSource";

function SignUp() {
    return (
        <div className="container-fluid fs">
            <div className="row h-100">
                <div className="col-4 d-md-flex d-none h-100 p-0 align-items-center">
                    <Carousel />
                </div>
                <div className="col-sm col-md-8 h-100 p-5 align-items-center">
                    <Hero message="Hey just one more step and you're good to go" />
                    <form className="w-75 w-sm-100 my-4" method="POST">
                        <Input
                            type="text"
                            label="Your Name"
                            placeholder="Bruce Wayne"
                            name="name"
                        />
                        <Input
                            name="email"
                            label="Email Address"
                            placeholder="example@example.com"
                            type="email"
                            errorMessage="This email is already in use. Did you mean to login?"
                            invalidErrorMessage="This email doesn't seem to be correct"
                        />
                        <Input
                            name="password"
                            label="Password"
                            placeholder="P@$$W0rD"
                            type="password"
                            errorMessage="Your password is wrong. Did you forget it?"
                        />

                        <button type="submit" className="btn btn-dark w-100">
                            Submit
                        </button>
                    </form>
                    <HelperMenu login={true} />
                    <OpenSource />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
