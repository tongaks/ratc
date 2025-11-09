import { db } from '@/firebase/firebaseAdmin';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const clientID = searchParams.get('ID');

	try {

		if (clientID) {
			const docRef = db.collection('clients').doc(clientID);
			const doc = await docRef.get();

			if (doc.exists) {
				// const reply = doc.reply;
				const data = doc.data();
				const reply = data?.reply;
				return new NextResponse(reply, {status: 200, headers: {"Content-Type": "text/plain"},});
			}

		} else console.err('Invalid parameters.');

	} catch (err) {
		console.error("Error getting client: ", err);
		return new NextResponse("Failed", {status: 404, headers: {"Content-Type": "text/plain"},});
	}
}