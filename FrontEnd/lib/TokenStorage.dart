import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TokenStorage {
  // Crear una instancia de FlutterSecureStorage
  final FlutterSecureStorage _storage = FlutterSecureStorage();

  // Guardar el token
  Future<void> storeToken(String token) async {
    await _storage.write(key: 'jwt_token', value: token);
  }

  // Obtener el token
  Future<String?> getToken() async {
    String? token = await _storage.read(key: 'jwt_token');
    return token;
  }

  // Eliminar el token
  Future<void> deleteToken() async {
    await _storage.delete(key: 'jwt_token');
  }
}