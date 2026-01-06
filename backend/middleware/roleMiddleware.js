export const recruiterOnly = (req, res, next) => {
    if (req.user.role?.toLowerCase() !== 'recruiter') {
        return res.status(403).json({ message: "Access denied" })
    }
    next()
}