import { db } from '@/firebase/firebaseAdmin';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const clientID = searchParams.get('ID');
	const clientReply = searchParams.get('reply');

	try {

		if (clientID && clientReply) {
			const docRef = db.collection('clients').doc(clientID);
			const doc = await docRef.get();

			if (doc.exists) {
				const setDoc = db.collection('clients').doc(clientID).set({
					ID: clientID,
					status: clientStatus,
				});
			}


		} else console.err('Invalid parameters.');

	} catch (err) {
		console.error("Error getting client: ", err);
		return new NextResponse("Failed", {status: 404, headers: {"Content-Type": "text/plain"},});
	}

	return new NextResponse("OK", {status: 200, headers: {"Content-Type": "text/plain"},});
}