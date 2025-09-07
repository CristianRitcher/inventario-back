-- Script de inicialización de la base de datos
-- Ejecutar después de crear la base de datos 'inventario_db'

USE inventario_db;

-- Insertar datos de ejemplo

-- Bodegas
INSERT INTO bodegas (nombre, direccion) VALUES 
('Bodega Principal', 'Calle 123 #45-67, Bogotá'),
('Bodega Secundaria', 'Carrera 89 #12-34, Medellín');

-- Secciones
INSERT INTO secciones (nombre, id_bodega) VALUES 
('Electrónicos', 1),
('Herramientas', 1),
('Repuestos', 1),
('Oficina', 2),
('Almacén General', 2);

-- Usuarios
INSERT INTO usuarios (nombre, correo, contrasena, cargo, id_bodega) VALUES 
('Admin Principal', 'admin@inventario.com', '123456', 'Administrador', 1),
('Juan Pérez', 'juan.perez@inventario.com', '123456', 'Operario', 1),
('María García', 'maria.garcia@inventario.com', '123456', 'Supervisora', 2);

-- Productos
INSERT INTO productos (nombre, marca, sku, descripcion, MOQ, UM, UE, responsable, es_serial, id_bodega) VALUES 
('Laptop Dell Inspiron', 'Dell', 'DELL-INSP-001', 'Laptop Dell Inspiron 15 3000', 1, 'Unidad', 'Caja', 'Juan Pérez', true, 1),
('Mouse Inalámbrico', 'Logitech', 'LOG-MOUSE-001', 'Mouse inalámbrico Logitech M170', 10, 'Unidad', 'Caja x10', 'Juan Pérez', false, 1),
('Taladro Eléctrico', 'Black & Decker', 'BD-DRILL-001', 'Taladro eléctrico 500W', 1, 'Unidad', 'Caja', 'María García', true, 2),
('Tornillos Phillips', 'Genérico', 'TORN-PHIL-001', 'Tornillos Phillips 2.5mm', 100, 'Unidad', 'Caja x100', 'María García', false, 2);

-- Items
INSERT INTO items (id_producto, nombre, serial, cantidad, ubicacion, estado, id_seccion) VALUES 
(1, 'Laptop Dell #001', 'DELL001234567', 1, 'dentro', 'nuevo', 1),
(1, 'Laptop Dell #002', 'DELL001234568', 1, 'dentro', 'nuevo', 1),
(2, NULL, NULL, 50, 'dentro', 'nuevo', 1),
(3, 'Taladro BD #001', 'BD001234567', 1, 'dentro', 'nuevo', 2),
(4, NULL, NULL, 200, 'dentro', 'nuevo', 2);
