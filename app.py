from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
from flask_cors import CORS



load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', '1234')

CORS(app)

# Configuración de correo
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']  # 🔹 Default sender

mail = Mail(app)


@app.route("/send_email", methods=["POST"])
def send_email():
    try:
        nombre = request.form['nombre']
        email = request.form['email']
        telefono = request.form.get('telefono', 'No especificado')
        mensaje = request.form['mensaje']

        msg = Message(
            subject='Nuevo mensaje de contacto',
            sender=app.config['MAIL_DEFAULT_SENDER'],  # 🔹 Usar default sender
            recipients=[app.config['MAIL_USERNAME']]
        )
        msg.body = f"""
Nuevo mensaje de contacto:

Nombre: {nombre}
Email: {email}
Teléfono: {telefono}
Mensaje: {mensaje}
"""
        mail.send(msg)
        print("Correo enviado correctamente")  # Para ver en consola
        return jsonify({"success": True, "message": "Correo enviado correctamente"}), 200

    except Exception as e:
        print("ERROR FLASK:", e)  # Para depuración
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
