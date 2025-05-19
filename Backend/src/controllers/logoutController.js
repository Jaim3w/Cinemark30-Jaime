const logoutController = {}

logoutController.logout = async (req, res) => {

    res.clearCookie("authToken");
    res.json({ message: "sesion cerrada" });
}

export default logoutController;
