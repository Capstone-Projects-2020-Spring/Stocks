# Testing

import numpy as np
import pandas as pd
import time

from alpha_vantage.timeseries import TimeSeries
from pprint import pprint

# alpha vantage api key
alpha_key = 'YNY88LER76HPO0G3'

# list of stocks to retrieve
stock_list = ['CTSH']


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

            #showing dataframe to make sure printing proper data
            print(data.head(), '\n')

            #length to see number of days back
            print(len(data))

            ## function to convert to csv file
            convert_csv(data, stock)

            count += 1
        else:
            time.sleep(60)
            count = 0


def convert_csv(data, stock):
    data.to_csv('../Stocks/StockCSV/' + stock + '.csv')


def main():
    retrieve(stock_list)


if __name__ == "__main__":
    main()
