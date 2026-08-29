import type { QueryParamsProducto } from "../models/producto.model.ts";
import { ProductoModel } from "../models/producto.model.js";
import type { PaginationResults } from "../models/global.model.js";
import type { Producto } from "../models/producto.model.ts";

const productoService = {
  getLibroFilter: async (
    query: QueryParamsProducto,
  ): Promise<PaginationResults<Producto>> => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search?.trim();
    const minPrecio = query.minPrecio ? Number(query.minPrecio) : undefined;
    const maxPrecio = query.maxPrecio ? Number(query.maxPrecio) : undefined;
    return await ProductoModel.findWithFilter(
      page,
      limit,
      search,
      minPrecio,
      maxPrecio,
    );
  },
};

export default productoService;
