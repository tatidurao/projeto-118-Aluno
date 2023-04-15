from flask import Flask , render_template , request , jsonify
import prediction

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# api ouvindo solicitações POST e prevendo sentimentos
@app.route('/predict' , methods = ['POST'])
def predict():

    response = ""
    review = request.json.get('customer_review')
    if not review:
        response = {'status' : 'error',
                    'message' : 'Avaliação em Branco'}
    
    else:

        # chamando o método predict do módulo de previsão.py
        sentiment , path = prediction.predict(review)
        response = {'status' : 'success',
                    'message' : 'Got it',
                    'sentiment' : sentiment,
                    'path' : path}

    return jsonify(response)


# nome da rota igual ao nome dentro de url na linha 142 e metodo POST
@app.route('/' , methods = [''])
def save():

    # extraindo OS dados JSON coloque a baixo o valor da chave que esta na linha 137 do arquivo index.js ex.date
    date = request.json.get('date')
    product = request.json.get('')
    review = request.json.get('')
    sentiment = request.json.get('')

   
    data_entry = date + "," + product + "," + review + "," + sentiment

    
    f = open('./static/assets/datafiles/data_entry.csv' , 'a')

   
    f.write(data_entry + '\n')

   
    return jsonify({'status' : 'success' , 
                    'message' : 'Dados Registrados'})


if __name__  ==  "__main__":
    app.run(debug = True)