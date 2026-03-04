import yfinance as yf
import plotly.graph_objects as go  

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
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=data.index, y=data["Close"].squeeze(), name="Prezzo", line=dict(color="#4a9eff")))
    fig.add_trace(go.Scatter(x=data.index, y=data["MA20"].squeeze(), name="MA20", line=dict(color="orange")))
    fig.add_trace(go.Scatter(x=data.index, y=data["MA50"].squeeze(), name="MA50", line=dict(color="red")))
    fig.add_trace(go.Scatter(x=buy.index, y=buy["Close"].squeeze(), mode="markers", name="BUY", marker=dict(symbol="triangle-up", size=12, color="green")))
    fig.add_trace(go.Scatter(x=sell.index, y=sell["Close"].squeeze(), mode="markers", name="SELL", marker=dict(symbol="triangle-down", size=12, color="red")))
    fig.update_layout(paper_bgcolor="#0a0a0f", plot_bgcolor="#0a0a0f", font=dict(color="#e0e0e0"), title=f"{ticker} - Backtesting")
    
    grafico = fig.to_json()

    return{
        "saldo_finale": round(saldo, 2),
        "trade_vinti": win,
        "trade_persi": losses,    
        "grafico": grafico
    }  