require("dotenv").config();
let express = require("express");
let routes = require("./routes");
const pool = require("./utils/config/database");


let app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", routes);

app.get('/', async (req, res) => {
    console.log('running...........')
    res.send('running')
})


let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`hi iam letening at http://localhost:${port}`);
})