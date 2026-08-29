import pool from "../config/db.js";

type tableFields = Record<string, string[]>;

export let tablasDB: tableFields = {};

export const initLoadTablesFieldsOfDB = (async (): Promise<void> => {
  const result = await pool.query(`
SELECT jsonb_object_agg(table_name, columnas) AS esquema
FROM (
    SELECT table_name, jsonb_agg(column_name ORDER BY ordinal_position) AS columnas
    FROM information_schema.columns c
    WHERE table_schema = 'public'
      -- Filtro para excluir las claves primarias
      AND NOT EXISTS (
          SELECT 1 
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
           AND tc.table_schema = kcu.table_schema
          WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_schema = 'public'
            AND tc.table_name = c.table_name
            AND kcu.column_name = c.column_name
      )
    GROUP BY table_name
) subconsulta;`);
  tablasDB = result.rows[0].esquema;
})();

// Tipado para respuesta del endpoint en consultas query
export interface PaginationResults<O> {
  data: O[];
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}