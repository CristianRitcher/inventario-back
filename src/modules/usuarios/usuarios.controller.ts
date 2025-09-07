import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../../entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: Partial<Usuario>) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: Partial<Usuario>) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @Post('login')
  async login(@Body() loginDto: { correo: string; contrasena: string }) {
    const usuario = await this.usuariosService.validateUser(
      loginDto.correo,
      loginDto.contrasena,
    );
    if (!usuario) {
      return { success: false, message: 'Credenciales inválidas' };
    }
    return { success: true, usuario };
  }
}
