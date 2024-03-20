import React from "react";
import useFormattedDate from "./../../admin/hooks/useFormattedDate";

const OrderCard = ({ val }) => {
  const { email, shippingAddress, updatedAt, orders, paymentType } = val;
  const newShippingAddress = shippingAddress.filter((val) => val.isActive);

  const { address, number } = newShippingAddress[0];

  const { name, description, rating, brand, price, images } = orders[0];

  const [formattedDate] = useFormattedDate(updatedAt);

  return (
    <>
      <div className="min-h-[350px] my-10 rounded-lg flex flex-col border-primary border-2 justify-around items-center">
        {/* details */}
        <div className="h-3/5 flex p-5 items-center space-x-10 justify-center">
          <div>
            <img className="w-80" src={images?.[0]} alt="random" />
          </div>
          <div>
            <h2 className="text-xl font-medium"> {name}</h2>
            <p> {price}</p>
            <p>{description}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium pb-1"> Delivery address</h2>
            <p> {address}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium pb-1"> Shipping updates</h2>
            <p> {email}</p>
            <p> {number}</p>
          </div>
        </div>
        {/* details Ends */}
        {/* progress */}
        <div className="h-2/5 bg-stroke p-4 rounded-lg flex-col justify-evenly items-center w-10/12 m-auto">
          <div className="m-2">{formattedDate}</div>
          {/* <!-- Progress Bar --> */}
          <div class="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-md">
            <div class="flex items-center justify-between h-8">
              <div class="w-1/4">
                <div class="relative">
                  {/* <!-- Step 1 --> */}
                  <div class="flex items-center mb-2">
                    <div class="w-4 h-4 bg-primary rounded-full animate-ping"></div>
                    <div class="ml-2 text-sm font-medium text-gray-700">
                      Ordered
                    </div>
                  </div>
                  {/* <!-- Line --> */}
                </div>
              </div>

              {/* <!-- Repeat this block for each step --> */}
              {/* <!-- Step 2 --> */}
              <div class="w-1/4">
                <div class="relative">
                  <div class="flex items-center mb-2">
                    <div class="w-4 h-4 bg-primary rounded-full"></div>
                    <div class="ml-2 text-sm font-medium text-gray-700">
                      Shipped
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Step 3 --> */}
              <div class="w-1/4">
                <div class="relative">
                  <div class="flex items-center mb-2">
                    <div class="w-4 h-4 bg-primary rounded-full"></div>
                    <div class="ml-2 text-sm font-medium text-gray-700">
                      Delivered
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Step 4 --> */}
              <div class="w-1/5 flex justify-center items-center">
                <div class="flex bg-primary px-6 rounded-xl py-1 text-white items-center">
                  <div class="text-sm font-medium text-gray-700">Cancel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Progress Ends */}
      </div>
    </>
  );
};

export default OrderCard;
