const User = require('../models/userModel')

const createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error){
        res.status(400).json({error: error.message});
    }
}

const getAllUsers = async (req, res) => {
    try{
        const filters = {};
        if(req.query.active) filters.active = req.query.active === 'true';
        if(req.query.membershipType) filters.membershipType = req.query.membershipType;

        const users = await User.find(filters);
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).json({error: "User not found"});
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser, getAllUsers, getUserById, updateUser, deleteUser
};