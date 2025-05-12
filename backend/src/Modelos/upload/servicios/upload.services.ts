import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AppDataSource } from '../../../database/AppDataSource';
import { Espacio, TipoEspacio } from '../../../database/Entidades/espacio.entity';
import { Reserva } from '../../../database/Entidades/reserva.entity';

@Injectable()
export class UploadService {
  
  async processTxtFile(file: Express.Multer.File): Promise<void> {
    // Guardamos temporalmente el archivo
    const filePath = `./uploads/${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);
    console.log("cargadod")

    // Leemos el contenido del archivo
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    // Dependiendo de la estructura, cargamos los espacios y las reservas
    const espacios: Espacio[] = [];
    const reservas: Reserva[] = [];
    
    // Procesamos los datos de los espacios
    lines.forEach(line => {
      const [nombre, tipoTexto, capacidadStr, descripcion] = line.split(';').map(v => v.trim());
      const tipo = this.convertirATipoEspacio(tipoTexto);
      const capacidad = parseInt(capacidadStr);
      const idExtraido = parseInt(nombre.match(/\d+/)?.[0] || '0');
      
      if (tipo && !isNaN(capacidad)) {
        const espacio = new Espacio();
        espacio.id = idExtraido;
        espacio.nombre = nombre;
        espacio.tipo = tipo;
        espacio.capacidad = capacidad;
        espacio.descripcion = descripcion;
        espacios.push(espacio);
      }
    });
    
    // Guardamos los espacios en la base de datos
    const espacioRepo = AppDataSource.getRepository(Espacio);
    await espacioRepo.save(espacios);
    
    // Procesamos las reservas (si tienes otro archivo con reservas, también puedes leerlo aquí)
    lines.forEach(line => {
      const [idEspacioStr, fecha, horaInicio, horaFin] = line.split(';').map(v => v.trim());
      const idEspacio = parseInt(idEspacioStr);
      
      const espacio = espacios.find(e => e.id === idEspacio);
      if (espacio) {
        const reserva = new Reserva();
        reserva.espacio = espacio;
        reserva.fecha = fecha;
        reserva.horaInicio = horaInicio;
        reserva.horaFin = horaFin;
        reservas.push(reserva);
      }
    });
    
    // Guardamos las reservas en la base de datos
    const reservaRepo = AppDataSource.getRepository(Reserva);
    await reservaRepo.save(reservas);
  }

  // Función para convertir texto a tipo de espacio
  private convertirATipoEspacio(valor: string): TipoEspacio | null {
    const textoNormalizado = valor
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .trim();
  
    switch (textoNormalizado) {
      case 'aula':
        return TipoEspacio.AULA;
      case 'laboratorio de computacion':
        return TipoEspacio.LAB_COMP;
      case 'laboratorio de fisica':
        return TipoEspacio.LAB_FISICA;
      default:
        console.warn(`Tipo de espacio desconocido: "${valor}"`);
        return null;
    }
  }
}
