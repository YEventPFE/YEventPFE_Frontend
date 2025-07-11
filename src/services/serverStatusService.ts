import { ServerVersionDTO } from '@/models/serverVersionDTO';

export const getServerVersion = async (): Promise<string> => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }

    const response = await fetch(`${apiUrl}/version`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch server version');
    }

    if (!response.headers.get('Content-Type')?.includes('application/json')) {
        throw new Error('Response is not in JSON format');
    }
    const data = await response.json();

    if (data && data.version) {
        const serverVersion: ServerVersionDTO = data as ServerVersionDTO;
        return serverVersion.version;
    }
    else{
        throw new Error('Invalid server version response');
    }
};
