import express from 'express';

const app = express();
app.use(express.json());  // To parse JSON bodies

// Sample JSON data you provided
const data = {
   "full name": "Abduul Lateef",
   "age": 21,
   "occupation": "Software Developer",
   "email": "lucky@example.com",
   "subjects": ["Math", "Science", "History"],
   "address" : {
       "street": "123 Main St",
       "city": "Anytown",
       "state": "CA",
       "zip": "12345"
   }
};

// Home route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Unique Paths DP function
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

// GET endpoint for unique paths: /unique-paths?m=3&n=7
app.get('/unique-paths', (req, res) => {
  const m = parseInt(req.query.m);
  const n = parseInt(req.query.n);

  if (!m || !n || m <= 0 || n <= 0) {
    return res.status(400).json({ error: 'm and n must be positive integers' });
  }

  res.json({
    m,
    n,
    unique_paths: uniquePaths(m, n)
  });
});

// GET endpoint to return the sample JSON data
app.get('/profile', (req, res) => {
  res.json(data);
});

// POST endpoint to receive JSON and respond back
app.post('/echo', (req, res) => {
  res.json({
    message: "Received your data!",
    yourData: req.body
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
