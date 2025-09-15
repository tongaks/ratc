import { db } from '@/firebase/firebaseAdmin';
import { NextResponse } from 'next/server';
import { useSearchParam } from 'next/navigation';
// import { collection, getDoc, addDoc, setDoc } from 'firebase/firestore';

export async function GET(request: NextRequest) {
	const clientID = request.nextUrl.searchParams.get('ID');
	const setStatus = request.nextUrl.searchParams.get('status');

	if (clientID && setStatus) {
		try {
			const docRef = await db.collection('clients').add({
				ID: clientID,
				Status: setStatus,
			});

			console.log("Data created for client: ", clientID + " with docRef ID: " + docRef.id);
		} catch (e) {
			console.error("An error occured: ",e);
		}
	}

	return new NextResponse("Updated");
}