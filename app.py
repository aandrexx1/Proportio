from flask import Flask, render_template, request, jsonify
import proportio 

app = Flask(__name__)                       #__name__ è una variabile speciale di Python che contiene il nome del file corrente. Flask la usa per sapere dove cercare i file

@app.route("/")                             #Quando viene richiesta pagina da "/" ovvero localhost:5000
def index():
    return render_template("index.html")

@app.route("/run", methods=["POST"])        #Quando viene avviato esegue backtest e riporta i risultati
def run():
    dati = request.json
    risultato = proportio.esegui(
        ticker=dati["ticker"],
        start=dati["start"],
        end=dati["end"],
        saldo=float(dati["saldo"]),
        stop_loss=float(dati["stop_loss"]),
        take_profit=float(dati["take_profit"])
)
    return jsonify(risultato)

if __name__ == "__main__":
    app.run(debug=True)