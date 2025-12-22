const Dashboard = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to the Dashboard!",
        user: req.user
    });
};

export default Dashboard;