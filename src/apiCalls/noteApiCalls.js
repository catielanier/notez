import api from "../utils/httpClient";

export function fetchGameNotes() {
	return api.get("/notes/game").then((res) => res.data.data);
}

export function fetchPlayerNotes() {
	return api.get("/notes/player").then((res) => res.data.data);
}

export function createGameNote(note) {
	return api.post("/notes/game", { note }).then((res) => res.data.data);
}

export function updateGameNote(id, changes) {
	return api.put(`/notes/game/${id}`, changes).then((res) => res.data.data);
}

export function deleteGameNote(noteId) {
	return api.delete(`notes/game/${noteId}`).then((_) => {});
}

export function createPlayerNote(note) {
	return api.post("/notes/player", { note }).then((res) => res.data.data);
}

export function updatePlayerNote(id, changes) {
	return api.put(`/notes/player/${id}`, changes).then((res) => res.data.data);
}

export function deletePlayerNote(noteId) {
	return api.delete(`notes/player/${noteId}`).then((_) => {});
}
