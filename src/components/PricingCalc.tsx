import React, { useState, useEffect } from "react";
import { FormDataInterface } from "../types";
import { validateForm, handleInputChange, calculateQuotes } from "./utils";

const PricingCalculator = () => {
  const initialState: FormDataInterface = {
    numberOfSecurities: "",
    frequency: "1",
    hoursPerDay: "",
    requestsPerDay: 0,
    quotesPerDay: 0,
    quotesPerMonth: 0,
  };

  const [formData, setFormData] = useState<FormDataInterface>(initialState);
  const [calculatedFee, setCalculatedFee] = useState<number>(0);

  useEffect(() => {
    const isValid = validateForm(formData);
    if (isValid) {
      calculateQuotes(formData, setFormData, setCalculatedFee);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        quotesPerMonth: 0,
      }));
      setCalculatedFee(0);
    }
  }, [
    formData.numberOfSecurities,
    formData.frequency,
    formData.hoursPerDay,
    formData,
  ]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full">
        <div className="flex m-6 justify-center sm:text-[30px] text-[25px] font-bold text-[#0d2c8a] underline">
          <p>Pricing Calculator For EDF(main...)</p>
        </div>
        <div className="flex w-full gap-8 p-[30px] justify-center">
          <div className="flex flex-col bg-[#f5f7f9] max-h-[calc(100vh-150px)] max-w-[600px] w-full rounded-xl shadow-xl">
            <div className="m-4">
              <p className="text-[30px] font-bold">Calculator(main)</p>
            </div>
            <div className="flex flex-col m-5 gap-y-8 overflow-y-auto max-h-[calc(100vh-226px)] pr-[10px]">
              <label className="font-bold text-[17px] border-b-4 border-b-[#ccc]">
                <p className="mb-2">Number of Securities..</p>
              </label>
              <input
                className={`w-full border border-black rounded-md p-[8px] ${
                  formData.numberOfSecuritiesError && "border-red-500"
                }`}
                placeholder="Enter number of securities"
                type="number"
                name="numberOfSecurities"
                value={formData.numberOfSecurities}
                onChange={(e) => handleInputChange(e, formData, setFormData)}
                min={1000}
                max={99999}
              />
              {formData.numberOfSecuritiesError && (
                <p className="text-red-500 text-[15px] mt-[-18px]">
                  {formData.numberOfSecuritiesError}
                </p>
              )}
              <label className="font-bold text-[17px] border-b-4 border-b-[#ccc]">
                <p className="mb-2">Frequency of Request in Minutes</p>
              </label>
              <select
                className="w-full border border-black rounded-md p-[8px]"
                name="frequency"
                value={formData.frequency}
                onChange={(e) => handleInputChange(e, formData, setFormData)}
              >
                <option value="1">1 Minute</option>
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="120">120 Minutes</option>
                <option value="480">480 Minutes</option>
              </select>
              <label className="font-bold text-[17px] border-b-4 border-b-[#ccc]">
                <p className="mb-2">Hours per day Requesting Quotes</p>
              </label>
              <input
                className={`w-full border border-black rounded-md p-[8px] ${
                  formData.hoursPerDayError && "border-red-500"
                }`}
                placeholder="Enter hours per day requesting quotes"
                type="number"
                name="hoursPerDay"
                value={formData.hoursPerDay}
                onChange={(e) => handleInputChange(e, formData, setFormData)}
                min={1}
                max={24}
              />
              {formData.hoursPerDayError && (
                <p className="text-red-500 text-[15px] mt-[-18px]">
                  {formData.hoursPerDayError}
                </p>
              )}
              <div className="flex flex-col justify-center items-center m-5 gap-10">
                <div className="flex xl:flex-row flex-col gap-4">
                  <div className="flex flex-col p-[10px] bg-white border border-[#007bff] w-[164px] font-bold rounded-md justify-center items-center text-[20px]">
                    <p className="font-semibold">{formData.quotesPerMonth}</p>
                    <p>Quotes/month</p>
                  </div>
                  <div className="flex flex-col p-[10px] bg-white border border-[#007bff] w-[164px] font-bold rounded-md justify-center items-center text-[20px]">
                    <p className="font-semibold">${calculatedFee}</p>
                    <p>Fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
