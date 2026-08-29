-- Creando la base de datos
CREATE DATABASE rincon_del_sabor_db;

-- Creando las tablas con sus campos, variables y restricciones
CREATE TABLE cliente (
	id_cliente SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	telefono VARCHAR(20)
);

CREATE TABLE producto (
	id_producto SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
	descripcion VARCHAR(200)
);

CREATE TABLE pedido (
	id_pedido SERIAL PRIMARY KEY,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	id_cliente INTEGER NOT NULL,
	estado VARCHAR(15) NOT NULL DEFAULT 'Pendiente',
	CONSTRAINT fk_cliente_pedido
	FOREIGN KEY (id_cliente)
	REFERENCES cliente(id_cliente)
	ON DELETE RESTRICT
);


CREATE TABLE detalle_pedido (
	id_dpedido SERIAL PRIMARY KEY,
	cantidad INTEGER NOT NULL CHECK (cantidad >= 0),
	precio_unid DECIMAL(10, 2) NOT NULL CHECK (cantidad >= 0),
	id_pedido INTEGER NOT NULL,
	id_producto INTEGER NOT NULL,
	CONSTRAINT fk_pedido_detalle_pedido
		FOREIGN KEY (id_pedido)
		REFERENCES pedido(id_pedido)
		ON DELETE RESTRICT,
	CONSTRAINT fk_producto_detalle_pedido
		FOREIGN KEY (id_producto)
		REFERENCES producto(id_producto)
		ON DELETE RESTRICT
);

-- Visualizando las tablas creadas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';