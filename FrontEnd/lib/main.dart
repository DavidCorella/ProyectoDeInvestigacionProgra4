import 'package:flutter/material.dart';

/// Flutter code sample for [Table].

void main() => runApp(const AsignaturasApp());

class AsignaturasApp extends StatelessWidget {
  const AsignaturasApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(appBar: AppBar(title: const Text('Resumen', style: TextStyle(color: Colors.purple, fontWeight: FontWeight.bold, fontSize: 25),textAlign: TextAlign.center)), 
      body: Column(
        children: [
          const Asignaturas(),
          Text("Promedio Final: 70", style: TextStyle(color: Colors.black, fontWeight: FontWeight.normal, fontSize: 25),textAlign: TextAlign.right),
          const CreateAsignatura(),
        ],
      )
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
    final ButtonStyle style = ElevatedButton.styleFrom(textStyle: const TextStyle(fontSize: 20, color: Colors.purple));

    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          ElevatedButton(style: style, onPressed: (){}, child: const Text('Crear Asignatura')),
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
      border: TableBorder.all(width: 4, borderRadius: BorderRadius.all(Radius.circular(10)),color: Colors.grey),
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
              verticalAlignment: TableCellVerticalAlignment.top,
              child: Padding(padding: EdgeInsets.all(16.0),
              child: Text("Asignatura",style: TextStyle(color: Colors.purple[600], fontWeight: FontWeight.bold, fontSize: 25),textAlign: TextAlign.center,),)
            ),
            TableCell(
              verticalAlignment: TableCellVerticalAlignment.top,
              child:  Padding(padding: EdgeInsets.all(16.0),child: Text("Promedio", style: TextStyle(color: Colors.purple[600], fontWeight: FontWeight.bold, fontSize: 25),textAlign: TextAlign.center,),)
            ),
          ],
        ),
        TableRow(
          children: <Widget>[
            TableCell(
              verticalAlignment: TableCellVerticalAlignment.top,
              child: Padding(padding: EdgeInsets.all(16.0),
              child: Text("Progra4",style: TextStyle(color: Colors.black, fontWeight: FontWeight.normal, fontSize: 20),textAlign: TextAlign.center,),)
            ),
            TableCell(
              verticalAlignment: TableCellVerticalAlignment.top,
              child:  Padding(padding: EdgeInsets.all(16.0),child: Text("70", style: TextStyle(color: Colors.black, fontWeight: FontWeight.normal, fontSize: 20),textAlign: TextAlign.center,),)
            ),
          ],
        ),
        
      ],
    );
  }
}

