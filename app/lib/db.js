import mysql from "mysql2/promise";

const dbconfig = {
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE}`,
    connectionLimit: 10
}

const pool = mysql.createPool(dbconfig);

export const query = async (sql, values) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(sql, values);
      return rows;
    } finally {
      connection.release();
    }
}

export const transaction = async (queries) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
        for (const query of queries) {
            await connection.query(query.sql, query.values);
        }
        await connection.commit();
        const result = {
            success: true,
            message: "Transaction completed successfully."
        };
        
        return result;
    } catch (error) {
        await connection.rollback();
        const result = {
            success: false,
            error: `Database query failed: ${error.message}`
        };
        throw result;
    } finally {
        connection.release();
    }
}

export const close = async () => {
    await pool.end();
}
