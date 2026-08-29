INSERT INTO cliente (nombre, email, telefono) VALUES
('Juan Pérez', 'juan.perez@email.com', '987654321'),
('María García', 'maria.garcia@email.com', '912345678'),
('Carlos López', 'carlos.lopez@email.com', '934567891'),
('Ana Martínez', 'ana.martinez@email.com', '945612378'),
('Luis Rodríguez', 'luis.rodriguez@email.com', '956781234'),
('Carmen Gómez', 'carmen.gomez@email.com', '967843215'),
('José Sánchez', 'jose.sanchez@email.com', '978951236'),
('Elena Fernández', 'elena.fernandez@email.com', '915926348'),
('Francisco Díaz', 'francisco.diaz@email.com', '926481753'),
('Isabel González', 'isabel.gonzalez@email.com', '937152864'),
('Pedro Álvarez', 'pedro.alvarez@email.com', '948263175'),
('Laura Romero', 'laura.romero@email.com', '959374286'),
('Miguel Alonso', 'miguel.alonso@email.com', '960485397'),
('Clara Gutiérrez', 'clara.gutierrez@email.com', '971596408'),
('Diego Torres', 'diego.torres@email.com', '982607519'),
('Lucía Navarro', 'lucia.navarro@email.com', '993718620'),
('Antonio Domínguez', 'antonio.dominguez@email.com', '914829731'),
('Sofia Vázquez', 'sofia.vazquez@email.com', '925930842'),
('Manuel Ramos', 'manuel.ramos@email.com', '936041953'),
('Sara Gil', 'sara.gil@email.com', '947152064'),
('Javier Serrano', 'javier.serrano@email.com', '958263175'),
('Raquel Blanco', 'raquel.blanco@email.com', '969374286'),
('Alejandro Molina', 'alejandro.molina@email.com', '980485397'),
('Paula Morales', 'paula.morales@email.com', '991596508'),
('Andrés Suárez', 'andres.suarez@email.com', '912607619');


INSERT INTO producto (nombre, precio, descripcion) VALUES
('Teclado Mecánico RGB', 89.99, 'Teclado con switches red y luces personalizables.'),
('Ratón Gamer Ergonómico', 45.50, 'Ratón óptico de alta precisión con hasta 16000 DPI.'),
('Monitor 24" Full HD', 129.99, 'Monitor con panel IPS y tasa de refresco de 75Hz.'),
('Auriculares con Micrófono', 59.90, 'Auriculares de diadema con cancelación activa de ruido.'),
('Alfombrilla XXL', 19.95, 'Superficie de tela optimizada para ratones gamer.'),
('Memoria RAM 16GB DDR4', 75.00, 'Módulo de memoria de alta velocidad a 3200MHz.'),
('Disco Duro SSD 1TB', 85.00, 'Unidad de estado sólido NVMe M.2 ultra rápida.'),
('Procesador Octa-Core', 249.99, 'Procesador potente para productividad y videojuegos.'),
('Tarjeta Gráfica 8GB', 399.99, 'Gráfica de última generación con soporte Ray Tracing.'),
('Placa Base ATX', 115.45, 'Compatible con procesadores de última generación.'),
('Fuente de Alimentación 750W', 89.00, 'Certificación 80 Plus Gold con diseño modular.'),
('Caja de Ordenador Mid-Tower', 69.99, 'Diseño elegante con panel lateral de cristal templado.'),
('Refrigeración Líquida 240mm', 95.00, 'Sistema de enfriamiento para CPU con ventiladores RGB.'),
('Silla Gamer Ergonómica', 189.99, 'Silla regulable en altura y con soporte lumbar.'),
('Cámara Web 1080p', 39.99, 'Cámara ideal para streaming y videoconferencias.'),
('Micrófono de Condensador USB', 65.50, 'Captura de audio profesional para podcasts y directos.'),
('Soporte para Monitor Doble', 34.99, 'Brazo articulado para dos escritorios de oficina.'),
('Cable HDMI 2.1 (2 metros)', 12.50, 'Soporta resoluciones hasta 8K a 60Hz.'),
('Hub USB-C 6 en 1', 29.99, 'Incluye puertos HDMI, USB 3.0 y lector de tarjetas.'),
('Altavoces Estéreo para PC', 49.99, 'Sistema de sonido 2.0 con conexión Bluetooth.'),
('Repetidor Wi-Fi Dual Band', 24.99, 'Amplía la cobertura de internet en tu hogar.'),
('Pendrive USB 3.0 128GB', 15.90, 'Memoria portátil de alta velocidad para archivos.'),
('Pasta Térmica de Alto Rendimiento', 8.50, 'Compuesto térmico de alta conductividad para CPU.'),
('Capturadora de Vídeo 4K', 149.99, 'Dispositivo externo para grabar partidas de consolas.'),
('Luz LED para Escritorio', 22.00, 'Barra de luz regulable colocada sobre el monitor.');


INSERT INTO pedido (fecha, id_cliente, estado) VALUES
('2026-08-01 10:15:00', 1, 'Entregado'),
('2026-08-02 11:30:00', 2, 'Entregado'),
('2026-08-03 14:45:00', 3, 'Entregado'),
('2026-08-05 09:00:00', 4, 'Cancelado'),
('2026-08-06 16:20:00', 5, 'Entregado'),
('2026-08-08 12:10:00', 6, 'Entregado'),
('2026-08-10 17:35:00', 7, 'Enviado'),
('2026-08-12 11:15:00', 8, 'Enviado'),
('2026-08-14 15:50:00', 9, 'Pendiente'),
('2026-08-15 10:05:00', 10, 'Pendiente'),
('2026-08-16 13:40:00', 11, 'Entregado'),
('2026-08-18 09:25:00', 12, 'Entregado'),
('2026-08-19 18:12:00', 13, 'Cancelado'),
('2026-08-20 14:30:00', 14, 'Enviado'),
('2026-08-21 11:00:00', 15, 'Pendiente'),
('2026-08-22 16:45:00', 16, 'Pendiente'),
('2026-08-23 12:20:00', 17, 'Entregado'),
('2026-08-24 15:10:00', 18, 'Entregado'),
('2026-08-25 09:55:00', 19, 'Enviado'),
('2026-08-25 17:30:00', 20, 'Pendiente'),
('2026-08-26 10:40:00', 21, 'Pendiente'),
('2026-08-26 14:15:00', 22, 'Pendiente'),
('2026-08-27 11:20:00', 23, 'Pendiente'),
('2026-08-27 16:00:00', 24, 'Pendiente'),
('2026-08-28 08:30:00', 25, 'Pendiente');


INSERT INTO detalle_pedido (cantidad, precio_unid, id_pedido, id_producto) VALUES
(1, 89.99, 1, 1),   -- Pedido 1: Teclado Mecánico
(2, 45.50, 1, 2),   -- Pedido 1: Ratón Gamer (x2)
(1, 129.99, 2, 3),  -- Pedido 2: Monitor 24"
(1, 19.95, 2, 5),   -- Pedido 2: Alfombrilla
(1, 59.90, 3, 4),   -- Pedido 3: Auriculares
(1, 399.99, 4, 9),  -- Pedido 4: Tarjeta Gráfica
(1, 115.45, 4, 10), -- Pedido 4: Placa Base
(2, 75.00, 5, 6),   -- Pedido 5: Memoria RAM (x2)
(1, 85.00, 5, 7),   -- Pedido 5: Disco Duro SSD
(1, 249.99, 6, 8),  -- Pedido 6: Procesador
(1, 89.00, 7, 11),  -- Pedido 7: Fuente Alimentación
(1, 69.99, 7, 12),  -- Pedido 7: Caja Ordenador
(1, 189.99, 8, 14), -- Pedido 8: Silla Gamer
(1, 39.99, 9, 15),  -- Pedido 9: Cámara Web
(1, 65.50, 10, 16), -- Pedido 10: Micrófono
(1, 34.99, 11, 17), -- Pedido 11: Soporte Monitor
(2, 12.50, 11, 18), -- Pedido 11: Cable HDMI (x2)
(1, 29.99, 12, 19), -- Pedido 12: Hub USB-C
(1, 49.99, 13, 20), -- Pedido 13: Altavoces
(1, 24.99, 14, 21), -- Pedido 14: Repetidor Wi-Fi
(1, 15.90, 15, 22), -- Pedido 15: Pendrive
(1, 8.50, 16, 23),  -- Pedido 16: Pasta Térmica
(1, 149.99, 17, 24),-- Pedido 17: Capturadora
(1, 22.00, 18, 25), -- Pedido 18: Luz LED
(2, 45.50, 19, 2);  -- Pedido 19: Ratón Gamer (x2)
