import yfinance as yf
import matplotlib.pyplot as plt

def esegui(ticker, start, end, saldo, stop_loss, take_profit):

    #Configurazione

    MA20 = 20
    MA50 = 50

    # Scarica dati
    data = yf.download(ticker, start=start, end=end)

    # Calcola medie mobili
    data["MA20"] = data["Close"].rolling(window=MA20).mean()
    data["MA50"] = data["Close"].rolling(window=MA50).mean()

    # Trova i segnali
    data["Signal"] = -1
    data.loc[data["MA20"] > data["MA50"], "Signal"] = 1
    data.loc[data["MA20"] < data["MA50"], "Signal"] = -1

    data["Cross"] = data["Signal"].diff()

    buy = data[data["Cross"] == 2]
    sell = data[data["Cross"] == -2]

    in_posizione = False
    prezzo_acquisto = 0
    prezzo_vendita = 0
    guadagno = 0
    azioni_comprate = 0
    win = 0
    losses = 0  

    for index, row in data.iterrows():
        #BUY
        if row["Cross"].item() == 2 and in_posizione == False:
            prezzo_acquisto = row["Close"].item()
            azioni_comprate = saldo / prezzo_acquisto                       #Calcolo numero di azioni 
            in_posizione = True
            print(f"Comprato a {row['Close'].item():.2f} euro {azioni_comprate:.2f} azioni") 

        #SELL
        if row["Cross"].item() == -2 and in_posizione == True:
            prezzo_vendita = row["Close"].item()
            in_posizione = False
            nuovo_saldo = azioni_comprate * prezzo_vendita
            guadagno = nuovo_saldo - saldo                                  #Calcolo profitti o perdite
            #CALCOLO STATISTICHE
            if guadagno > 0:
                win += 1
            else:
                losses += 1

            saldo = nuovo_saldo                                             #Sottraggo al saldo attuale calcolato sopra il saldo vecchio
            print(f"Venduto a {row['Close'].item():.2f} euro | Guadagno: {guadagno:.2f} | Saldo {saldo:.2f}")

        #STOP LOSS
        if in_posizione == True and row["Close"].item() < prezzo_acquisto * stop_loss:      
            in_posizione = False
            prezzo_vendita = row["Close"].item()
            nuovo_saldo = azioni_comprate * prezzo_vendita                  #Calcolo la perdita se viene preso stoploss
            guadagno = nuovo_saldo - saldo
            #CALCOLO STATISTICHE
            if guadagno > 0:
                win += 1
            else:
                losses += 1

            saldo = nuovo_saldo
            print(f"L'operazione è stata chiusa a stoploss a {prezzo_vendita:.2f}")

        #TAKE PROFIT
        if in_posizione == True and row["Close"].item() > prezzo_acquisto * take_profit:
            in_posizione = False
            prezzo_vendita = row["Close"].item()
            nuovo_saldo = azioni_comprate * prezzo_vendita
            guadagno = nuovo_saldo - saldo
            #CALCOLO STATISTICHE
            if guadagno > 0:
                win += 1
            else:
                losses += 1
                
            saldo = nuovo_saldo
            print(f"L'operazione è arrivata a takeprofit a {prezzo_vendita:.2f}")

    print(f"Saldo finale: {saldo:.2f} euro")
    print("STATISTICHE:")
    print(f"Trade vinti: {win}")
    print(f"Trade persi {losses}")

    # Grafico
    plt.figure(figsize=(12, 6))
    plt.plot(data["Close"], label="Prezzo", color="blue")
    plt.plot(data["MA20"], label="Media Mobile 20gg", color="orange")
    plt.plot(data["MA50"], label="Media Mobile 50gg", color="red")
    plt.scatter(buy.index, buy["Close"], marker="^", color="green", s=100, label="BUY")
    plt.scatter(sell.index, sell["Close"], marker="v", color="red", s=100, label="SELL")
    plt.title(f"{ticker} - Prezzo e Medie Mobili Dal {start}")
    plt.xlabel("Data")
    plt.ylabel("Prezzo (USD)")
    plt.legend()
    plt.show()

    return{
        "saldo_finale": round(saldo, 2),
        "trade_vinti": win,
        "trade_persi": losses    
    }  