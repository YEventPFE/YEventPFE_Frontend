import ServerVersionDTO from '@/models/serverVersionDTO';

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

    const data = await response.json();
    var dto = new ServerVersionDTO(data.version);
    return ServerVersionDTO.prototype.version = dto.version;
};
