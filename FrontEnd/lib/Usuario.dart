import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';

import 'package:investigacion/Calificaciones.dart';

class DetalleUsuario extends StatefulWidget {
  final String userId;
  final String token;
  const DetalleUsuario({super.key, required this.userId, required this.token});
  @override
  DetalleUsuarioState createState() => DetalleUsuarioState();
}

class DetalleUsuarioState extends State<DetalleUsuario> {
  List<dynamic> users = [];
  String nombre = "";
  String email = "";
  final String apiUrl = 'http://10.0.2.2:3000/api/Usuarios/users';

  @override
  void initState() {
    super.initState();
    _rellenarLista();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Detalle de usuario')),
      body: Column(
        children: [
           GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder:
                      (context) => DetalleUsuario(
                        userId: widget.userId,
                        token: widget.token,
                      ),
                ),
              );
            },
            child: Text(
              nombre,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          Text(
              email,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            )
        ],
      ),
    );
  }

  Future<void> _rellenarLista() async {
    String user = widget.userId;
    String token = widget.token;
    String url = '$apiUrl/$user';
    final response = await http.get(Uri.parse(url), headers: {'Content-Type': 'application/json',
      'Accept': 'application/json','Authorization': 'Bearer $token'});

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = json.decode(response.body);     

      setState(() {
        nombre = data['user'];
        nombre = data['user'];
      });
    } else {
      print('Error al obtener los datos de usuario');
    }
  }

  void _editarUser(BuildContext context, int index) {
    TextEditingController _controllerPass = TextEditingController(
      text: users[index]['name'].toString(),
    );
    TextEditingController _controllerEmail = TextEditingController(
      text: users[index]['description'].toString(),
    );
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Editar Usuario'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _controllerPass,
                decoration: InputDecoration(
                  labelText: 'Ingrese la nueva contraseña',
                ),
              ),
              TextField(
                controller: _controllerEmail,
                decoration: InputDecoration(
                  labelText: 'Ingrese el nuevo email',
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                _actualizarUser(
                  users[index]['_id'],
                  _controllerPass.text,
                  _controllerEmail.text,
                );
                Navigator.of(context).pop();
              },
              child: Text('Guardar'),
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
  Future<void> _actualizarUser(
    String id,
    String name,
    String description,
  ) async {
    final response = await http.put(
      Uri.parse('$apiUrl/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'name': name, 'description': description}),
    );

    if (response.statusCode == 200) {
      _rellenarLista();
    } else {
      print('Error al actualizar la asignatura');
    }
  }

}
