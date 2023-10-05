const express = require("express");
const sql = require('msnodesqlv8');

const cors = require('cors');

const server = 'W-674PY03-2';
const driver = 'ODBC Driver 17 for SQL Server';
const db = 'Abhilash_DB';
const pwd = 'Password@123456-=';
const uid = 'SA'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const conString=`Server={${server}};Database={${db}};Trusted_Conection=Yes;Driver={${driver}};UId={${uid}};Password={${pwd}}`;
const conString = `Driver=${driver};Server=${server};Database=${db};uid=${uid};pwd=${pwd};`;


app.get("/Users", (req, res) => {
    const query = "SELECT * FROM UserTable01";
    sql.query(conString, query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});



app.get("/Users/:id", (req, res) => {
    const id=req.params.id;
    const query = `SELECT * FROM UserTable01 where UserId=${id}`
    sql.query(conString, query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});


app.get("/Vehicles", (req, res) => {
    const query = "SELECT * FROM VehicleTable";
    sql.query(conString, query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});

app.get("/Vehicles/:id", (req, res) => {
    const id=req.params.id;
    const query = `SELECT * FROM VehicleTable where VehicleId=${id}`
    sql.query(conString, query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});


app.get("/Dependents", (req, res) => {
    const query="SELECT * FROM Dependents01";
    sql.query(conString, query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});

app.get("/Dependents/:id", (req, res) => {
    const id=req.params.id;
    const query=`SELECT * FROM Dependent01 where DependentId=${id}`;
    sql.query(conString, query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});

app.get("/UserDependents/:id", (req, res) => {
    const id=req.params.id;
    const query=`select DependentId,DependentName,DependentAge,Relationship from UserTable01,Dependents01 where UserTable01.Flag=${id} and UserTable01.UserId=Dependents01.UserId;`;
    sql.query(conString, query, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(row);
        }
    })
});

app.get("/Emails",(req, res) => {
    const id=req.params.email;
    const query=`SELECT Email FROM UserTable01`;
    sql.query(conString, query, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});

app.delete("/Users/:id", (req, res) => {
    const id=req.params.id;
    query2=`Delete from UserTable01 where UserId=${id}`
    sql.query(conString, query2, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});

app.delete("/Vehicles/:id", (req, res) => {
    const id=req.params.id;
    query2=`Delete from VehicleTable where VehicleId=${id}`
    sql.query(conString, query2, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});

app.delete("/Dependents/:id", (req, res) => {
    const id=req.params.id;
    query2=`Delete from Dependents01 where DependentId=${id}`
    sql.query(conString, query2, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    })
});



app.post("/Dependents", (req, res) => {
    const body = req.body;
    const query1 = `Insert into Dependents01 values('${body.DependentName}','${body.DependentAge}',${body.UserId},'${body.Relationship}')`;
    sql.query(conString, query1, (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(200).send("Dependents added successfully");
        }
    })
})

app.post("/Users", (req, res) => {
    const body = req.body;
    const query1 = `Insert into UserTable01 values('${body.UserName}','${body.Email}','${body.Password}',${body.Age},${body.Flag})`;
    sql.query(conString, query1, (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(200).send("Users added successfully");
        }
    })
})

app.post("/Vehicles", (req, res) => {
    const body = req.body;
    const query1 = `Insert into VehicleTable values('${body.RegistrationNumber}','${body.Model}',${body.Year},'${body.Type}',${body.UserId})`;
    console.log(body.RegistrationNumber);
    sql.query(conString, query1, (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(200).send("Vehicles added successfully");
        }
    })
})

app.put("/Users/:id/:flag", (req, res) => {
    // const body = req.body;
    const id=req.params.id;
    const flag=req.params.flag;
    const query1 = `Update UserTable01 set Flag=${flag} where UserId=${id}`;
    sql.query(conString, query1, (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(200).send("User updated successfully");
        }
    })
})
app.listen(2210, () => {
    console.log("Server at 2210");
});