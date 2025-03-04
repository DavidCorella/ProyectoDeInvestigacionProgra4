import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'Asignaturas.dart';
import 'package:email_validator/email_validator.dart';
import 'TokenStorage.dart';

class Login extends StatefulWidget {
  const Login({super.key});
  @override
  _LoginPantallaState createState() => _LoginPantallaState();
}

class _LoginPantallaState extends State<Login> {
  final String apiUrl = 'http://10.0.2.2:3000/api/Usuarios/auth';
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TokenStorage tokenStorage = TokenStorage();
  void _auth() async {
    final username = _usernameController.text;
    final password = _passwordController.text;

    final Map<String, String> requestBody = {
      'user': username,
      'password': password,
    };

    final response = await http.post(
      Uri.parse('http://10.0.2.2:3000/api/Usuarios/auth/login/'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(requestBody),
    );
    final Map<String, dynamic> databody = json.decode(response.body);

    if (response.statusCode == 200) {
      if (databody['message'] == 'Inicio de sesión exitoso') {
        final String token = databody['token'];
        final String userId = databody['userId'];

        await tokenStorage.storeToken(token);

        Navigator.push(
          context,
          MaterialPageRoute(
            builder:
                (context) => DetalleAsignatura(userId: userId),
          ),
        );
      } else {
        Fluttertoast.showToast(
          msg: 'Error: ${databody['message']}',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: const Color.fromARGB(255, 225, 244, 54),
          textColor: Colors.white,
          fontSize: 16.0,
        );
      }
    } else {
      Fluttertoast.showToast(
        msg: 'Error: ${databody['message']}',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: const Color.fromARGB(255, 225, 244, 54),
        textColor: Colors.white,
        fontSize: 16.0,
      );
    }
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login progra4')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(
                labelText: 'Usuario',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.lock),
              ),
            ),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: 'Contraseña',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.lock),
              ),
              obscureText: true,
            ),

            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _auth,
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 15, horizontal: 50),
                textStyle: TextStyle(fontSize: 18),
              ),
              child: Text('Iniciar sesión'),
            ),
          ],
        ),
      ),
      // Floating Action Button para agregar calificación
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(right: 20.0, bottom: 20.0),
        child: FloatingActionButton(
          onPressed: () {
            _agregarAsignatura(context);
          },
          child: Icon(Icons.add),
          backgroundColor: Colors.blue,
        ),
      ),
    );
  }

  void _agregarAsignatura(BuildContext context) {
    TextEditingController controllerTextuser = TextEditingController();
    TextEditingController controllerTextPass = TextEditingController();
    TextEditingController controllerTextDescEmail = TextEditingController();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Digite el usuario'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: controllerTextuser,
                decoration: InputDecoration(labelText: 'Digite el usuario'),
              ),
              TextField(
                controller: controllerTextPass,
                decoration: InputDecoration(labelText: 'Digite la contraseña'),
                obscureText: true,
              ),
              TextField(
                controller: controllerTextDescEmail,
                decoration: InputDecoration(labelText: 'Digite el correo'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                _CrearUsuario(
                  controllerTextuser.text,
                  controllerTextPass.text,
                  controllerTextDescEmail.text,
                );
                Navigator.of(context).pop();
              },
              child: Text('Crear'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Cancelar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _CrearUsuario(String user, String password, String email) async {
    if (_esEmailValido(email) && password.length >= 8) {
      final response = await http.post(
        Uri.parse('$apiUrl/register'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'user': user, 'password': password, 'email': email}),
      );

      if (response.statusCode == 200) {
        Fluttertoast.showToast(
          msg: 'Usuario Creado',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: const Color.fromARGB(255, 225, 244, 54),
          textColor: Colors.white,
          fontSize: 16.0,
        );
      } else {
        Fluttertoast.showToast(
          msg: 'Error al crear usario',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: const Color.fromARGB(255, 225, 244, 54),
          textColor: Colors.white,
          fontSize: 16.0,
        );
      }
    } else {
      Fluttertoast.showToast(
        msg: 'Email o contraseña no válido',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: const Color.fromARGB(255, 225, 244, 54),
        textColor: Colors.white,
        fontSize: 16.0,
      );
    }
  }

  bool _esEmailValido(String email) {
    return EmailValidator.validate(email);
  }
}
