import { db } from '@/firebase/firebaseAdmin';
import { NextResponse, NextRequest } from 'next/server';
// import { useSearchParam } from 'next/navigation';

// use middleman for when clients try to create connection
// like if they go to /connect they'll be redirected to /connected or something 
// use url query to filter clients from admin when using middleman
// like https://ratc.vercel.com?client=true

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const clientID = searchParams.get('ID');
	const clientStatus = searchParams.get('status');

	try {

		if (clientID && clientStatus) {
			const docRef = db.collection('clients').doc(clientID);
			const doc = await docRef.get();

			if (!doc.exists) {
				console.log('Client doesnt exists, creating...');

				const createDoc = db.collection('clients').doc(clientID).set({
					ID: clientID,
					status: clientStatus,
				}); console.log("Client document ID: ", createDoc.id);
			}



		} else console.err('Invalid parameters.');

	} catch (err) {
		console.error("Error in adding client: ", err);
		return new NextResponse("Failed", {status: 404, headers: {"Content-Type": "text/plain"},});
	}

	return new NextResponse("Connected", {status: 200, headers: {"Content-Type": "text/plain"},});
}