// const express = require("express");

// const uploadRoutes = require("./uploads/upload");
// const apiRoutes = require("./routes/route");


// const app = express();
// const bodyParser = require("body-parser");
// const cors = require('cors');
// app.use(cors());

// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(uploadRoutes);
// app.use(apiRoutes);


// app.use(function (req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// });

// app.listen(port, function () {
//   console.log(`App listening on port ${port}`);
// });

// app.get("/", function (req, res) {
//   res.send("List of details !");
// });
































require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const morgan = require('morgan');

const uploadRoutes = require("./uploads/upload");
const apiRoutes = require("./routes/route");

const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3000;

// Cluster setup for multi-core utilization
if (cluster.isMaster && process.env.NODE_ENV !== 'test') {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < 2; i++) cluster.fork();
  cluster.on('exit', (worker) => cluster.fork());
} else {
  // Security middleware
  app.use(helmet());
  app.use(compression());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 1000 requests per windowMs
  });
  app.use(limiter);

  // Request logging
  app.use(morgan('combined'));

  // Body parsing
  app.use(express.json({ limit: '210mb' }));
  app.use(express.urlencoded({ extended: true, limit: '210mb' }));

  // Routes
  app.use(uploadRoutes);
  app.use(apiRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${port}`);
  });
}