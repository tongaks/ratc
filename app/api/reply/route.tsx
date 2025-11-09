import { db } from '@/firebase/firebaseAdmin';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const clientID = formData.get('ID');
	const clientReply = formData.get('reply');

	console.log("reply: " + clientID + " " + clientReply);

	try {

		if (clientID) {
			const docRef = db.collection('clients').doc(clientID);
			const doc = await docRef.get();

			if (clientReply == "OK") {
				// console.log("Client replied with: " + clientReply);
				if (doc.exists) {
					await db.collection('clients').doc(clientID).update({
						// current_status: "",   // clear current_status
						status: "",   // clear status
						reply: clientReply,
					});
				}
			} else if (clientReply == "CL") {
				if (doc.exists) {
					await db.collection('clients').doc(clientID).update({
						connected: false,   // clear current_status
						status: "",   // clear status
						reply: "CL",
					});
				}				
			} else {
				console.error("Client reply is NOT OK");
				return new NextResponse("NOT OK", {status: 200, headers: {"Content-Type": "text/plain"},});
			} 



		} else console.error('Invalid parameters.');

	} catch (err) {
		console.error("Error getting client: ", err);
		return new NextResponse("Failed", {status: 404, headers: {"Content-Type": "text/plain"},});
	}

	return new NextResponse("OK", {status: 200, headers: {"Content-Type": "text/plain"},});
}