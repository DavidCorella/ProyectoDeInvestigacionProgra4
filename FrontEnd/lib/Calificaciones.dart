import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:fl_chart/fl_chart.dart';

class DetalleAsignaturaPantalla extends StatefulWidget {
  final String subjectId;
  final String token;
  const DetalleAsignaturaPantalla({
    super.key,
    required this.subjectId,
    required this.token,
  });
  @override
  DetalleAsignaturaPantallaState createState() =>
      DetalleAsignaturaPantallaState();
}

class DetalleAsignaturaPantallaState extends State<DetalleAsignaturaPantalla> {
  List<Map<String, dynamic>> calificaciones = [];
  final String apiUrl = 'http://10.0.2.2:3000/api/Calificaciones/grades';

  List<BarChartGroupData> _crearDatosGrafico() {
    return calificaciones.map((calificacion) {
      return BarChartGroupData(
        x: DateTime.parse(calificacion['createdAt']).millisecondsSinceEpoch,
        barRods: [
          BarChartRodData(
            toY: double.parse(calificacion['grade']),
            color: Colors.blue,
            width: 15,
          ),
        ],
      );
    }).toList();
  }

  @override
  void initState() {
    super.initState();
    _rellenarLista();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Detalles Asignatura')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 50, left: 50, right: 50),
            child: Container(
              height: 200,
              child: BarChart(
                BarChartData(
                  maxY: 100,
                  alignment: BarChartAlignment.spaceAround,
                  titlesData: FlTitlesData(
                    topTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 32,
                        getTitlesWidget: (value, meta) {
                          DateTime date = DateTime.fromMillisecondsSinceEpoch(
                            value.toInt(),
                          );
                          return Text(
                            DateFormat('yyyy/MM/dd ').format(date),
                            style: TextStyle(fontSize: 10),
                          );
                        },
                      ),
                    ),
                  ),
                  gridData: FlGridData(show: true),
                  borderData: FlBorderData(show: true),
                  barGroups: _crearDatosGrafico(),
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: calificaciones.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text('Calificación ${index + 1}'),
                  subtitle: Text(
                    'Nota: ${calificaciones[index]['grade']}\n' +
                        'Último registro el: ${DateFormat('yyyy/MM/dd HH:mm:ss').format(DateTime.parse(calificaciones[index]['createdAt']))}',
                  ),
                  onTap: () => _editarCalificacion(context, index),
                  leading: Icon(Icons.grade),
                  trailing: IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () {
                      setState(() {
                        _eliminarCalificacion(calificaciones[index]['_id']);
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
            _agregarCalificacion(context);
          },
          backgroundColor: Colors.blue,
          child: Icon(Icons.add),
        ),
      ),
    );
  }

  void _agregarCalificacion(BuildContext context) {
    TextEditingController controllerText = TextEditingController();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Agregar Calificación'),
          content: TextField(
            controller: controllerText,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(labelText: 'Ingrese la calificación'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                _guardarCalificacion(widget.subjectId, controllerText.text);
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

  Future<void> _guardarCalificacion(
    String subjectId,
    String calificacion,
  ) async {
    String createdAt = DateTime.now().toString();

    final response = await http.post(
      Uri.parse('$apiUrl'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${widget.token}',
      },
      body: json.encode({
        'subjectId': subjectId,
        'grade': calificacion,
        'createdAt': createdAt,
      }),
    );

    if (response.statusCode == 200) {
      _rellenarLista();
    } else {
      print('Error al agregar calificación');
    }
  }

  Future<void> _rellenarLista() async {
    String subjectId = widget.subjectId;
    final response = await http.get(
      Uri.parse('$apiUrl/$subjectId'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${widget.token}',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);

      List<Map<String, dynamic>> calificacionesList =
          data.map((item) {
            return {
              '_id': item['_id'],
              'grade': item['grade'],
              'createdAt': item['createdAt'],
            };
          }).toList();

      setState(() {
        calificaciones = calificacionesList;
      });
    } else {
      print('Error al obtener las calificaciones');
    }
  }

  void _editarCalificacion(BuildContext context, int index) {
    TextEditingController _controller = TextEditingController(
      text: calificaciones[index]['grade'].toString(),
    );
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Editar Calificación'),
          content: TextField(
            controller: _controller,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              labelText: 'Ingrese la nueva calificación',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                _actualizarCalificacion(
                  calificaciones[index]['_id'],
                  _controller.text,
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

  Future<void> _actualizarCalificacion(String id, String calificacion) async {
    final response = await http.put(
      Uri.parse('$apiUrl/$id'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${widget.token}',
      },
      body: json.encode({'grade': calificacion}),
    );

    if (response.statusCode == 200) {
      _rellenarLista();
    } else {
      print('Error al actualizar la calificación');
    }
  }
  
  Future<void> _eliminarCalificacion(String id) async {
    final response = await http.delete(
      Uri.parse('$apiUrl/$id'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${widget.token}',
      }      
    );

    if (response.statusCode == 200) {
      _rellenarLista();
    } else {
      print('Error al actualizar la calificación');
    }
  }
}
