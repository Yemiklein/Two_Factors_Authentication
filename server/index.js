const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const { Novu } = require("@novu/node");
const { signedCookie } = require("cookie-parser");
const novu = new Novu("db306ab6d7eeb55bef0a1138ad2ccabf");




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




//👇🏻 Generates the code to be sent via SMS
const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
    try {
        let response = await novu.trigger("<NOTIFICATION_TEMPLATE_ID>", {
            to: {
                subscriberId: recipient,
                phone: recipient,
            },
            payload: {
                code: verificationCode,
            },
        });
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};





//👇🏻 Generates a random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);


const postLoginDetails = () => {
    fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.error(err));
};
const handleSubmit = (e) => {
    e.preventDefault();
    //👇🏻 Calls the function
    postLoginDetails();
    setPassword("");
    setEmail("");
};



app.post("/api/register", (req, res) => {
    //👇🏻 Get the user's credentials
    const { email, password, tel, username } = req.body;

    //👇🏻 Checks if there is an existing user with the same email or password
    let result = users.filter((user) => user.email === email || user.tel === tel);

    //👇🏻 if none
    if (result.length === 0) {
        //👇🏻 creates the structure for the user
        const newUser = { id: generateID(), email, password, username, tel };
        //👇🏻 Adds the user to the array of users
        users.push(newUser);
        //👇🏻 Returns a message
        return res.json({
            message: "Account created successfully!",
        });
    }
    //👇🏻 Runs if a user exists
    res.json({
        error_message: "User already exists",
    });
});


// "subscriberId": "6366db059e04bb11b54efab6",
// +14793411973 twillo
// ACa2de2b0e0cfb59d015eb1058884cceb9 SID
// c9a125cd0f7dec0ea8402cd3610fcf15 AUTH TOKEN

app.listen(PORT, () => {
    console.log(`Server running on ${PORT} 🪐🚀`);
});


                  

                  