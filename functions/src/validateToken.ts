import * as functions from 'firebase-functions'


const validateToken = () => {
    return (req : any, res : any, next : any) => {
        if (functions.config().api.sid === req.body.sid) {
            next()
        } else {
            res.status(401).json({message: 'Wrong access token'})
        }
    }
}

export default validateToken;