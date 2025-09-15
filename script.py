import pandas as pd
data = pd.read_excel("data\\final_data.xlsx")
data.loc[:, "Ayurveda_Name"] = data.loc[:, "Ayurveda_Name"].str.lower()
data.loc[:, "Ayurveda_Name"] = data.loc[:, "Ayurveda_Name"].str.split(pat=" \(", expand=True).iloc[:, 0]
# data.to_csv("data\\final_csv_data.csv", index=False)
# print(data.head(10))
data = data.drop('icd11', axis=1)
data.to_csv("data\\to_show.csv", index=False)