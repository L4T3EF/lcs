const express = require("express");
const app = express();

app.use(express.json());

function uniquePaths(m, n) {
    const dp = Array.from({ length: m }, () => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}

app.get("/", (req, res) => {
    res.send("Unique Paths API is running 🚀");
});

app.get("/unique-paths", (req, res) => {
    const m = parseInt(req.query.m);
    const n = parseInt(req.query.n);

    if (!m || !n || m <= 0 || n <= 0) {
        return res.status(400).json({
            error: "m and n must be positive integers"
        });
    }

    res.json({
        m,
        n,
        unique_paths: uniquePaths(m, n)
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
