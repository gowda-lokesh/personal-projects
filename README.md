Demand Forecasting Models
Introduction
This document explores various demand forecasting models to help business and data science professionals choose the most effective approach for their specific needs. The choice of the best model depends on the specific problem, data availability and quality, and the need for continuous evaluation.



Time Series Analysis
Time series analysis is a fundamental part of quantitative forecasting. It helps in understanding the components of a time series, which improves predictive accuracy. The four essential components of a time series are:




Trend: This signifies the long-term progression and represents the overall direction of the data over time.


Seasonality: These are regular, periodic fluctuations that repeat over specific intervals.


Cyclical: These variations occur over longer periods and are related to economic cycles.


Irregular: These are unpredictable components, such as random or unforeseen events that affect the data.

These components interact with each other and affect the outcomes, so analyzing their interactions can enhance the understanding of trends.

Forecasting Models
ARIMA
The ARIMA (Auto-Regressive Integrated Moving Average) model is a powerful statistical tool for forecasting non-seasonal data. It analyzes a single set of historical data to predict future values by identifying patterns, adjusting for long-term trends, and using past prediction errors to improve future forecasts. The ARIMA model has three components: AR (Auto-Regressive), I (Integrated), and MA (Moving Average). According to the comparative analysis, ARIMA requires time series data and is best for general forecasting.





SARIMA
The SARIMA (Seasonal Auto-Regressive Integrated Moving Average) model is an extension of ARIMA designed to handle data with seasonal patterns. It is widely used in fields like economics, meteorology, and inventory management for precise seasonal forecasting. Key parameters for SARIMA include:



P (Seasonal AR): Represents the seasonal auto-regressive component, which incorporates the influence of past seasonal observations.


D (Seasonal I): Stands for seasonal differencing, used to make seasonal data stationary by removing seasonal trends or cycles.


Q (Seasonal MA): Indicates the seasonal moving average component, which accounts for the influence of past forecast errors on the current observation.

SARIMA is best for seasonal forecasting and requires seasonal data.

Prophet
Prophet is an automated additive model for forecasting that includes components for trend, seasonality, and holidays. It captures recurring patterns over time, identifies long-term changes in data, and adjusts forecasts based on the impact of holidays. The forecast is represented by the equation 



y(t)=g(t)+s(t)+h(t)+ϵ(t). Prophet is considered a flexible model that requires historical data.



Delphi Method
The Delphi Method is a qualitative forecasting tool used when there is a lack of quantitative data. This method leverages the knowledge and experience of experts to generate insights. It is an iterative feedback process where experts provide anonymous insights in a series of rounds, refining their responses with each round. The goal is to build a consensus among the experts to improve the reliability of the forecast