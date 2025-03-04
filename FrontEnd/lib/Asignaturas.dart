import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'Usuario.dart';
import 'UsuarioV2.dart';
import 'TokenStorage.dart';

import 'package:investigacion/Calificaciones.dart';

class DetalleAsignatura extends StatefulWidget {
  final String userId;
  const DetalleAsignatura({super.key, required this.userId});
  @override
  DetalleAsignaturaState createState() => DetalleAsignaturaState();
}

class DetalleAsignaturaState extends State<DetalleAsignatura> {
  List<dynamic> asignaturas = [];
  String users = "";
  String? token = "";
  final String apiUrl = 'http://10.0.2.2:3000/api/Asignaturas/subjects';
  final TokenStorage tokenStorage = TokenStorage();

  @override
  void initState() {
    super.initState();
    _cargarToken();
  }

  Future<void> _cargarToken() async {
    token = await tokenStorage.getToken();

    _rellenarLista();
    userdata();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Lista de Asignaturas')),
      body: Column(
        children: [
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder:
                      (context) => UsuarioInformacion(userId: widget.userId),
                ),
              );
            },
            child: Text(
              users,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          !asignaturas.isNotEmpty
              ? Padding(
                padding: const EdgeInsets.all(16.0),
                child: Center(child: Text('No hay asignaturas disponibles')),
              )
              : Expanded(
                child: ListView.builder(
                  itemCount: asignaturas.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text('${asignaturas[index]['name']}'),
                      subtitle: Text(
                        'Descripcion: ${asignaturas[index]['description']}\nUltima modificacion: ${DateFormat('yyyy/MM/dd HH:mm:ss').format(DateTime.parse(asignaturas[index]['createdAt']))}',
                      ),
                      onTap: () => cambiarPantalla(asignaturas[index]['_id']),
                      onLongPress: () => _editarAsignatura(context, index),
                       trailing: IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () {
                      setState(() {
                        _eliminarAsignatura(asignaturas[index]['_id']);
                      });
                    },
                  ),
                    );
                  },
                ),
              ),
        ],
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(right: 20.0, bottom: 20.0),
        child: FloatingActionButton(
          onPressed: () {
            _agregarAsignatura(context);
          },
          backgroundColor: Colors.blue,
          child: Icon(Icons.add),
        ),
      ),
    );
  }

Future<void> _eliminarAsignatura(String id) async {
    final response = await http.delete(
      Uri.parse('$apiUrl/$id'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${token}',
      },
    );

    if (response.statusCode == 200) {
      _rellenarLista();
    } else {
      print('Error al actualizar la calificación');
    }
  }

  Future<void> _rellenarLista() async {
    String user = widget.userId;
    final response = await http.get(
      Uri.parse('$apiUrl/$user'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);

      List<Map<String, dynamic>> asignaturesList =
          data.map((item) {
            return {
              '_id': item['_id'],
              'name': item['name'],
              'createdAt': item['createdAt'],
              'description': item['description'],
            };
          }).toList();

      setState(() {
        asignaturas = asignaturesList;
      });
    } else {
      print('Error al obtener las calificaciones');
    }
  }

  void _agregarAsignatura(BuildContext context) {
    TextEditingController controllerTextName = TextEditingController();
    TextEditingController controllerTextDesc = TextEditingController();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Agregar Asignatura'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: controllerTextName,
                decoration: InputDecoration(labelText: 'Ingrese el nombre'),
              ),
              TextField(
                controller: controllerTextDesc,
                decoration: InputDecoration(
                  labelText: 'Ingrese la descripcion',
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                _guardarAsignacion(
                  widget.userId,
                  controllerTextName.text,
                  controllerTextDesc.text,
                );
                Navigator.of(context).pop();
              },
              child: Text('Agregar'),
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

  Future<void> _guardarAsignacion(
    String user,
    String name,
    String Description,
  ) async {
    String createdAt = DateTime.now().toString();

    final response = await http.post(
      Uri.parse('$apiUrl'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${token}',
      },
      body: json.encode({
        'userId': user,
        'name': name,
        'description': Description,
        'createdAt': createdAt,
      }),
    );

    if (response.statusCode == 200) {
      _rellenarLista();
    } else {
      print('Error al agregar calificación');
    }
  }

  void cambiarPantalla(String id) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetalleAsignaturaPantalla(subjectId: id),
      ),
    );
  }

  void _editarAsignatura(BuildContext context, int index) {
    TextEditingController _controllerName = TextEditingController(
      text: asignaturas[index]['name'].toString(),
    );
    TextEditingController _controllerDesc = TextEditingController(
      text: asignaturas[index]['description'].toString(),
    );
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Editar Calificación'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _controllerName,
                decoration: InputDecoration(
                  labelText: 'Ingrese el nuevo nombre',
                ),
              ),
              TextField(
                controller: _controllerDesc,
                decoration: InputDecoration(
                  labelText: 'Ingrese la nueva Descripcion',
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                _actualizarAsignatura(
                  asignaturas[index]['_id'],
                  _controllerName.text,
                  _controllerDesc.text,
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

  Future<void> _actualizarAsignatura(
    String id,
    String name,
    String description,
  ) async {
    final response = await http.put(
      Uri.parse('$apiUrl/$id'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${token}',
      },
      body: json.encode({'name': name, 'description': description}),
    );

    if (response.statusCode == 200) {
      _rellenarLista();
    } else {
      print('Error al actualizar la asignatura');
    }
  }

  Future<void> userdata() async {
    String user = widget.userId;
    final response = await http.get(
      Uri.parse('http://10.0.2.2:3000/api/Usuarios/users/$user'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      Map<String, dynamic> data = json.decode(response.body);
      setState(() {
        users = data['user'];
      });
    } else {
      print('Error al obtener los datos de usuario');
    }
  }
}
