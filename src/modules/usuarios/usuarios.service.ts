import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({
      relations: ['bodega'],
    });
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuariosRepository.findOne({
      where: { id },
      relations: ['bodega'],
    });
  }

  async findByEmail(correo: string): Promise<Usuario> {
    return this.usuariosRepository.findOne({
      where: { correo },
      relations: ['bodega'],
    });
  }

  async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuariosRepository.create(usuarioData);
    return this.usuariosRepository.save(usuario);
  }

  async update(id: number, usuarioData: Partial<Usuario>): Promise<Usuario> {
    await this.usuariosRepository.update(id, usuarioData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }

  async validateUser(correo: string, contrasena: string): Promise<Usuario | null> {
    const usuario = await this.findByEmail(correo);
    if (usuario && usuario.contrasena === contrasena) {
      return usuario;
    }
    return null;
  }
}
