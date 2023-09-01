import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../utils.js';

const handlePolicies = policies => async (req, res, next) => {
    
    if(policies[0] === 'PUBLIC') return next()
    
    const authHeader = req.headers.autorization;
    console.log('authHeader', req.headers)
    if (!authHeader) return res.status(401).send({ status: "error", error: "Unauthorized" })    
    const token = authHeader.split(' ')[1];
    let user = jwt.verify(token, PRIVATE_KEY)
    const userRole = user.user.role
    console.log('userpolice', userRole)
    if(!policies.includes(userRole.toUpperCase())) return res.status(403).send({ status: "error", error: "Unauthorized" })
    req.user = user.user;
    console.log('1', req.user)
    next();    
}

export default handlePolicies


