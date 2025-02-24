import 'package:flutter/material.dart';

/// Flutter code sample for [Table].

void main() => runApp(const AsignaturasApp());

class AsignaturasApp extends StatelessWidget {
  const AsignaturasApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text(
            'Resumen',
            style: TextStyle(
              color: Colors.purple,
              fontWeight: FontWeight.bold,
              fontSize: 25,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        body: Column(
          children: [
            const Asignaturas(),
            Text(
              "Promedio Final: 70",
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.normal,
                fontSize: 25,
              ),
              textAlign: TextAlign.right,
            ),
            const CreateAsignatura(),
          ],
        ),
      ),
    );
  }
}

class CreateAsignatura extends StatefulWidget {
  const CreateAsignatura({super.key});

  @override
  State<CreateAsignatura> createState() => _CreateAsignaturaState();
}

class _CreateAsignaturaState extends State<CreateAsignatura> {
  @override
  Widget build(BuildContext context) {
    final ButtonStyle style = ElevatedButton.styleFrom(
      textStyle: const TextStyle(fontSize: 20, color: Colors.purple),
    );

    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          ElevatedButton(
            style: style,
            onPressed: () {},
            child: const Text('Crear Asignatura'),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }
}

class Asignaturas extends StatelessWidget {
  const Asignaturas({super.key});

  @override
  Widget build(BuildContext context) {
    return Table(
      border: TableBorder.all(
        width: 4,
        borderRadius: BorderRadius.all(Radius.circular(10)),
        color: Colors.grey,
      ),
      columnWidths: const <int, TableColumnWidth>{
        0: IntrinsicColumnWidth(),
        1: FlexColumnWidth(),
        2: FixedColumnWidth(64),
      },
      defaultVerticalAlignment: TableCellVerticalAlignment.middle,
      children: <TableRow>[
        TableRow(
          children: <Widget>[
            TableCell(
              verticalAlignment: TableCellVerticalAlignment.middle,
              child: Padding(
                padding: EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child:
                    Text(
                      "PrograIV",
                      style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 25,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    ),
                    Expanded(
                      child:
                    Text(
                      "90",
                      style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 25,
                      ),
                      textAlign: TextAlign.center,
                    ))
                    ,Expanded(
                      child: 
                    const EditarNotas(),)
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}


class EditarNotas extends StatefulWidget {
  const EditarNotas({super.key});

  @override
  State<EditarNotas> createState() => _EditarNotasState();
}

class _EditarNotasState extends State<EditarNotas> {
  @override
  Widget build(BuildContext context) {
    final ButtonStyle style = ElevatedButton.styleFrom(
      textStyle: const TextStyle(fontSize: 20, color: Colors.purple),
    );

    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          ElevatedButton(
            style: style,
            onPressed: () {},
            child: const Text('Detalle de Notas'),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }
}

