import { createRoot } from "react-dom/client";
import { useState } from "react";
import "../src/style.css";

const App = () => {
    const [image, setImage] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const fetchMeme = (answer: string) => {

        fetch("https://yesno.wtf/api")
            .then((response) => {
                if (!response.ok) throw new Error("something went wrong");
                return response.json();
            })
            .then((data) => {
                if (data.answer === answer) {
                    const result = data.image;
                    console.log(result);
                    setImage(result);
                } else {
                    fetchMeme(answer);
                }
            })
            .catch((error) => console.error("Error fetching answer: " + error));
    };

    const testLuck = new Promise<string>((resolve, reject) => {
        let luck: boolean = Math.random() < 0.5;

        if (luck) resolve("You are lucky!");
        else reject("Better luck next time...");
    });

    const handleClick = () => {
        testLuck
            .then((msg) => {
                console.log(msg);
                setMessage(msg);
                fetchMeme("yes");
            })
            .catch((err) => {
                console.log("Error occured: " + err);
                setMessage(err);
                fetchMeme("no");
            });
    };

    return (
        <div className="background">
            <button
                onClick={handleClick}
                className="button-container"
            >
                <span className="button-text">
                    Test your luck
                </span>
            </button>
            {image && (
                <div className="image-container"
                >
                    <img
                        src={image}
                        alt="Luck result"
                        className="image"
                    />
                </div>
            )}
        </div>
    );
};

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}