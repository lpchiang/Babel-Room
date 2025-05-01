const API_URL = 'http://3.142.243.38:5000/api/progress';

export function progressUserController() {
    const handleProgress = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        const uniqueName = payload.unique_name;

        const url = `${API_URL}/${uniqueName}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao adicionar comentário");
            }

            const data = await response.json();
            console.log("Comentário adicionado:", data);
            return data;
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
        }
    };
    return {handleProgress}
}
