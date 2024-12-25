const express = require("express");
const sqlcon = require("./Config/Db.js");
const {categoryRouter} = require("./Routes/CategoryRoutes.js");
const {productRouter} = require("./Routes/ProductRoutes.js");
let cors = require('cors')
const PORT = 3000
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/category/",categoryRouter);
app.use("/api/product/",productRouter);
sqlcon.sync({alter:true})
app.listen(PORT,()=>{
  console.log(`PORT IS ON ${PORT}`)
})