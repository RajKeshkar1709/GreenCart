import Address from "../models/address.js"

//Add address : /api/address/Add
export const addAddress = async (req, res) => {
    try {
        const {
            firstName, lastName, email, street,
            city, state, zipCode, country, phone, userId
        } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User ID missing" });
        }

        await Address.create({
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipCode,
            country,
            phone,
            userId
        });

        res.json({ success: true, message: "Address added successfully" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


//get Address : api/address/get

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.json({ success: false, message: "User ID required" });
        }

        const addresses = await Address.find({ userId });

        res.json({ success: true, addresses });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};