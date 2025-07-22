import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as svc from "../apiCalls/noteApiCalls";

export default function usePlayerNotes(userId) {
	const qc = useQueryClient();

	const {
		data: notes = [],
		isLoading,
		error,
	} = useQuery(["playerNotes", userId], () => svc.fetchPlayerNotes(userId), {
		enabled: Boolean(userId),
	});

	const create = useMutation((note) => svc.createGameNote(userId, note), {
		onSuccess: () => qc.invalidateQueries(["playerNotes", userId]),
	});

	const update = useMutation(
		({ id, changes }) => svc.updateGameNote(id, changes),
		{ onSuccess: () => qc.invalidateQueries(["playerNotes", userId]) },
	);

	const deleteNote = useMutation(({ noteId }) => svc.deleteGameNote(noteId), {
		onSuccess: () => qc.invalidateQueries(["playerNotes", userId]),
	});

	return { notes, isLoading, error, create, update, deleteNote };
}
