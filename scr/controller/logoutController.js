const logoutController = {}

logoutController.logout = async (req, res) =>{
    try {
        res.clearCookie("authCookie")
        return res.status(200).json({message: "Se cerro sesión"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

export default logoutController