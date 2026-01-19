export const healthCheck = (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Backend API",
    timestamp: new Date().toISOString()
  });
};
