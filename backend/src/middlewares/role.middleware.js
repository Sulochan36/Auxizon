export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    message: "Access denied: insufficient permissions",
                });
            }

            next();
        } catch (error) {
            console.log("Error in role middleware:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};