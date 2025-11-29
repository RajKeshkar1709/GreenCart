import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const InputField = ({ type, placeholder, name, handleChange, address }) => {
    return (
        <input
            className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-green-500 transition'
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required
        />
    )
}

const AddAddress = () => {

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
    });

    const { axios, user, navigate } = useAppContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user?._id) {
        toast.error("User not logged in!");
        return;
    }

    try {
        const payload = { ...address, userId: user._id };

        const { data } = await axios.post('/api/address/add', payload, {
            headers: { "Content-Type": "application/json" }
        });

        if (data.success) {
            toast.success(data.message);
            navigate('/Carts');
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};


    useEffect(() => {
        if (!user) navigate('/Carts')
    }, []);

    return (
        <div className='mt-16 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-700'>
                Add Shipping <span className='font-semibold text-gray-700'>Address</span>
            </p>

            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>

                <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
                            <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
                        </div>

                        <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Enter Email" />
                        <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street Address" />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
                            <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name="zipCode" type="number" placeholder="Zip Code" />
                            <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
                        </div>

                        <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone Number" />

                        <button className='w-full mt-6 bg-gray-700 text-white py-3 hover:bg-gray-950 transition cursor-pointer uppercase'>
                            Save Address
                        </button>
                    </form>
                </div>

                <img src={assets.add_address_iamge} alt="add address" className='md:mr-16 mb-16 md:mt-0' />
            </div>
        </div>
    )
}

export default AddAddress;
