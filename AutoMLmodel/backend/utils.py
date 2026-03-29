import pandas as pd

def load_data(file):
    return pd.read_csv(file)

def split_data(df, task):
    if task != "clustering":
        X = df.iloc[:, :-1]
        y = df.iloc[:, -1]
        return X, y
    else:
        return df, None