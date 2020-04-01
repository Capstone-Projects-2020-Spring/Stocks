import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import time

from alpha_vantage.timeseries import TimeSeries
from pprint import pprint

# alpha vantage api key
alpha_key = 'YNY88LER76HPO0G3'

# list of stocks to retrieve
# stock_list_original = ['MSFT', 'AAPL', 'AMD', 'FB', 'ROKU', 'ENPH', 'LYFT', 'AAL']
#stock_list = ['SPX']
#stock_list = ['AAPL','ABBV','ABT','ACN','ADBE','AGN','AIG','ALL','AMGN','AMZN','AXP','BA','BAC','BIIB','BK','BKNG',
#                'BLK','BMY','BRK.B','C','CAT','CHTR','CL','CMCSA','COF','COST','CSCO','CVS','CVX','DD','DHR','DIS',
#                'DOW','DUK','EMR','EXC','F','FB','FDX','GD','GE','GILD','GM','GOOG','GOOGL','GS','HD','HON','IBM',
#                'INTC','JNJ','JPM','KHC','KMI','KO','LLY','LMT','LOW','MA','MCD','MDLZ','MDT','MET','MMM','MO','MRK',
#                'MS','MSFT','NEE','NFLX','NKE','NVDA','ORCL','OXY','PEP','PFE','PG','PM','PYPL','QCOM','RTN','SBUX','SLB',
#                'SO','SPG','T','TGT','TMO','TXN','UNH','UNP','UPS','USB','UTX','V','VZ','WBA','WFC','WMT','XOM']

def convert_csv_to_tickers():
    df = pd.read_csv('nasdaqlisted.txt', sep='|')['Symbol']
    array = np.array(df.values)
    array = np.delete(array, len(array) - 1)
    f = open("NASDAQ1.txt", "w")
    for a in array:
        f.write(a + ',')
    f.close()

def set_stock_list():
    arr = []
    with open("NASDAQ1.txt", "r") as filestream:
        for line in filestream:
            currentline = line.split(',')
            arr.append(currentline)
    newarr = np.array(arr[0])
    return newarr

def retrieve(stock_list):
    count = 1
    for stock in stock_list:

        # stock is a string type so we do not convert for csv
        print(type(stock))

        # exception handling

        if count != 5:
            print("For stock:", stock)
            ts = TimeSeries(key=alpha_key, output_format='pandas')
            data, meta_data = ts.get_daily(symbol=stock, outputsize='full')

            plot_graph(stock, data)

            print(data.head(), '\n')
            print(len(data))

            convert_csv(data, stock)

            count += 1

        else:
            time.sleep(60)
            count = 0


def convert_csv(data, stock):
    data.to_csv('../Stocks/Stock_CSV/' + stock + '.csv')


def plot_graph(stock, data):
    to_plot = plt.plot(data['4. close'], color='darkolivegreen')
    # to see the inline plotting - unneccessary now
    # to_plot.plot()
    # plt.color
    plt.xlabel('Years', color='firebrick')
    plt.ylabel('Prices', color='firebrick')
    plt.title(stock + ': Prices over Time', color='darkblue')
    plt.savefig('../Stocks/Stock_Plot/' + stock + '.png')
    #plt.show()


def main():
    stock_list = set_stock_list()
    retrieve(stock_list)


if __name__ == "__main__":
    main()
