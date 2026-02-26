import yfinance as yf
import matplotlib.pyplot as plt

# Scarica dati
data = yf.download("TSLA", start="2023-01-01", end="2025-01-01")

# Calcola medie mobili
data["MA20"] = data["Close"].rolling(window=20).mean()
data["MA50"] = data["Close"].rolling(window=50).mean()

#Trova i segnali
data["Signal"] = 0
data.loc[data["MA20"] > data["MA50"], "Signal"] = 1
data.loc[data["MA20"] < data["MA50"], "Signal"] = -1

data["Cross"] = data["Signal"].diff()

buy = data[data["Cross"] == 2]
sell = data[data["Cross"] == -2]


# Grafico
plt.figure(figsize=(12, 6))
plt.plot(data["Close"], label="Prezzo", color="blue")
plt.plot(data["MA20"], label="Media Mobile 20gg", color="orange")
plt.plot(data["MA50"], label="Media Mobile 50gg", color="red")
plt.scatter(buy.index, buy["Close"], marker="^", color="green", s=100, label="BUY")
plt.scatter(sell.index, sell["Close"], marker="v", color="red", s=100, label="SELL")
plt.title("Tesla - Prezzo e Medie Mobili 2023")
plt.xlabel("Data")
plt.ylabel("Prezzo (USD)")
plt.legend()
print(data["Cross"].value_counts())
print(data[["Signal", "Cross"]].head(60))
plt.show()