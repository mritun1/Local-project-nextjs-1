export default class seenUpdate{
    update(pathname: string) {
        try {
            fetch("/api/others/seenupdate", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pathUrl: pathname
                })
            })
        } catch (error) {
            console.error('An error occurred during the update:', error);
        }
    }
}