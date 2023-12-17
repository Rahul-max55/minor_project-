import React from "react";

const OrderCard = ({val}) => {
    const { image, name , date, price }  = val ;
console.log("🚀 ~ file: OrderCard.jsx:4 ~ OrderCard ~ date:", date)
console.log("🚀 ~ file: OrderCard.jsx:4 ~ OrderCard ~ name:", name)

    const dateVal = new Date(parseInt(date, 10));

  // Now `date` contains the actual date and time

  // You can format the date as needed, for example:
  const formattedDate = dateVal.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
  });

  console.log("🚀 ~ file: OrderCard.jsx:19 ~ OrderCard ~ formattedDate:", )

  

  return (
    <>
      <div className="min-h-[350px] my-10 rounded-lg flex flex-col border-primary border-2 justify-around items-center">
        {/* details */}
        <div className="h-3/5 flex p-5 items-center space-x-10 justify-center">
          <div>
            <img className="w-80" src={image?.[0]?.url} alt="random" />
          </div>
          <div>
            <h2 className="text-xl font-medium"> {name}</h2>
            <p> {price}</p>
            <p>
              This durable and portable insulated tumbler will keep your
              beverage at the perfect temperature during your next adventure.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium pb-1"> Delivery address</h2>
            <p> {JSON.parse(localStorage.getItem("user")).address}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium pb-1"> Shipping updates</h2>
            <p> {JSON.parse(localStorage.getItem("user")).email}</p>
            <p> {JSON.parse(localStorage.getItem("user")).number}</p>
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
