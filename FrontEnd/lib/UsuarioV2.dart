import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'TokenStorage.dart';

class UsuarioInformacion extends StatefulWidget {
  final String userId;
  const UsuarioInformacion({super.key, required this.userId});
  @override
  _UsuarioInformacionState createState() => _UsuarioInformacionState();
}

class _UsuarioInformacionState extends State<UsuarioInformacion> {
  // Controladores de texto para los tres campos
  final TextEditingController _userController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final String apiUrl = 'http://10.0.2.2:3000/api/Usuarios/users';
  final TokenStorage tokenStorage = TokenStorage();
  String? token = "";
  @override
  void initState() {
    super.initState();
    _cargarToken();
  }

  Future<void> _cargarToken() async {
    token = await tokenStorage.getToken();
    _rellaInfoUsuario();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Modificación usuario')),
      body: Padding(
        padding: const EdgeInsets.only(top: 50, left: 50, right: 50),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Campo de texto para el usuario
            TextField(
              controller: _userController,
              readOnly: true,
              decoration: InputDecoration(
                labelText: 'Usuario',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16), // Espacio entre los campos
            // Campo de texto para el correo electrónico
            TextField(
              controller: _emailController,
              keyboardType:
                  TextInputType.emailAddress, // Para teclados de email
              decoration: InputDecoration(
                labelText: 'Correo electrónico',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16), // Espacio entre los campos
            // Campo de texto para la contraseña
            TextField(
              controller: _passwordController,
              obscureText: true, // Para ocultar la contraseña
              decoration: InputDecoration(
                labelText: 'Contraseña',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 32), // Espacio antes del botón
            // Botón para enviar los datos
            ElevatedButton(
              onPressed: () {
                String password = _passwordController.text;
                String email = _emailController.text;
                String usuario = _userController.text;

                _actualizarUser(
                  widget.userId,
                  usuario,
                  email,
                  password,
                  context,
                );
              },
              child: Text('Enviar'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _rellaInfoUsuario() async {
    String user = widget.userId;
    String url = '$apiUrl/$user';
    final response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = json.decode(response.body);

      setState(() {
        _userController.text = data['user'];
        _emailController.text = data['email'];
      });
    } else {
      print('Error al obtener los datos de usuario');
    }
  }

  Future<void> _actualizarUser(
    String id,
    String name,
    String email,
    String password,
    BuildContext context,
  ) async {
    final response = await http.put(
      Uri.parse('$apiUrl/$id'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: json.encode({'user': name, 'password': password, 'email': email}),
    );

    if (response.statusCode == 200) {
      Navigator.of(context).pop();
    } else {
      print('Error al actualizar la asignatura');
    }
  }
}
