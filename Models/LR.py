import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
from sklearn.model_selection import train_test_split
import pandas as pd
import matplotlib.pyplot as plt

if __name__ == '__main__':

    stock_list = ['AAPL', 'ABBV', 'ABT', 'ACN', 'AGN', 'AIG', 'ALL', 'AMGN', 'AMZN', 'AXP', 'BA', 'BAC', 'BIIB', 'BK',
                  'BKNG',
                  'BLK', 'BMY', 'BRK.B', 'C', 'CAT', 'CHTR', 'CL', 'CMCSA', 'COF', 'COST', 'CSCO', 'CVS', 'CVX', 'DD',
                  'DHR', 'DIS',
                  'DOW', 'DUK', 'EMR', 'EXC', 'F', 'FB', 'FDX', 'GD', 'GE', 'GILD', 'GM', 'GOOG', 'GOOGL', 'GS', 'HD',
                  'HON', 'IBM',
                  'INTC', 'JNJ', 'JPM', 'KHC', 'KMI', 'KO', 'LLY', 'LMT', 'LOW', 'MA', 'MCD', 'MDLZ', 'MDT', 'MET',
                  'MMM', 'MO', 'MRK',
                  'MS', 'MSFT', 'NEE', 'NFLX', 'NKE', 'NVDA', 'ORCL', 'OXY', 'PEP', 'PFE', 'PG', 'PM', 'PYPL', 'QCOM',
                  'RTN', 'SBUX', 'SLB',
                  'SO', 'SPG', 'T', 'TGT', 'TMO', 'TXN', 'UNH', 'UNP', 'UPS', 'USB', 'UTX', 'V', 'VZ', 'WBA', 'WFC',
                  'WMT', 'XOM']

    i = 1
    for stock in stock_list:
        try:
            df = pd.read_csv("Stock_CSV/" + stock + ".csv")
            dfrev = df.iloc[::-1]
            df = dfrev[['4. close']]
            # Take a look at the new data
            forecast_out = 30  # 'n=30' days
            # Create another column (the target ) shifted 'n' units up
            df['Prediction'] = df[['4. close']].shift(-forecast_out)
            ### Create the independent data set (X)  #######
            # Convert the dataframe to a numpy array
            X = np.array(df.drop(['Prediction'], 1))
            # Remove the last '30' rows
            X = X[:-forecast_out]
            ### Create the dependent data set (y)  #####
            # Convert the dataframe to a numpy array
            y = np.array(df['Prediction'])
            # Get all of the y values except the last '30' rows
            y = y[:-forecast_out]
            # Split the data into 80% training and 20% testing
            x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
            lr = LinearRegression()
            # Train the model
            lr.fit(x_train, y_train)
            x_forecast = np.array(df.drop(['Prediction'], 1))[-forecast_out:]
            lr_prediction = lr.predict(x_forecast)
            plt.plot(lr_prediction, color='r')
            plt.title(stock + ' Regression: 30 Day Forecast')
            plt.ylabel('Price')
            plt.xlabel('Future Days')
            plt.savefig("stock_prediction/" + stock + ".png")
            plt.clf()
            i = i + 1
        except:
            print("error")