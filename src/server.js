require("express-async-errors")
require('dotenv').config();

const express = require("express");
const AppError = require("./utils/AppError");
const routes = require("./routes")
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:5176"],
        credentials: true,
    }
));
app.use(express.json())
app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
}
);

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => console.log(`Server is running ${PORT}`));