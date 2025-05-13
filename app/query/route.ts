import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  try {
    const data = await sql`
      SELECT 
        invoices.amount, 
        customers.name,
        invoices.status,
        invoices.date
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 10;
    `;
    console.log('Datos obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const data = await listInvoices();
    return Response.json({ data });
  } catch (error) {
    console.error('Error en el handler:', error);
    return Response.json({ error: 'Error al obtener los datos' }, { status: 500 });
  }
}

