'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function connected() {
	const searchParams = useSearchParams();
	const isClient = searchParams.get('client');

	return (`"connected to the server: isClient ${isClient}"`);
}