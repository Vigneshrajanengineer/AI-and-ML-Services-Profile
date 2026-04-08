from flask import Flask, request, jsonify, send_file
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

app = Flask(__name__)
df = None

@app.route('/upload', methods=['POST'])
def upload():
    global df
    file = request.files['file']
    df = pd.read_csv(file)

    return jsonify({
        "html": df.head().to_html()
    })

@app.route('/handle_missing')
def handle_missing():
    global df
    df.fillna(df.mean(numeric_only=True), inplace=True)
    return "Done"

@app.route('/remove_duplicates')
def remove_duplicates():
    global df
    df.drop_duplicates(inplace=True)
    return "Done"

@app.route('/encode')
def encode():
    global df
    le = LabelEncoder()
    for col in df.select_dtypes(include='object').columns:
        df[col] = le.fit_transform(df[col])
    return "Done"

@app.route('/scale')
def scale():
    global df
    scaler = StandardScaler()
    num_cols = df.select_dtypes(include=['int64', 'float64']).columns
    df[num_cols] = scaler.fit_transform(df[num_cols])
    return "Done"

@app.route('/download')
def download():
    global df
    file_path = "processed.csv"
    df.to_csv(file_path, index=False)
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)