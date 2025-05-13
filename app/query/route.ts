import postgres from 'postgres';

// Verificar si la variable de entorno existe
if (!process.env.POSTGRES_URL) {
  console.error('POSTGRES_URL no está definida');
  throw new Error('POSTGRES_URL no está configurada');
}

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function listInvoices() {
    const data = await sql`     
     SELECT invoices.amount, customers.name
     FROM invoices
     JOIN customers ON invoices.customer_id = customers.id
     WHERE invoices.amount = 666;
  `;
 	return data;
}

export async function GET() {
    return 
     try {
   	return Response.json(await listInvoices());
   } catch (error) {
   	return Response.json({ error }, { status: 500 });
   }
}
