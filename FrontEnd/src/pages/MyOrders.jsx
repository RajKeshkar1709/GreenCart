import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const { currency, axios, user } = useAppContext()

    const fetchMyOrder = async () => {
        try {
            const { data } = await axios.get('/api/order/user')
            if (data.success) {
                setMyOrders(data.orders || [])
            }
        } catch (error) {
            console.log("Order fetch error:", error)
        }
    }

    useEffect(() => {
        if (user) {
            fetchMyOrder()
        }
    }, [user])

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col item-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-green-300 rounded-full'></div>
            </div>

            {myOrders.length === 0 && (
                <p className="text-gray-500 text-lg">No orders found.</p>
            )}

            {myOrders.map((order, index) => (
                <div 
                    key={index} 
                    className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'
                >
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                        <span>Order ID: {order?._id}</span>
                        <span>Payment: {order?.paymentType || "Online"}</span>
                        <span>Total: {currency}{order?.amount || "N/A"}</span>
                    </p>

                    {order?.items?.map((item, i) => (
                        <div 
                            key={i} 
                            className={`relative bg-white text-gray-500 ${
                                order.items.length !== i + 1 && "border-b"
                            } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
                        >
                            <div className='flex items-center'>
                                <div className='bg-green-300 p-4 rounded-lg'>
                                    <img
                                        src={item?.product?.image?.[0] || "/placeholder.png"}
                                        alt="product"
                                        className='w-16 h-16 object-cover'
                                    />
                                </div>

                                <div className='ml-4'>
                                    <h2 className='text-xl font-medium text-gray-800'>
                                        {item?.product?.name || "Product removed"}
                                    </h2>
                                    <p>{item?.product?.category || "N/A"}</p>
                                </div>
                            </div>

                            <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                <p>Quantity: {item?.quantity || 1}</p>
                                <p>Status: {order?.status || "Processing"}</p>
                                <p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                            </div>

                            <p className='text-black text-lg font-medium'>
                                Amount: {currency} {item?.product?.offerPrice ? item.product.offerPrice * item.quantity : "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default MyOrders
