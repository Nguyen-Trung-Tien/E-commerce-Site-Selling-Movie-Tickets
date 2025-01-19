module.exports = {
  // ... other configurations ...
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
