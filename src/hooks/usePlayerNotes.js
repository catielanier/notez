import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as svc from "../apiCalls/noteApiCalls";

export default function usePlayerNotes(userId) {
	const qc = useQueryClient();

	const {
		data: notes = [],
		isLoading,
		error,
	} = useQuery(["playerNotes"], () => svc.fetchPlayerNotes());

	const create = useMutation((note) => svc.createGameNote(note), {
		onSuccess: () => qc.invalidateQueries(["playerNotes"]),
	});

	const update = useMutation(
		({ id, changes }) => svc.updateGameNote(id, changes),
		{ onSuccess: () => qc.invalidateQueries(["playerNotes"]) },
	);

	const deleteNote = useMutation(({ noteId }) => svc.deleteGameNote(noteId), {
		onSuccess: () => qc.invalidateQueries(["playerNotes"]),
	});

	return { notes, isLoading, error, create, update, deleteNote };
}
