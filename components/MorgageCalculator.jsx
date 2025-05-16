import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { getMorgageValues } from "../utils/getMorgageValues";
import { PieChart } from "react-minimal-pie-chart";
import { numberWithCommas } from "../utils/numberWithCommas";

export const validationSchema = yup.object({
  downPayment: yup.number().required(),
  loanTerm: yup.number().required().min(1),
  interestRate: yup.number().required().min(1),
});

export default function MorgageCalculator({ homeValue }) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-bold font-serif uppercase text-3xl mb-4">
        Morgage Calculator
      </h3>
      <Formik
        initialValues={{
          downPayment: homeValue * 0.2,
          loanTerm: 15,
          interestRate: 11.9,
          homeValue,
        }}
        enableReinitialize
        onSubmit={async (values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          dirty,
          setFieldValue,
          values,
          errors,
          handleChange,
        }) => {
          const { monthlyPayment, totalInterestGenerated, totalPayments } =
            getMorgageValues(values);
          return (
            <Form className="py-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block">
                  <span className="text-sm">Home Value</span>
                  <Field
                    type="number"
                    className="
                    mt-2
                    block
                    w-full
                    
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    name="homeValue"
                    placeholder="5,000,000"
                  />
                  <ErrorMessage
                    name="homeValue"
                    component="div"
                    className="mt-2 text-red-600"
                  />
                </label>
                <label className="mb-2 block">
                  <span className="text-sm">Down Payment</span>
                  <Field
                    type="number"
                    className="
                    mt-2
                    block
                    w-full
                    
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    name="downPayment"
                    placeholder="5,000,000"
                  />
                  <ErrorMessage
                    name="downPayment"
                    component="div"
                    className="mt-2 text-red-600"
                  />
                </label>
                <label className="mb-2 block">
                  <span className="text-sm">Interest Rate (%)</span>
                  <Field
                    type="number"
                    className="
                    mt-2
                    block
                    w-full
                    
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    name="interestRate"
                    placeholder="4%"
                  />
                  <ErrorMessage
                    name="downPayment"
                    component="div"
                    className="mt-2 text-red-600"
                  />
                </label>
                <label className="mb-2 block">
                  <span className="text-sm">Loan Term (Years)</span>
                  <Field
                    type="number"
                    className="
                    mt-2
                    block
                    w-full
                    
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    name="loanTerm"
                    placeholder="5"
                  />
                  <ErrorMessage
                    name="loanTerm"
                    component="div"
                    className="mt-2 text-red-600"
                  />
                </label>
              </div>
              <div>
                <div className="w-[160px]">
                  <PieChart
                    data={[
                      {
                        title: "Principle",
                        value:
                          values.homeValue /
                          (values.homeValue + totalInterestGenerated),
                        color: "#7cd6fd",
                      },
                      {
                        title: "Interest",
                        value:
                          totalInterestGenerated /
                          (values.homeValue + totalInterestGenerated),
                        color: "#743ee2",
                      },
                    ]}
                  />
                  <div className="flex gap-3 mt-4">
                    <div className="flex items-center">
                      <span className="block h-2 w-2 mr-2 bg-[#7cd6fd]"></span>
                      <span>Principle</span>
                    </div>
                    <div className="flex items-center">
                      <span className="block h-2 w-2 mr-2 bg-[#743ee2]"></span>
                      <span>Interest</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="py-1.5 px-2 odd:bg-gray-200 ">
                    Monthly Payments: KSH {numberWithCommas(monthlyPayment)}
                  </p>
                  <p className="py-1.5 px-2 odd:bg-gray-200 ">
                    Total Payments: KSH {numberWithCommas(totalPayments)}
                  </p>
                  <p className="py-1.5 px-2 odd:bg-gray-200 ">
                    Total Interest Paid: KSH{" "}
                    {numberWithCommas(totalInterestGenerated)}
                  </p>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
