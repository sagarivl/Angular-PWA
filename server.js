let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let webpush = require("web-push");
let app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a push notification server use post");
});

// {
//     publicKey: 'BNsHGS8Qa4XDLifiNZblvrLSUKtgoI2emQn0kQRXvevHGOuNGFqyzaSSIH6M7MmwRYwP5gtsodkHXPYbYmXLivc',
//     privateKey: 'Vgn8JB4H-rvDmOME3628QAlLoEVrCuJFt9CNt7VuTrA'
//   }
app.post("/subscribe", (req, res) => {
  let sub = req.body;
  console.log(JSON.stringify(sub));
  res.set("Content-Type", "application/json");
  webpush.setVapidDetails(
    "mailto:example@yourdomain.org",
    "BNsHGS8Qa4XDLifiNZblvrLSUKtgoI2emQn0kQRXvevHGOuNGFqyzaSSIH6M7MmwRYwP5gtsodkHXPYbYmXLivc",
    "Vgn8JB4H-rvDmOME3628QAlLoEVrCuJFt9CNt7VuTrA"
  );

  let payload = JSON.stringify({
    notification: {
      title: "Infovision labs",
      body: "Thanks for subscribing to my channel",
      data: { url: "https://www.infovision.com/" },
      icon: "https://yt3.ggpht.com/a-/AAuE7mCxr-4W53FAxBRcKR0iDk_vPCSAmW-QKFGaFA=s88-mo-c-c0xffffffff-rj-k-no",
    },
  });

  Promise.resolve(webpush.sendNotification(sub, payload))
    .then(() =>
      res.status(200).json({
        message: "Notification sent",
      })
    )
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//console.log(webpush.generateVAPIDKeys());
app.listen(3001, () => {
  console.log("Listening on port 3001...");
});

// {"publicKey":"BPHZPfD6ibAOEJKIUAhVBuCm7CXisWr0i_pv25fENuJFVmHUNRWY4vSMqdKeLtNltFyuKm-_w1qpL-xOif79u4Y",
// "privateKey":"Sr_9ZFkmKeZVyB8sXV1VzwrxCqsrduhL2SHhb2I478g"}
