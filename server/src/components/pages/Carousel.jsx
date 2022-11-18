import React from "react";

function Carousel() {
    return (
        <div
            id="cars-intro"
            className="carousel carousel-dark slide"
            data-ride="carousel"
        >
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#cars-intro"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#cars-intro"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#cars-intro"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="./assets/writing.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{
                            height: "100vh",
                        }}
                    />
                    <div className="carousel-caption text-dark">
                        <h2 style={{ fontWeight: 900 }}>Love Writing?</h2>
                        <p>
                            Online diary comes to the rescue. Write about your
                            day and keep it safe and anywhere accessible.
                        </p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img
                        src="./assets/privacy.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{
                            height: "100vh",
                        }}
                    />
                    <div className="carousel-caption text-dark">
                        <h2 style={{ fontWeight: 900 }}>Privacy?</h2>
                        <p>
                            Everything you share with us stays between us only.
                            No one other than you can read about your day.
                        </p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img
                        src="./assets/memories.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{
                            height: "100vh",
                        }}
                    />
                    <div className="carousel-caption text-dark">
                        <h2 style={{ fontWeight: 900 }}>Save Memories</h2>
                        <p>
                            You can also save precious images as you write about
                            your day by adding photographs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
