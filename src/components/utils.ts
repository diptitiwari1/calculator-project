import { FormDataInterface } from "../types";

export const validateForm = (formData: FormDataInterface) => {
  return (
    formData.numberOfSecurities !== "" &&
    formData.hoursPerDay !== "" &&
    formData.frequency !== "" &&
    formData.numberOfSecuritiesError === "" &&
    formData.hoursPerDayError === ""
  );
};

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  formData: FormDataInterface,
  setFormData: React.Dispatch<React.SetStateAction<FormDataInterface>>
) => {
  const { name, value } = event.target;

  if (name === "numberOfSecurities") {
    const numberOfSecurities = parseInt(value, 10);
    let errorMessage = "";
    if (
      isNaN(numberOfSecurities) ||
      numberOfSecurities < 1000 ||
      numberOfSecurities > 99999
    ) {
      errorMessage = "Please enter a number between 1000 and 99999";
    }
    setFormData({
      ...formData,
      [name]: value,
      numberOfSecuritiesError: errorMessage,
    });
  } else if (name === "hoursPerDay") {
    const hoursPerDay = parseInt(value, 10);
    let errorMessage = "";
    if (isNaN(hoursPerDay) || hoursPerDay < 1 || hoursPerDay > 24) {
      errorMessage = "Please enter a number between 1 and 24";
    }
    setFormData({
      ...formData,
      [name]: value,
      hoursPerDayError: errorMessage,
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

export const calculateQuotes = (
  formData: FormDataInterface,
  setFormData: React.Dispatch<React.SetStateAction<FormDataInterface>>,
  setCalculatedFee: React.Dispatch<React.SetStateAction<number>>
) => {
  const { numberOfSecurities, frequency, hoursPerDay } = formData;
  const requestsPerHour = 60 / parseInt(frequency, 10);
  const totalRequestsPerDay = requestsPerHour * parseInt(hoursPerDay, 10);
  const totalQuotesPerDay = totalRequestsPerDay * parseInt(numberOfSecurities, 10);
  const totalQuotesPerMonth = totalQuotesPerDay * 20;

  setFormData((prevState) => ({
    ...prevState,
    requestsPerDay: totalRequestsPerDay,
    quotesPerDay: totalQuotesPerDay,
    quotesPerMonth: totalQuotesPerMonth,
  }));

  const matchingQuote = quotesTable.find((quote, index) => {
    const nextQuote = quotesTable[index];
    return (
      totalQuotesPerMonth <= quote.quotes_per_month ||
      (nextQuote && totalQuotesPerMonth < nextQuote.quotes_per_month)
    );
  });

  let fee = 0;
  if (matchingQuote) {
    fee = matchingQuote.fee;
  } else if (totalQuotesPerMonth > 10000000) {
    const maxQuote = quotesTable[quotesTable.length - 1];
    fee = maxQuote.fee;
  }
  setCalculatedFee(fee);
};

export const quotesTable = [
    {
      "quotes_per_day": 12500,
      "quotes_per_month": 250000,
      "fee": 1000
    },
    {
      "quotes_per_day": 25000,
      "quotes_per_month": 500000,
      "fee": 1500
    },
    {
      "quotes_per_day": 50000,
      "quotes_per_month": 1000000,
      "fee": 2500
    },
    {
      "quotes_per_day": 100000,
      "quotes_per_month": 2000000,
      "fee": 4000
    },
    {
      "quotes_per_day": 250000,
      "quotes_per_month": 5000000,
      "fee": 6000
    },
    {
      "quotes_per_day": 500000,
      "quotes_per_month": 10000000,
      "fee": 8000
    }
  ];
