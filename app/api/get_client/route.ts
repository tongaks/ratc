import { db } from '@/firebase/firebaseAdmin';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const clientID = searchParams.get('ID');
	const clientStatus = searchParams.get('status');

	try {
	    const snapshot = await db.collection("clients").get();

	    const clients: any[] = [];
	    snapshot.forEach(doc => {
	      clients.push({ id: doc.id, ...doc.data() });
	    });

	    return NextResponse.json(clients, { status: 200 });

	} catch (err) {
		console.error("Error in adding client: ", err);
		return new NextResponse.json({error: err}, {status: 404, headers: {"Content-Type": "text/plain"},});
	}
}